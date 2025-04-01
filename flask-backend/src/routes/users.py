from flask import Blueprint, jsonify

users_bp = Blueprint("users", __name__, url_prefix="/api/users")

@users_bp.route("/me", methods=["GET"])
def get_user_profile():
    return jsonify({
        "id": 1,
        "username": "demo_user",
        "role": "parent",
        "displayName": "Demo Parent",
        "createdAt": "2024-01-01T00:00:00Z"
    })