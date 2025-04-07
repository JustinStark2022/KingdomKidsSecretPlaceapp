from flask import Blueprint, jsonify, session
from src.storage import lessons_db, user_lesson_progress_db

lessons_bp = Blueprint('lessons', __name__)

@lessons_bp.route('/api/bible-lessons', methods=['GET'])
def get_lessons():
    return jsonify(lessons_db)

@lessons_bp.route('/api/user-lesson-progress', methods=['GET'])
def get_progress():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify([])

    progress = user_lesson_progress_db.get(user_id, {})

    # Convert dictionary to list format expected by frontend
    return jsonify([
        { "lessonId": int(lesson_id), **data }
        for lesson_id, data in progress.items()
    ])