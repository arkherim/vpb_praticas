from datetime import date, datetime
from decimal import Decimal

from pydantic import BaseModel


class ScheduleBase(BaseModel):
    user_id: int
    category_id: int
    type: str
    amount: Decimal
    due_date: date
    description: str | None = None
    status: str


class ScheduleCreate(ScheduleBase):
    pass


class ScheduleUpdate(BaseModel):
    category_id: int | None = None
    type: str | None = None
    amount: Decimal | None = None
    due_date: date | None = None
    description: str | None = None
    status: str | None = None


class ScheduleResponse(ScheduleBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
