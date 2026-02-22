import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Github, Mail, Globe } from 'lucide-react';
import './TeamMemberModal.css';

// ── Animation Variants ──
const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.35, ease: 'easeOut' } },
    exit: { opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } },
};

const modalVariants = {
    hidden: { opacity: 0, scale: 0.94, y: 30 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
        opacity: 0,
        scale: 0.96,
        y: 16,
        transition: { duration: 0.25, ease: 'easeIn' },
    },
};

// ── Helper: build social links from member data ──
const buildSocials = (member) => {
    const socials = [];
    if (member.linkedin) {
        socials.push({ label: 'LinkedIn', href: member.linkedin, Icon: Linkedin });
    }
    if (member.github) {
        socials.push({ label: 'GitHub', href: member.github, Icon: Github });
    }
    if (member.email) {
        socials.push({ label: 'Email', href: `mailto:${member.email}`, Icon: Mail });
    }
    if (member.portfolio) {
        socials.push({ label: 'Portfolio', href: member.portfolio, Icon: Globe });
    }
    return socials;
};

// ── Modal Component ──
export default function TeamMemberModal({ member, isOpen, onClose }) {
    // Lock body scroll + bind ESC key
    useEffect(() => {
        if (!isOpen) return;

        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const onKey = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', onKey);

        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener('keydown', onKey);
        };
    }, [isOpen, onClose]);

    const socials = member ? buildSocials(member) : [];

    // Dummy data for prototype verification as requested
    const displayDescription = member?.description || "Providing exceptional leadership and technical expertise to drive the society's mission forward. Committed to fostering innovation and excellence within the IEEE-CIS community.";
    const displaySkills = (member?.skills && member.skills.length > 0)
        ? member.skills
        : ["Project Management", "Technical Leadership", "Community Building", "Strategic Planning"];

    const hasSkills = displaySkills.length > 0;
    const hasDescription = !!displayDescription;
    const hasBottomSection = hasSkills || socials.length > 0;

    return ReactDOM.createPortal(
        <AnimatePresence>
            {isOpen && member && (
                <motion.div
                    className="tmm-overlay"
                    variants={overlayVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={onClose}
                    key="tmm-overlay"
                >
                    <motion.div
                        className="tmm-container"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={(e) => e.stopPropagation()}
                        key="tmm-container"
                    >
                        {/* Close Button */}
                        <button className="tmm-close" onClick={onClose} aria-label="Close modal">
                            ✕
                        </button>

                        {/* Inner layout wrapper */}
                        <div className="tmm-inner">
                            {/* Image Section */}
                            <div className="tmm-image-wrapper">
                                {member.image ? (
                                    <img src={member.image} alt={member.name} />
                                ) : (
                                    <div className="tmm-image-placeholder">
                                        <span>{member.name?.slice(0, 2) || 'TM'}</span>
                                    </div>
                                )}
                            </div>

                            {/* Accent line */}
                            <div className="tmm-accent-line" />

                            {/* Name & Designation */}
                            <div className="tmm-content">
                                <h2 className="tmm-name">{member.name}</h2>
                                <p className="tmm-designation">{member.position}</p>
                            </div>

                            {/* Description */}
                            {hasDescription && (
                                <div className="tmm-description-section">
                                    <p className="tmm-description">{displayDescription}</p>
                                </div>
                            )}

                            {/* Bottom Section — Socials & Skills */}
                            {hasBottomSection && (
                                <div className="tmm-bottom">
                                    {/* Socials Column (Left) */}
                                    {socials.length > 0 && (
                                        <div className="tmm-col">
                                            <span className="tmm-col-title">Socials</span>
                                            <ul className="tmm-socials-list">
                                                {socials.map(({ label, href, Icon }, i) => (
                                                    <li key={i}>
                                                        <a
                                                            href={href}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="tmm-social-link"
                                                        >
                                                            <Icon />
                                                            <span className="tmm-social-label">{label}</span>
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Skills Column (Right) */}
                                    {hasSkills && (
                                        <div className="tmm-col">
                                            <span className="tmm-col-title">Skills</span>
                                            <ul className="tmm-skills-list">
                                                {displaySkills.map((skill, i) => (
                                                    <li key={i}>{skill}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
