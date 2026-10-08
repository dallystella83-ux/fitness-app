import httpx
import os
import re

print("=== 1. SERVER HEALTH & STATIC ASSET CHECKS ===")
base = "http://127.0.0.1:8000"
client = httpx.Client(timeout=30.0)

r_index = client.get(f"{base}/")
assert r_index.status_code == 200, f"Index failed: {r_index.status_code}"
print(f" [PASS] GET / -> 200 OK (HTML served, len: {len(r_index.text)})")

r_css = client.get(f"{base}/css/style.css")
assert r_css.status_code == 200, f"CSS failed: {r_css.status_code}"
print(" [PASS] GET /css/style.css -> 200 OK")

r_js = client.get(f"{base}/js/app.js")
assert r_js.status_code == 200, f"JS failed: {r_js.status_code}"
print(" [PASS] GET /js/app.js -> 200 OK")

r_health = client.get(f"{base}/health")
assert r_health.status_code == 200 and r_health.json().get("status") == "ok", "Health failed"
print(" [PASS] GET /health ->", r_health.json())

print("\n=== 2. GEMINI AI INTEGRATION WITH USER PROFILE ===")
test_profile = {
    "age": 28,
    "sex": "male",
    "height": 175,
    "weight": 70,
    "activity": "moderate",
    "level": "beginner",
    "goal": "loss",
    "diet": "veg",
    "allergies": "None",
    "foodPreferences": "Indian home meals",
    "targetCalories": 2042,
    "targetProtein": 112,
    "bmi": 22.9,
    "bmiCategory": "Normal Weight",
    "intensity": "Moderate"
}

chat_req = {
    "message": "What Indian dinner should I eat tonight to hit my calorie and protein targets?",
    "profile": test_profile
}

r_chat = client.post(f"{base}/api/chat", json=chat_req)
assert r_chat.status_code == 200, f"Chat failed: {r_chat.status_code}"
reply = r_chat.json().get("reply", "")
assert len(reply) > 20, "Reply too short"
print(" [PASS] POST /api/chat with Gemini & Profile -> 200 OK")
print("Gemini Response Preview:\n", reply[:200], "...\n")

print("=== 3. IMAGE ASSET INTEGRITY ===")
with open("index.html", encoding="utf-8") as f:
    html_src = f.read()
with open("js/app.js", encoding="utf-8") as f:
    js_src = f.read()

img_paths = set(re.findall(r"assets/images/[a-zA-Z0-9_\-\./]+", html_src + js_src))
missing = []
for p in img_paths:
    clean_p = p.rstrip("',\"")
    if not os.path.exists(clean_p):
        missing.append(clean_p)
if missing:
    print(" [WARN] Missing image files:", missing)
else:
    print(f" [PASS] All {len(img_paths)} referenced image assets exist on disk!")

print("\n=== 4. NAVIGATION & HEADER INTEGRITY ===")
assert "FITGUIDE" in html_src and "AI" in html_src, "Brand missing"
assert 'data-target="home"' in html_src, "Home nav missing"
assert 'data-target="dashboard"' in html_src, "Dashboard nav missing"
assert 'data-target="profile"' in html_src, "Profile nav missing"
assert 'data-target="assistant"' in html_src, "AI Assistant nav missing"
assert 'id="mobile-nav-ai-btn"' in html_src, "Mobile AI button missing"
print(" [PASS] Header navigation: FITGUIDE AI | Home | Dashboard | Profile | AI fully verified!")

print("\n=== 5. VALIDATE_APP SUITE ===")
import subprocess
ret = subprocess.run(["python", "scripts/validate_app.py"], capture_output=True, text=True)
print(ret.stdout)
assert ret.returncode == 0, "validate_app failed"

print(">>> ALL FITGUIDE AI INTEGRATION TESTS PASSED PERFECTLY! <<<")
