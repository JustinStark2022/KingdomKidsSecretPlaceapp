from flask import Flask
from flask_cors import CORS
from .routes.example import example_bp
from .config import Config
import os

def create_app():
    app = Flask(__name__, static_folder="static", static_url_path="/")
    app.config.from_object(Config)
    CORS(app)

    app.register_blueprint(example_bp, url_prefix="/api")

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
