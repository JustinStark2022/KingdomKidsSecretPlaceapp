from flask import Blueprint, request, jsonify, session
from flask_backend.src.storage import users_db, generate_id

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/api/auth/signup', methods=['POST'])
def signup():
    data = request.get_json()
    user_id = generate_id()
    new_user = {
        "id": user_id,
        "username": data["username"],
        "password": data["password"],  # Note: plaintext for demo, hash in production
        "displayName": data["displayName"],
        "role": data.get("role", "child"),
        "createdAt": "2025-04-04"
    }
    users_db[user_id] = new_user
    return jsonify({"message": "Signup successful", "user": new_user})

@auth_bp.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    for user in users_db.values():
        if user["username"] == username and user["password"] == password:
            session["user_id"] = user["id"]
            return jsonify({"message": "Login successful", "user": user})

    return jsonify({"message": "Invalid credentials"}), 401
