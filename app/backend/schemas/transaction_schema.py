from datetime import date, datetime
from decimal import Decimal

from pydantic import BaseModel

Date = date


class TransactionBase(BaseModel):
    account_id: int
    category_id: int
    schedule_id: int | None = None
    type: str
    amount: Decimal
    date: Date
    description: str | None = None
    status: str


class TransactionCreate(TransactionBase):
    status: str | None = None


class TransactionUpdate(BaseModel):
    account_id: int | None = None
    category_id: int | None = None
    schedule_id: int | None = None
    type: str | None = None
    amount: Decimal | None = None
    date: Date | None = None
    description: str | None = None
    status: str | None = None


class TransactionResponse(TransactionBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
