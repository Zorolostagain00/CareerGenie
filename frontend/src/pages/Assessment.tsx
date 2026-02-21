import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';

/* ─── colour tokens (warm earth palette) ─── */
const C = {
    bg: '#faf7f4',
    card: '#ffffff',
    border: '#ede8e3',
    heading: '#2c2320',
    sub: '#6b5e56',
    label: '#4a403a',
    ring: '#a8917e',       // unselected circle border
    ringHover: '#8b7567',
    fill: '#6b5347',       // selected fill (warm brown)
    fillLight: '#d4c4b6',  // lighter shade
    btnPrimary: '#3d3028',
    btnSecondary: '#c8b9a9',
    btnText: '#faf7f4',
    accent: '#8b6f5a',
};

/* ─── Question data ─── */
type StemQuestion = {
    stem: string;
    items: { id: string; text: string }[];
};

const STEPS: { title: string; questions: StemQuestion[] }[] = [
    {
        title: 'Interests & Passions',
        questions: [
            {
                stem: 'Working with tools, machines, or physical objects...',
                items: [
                    { id: 'realistic_enjoy', text: 'Excites me & gives me energy' },
                    { id: 'realistic_do', text: 'Is something I regularly choose to do' },
                ],
            },
            {
                stem: 'Analyzing data or solving logical problems...',
                items: [
                    { id: 'investigative_enjoy', text: 'Feels natural and fun to me' },
                    { id: 'investigative_do', text: 'Is how I spend my free time' },
                ],
            },
            {
                stem: 'Creating original designs, writing, or music...',
                items: [
                    { id: 'artistic_enjoy', text: 'Makes me feel alive' },
                    { id: 'artistic_do', text: 'Is a regular part of my life' },
                ],
            },
            {
                stem: 'Helping others grow or learn...',
                items: [
                    { id: 'social_enjoy', text: 'Gives me deep satisfaction' },
                    { id: 'social_do', text: 'Is something I do on a regular basis' },
                ],
            },
            {
                stem: 'Persuading, leading, or taking charge...',
                items: [
                    { id: 'enterprising_enjoy', text: 'Energises me' },
                    { id: 'enterprising_do', text: 'Is something I naturally gravitate toward' },
                ],
            },
            {
                stem: 'Organising systems and following structured processes...',
                items: [
                    { id: 'conventional_enjoy', text: 'Feels satisfying and calming' },
                    { id: 'conventional_do', text: 'Is how I prefer to work' },
                ],
            },
        ],
    },
    {
        title: 'Cognitive & Problem Style',
        questions: [
            {
                stem: 'When I face an abstract or complex problem...',
                items: [
                    { id: 'abstract_solving', text: 'I enjoy thinking through it deeply' },
                    { id: 'breaking_down', text: 'I break it into smaller pieces first' },
                ],
            },
            {
                stem: 'Patterns and connections in information...',
                items: [
                    { id: 'pattern_recognition', text: 'I spot them quickly' },
                    { id: 'practical_over_theory', text: 'I prefer using them practically over studying theory' },
                ],
            },
            {
                stem: 'When working on a task...',
                items: [
                    { id: 'structured_writing', text: 'I like structuring my thoughts in writing' },
                    { id: 'deep_focus', text: 'I can stay deeply focused for long periods' },
                ],
            },
        ],
    },
    {
        title: 'Skill Exposure & Strength',
        questions: [
            {
                stem: 'Mathematics and numbers...',
                items: [
                    {
                        id: 'math_skill', text: "I'm confident in my ability"
                    },
                    { id: 'math_interest', text: 'I find them genuinely interesting' },
                ],
            },
            {
                stem: 'Writing and communication...',
                items: [
                    { id: 'writing_skill', text: 'I can express ideas clearly in writing' },
                    { id: 'writing_interest', text: 'I enjoy the process of writing' },
                ],
            },
            {
                stem: 'Coding and technology...',
                items: [
                    { id: 'coding_interest', text: 'Excites me and I want to learn more' },
                    { id: 'creativity_confidence', text: 'I am confident in my creative ability' },
                ],
            },
            {
                stem: 'General work habits...',
                items: [
                    { id: 'attention_to_detail', text: 'I pay great attention to detail' },
                    { id: 'learn_quickly', text: 'I pick up new skills quickly' },
                ],
            },
        ],
    },
    {
        title: 'Personality & Work Style',
        questions: [
            {
                stem: 'Taking risks and trying new things...',
                items: [
                    { id: 'risk_comfort', text: 'Feels exciting rather than scary' },
                    { id: 'stability_preference', text: 'I prefer stability over adventure (reverse)' },
                ],
            },
            {
                stem: 'Working with others versus alone...',
                items: [
                    { id: 'leadership', text: 'I naturally take the lead in a group' },
                    { id: 'independence', text: 'I do my best work independently' },
                ],
            },
            {
                stem: 'Dealing with pressure...',
                items: [
                    { id: 'stress_handling', text: 'I stay calm under pressure' },
                    { id: 'structure_preference', text: 'I work best with clear rules and structure' },
                ],
            },
        ],
    },
    {
        title: 'Lifestyle & Orientation',
        questions: [
            {
                stem: 'Long-term commitments...',
                items: [
                    {
                        id: 'long_study_tolerance', text: "I'm okay with years of study for the right career"
                    },
                    { id: 'income_vs_wlb', text: "I'd choose higher income even if it means less free time" },
                ],
            },
            {
                stem: 'Exploring new horizons...',
                items: [
                    {
                        id: 'relocation_openness', text: "I'm open to relocating for opportunities"
                    },
                    { id: 'social_impact_priority', text: 'Making a social impact is important to me' },
                ],
            },
            {
                stem: 'Entrepreneurial spirit...',
                items: [
                    { id: 'entrepreneurial_openness', text: "I'd love to start my own venture someday" },
                ],
            },
        ],
    },
];

