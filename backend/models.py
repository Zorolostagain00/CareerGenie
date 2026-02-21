from pydantic import BaseModel, Field
from typing import Optional

class PersonalInfo(BaseModel):
    name: str
    age: int
    education_level: str
    degree: Optional[str] = None

class Riasec(BaseModel):
    realistic: int = Field(ge=1, le=5)
    investigative: int = Field(ge=1, le=5)
    artistic: int = Field(ge=1, le=5)
    social: int = Field(ge=1, le=5)
    enterprising: int = Field(ge=1, le=5)
    conventional: int = Field(ge=1, le=5)

class CognitivePartA(BaseModel):
    abstract_solving: int = Field(ge=1, le=5)
    breaking_down: int = Field(ge=1, le=5)
    pattern_recognition: int = Field(ge=1, le=5)
    practical_over_theory: int = Field(ge=1, le=5)
    structured_writing: int = Field(ge=1, le=5)
    deep_focus: int = Field(ge=1, le=5)

class CognitivePartB(BaseModel):
    sequence: int
    logic: str
    speed: int

class Skills(BaseModel):
    math_skill: int = Field(ge=1, le=10)
    math_interest: int = Field(ge=1, le=10)
    writing_skill: int = Field(ge=1, le=10)
    writing_interest: int = Field(ge=1, le=10)
    coding: str 
    coding_interest: int = Field(ge=1, le=10)
    creativity_portfolio: bool
    creativity_confidence: int = Field(ge=1, le=10)
    attention_to_detail: int = Field(ge=1, le=5)
    learn_quickly: int = Field(ge=1, le=5)

class Personality(BaseModel):
    risk_comfort: int = Field(ge=1, le=5)
    stability_preference: int = Field(ge=1, le=5)
    leadership: int = Field(ge=1, le=5)
    independence: int = Field(ge=1, le=5)
    stress_handling: int = Field(ge=1, le=5)
    structure_preference: int = Field(ge=1, le=5)

class Lifestyle(BaseModel):
    long_study_tolerance: int = Field(ge=1, le=5)
    income_vs_wlb: int = Field(ge=1, le=5)
    relocation_openness: int = Field(ge=1, le=5)
    social_impact_priority: int = Field(ge=1, le=5)
    entrepreneurial_openness: int = Field(ge=1, le=5)

class AssessmentPayload(BaseModel):
    personal_info: PersonalInfo
    riasec: Riasec
    cognitive_a: CognitivePartA
    cognitive_b: CognitivePartB
    skills: Skills
    personality: Personality
    lifestyle: Lifestyle
