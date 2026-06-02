from fastapi import APIRouter, Depends, Query, Response, status
from sqlalchemy.orm import Session

from app.backend.core.dependencies import get_db
from app.backend.schemas.schedule_schema import (
    ScheduleCreate,
    ScheduleResponse,
    ScheduleUpdate,
)
from app.backend.services.schedule_service import (
    create_schedule_service,
    delete_schedule_service,
    get_schedule_by_id_service,
    list_schedules_service,
    update_schedule_service,
)

router = APIRouter(tags=["schedules"])


@router.post("/schedules", response_model=ScheduleResponse, status_code=status.HTTP_201_CREATED)
def create_schedule(schedule: ScheduleCreate, db: Session = Depends(get_db)):
    return create_schedule_service(
        db,
        schedule.user_id,
        schedule.category_id,
        schedule.type,
        schedule.amount,
        schedule.due_date,
        schedule.description,
        schedule.status,
    )


@router.get("/schedules", response_model=list[ScheduleResponse])
def list_schedules(user_id: int = Query(None), db: Session = Depends(get_db)):
    return list_schedules_service(db, user_id)


@router.get("/schedules/{schedule_id}", response_model=ScheduleResponse)
def get_schedule(schedule_id: int, db: Session = Depends(get_db)):
    return get_schedule_by_id_service(db, schedule_id)


@router.patch("/schedules/{schedule_id}", response_model=ScheduleResponse)
def update_schedule(schedule_id: int, schedule: ScheduleUpdate, db: Session = Depends(get_db)):
    return update_schedule_service(
        db,
        schedule_id,
        schedule.category_id,
        schedule.type,
        schedule.amount,
        schedule.due_date,
        schedule.description,
        schedule.status,
    )


@router.delete("/schedules/{schedule_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_schedule(schedule_id: int, db: Session = Depends(get_db)):
    delete_schedule_service(db, schedule_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
