import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, User, Calendar, GraduationCap, BookOpen, Sparkles } from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';

const InputField = ({ icon: Icon, label, ...props }: any) => (
    <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 ml-1 block">{label}</label>
        <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                <Icon className="w-5 h-5" />
            </div>
            <input
                {...props}
                className="w-full bg-white/70 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:border-slate-300 font-medium"
            />
        </div>
    </div>
);

const SelectField = ({ icon: Icon, label, ...props }: any) => (
    <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 ml-1 block">{label}</label>
        <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                <Icon className="w-5 h-5" />
            </div>
            <select
                {...props}
                className="w-full bg-white/70 border border-slate-200 rounded-2xl pl-12 pr-10 py-4 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:border-slate-300 appearance-none font-medium"
            >
                {props.children}
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
        </div>
    </div>
);

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
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center relative overflow-hidden py-20 px-4 md:px-8">
            {/* Background Ornaments */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-400/20 mix-blend-multiply blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
                <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-purple-400/20 mix-blend-multiply blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
                <div className="absolute top-[40%] left-[20%] w-[400px] h-[400px] rounded-full bg-pink-400/20 mix-blend-multiply blur-3xl animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
                className="w-full max-w-2xl bg-white/80 backdrop-blur-2xl border border-white shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] rounded-[2.5rem] p-8 sm:p-12 relative z-10"
            >
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
                        className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-2xl mb-5 text-indigo-600 shadow-inner"
                    >
                        <Sparkles className="w-8 h-8" />
                    </motion.div>
                    <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Let's get started</h2>
                    <p className="text-lg text-slate-600 max-w-md mx-auto leading-relaxed">
                        We need a little context to make our recommendations accurate. Your data is used only for modeling.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <InputField
                                icon={User}
                                label="Full Name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g. Alex Walker"
                            />
                        </div>

                        <InputField
                            icon={Calendar}
                            label="Age"
                            type="number"
                            name="age"
                            required
                            min="13" max="100"
                            value={formData.age}
                            onChange={handleChange}
                            placeholder="e.g. 21"
                        />

                        <SelectField
                            icon={GraduationCap}
                            label="Education Level"
                            name="education_level"
                            value={formData.education_level}
                            onChange={handleChange}
                        >
                            <option value="Below 10th">Below 10th Grade</option>
                            <option value="10th">10th Grade</option>
                            <option value="12th">12th Grade / High School</option>
                            <option value="Undergraduate">Undergraduate (Bachelors)</option>
                            <option value="Postgraduate">Postgraduate (Masters/PhD)</option>
                        </SelectField>

                        <AnimatePresence>
                            {showDegree && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="md:col-span-2 overflow-hidden"
                                >
                                    <div className="pt-2">
                                        <InputField
                                            icon={BookOpen}
                                            label="Current Degree / Field of Study"
                                            name="degree"
                                            required={showDegree}
                                            value={formData.degree}
                                            onChange={handleChange}
                                            placeholder="e.g. B.Tech Computer Science"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="mt-4 pt-8 border-t border-slate-200/60">
                        <button
                            type="submit"
                            className="w-full relative overflow-hidden group flex justify-center items-center gap-2 px-8 py-4.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-semibold text-[1.1rem] transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(79,70,229,0.5)] hover:shadow-[0_8px_25px_-4px_rgba(79,70,229,0.6)] hover:-translate-y-0.5"
                        >
                            <span className="relative z-10 py-0.5">Continue to Assessment</span>
                            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />

                            {/* Button subtle gradient hover effect */}
                            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_auto] animate-gradient" />
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default PersonalInfo;
