from flask import Blueprint, request, jsonify

bible_bp = Blueprint('bible', __name__)

@bible_bp.route('/api/bible/books')
def get_books():
    return jsonify([
        {"name": "Genesis", "chapters": 50},
        {"name": "Exodus", "chapters": 40},
        {"name": "Matthew", "chapters": 28}
    ])

@bible_bp.route('/api/bible/versions')
def get_versions():
    return jsonify(["KJV", "NIV"])

@bible_bp.route('/api/bible/content')
def get_chapter_content():
    return jsonify({
        "book": "Genesis",
        "chapter": 1,
        "verses": [
            {"verse": 1, "text": "In the beginning God created the heavens and the earth."},
            {"verse": 2, "text": "And the earth was without form, and void..."}
        ]
    })

@bible_bp.route('/api/bible/search')
def search_bible():
    return jsonify([
        {"book": "John", "chapter": 3, "verse": 16, "text": "For God so loved the world..."}
    ])
