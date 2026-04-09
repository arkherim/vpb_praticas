from pydantic import BaseModel, EmailStr
from typing import Optional

# 🔹 Base (campos comuns)
class UserBase(BaseModel):
    name: str
    email: EmailStr


# 🔹 Entrada (criação)
class UserCreate(UserBase):
    password: str


# 🔹 Entrada (update parcial)
class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None


# 🔹 Saída (response)
class UserResponse(UserBase):
    id: int

    class Config:
        from_attributes = True  # permite converter do model (SQLAlchemy)