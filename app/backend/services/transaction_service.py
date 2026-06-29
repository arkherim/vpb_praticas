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


def validate_optional_decimal(value, field_name: str) -> Decimal | None:
    if value is None:
        return None
    return validate_decimal_value(value, field_name)


def validate_required_date(value, field_name: str) -> date:
    if value is None:
        raise HTTPException(status_code=400, detail=f"O campo {field_name} não pode ser nulo")
    if not isinstance(value, date):
        raise HTTPException(status_code=400, detail=f"O campo {field_name} deve ser uma data válida")
    return value


def validate_optional_date(value, field_name: str) -> date | None:
    if value is None:
        return None
    return validate_required_date(value, field_name)


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
    if category.user_id is None:
        return
    if category.user_id != account.user_id:
        raise HTTPException(status_code=400, detail="Categoria não pertence ao usuário da conta")


def validate_schedule_exists(db: Session, schedule_id: int | None) -> Schedule | None:
    if schedule_id is None:
        return None

    schedule = db.query(Schedule).filter(Schedule.id == schedule_id).first()
    if schedule is None:
        raise HTTPException(status_code=404, detail="Agendamento não encontrado")
    return schedule


def get_transaction_or_404(db: Session, transaction_id: int) -> Transaction:
    transaction = db.query(Transaction).filter(Transaction.id == transaction_id).first()
    if transaction is None:
        raise HTTPException(status_code=404, detail="Transação não encontrada")
    return transaction


def apply_transaction_to_balance(account: Account, transaction_type: str, amount: Decimal) -> None:
    if transaction_type == "receita":
        account.balance += amount
    else:
        account.balance -= amount


def revert_transaction_from_balance(account: Account, transaction_type: str, amount: Decimal) -> None:
    if transaction_type == "receita":
        account.balance -= amount
    else:
        account.balance += amount


def restore_schedule_remaining_amount(schedule: Schedule, amount: Decimal) -> None:
    schedule.amount = Decimal(str(schedule.amount)) + amount
    schedule.status = "pendente"


def apply_transaction_to_schedule(schedule: Schedule, amount: Decimal) -> None:
    remaining_amount = Decimal(str(schedule.amount))
    if amount > remaining_amount:
        raise HTTPException(status_code=400, detail="Valor da transação não pode ser maior que o valor restante do agendamento")

    schedule.amount = remaining_amount - amount
    schedule.status = "pago" if schedule.amount == 0 else "pendente"


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

    apply_transaction_to_balance(account, validated_type, validated_amount)

    db.add(transaction)
    db.commit()
    db.refresh(transaction)
    return transaction


def list_transactions_service(db: Session, account_id: int | None = None) -> list[Transaction]:
    validated_account_id = validate_optional_integer(account_id, "account_id")
    query = db.query(Transaction)

    if validated_account_id is not None:
        validate_account_exists(db, validated_account_id)
        query = query.filter(Transaction.account_id == validated_account_id)

    return query.all()


def get_transaction_by_id_service(db: Session, transaction_id: int) -> Transaction:
    validated_transaction_id = validate_required_integer(transaction_id, "transaction_id")
    return get_transaction_or_404(db, validated_transaction_id)


def update_transaction_service(
    db: Session,
    transaction_id,
    account_id=None,
    category_id=None,
    schedule_id=None,
    type=None,
    amount=None,
    transaction_date=None,
    description=None,
    status=None,
) -> Transaction:
    validated_transaction_id = validate_required_integer(transaction_id, "transaction_id")
    transaction = get_transaction_or_404(db, validated_transaction_id)
    current_account = validate_account_exists(db, transaction.account_id)
    current_schedule = validate_schedule_exists(db, transaction.schedule_id)

    validated_account_id = validate_optional_integer(account_id, "account_id")
    validated_category_id = validate_optional_integer(category_id, "category_id")
    validated_schedule_id = validate_optional_integer(schedule_id, "schedule_id")
    validated_type = validate_transaction_type(type) if type is not None else None
    validated_amount = validate_optional_decimal(amount, "amount")
    validated_date = validate_optional_date(transaction_date, "date")
    validated_description = validate_optional_string(description, "description") if description is not None else None
    validated_status = validate_optional_string(status, "status")

    target_account = current_account
    if validated_account_id is not None and validated_account_id != transaction.account_id:
        target_account = validate_account_exists(db, validated_account_id)

    target_category_id = validated_category_id if validated_category_id is not None else transaction.category_id
    target_category = validate_category_exists(db, target_category_id)
    validate_category_ownership(target_account, target_category)
    target_schedule = validate_schedule_exists(db, validated_schedule_id) if schedule_id is not None else current_schedule

    new_type = validated_type if validated_type is not None else transaction.type
    new_amount = validated_amount if validated_amount is not None else transaction.amount

    if current_schedule is not None:
        restore_schedule_remaining_amount(current_schedule, Decimal(str(transaction.amount)))

    if target_schedule is not None:
        apply_transaction_to_schedule(target_schedule, new_amount)

    revert_transaction_from_balance(current_account, transaction.type, transaction.amount)
    apply_transaction_to_balance(target_account, new_type, new_amount)

    transaction.account_id = target_account.id
    transaction.category_id = target_category_id
    transaction.type = new_type
    transaction.amount = new_amount

    if schedule_id is not None:
        transaction.schedule_id = validated_schedule_id

    if validated_date is not None:
        transaction.date = validated_date

    if description is not None:
        transaction.description = validated_description

    if validated_status is not None:
        transaction.status = validated_status

    db.commit()
    db.refresh(transaction)
    return transaction


def delete_transaction_service(db: Session, transaction_id: int) -> None:
    validated_transaction_id = validate_required_integer(transaction_id, "transaction_id")
    transaction = get_transaction_or_404(db, validated_transaction_id)
    account = validate_account_exists(db, transaction.account_id)
    schedule = validate_schedule_exists(db, transaction.schedule_id)

    revert_transaction_from_balance(account, transaction.type, transaction.amount)
    if schedule is not None:
        restore_schedule_remaining_amount(schedule, Decimal(str(transaction.amount)))
    db.delete(transaction)
    db.commit()
