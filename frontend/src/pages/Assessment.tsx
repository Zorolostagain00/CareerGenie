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
        title: 'Interest Domains (RIASEC Model)',
        questions: [
            {
                stem: 'Realistic (Hands-on / Physical)',
                items: [
                    { id: 'realistic_enjoy', text: 'I enjoy working with tools, machines, or physical objects.' },
                    { id: 'realistic_do', text: 'I prefer practical tasks over theoretical discussions.' },
                ],
            },
            {
                stem: 'Investigative (Research / Analysis)',
                items: [
                    { id: 'investigative_enjoy', text: 'I enjoy analyzing data or solving logical problems.' },
                    { id: 'investigative_do', text: 'I am curious about how scientific or technical systems work.' },
                ],
            },
            {
                stem: 'Artistic (Creative / Expressive)',
                items: [
                    { id: 'artistic_enjoy', text: 'I enjoy creating original designs, writing, or visual content.' },
                    { id: 'artistic_do', text: 'I prefer open-ended creative tasks over structured instructions.' },
                ],
            },
            {
                stem: 'Social (Helping / Teaching)',
                items: [
                    { id: 'social_enjoy', text: 'I feel satisfied when helping others grow or learn.' },
                    { id: 'social_do', text: 'I enjoy working closely with people rather than systems.' },
                ],
            },
            {
                stem: 'Enterprising (Business / Leadership)',
                items: [
                    { id: 'enterprising_enjoy', text: 'I enjoy persuading or influencing others.' },
                    { id: 'enterprising_do', text: 'I like taking initiative and leading group activities.' },
                ],
            },
            {
                stem: 'Conventional (Structured / Organized)',
                items: [
                    { id: 'conventional_enjoy', text: 'I prefer working with organized systems and structured processes.' },
                    { id: 'conventional_do', text: 'I enjoy managing data, schedules, or detailed records.' },
                ],
            },
        ],
    },
    {
        title: 'Cognitive & Thinking Style',
        questions: [
            {
                stem: 'How do you approach problems?',
                items: [
                    { id: 'abstract_solving', text: 'I enjoy solving abstract or theoretical problems.' },
                    { id: 'breaking_down', text: 'I break complex problems into smaller parts to understand them.' },
                    { id: 'pattern_recognition', text: 'I enjoy identifying patterns in numbers or systems.' },
                    { id: 'practical_over_theory', text: 'I prefer practical application over theory.' },
                ],
            },
            {
                stem: 'Focus and Structure',
                items: [
                    { id: 'structured_writing', text: 'I enjoy writing structured arguments or explanations.' },
                    { id: 'deep_focus', text: 'I can focus deeply on one task for long periods.' },
                    { id: 'statistical_reasoning', text: 'I enjoy solving problems that require statistical reasoning.' },
                    { id: 'structured_logic', text: 'I prefer structured logical frameworks over open interpretation.' },
                ],
            },
            {
                stem: 'Mini Cognitive Test',
                items: [
                    { id: 'sequence_answer', text: 'What comes next? 2, 6, 12, 20, ? (1 = 28, 2 = 30, 3 = 32, 4 = 34)' },
                    { id: 'logic_answer', text: 'If all A are B and some B are C, can we conclude all A are C? (1 = No, 2 = Yes, 3 = Sometimes, 4 = Cannot be determined)' },
                    { id: 'train_answer', text: 'A train travels 60 km in 1 hour. How far in 3 hours? (1 = 180, 2 = 120, 3 = 150, 4 = 240)' },
                ],
            },
        ],
    },
    {
        title: 'Skill Exposure & Strength',
        questions: [
            {
                stem: 'Mathematics & Writing',
                items: [
                    { id: 'math_skill', text: "Rate your mathematics skill level. (1=Low, 5=High)" },
                    { id: 'math_interest', text: 'Rate your interest in mathematics.' },
                    { id: 'writing_skill', text: 'Rate your writing or communication skill.' },
                    { id: 'writing_interest', text: 'Rate your interest in writing or communication-heavy tasks.' },
                ],
            },
            {
                stem: 'Coding & Creativity',
                items: [
                    { id: 'coding_exp', text: 'What is your coding experience level? (1=None, 2=Basic, 3=Intermediate, 4=Advanced)' },
                    { id: 'coding_interest', text: 'Rate your interest in technical or coding tasks.' },
                    { id: 'creative_portfolio', text: 'Have you built a creative portfolio? (1=Yes, 2=No)' },
                    { id: 'creativity_confidence', text: 'Rate your creative confidence.' },
                ],
            },
            {
                stem: 'Analytical & Detail Traits',
                items: [
                    { id: 'attention_to_detail', text: 'I notice small errors that others miss.' },
                    { id: 'learn_quickly', text: 'I learn new concepts quickly.' },
                    { id: 'large_datasets', text: 'I am comfortable working with large numerical datasets.' },
                    { id: 'hidden_patterns', text: 'I enjoy identifying hidden patterns in complex systems.' },
                    { id: 'probability_risk', text: 'I enjoy probability and risk calculations.' },
                ],
            },
        ],
    },
    {
        title: 'Engineering & Technical Specialization',
        questions: [
            {
                stem: 'Systems and Structures',
                items: [
                    { id: 'machines_engines', text: 'I am interested in machines, engines, and mechanical systems.' },
                    { id: 'physical_components', text: 'I enjoy understanding how physical components move and interact.' },
                    { id: 'electrical_circuits', text: 'I am curious about electrical circuits and signal systems.' },
                    { id: 'sensors_measurement', text: 'I enjoy working with sensors and measurement systems.' },
                    { id: 'infrastructure', text: 'I am fascinated by buildings, bridges, and infrastructure systems.' },
                    { id: 'large_structures', text: 'I enjoy planning large-scale physical structures.' },
                ]
            },
            {
                stem: 'Processes and Technology',
                items: [
                    { id: 'chemical_reactions', text: 'I am interested in chemical reactions and industrial processes.' },
                    { id: 'raw_materials', text: 'I enjoy understanding how raw materials transform into finished products.' },
                    { id: 'automation_robotics', text: 'I am interested in automation and robotics systems.' },
                    { id: 'intelligent_systems', text: 'I enjoy building intelligent systems using algorithms.' },
                    { id: 'cybersecurity', text: 'I am curious about cybersecurity and system vulnerabilities.' },
                ]
            }
        ],
    },
    {
        title: 'Finance & Economics Specialization',
        questions: [
            {
                stem: 'Markets and Models',
                items: [
                    { id: 'financial_markets', text: 'I am interested in financial markets and economic trends.' },
                    { id: 'financial_records', text: 'I enjoy working with financial records and compliance rules.' },
                    { id: 'financial_modeling', text: 'I prefer long-term financial modeling over short-term decisions.' },
                    { id: 'financial_uncertainty', text: 'I am comfortable with financial uncertainty and volatility.' },
                ]
            }
        ],
    },
    {
        title: 'Creative Specialization',
        questions: [
            {
                stem: 'Design and Expression',
                items: [
                    { id: 'visual_layout', text: 'I enjoy visual layout, typography, and aesthetics.' },
                    { id: 'user_experiences', text: 'I am interested in improving user experiences and interface flows.' },
                    { id: 'storytelling', text: 'I enjoy storytelling through video or motion.' },
                    { id: 'functional_products', text: 'I enjoy designing functional products that solve real problems.' },
                    { id: 'writing_vs_visuals', text: 'I prefer expressing ideas through structured writing rather than visuals.' },
                ]
            }
        ],
    },
    {
        title: 'Business & Strategy Specialization',
        questions: [
            {
                stem: 'Strategy and Decisions',
                items: [
                    { id: 'strategic_problems', text: 'I enjoy solving strategic problems for organizations.' },
                    { id: 'coordinating_teams', text: 'I enjoy coordinating between technical and non-technical teams.' },
                    { id: 'business_decisions', text: 'I am comfortable making high-impact business decisions.' },
                    { id: 'consumer_behavior', text: 'I enjoy analyzing consumer behavior patterns.' },
                ]
            }
        ],
    },
    {
        title: 'Social & Human-Centered Specialization',
        questions: [
            {
                stem: 'People and Society',
                items: [
                    { id: 'explaining_concepts', text: 'I enjoy explaining complex concepts step-by-step.' },
                    { id: 'human_behavior', text: 'I am deeply interested in understanding human behavior.' },
                    { id: 'governance_systems', text: 'I am interested in governance and public systems.' },
                    { id: 'workplace_culture', text: 'I enjoy managing workplace culture and people dynamics.' },
                ]
            }
        ],
    },
    {
        title: 'Personality & Work Style',
        questions: [
            {
                stem: 'Traits and Environments',
                items: [
                    { id: 'risk_comfort', text: 'I am comfortable taking calculated risks.' },
                    { id: 'stability_preference', text: 'I prefer stable environments over uncertain ones.' },
                    { id: 'leadership', text: 'I enjoy leading teams.' },
                    { id: 'independence', text: 'I prefer working independently rather than in teams.' },
                    { id: 'stress_handling', text: 'I stay calm under pressure.' },
                    { id: 'structure_preference', text: 'I prefer structured routines over flexible work.' },
                    { id: 'adaptability', text: 'I adapt quickly to changing environments.' },
                    { id: 'uncertainty_handling', text: 'I handle uncertainty well.' },
                ]
            }
        ],
    },
    {
        title: 'Lifestyle & Long-Term Orientation',
        questions: [
            {
                stem: 'Goals and Values',
                items: [
                    { id: 'long_study_tolerance', text: 'I am willing to study for many years for the right career.' },
                    { id: 'income_vs_wlb', text: 'I prioritize high income over work-life balance.' },
                    { id: 'relocation_openness', text: 'I am open to relocating for career opportunities.' },
                    { id: 'social_impact_priority', text: 'I value social impact over financial success.' },
                    { id: 'entrepreneurial_openness', text: 'I am open to starting my own venture in the future.' },
                    { id: 'competitive_environments', text: 'I am comfortable with highly competitive environments.' },
                    { id: 'predictable_paths', text: 'I prefer predictable career paths over uncertain ones.' },
                    { id: 'intellectual_challenge', text: 'I value intellectual challenge over financial rewards.' },
                ]
            }
        ],
    },
];

