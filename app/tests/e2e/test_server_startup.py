import os
import socket
import sqlite3
import subprocess
import time
import unittest
import urllib.request
from pathlib import Path


APP_DIR = Path(__file__).resolve().parents[2]
RUN_FILE = APP_DIR / "serve.py"
PYTHON_BIN = APP_DIR / "venv" / "Scripts" / "python.exe"
TMP_DIR = APP_DIR / "tests" / "tmp"
ACCOUNTS_URL = "http://127.0.0.1:{port}/accounts"
EXPECTED_TABLES = {"usuario", "conta", "categoria", "agendamento", "transacao"}


def get_free_port() -> int:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.bind(("127.0.0.1", 0))
        return sock.getsockname()[1]


class ServerStartupE2ETests(unittest.TestCase):
    def setUp(self) -> None:
        self._failure_message = ""

    def start_server(self, database_url: str, port: int) -> subprocess.Popen:
        env = os.environ.copy()
        env["DATABASE_URL"] = database_url
        env["HOST"] = "127.0.0.1"
        env["PORT"] = str(port)
        env["UVICORN_RELOAD"] = "false"
        env["RUN_STARTUP_TESTS"] = "0"

        return subprocess.Popen(
            [str(PYTHON_BIN), str(RUN_FILE)],
            cwd=str(APP_DIR),
            env=env,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
        )

    def wait_for_health(self, process: subprocess.Popen, port: int, timeout: float = 20.0):
        return self.wait_for_server(process, port, timeout)

    def wait_for_server(self, process: subprocess.Popen, port: int, timeout: float = 20.0):
        deadline = time.time() + timeout
        last_error = None

        while time.time() < deadline:
            if process.poll() is not None:
                stdout, stderr = process.communicate()
                self.fail(
                    "Server exited before becoming available.\n"
                    f"stdout:\n{stdout}\n"
                    f"stderr:\n{stderr}"
                )

            try:
                with urllib.request.urlopen(ACCOUNTS_URL.format(port=port), timeout=1) as response:
                    response.read()
                    return response.status
            except OSError as exc:
                last_error = exc
                time.sleep(0.25)

        self.fail(f"Server did not respond before timeout. Last error: {last_error}")

    def wait_for_process_exit(self, process: subprocess.Popen, timeout: float = 20.0):
        try:
            return_code = process.wait(timeout=timeout)
        except subprocess.TimeoutExpired:
            self.fail("Process did not exit before timeout.")

        stdout, stderr = process.communicate()
        return return_code, stdout, stderr

    def stop_server(self, process: subprocess.Popen) -> None:
        if process.poll() is None:
            process.terminate()
            try:
                process.wait(timeout=10)
            except subprocess.TimeoutExpired:
                process.kill()
                process.wait(timeout=5)

    def cleanup_file(self, path: Path) -> None:
        for _ in range(10):
            try:
                path.unlink(missing_ok=True)
                return
            except PermissionError:
                time.sleep(0.2)

    def tearDown(self) -> None:
        outcome = getattr(self, "_outcome", None)
        if outcome is None:
            print(f"TESTE = PASS | {self._testMethodName}")
            return

        result = outcome.result
        failures = []
        if result is not None:
            failures.extend(result.failures)
            failures.extend(result.errors)

        matching_failure = next((item for item in failures if item[0] is self), None)
        if matching_failure is None:
            print(f"TESTE = PASS | {self._testMethodName}")
            return

        _, traceback_text = matching_failure
        error_line = traceback_text.strip().splitlines()[-1] if traceback_text else "Unknown error"
        print(f"TESTE = FAILED | {self._testMethodName} | {error_line}")

    def test_startup_creates_schema_and_starts_server(self):
        port = get_free_port()
        TMP_DIR.mkdir(parents=True, exist_ok=True)
        database_file = TMP_DIR / f"{self._testMethodName}.sqlite3"
        database_file.unlink(missing_ok=True)

        process = self.start_server(f"sqlite:///{database_file.as_posix()}", port)
        try:
            status_code = self.wait_for_server(process, port)
            self.assertEqual(status_code, 200)

            with sqlite3.connect(database_file) as connection:
                rows = connection.execute(
                    "SELECT name FROM sqlite_master WHERE type = 'table'"
                ).fetchall()

            self.assertTrue(database_file.exists(), "SQLite database file was not created.")
            self.assertTrue(
                EXPECTED_TABLES.issubset({row[0] for row in rows}),
                "Startup did not create the expected schema.",
            )
        finally:
            self.stop_server(process)
            self.cleanup_file(database_file)

    def test_startup_aborts_when_database_is_unavailable(self):
        port = get_free_port()
        missing_dir = APP_DIR / "tests" / "tmp" / "missing" / "nested"
        database_file = missing_dir / "startup.sqlite3"

        process = self.start_server(f"sqlite:///{database_file.as_posix()}", port)
        return_code, stdout, stderr = self.wait_for_process_exit(process)
        self.assertNotEqual(return_code, 0)
        self.assertIn("Falha na conexao com o banco de dados. Servidor nao iniciado.", stdout)
        self.assertNotIn("Uvicorn running on", stdout + stderr)


if __name__ == "__main__":
    unittest.main()
