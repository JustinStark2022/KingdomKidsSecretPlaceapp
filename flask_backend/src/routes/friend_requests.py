from flask import Blueprint, jsonify, request, session
from flask_backend.src.storage import friend_requests_db

friend_requests_bp = Blueprint('friend_requests', __name__)

@friend_requests_bp.route('/api/friend-requests', methods=['GET'])
def get_requests():
    return jsonify(friend_requests_db)

@friend_requests_bp.route('/api/friend-requests/<int:req_id>', methods=['PUT'])
def update_request(req_id):
    data = request.json
    for req in friend_requests_db:
        if req["id"] == req_id:
            req["status"] = data.get("status", "pending")
            return jsonify(req)
    return jsonify({"error": "Not found"}), 404
