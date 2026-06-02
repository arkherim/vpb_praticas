import os
from pathlib import Path

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

if os.getenv("APP_ENV", "local").strip().lower() != "production":
    env_path = Path(__file__).resolve().parent.parent / ".env"
    if env_path.exists():
        load_dotenv(dotenv_path=env_path)


def get_database_url() -> str:
    database_url = os.environ.get("DATABASE_URL")
    if database_url:
        return database_url

    pg_host = os.environ.get("PGHOST")
    pg_db = os.environ.get("PGDATABASE")
    pg_user = os.environ.get("PGUSER")
    pg_password = os.environ.get("PGPASSWORD")
    if pg_host and pg_db and pg_user and pg_password:
        sslmode = os.environ.get("PGSSLMODE", "require")
        channel_binding = os.environ.get("PGCHANNELBINDING", "require")
        return (
            f"postgresql://{pg_user}:{pg_password}@{pg_host}/{pg_db}"
            f"?sslmode={sslmode}&channel_binding={channel_binding}"
        )

    raise RuntimeError(
        "DATABASE_URL environment variable is required. This application does not support SQLite."
    )


DATABASE_URL = get_database_url()
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()
