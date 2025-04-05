from flask import Blueprint, jsonify
from src.storage import lessons_db, user_lesson_progress_db
from flask import session

lessons_bp = Blueprint('lessons', __name__)

@lessons_bp.route('/api/bible-lessons', methods=['GET'])
def get_lessons():
    return jsonify(lessons_db)

@lessons_bp.route('/api/user-lesson-progress', methods=['GET'])
def get_progress():
    user_id = session.get("user_id")
    return jsonify(user_lesson_progress_db.get(user_id, {}))
