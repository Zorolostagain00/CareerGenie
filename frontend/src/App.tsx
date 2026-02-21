import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import PersonalInfo from './pages/PersonalInfo';
import Assessment from './pages/Assessment';
import ResultsDashboard from './pages/ResultsDashboard';
import CareerRoadmap from './pages/CareerRoadmap';
import { AssessmentProvider } from './context/AssessmentContext';
import { Footerdemo } from '@/components/ui/footer-section';

const AppContent = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500/30 flex flex-col">
      <Navigation />
      <main className={`flex-grow ${isHome ? '' : 'container mx-auto px-4 py-8 mt-16'}`}>
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
  );
};

function App() {
  return (
    <AssessmentProvider>
      <Router>
        <AppContent />
      </Router>
    </AssessmentProvider>
  );
}

export default App;

