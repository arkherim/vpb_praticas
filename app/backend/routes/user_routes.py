# app/backend/src/routes/user_routes.py

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session
from app.backend.core.dependencies import get_db
from app.backend.services.user_service import (
    create_user_service,
    delete_user_service,
    list_users_service,
    update_user_password_service,
    login_service,
)
from app.backend.schemas.user_schema import UserCreate, UserResponse, UserLogin, LoginResponse

router = APIRouter(tags=["users"])

@router.post("/users", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    return create_user_service(db, user.name, user.email, user.password)


@router.get("/users")
def list_users(db: Session = Depends(get_db)):
    return list_users_service(db)


@router.put("/users/{user_id}/password", response_model=UserResponse)
def update_password(user_id: int, new_password: str, db: Session = Depends(get_db)):
    return update_user_password_service(db, user_id, new_password)


@router.post("/login", response_model=LoginResponse)
def login(credentials: UserLogin, db: Session = Depends(get_db)):
    user = login_service(db, credentials.email, credentials.password)
    return LoginResponse(
        id=user.id,
        name=user.name,
        email=user.email,
        message="Login successful"
    )


@router.delete("/users/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    delete_user_service(db, user_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
