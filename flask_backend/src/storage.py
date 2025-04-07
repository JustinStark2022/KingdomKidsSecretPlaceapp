# In-memory data storage for testing
users_db = {}
alerts_db = []
prayer_entries_db = {}
friend_requests_db = []
game_monitoring_db = []
chat_logs_db = []

# Pre-populated Bible lessons
lessons_db = [
    {
        "id": 1,
        "title": "The Creation Story",
        "content": "In the beginning, God created the heavens and the earth.\n\nGod created the world in six days and rested on the seventh. He created light, land, plants, animals, and people.\n\nGod saw all that He had made, and it was very good.",
        "ageRange": "6-10",
        "scriptureReferences": "Genesis 1"
    },
    {
        "id": 2,
        "title": "Noah and the Ark",
        "content": "God told Noah to build an ark to save his family and animals from the flood.\n\nNoah obeyed even when others laughed at him. God protected them during the storm.\n\nThe rainbow was God's promise to never flood the whole earth again.",
        "ageRange": "6-12",
        "scriptureReferences": "Genesis 6–9"
    },
    {
        "id": 3,
        "title": "Jesus Feeds 5,000",
        "content": "A crowd followed Jesus, and they were hungry.\n\nA boy had five loaves and two fish. Jesus gave thanks and fed the whole crowd.\n\nEveryone ate and there were baskets of food left over.",
        "ageRange": "5-11",
        "scriptureReferences": "John 6:1–14"
    },
    {
        "id": 4,
        "title": "The Ten Commandments",
        "content": "God gave Moses the Ten Commandments on Mount Sinai.\n\nThese commandments teach us how to love God and others.\n\nWe show our love for God by obeying His Word.",
        "ageRange": "8-13",
        "scriptureReferences": "Exodus 20"
    }
]

# Sample devotionals
devotionals_db = [
    {
        "id": 1,
        "title": "God is Always With You",
        "verse": "Isaiah 41:10",
        "content": "Fear not, for I am with you; be not dismayed, for I am your God.\n\nNo matter what you face today, God promises to walk with you. You are never alone.",
        "date": "2025-04-07"
    },
    {
        "id": 2,
        "title": "Jesus Calms the Storm",
        "verse": "Mark 4:39",
        "content": "He got up, rebuked the wind and said to the waves, 'Quiet! Be still!'\n\nEven the storms in our lives must obey Jesus. Trust Him in your worries.",
        "date": "2025-04-06"
    },
    {
        "id": 3,
        "title": "God Provides",
        "verse": "Philippians 4:19",
        "content": "And my God will supply all your needs according to His riches in glory in Christ Jesus.\n\nGod knows what you need today. Trust that He will provide in His perfect timing.",
        "date": "2025-04-05"
    }
]

# Example user progress format: { user_id: { lesson_id: { completed: True } } }
user_lesson_progress_db = {}

# ID generator
_id_counter = {"val": 1}
def generate_id():
    _id_counter["val"] += 1
    return _id_counter["val"]
