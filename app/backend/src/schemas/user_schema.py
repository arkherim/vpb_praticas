from pydantic import BaseModel
from typing import Any, Optional

class UserBase(BaseModel):
    name: str
    email: str

class UserCreate(BaseModel):
    name: Any = None
    email: Any = None

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None

class UserResponse(UserBase):
    id: int

    class Config:
        from_attributes = True 
