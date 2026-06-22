import logging

from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.backend import models  # noqa: F401
from app.backend.routes.user_routes import router as user_router
from app.backend.routes.account_routes import router as account_router
from app.backend.routes.bank_routes import router as bank_router
from app.backend.routes.dashboard_routes import router as dashboard_router
from app.backend.routes.schedule_routes import router as schedule_router
from app.backend.routes.transaction_routes import router as transaction_router

logger = logging.getLogger(__name__)

openapi_tags = [
    {"name": "users", "description": "Operacoes relacionadas a usuarios e autenticacao."},
    {"name": "accounts", "description": "Operacoes de CRUD e consulta de contas financeiras."},
    {"name": "banks", "description": "Operacoes de consulta de bancos brasileiros."},
    {"name": "dashboard", "description": "Operacoes de resumo financeiro consolidado."},
    {"name": "schedules", "description": "Operacoes de CRUD de compromissos financeiros."},
    {"name": "transactions", "description": "Operacoes de CRUD de movimentacoes financeiras."},
]

app = FastAPI(openapi_tags=openapi_tags)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc: RequestValidationError):
    errors = []
    for error in exc.errors():
        field_name = error["loc"][-1]
        if error["type"] == "string_type" and error.get("input") is None:
            errors.append({
                "field": field_name,
                "message": f"O campo {field_name} não pode ser nulo",
            })
        else:
            errors.append({
                "field": field_name,
                "message": error["msg"],
            })

    return JSONResponse(status_code=422, content={"detail": errors})


@app.exception_handler(Exception)
async def generic_exception_handler(request, exc: Exception):
    logger.error(f"Unhandled exception: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"detail": "Erro interno do servidor"}
    )


app.include_router(account_router)
app.include_router(bank_router)
app.include_router(dashboard_router)
app.include_router(schedule_router)
app.include_router(transaction_router)
app.include_router(user_router)
