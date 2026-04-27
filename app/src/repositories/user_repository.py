from sqlalchemy.orm import Session
from src.models.user import User

def create_user(db: Session, name: str, email: str):
    user = User(name=name, email=email)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def get_users(db: Session):
    return db.query(User).all()

def delete_user(db: Session, user_id: int):
    user = db.query(User).filter(User.id == user_id).first()

    if user is None:
        return None

    db.delete(user)
    db.commit()
    return user

def update_user(db: Session, user_id: int, name: str | None = None, email: str | None = None):
    user = db.query(User).filter(User.id == user_id).first()

    if user is None:
        return None

    if name is not None:
        user.name = name

    if email is not None:
        user.email = email

    db.commit()
    db.refresh(user)
    return user
