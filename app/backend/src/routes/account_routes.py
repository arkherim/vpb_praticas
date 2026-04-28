from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.src.core.dependencies import get_db
from backend.src.schemas.account_schema import AccountCreate, AccountResponse
from backend.src.services.account_service import create_account_service

router = APIRouter()


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
