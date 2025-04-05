from flask import Blueprint, jsonify
from src.storage import chat_logs_db

monitoring_bp = Blueprint('monitoring', __name__)

@monitoring_bp.route('/api/monitoring/chats', methods=['GET'])
def get_chats():
    return jsonify(chat_logs_db)
