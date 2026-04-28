from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from backend.src.core.database import Base
from backend.src.models.mixins import TimestampMixin


class Category(TimestampMixin, Base):
    __tablename__ = "categoria"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column("id_usuario", Integer, ForeignKey("usuario.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column("nome", String(80), nullable=False)
    description = Column("descricao", Text, nullable=True)
    is_default = Column("padrao", Boolean, nullable=False, default=False)

    user = relationship("User", back_populates="categories")
    schedules = relationship("Schedule", back_populates="category")
    transactions = relationship("Transaction", back_populates="category")
