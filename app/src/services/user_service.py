from fastapi import HTTPException
from pydantic import EmailStr
from pydantic import TypeAdapter
from pydantic import ValidationError
from sqlalchemy.orm import Session
from src.repositories.user_repository import create_user, get_users

email_adapter = TypeAdapter(EmailStr)


def create_user_service(db: Session, name: str, email: str):
    try:
        validated_email = email_adapter.validate_python(email)
    except (ValidationError, ValueError):
        raise HTTPException(status_code=400, detail="Invalid email format")

    return create_user(db, name, validated_email)

def list_users_service(db: Session):
    return get_users(db)
