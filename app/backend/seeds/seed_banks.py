import httpx

from app.backend.core.database import SessionLocal
from app.backend.models.bank import Bank


def seed_banks() -> None:
    response = httpx.get("https://brasilapi.com.br/api/banks/v1", timeout=30)
    response.raise_for_status()
    banks = response.json()

    db = SessionLocal()
    try:
        for bank in banks:
            ispb = bank.get("ispb")
            if not ispb:
                continue

            exists = db.query(Bank).filter_by(ispb=ispb).first()
            if exists:
                continue

            db.add(Bank(
                code=bank.get("code"),
                ispb=ispb,
                name=bank["name"],
                full_name=bank["fullName"],
            ))

        db.commit()
    finally:
        db.close()


if __name__ == "__main__":
    seed_banks()
