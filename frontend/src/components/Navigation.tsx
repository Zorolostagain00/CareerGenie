import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const Navigation = () => {
    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
            <nav className="bg-slate-900/60 backdrop-blur-md border border-slate-700/50 rounded-full px-6 py-3 shadow-2xl flex items-center gap-8">
                <NavLink to="/" className="flex items-center gap-2 group">
                    <Sparkles className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                    <span className="font-semibold text-slate-100 tracking-wide text-sm">Career Genie</span>
                </NavLink>

                <div className="h-4 w-px bg-slate-700/50"></div>

                <div className="flex items-center gap-6 text-sm font-medium">
                    <NavLink
                        to="/"
                        className={({ isActive }) => `transition-colors hover:text-indigo-300 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/personal-info"
                        className={({ isActive }) => `transition-colors hover:text-indigo-300 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`}
                    >
                        Assessment
                    </NavLink>
                </div>
            </nav>
        </div>
    );
};

export default Navigation;
