from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.backend.models.category import Category
from app.backend.models.schedule import Schedule
from app.backend.models.transaction import Transaction
from app.backend.models.user import User


def validate_required_integer(value, field_name: str) -> int:
    if value is None:
        raise HTTPException(status_code=400, detail=f"O campo {field_name} não pode ser nulo")
    if not isinstance(value, int) or isinstance(value, bool):
        raise HTTPException(status_code=400, detail=f"O campo {field_name} deve ser um inteiro")
    if value <= 0:
        raise HTTPException(status_code=400, detail=f"O campo {field_name} deve ser maior que zero")
    return value


def validate_required_string(value, field_name: str) -> str:
    if value is None:
        raise HTTPException(status_code=400, detail=f"O campo {field_name} não pode ser nulo")
    if not isinstance(value, str):
        raise HTTPException(status_code=400, detail=f"O campo {field_name} deve ser uma string")

    normalized_value = value.strip()
    if not normalized_value:
        raise HTTPException(status_code=400, detail=f"O campo {field_name} não pode estar vazio")

    return normalized_value


def validate_optional_string(value, field_name: str):
    if value is None:
        return None
    return validate_required_string(value, field_name)


def validate_user_exists(db: Session, user_id: int) -> None:
    user = db.query(User).filter(User.id == user_id, User.deleted_at.is_(None)).first()
    if user is None:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")


def validate_category_exists(db: Session, category_id: int) -> Category:
    category = db.query(Category).filter(Category.id == category_id).first()
    if category is None:
        raise HTTPException(status_code=404, detail="Categoria não encontrada")
    return category


def create_category_service(
    db: Session,
    user_id: int,
    name: str,
    description: str | None = None,
    is_default: bool = False,
) -> Category:
    validated_user_id = validate_required_integer(user_id, "user_id")
    validated_name = validate_required_string(name, "name")
    validated_description = validate_optional_string(description, "description")

    if not isinstance(is_default, bool):
        raise HTTPException(status_code=400, detail="O campo is_default deve ser um booleano")

    validate_user_exists(db, validated_user_id)

    category = Category(
        user_id=validated_user_id,
        name=validated_name,
        description=validated_description,
        is_default=is_default,
    )
    db.add(category)
    db.commit()
    db.refresh(category)
    return category


def list_categories_service(db: Session, user_id: int | None = None) -> list[Category]:
    if user_id is not None:
        validated_user_id = validate_required_integer(user_id, "user_id")
        validate_user_exists(db, validated_user_id)
        return db.query(Category).filter(Category.user_id == validated_user_id).all()

    return db.query(Category).all()


def get_category_by_id_service(db: Session, category_id: int) -> Category:
    validated_category_id = validate_required_integer(category_id, "category_id")
    return validate_category_exists(db, validated_category_id)


def update_category_service(
    db: Session,
    category_id: int,
    name: str | None = None,
    description: str | None = None,
    is_default: bool | None = None,
) -> Category:
    validated_category_id = validate_required_integer(category_id, "category_id")
    category = validate_category_exists(db, validated_category_id)

    if name is not None:
        category.name = validate_optional_string(name, "name")

    if description is not None:
        category.description = validate_optional_string(description, "description")

    if is_default is not None:
        if not isinstance(is_default, bool):
            raise HTTPException(status_code=400, detail="O campo is_default deve ser um booleano")
        category.is_default = is_default

    db.commit()
    db.refresh(category)
    return category


def delete_category_service(db: Session, category_id: int) -> None:
    validated_category_id = validate_required_integer(category_id, "category_id")
    category = validate_category_exists(db, validated_category_id)

    has_schedules = db.query(Schedule).filter(Schedule.category_id == validated_category_id).first() is not None
    has_transactions = db.query(Transaction).filter(Transaction.category_id == validated_category_id).first() is not None

    if has_schedules or has_transactions:
        raise HTTPException(status_code=400, detail="Não é possível remover uma categoria que está em uso")

    db.delete(category)
    db.commit()
