from sqlalchemy import Column, ForeignKey, Integer, Numeric, String
from sqlalchemy.orm import relationship

from backend.src.core.database import Base
from backend.src.models.mixins import TimestampMixin


class Account(TimestampMixin, Base):
    __tablename__ = "conta"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column("id_usuario", Integer, ForeignKey("usuario.id", ondelete="CASCADE"), nullable=False, index=True)
    bank = Column("banco", String(100), nullable=False)
    branch = Column("agencia", String(20), nullable=False)
    account_number = Column("numero_conta", String(30), nullable=False)
    account_type = Column("tipo", String(20), nullable=False)
    balance = Column("saldo", Numeric(12, 2), nullable=False, default=0)

    user = relationship("User", back_populates="accounts")
    transactions = relationship("Transaction", back_populates="account")
