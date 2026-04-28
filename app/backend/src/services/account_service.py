from decimal import Decimal, InvalidOperation

from fastapi import HTTPException
from sqlalchemy.orm import Session

from backend.src.models.account import Account
from backend.src.models.user import User


def validate_required_string(value, field_name: str) -> str:
    if value is None:
        raise HTTPException(status_code=400, detail=f"{field_name} cannot be null")
    if not isinstance(value, str):
        raise HTTPException(status_code=400, detail=f"{field_name} must be a string")

    normalized_value = value.strip()
    if not normalized_value:
        raise HTTPException(status_code=400, detail=f"{field_name} cannot be empty")

    return normalized_value


def validate_required_integer(value, field_name: str) -> int:
    if value is None:
        raise HTTPException(status_code=400, detail=f"{field_name} cannot be null")
    if not isinstance(value, int) or isinstance(value, bool):
        raise HTTPException(status_code=400, detail=f"{field_name} must be an integer")
    if value <= 0:
        raise HTTPException(status_code=400, detail=f"{field_name} must be greater than zero")
    return value


def validate_decimal_value(value, field_name: str) -> Decimal:
    if value is None:
        raise HTTPException(status_code=400, detail=f"{field_name} cannot be null")

    try:
        return Decimal(str(value))
    except (InvalidOperation, ValueError):
        raise HTTPException(status_code=400, detail=f"{field_name} must be a valid decimal")


def validate_user_exists(db: Session, user_id: int) -> None:
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")


def create_account(
    db: Session,
    user_id: int,
    bank: str,
    branch: str,
    account_number: str,
    account_type: str,
    balance: Decimal,
):
    account = Account(
        user_id=user_id,
        bank=bank,
        branch=branch,
        account_number=account_number,
        account_type=account_type,
        balance=balance,
    )
    db.add(account)
    db.commit()
    db.refresh(account)
    return account


def create_account_service(
    db: Session,
    user_id,
    bank,
    branch,
    account_number,
    account_type,
    balance,
):
    validated_user_id = validate_required_integer(user_id, "user_id")
    validated_bank = validate_required_string(bank, "bank")
    validated_branch = validate_required_string(branch, "branch")
    validated_account_number = validate_required_string(account_number, "account_number")
    validated_account_type = validate_required_string(account_type, "account_type")
    validated_balance = validate_decimal_value(balance, "balance")

    validate_user_exists(db, validated_user_id)

    return create_account(
        db,
        validated_user_id,
        validated_bank,
        validated_branch,
        validated_account_number,
        validated_account_type,
        validated_balance,
    )
