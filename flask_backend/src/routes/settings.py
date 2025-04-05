from flask import Blueprint, request, jsonify, session
from src.storage import users_db, generate_id

settings_bp = Blueprint('settings', __name__)

@settings_bp.route('/api/users/child', methods=['POST'])
def add_child():
    parent_id = session.get("user_id")
    data = request.json
    new_child = {
        "id": generate_id(),
        "username": data["username"],
        "password": data["password"],
        "displayName": data["displayName"],
        "role": "child",
        "parentId": parent_id
    }
    users_db[new_child["id"]] = new_child
    return jsonify(new_child)

@settings_bp.route('/api/users/child/<int:child_id>', methods=['DELETE'])
def delete_child(child_id):
    user = users_db.pop(child_id, None)
    return jsonify({"message": "Child removed"}) if user else jsonify({"error": "Not found"}), 404
