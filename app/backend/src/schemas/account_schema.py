from datetime import datetime
from decimal import Decimal
from typing import Any

from pydantic import BaseModel


class AccountBase(BaseModel):
    user_id: int
    bank: str
    branch: str
    account_number: str
    account_type: str
    balance: Decimal


class AccountCreate(AccountBase):
    user_id: Any = None
    bank: Any = None
    branch: Any = None
    account_number: Any = None
    account_type: Any = None
    balance: Any = None


class AccountUpdate(BaseModel):
    bank: str | None = None
    branch: str | None = None
    account_number: str | None = None
    account_type: str | None = None
    balance: Decimal | None = None


class AccountResponse(AccountBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
