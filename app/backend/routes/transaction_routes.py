from datetime import date

from fastapi import APIRouter, Depends, Query, Response, status
from sqlalchemy.orm import Session

from app.backend.core.dependencies import get_db
from app.backend.schemas.transaction_schema import TransactionCreate, TransactionResponse, TransactionUpdate
from app.backend.services.transaction_service import (
    create_transaction_service,
    delete_transaction_service,
    get_transaction_by_id_service,
    list_transactions_service,
    update_transaction_service,
)

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


@router.get("/transactions", response_model=list[TransactionResponse])
def list_transactions(
    account_id: int = Query(None),
    category_id: int = Query(None),
    transaction_date: date | None = Query(None, alias="date"),
    description: str | None = Query(None),
    db: Session = Depends(get_db),
):
    return list_transactions_service(db, account_id, category_id, transaction_date, description)


@router.get("/transactions/{transaction_id}", response_model=TransactionResponse)
def get_transaction(transaction_id: int, db: Session = Depends(get_db)):
    return get_transaction_by_id_service(db, transaction_id)


@router.patch("/transactions/{transaction_id}", response_model=TransactionResponse)
def update_transaction(transaction_id: int, transaction: TransactionUpdate, db: Session = Depends(get_db)):
    return update_transaction_service(
        db,
        transaction_id,
        transaction.account_id,
        transaction.category_id,
        transaction.schedule_id,
        transaction.type,
        transaction.amount,
        transaction.date,
        transaction.description,
        transaction.status,
    )


@router.delete("/transactions/{transaction_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_transaction(transaction_id: int, db: Session = Depends(get_db)):
    delete_transaction_service(db, transaction_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
