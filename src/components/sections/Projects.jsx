import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiX, FiExternalLink } from 'react-icons/fi';
import data from '../../data/portfolioData.json';
import './Projects.css';

/* ---- Project Modal ---- */
function ProjectModal({ project, onClose }) {
    if (!project) return null;

    return (
        <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="modal-content"
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 40 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
            >
                <button className="modal-close" onClick={onClose} aria-label="Close modal">
                    <FiX />
                </button>

                <img src={project.image} alt={project.title} className="modal-image" />

                <div className="modal-body">
                    <h3 className="modal-title">{project.title}</h3>
                    <p className="modal-description">{project.detailedDescription}</p>

                    <div className="modal-tech">
                        {project.technologies.map((tech, i) => (
                            <span key={i}>{tech}</span>
                        ))}
                    </div>

                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modal-github"
                    >
                        <FiGithub /> View on GitHub <FiExternalLink size={14} />
                    </a>

                    {project.additionalImages && project.additionalImages.length > 0 && (
                        <>
                            <h4 style={{ color: 'var(--text-primary)', marginBottom: '12px', marginTop: '8px' }}>
                                Gallery
                            </h4>
                            <div className="modal-gallery">
                                {project.additionalImages.map((img, i) => (
                                    <img key={i} src={img} alt={`${project.title} screenshot ${i + 1}`} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

/* ---- Projects Section ---- */
const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
    }),
};

export default function Projects() {
    const [selected, setSelected] = useState(null);

    return (
        <section className="projects-section" id="projects">
            <h2 className="section-title">Projects</h2>

            <div className="projects-grid">
                {data.projects.map((project, i) => (
                    <motion.div
                        key={project.id}
                        className="project-card"
                        custom={i}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-30px' }}
                        onClick={() => setSelected(project)}
                    >
                        <div className="project-image-wrapper">
                            <img src={project.image} alt={project.title} loading="lazy" />
                            <div className="project-image-overlay">
                                <span className="project-view-btn">View Details</span>
                            </div>
                        </div>
                        <div className="project-info">
                            <h3 className="project-title">{project.title}</h3>
                            <p className="project-desc">{project.shortDescription}</p>
                            <div className="project-tech">
                                {project.technologies.map((tech, idx) => (
                                    <span key={idx}>{tech}</span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selected && (
                    <ProjectModal project={selected} onClose={() => setSelected(null)} />
                )}
            </AnimatePresence>
        </section>
    );
}
