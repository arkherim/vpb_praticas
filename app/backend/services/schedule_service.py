from datetime import date
from decimal import Decimal, InvalidOperation

from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.backend.models.category import Category
from app.backend.models.schedule import Schedule
from app.backend.models.user import User


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


def validate_decimal_value(value, field_name: str) -> Decimal:
    if value is None:
        raise HTTPException(status_code=400, detail=f"O campo {field_name} não pode ser nulo")

    try:
        return Decimal(str(value))
    except (InvalidOperation, ValueError):
        raise HTTPException(status_code=400, detail=f"O campo {field_name} deve ser um decimal válido")


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


def validate_user_exists(db: Session, user_id: int) -> User:
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return user


def validate_category_exists(db: Session, category_id: int) -> Category:
    category = db.query(Category).filter(Category.id == category_id).first()
    if category is None:
        raise HTTPException(status_code=404, detail="Categoria não encontrada")
    return category


def validate_category_ownership(user_id: int, category: Category) -> None:
    if category.user_id != user_id:
        raise HTTPException(status_code=400, detail="Categoria não pertence ao usuário informado")


def get_schedule_or_404(db: Session, schedule_id: int) -> Schedule:
    schedule = db.query(Schedule).filter(Schedule.id == schedule_id).first()
    if schedule is None:
        raise HTTPException(status_code=404, detail="Compromisso não encontrado")
    return schedule


def create_schedule_service(
    db: Session,
    user_id,
    category_id,
    type,
    amount,
    due_date,
    description,
    status,
):
    validated_user_id = validate_required_integer(user_id, "user_id")
    validated_category_id = validate_required_integer(category_id, "category_id")
    validated_type = validate_required_string(type, "type")
    validated_amount = validate_decimal_value(amount, "amount")
    validated_due_date = validate_required_date(due_date, "due_date")
    validated_description = validate_optional_string(description, "description")
    validated_status = validate_required_string(status, "status")

    validate_user_exists(db, validated_user_id)
    category = validate_category_exists(db, validated_category_id)
    validate_category_ownership(validated_user_id, category)

    schedule = Schedule(
        user_id=validated_user_id,
        category_id=validated_category_id,
        type=validated_type,
        amount=validated_amount,
        due_date=validated_due_date,
        description=validated_description,
        status=validated_status,
    )
    db.add(schedule)
    db.commit()
    db.refresh(schedule)
    return schedule


def list_schedules_service(db: Session, user_id: int | None = None) -> list[Schedule]:
    validated_user_id = validate_optional_integer(user_id, "user_id")
    query = db.query(Schedule)

    if validated_user_id is not None:
        validate_user_exists(db, validated_user_id)
        query = query.filter(Schedule.user_id == validated_user_id)

    return query.all()


def get_schedule_by_id_service(db: Session, schedule_id: int) -> Schedule:
    validated_schedule_id = validate_required_integer(schedule_id, "schedule_id")
    return get_schedule_or_404(db, validated_schedule_id)


def update_schedule_service(
    db: Session,
    schedule_id,
    category_id=None,
    type=None,
    amount=None,
    due_date=None,
    description=None,
    status=None,
):
    validated_schedule_id = validate_required_integer(schedule_id, "schedule_id")
    schedule = get_schedule_or_404(db, validated_schedule_id)

    validated_category_id = validate_optional_integer(category_id, "category_id")
    validated_type = validate_optional_string(type, "type")
    validated_amount = validate_optional_decimal(amount, "amount")
    validated_due_date = validate_optional_date(due_date, "due_date")
    validated_description = validate_optional_string(description, "description") if description is not None else None
    validated_status = validate_optional_string(status, "status")

    if validated_category_id is not None:
        category = validate_category_exists(db, validated_category_id)
        validate_category_ownership(schedule.user_id, category)
        schedule.category_id = validated_category_id

    if validated_type is not None:
        schedule.type = validated_type

    if validated_amount is not None:
        schedule.amount = validated_amount

    if validated_due_date is not None:
        schedule.due_date = validated_due_date

    if description is not None:
        schedule.description = validated_description

    if validated_status is not None:
        schedule.status = validated_status

    db.commit()
    db.refresh(schedule)
    return schedule


def delete_schedule_service(db: Session, schedule_id: int) -> None:
    validated_schedule_id = validate_required_integer(schedule_id, "schedule_id")
    schedule = get_schedule_or_404(db, validated_schedule_id)

    try:
        db.delete(schedule)
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=409,
            detail="Compromisso não pode ser excluído porque está vinculado a outros registros",
        )
