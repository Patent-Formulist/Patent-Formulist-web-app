from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from fastapi.security import OAuth2PasswordRequestForm

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", 
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

fake_db = {
    "user@example.com": "password123" 
}

class UserRegister(BaseModel):
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

@app.post("/api/register")
def register(user: UserRegister):
    if user.email in fake_db:
        raise HTTPException(status_code=400, detail="Пользователь уже существует")
    fake_db[user.email] = user.password
    return {"message": "Регистрация прошла успешно!"}

@app.post("/api/login")
def login(form_data: UserLogin):
    stored_password = fake_db.get(form_data.email)
    if not stored_password or stored_password != form_data.password:
        raise HTTPException(status_code=401, detail="Неверный email или пароль")
    return {"message": "Вход выполнен успешно"}