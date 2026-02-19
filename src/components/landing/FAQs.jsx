import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQ_DATA = [
    {
        question: "What is IEEE CIS?",
        answer: "IEEE CIS (Computational Intelligence Society) focuses on exciting fields like AI, Machine Learning, and intelligent systems. Our college chapter helps students learn these through events, workshops, and projects."
    },
    {
        question: "Who can join IEEE CIS?",
        answer: "Any student from our college can join, no matter their branch or year. If you're curious about AI or technology, you're welcome here."
    },
    {
        question: "Do I need prior knowledge to join?",
        answer: "Not at all! Beginners are always welcome. We start from the basics and slowly move to advanced concepts."
    },
    {
        question: "Is IEEE membership required?",
        answer: "Yes, you need to be an IEEE student member to officially join IEEE CIS. After joining IEEE, you can add CIS as a society."
    },
    {
        question: "What activities does IEEE CIS conduct?",
        answer: "We conduct workshops, guest lectures, hackathons, hands-on sessions, and tech talks to help students learn and grow practically."
    },
    {
        question: "How will IEEE CIS help me?",
        answer: "IEEE CIS helps you build skills, improve your resume, gain exposure to AI, and connect with like-minded students and professionals."
    },
    {
        question: "How can I stay updated about events?",
        answer: "You can stay updated through our website, social media pages, WhatsApp/Telegram groups, and chapter meetings."
    }
];

const FAQs = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="relative bg-white py-20 px-6 md:px-12">
            <div className="bg-decorations" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
                <motion.div
                    style={{
                        position: 'absolute',
                        top: '-140px',
                        left: '-140px',
                        width: '280px',
                        height: '280px',
                        borderRadius: '50%',
                        border: '2px solid rgba(11, 28, 45, 0.25)',
                        backgroundColor: 'transparent'
                    }}
                    animate={{
                        y: [0, -20, 0],
                        rotate: 360
                    }}
                    transition={{
                        y: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
                        rotate: { duration: 50, repeat: Infinity, ease: 'linear' }
                    }}
                />
                <motion.div
                    style={{
                        position: 'absolute',
                        top: '-45px',
                        right: '-45px',
                        width: '90px',
                        height: '90px',
                        borderRadius: '50%',
                        border: '2px solid rgba(34, 211, 238, 0.35)',
                        backgroundColor: 'transparent'
                    }}
                    animate={{
                        y: [0, -20, 0],
                        rotate: -360
                    }}
                    transition={{
                        y: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
                        rotate: { duration: 40, repeat: Infinity, ease: 'linear' }
                    }}
                />
                <motion.div
                    style={{
                        position: 'absolute',
                        left: '40px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '160px',
                        height: '160px',
                        borderRadius: '50%',
                        border: '2px solid rgba(34, 211, 238, 0.3)',
                        backgroundColor: 'transparent'
                    }}
                    animate={{
                        y: [0, -20, 0],
                        rotate: 360
                    }}
                    transition={{
                        y: { duration: 12, repeat: Infinity, ease: 'easeInOut' },
                        rotate: { duration: 60, repeat: Infinity, ease: 'linear' }
                    }}
                />
                <motion.div
                    style={{
                        position: 'absolute',
                        right: '-100px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '360px',
                        height: '360px',
                        borderRadius: '50%',
                        border: '2px solid rgba(11, 28, 45, 0.2)',
                        backgroundColor: 'transparent'
                    }}
                    animate={{
                        y: [0, -20, 0],
                        rotate: -360
                    }}
                    transition={{
                        y: { duration: 11, repeat: Infinity, ease: 'easeInOut' },
                        rotate: { duration: 55, repeat: Infinity, ease: 'linear' }
                    }}
                />
                <motion.div
                    style={{
                        position: 'absolute',
                        bottom: '80px',
                        left: '60px',
                        width: '70px',
                        height: '70px',
                        border: '2px solid rgba(34, 211, 238, 0.4)',
                        backgroundColor: 'transparent',
                        transform: 'rotate(12deg)'
                    }}
                    animate={{
                        y: [0, -20, 0]
                    }}
                    transition={{
                        y: { duration: 9, repeat: Infinity, ease: 'easeInOut' }
                    }}
                />
            </div>
            <div className="relative z-content max-w-4xl mx-auto">
                {/* Section Heading */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-cyan-400 uppercase leading-tight tracking-tighter text-center md:text-centre mb-12 md:mb-16">
                    Got Questions ? We've Got Answers
                </h2>

                {/* Accordion Items */}
                <div className="space-y-4">
                    {FAQ_DATA.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onToggle={() => toggleAccordion(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

const AccordionItem = ({ question, answer, isOpen, onToggle }) => {
    return (
        <div
            className={`relative rounded-2xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer ${isOpen ? 'bg-cyan-50 border-2 border-cyan-400' : 'bg-white border-2 border-neutral-200 hover:border-cyan-300'
                }`}
            onClick={onToggle}
        >
            {/* Left Accent Bar */}
            <div
                className={`absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-300 ${isOpen ? 'bg-cyan-400' : 'bg-transparent'
                    }`}
            />

            {/* Question Header */}
            <div className="flex items-center justify-between p-5 md:p-6 pl-6 md:pl-8">
                <h3 className={`text-base md:text-lg lg:text-xl font-bold pr-4 transition-colors duration-300 ${isOpen ? 'text-cyan-600' : 'text-neutral-800'
                    }`}>
                    {question}
                </h3>

                {/* Icon */}
                <motion.div
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex-shrink-0"
                >
                    {isOpen ? (
                        <Minus size={24} className="text-cyan-400" strokeWidth={3} />
                    ) : (
                        <Plus size={24} className="text-neutral-400" strokeWidth={3} />
                    )}
                </motion.div>
            </div>

            {/* Answer Content */}
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 md:px-8 pb-5 md:pb-6">
                            <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
                                {answer}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FAQs;
