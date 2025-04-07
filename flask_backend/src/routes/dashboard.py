# src/routes/dashboard.py
from flask import Blueprint, jsonify, session
from src.storage import users_db, lessons_db

dashboard_bp = Blueprint("dashboard", __name__)

@dashboard_bp.route("/api/dashboard/child", methods=["GET"])
def get_child_dashboard():
    user_id = session.get("user_id")
    user = users_db.get(user_id)

    if not user or user["role"] != "child":
        return jsonify({"error": "Unauthorized"}), 403

    return jsonify({
        "user": {
            "id": user["id"],
            "displayName": user["displayName"],
        },
        "dailyDevotional": {
            "title": "God is With You",
            "verse": "Isaiah 41:10",
            "content": "Fear not, for I am with you; be not dismayed, for I am your God..."
        },
        "gameTime": {
            "earned": 30,
            "available": 15,
            "total": 60
        },
        "scriptureProgress": [
            {
                "id": 1,
                "scriptureReference": "John 3:16",
                "content": "For God so loved the world...",
                "memorized": False
            }
        ],
        "recentLessons": lessons_db[:3]  # Example
    })