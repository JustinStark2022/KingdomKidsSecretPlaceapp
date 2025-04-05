from flask import Blueprint, jsonify, request
from src.storage import game_monitoring_db

games_bp = Blueprint('games', __name__)

@games_bp.route('/api/games/monitoring', methods=['GET'])
def get_games():
    return jsonify(game_monitoring_db)

@games_bp.route('/api/games/monitoring/<int:game_id>', methods=['PUT'])
def update_game(game_id):
    data = request.json
    for game in game_monitoring_db:
        if game["id"] == game_id:
            game["approved"] = data.get("approved")
            return jsonify(game)
    return jsonify({"error": "Not found"}), 404
