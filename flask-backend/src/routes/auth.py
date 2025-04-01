from flask import Blueprint, request, jsonify

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")

@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    return jsonify({"message": "Signup successful", "user": data}), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    return jsonify({"message": "Login successful", "token": "mock-token"}), 200

@auth_bp.route("/me", methods=["GET"])
def get_me():
    return jsonify({
        "id": 1,
        "username": "demo_user",
        "role": "parent",
        "displayName": "Demo Parent",
        "createdAt": "2024-01-01T00:00:00Z"
    })