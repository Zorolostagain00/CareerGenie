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
    statistical_reasoning: int = Field(ge=1, le=5)
    structured_logic: int = Field(ge=1, le=5)

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
    large_datasets: int = Field(ge=1, le=5)
    hidden_patterns: int = Field(ge=1, le=5)
    probability_risk: int = Field(ge=1, le=5)

class Engineering(BaseModel):
    machines_engines: int = Field(ge=1, le=5)
    physical_components: int = Field(ge=1, le=5)
    electrical_circuits: int = Field(ge=1, le=5)
    sensors_measurement: int = Field(ge=1, le=5)
    infrastructure: int = Field(ge=1, le=5)
    large_structures: int = Field(ge=1, le=5)
    chemical_reactions: int = Field(ge=1, le=5)
    raw_materials: int = Field(ge=1, le=5)
    automation_robotics: int = Field(ge=1, le=5)
    intelligent_systems: int = Field(ge=1, le=5)
    cybersecurity: int = Field(ge=1, le=5)

class Finance(BaseModel):
    financial_markets: int = Field(ge=1, le=5)
    financial_records: int = Field(ge=1, le=5)
    financial_modeling: int = Field(ge=1, le=5)
    financial_uncertainty: int = Field(ge=1, le=5)

class Creative(BaseModel):
    visual_layout: int = Field(ge=1, le=5)
    user_experiences: int = Field(ge=1, le=5)
    storytelling: int = Field(ge=1, le=5)
    functional_products: int = Field(ge=1, le=5)
    writing_vs_visuals: int = Field(ge=1, le=5)

class Business(BaseModel):
    strategic_problems: int = Field(ge=1, le=5)
    coordinating_teams: int = Field(ge=1, le=5)
    business_decisions: int = Field(ge=1, le=5)
    consumer_behavior: int = Field(ge=1, le=5)

class SocialHuman(BaseModel):
    explaining_concepts: int = Field(ge=1, le=5)
    human_behavior: int = Field(ge=1, le=5)
    governance_systems: int = Field(ge=1, le=5)
    workplace_culture: int = Field(ge=1, le=5)

class Personality(BaseModel):
    risk_comfort: int = Field(ge=1, le=5)
    stability_preference: int = Field(ge=1, le=5)
    leadership: int = Field(ge=1, le=5)
    independence: int = Field(ge=1, le=5)
    stress_handling: int = Field(ge=1, le=5)
    structure_preference: int = Field(ge=1, le=5)
    adaptability: int = Field(ge=1, le=5)
    uncertainty_handling: int = Field(ge=1, le=5)

class Lifestyle(BaseModel):
    long_study_tolerance: int = Field(ge=1, le=5)
    income_vs_wlb: int = Field(ge=1, le=5)
    relocation_openness: int = Field(ge=1, le=5)
    social_impact_priority: int = Field(ge=1, le=5)
    entrepreneurial_openness: int = Field(ge=1, le=5)
    competitive_environments: int = Field(ge=1, le=5)
    predictable_paths: int = Field(ge=1, le=5)
    intellectual_challenge: int = Field(ge=1, le=5)

class AssessmentPayload(BaseModel):
    personal_info: PersonalInfo
    riasec: Riasec
    cognitive_a: CognitivePartA
    cognitive_b: CognitivePartB
    skills: Skills
    engineering: Engineering
    finance: Finance
    creative: Creative
    business: Business
    social_human: SocialHuman
    personality: Personality
    lifestyle: Lifestyle
