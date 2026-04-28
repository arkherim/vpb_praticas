from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import text
from sqlalchemy.exc import OperationalError, SQLAlchemyError
from sqlalchemy.orm import Session

from backend.src.core.dependencies import get_db

router = APIRouter()


@router.get("/health")
def health_check(db: Session = Depends(get_db)):
    """Verificar status do database"""
    try:
        db.execute(text("SELECT 1"))
        return {"status: Database connected"}
    except OperationalError:
        raise HTTPException(status_code=503, detail="Database unavailable")
    except SQLAlchemyError:
        raise HTTPException(status_code=503, detail="Database query failed")
