from flask import Blueprint, jsonify, session
from flask_backend.src.storage import alerts_db

notifications_bp = Blueprint('notifications', __name__)

@notifications_bp.route('/api/alerts/recent', methods=['GET'])
def get_recent_alerts():
    user_id = session.get("user_id")
    return jsonify([a for a in alerts_db if a["user_id"] == user_id and not a["handled"]])
