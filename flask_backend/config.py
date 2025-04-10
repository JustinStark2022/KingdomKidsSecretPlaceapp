import os
from dotenv import load_dotenv # type: ignore

load_dotenv()

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "default_secret")
    DEBUG = os.getenv("FLASK_DEBUG", "False") == "True"
