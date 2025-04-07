from flask import Flask, send_from_directory
from flask_cors import CORS
import os
from config import Config


def create_app():
    app = Flask(__name__, static_folder="../client/dist", static_url_path="/")
    app.config.from_object(Config)
    app.secret_key = app.config["SECRET_KEY"]
    CORS(app, supports_credentials=True)

    from src.routes import (
        auth, users, prayer, bible, alerts,
        friend_requests, games, monitoring,
        lessons, notifications, settings,
        dashboard  # ✅ NEW: Import your dashboard routes
    )

    app.register_blueprint(auth.auth_bp)
    app.register_blueprint(users.users_bp)
    app.register_blueprint(prayer.prayer_bp)
    app.register_blueprint(bible.bible_bp)
    app.register_blueprint(alerts.alerts_bp)
    app.register_blueprint(friend_requests.friend_requests_bp)
    app.register_blueprint(games.games_bp)
    app.register_blueprint(monitoring.monitoring_bp)
    app.register_blueprint(lessons.lessons_bp)
    app.register_blueprint(notifications.notifications_bp)
    app.register_blueprint(settings.settings_bp)
    app.register_blueprint(dashboard.dashboard_bp)  # ✅ NEW: Register the dashboard blueprint

    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    def serve(path):
        file_path = os.path.join(app.static_folder, path)
        if path != "" and os.path.exists(file_path):
            return send_from_directory(app.static_folder, path)
        return send_from_directory(app.static_folder, "index.html")

    return app
