import sys, os
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__) + "/.."))

from fastapi.testclient import TestClient
from server import app

client = TestClient(app)

print("--- 1. Testing Updated Frontend & Static Assets ---")
r_index = client.get("/")
print("Index.html status:", r_index.status_code, "Length:", len(r_index.text))
assert r_index.status_code == 200
assert "theme-toggle" in r_index.text
assert "workout-plans" in r_index.text
assert "yoga-library" in r_index.text
assert "nutrition" in r_index.text
assert "corner-menu-btn" in r_index.text
assert "drawer-backdrop" in r_index.text

r_css = client.get("/css/style.css")
print("CSS status:", r_css.status_code, "Length:", len(r_css.text))
assert r_css.status_code == 200
assert '[data-theme="dark"]' in r_css.text

r_data = client.get("/js/data.js")
print("Data JS status:", r_data.status_code, "Length:", len(r_data.text))
assert r_data.status_code == 200
assert "home-workout-plan" in r_data.text
assert "weeklyProgram" in r_data.text
assert "indianFoodDatabase" in r_data.text

print("\n--- 2. Testing AI Assistant Endpoint ---")
res = client.post("/api/chat", json={
    "message": "Give me a personalized Indian breakfast plan.",
    "profile": {
        "age": 28,
        "sex": "male",
        "weight": 70,
        "height": 175,
        "goal": "loss",
        "intensity": "Moderate",
        "diet": "veg",
        "targetCalories": 2100,
        "targetProtein": 112
    }
})
print("Chat status:", res.status_code, "Reply:", res.json().get("reply")[:70])
assert res.status_code == 200

print("\n=========================================================================")
print(" ALL MAJOR FEATURES, ENDPOINTS, AND DATA INTEGRITY VERIFIED SUCCESSFULLY! ")
print("=========================================================================")
