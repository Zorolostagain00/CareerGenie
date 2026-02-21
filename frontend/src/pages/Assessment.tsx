import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Loader2 } from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';
import { CustomSlider } from '../components/Slider';

const SECTIONS = [
    "Interest Domains",
    "Cognitive & Problem Style",
    "Skill Exposure & Strength",
    "Personality & Work Style",
    "Lifestyle & Orientation"
];

const Assessment = () => {
    const navigate = useNavigate();
    const { state, updateSection } = useAssessment();
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form states initialized
    const [riasec, setRiasec] = useState({ realistic: 3, investigative: 3, artistic: 3, social: 3, enterprising: 3, conventional: 3 });
    const [cogA, setCogA] = useState({ abstract_solving: 3, breaking_down: 3, pattern_recognition: 3, practical_over_theory: 3, structured_writing: 3, deep_focus: 3 });
    const [cogB, setCogB] = useState({ sequence: '', logic: '', speed: '' });
    const [skills, setSkills] = useState({ math_skill: 5, math_interest: 5, writing_skill: 5, writing_interest: 5, coding: 'None', coding_interest: 5, creativity_portfolio: false, creativity_confidence: 5, attention_to_detail: 3, learn_quickly: 3 });
    const [personality, setPersonality] = useState({ risk_comfort: 3, stability_preference: 3, leadership: 3, independence: 3, stress_handling: 3, structure_preference: 3 });
    const [lifestyle, setLifestyle] = useState({ long_study_tolerance: 3, income_vs_wlb: 3, relocation_openness: 3, social_impact_priority: 3, entrepreneurial_openness: 3 });

    const handleNext = () => {
        if (currentStep < SECTIONS.length - 1) setCurrentStep(v => v + 1);
    };
    const handlePrev = () => {
        if (currentStep > 0) setCurrentStep(v => v - 1);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        // Save to context
        updateSection('riasec', riasec);
        updateSection('cognitiveA', cogA);
        updateSection('cognitiveB', {
            sequence: parseInt(cogB.sequence) || 0,
            logic: cogB.logic,
            speed: parseInt(cogB.speed) || 0
        });
        updateSection('skills', skills);
        updateSection('personality', personality);
        updateSection('lifestyle', lifestyle);

        try {
            // Simulate API call to backend
            const payload = {
                personal_info: state.personalInfo,
                riasec,
                cognitive_a: cogA,
                cognitive_b: { sequence: parseInt(cogB.sequence) || 0, logic: cogB.logic, speed: parseInt(cogB.speed) || 0 },
                skills,
                personality,
                lifestyle
            };

            const res = await fetch('http://127.0.0.1:8000/api/recommend', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            updateSection('results', data);
            navigate('/results');
        } catch (err) {
            console.error(err);
            alert('Error connecting to engine. Is backend running?');
            setIsSubmitting(false);
        }
    };

    // Renderer for Likert Questions
    const LikertQuestion = ({ label, desc, val, min = 1, max = 5, onChange, labels }: any) => (
        <div className="mb-10 last:mb-2">
            <div className="flex justify-between items-baseline mb-3">
                <label className="text-slate-200 font-medium text-[15px]">{label}</label>
                <span className="text-indigo-400 font-bold bg-indigo-500/10 px-2 py-0.5 rounded text-sm">{val}</span>
            </div>
            {desc && <p className="text-slate-400 text-sm mb-4">{desc}</p>}
            <CustomSlider value={val} min={min} max={max} onChange={onChange} labels={labels || ['Strongly Disagree', 'Neutral', 'Strongly Agree']} />
        </div>
    );

    return (
        <div className="min-h-screen pt-24 pb-24 max-w-3xl mx-auto flex flex-col">
            {/* Progress */}
            <div className="mb-12">
                <div className="flex justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                    <span>{SECTIONS[currentStep]}</span>
                    <span>Step {currentStep + 1} of {SECTIONS.length}</span>
                </div>
                <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-indigo-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentStep + 1) / SECTIONS.length) * 100}%` }}
                    />
                </div>
            </div>

            <div className="grow">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* STEP 1: RIASEC */}
                        {currentStep === 0 && (
                            <div className="bg-slate-900/40 border border-slate-800/60 p-8 rounded-2xl">
                                <LikertQuestion
                                    label="Realistic" desc="I enjoy working with tools, machines, or physical objects. I prefer practical tasks over theoretical discussions."
                                    val={riasec.realistic} onChange={(v: number) => setRiasec({ ...riasec, realistic: v })}
                                />
                                <LikertQuestion
                                    label="Investigative" desc="I enjoy analyzing data or solving logical problems. I am curious about how systems work."
                                    val={riasec.investigative} onChange={(v: number) => setRiasec({ ...riasec, investigative: v })}
                                />
                                <LikertQuestion
                                    label="Artistic" desc="I enjoy creating original designs, writing, or visual content. Open-ended over structured."
                                    val={riasec.artistic} onChange={(v: number) => setRiasec({ ...riasec, artistic: v })}
                                />
                                <LikertQuestion
                                    label="Social" desc="I feel satisfied when helping others grow or learn. I enjoy working closely with people."
                                    val={riasec.social} onChange={(v: number) => setRiasec({ ...riasec, social: v })}
                                />
                                <LikertQuestion
                                    label="Enterprising" desc="I enjoy persuading or influencing others. I like taking initiative and leading."
                                    val={riasec.enterprising} onChange={(v: number) => setRiasec({ ...riasec, enterprising: v })}
                                />
                                <LikertQuestion
                                    label="Conventional" desc="I prefer working with organized systems and structured processes. Managing records."
                                    val={riasec.conventional} onChange={(v: number) => setRiasec({ ...riasec, conventional: v })}
                                />
                            </div>
                        )}

                        {/* STEP 2: COGNITIVE */}
                        {currentStep === 1 && (
                            <div className="space-y-8">
                                <div className="bg-slate-900/40 border border-slate-800/60 p-8 rounded-2xl">
                                    <h3 className="text-xl font-semibold mb-6">Part A: Style</h3>
                                    <LikertQuestion label="Abstract Problem Solving" val={cogA.abstract_solving} onChange={(v: number) => setCogA({ ...cogA, abstract_solving: v })} />
                                    <LikertQuestion label="Breaking Down Complex Problems" val={cogA.breaking_down} onChange={(v: number) => setCogA({ ...cogA, breaking_down: v })} />
                                    <LikertQuestion label="Pattern Recognition" val={cogA.pattern_recognition} onChange={(v: number) => setCogA({ ...cogA, pattern_recognition: v })} />
                                    <LikertQuestion label="Practical over Theory" val={cogA.practical_over_theory} onChange={(v: number) => setCogA({ ...cogA, practical_over_theory: v })} />
                                    <LikertQuestion label="Structured Writing" val={cogA.structured_writing} onChange={(v: number) => setCogA({ ...cogA, structured_writing: v })} />
                                    <LikertQuestion label="Deep Focus" val={cogA.deep_focus} onChange={(v: number) => setCogA({ ...cogA, deep_focus: v })} />
                                </div>

                                <div className="bg-slate-900/40 border border-slate-800/60 p-8 rounded-2xl">
                                    <h3 className="text-xl font-semibold mb-6">Part B: Mini Test</h3>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">Sequence: 2, 6, 12, 20, ?</label>
                                            <input type="number" value={cogB.sequence} onChange={e => setCogB({ ...cogB, sequence: e.target.value })} className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none" placeholder="Enter number" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">Logic: If all A are B and some B are C. Are all A necessarily C?</label>
                                            <select value={cogB.logic} onChange={e => setCogB({ ...cogB, logic: e.target.value })} className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none appearance-none">
                                                <option value="">Select answer</option>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">Speed: How far do you travel at 60 km/h for 3 hours? (km)</label>
                                            <input type="number" value={cogB.speed} onChange={e => setCogB({ ...cogB, speed: e.target.value })} className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none" placeholder="Enter number" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 3: SKILLS */}
                        {currentStep === 2 && (
                            <div className="bg-slate-900/40 border border-slate-800/60 p-8 rounded-2xl">
                                <LikertQuestion label="Math Skill (1-10)" min={1} max={10} val={skills.math_skill} onChange={(v: number) => setSkills({ ...skills, math_skill: v })} labels={['Novice', 'Avg', 'Expert']} />
                                <LikertQuestion label="Math Interest" min={1} max={10} val={skills.math_interest} onChange={(v: number) => setSkills({ ...skills, math_interest: v })} labels={['Hate it', 'Okay', 'Love it']} />

                                <LikertQuestion label="Writing Skill (1-10)" min={1} max={10} val={skills.writing_skill} onChange={(v: number) => setSkills({ ...skills, writing_skill: v })} labels={['Poor', 'Avg', 'Excellent']} />
                                <LikertQuestion label="Writing Interest" min={1} max={10} val={skills.writing_interest} onChange={(v: number) => setSkills({ ...skills, writing_interest: v })} labels={['Low', 'Medium', 'High']} />

                                <div className="mb-10">
                                    <label className="block text-sm font-medium text-slate-300 mb-3">Coding Exposure</label>
                                    <select value={skills.coding} onChange={e => setSkills({ ...skills, coding: e.target.value })} className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none appearance-none mb-6">
                                        <option value="None">None</option>
                                        <option value="Basic">Basic (HTML/CSS, tiny scripts)</option>
                                        <option value="Intermediate">Intermediate (Logic, loops, small apps)</option>
                                        <option value="Advanced">Advanced (Data structures, fullstack)</option>
                                    </select>
                                    <LikertQuestion label="Coding Interest" min={1} max={10} val={skills.coding_interest} onChange={(v: number) => setSkills({ ...skills, coding_interest: v })} labels={['Dislike', 'Neutral', 'Passionate']} />
                                </div>

                                <div className="mb-10">
                                    <label className="flex items-center gap-3 cursor-pointer mb-6">
                                        <input type="checkbox" checked={skills.creativity_portfolio} onChange={e => setSkills({ ...skills, creativity_portfolio: e.target.checked })} className="w-5 h-5 rounded border-slate-700 text-indigo-500 focus:ring-indigo-500/50 bg-slate-950" />
                                        <span className="text-sm font-medium text-slate-300">I have a creative portfolio (Art, Design, Writing, Music, etc.)</span>
                                    </label>
                                    <LikertQuestion label="Creativity Confidence" min={1} max={10} val={skills.creativity_confidence} onChange={(v: number) => setSkills({ ...skills, creativity_confidence: v })} labels={['Low', 'Avg', 'High']} />
                                </div>

                                <LikertQuestion label="Attention to Detail" val={skills.attention_to_detail} onChange={(v: number) => setSkills({ ...skills, attention_to_detail: v })} />
                                <LikertQuestion label="Learn Quickly" val={skills.learn_quickly} onChange={(v: number) => setSkills({ ...skills, learn_quickly: v })} />
                            </div>
                        )}

                        {/* STEP 4: PERSONALITY */}
                        {currentStep === 3 && (
                            <div className="bg-slate-900/40 border border-slate-800/60 p-8 rounded-2xl">
                                <LikertQuestion label="Risk Comfort" val={personality.risk_comfort} onChange={(v: number) => setPersonality({ ...personality, risk_comfort: v })} labels={['Avoid Risk', 'Neutral', 'Embrace Risk']} />
                                <LikertQuestion label="Stability Preference" val={personality.stability_preference} onChange={(v: number) => setPersonality({ ...personality, stability_preference: v })} />
                                <LikertQuestion label="Leadership Preference" val={personality.leadership} onChange={(v: number) => setPersonality({ ...personality, leadership: v })} />
                                <LikertQuestion label="Independence" val={personality.independence} onChange={(v: number) => setPersonality({ ...personality, independence: v })} labels={['Prefer Team', 'Neutral', 'Highly Solo']} />
                                <LikertQuestion label="Stress Handling" val={personality.stress_handling} onChange={(v: number) => setPersonality({ ...personality, stress_handling: v })} labels={['Panic easily', 'Normal', 'Thrive in chaos']} />
                                <LikertQuestion label="Structure Preference" val={personality.structure_preference} onChange={(v: number) => setPersonality({ ...personality, structure_preference: v })} labels={['Hate rules', 'Neutral', 'Need strict rules']} />
                            </div>
                        )}

                        {/* STEP 5: LIFESTYLE */}
                        {currentStep === 4 && (
                            <div className="bg-slate-900/40 border border-slate-800/60 p-8 rounded-2xl">
                                <LikertQuestion label="Long Study Tolerance" val={lifestyle.long_study_tolerance} onChange={(v: number) => setLifestyle({ ...lifestyle, long_study_tolerance: v })} labels={['Hate studying', 'Okay', 'Lifelong academic']} />
                                <LikertQuestion label="Income vs Work-Life Balance" val={lifestyle.income_vs_wlb} onChange={(v: number) => setLifestyle({ ...lifestyle, income_vs_wlb: v })} labels={['Prioritize WLB', 'Balance', 'Max Income']} />
                                <LikertQuestion label="Relocation Openness" val={lifestyle.relocation_openness} onChange={(v: number) => setLifestyle({ ...lifestyle, relocation_openness: v })} />
                                <LikertQuestion label="Social Impact Priority" val={lifestyle.social_impact_priority} onChange={(v: number) => setLifestyle({ ...lifestyle, social_impact_priority: v })} />
                                <LikertQuestion label="Entrepreneurial Openness" val={lifestyle.entrepreneurial_openness} onChange={(v: number) => setLifestyle({ ...lifestyle, entrepreneurial_openness: v })} />
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Footer */}
            <div className="flex justify-between mt-12 pt-6 border-t border-slate-800">
                <button
                    onClick={handlePrev}
                    disabled={currentStep === 0 || isSubmitting}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors disabled:opacity-30 disabled:pointer-events-none"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                </button>

                {currentStep < SECTIONS.length - 1 ? (
                    <button
                        onClick={handleNext}
                        className="flex items-center gap-2 px-8 py-3 bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg font-medium transition-colors shadow-lg shadow-indigo-500/20"
                    >
                        Next
                        <ChevronRight className="w-4 h-4" />
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-8 py-3 bg-teal-500 hover:bg-teal-400 text-white rounded-lg font-medium transition-colors shadow-lg shadow-teal-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Get Recommendations'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Assessment;
