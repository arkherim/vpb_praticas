import importlib.metadata
import os
import subprocess
import sys
from pathlib import Path


APP_DIR = Path(__file__).resolve().parent
REQUIREMENTS_FILE = APP_DIR / "backend" / "src" / "requirements.txt"


def normalize_requirement_name(requirement_line: str) -> str | None:
    requirement = requirement_line.split("#", 1)[0].strip()
    if not requirement:
        return None

    for separator in ("==", ">=", "<=", "~=", "!=", ">", "<"):
        if separator in requirement:
            requirement = requirement.split(separator, 1)[0].strip()
            break

    if "[" in requirement:
        requirement = requirement.split("[", 1)[0].strip()

    return requirement or None


def validate_installed_requirements() -> None:
    missing_packages = []

    for line in REQUIREMENTS_FILE.read_text(encoding="utf-8").splitlines():
        package_name = normalize_requirement_name(line)
        if package_name is None:
            continue

        try:
            importlib.metadata.version(package_name)
        except importlib.metadata.PackageNotFoundError:
            missing_packages.append(package_name)

    if missing_packages:
        missing_text = ", ".join(missing_packages)
        print(
            "Dependencias obrigatorias ausentes. Instale antes de iniciar o servidor: "
            f"{missing_text}"
        )
        raise SystemExit(1)

    print("Dependencias do requirements.txt verificadas com sucesso.")


def should_run_startup_tests() -> bool:
    run_tests_env = os.getenv("RUN_STARTUP_TESTS")
    if run_tests_env is not None:
        return run_tests_env.strip().lower() in {"1", "true", "yes", "y", "s", "sim"}

    app_env = os.getenv("APP_ENV", "local").strip().lower()
    if app_env in {"production", "render", "deploy"}:
        return False

    if not sys.stdin.isatty():
        return False

    print("Selecione como deseja iniciar:")
    print("1. Subir o servidor sem testes")
    print("2. Rodar testes de startup e depois subir o servidor")

    while True:
        try:
            choice = input("Opcao [1/2]: ").strip()
        except EOFError:
            print("Entrada interativa indisponivel. O servidor sera iniciado sem rodar os testes.")
            return False
        if choice == "1":
            return False
        if choice == "2":
            return True
        print("Opcao invalida. Digite 1 ou 2.")


def run_startup_tests() -> bool:
    print("Executando testes de startup...")
    result = subprocess.run(
        [sys.executable, "-m", "unittest", "tests.e2e.test_server_startup", "-v"],
        check=False,
        cwd=str(APP_DIR),
    )
    return result.returncode == 0


def ensure_soft_delete_columns(engine, text) -> None:
    statements_by_dialect = {
        "postgresql": [
            'ALTER TABLE IF EXISTS usuario ADD COLUMN IF NOT EXISTS excluido_em TIMESTAMPTZ',
            'ALTER TABLE IF EXISTS conta ADD COLUMN IF NOT EXISTS excluido_em TIMESTAMPTZ',
        ],
        "sqlite": [
            'ALTER TABLE usuario ADD COLUMN excluido_em DATETIME',
            'ALTER TABLE conta ADD COLUMN excluido_em DATETIME',
        ],
    }

    dialect_name = engine.dialect.name
    statements = statements_by_dialect.get(dialect_name, [])

    if not statements:
        return

    with engine.begin() as connection:
        if dialect_name == "sqlite":
            for table_name in ("usuario", "conta"):
                columns = {
                    row[1]
                    for row in connection.execute(text(f"PRAGMA table_info({table_name})")).fetchall()
                }
                if "excluido_em" not in columns:
                    connection.execute(
                        text(f"ALTER TABLE {table_name} ADD COLUMN excluido_em DATETIME")
                    )
            return

        for statement in statements:
            connection.execute(text(statement))


def check_database_before_start() -> None:
    from sqlalchemy import text
    from sqlalchemy.exc import OperationalError, SQLAlchemyError

    from backend.src import models  # noqa: F401
    from backend.src.core.database import Base, SessionLocal, engine

    try:
        with SessionLocal() as session:
            session.execute(text("SELECT 1"))

        auto_create_schema = os.getenv("AUTO_CREATE_SCHEMA", "true").strip().lower() in {
            "1",
            "true",
            "yes",
            "y",
            "sim",
        }
        if auto_create_schema:
            Base.metadata.create_all(bind=engine)
            ensure_soft_delete_columns(engine, text)

        print("Banco de dados verificado com sucesso.")
    except OperationalError as exc:
        print(f"Falha na conexao com o banco de dados. Servidor nao iniciado. Detalhe: {exc}")
        raise SystemExit(1) from exc
    except SQLAlchemyError as exc:
        print(f"Falha ao preparar o schema do banco. Servidor nao iniciado. Detalhe: {exc}")
        raise SystemExit(1) from exc


if __name__ == "__main__":
    validate_installed_requirements()

    import uvicorn

    host = os.getenv("HOST", "127.0.0.1")
    port = int(os.getenv("PORT", "8000"))
    reload_enabled = os.getenv("UVICORN_RELOAD", "true").lower() in {"1", "true", "yes"}

    if should_run_startup_tests() and not run_startup_tests():
        print("Os testes falharam. O servidor nao sera iniciado.")
        raise SystemExit(1)

    check_database_before_start()
    uvicorn.run("backend.src.main:app", host=host, port=port, reload=reload_enabled)
