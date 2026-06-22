from sqlalchemy import Column, Integer, String

from app.backend.core.database import Base


class Bank(Base):
    __tablename__ = "banks"

    id = Column(Integer, primary_key=True, autoincrement=True)
    code = Column(Integer, unique=True, nullable=True)
    ispb = Column(String(8), unique=True, nullable=False)
    name = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
