from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.src.core.dependencies import get_db
from backend.src.services.user_service import create_user_service, list_users_service
from backend.src.schemas.user_schema import UserCreate, UserResponse

router = APIRouter()

@router.post("/users", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    return create_user_service(db, user.name, user.email)

@router.get("/users")
def list_users(db: Session = Depends(get_db)):
    return list_users_service(db)
