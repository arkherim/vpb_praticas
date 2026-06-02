# app/backend/src/services/user_service.py

from datetime import datetime, timezone

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.backend.models.account import Account
from app.backend.models.user import User


def create_user_service(db: Session, name: str, email: str) -> User:
    """
    Cria um novo usuário no banco de dados.

    Args:
        db (Session): Sessão do banco de dados.
        name (str): Nome do usuário.
        email (str): Email do usuário.

    Returns:
        User: Objeto do usuário criado.
    """
    user = User(name=name, email=email, password="default")
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def list_users_service(db: Session) -> list:
    """
    Lista todos os usuários.

    Args:
        db (Session): Sessão do banco de dados.

    Returns:
        list: Lista de usuários.
    """
    return db.query(User).filter(User.deleted_at.is_(None)).all()


def update_user_password_service(db: Session, user_id: int, new_password: str) -> User:
    """
    Atualiza a senha de um usuário.

    Args:
        db (Session): Sessão do banco de dados.
        user_id (int): ID do usuário.
        new_password (str): Nova senha.

    Returns:
        User: Objeto do usuário atualizado.
    """
    user = db.query(User).filter(User.id == user_id, User.deleted_at.is_(None)).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    user.password = new_password
    db.commit()
    db.refresh(user)
    return user


def login_service(db: Session, email: str, password: str) -> User:
    """
    Valida as credenciais de login do usuário.

    Args:
        db (Session): Sessão do banco de dados.
        email (str): Email do usuário.
        password (str): Senha do usuário.

    Returns:
        User: Objeto do usuário se as credenciais forem válidas.

    Raises:
        HTTPException: Se o usuário não for encontrado ou a senha estiver incorreta.
    """
    user = db.query(User).filter(User.email == email, User.deleted_at.is_(None)).first()
    
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    if user.password != password:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    return user


def delete_user_service(db: Session, user_id: int) -> None:
    user = db.query(User).filter(User.id == user_id, User.deleted_at.is_(None)).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    deletion_time = datetime.now(timezone.utc)
    user.deleted_at = deletion_time

    db.query(Account).filter(
        Account.user_id == user_id,
        Account.deleted_at.is_(None),
    ).update({"deleted_at": deletion_time}, synchronize_session=False)

    db.commit()
