from sqlalchemy import Column, DateTime, Integer, String
from sqlalchemy.orm import relationship

from app.backend.core.database import Base
from app.backend.models.mixins import TimestampMixin


class User(TimestampMixin, Base):
    __tablename__ = "usuario"

    id = Column(Integer, primary_key=True, index=True)
    name = Column("nome", String(100), nullable=False, index=True)
    email = Column(String(150), unique=True, nullable=False, index=True)
    password = Column("senha_hash", String(255), nullable=True)
    deleted_at = Column("excluido_em", DateTime(timezone=True), nullable=True)
    accounts = relationship("Account", back_populates="user", cascade="all, delete-orphan")
    categories = relationship("Category", back_populates="user", cascade="all, delete-orphan")
    schedules = relationship("Schedule", back_populates="user", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<User(name={self.name}, email={self.email})>"
