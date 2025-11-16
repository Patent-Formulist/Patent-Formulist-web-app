from sqlalchemy.orm import Session
from models import Users
from database import SessionLocal

def show_all_users():
    db = SessionLocal()
    try:
        users = db.query(Users).all()
        for user in users:
            print(f"ID: {user.id}, Email: {user.email}, Hashed Password: {user.hashed_password}")
    finally:
        db.close()

show_all_users()