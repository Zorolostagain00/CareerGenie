import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { ArrowRight, Info } from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';

const ResultsDashboard = () => {
    const { state } = useAssessment();
    const navigate = useNavigate();

    if (!state.results) {
        return (
            <div className="min-h-screen pt-32 flex flex-col items-center">
                <p className="text-slate-400 mb-6">No assessment results found.</p>
                <button onClick={() => navigate('/personal-info')} className="bg-indigo-500 hover:bg-indigo-400 text-white px-6 py-2 rounded-lg transition-colors">Take Assessment</button>
            </div>
        );
    }

    const { top_3_roles, riasec_scores, cognitive_profile, user_skills } = state.results;

    // Format data for Recharts
    const radarData = useMemo(() => {
        if (!riasec_scores) return [];
        return Object.entries(riasec_scores).map(([domain, score]) => ({
            domain,
            score: (score as number) * 100
        }));
    }, [riasec_scores]);

    const skillsData = useMemo(() => {
        if (!user_skills) return [];
        return [
            { name: 'Math', Score: user_skills.math * 100 },
            { name: 'Writing', Score: user_skills.writing * 100 },
            { name: 'Coding', Score: user_skills.coding * 100 },
            { name: 'Creativity', Score: user_skills.creativity * 100 }
        ];
    }, [user_skills]);

    return (
        <div className="min-h-screen pt-24 pb-24 max-w-5xl mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Your Career Profile</h1>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-200">
                    <Info className="w-6 h-6 shrink-0 mt-0.5" />
                    <p className="text-sm leading-relaxed">
                        These recommendations are based on how your interests, skills, and thinking style align with the core demands of these roles. We calculate deterministic matches against our career ontology to avoid generating generic, unrealistic advice.
                    </p>
                </div>
            </motion.div>

            {/* Top Careers */}
            <h2 className="text-xl font-semibold text-white mb-6">Top Recommended Clusters & Roles</h2>
            <div className="flex flex-col gap-6 mb-16">
                {top_3_roles.map((role: any, idx: number) => (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        key={role.id}
                        className="flex flex-col md:flex-row gap-6 items-start py-6 border-b border-slate-800 last:border-0"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0 shadow-lg text-2xl font-bold text-slate-300">
                            #{idx + 1}
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-2xl font-semibold text-slate-100">{role.title}</h3>
                                <span className="text-xs font-medium px-2 py-1 bg-slate-800 text-slate-300 rounded-md uppercase tracking-wider">{role.cluster}</span>
                            </div>
                            <p className="text-slate-400 leading-relaxed max-w-2xl">
                                This role is an excellent fit because it fundamentally operates on a <strong className="text-slate-300 font-medium">{role.cognitive_orientation}</strong> thinking philosophy, matching your cognitive profile. It demands <strong className="text-slate-300 font-medium">{role.riasec.primary}</strong> and <strong className="text-slate-300 font-medium">{role.riasec.secondary}</strong> traits, aligning tightly with your highest intrinsic interests.
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="w-full h-px bg-slate-800 mb-16"></div>

            {/* Charts Section */}
            <h2 className="text-xl font-semibold text-white mb-8">Data Breakdown</h2>
            <div className="grid md:grid-cols-2 gap-12 mb-16">

                {/* RIASEC Radar */}
                <div className="bg-slate-900/40 border border-slate-800/60 p-6 rounded-2xl">
                    <h3 className="text-slate-100 font-medium mb-6">RIASEC Interest Footprint</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                                <PolarGrid stroke="#334155" />
                                <PolarAngleAxis dataKey="domain" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Radar name="Footprint" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
                                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Skills vs Interest Bar */}
                <div className="bg-slate-900/40 border border-slate-800/60 p-6 rounded-2xl">
                    <h3 className="text-slate-100 font-medium mb-6">Quantified Skill Strengths</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={skillsData} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <Tooltip cursor={{ fill: '#1e293b' }} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }} />
                                <Bar dataKey="Score" fill="#14b8a6" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Cognitive Profile */}
            <div className="bg-slate-900/40 border border-slate-800/60 p-8 rounded-2xl mb-16">
                <h3 className="text-slate-100 font-medium mb-8">Cognitive Processing Profile</h3>
                <div className="relative h-4 w-full bg-slate-800 rounded-full overflow-hidden mb-4">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(cognitive_profile.analytical_index / (cognitive_profile.analytical_index + cognitive_profile.applied_index)) * 100}%` }}
                        className="absolute left-0 top-0 bottom-0 bg-indigo-500 rounded-full border-r-[2px] border-slate-900"
                    />
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(cognitive_profile.applied_index / (cognitive_profile.analytical_index + cognitive_profile.applied_index)) * 100}%` }}
                        className="absolute right-0 top-0 bottom-0 bg-teal-500 rounded-full border-l-[2px] border-slate-900"
                    />
                </div>
                <div className="flex justify-between text-sm font-medium">
                    <span className="text-indigo-400">Analytical Orientation ({Math.round(cognitive_profile.analytical_index * 100)}%)</span>
                    <span className="text-slate-500">Classification: <strong className="text-slate-300">{cognitive_profile.orientation}</strong></span>
                    <span className="text-teal-400">Applied Orientation ({Math.round(cognitive_profile.applied_index * 100)}%)</span>
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={() => navigate('/roadmap')}
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-indigo-500 hover:bg-indigo-400 text-white rounded-full font-medium transition-all shadow-[0_0_30px_rgba(99,102,241,0.2)]"
                >
                    <span>View Actionable Roadmaps</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
};

export default ResultsDashboard;
