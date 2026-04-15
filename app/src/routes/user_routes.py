from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.core.database import SessionLocal
from src.services.user_service import (
    create_user_service,
    delete_user_service,
    list_users_service,
    update_user_service,
)

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/users")
def create_user(name: str, email: str, db: Session = Depends(get_db)):
    return create_user_service(db, name, email)

@router.get("/users")
def list_users(db: Session = Depends(get_db)):
    return list_users_service(db)

@router.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    return delete_user_service(db, user_id)

@router.put("/users/{user_id}")
def update_user(
    user_id: int,
    name: str | None = None,
    email: str | None = None,
    db: Session = Depends(get_db),
):
    return update_user_service(db, user_id, name, email)
