from datetime import date
from decimal import Decimal

from sqlalchemy import func
from sqlalchemy.orm import Session

from app.backend.models.account import Account
from app.backend.models.transaction import Transaction


def get_month_range() -> tuple[date, date]:
    month_start = date.today().replace(day=1)
    if month_start.month == 12:
        next_month = month_start.replace(year=month_start.year + 1, month=1)
    else:
        next_month = month_start.replace(month=month_start.month + 1)
    return month_start, next_month


def get_dashboard_service(db: Session):
    month_start, next_month = get_month_range()

    total_balance = db.query(func.coalesce(func.sum(Account.balance), 0)).filter(
        Account.deleted_at.is_(None),
    ).scalar()

    total_accounts = db.query(func.count(Account.id)).filter(
        Account.deleted_at.is_(None),
    ).scalar()

    monthly_income = db.query(func.coalesce(func.sum(Transaction.amount), 0)).join(Account).filter(
        Account.deleted_at.is_(None),
        Transaction.type == "receita",
        Transaction.date >= month_start,
        Transaction.date < next_month,
    ).scalar()

    monthly_expenses = db.query(func.coalesce(func.sum(Transaction.amount), 0)).join(Account).filter(
        Account.deleted_at.is_(None),
        Transaction.type == "despesa",
        Transaction.date >= month_start,
        Transaction.date < next_month,
    ).scalar()

    monthly_transactions = db.query(func.count(Transaction.id)).join(Account).filter(
        Account.deleted_at.is_(None),
        Transaction.date >= month_start,
        Transaction.date < next_month,
    ).scalar()

    recent_transactions = db.query(Transaction).join(Account).filter(
        Account.deleted_at.is_(None),
    ).order_by(Transaction.date.desc(), Transaction.id.desc()).limit(10).all()

    monthly_income = monthly_income or Decimal("0")
    monthly_expenses = monthly_expenses or Decimal("0")

    return {
        "total_balance": total_balance or Decimal("0"),
        "monthly_income": monthly_income,
        "monthly_expenses": monthly_expenses,
        "monthly_balance": monthly_income - monthly_expenses,
        "total_accounts": total_accounts or 0,
        "monthly_transactions": monthly_transactions or 0,
        "recent_transactions": recent_transactions,
    }
