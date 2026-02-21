import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';

const PersonalInfo = () => {
    const navigate = useNavigate();
    const { state, updateSection } = useAssessment();
    const [formData, setFormData] = useState({
        name: state.personalInfo?.name || '',
        age: state.personalInfo?.age || '',
        education_level: state.personalInfo?.education_level || 'Undergraduate',
        degree: state.personalInfo?.degree || ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateSection('personalInfo', formData);
        navigate('/assessment');
    };

    const showDegree = ['Undergraduate', 'Postgraduate'].includes(formData.education_level);

    return (
        <div className="min-h-screen pt-32 pb-16 flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-lg bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl"
            >
                <h2 className="text-3xl font-semibold mb-2 text-white">Let's get started</h2>
                <p className="text-slate-400 mb-8 text-sm">
                    We need a little context to make our recommendations accurate. Your data is used only for modeling.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Full Name</label>
                        <input
                            required
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Alex Walker"
                            className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-sans"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Age</label>
                        <input
                            required
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            placeholder="e.g. 21"
                            min="13" max="100"
                            className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-sans"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Education Level</label>
                        <select
                            name="education_level"
                            value={formData.education_level}
                            onChange={handleChange}
                            className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-sans appearance-none"
                        >
                            <option value="Below 10th">Below 10th Grade</option>
                            <option value="10th">10th Grade</option>
                            <option value="12th">12th Grade / High School</option>
                            <option value="Undergraduate">Undergraduate (Bachelors)</option>
                            <option value="Postgraduate">Postgraduate (Masters/PhD)</option>
                        </select>
                    </div>

                    {showDegree && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="overflow-hidden"
                        >
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">Current Degree / Field of Study</label>
                            <input
                                required
                                type="text"
                                name="degree"
                                value={formData.degree}
                                onChange={handleChange}
                                placeholder="e.g. B.Tech Computer Science"
                                className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-sans"
                            />
                        </motion.div>
                    )}

                    <div className="mt-4 pt-6 border-t border-slate-700/50">
                        <button
                            type="submit"
                            className="w-full group relative inline-flex justify-center items-center gap-2 px-8 py-3.5 bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg font-medium transition-all shadow-[0_0_20px_rgba(99,102,241,0.2)]"
                        >
                            <span>Continue to Assessment</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default PersonalInfo;
