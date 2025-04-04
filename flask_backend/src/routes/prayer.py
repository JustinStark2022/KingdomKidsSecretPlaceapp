# flask-backend/src/routes/prayer.py
from flask import Blueprint, request, jsonify, session
from flask_backend.src.storage import prayer_entries_db, generate_id

prayer_bp = Blueprint('prayer', __name__)

@prayer_bp.route('/api/prayer-journal', methods=['GET'])
def get_prayer_entries():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify([])

    return jsonify(prayer_entries_db.get(user_id, []))

@prayer_bp.route('/api/prayer-journal', methods=['POST'])
def add_prayer_entry():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    data = request.json
    new_entry = {
        "id": generate_id(),
        "title": data.get("title"),
        "content": data.get("content"),
        "date": data.get("date")
    }
    prayer_entries_db.setdefault(user_id, []).append(new_entry)
    return jsonify(new_entry)

@prayer_bp.route('/api/prayer-journal/<int:entry_id>', methods=['PUT'])
def update_prayer_entry(entry_id):
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    data = request.json
    for entry in prayer_entries_db.get(user_id, []):
        if entry["id"] == entry_id:
            entry["title"] = data.get("title")
            entry["content"] = data.get("content")
            return jsonify(entry)
    return jsonify({"error": "Entry not found"}), 404

@prayer_bp.route('/api/prayer-journal/<int:entry_id>', methods=['DELETE'])
def delete_prayer_entry(entry_id):
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    entries = prayer_entries_db.get(user_id, [])
    prayer_entries_db[user_id] = [e for e in entries if e["id"] != entry_id]
    return jsonify({"message": "Deleted"})