const SCALE_SIZE = 7; // number of radio circles

/* ─── Styles (CSS-in-JS) ─── */
const styles = {
    page: {
        minHeight: '100vh',
        background: C.bg,
        paddingTop: '5rem',
        paddingBottom: '4rem',
        display: 'flex',
        justifyContent: 'center',
    } as React.CSSProperties,
    container: {
        width: '100%',
        maxWidth: '680px',
        padding: '0 1.25rem',
    } as React.CSSProperties,
    progressWrap: {
        marginBottom: '2.5rem',
    } as React.CSSProperties,
    progressLabel: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.75rem',
        fontWeight: 600,
        color: C.sub,
        textTransform: 'uppercase' as const,
        letterSpacing: '0.06em',
        marginBottom: '0.5rem',
    } as React.CSSProperties,
    progressBar: {
        height: '4px',
        width: '100%',
        background: C.border,
        borderRadius: '999px',
        overflow: 'hidden',
    } as React.CSSProperties,
    progressFill: (pct: number) => ({
        height: '100%',
        width: `${pct}%`,
        background: C.fill,
        borderRadius: '999px',
        transition: 'width 0.4s ease',
    }) as React.CSSProperties,
    card: {
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: '1.25rem',
        padding: '2rem 2rem 1.5rem',
        marginBottom: '1.5rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    } as React.CSSProperties,
    stem: {
        fontSize: '1.25rem',
        fontWeight: 700,
        color: C.heading,
        marginBottom: '1.75rem',
        lineHeight: 1.35,
        fontFamily: "'Inter', serif",
    } as React.CSSProperties,
    itemWrap: {
        marginBottom: '1.75rem',
    } as React.CSSProperties,
    itemLabel: {
        fontSize: '0.875rem',
        color: C.label,
        marginBottom: '0.6rem',
        fontWeight: 400,
    } as React.CSSProperties,
    scaleRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
    } as React.CSSProperties,
    scaleLabels: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.7rem',
        color: C.sub,
        marginTop: '0.25rem',
        fontWeight: 500,
        fontStyle: 'italic',
    } as React.CSSProperties,
    circle: (selected: boolean, idx: number) => {
        // size gradient: smallest in middle, larger at edges
        const mid = (SCALE_SIZE - 1) / 2;
        const distFromMid = Math.abs(idx - mid);
        const size = 24 + distFromMid * 4;
        return {
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: '50%',
            border: `2px solid ${selected ? C.fill : C.ring}`,
            background: selected ? C.fill : 'transparent',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            flexShrink: 0,
        } as React.CSSProperties;
    },
    navRow: {
        display: 'flex',
        gap: '0.75rem',
        marginTop: '2rem',
    } as React.CSSProperties,
    navBtn: (variant: 'back' | 'next' | 'submit') => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        padding: '0.85rem 1.75rem',
        borderRadius: '2rem',
        border: 'none',
        fontSize: '0.95rem',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        ...(variant === 'back'
            ? { background: C.btnSecondary, color: C.heading }
            : variant === 'next'
                ? { background: C.btnPrimary, color: C.btnText }
                : { background: '#3b7a57', color: '#fff' }),
    }) as React.CSSProperties,
};

