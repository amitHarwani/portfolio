import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import data from '../data/portfolioData.json';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-links">
                    <a href={data.personal.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <FiGithub />
                    </a>
                    <a href={data.personal.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <FiLinkedin />
                    </a>
                    <a href={`mailto:${data.personal.email}`} aria-label="Email">
                        <FiMail />
                    </a>
                </div>
                <p className="footer-text">
                    © {new Date().getFullYear()} <span>{data.personal.name}</span>. Crafted with passion.
                </p>
            </div>
        </footer>
    );
}
