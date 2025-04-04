from flask import Blueprint, jsonify

devotionals_bp = Blueprint("devotionals", __name__, url_prefix="/api")

@devotionals_bp.route("/devotionals", methods=["GET"])
def get_devotionals():
    return jsonify([
        {"id": 1, "title": "Trusting God", "date": "2024-04-01"},
        {"id": 2, "title": "Love Your Neighbor", "date": "2024-04-02"}
    ])