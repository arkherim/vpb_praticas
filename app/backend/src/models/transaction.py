from sqlalchemy import Column, Date, ForeignKey, Integer, Numeric, String, Text
from sqlalchemy.orm import relationship

from backend.src.core.database import Base
from backend.src.models.mixins import TimestampMixin


class Transaction(TimestampMixin, Base):
    __tablename__ = "transacao"

    id = Column(Integer, primary_key=True, index=True)
    account_id = Column("id_conta", Integer, ForeignKey("conta.id", ondelete="RESTRICT"), nullable=False, index=True)
    category_id = Column("id_categoria", Integer, ForeignKey("categoria.id", ondelete="RESTRICT"), nullable=False, index=True)
    schedule_id = Column("id_agendamento", Integer, ForeignKey("agendamento.id", ondelete="SET NULL"), nullable=True, index=True)
    type = Column("tipo", String(10), nullable=False)
    amount = Column("valor", Numeric(12, 2), nullable=False)
    date = Column("data", Date, nullable=False)
    description = Column("descricao", Text, nullable=True)
    status = Column("status", String(20), nullable=False)

    account = relationship("Account", back_populates="transactions")
    category = relationship("Category", back_populates="transactions")
    schedule = relationship("Schedule", back_populates="transactions")
