from flask import Blueprint, jsonify, session
from src.storage import users_db

users_bp = Blueprint('users', __name__)

@users_bp.route('/api/users/me', methods=['GET'])
def get_me():
    user_id = session.get("user_id")
    if not user_id or user_id not in users_db:
        return jsonify(None), 401

    user = users_db[user_id]
    return jsonify({
        "id": user["id"],
        "username": user["username"],
        "displayName": user["displayName"],
        "role": user["role"],
        "createdAt": user.get("createdAt"),
        "isParent": user["role"] == "parent"
    })

@users_bp.route('/api/users/children', methods=['GET'])
def get_children():
    parent_id = session.get("user_id")
    children = [
        u for u in users_db.values()
        if u.get("parentId") == parent_id and u["role"] == "child"
    ]
    return jsonify(children)
