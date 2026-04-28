import logging

from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from sqlalchemy.exc import SQLAlchemyError

from backend.src import models  # noqa: F401
from backend.src.routes.account_routes import router as account_router
from backend.src.routes.health_routes import router as health_router
from backend.src.routes.user_routes import router as user_router
from backend.src.core.database import Base, engine

logger = logging.getLogger(__name__)

app = FastAPI()


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc: RequestValidationError):
    errors = []
    for error in exc.errors():
        field_name = error["loc"][-1]
        if error["type"] == "string_type" and error.get("input") is None:
            errors.append({
                "field": field_name,
                "message": f"{field_name} cannot be null",
            })
        else:
            errors.append({
                "field": field_name,
                "message": error["msg"],
            })

    return JSONResponse(status_code=422, content={"detail": errors})


@app.on_event("startup")
def startup() -> None:
    try:
        Base.metadata.create_all(bind=engine)
    except SQLAlchemyError:
        logger.warning("Database initialization skipped because the connection is unavailable.")

app.include_router(health_router)
app.include_router(account_router)
app.include_router(user_router)
