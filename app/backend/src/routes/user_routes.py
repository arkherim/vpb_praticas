from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.src.core.database import SessionLocal
from backend.src.services.user_service import create_user_service, list_users_service

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