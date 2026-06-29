from fastapi import APIRouter, Depends, Query, Response, status
from sqlalchemy.orm import Session

from app.backend.core.dependencies import get_db
from app.backend.schemas.category_schema import CategoryCreate, CategoryResponse, CategoryUpdate
from app.backend.services.category_service import (
    create_category_service,
    delete_category_service,
    get_category_by_id_service,
    list_categories_service,
    update_category_service,
)

router = APIRouter(tags=["categories"])


@router.post("/categories", response_model=CategoryResponse)
def create_category(category: CategoryCreate, db: Session = Depends(get_db)):
    return create_category_service(
        db,
        category.user_id,
        category.name,
        category.description,
        category.is_default,
    )


@router.get("/categories", response_model=list[CategoryResponse])
def list_categories(user_id: int = Query(None), db: Session = Depends(get_db)):
    return list_categories_service(db, user_id)


@router.get("/categories/{category_id}", response_model=CategoryResponse)
def get_category(category_id: int, db: Session = Depends(get_db)):
    return get_category_by_id_service(db, category_id)


@router.patch("/categories/{category_id}", response_model=CategoryResponse)
def update_category(category_id: int, category: CategoryUpdate, db: Session = Depends(get_db)):
    return update_category_service(
        db,
        category_id,
        category.name,
        category.description,
        category.is_default,
    )


@router.delete("/categories/{category_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_category(category_id: int, db: Session = Depends(get_db)):
    delete_category_service(db, category_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
