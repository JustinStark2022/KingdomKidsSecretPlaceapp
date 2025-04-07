from flask import Blueprint, jsonify
from src.storage import devotionals_db

devotionals_bp = Blueprint("devotionals", __name__)

@devotionals_bp.route("/api/devotionals", methods=["GET"])
def get_devotionals():
    return jsonify(devotionals_db)

@devotionals_bp.route("/api/devotionals/today", methods=["GET"])
def get_today_devotional():
    # In real use, filter by today's date
    return jsonify(devotionals_db[0])  # return most recent as placeholder