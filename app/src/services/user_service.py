from sqlalchemy.orm import Session
from src.repositories.user_repository import create_user, get_users

def create_user_service(db: Session, name: str, email: str):
    return create_user(db, name, email)

def list_users_service(db: Session):
    return get_users(db)