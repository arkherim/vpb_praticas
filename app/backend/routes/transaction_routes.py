from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.backend.core.dependencies import get_db
from app.backend.schemas.transaction_schema import TransactionCreate, TransactionResponse
from app.backend.services.transaction_service import create_transaction_service

router = APIRouter(tags=["transactions"])


@router.post("/transactions", response_model=TransactionResponse, status_code=status.HTTP_201_CREATED)
def create_transaction(transaction: TransactionCreate, db: Session = Depends(get_db)):
    return create_transaction_service(
        db,
        transaction.account_id,
        transaction.category_id,
        transaction.schedule_id,
        transaction.type,
        transaction.amount,
        transaction.date,
        transaction.description,
        transaction.status,
    )
