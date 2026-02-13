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

export default function Experience() {
    return (
        <section className="timeline-section" id="experience">
            <h2 className="section-title">Professional Experience</h2>
            <div className="timeline">
                {data.experience.map((item, i) => (
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
                            <span className="timeline-year">
                                {item.startDate} — {item.endDate}
                            </span>
                            <h3 className="timeline-role">{item.role}</h3>
                            <p className="timeline-company">{item.company}</p>
                            <ul className="timeline-responsibilities">
                                {item.responsibilities.map((r, idx) => (
                                    <li key={idx}>{r}</li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
