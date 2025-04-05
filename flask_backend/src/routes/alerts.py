from flask import Blueprint, jsonify, session
from src.storage import alerts_db

alerts_bp = Blueprint('alerts', __name__)

@alerts_bp.route('/api/alerts', methods=['GET'])
def get_alerts():
    user_id = session.get("user_id")
    return jsonify([a for a in alerts_db if a["user_id"] == user_id])

@alerts_bp.route('/api/notifications/unread', methods=['GET'])
def get_unread_notifications():
    user_id = session.get("user_id")
    unread = [a for a in alerts_db if a["user_id"] == user_id and not a.get("read")]
    return jsonify({"count": len(unread)})
