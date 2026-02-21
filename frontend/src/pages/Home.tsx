import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Target, Compass, Sparkles } from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen pt-24 pb-16 flex flex-col items-center max-w-5xl mx-auto">
            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center w-full my-20"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-6">
                    <Sparkles className="w-4 h-4" />
                    <span>The Next Generation Career Engine</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
                    Discover the career that <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-400">
                        actually fits you.
                    </span>
                </h1>
                <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Career Genie helps you identify the right career and course based on your interests, abilities, and work preferences — and gives you a clear roadmap from where you are today to where you want to be.
                </p>
                <button
                    onClick={() => navigate('/personal-info')}
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-indigo-500 hover:bg-indigo-400 text-white rounded-full font-medium transition-all shadow-[0_0_40px_rgba(99,102,241,0.3)] hover:shadow-[0_0_60px_rgba(99,102,241,0.5)] overflow-hidden"
                >
                    <span className="relative z-10 text-lg">Get Started</span>
                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                </button>
            </motion.section>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent my-16"></div>

            {/* How It Works (Narrative flow, soft separators instead of cards) */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-3xl text-slate-300"
            >
                <h2 className="text-2xl font-semibold text-white mb-12 text-center">How It Works</h2>

                <div className="flex flex-col gap-12 relative">
                    <div className="absolute left-[27px] top-6 bottom-6 w-px bg-slate-800 hidden md:block"></div>

                    <div className="flex gap-6 relative">
                        <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0 z-10 shadow-xl">
                            <Brain className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div className="pt-3">
                            <h3 className="text-xl font-medium text-slate-100 mb-2">1. Deep Understanding</h3>
                            <p className="text-slate-400 leading-relaxed">
                                We first understand your core interests, thinking style, cognitive strengths, and practical skills through a structured, multi-dimensional assessment.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-6 relative">
                        <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0 z-10 shadow-xl">
                            <Target className="w-6 h-6 text-teal-400" />
                        </div>
                        <div className="pt-3">
                            <h3 className="text-xl font-medium text-slate-100 mb-2">2. Intelligent Modeling</h3>
                            <p className="text-slate-400 leading-relaxed">
                                We model your career fit using advanced, deterministic scoring criteria that match your psychological profile and capabilities against an ontology of modern careers.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-6 relative">
                        <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0 z-10 shadow-xl">
                            <Compass className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div className="pt-3">
                            <h3 className="text-xl font-medium text-slate-100 mb-2">3. Actionable Roadmaps</h3>
                            <p className="text-slate-400 leading-relaxed">
                                We generate a highly personalized, contextualized roadmap complete with your next logical steps, a 12-month learning direction, and long-term preparation advice.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.section>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent my-24"></div>

            {/* Why Career Genie */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full text-center max-w-4xl"
            >
                <h2 className="text-2xl font-semibold text-white mb-8">Why Career Genie?</h2>
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 text-left text-slate-400 leading-relaxed">
                    <div>
                        <h4 className="text-slate-100 font-medium mb-1">Interest–Ability Alignment</h4>
                        <p className="text-sm">We don't just ask what you like. We measure what you are good at, ensuring recommendations are fully realistic.</p>
                    </div>
                    <div>
                        <h4 className="text-slate-100 font-medium mb-1">Cognitive Style Consideration</h4>
                        <p className="text-sm">Whether you are analytical strictly, or lean towards applied problem solving, we match your brain to the work environment.</p>
                    </div>
                    <div>
                        <h4 className="text-slate-100 font-medium mb-1">Explainable Recommendations</h4>
                        <p className="text-sm">No "AI slop" black boxes. Every recommendation is scored deterministically with transparent explainability charts.</p>
                    </div>
                    <div>
                        <h4 className="text-slate-100 font-medium mb-1">Practical, Actionable Roadmaps</h4>
                        <p className="text-sm">Stop wondering "what next?". We give you 3 concrete steps you can take today, backed by an AI-assisted generative strategy.</p>
                    </div>
                </div>
            </motion.section>
        </div>
    );
};

export default Home;
