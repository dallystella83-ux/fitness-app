from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel
from typing import Optional, Dict, Any, List
import os
import httpx
from pathlib import Path

def load_env():
    env_file = Path(".env")
    if env_file.exists():
        for line in env_file.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, val = line.split("=", 1)
                key = key.strip()
                val = val.strip().strip('"').strip("'")
                if key and val:
                    os.environ[key] = val

load_env()

app = FastAPI(title="FitGuide AI Backend", version="2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserProfile(BaseModel):
    age: Optional[int] = None
    sex: Optional[str] = None
    height: Optional[float] = None
    weight: Optional[float] = None
    activity: Optional[str] = None
    level: Optional[str] = None
    goal: Optional[str] = None
    diet: Optional[str] = None
    foodPreferences: Optional[str] = None
    equipment: Optional[str] = None
    time: Optional[int] = None
    intensity: Optional[str] = None
    workoutStyle: Optional[str] = None
    bmi: Optional[float] = None
    bmiCategory: Optional[str] = None
    targetCalories: Optional[int] = None
    targetProtein: Optional[int] = None

class ChatMessage(BaseModel):
    role: str
    text: str

class ChatRequest(BaseModel):
    message: str
    profile: Optional[Dict[str, Any]] = None
    history: Optional[List[Dict[str, str]]] = None

class ChatResponse(BaseModel):
    reply: str

SYSTEM_PROMPT = """You are FitGuide AI, an empathetic, supportive, and evidence-informed fitness and nutrition assistant.

STRICT MEDICAL & SAFETY RULES (MANDATORY):
1. Do NOT diagnose medical conditions or diseases.
2. Do NOT recommend medications, pharmaceuticals, or medical treatments.
3. Do NOT recommend dangerous, extreme, or fad diets.
4. Do NOT recommend unsafe calorie restriction (never advise below safe minimums like 1200 kcal for women or 1500 kcal for men without medical supervision).
5. Always encourage consultation with a qualified healthcare professional, physician, or registered dietitian when dealing with medical symptoms, pain, injuries, chronic health conditions, eating disorders, or pregnancy.
6. Do NOT make absolute medical claims about yoga, workouts, or foods.

YOUR CAPABILITIES & TONE:
- Tailor all recommendations specifically to the user's FitGuide profile information provided in the context (their age, sex, height, weight, BMI, calorie & protein targets, workout duration, available equipment, fitness level, preferred intensity, and dietary preferences/allergies).
- Provide distinct, rich, personalized answers to different questions (e.g. workout recommendations, breakfast ideas, protein target explanations, BMI explanations, gentle movements, yoga routines, egg substitutes, etc.).
- When the user asks for gentle or low-intensity options, focus on gentle mobility, walking, and restorative yoga.
- Keep responses friendly, encouraging, actionable, and formatted with clean bullet points. Keep answers concise and directly answer the question asked."""

def build_profile_context(profile_data: Optional[Dict[str, Any]]) -> str:
    if not profile_data:
        return "USER PROFILE: No user assessment profile submitted yet. Provide general fitness and nutrition guidance."
    
    parts = []
    if profile_data.get("age"): parts.append(f"• Age: {profile_data['age']} years")
    if profile_data.get("sex"): parts.append(f"• Biological Sex: {profile_data['sex']}")
    if profile_data.get("height"): parts.append(f"• Height: {profile_data['height']} cm")
    if profile_data.get("weight"): parts.append(f"• Weight: {profile_data['weight']} kg")
    if profile_data.get("activity"): parts.append(f"• Activity level: {profile_data['activity']}")
    if profile_data.get("level"): parts.append(f"• Fitness level: {profile_data['level']}")
    if profile_data.get("goal"): parts.append(f"• Primary Goal: {profile_data['goal']}")
    if profile_data.get("intensity"): parts.append(f"• Preferred Intensity: {profile_data['intensity']}")
    if profile_data.get("diet"): parts.append(f"• Diet preference: {profile_data['diet']}")
    if profile_data.get("allergies"): parts.append(f"• Known Allergies / Intolerances: {profile_data['allergies']}")
    if profile_data.get("foodPreferences"): parts.append(f"• Food preferences / notes: {profile_data['foodPreferences']}")
    if profile_data.get("equipment"): parts.append(f"• Available equipment: {profile_data['equipment']}")
    if profile_data.get("time"): parts.append(f"• Workout time per day: {profile_data['time']} minutes")
    if profile_data.get("bmi"): parts.append(f"• Calculated BMI: {profile_data['bmi']} ({profile_data.get('bmiCat') or profile_data.get('bmiCategory') or 'Standard'})")
    if profile_data.get("targetCalories"): parts.append(f"• Daily calorie target: {profile_data['targetCalories']} kcal")
    if profile_data.get("targetProtein"): parts.append(f"• Daily protein target: {profile_data['targetProtein']} g")

    if not parts:
        return "USER PROFILE: General user (metrics not filled yet)."
    
    return "USER PROFILE CONTEXT:\n" + "\n".join(parts)

@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    load_env()
    user_msg = (request.message or "").strip()
    if not user_msg:
        return ChatResponse(reply="Please type a message to ask the FitGuide AI assistant.")

    gemini_key = os.environ.get("GEMINI_API_KEY", "").strip()
    openai_key = os.environ.get("OPENAI_API_KEY", "").strip()

    is_gemini_valid = bool(gemini_key and not gemini_key.startswith("your_"))
    is_openai_valid = bool(openai_key and not openai_key.startswith("your_"))

    if not is_gemini_valid and not is_openai_valid:
        return ChatResponse(reply="AI Assistant is not connected yet. Please configure the AI API key.")

    profile_context = build_profile_context(request.profile)
    full_system = f"{SYSTEM_PROMPT}\n\n{profile_context}"

    if is_gemini_valid:
        return await call_gemini(user_msg, full_system, gemini_key, request.history)
    else:
        return await call_openai(user_msg, full_system, openai_key, request.history)

async def call_gemini(message: str, system_prompt: str, api_key: str, history: Optional[list] = None) -> ChatResponse:
    candidate_models = [
        "gemini-3.5-flash",
        "gemini-3-flash-preview",
        "gemini-2.5-flash",
        "gemini-flash-latest",
        "gemini-1.5-flash"
    ]

    contents = []
    if history:
        for item in history[-8:]:
            role = "user" if item.get("role") in ["user", "human"] else "model"
            txt = (item.get("text") or item.get("content") or "").strip()
            if txt:
                contents.append({"role": role, "parts": [{"text": txt}]})
    contents.append({"role": "user", "parts": [{"text": message}]})

    payload = {
        "system_instruction": {"parts": [{"text": system_prompt}]},
        "contents": contents,
        "generationConfig": {"maxOutputTokens": 1000, "temperature": 0.7}
    }

    last_error = ""
    async with httpx.AsyncClient(timeout=25.0) as client:
        for model in candidate_models:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"
            try:
                resp = await client.post(url, json=payload)
                if resp.status_code == 200:
                    data = resp.json()
                    candidates = data.get("candidates", [])
                    if candidates and "content" in candidates[0]:
                        reply_text = candidates[0]["content"]["parts"][0]["text"]
                        return ChatResponse(reply=reply_text)
                elif resp.status_code in [404, 503]:
                    last_error = f"Model {model} returned {resp.status_code}"
                    continue
                else:
                    return ChatResponse(reply=f"AI request failed (Google Gemini status {resp.status_code}). Please verify your GEMINI_API_KEY.")
            except Exception as e:
                last_error = str(e)
                continue

    return ChatResponse(reply=f"AI request failed to connect: {last_error}. Please check your network and API key.")

async def call_openai(message: str, system_prompt: str, api_key: str) -> ChatResponse:
    url = "https://api.openai.com/v1/chat/completions"
    headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}
    payload = {
        "model": "gpt-4o-mini",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": message}
        ],
        "max_tokens": 1000,
        "temperature": 0.7
    }
    try:
        async with httpx.AsyncClient(timeout=25.0) as client:
            resp = await client.post(url, json=payload, headers=headers)
            if resp.status_code == 200:
                data = resp.json()
                reply_text = data["choices"][0]["message"]["content"]
                return ChatResponse(reply=reply_text)
            else:
                return ChatResponse(reply=f"AI request failed (OpenAI status {resp.status_code}). Please verify your OPENAI_API_KEY.")
    except Exception as e:
        return ChatResponse(reply=f"AI request failed to connect: {str(e)}. Please check your network and API key.")

# Mount static folders
app.mount("/assets", StaticFiles(directory="assets"), name="assets")
app.mount("/css", StaticFiles(directory="css"), name="css")
app.mount("/js", StaticFiles(directory="js"), name="js")

@app.get("/")
async def serve_index():
    return FileResponse("index.html")

@app.get("/health")
async def health_check():
    load_env()
    gemini_key = os.environ.get("GEMINI_API_KEY", "").strip()
    openai_key = os.environ.get("OPENAI_API_KEY", "").strip()
    has_key = bool((gemini_key and not gemini_key.startswith("your_")) or (openai_key and not openai_key.startswith("your_")))
    return {"status": "ok", "ai_configured": has_key}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="127.0.0.1", port=8000, reload=False)
