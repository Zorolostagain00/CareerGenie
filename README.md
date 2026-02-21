# Career Genie

Career Genie is a production-ready, full-stack web application designed to help students discover the right careers based on their intrinsic interests, cognitive styles, skills, personality, and lifestyle preferences.

It bridges the gap between raw interest and actual ability, turning insights into an actionable, AI-assisted career roadmap.

## Project Architecture

- **Frontend**: React 18, Vite, Tailwind CSS v4, Framer Motion, Recharts, Radix UI.
- **Backend**: Python 3, FastAPI, Uvicorn, Pydantic, Google GenAI SDK.
- **Data Engine**: Deterministic ontology scoring engine (`ontology.json`) combined with an LLM for descriptive text.
- **Storage**: Stateless. 

## Setup & Run Instructions

### 1. Backend Setup

The backend runs on FastAPI and uses python dependencies.

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   # OR
   pip install fastapi uvicorn pydantic google-genai python-dotenv
   ```
4. Configure your environment variables:
   Create a `.env` file inside the `backend/` directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```
   > **Note:** If you don't provide an API key, the system gracefully falls back to a deterministic, rule-based roadmap mode.

5. Run the development server:
   ```bash
   uvicorn main:app --reload
   ```
   The backend will start at `http://localhost:8000`.

### 2. Frontend Setup

The frontend is a Vite + React application styled with Tailwind CSS v4.

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install Node.js dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`.

## Deployment Instructions

### Backend (Render, Railway, or Heroku)
1. Add a `Procfile` containing `web: uvicorn main:app --host 0.0.0.0 --port $PORT`.
2. Push your `backend` code. Set your `GEMINI_API_KEY` in the environment variables.

### Frontend (Vercel, Netlify)
1. Point your deployment platform to the `frontend` directory.
2. Build command: `npm run build`.
3. Output directory: `dist`.
4. Ensure you set up environment variables or proxy logic if the API is hosted externally (update the fetch URL in `Assessment.tsx` to point to your live backend domain).

## Features Designed for Hackathon Judges

1. **Deterministic Explanations**: We don't hide behind a black box. The Results Dashboard clearly articulates *why* a role was recommended based on math.
2. **Deep User Profiling**: Multi-step assessment incorporating cognitive mini-tests alongside traditional Likert scales.
3. **No "AI Slop"**: Clean professional dark theme devoid of messy template cards. Floating navigation and cohesive brand aesthetics.
4. **Actionable Deliverables**: Generates immediate "Top 3 next logical steps" alongside 12-month and long-term directions.
