import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Target, BrainCircuit, LineChart, Map, Briefcase, Award } from 'lucide-react';
import FlowingMenu from '../components/FlowingMenu';

const demoItems = [
    { link: '#', text: 'Discover', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=3264&auto=format&fit=crop' },
    { link: '#', text: 'Analyze', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=3270&auto=format&fit=crop' },
    { link: '#', text: 'Map Skills', image: 'https://images.unsplash.com/photo-1507208573132-2394c86cb323?q=80&w=3328&auto=format&fit=crop' },
    { link: '#', text: 'Roadmaps', image: 'https://images.unsplash.com/photo-1434626881859-194d67b2b8c5?q=80&w=3274&auto=format&fit=crop' }
];

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full flex flex-col items-center pb-16">
            {/* Hero Section */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.15, delayChildren: 0.2 }
                    }
                }}
                className="relative w-full h-screen flex items-center justify-end px-4 md:px-16 lg:px-32"
            >
                {/* Background Image & Overlay */}
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: 'url(/hero-photo.avif)' }}
                ></div>
                {/* Gradient overlay to make text readable on the right while showing photo on the left */}
                <motion.div
                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1 } } }}
                    className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/50 to-slate-50/95"
                ></motion.div>
                <div className="absolute bottom-0 left-0 right-0 h-32 z-0 bg-gradient-to-t from-white to-transparent"></div>

                <div className="relative z-10 max-w-2xl flex flex-col items-start text-left mt-10">
                    <motion.div
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-indigo-200 text-indigo-700 text-sm font-medium mb-6 backdrop-blur-md shadow-sm"
                    >
                        <Sparkles className="w-4 h-4" />
                        <span>The Next Generation Career Engine</span>
                    </motion.div>
                    <motion.h1
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
                        className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 drop-shadow-sm"
                    >
                        Discover the career that <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-600 drop-shadow-none">
                            actually fits you.
                        </span>
                    </motion.h1>
                    <motion.p
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
                        className="text-lg md:text-xl text-slate-700 max-w-xl mb-10 leading-relaxed font-medium"
                    >
                        Career Genie helps you identify the right career and course based on your interests, abilities, and work preferences — and gives you a clear roadmap from where you are today to where you want to be.
                    </motion.p>
                    <motion.button
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/personal-info')}
                        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-medium transition-all shadow-[0_4px_20px_rgba(79,70,229,0.4)] hover:shadow-[0_6px_25px_rgba(79,70,229,0.5)] overflow-hidden"
                    >
                        <span className="relative z-10 text-lg">Get Started</span>
                        <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                </div>
            </motion.section>

            <div className="w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent my-16"></div>

            {/* How It Works (Flowing Menu instead of cards) */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
                }}
                className="w-full text-slate-300 mb-12"
            >
                <div className="flex flex-col items-center justify-center mb-12">
                    <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-3xl font-semibold text-slate-900 mb-4 text-center">How It Works</motion.h2>
                    <motion.div variants={{ hidden: { opacity: 0, scaleX: 0 }, visible: { opacity: 1, scaleX: 1 } }} className="w-16 h-1.5 bg-indigo-600 rounded-full origin-left"></motion.div>
                </div>
                <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }} className="w-full h-[500px] border-y border-slate-200 overflow-hidden relative">
                    <FlowingMenu items={demoItems} bgColor="#f8fafc" textColor="#0f172a" marqueeBgColor="#0f172a" marqueeTextColor="#f8fafc" borderColor="#e2e8f0" />
                </motion.div>
            </motion.section>

            <div className="w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent my-24"></div>

            {/* Why Career Genie */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                }}
                className="w-full text-center max-w-6xl px-4"
            >
                <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-3xl font-semibold text-slate-900 mb-12">Why Career Genie?</motion.h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left text-slate-600 leading-relaxed">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        whileHover={{ y: -5 }}
                        className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                            <Target className="w-6 h-6" />
                        </div>
                        <h4 className="text-slate-900 font-semibold text-lg mb-3">Interest–Ability Alignment</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">We don't just ask what you like. We measure what you are good at, ensuring recommendations are fully realistic.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        whileHover={{ y: -5 }}
                        className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                        <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center mb-6">
                            <BrainCircuit className="w-6 h-6" />
                        </div>
                        <h4 className="text-slate-900 font-semibold text-lg mb-3">Cognitive Style Consideration</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">Whether you are analytical strictly, or lean towards applied problem solving, we match your brain to the work environment.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        whileHover={{ y: -5 }}
                        className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                        <div className="w-12 h-12 bg-violet-50 text-violet-600 rounded-xl flex items-center justify-center mb-6">
                            <LineChart className="w-6 h-6" />
                        </div>
                        <h4 className="text-slate-900 font-semibold text-lg mb-3">Explainable Recommendations</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">No "AI slop" black boxes. Every recommendation is scored deterministically with transparent explainability charts.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        whileHover={{ y: -5 }}
                        className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                        <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-6">
                            <Map className="w-6 h-6" />
                        </div>
                        <h4 className="text-slate-900 font-semibold text-lg mb-3">Practical, Actionable Roadmaps</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">Stop wondering "what next?". We give you 3 concrete steps you can take today, backed by an AI-assisted generative strategy.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        whileHover={{ y: -5 }}
                        className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                            <Briefcase className="w-6 h-6" />
                        </div>
                        <h4 className="text-slate-900 font-semibold text-lg mb-3">Industry-Aligned Skills</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">Our insights are constantly updated to match current market demands, ensuring your skills and career choices stay relevant.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        whileHover={{ y: -5 }}
                        className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                        <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center mb-6">
                            <Award className="w-6 h-6" />
                        </div>
                        <h4 className="text-slate-900 font-semibold text-lg mb-3">Bias-Free Evaluation</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">We focus purely on your raw potential and demonstrated abilities, removing human bias from the career mapping process.</p>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
};

export default Home;
