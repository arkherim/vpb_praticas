from fastapi import HTTPException
from pydantic import EmailStr
from pydantic import TypeAdapter
from pydantic import ValidationError
from sqlalchemy.orm import Session
from src.repositories.user_repository import (
    create_user,
    delete_user,
    get_users,
    update_user,
)

email_adapter = TypeAdapter(EmailStr)


def create_user_service(db: Session, name: str, email: str):
    try:
        validated_email = email_adapter.validate_python(email)
    except (ValidationError, ValueError):
        raise HTTPException(status_code=400, detail="Invalid email format")

    return create_user(db, name, validated_email)

def list_users_service(db: Session):
    return get_users(db)

def delete_user_service(db: Session, user_id: int):
    deleted_user = delete_user(db, user_id)

    if deleted_user is None:
        raise HTTPException(status_code=404, detail="User not found")

    return {"message": "User deleted successfully"}

def update_user_service(
    db: Session,
    user_id: int,
    name: str | None = None,
    email: str | None = None,
):
    if name is None and email is None:
        raise HTTPException(status_code=400, detail="At least one field must be provided")

    validated_email = None

    if email is not None:
        try:
            validated_email = email_adapter.validate_python(email)
        except (ValidationError, ValueError):
            raise HTTPException(status_code=400, detail="Invalid email format")

    updated_user = update_user(db, user_id, name, validated_email)

    if updated_user is None:
        raise HTTPException(status_code=404, detail="User not found")

    return updated_user
