from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from models import AssessmentPayload
from engine import get_recommendations
from llm import generate_roadmap

load_dotenv()

app = FastAPI(title="Career Genie API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/api/recommend")
def recommend_career(payload: AssessmentPayload):
    # 1. Deterministic Scoring
    results = get_recommendations(payload)
    
    # 2. Add Roadmaps
    user_state = {
        "education_level": payload.personal_info.education_level,
        "degree": payload.personal_info.degree,
        "strengths": f"Analytical: {results['cognitive_profile']['analytical_index']:.2f}, Applied: {results['cognitive_profile']['applied_index']:.2f}, Focus: {results['cognitive_profile']['focus_index']:.2f}"
    }
    
    roadmaps = {}
    for role in results["top_3_roles"]:
        title = role["title"]
        roadmap_md = generate_roadmap(title, user_state)
        roadmaps[role["id"]] = roadmap_md
        
    results["roadmaps"] = roadmaps
    
    return results

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