const Assessment = () => {
    const navigate = useNavigate();
    const { state, updateSection } = useAssessment();
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // All answers stored as { [itemId]: number (1-7) }
    const [answers, setAnswers] = useState<Record<string, number>>({});

    const setAnswer = (id: string, val: number) => {
        setAnswers(prev => ({ ...prev, [id]: val }));
    };

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) setCurrentStep(v => v + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const handlePrev = () => {
        if (currentStep > 0) setCurrentStep(v => v - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    /* Map 1-7 radio answers → original 1-5 scale used by backend */
    const map7to5 = (v: number | undefined): number => {
        if (!v) return 3;
        return Math.round(((v - 1) / 6) * 4 + 1);
    };

    /* Map 1-7 radio answers → original 1-10 scale used by backend */
    const map7to10 = (v: number | undefined): number => {
        if (!v) return 5;
        return Math.round(((v - 1) / 6) * 9 + 1);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        const riasec = {
            realistic: map7to5(Math.max(answers.realistic_enjoy || 3, answers.realistic_do || 3)),
            investigative: map7to5(Math.max(answers.investigative_enjoy || 3, answers.investigative_do || 3)),
            artistic: map7to5(Math.max(answers.artistic_enjoy || 3, answers.artistic_do || 3)),
            social: map7to5(Math.max(answers.social_enjoy || 3, answers.social_do || 3)),
            enterprising: map7to5(Math.max(answers.enterprising_enjoy || 3, answers.enterprising_do || 3)),
            conventional: map7to5(Math.max(answers.conventional_enjoy || 3, answers.conventional_do || 3)),
        };

        const cogA = {
            abstract_solving: map7to5(answers.abstract_solving),
            breaking_down: map7to5(answers.breaking_down),
            pattern_recognition: map7to5(answers.pattern_recognition),
            practical_over_theory: map7to5(answers.practical_over_theory),
            structured_writing: map7to5(answers.structured_writing),
            deep_focus: map7to5(answers.deep_focus),
        };

        const cogB = { sequence: 0, logic: '', speed: 0 };

        const skills = {
            math_skill: map7to10(answers.math_skill),
            math_interest: map7to10(answers.math_interest),
            writing_skill: map7to10(answers.writing_skill),
            writing_interest: map7to10(answers.writing_interest),
            coding: 'Basic',
            coding_interest: map7to10(answers.coding_interest),
            creativity_portfolio: false,
            creativity_confidence: map7to10(answers.creativity_confidence),
            attention_to_detail: map7to5(answers.attention_to_detail),
            learn_quickly: map7to5(answers.learn_quickly),
        };

        const personality = {
            risk_comfort: map7to5(answers.risk_comfort),
            stability_preference: map7to5(answers.stability_preference),
            leadership: map7to5(answers.leadership),
            independence: map7to5(answers.independence),
            stress_handling: map7to5(answers.stress_handling),
            structure_preference: map7to5(answers.structure_preference),
        };

        const lifestyle = {
            long_study_tolerance: map7to5(answers.long_study_tolerance),
            income_vs_wlb: map7to5(answers.income_vs_wlb),
            relocation_openness: map7to5(answers.relocation_openness),
            social_impact_priority: map7to5(answers.social_impact_priority),
            entrepreneurial_openness: map7to5(answers.entrepreneurial_openness),
        };

        updateSection('riasec', riasec);
        updateSection('cognitiveA', cogA);
        updateSection('cognitiveB', cogB);
        updateSection('skills', skills);
        updateSection('personality', personality);
        updateSection('lifestyle', lifestyle);

        try {
            const payload = {
                personal_info: state.personalInfo,
                riasec,
                cognitive_a: cogA,
                cognitive_b: cogB,
                skills,
                personality,
                lifestyle,
            };

            const res = await fetch('http://127.0.0.1:8000/api/recommend', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
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

    const step = STEPS[currentStep];
    const progressPct = ((currentStep + 1) / STEPS.length) * 100;

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                {/* Progress */}
                <div style={styles.progressWrap}>
                    <div style={styles.progressLabel}>
                        <span>{step.title}</span>
                        <span>Step {currentStep + 1} of {STEPS.length}</span>
                    </div>
                    <div style={styles.progressBar}>
                        <motion.div
                            style={styles.progressFill(progressPct)}
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPct}%` }}
                        />
                    </div>
                </div>

                {/* Questions */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -18 }}
                        transition={{ duration: 0.3 }}
                    >
                        {step.questions.map((q, qi) => (
                            <div key={qi} style={styles.card}>
                                <div style={styles.stem}>{q.stem}</div>
                                {q.items.map((item, ii) => (
                                    <div key={item.id} style={styles.itemWrap}>
                                        <div style={styles.itemLabel}>
                                            {ii + 1}. {item.text}
                                        </div>
                                        <div style={styles.scaleRow}>
                                            {Array.from({ length: SCALE_SIZE }, (_, idx) => {
                                                const val = idx + 1;
                                                const selected = answers[item.id] === val;
                                                return (
                                                    <div
                                                        key={idx}
                                                        style={styles.circle(selected, idx)}
                                                        onClick={() => setAnswer(item.id, val)}
                                                        onMouseEnter={e => {
                                                            if (!selected) {
                                                                (e.currentTarget as HTMLElement).style.borderColor = C.ringHover;
                                                                (e.currentTarget as HTMLElement).style.background = C.fillLight;
                                                            }
                                                        }}
                                                        onMouseLeave={e => {
                                                            if (!selected) {
                                                                (e.currentTarget as HTMLElement).style.borderColor = C.ring;
                                                                (e.currentTarget as HTMLElement).style.background = 'transparent';
                                                            }
                                                        }}
                                                        role="radio"
                                                        aria-checked={selected}
                                                        aria-label={`${item.text}: ${val}`}
                                                        tabIndex={0}
                                                    />
                                                );
                                            })}
                                        </div>
                                        <div style={styles.scaleLabels}>
                                            <span>Disagree</span>
                                            <span>Agree</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div style={styles.navRow}>
                    {currentStep > 0 && (
                        <button
                            style={styles.navBtn('back')}
                            onClick={handlePrev}
                            disabled={isSubmitting}
                        >
                            <ArrowLeft size={18} />
                        </button>
                    )}
                    {currentStep < STEPS.length - 1 ? (
                        <button style={styles.navBtn('next')} onClick={handleNext}>
                            <ArrowRight size={18} />
                        </button>
                    ) : (
                        <button
                            style={styles.navBtn('submit')}
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <Loader2 size={18} className="animate-spin" />
                            ) : (
                                'Get Recommendations'
                            )}
                            <ArrowRight size={18} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Assessment;
