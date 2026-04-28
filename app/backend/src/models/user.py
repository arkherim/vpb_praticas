from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from backend.src.core.database import Base
from backend.src.models.mixins import TimestampMixin

class User(TimestampMixin, Base):
    __tablename__ = "usuario"

    id = Column(Integer, primary_key=True, index=True)
    name = Column("nome", String(100), nullable=False)
    email = Column(String(150), unique=True, nullable=False)
    password_hash = Column("senha_hash", String(255), nullable=True)

    accounts = relationship("Account", back_populates="user", cascade="all, delete-orphan")
    categories = relationship("Category", back_populates="user", cascade="all, delete-orphan")
    schedules = relationship("Schedule", back_populates="user", cascade="all, delete-orphan")
