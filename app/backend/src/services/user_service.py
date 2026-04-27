from fastapi import HTTPException
from pydantic import EmailStr
from pydantic import TypeAdapter
from pydantic import ValidationError
from sqlalchemy.orm import Session
from backend.src.models.user import User

email_adapter = TypeAdapter(EmailStr)


def create_user(db: Session, name: str, email: str):
    user = User(name=name, email=email)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def get_users(db: Session):
    return db.query(User).all()


def create_user_service(db: Session, name: str, email: str):
    try:
        validated_email = email_adapter.validate_python(email)
    except (ValidationError, ValueError):
        raise HTTPException(status_code=400, detail="Invalid email format")

    return create_user(db, name, validated_email)

def list_users_service(db: Session):
    return get_users(db)
