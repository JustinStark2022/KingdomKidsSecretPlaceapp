from flask import Blueprint, request, jsonify
import requests

bible_bp = Blueprint('bible', __name__)

API_BIBLE_KEY = "916cf86823f96f0fc1272a2dd7718e50"

@bible_bp.route("/api/bible-verse", methods=["GET"])
def get_bible_verse():
    bible_id = request.args.get("bibleId")
    passage = request.args.get("passage")

    if not bible_id or not passage:
        return jsonify({"error": "Missing bibleId or passage"}), 400

    url = f"https://api.scripture.api.bible/v1/bibles/{bible_id}/passages/{passage}?content-type=text"
    headers = {
        "api-key": API_BIBLE_KEY
    }

    try:
        res = requests.get(url, headers=headers)
        res.raise_for_status()
        return jsonify(res.json())
    except requests.RequestException as e:
        return jsonify({"error": str(e)}), 500

@bible_bp.route('/api/bible/books')
def get_books():
    return jsonify([
        {"name": "Genesis", "chapters": 50},
        {"name": "Exodus", "chapters": 40},
        {"name": "Matthew", "chapters": 28}
    ])

@bible_bp.route('/api/bible/versions')
def get_versions():
    return jsonify({
        "versions": [
            {"id": "de4e12af7f28f599-02", "name": "NIrV"},
            {"id": "fae1f5d81de52cbe-01", "name": "NLT"},
            {"id": "06125adad2d5898a-01", "name": "ERV"},
            {"id": "9879dbb7cfe39e4d-01", "name": "NIV"},
            {"id": "1d07b894f3e8f5f4-01", "name": "CSB"}
        ]
    })

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