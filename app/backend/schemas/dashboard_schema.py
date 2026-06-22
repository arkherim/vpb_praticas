from decimal import Decimal

from pydantic import BaseModel

from app.backend.schemas.transaction_schema import TransactionResponse


class DashboardResponse(BaseModel):
    total_balance: Decimal
    monthly_income: Decimal
    monthly_expenses: Decimal
    monthly_balance: Decimal
    total_accounts: int
    monthly_transactions: int
    recent_transactions: list[TransactionResponse]
