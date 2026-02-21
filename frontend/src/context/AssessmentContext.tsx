import React, { createContext, useContext, useState, ReactNode } from 'react';

export type AssessmentState = {
    personalInfo: any;
    riasec: any;
    cognitiveA: any;
    cognitiveB: any;
    skills: any;
    personality: any;
    lifestyle: any;
    results: any;
};

interface AssessmentContextType {
    state: AssessmentState;
    updateSection: (section: keyof AssessmentState, data: any) => void;
    reset: () => void;
}

const initialState: AssessmentState = {
    personalInfo: {},
    riasec: {},
    cognitiveA: {},
    cognitiveB: {},
    skills: {},
    personality: {},
    lifestyle: {},
    results: null,
};

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export const AssessmentProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<AssessmentState>(initialState);

    const updateSection = (section: keyof AssessmentState, data: any) => {
        setState((prev) => ({ ...prev, [section]: data }));
    };

    const reset = () => {
        setState(initialState);
    };

    return (
        <AssessmentContext.Provider value={{ state, updateSection, reset }}>
            {children}
        </AssessmentContext.Provider>
    );
};

export const useAssessment = () => {
    const context = useContext(AssessmentContext);
    if (context === undefined) {
        throw new Error('useAssessment must be used within an AssessmentProvider');
    }
    return context;
};
