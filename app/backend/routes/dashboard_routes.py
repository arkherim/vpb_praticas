from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.backend.core.dependencies import get_db
from app.backend.schemas.dashboard_schema import DashboardResponse
from app.backend.services.dashboard_service import get_dashboard_service

router = APIRouter(tags=["dashboard"])


@router.get("/dashboard", response_model=DashboardResponse)
def get_dashboard(db: Session = Depends(get_db)):
    return get_dashboard_service(db)
