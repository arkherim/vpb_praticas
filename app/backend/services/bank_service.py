from fastapi import HTTPException
from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.backend.models.bank import Bank


def list_banks_service(db: Session, search: str | None = None) -> list[Bank]:
    query = db.query(Bank).order_by(Bank.name.asc())

    if search:
        normalized_search = f"%{search.strip()}%"
        query = query.filter(or_(
            Bank.name.ilike(normalized_search),
            Bank.full_name.ilike(normalized_search),
            Bank.ispb.ilike(normalized_search),
        ))

    return query.all()


def get_bank_by_id_service(db: Session, bank_id: int) -> Bank:
    bank = db.query(Bank).filter(Bank.id == bank_id).first()
    if bank is None:
        raise HTTPException(status_code=404, detail="Banco não encontrado")
    return bank


def get_bank_by_code_service(db: Session, code: int) -> Bank:
    bank = db.query(Bank).filter(Bank.code == code).first()
    if bank is None:
        raise HTTPException(status_code=404, detail="Banco não encontrado")
    return bank


def get_bank_by_ispb_service(db: Session, ispb: str) -> Bank:
    bank = db.query(Bank).filter(Bank.ispb == ispb).first()
    if bank is None:
        raise HTTPException(status_code=404, detail="Banco não encontrado")
    return bank
