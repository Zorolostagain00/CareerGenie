import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import PersonalInfo from './pages/PersonalInfo';
import Assessment from './pages/Assessment';
import ResultsDashboard from './pages/ResultsDashboard';
import CareerRoadmap from './pages/CareerRoadmap';
import { AssessmentProvider } from './context/AssessmentContext';
import { Footerdemo } from '@/components/ui/footer-section';

function App() {
  return (
    <AssessmentProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500/30">
          <Navigation />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/personal-info" element={<PersonalInfo />} />
              <Route path="/assessment" element={<Assessment />} />
              <Route path="/results" element={<ResultsDashboard />} />
              <Route path="/roadmap" element={<CareerRoadmap />} />
            </Routes>
          </main>
          <Footerdemo />
        </div>
      </Router>
    </AssessmentProvider>
  );
}

export default App;

