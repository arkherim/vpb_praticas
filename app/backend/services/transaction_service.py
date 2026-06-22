from datetime import date
from decimal import Decimal, InvalidOperation

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.backend.models.account import Account
from app.backend.models.category import Category
from app.backend.models.schedule import Schedule
from app.backend.models.transaction import Transaction


def validate_required_integer(value, field_name: str) -> int:
    if value is None:
        raise HTTPException(status_code=400, detail=f"O campo {field_name} não pode ser nulo")
    if not isinstance(value, int) or isinstance(value, bool):
        raise HTTPException(status_code=400, detail=f"O campo {field_name} deve ser um inteiro")
    if value <= 0:
        raise HTTPException(status_code=400, detail=f"O campo {field_name} deve ser maior que zero")
    return value


def validate_optional_integer(value, field_name: str) -> int | None:
    if value is None:
        return None
    return validate_required_integer(value, field_name)


def validate_required_string(value, field_name: str) -> str:
    if value is None:
        raise HTTPException(status_code=400, detail=f"O campo {field_name} não pode ser nulo")
    if not isinstance(value, str):
        raise HTTPException(status_code=400, detail=f"O campo {field_name} deve ser uma string")

    normalized_value = value.strip()
    if not normalized_value:
        raise HTTPException(status_code=400, detail=f"O campo {field_name} não pode estar vazio")

    return normalized_value


def validate_optional_string(value, field_name: str) -> str | None:
    if value is None:
        return None
    return validate_required_string(value, field_name)


def validate_transaction_type(value) -> str:
    validated_type = validate_required_string(value, "type")
    if validated_type not in {"receita", "despesa"}:
        raise HTTPException(status_code=400, detail="O campo type deve ser receita ou despesa")
    return validated_type


def validate_decimal_value(value, field_name: str) -> Decimal:
    if value is None:
        raise HTTPException(status_code=400, detail=f"O campo {field_name} não pode ser nulo")

    try:
        decimal_value = Decimal(str(value))
    except (InvalidOperation, ValueError):
        raise HTTPException(status_code=400, detail=f"O campo {field_name} deve ser um decimal válido")

    if decimal_value <= 0:
        raise HTTPException(status_code=400, detail=f"O campo {field_name} deve ser maior que zero")

    return decimal_value


def validate_required_date(value, field_name: str) -> date:
    if value is None:
        raise HTTPException(status_code=400, detail=f"O campo {field_name} não pode ser nulo")
    if not isinstance(value, date):
        raise HTTPException(status_code=400, detail=f"O campo {field_name} deve ser uma data válida")
    return value


def validate_account_exists(db: Session, account_id: int) -> Account:
    account = db.query(Account).filter(Account.id == account_id, Account.deleted_at.is_(None)).first()
    if account is None:
        raise HTTPException(status_code=404, detail="Conta não encontrada")
    return account


def validate_category_exists(db: Session, category_id: int) -> Category:
    category = db.query(Category).filter(Category.id == category_id).first()
    if category is None:
        raise HTTPException(status_code=404, detail="Categoria não encontrada")
    return category


def validate_category_ownership(account: Account, category: Category) -> None:
    if category.user_id != account.user_id:
        raise HTTPException(status_code=400, detail="Categoria não pertence ao usuário da conta")


def validate_schedule_exists(db: Session, schedule_id: int | None) -> Schedule | None:
    if schedule_id is None:
        return None

    schedule = db.query(Schedule).filter(Schedule.id == schedule_id).first()
    if schedule is None:
        raise HTTPException(status_code=404, detail="Agendamento não encontrado")
    return schedule


def create_transaction_service(
    db: Session,
    account_id,
    category_id,
    schedule_id,
    type,
    amount,
    transaction_date,
    description,
    status,
) -> Transaction:
    validated_account_id = validate_required_integer(account_id, "account_id")
    validated_category_id = validate_required_integer(category_id, "category_id")
    validated_schedule_id = validate_optional_integer(schedule_id, "schedule_id")
    validated_type = validate_transaction_type(type)
    validated_amount = validate_decimal_value(amount, "amount")
    validated_date = validate_required_date(transaction_date, "date")
    validated_description = validate_optional_string(description, "description")
    validated_status = validate_optional_string(status, "status") or "pago"

    account = validate_account_exists(db, validated_account_id)
    category = validate_category_exists(db, validated_category_id)
    validate_category_ownership(account, category)
    validate_schedule_exists(db, validated_schedule_id)

    transaction = Transaction(
        account_id=validated_account_id,
        category_id=validated_category_id,
        schedule_id=validated_schedule_id,
        type=validated_type,
        amount=validated_amount,
        date=validated_date,
        description=validated_description,
        status=validated_status,
    )

    if validated_type == "receita":
        account.balance += validated_amount
    else:
        account.balance -= validated_amount

    db.add(transaction)
    db.commit()
    db.refresh(transaction)
    return transaction
