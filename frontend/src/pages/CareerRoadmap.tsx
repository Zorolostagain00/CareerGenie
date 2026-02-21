import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Map, RefreshCw } from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';

const CareerRoadmap = () => {
    const { state, reset } = useAssessment();
    const navigate = useNavigate();

    if (!state.results || !state.results.roadmaps) {
        return (
            <div className="min-h-screen pt-32 flex flex-col items-center">
                <p className="text-slate-400 mb-6">No roadmaps generated yet.</p>
                <button onClick={() => navigate('/')} className="bg-indigo-500 hover:bg-indigo-400 text-white px-6 py-2 rounded-lg transition-colors">Go Home</button>
            </div>
        );
    }

    const { top_3_roles, roadmaps } = state.results;

    const handleRetake = () => {
        reset();
        navigate('/personal-info');
    };

    return (
        <div className="min-h-screen pt-24 pb-24 max-w-4xl mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium mb-6">
                    <Map className="w-4 h-4" />
                    <span>Execution Plan</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Your Career Roadmaps</h1>
                <p className="text-slate-400 leading-relaxed max-w-2xl">
                    We used a large language model to contextualize your deterministic career recommendations into concrete, time-bound, step-by-step action plans based on your current education layer and skills.
                </p>
            </motion.div>

            <div className="space-y-16">
                {top_3_roles.map((role: any, idx: number) => {
                    const content = roadmaps[role.id];
                    return (
                        <motion.div
                            key={role.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-slate-900/60 border border-slate-700/50 rounded-2xl overflow-hidden"
                        >
                            <div className="bg-slate-800/40 px-8 py-5 border-b border-slate-700/50 flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
                                    <span className="text-indigo-400">#{idx + 1}</span> {role.title}
                                </h2>
                                <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300">
                                    {role.cluster}
                                </span>
                            </div>

                            <div className="p-8 prose prose-invert prose-indigo max-w-none 
                prose-h3:text-lg prose-h3:font-semibold prose-h3:text-slate-200 prose-h3:mt-8 prose-h3:mb-3 first:prose-h3:mt-0
                prose-p:text-slate-400 prose-p:leading-relaxed prose-p:mb-6
                prose-ul:text-slate-400 prose-li:my-1 prose-ul:mb-6"
                            >
                                <ReactMarkdown>{content || "No roadmap available."}</ReactMarkdown>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="mt-20 pt-10 border-t border-slate-800 flex justify-center">
                <button
                    onClick={handleRetake}
                    className="flex items-center gap-2 px-6 py-3 border border-slate-700 hover:bg-slate-800 text-slate-300 rounded-lg font-medium transition-colors"
                >
                    <RefreshCw className="w-4 h-4" />
                    Start New Assessment
                </button>
            </div>
        </div>
    );
};

export default CareerRoadmap;
