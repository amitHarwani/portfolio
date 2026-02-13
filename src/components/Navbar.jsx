import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import './Navbar.css';

const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'Education', href: '#education' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Achievements', href: '#achievements' },
];

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = () => setMenuOpen(false);

    return (
        <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
            <div className="nav-container">
                <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    {'<AH />'}
                </div>

                <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                    {menuOpen ? <FiX /> : <FiMenu />}
                </button>

                <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
                    {navItems.map(item => (
                        <li key={item.href}>
                            <a href={item.href} onClick={handleNavClick}>{item.label}</a>
                        </li>
                    ))}
                    <li>
                        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                            {theme === 'dark' ? <FiSun /> : <FiMoon />}
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
