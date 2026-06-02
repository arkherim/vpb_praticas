from pydantic import BaseModel
from typing import Any, Optional
from datetime import datetime

class UserBase(BaseModel):
    name: str
    email: str

class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None

class UserResponse(UserBase):
    id: int
    created_at: datetime = None

    class Config:
        from_attributes = True

class LoginResponse(BaseModel):
    id: int
    name: str
    email: str
    message: str = "Login successful"

    class Config:
        from_attributes = True