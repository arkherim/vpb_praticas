from fastapi import APIRouter, Depends, Query, Response, status
from sqlalchemy.orm import Session

from backend.src.core.dependencies import get_db
from backend.src.schemas.account_schema import AccountCreate, AccountResponse
from backend.src.services.account_service import (
    create_account_service,
    delete_account_service,
    list_accounts_service,
    get_account_by_id_service,
)

router = APIRouter(tags=["accounts"])


@router.post("/accounts", response_model=AccountResponse)
def create_account(account: AccountCreate, db: Session = Depends(get_db)):
    return create_account_service(
        db,
        account.user_id,
        account.bank,
        account.branch,
        account.account_number,
        account.account_type,
        account.balance,
    )


@router.get("/accounts", response_model=list[AccountResponse])
def list_accounts(user_id: int = Query(None), db: Session = Depends(get_db)):
    return list_accounts_service(db, user_id)


@router.get("/accounts/{account_id}", response_model=AccountResponse)
def get_account(account_id: int, db: Session = Depends(get_db)):
    return get_account_by_id_service(db, account_id)


@router.delete("/accounts/{account_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_account(account_id: int, db: Session = Depends(get_db)):
    delete_account_service(db, account_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
