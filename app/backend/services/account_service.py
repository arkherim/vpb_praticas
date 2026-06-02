from datetime import datetime, timezone
from decimal import Decimal, InvalidOperation

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.backend.models.account import Account
from app.backend.models.user import User


def validate_required_string(value, field_name: str) -> str:
    if value is None:
        raise HTTPException(status_code=400, detail=f"O campo {field_name} não pode ser nulo")
    if not isinstance(value, str):
        raise HTTPException(status_code=400, detail=f"O campo {field_name} deve ser uma string")

    normalized_value = value.strip()
    if not normalized_value:
        raise HTTPException(status_code=400, detail=f"O campo {field_name} não pode estar vazio")

    return normalized_value


def validate_required_integer(value, field_name: str) -> int:
    if value is None:
        raise HTTPException(status_code=400, detail=f"O campo {field_name} não pode ser nulo")
    if not isinstance(value, int) or isinstance(value, bool):
        raise HTTPException(status_code=400, detail=f"O campo {field_name} deve ser um inteiro")
    if value <= 0:
        raise HTTPException(status_code=400, detail=f"O campo {field_name} deve ser maior que zero")
    return value


def validate_decimal_value(value, field_name: str) -> Decimal:
    if value is None:
        raise HTTPException(status_code=400, detail=f"O campo {field_name} não pode ser nulo")

    try:
        return Decimal(str(value))
    except (InvalidOperation, ValueError):
        raise HTTPException(status_code=400, detail=f"O campo {field_name} deve ser um decimal válido")


def validate_user_exists(db: Session, user_id: int) -> None:
    user = db.query(User).filter(User.id == user_id, User.deleted_at.is_(None)).first()
    if user is None:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")


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


def list_accounts_service(db: Session, user_id: int = None) -> list:
    if user_id is not None:
        validate_user_exists(db, user_id)
        return db.query(Account).filter(Account.user_id == user_id, Account.deleted_at.is_(None)).all()
    return db.query(Account).filter(Account.deleted_at.is_(None)).all()


def get_account_by_id_service(db: Session, account_id: int):
    account = db.query(Account).filter(Account.id == account_id, Account.deleted_at.is_(None)).first()
    if account is None:
        raise HTTPException(status_code=404, detail="Conta não encontrada")
    return account


def delete_account_service(db: Session, account_id: int) -> None:
    account = db.query(Account).filter(Account.id == account_id, Account.deleted_at.is_(None)).first()
    if account is None:
        raise HTTPException(status_code=404, detail="Conta não encontrada")

    account.deleted_at = datetime.now(timezone.utc)
    db.commit()
