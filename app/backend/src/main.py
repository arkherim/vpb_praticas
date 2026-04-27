from fastapi import FastAPI
from backend.src.routes.user_routes import router
from backend.src.core.database import Base, engine

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(router)