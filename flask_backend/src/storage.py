# In-memory data storage for testing
users_db = {}
alerts_db = []
prayer_entries_db = {}
friend_requests_db = []
game_monitoring_db = []
chat_logs_db = []
lessons_db = []
user_lesson_progress_db = {}

_id_counter = {"val": 1}
def generate_id():
    _id_counter["val"] += 1
    return _id_counter["val"]
