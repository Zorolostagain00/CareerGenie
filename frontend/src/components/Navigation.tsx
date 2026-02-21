import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PillNav from './PillNav';

// Lucide Sparkles SVG converted to a data URI
const sparklesLogo = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23818cf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg>`;

const Navigation = () => {
    const location = useLocation();
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const controlNavbar = () => {
            if (typeof window !== 'undefined') {
                if (window.scrollY > lastScrollY && window.scrollY > 50) {
                    setIsVisible(false);
                } else {
                    setIsVisible(true);
                }
                lastScrollY = window.scrollY;
            }
        };

        window.addEventListener('scroll', controlNavbar, { passive: true });

        return () => {
            window.removeEventListener('scroll', controlNavbar);
        };
    }, []);

    return (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex justify-center w-full transition-all duration-300 ease-in-out ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0'}`}>
            <PillNav
                logo={sparklesLogo}
                logoAlt="Career Genie Logo"
                siteName="Career Genie"
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Assessment', href: '/personal-info' }
                ]}
                activeHref={location.pathname}
                baseColor="#818cf8"
                pillColor="#ffffff"
                hoveredPillTextColor="#ffffff"
                pillTextColor="#475569"
            />
        </div>
    );
};

export default Navigation;
