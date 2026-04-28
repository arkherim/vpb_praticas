from sqlalchemy import Column, Date, ForeignKey, Integer, Numeric, String, Text
from sqlalchemy.orm import relationship

from backend.src.core.database import Base
from backend.src.models.mixins import TimestampMixin


class Schedule(TimestampMixin, Base):
    __tablename__ = "agendamento"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column("id_usuario", Integer, ForeignKey("usuario.id", ondelete="CASCADE"), nullable=False, index=True)
    category_id = Column("id_categoria", Integer, ForeignKey("categoria.id", ondelete="RESTRICT"), nullable=False, index=True)
    type = Column("tipo", String(10), nullable=False)
    amount = Column("valor", Numeric(12, 2), nullable=False)
    due_date = Column("vencimento", Date, nullable=False)
    description = Column("descricao", Text, nullable=True)
    status = Column("status", String(20), nullable=False)

    user = relationship("User", back_populates="schedules")
    category = relationship("Category", back_populates="schedules")
    transactions = relationship("Transaction", back_populates="schedule")
