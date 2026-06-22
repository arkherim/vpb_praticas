from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.backend.core.dependencies import get_db
from app.backend.schemas.bank_schema import BankResponse
from app.backend.services.bank_service import (
    get_bank_by_code_service,
    get_bank_by_id_service,
    get_bank_by_ispb_service,
    list_banks_service,
)

router = APIRouter(tags=["banks"])


@router.get("/banks", response_model=list[BankResponse])
def list_banks(search: str = Query(None), db: Session = Depends(get_db)):
    return list_banks_service(db, search)


@router.get("/banks/code/{code}", response_model=BankResponse)
def get_bank_by_code(code: int, db: Session = Depends(get_db)):
    return get_bank_by_code_service(db, code)


@router.get("/banks/ispb/{ispb}", response_model=BankResponse)
def get_bank_by_ispb(ispb: str, db: Session = Depends(get_db)):
    return get_bank_by_ispb_service(db, ispb)


@router.get("/banks/{bank_id}", response_model=BankResponse)
def get_bank(bank_id: int, db: Session = Depends(get_db)):
    return get_bank_by_id_service(db, bank_id)
