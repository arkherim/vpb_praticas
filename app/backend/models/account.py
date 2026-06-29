from sqlalchemy import Column, DateTime, ForeignKey, Integer, Numeric, String
from sqlalchemy.orm import relationship

from app.backend.core.database import Base
from app.backend.models.mixins import TimestampMixin


class Account(TimestampMixin, Base):
    __tablename__ = "conta"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column("id_usuario", Integer, ForeignKey("usuario.id", ondelete="CASCADE"), nullable=False, index=True)
    bank = Column("banco", String(100), nullable=False)
    branch = Column("agencia", String(20), nullable=False)
    account_number = Column("numero_conta", String(30), nullable=False)
    account_type = Column("tipo", String(20), nullable=False)
    balance = Column("saldo", Numeric(12, 2), nullable=False, default=0)
    deleted_at = Column("excluido_em", DateTime(timezone=True), nullable=True)

    user = relationship("User", back_populates="accounts")
    transactions = relationship("Transaction", back_populates="account")
    schedules = relationship("Schedule", back_populates="account")
