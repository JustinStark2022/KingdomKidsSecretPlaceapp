from flask import Flask
from flask_cors import CORS
from .routes.example import example_bp
from .routes.auth import auth_bp
from .routes.users import users_bp
from .routes.devotionals import devotionals_bp
# from .routes.prayer import prayer_bp
# from .routes.bible import bible_bp
# from .routes.lessons import lessons_bp
from .config import Config
import os

def create_app():
    app = Flask(__name__, static_folder="static", static_url_path="/")
    app.config.from_object(Config)
    CORS(app)

    # Register API Blueprints
    app.register_blueprint(example_bp, url_prefix="/api")
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(users_bp, url_prefix="/api/users")
    app.register_blueprint(devotionals_bp, url_prefix="/api/devotionals")
   # app.register_blueprint(prayer_bp, url_prefix="/api/prayer-journal")
   # app.register_blueprint(bible_bp, url_prefix="/api/bible")
   # app.register_blueprint(lessons_bp, url_prefix="/api/bible-lessons")

    # Serve React build
    @app.route("/")
    def index():
        return app.send_static_file("index.html")

    @app.route("/<path:path>")
    def static_proxy(path):
        if os.path.isfile(os.path.join(app.static_folder, path)):
            return app.send_static_file(path)
        else:
            return app.send_static_file("index.html")

    return app
