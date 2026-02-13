import { motion } from 'framer-motion';
import { FiAward, FiCode, FiStar, FiExternalLink } from 'react-icons/fi';
import { HiOutlineTrophy } from 'react-icons/hi2';
import data from '../../data/portfolioData.json';
import './Achievements.css';

const iconMap = {
    trophy: HiOutlineTrophy,
    code: FiCode,
    star: FiStar,
    award: FiAward,
};

const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
    }),
};

export default function Achievements() {
    return (
        <section className="achievements-section" id="achievements">
            <h2 className="section-title">Achievements & Certifications</h2>

            {/* Achievements */}
            <div className="achievements-subsection">
                <h3 className="achievements-subtitle">Achievements</h3>
                <div className="achievements-grid">
                    {data.achievements.map((item, i) => {
                        const Icon = iconMap[item.icon] || FiAward;
                        return (
                            <motion.div
                                key={item.id}
                                className="achievement-card"
                                custom={i}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: '-30px' }}
                            >
                                <div className="achievement-icon">
                                    <Icon />
                                </div>
                                <h4 className="achievement-title">{item.title}</h4>
                                <p className="achievement-description">{item.description}</p>
                                <span className="achievement-year">{item.year}</span>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Certifications */}
            <div className="achievements-subsection">
                <h3 className="achievements-subtitle">Certifications</h3>
                <div className="achievements-grid">
                    {data.certifications.map((cert, i) => (
                        <motion.div
                            key={cert.id}
                            className="achievement-card"
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-30px' }}
                        >
                            <div className="achievement-icon">
                                <FiAward />
                            </div>
                            <h4 className="achievement-title">{cert.title}</h4>
                            <p className="cert-issuer">{cert.issuer}</p>
                            <span className="achievement-year">{cert.date}</span>
                            {cert.credentialUrl && (
                                <a
                                    href={cert.credentialUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="cert-link"
                                >
                                    View Credential <FiExternalLink size={13} />
                                </a>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
