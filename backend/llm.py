import os

try:
    from google import genai
    HAS_GENAI = True
except ImportError:
    HAS_GENAI = False

def generate_roadmap(career_title: str, user_state: dict):
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key or not HAS_GENAI:
        return get_fallback_roadmap(career_title)
        
    try:
        client = genai.Client(api_key=api_key)
        prompt = f"""
        You are Career Genie, an expert career counselor. 
        The user wants to become a {career_title}.
        Here is some of their current context:
        Education Level: {user_state.get('education_level')}
        Degree: {user_state.get('degree')}
        Core Strengths: {user_state.get('strengths')}
        
        Provide a short, concrete, and actionable roadmap with exactly these 4 headings:
        ### Where you are now
        (1 sentence summary)
        
        ### Next 3 concrete steps
        - Step 1
        - Step 2
        - Step 3
        
        ### 6-12 month learning direction
        (A brief paragraph)
        
        ### Long-term preparation
        (A brief paragraph, degrees, internships, portfolio building)
        
        Format clearly in Markdown without extra fluff.
        """
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
        )
        return response.text
    except Exception as e:
        print(f"LLM Error: {e}")
        return get_fallback_roadmap(career_title)

def get_fallback_roadmap(career_title: str):
    return f"""### Where you are now
You have foundational skills that align well with becoming a {career_title}, but need targeted development in key domain areas.

### Next 3 concrete steps
- Research the daily responsibilities and common toolstacks used by a {career_title}.
- Identify a beginner-friendly project or credible certification in this specific field.
- Connect with at least one professional working as a {career_title} on LinkedIn or industry forums.

### 6-12 month learning direction
Focus on building core technical and soft skills required for {career_title}. Complete structured online courses, read relevant industry blogs, and begin compiling a portfolio of small projects to demonstrate your capabilities to future employers.

### Long-term preparation
Consider structured education such as a relevant degree, specialized bootcamp, or major industry certification. Seek internships, apprenticeships, or junior roles to gain practical experience and refine your eventual specialization."""
