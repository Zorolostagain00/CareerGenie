import json
import os
from models import AssessmentPayload

# Load ontology
with open(os.path.join(os.path.dirname(__file__), "ontology.json"), "r") as f:
    ONTOLOGY = json.load(f)

def normalize_likert(val: int) -> float:
    return (val - 1) / 4.0

def normalize_skill(val: int) -> float:
    return val / 10.0

def calculate_riasec_top2(riasec):
    scores = {
        "Realistic": normalize_likert(riasec.realistic),
        "Investigative": normalize_likert(riasec.investigative),
        "Artistic": normalize_likert(riasec.artistic),
        "Social": normalize_likert(riasec.social),
        "Enterprising": normalize_likert(riasec.enterprising),
        "Conventional": normalize_likert(riasec.conventional),
    }
    sorted_scores = sorted(scores.items(), key=lambda x: x[1], reverse=True)
    return sorted_scores[0][0], sorted_scores[1][0], scores

def evaluate_skills(skills):
    coding_map = {"None": 0.0, "Basic": 0.33, "Intermediate": 0.66, "Advanced": 1.0}
    return {
        "math": normalize_skill(skills.math_skill),
        "writing": normalize_skill(skills.writing_skill),
        "coding": coding_map.get(skills.coding, 0.0),
        "creativity": 1.0 if skills.creativity_portfolio else normalize_skill(skills.creativity_confidence)
    }

def calculate_cognitive(cog_a, cog_b):
    # Normalized scores
    abs_sol = normalize_likert(cog_a.abstract_solving)
    pat_rec = normalize_likert(cog_a.pattern_recognition)
    brk_dwn = normalize_likert(cog_a.breaking_down)
    prac_th = normalize_likert(cog_a.practical_over_theory)
    focus = normalize_likert(cog_a.deep_focus)

    analytical_index = (abs_sol + pat_rec) / 2.0
    applied_index = (brk_dwn + prac_th) / 2.0
    focus_index = focus

    if abs(analytical_index - applied_index) <= 0.2:
        orientation = "Hybrid"
        self_score = (analytical_index + applied_index) / 2.0
    elif analytical_index > applied_index:
        orientation = "Analytical"
        self_score = analytical_index
    else:
        orientation = "Applied"
        self_score = applied_index

    correct = 0
    if cog_b.sequence == 30:
        correct += 1
    if cog_b.logic.strip().lower() in ["no", "false", "0"]:
        correct += 1
    if cog_b.speed == 180:
        correct += 1
    
    mini_test_score = correct / 3.0
    cognitive_score = 0.4 * self_score + 0.4 * mini_test_score + 0.2 * focus_index

    return {
        "orientation": orientation,
        "cognitive_score": cognitive_score,
        "analytical_index": analytical_index,
        "applied_index": applied_index,
        "focus_index": focus_index,
    }

def get_recommendations(payload: AssessmentPayload):
    r_top1, r_top2, riasec_scores = calculate_riasec_top2(payload.riasec)
    cog_profile = calculate_cognitive(payload.cognitive_a, payload.cognitive_b)
    user_skills = evaluate_skills(payload.skills)
    
    personality_scores = {
        "risk": normalize_likert(payload.personality.risk_comfort) * 2 - 1,
        "stability": normalize_likert(payload.personality.stability_preference),
        "leadership": normalize_likert(payload.personality.leadership),
        "independence": normalize_likert(payload.personality.independence),
        "stress": normalize_likert(payload.personality.stress_handling),
        "structure": normalize_likert(payload.personality.structure_preference)
    }
    
    lifestyle_scores = {
        "long_study_tolerance": normalize_likert(payload.lifestyle.long_study_tolerance),
    }
    
    role_scores = []
    
    for role in ONTOLOGY["roles"]:
        score = 0.0
        
        # RIASEC Match (max ~1.0)
        rp, rs = role["riasec"]["primary"], role["riasec"]["secondary"]
        if r_top1 == rp:
            score += 0.6
        elif r_top1 == rs:
            score += 0.4
            
        if r_top2 == rs:
            score += 0.4
        elif r_top2 == rp:
            score += 0.2
            
        # Cognitive Match (max ~1.0)
        if cog_profile["orientation"] == role["cognitive_orientation"] or role["cognitive_orientation"] == "Hybrid":
            score += 0.5
        score += cog_profile["cognitive_score"] * 0.5
        
        # Skill Match (max ~1.0)
        req = role["skills_required"]
        skill_score = 0
        for k, v in req.items():
            if user_skills[k] >= v:
                skill_score += 0.25
            else:
                skill_score += 0.25 * (user_skills[k] / (v + 0.001))
        score += skill_score
        
        # Penalty (Long Study & Burnout)
        if lifestyle_scores["long_study_tolerance"] < role["lifestyle"]["long_study_tolerance"]:
            score -= role["lifestyle"]["burnout_risk_penalty"] * 0.5
            
        role_scores.append({
            "role": role,
            "score": score
        })
        
    role_scores.sort(key=lambda x: x["score"], reverse=True)
    top_3 = role_scores[:3]
    
    return {
        "top_3_roles": [r["role"] for r in top_3],
        "riasec_scores": riasec_scores,
        "cognitive_profile": cog_profile,
        "user_skills": user_skills
    }
