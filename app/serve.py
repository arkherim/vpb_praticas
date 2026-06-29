import importlib.metadata
import os
from pathlib import Path


APP_DIR = Path(__file__).resolve().parent
REQUIREMENTS_FILE = APP_DIR / "backend" / "requirements.txt"


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

    try:
        lines = REQUIREMENTS_FILE.read_text(encoding="utf-8").splitlines()
    except FileNotFoundError:
        print(f"Arquivo de requirements não encontrado em: {REQUIREMENTS_FILE}. Pulando verificação.")
        return

    for line in lines:
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


def ensure_schema_columns(engine, text) -> None:
    statements_by_dialect = {
        "postgresql": [
            'ALTER TABLE IF EXISTS usuario ADD COLUMN IF NOT EXISTS excluido_em TIMESTAMPTZ',
            'ALTER TABLE IF EXISTS conta ADD COLUMN IF NOT EXISTS excluido_em TIMESTAMPTZ',
            'ALTER TABLE IF EXISTS agendamento ADD COLUMN IF NOT EXISTS id_conta INTEGER REFERENCES conta(id)',
        ],
        "sqlite": [
            'ALTER TABLE usuario ADD COLUMN excluido_em DATETIME',
            'ALTER TABLE conta ADD COLUMN excluido_em DATETIME',
            'ALTER TABLE agendamento ADD COLUMN IF NOT EXISTS id_conta INTEGER',
        ],
    }

    dialect_name = engine.dialect.name
    statements = statements_by_dialect.get(dialect_name, [])

    if not statements:
        return

    with engine.begin() as connection:
        if dialect_name == "sqlite":
            for table_name, column_name, add_statement in (
                ("usuario", "excluido_em", "ALTER TABLE usuario ADD COLUMN excluido_em DATETIME"),
                ("conta", "excluido_em", "ALTER TABLE conta ADD COLUMN excluido_em DATETIME"),
                ("agendamento", "id_conta", "ALTER TABLE agendamento ADD COLUMN id_conta INTEGER"),
            ):
                table_exists = connection.execute(
                    text(
                        "SELECT name FROM sqlite_master WHERE type='table' AND name=:table"
                    ),
                    {"table": table_name},
                ).fetchone()
                if not table_exists:
                    continue

                columns = {
                    row[1]
                    for row in connection.execute(text(f"PRAGMA table_info({table_name})")).fetchall()
                }
                if column_name not in columns:
                    connection.execute(text(add_statement))
            return

        for statement in statements:
            connection.execute(text(statement))


def check_database_before_start() -> None:
    from sqlalchemy import text
    from sqlalchemy.exc import OperationalError, SQLAlchemyError

    from app.backend import models  # noqa: F401
    from app.backend.core.database import Base, SessionLocal, engine

    try:
        with SessionLocal() as session:
            session.execute(text("SELECT 1"))

        auto_create_schema = os.environ.get("AUTO_CREATE_SCHEMA", "true").strip().lower() in {
            "1",
            "true",
            "yes",
            "y",
            "sim",
        }
        if auto_create_schema:
            Base.metadata.create_all(bind=engine)
            ensure_schema_columns(engine, text)

        print("Banco de dados verificado com sucesso.")
    except OperationalError as exc:
        print(f"Falha na conexao com o banco de dados. Servidor nao iniciado. Detalhe: {exc}")
        raise SystemExit(1) from exc
    except SQLAlchemyError as exc:
        print(f"Falha ao preparar o schema do banco. Servidor nao iniciado. Detalhe: {exc}")
        raise SystemExit(1) from exc


if __name__ == "__main__":
    if os.getenv("APP_ENV", "local").strip().lower() not in {"production", "render", "deploy"}:
        validate_installed_requirements()

    import uvicorn

    port = int(os.environ.get("PORT", 8000))

    check_database_before_start()
    # Render requires binding to 0.0.0.0 and uses PORT from environment.
    # Do not enable the auto-reloader in production services like Render.
    uvicorn.run("app.backend.main:app", host="0.0.0.0", port=port)