const SCALE_SIZE = 5; // number of radio circles

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
        const size = 32;
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

    /* Since we now strictly use 1-5 scale in UI, map5to10 easily scales 1-5 to 1-10 */
    const map5to10 = (v: number | undefined): number => {
        if (!v) return 5;
        // 1=2, 2=4, 3=6, 4=8, 5=10
        return v * 2;
    };

    const getVal = (v: number | undefined): number => {
        if (!v) return 3;
        return v;
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        const riasec = {
            realistic: getVal(Math.max(answers.realistic_enjoy || 3, answers.realistic_do || 3)),
            investigative: getVal(Math.max(answers.investigative_enjoy || 3, answers.investigative_do || 3)),
            artistic: getVal(Math.max(answers.artistic_enjoy || 3, answers.artistic_do || 3)),
            social: getVal(Math.max(answers.social_enjoy || 3, answers.social_do || 3)),
            enterprising: getVal(Math.max(answers.enterprising_enjoy || 3, answers.enterprising_do || 3)),
            conventional: getVal(Math.max(answers.conventional_enjoy || 3, answers.conventional_do || 3)),
        };

        const cogA = {
            abstract_solving: getVal(answers.abstract_solving),
            breaking_down: getVal(answers.breaking_down),
            pattern_recognition: getVal(answers.pattern_recognition),
            practical_over_theory: getVal(answers.practical_over_theory),
            structured_writing: getVal(answers.structured_writing),
            deep_focus: getVal(answers.deep_focus),
            statistical_reasoning: getVal(answers.statistical_reasoning),
            structured_logic: getVal(answers.structured_logic),
        };

        const cogB = {
            sequence: answers.sequence_answer === 1 ? 30 : 0,
            logic: answers.logic_answer === 1 ? "yes" : "no",
            speed: answers.train_answer === 1 ? 180 : 0
        };

        const skills = {
            math_skill: map5to10(answers.math_skill),
            math_interest: map5to10(answers.math_interest),
            writing_skill: map5to10(answers.writing_skill),
            writing_interest: map5to10(answers.writing_interest),
            coding: answers.coding_exp === 1 ? 'None' : answers.coding_exp === 2 ? 'Basic' : answers.coding_exp === 3 ? 'Intermediate' : answers.coding_exp === 4 ? 'Advanced' : 'Advanced',
            coding_interest: map5to10(answers.coding_interest),
            creativity_portfolio: answers.creative_portfolio === 1,
            creativity_confidence: map5to10(answers.creativity_confidence),
            attention_to_detail: getVal(answers.attention_to_detail),
            learn_quickly: getVal(answers.learn_quickly),
            large_datasets: getVal(answers.large_datasets),
            hidden_patterns: getVal(answers.hidden_patterns),
            probability_risk: getVal(answers.probability_risk),
        };

        const engineering = {
            machines_engines: getVal(answers.machines_engines),
            physical_components: getVal(answers.physical_components),
            electrical_circuits: getVal(answers.electrical_circuits),
            sensors_measurement: getVal(answers.sensors_measurement),
            infrastructure: getVal(answers.infrastructure),
            large_structures: getVal(answers.large_structures),
            chemical_reactions: getVal(answers.chemical_reactions),
            raw_materials: getVal(answers.raw_materials),
            automation_robotics: getVal(answers.automation_robotics),
            intelligent_systems: getVal(answers.intelligent_systems),
            cybersecurity: getVal(answers.cybersecurity),
        };

        const finance = {
            financial_markets: getVal(answers.financial_markets),
            financial_records: getVal(answers.financial_records),
            financial_modeling: getVal(answers.financial_modeling),
            financial_uncertainty: getVal(answers.financial_uncertainty),
        };

        const creative = {
            visual_layout: getVal(answers.visual_layout),
            user_experiences: getVal(answers.user_experiences),
            storytelling: getVal(answers.storytelling),
            functional_products: getVal(answers.functional_products),
            writing_vs_visuals: getVal(answers.writing_vs_visuals),
        };

        const business = {
            strategic_problems: getVal(answers.strategic_problems),
            coordinating_teams: getVal(answers.coordinating_teams),
            business_decisions: getVal(answers.business_decisions),
            consumer_behavior: getVal(answers.consumer_behavior),
        };

        const socialHuman = {
            explaining_concepts: getVal(answers.explaining_concepts),
            human_behavior: getVal(answers.human_behavior),
            governance_systems: getVal(answers.governance_systems),
            workplace_culture: getVal(answers.workplace_culture),
        };

        const personality = {
            risk_comfort: getVal(answers.risk_comfort),
            stability_preference: getVal(answers.stability_preference),
            leadership: getVal(answers.leadership),
            independence: getVal(answers.independence),
            stress_handling: getVal(answers.stress_handling),
            structure_preference: getVal(answers.structure_preference),
            adaptability: getVal(answers.adaptability),
            uncertainty_handling: getVal(answers.uncertainty_handling),
        };

        const lifestyle = {
            long_study_tolerance: getVal(answers.long_study_tolerance),
            income_vs_wlb: getVal(answers.income_vs_wlb),
            relocation_openness: getVal(answers.relocation_openness),
            social_impact_priority: getVal(answers.social_impact_priority),
            entrepreneurial_openness: getVal(answers.entrepreneurial_openness),
            competitive_environments: getVal(answers.competitive_environments),
            predictable_paths: getVal(answers.predictable_paths),
            intellectual_challenge: getVal(answers.intellectual_challenge),
        };

        updateSection('riasec', riasec);
        updateSection('cognitiveA', cogA);
        updateSection('cognitiveB', cogB);
        updateSection('skills', skills);
        updateSection('engineering', engineering);
        updateSection('finance', finance);
        updateSection('creative', creative);
        updateSection('business', business);
        updateSection('socialHuman', socialHuman);
        updateSection('personality', personality);
        updateSection('lifestyle', lifestyle);

        try {
            const payload = {
                personal_info: state.personalInfo,
                riasec,
                cognitive_a: cogA,
                cognitive_b: cogB,
                skills,
                engineering,
                finance,
                creative,
                business,
                social_human: socialHuman,
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
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.15 }
                            },
                            exit: { opacity: 0, y: -18, transition: { duration: 0.2 } }
                        }}
                    >
                        {step.questions.map((q, qi) => (
                            <motion.div
                                key={qi}
                                style={styles.card}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                                }}
                            >
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
                            </motion.div>
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
