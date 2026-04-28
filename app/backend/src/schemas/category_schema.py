from datetime import datetime

from pydantic import BaseModel


class CategoryBase(BaseModel):
    user_id: int
    name: str
    description: str | None = None
    is_default: bool = False


class CategoryCreate(CategoryBase):
    pass


class CategoryUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    is_default: bool | None = None


class CategoryResponse(CategoryBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
