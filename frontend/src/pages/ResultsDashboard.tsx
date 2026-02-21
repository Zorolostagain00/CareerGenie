import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts';
import { ArrowRight, Info, Brain, Target, Lightbulb, Sparkles, TrendingUp, Zap } from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';

/* ───── animation presets ───── */
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' } })
};

const ResultsDashboard = () => {
    const { state } = useAssessment();
    const navigate = useNavigate();

    if (!state.results) {
        return (
            <div className="min-h-screen pt-32 flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-2">
                    <Sparkles className="w-8 h-8 text-indigo-400" />
                </div>
                <p className="text-slate-500 text-lg">No assessment results found.</p>
                <button onClick={() => navigate('/personal-info')} className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3 rounded-full font-medium transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300">
                    Take Assessment
                </button>
            </div>
        );
    }

    const { top_3_roles, riasec_scores, cognitive_profile, user_skills } = state.results;

    /* ───── derived data ───── */
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

    const topRiasec = useMemo(() => {
        if (!riasec_scores) return { name: '–', score: 0 };
        const sorted = Object.entries(riasec_scores).sort((a, b) => (b[1] as number) - (a[1] as number));
        return { name: sorted[0][0], score: Math.round((sorted[0][1] as number) * 100) };
    }, [riasec_scores]);

    const topSkill = useMemo(() => {
        if (!user_skills) return { name: '–', score: 0 };
        const entries = Object.entries(user_skills) as [string, number][];
        const sorted = entries.sort((a, b) => b[1] - a[1]);
        return { name: sorted[0][0].charAt(0).toUpperCase() + sorted[0][0].slice(1), score: Math.round(sorted[0][1] * 100) };
    }, [user_skills]);

    const analyticalPct = Math.round(
        (cognitive_profile.analytical_index / (cognitive_profile.analytical_index + cognitive_profile.applied_index)) * 100
    );

    /* ───── colour helpers ───── */
    const clusterColor = (cluster: string) => {
        const map: Record<string, string> = {
            'CREATIVE/DESIGN': 'bg-violet-100 text-violet-700',
            'ENGINEERING/TECH': 'bg-sky-100 text-sky-700',
            'SCIENCE/RESEARCH': 'bg-emerald-100 text-emerald-700',
            'BUSINESS/MANAGEMENT': 'bg-amber-100 text-amber-700',
            'SOCIAL/HELPING': 'bg-rose-100 text-rose-700',
            'DATA/ANALYTICS': 'bg-cyan-100 text-cyan-700',
        };
        return map[cluster?.toUpperCase()] || 'bg-slate-100 text-slate-600';
    };

    const rankGradient = (idx: number) => {
        const gradients = [
            'from-indigo-500 to-violet-500',
            'from-sky-500 to-cyan-500',
            'from-teal-500 to-emerald-500',
        ];
        return gradients[idx] || gradients[0];
    };

    return (
        <div className="min-h-screen pt-24 pb-24 max-w-6xl mx-auto px-4">

            {/* ═══════ HEADER ═══════ */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-200">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Your Career Dashboard</h1>
                </div>
                <div className="flex items-start gap-3 mt-4 p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 text-indigo-800">
                    <Info className="w-5 h-5 shrink-0 mt-0.5" />
                    <p className="text-sm leading-relaxed">
                        Recommendations are matched deterministically against our career ontology based on your interests, skills, and cognitive style.
                    </p>
                </div>
            </motion.div>


            {/* ═══════ STAT OVERVIEW CARDS ═══════ */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                {/* Cognitive Style */}
                <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}
                    className="group relative overflow-hidden bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                    <div className="absolute -top-6 -right-6 w-20 h-20 bg-indigo-50 rounded-full opacity-60 group-hover:scale-125 transition-transform" />
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-lg bg-indigo-100 flex items-center justify-center">
                            <Brain className="w-5 h-5 text-indigo-600" />
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Cognitive Style</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-900">{cognitive_profile.orientation}</p>
                    <div className="mt-3 flex gap-2">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-medium">Analytical {Math.round(cognitive_profile.analytical_index * 100)}%</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-teal-50 text-teal-600 font-medium">Applied {Math.round(cognitive_profile.applied_index * 100)}%</span>
                    </div>
                </motion.div>

                {/* Top Interest */}
                <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1}
                    className="group relative overflow-hidden bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                    <div className="absolute -top-6 -right-6 w-20 h-20 bg-violet-50 rounded-full opacity-60 group-hover:scale-125 transition-transform" />
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-lg bg-violet-100 flex items-center justify-center">
                            <Target className="w-5 h-5 text-violet-600" />
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Top Interest</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-900">{topRiasec.name}</p>
                    <div className="mt-3 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${topRiasec.score}%` }} transition={{ duration: 0.8, ease: 'easeOut' }}
                            className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
                        />
                    </div>
                    <p className="text-xs text-slate-400 mt-1.5 text-right font-medium">{topRiasec.score}%</p>
                </motion.div>

                {/* Strongest Skill */}
                <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2}
                    className="group relative overflow-hidden bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                    <div className="absolute -top-6 -right-6 w-20 h-20 bg-teal-50 rounded-full opacity-60 group-hover:scale-125 transition-transform" />
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-lg bg-teal-100 flex items-center justify-center">
                            <Lightbulb className="w-5 h-5 text-teal-600" />
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Strongest Skill</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-900">{topSkill.name}</p>
                    <div className="mt-3 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${topSkill.score}%` }} transition={{ duration: 0.8, ease: 'easeOut' }}
                            className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"
                        />
                    </div>
                    <p className="text-xs text-slate-400 mt-1.5 text-right font-medium">{topSkill.score}%</p>
                </motion.div>
            </div>


            {/* ═══════ CAREER MATCH CARDS ═══════ */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-10">
                <div className="flex items-center gap-2 mb-5">
                    <TrendingUp className="w-5 h-5 text-indigo-500" />
                    <h2 className="text-xl font-semibold text-slate-900">Top Career Matches</h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                    {top_3_roles.map((role: any, idx: number) => (
                        <motion.div
                            key={role.id}
                            variants={fadeUp} initial="hidden" animate="show" custom={idx + 3}
                            className="group relative bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
                        >
                            {/* rank badge */}
                            <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${rankGradient(idx)}`} />

                            <div className="p-5 pt-6">
                                <div className="flex items-start justify-between mb-3">
                                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${rankGradient(idx)} flex items-center justify-center text-white font-bold text-sm shadow-sm`}>
                                        #{idx + 1}
                                    </div>
                                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${clusterColor(role.cluster)}`}>
                                        {role.cluster}
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold text-slate-900 mb-2">{role.title}</h3>

                                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                                    Matches your <strong className="text-slate-700">{role.cognitive_orientation}</strong> thinking style &amp;
                                    <strong className="text-slate-700"> {role.riasec.primary}</strong> + <strong className="text-slate-700">{role.riasec.secondary}</strong> interests.
                                </p>

                                {/* trait pills */}
                                <div className="flex flex-wrap gap-1.5 mb-5">
                                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-medium">{role.riasec.primary}</span>
                                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-violet-50 text-violet-600 font-medium">{role.riasec.secondary}</span>
                                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">{role.cognitive_orientation}</span>
                                </div>

                                <button
                                    onClick={() => navigate('/roadmap')}
                                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-all"
                                >
                                    <span>View Roadmap</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>


            {/* ═══════ CHARTS SECTION ═══════ */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mb-10">
                <div className="flex items-center gap-2 mb-5">
                    <Zap className="w-5 h-5 text-indigo-500" />
                    <h2 className="text-xl font-semibold text-slate-900">Data Breakdown</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    {/* RIASEC Radar */}
                    <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm">
                        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-5">RIASEC Interest Footprint</h3>
                        <div className="h-[280px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                                    <PolarGrid stroke="#e2e8f0" />
                                    <PolarAngleAxis dataKey="domain" tick={{ fill: '#475569', fontSize: 11 }} />
                                    <Radar name="Footprint" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.35} />
                                    <Tooltip contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', borderRadius: '12px', color: '#0f172a', fontSize: '12px' }} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Skills Bar */}
                    <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm">
                        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-5">Quantified Skill Strengths</h3>
                        <div className="h-[280px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={skillsData} margin={{ top: 10, right: 20, left: -20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                                    <XAxis dataKey="name" tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                                    <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', borderRadius: '12px', color: '#0f172a', fontSize: '12px' }} />
                                    <Bar dataKey="Score" fill="url(#skillGradient)" radius={[6, 6, 0, 0]} barSize={36} />
                                    <defs>
                                        <linearGradient id="skillGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#14b8a6" />
                                            <stop offset="100%" stopColor="#0d9488" />
                                        </linearGradient>
                                    </defs>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </motion.div>


            {/* ═══════ COGNITIVE PROFILE WIDGET ═══════ */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
                className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm mb-10"
            >
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">Cognitive Processing Profile</h3>

                <div className="flex items-center gap-6 mb-4">
                    <div className="text-center shrink-0">
                        <div className="relative w-20 h-20">
                            <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                                <circle cx="40" cy="40" r="34" fill="none" stroke="#f1f5f9" strokeWidth="6" />
                                <motion.circle
                                    cx="40" cy="40" r="34" fill="none" stroke="#6366f1" strokeWidth="6"
                                    strokeLinecap="round"
                                    strokeDasharray={`${2 * Math.PI * 34}`}
                                    initial={{ strokeDashoffset: 2 * Math.PI * 34 }}
                                    animate={{ strokeDashoffset: 2 * Math.PI * 34 * (1 - analyticalPct / 100) }}
                                    transition={{ duration: 1, ease: 'easeOut' }}
                                />
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-slate-900">{analyticalPct}%</span>
                        </div>
                        <p className="text-[10px] uppercase tracking-wider text-slate-400 mt-1 font-semibold">Analytical</p>
                    </div>

                    <div className="flex-1">
                        <div className="relative h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${analyticalPct}%` }} transition={{ duration: 0.8 }}
                                className="absolute left-0 top-0 h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full"
                            />
                            <motion.div initial={{ width: 0 }} animate={{ width: `${100 - analyticalPct}%` }} transition={{ duration: 0.8 }}
                                className="absolute right-0 top-0 h-full bg-gradient-to-l from-teal-500 to-teal-400 rounded-full"
                            />
                        </div>
                        <div className="flex justify-between mt-2 text-xs font-medium">
                            <span className="text-indigo-600">Analytical {Math.round(cognitive_profile.analytical_index * 100)}%</span>
                            <span className="px-2.5 py-0.5 bg-slate-100 rounded-full text-slate-700 font-semibold">{cognitive_profile.orientation}</span>
                            <span className="text-teal-600">Applied {Math.round(cognitive_profile.applied_index * 100)}%</span>
                        </div>
                    </div>
                </div>
            </motion.div>


            {/* ═══════ BOTTOM CTA ═══════ */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                className="flex justify-center"
            >
                <button
                    onClick={() => navigate('/roadmap')}
                    className="group relative inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white rounded-full font-semibold transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5"
                >
                    <span>View Actionable Roadmaps</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </motion.div>
        </div>
    );
};

export default ResultsDashboard;
