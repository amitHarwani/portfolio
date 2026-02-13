import { motion } from 'framer-motion';
import data from '../../data/portfolioData.json';
import './Timeline.css';

const cardVariants = {
    hidden: { opacity: 0, x: -60, rotateY: -10 },
    visible: (i) => ({
        opacity: 1,
        x: 0,
        rotateY: 0,
        transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
    }),
};

export default function Education() {
    return (
        <section className="timeline-section" id="education">
            <h2 className="section-title">Education</h2>
            <div className="timeline">
                {data.education.map((item, i) => (
                    <motion.div
                        className="timeline-item"
                        key={item.id}
                        custom={i}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                    >
                        <div className="timeline-dot" />
                        <div className="timeline-card">
                            <span className="timeline-year">{item.year}</span>
                            <h3 className="timeline-degree">{item.degree}</h3>
                            <p className="timeline-institution">{item.institution}</p>
                            <span className="timeline-gpa">
                                GPA: <strong>{item.gpa}</strong> / 4.0
                            </span>
                            {item.highlights && item.highlights.length > 0 && (
                                <ul className="timeline-highlights">
                                    {item.highlights.map((h, idx) => (
                                        <li key={idx}>{h}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
