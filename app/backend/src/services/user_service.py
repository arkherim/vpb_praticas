from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
import re

from backend.src.models.user import User

EMAIL_REGEX = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


def validate_required_string(value, field_name: str) -> str:
    if value is None:
        raise HTTPException(status_code=400, detail=f"{field_name} cannot be null")
    if not isinstance(value, str):
        raise HTTPException(status_code=400, detail=f"{field_name} must be a string")

    normalized_value = value.strip()
    if not normalized_value:
        raise HTTPException(status_code=400, detail=f"{field_name} cannot be empty")

    return normalized_value


def validate_email(value) -> str:
    normalized_email = validate_required_string(value, "email")
    if not EMAIL_REGEX.match(normalized_email):
        raise HTTPException(status_code=400, detail="Invalid email format")
    return normalized_email


def create_user(db: Session, name: str, email: str):
    try:
        user = User(name=name, email=email)
        db.add(user)
        db.commit()
        db.refresh(user)
        return user
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Email already registered")

def get_users(db: Session):
    return db.query(User).all()


def create_user_service(db: Session, name: str, email: str):
    validated_name = validate_required_string(name, "name")
    validated_email = validate_email(email)

    return create_user(db, validated_name, validated_email)

def list_users_service(db: Session):
    return get_users(db)
