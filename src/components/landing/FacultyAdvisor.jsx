import React from 'react';
import { motion } from 'framer-motion'
import { Linkedin, Mail, GraduationCap, Scroll } from 'lucide-react';
const FacultyAdvisor = () => {
    return (
        <section className="relative py-20 px-6 md:px-12">
            <div className="bg-decorations" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
                <div className=' w-[160px] h-[160px] sm:w-[220px] sm:h-[220px]'
                    style={{
                        position: 'absolute',
                        top: '-77px',
                        left: '77px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(14, 204, 242, 0.65)'
                    }} />
                <motion.div style={{
                    position: 'absolute',
                    right: '40px',
                    top: '20%',
                    transform: 'translateY(-50%)',
                    width: '180px',
                    height: '180px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(34, 211, 238, 0.2)'
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
                <motion.div style={{
                    position: 'absolute',
                    bottom: '120px',
                    left: '80px',
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    border: '2px solid rgba(10, 42, 168, 0.35)',
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
                <motion.div style={{
                    position: 'absolute',
                    bottom: '60px',
                    right: '100px',
                    width: '90px',
                    height: '90px',
                    border: '2px solid rgba(14, 204, 242, 0.65)',
                    backgroundColor: 'transparent',
                    transform: 'rotate(15deg)'
                }}
                    animate={{ rotate: -360 }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                />
            </div>
            <div className="relative z-content max-w-7xl mx-auto">
                {/* Section Heading */}
                <div className="mb-12 md:mb-16 text-center">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-cyan-400 uppercase leading-tight tracking-tighter">
                        OUR FACULTY ADVISOR
                    </h2>
                </div>

                {/* Advisor Card */}
                <div className="max-w-5xl mx-auto border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm">
                    <div className="flex flex-col md:flex-row items-stretch md:gap-x-4">

                        {/* Left: Image Section (Landscape) */}
                        <div className="w-full md:w-[45%] lg:w-[42%] 
                             bg-neutral-900/20 
                             flex items-center justify-center">

                            <div className="relative w-full h-[260px] md:h-auto md:self-stretch md:min-h-[260px] overflow-hidden">
                                <img
                                    src="/HSImages/Madam.png"
                                    alt="Ms. Sayyeda Hajera Begum"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-105"
                                />
                            </div>

                        </div>

                        {/* Right: Content Section */}
                        <div className="w-full md:w-[55%] lg:w-[58%] p-4 md:p-5 lg:p-6 flex flex-col justify-center">
                            <div>
                                <h3 className="text-xl md:text-2xl lg:text-3xl font-black mb-1 tracking-tight">
                                    Ms. Sayyeda Hajera Begum
                                </h3>
                                <i className="text-neutral-400 font-italic text-sm md:text-base mb-3 tracking-widest">
                                    (Assistant Professor, Department of Information Technology)
                                </i>

                                <div className="w-16 h-1 bg-neutral-700 mb-3"></div>

                                <p className="text-neutral-900 text-xs md:text-sm leading-snug font-medium mb-4">
                                    Ms. Hajera has been serving as an Assistant Professor at Muffakham Jah College of Engineering and Technology since 2007, bringing over 18 years of academic experience and more than 10 years of research expertise. Her research interests span Artificial Intelligence and Machine Learning (AIML), Deep Learning, Medical Data Research, Computer Vision, and Big Data Analytics, with a focus on applying advanced AI techniques to real-world problems — particularly in medical and healthcare domains.
                                    <br /> <br />
                                    She holds a Master's degree in Software Engineering from JNTU, Hyderabad, and a Ph.D. from KL University, Vijayawada. She serves as the Faculty Advisor for IEEE CIS, organizing technical workshops, expert talks, and research-oriented initiatives for students. She is also the Faculty Facilitator for WE Hub under the Government of Telangana's WE-Enable Program, empowering women entrepreneurs. She has published over 20 research papers in reputed national and international journals and conferences.
                                </p>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-4">
                                    <a
                                        href="https://www.linkedin.com/in/sayyada-hajera-b7834b159/overlay/contact-info/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-1 border border-neutral-700 rounded-xl text-neutral-300 font-bold hover:bg-white hover:text-black hover:border-cyan-400 transition-all duration-300 group"
                                    >
                                        <Linkedin size={20} className="text-neutral-500 group-hover:text-black transition-colors" />
                                        LinkedIn
                                    </a>
                                    <a
                                        href="mailto:hajera@mjcollege.ac.in"
                                        className="flex items-center gap-2 px-4 py-1 border border-neutral-700 rounded-xl text-neutral-300 font-bold hover:bg-cyan-400 hover:text-black hover:border-cyan-400 transition-all duration-300 group"
                                    >
                                        <Mail size={20} className="text-neutral-500 group-hover:text-black transition-colors" />
                                        Email
                                    </a>
                                    <a
                                        href="https://scholar.google.com/citations?user=Rdaz5ssAAAAJ&hl=en&authuser=1"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-1 border border-neutral-700 rounded-xl text-neutral-300 font-bold hover:bg-white hover:text-black hover:border-cyan-400 transition-all duration-300 group"
                                    >
                                        <GraduationCap size={20} className="text-neutral-500 group-hover:text-black transition-colors" />
                                        Google Scholar
                                    </a>
                                    <a
                                        href="https://www.scopus.com/authid/detail.uri?authorId=57226058502"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-1 border border-neutral-700 rounded-xl text-neutral-300 font-bold hover:bg-white hover:text-black hover:border-cyan-400 transition-all duration-300 group"
                                    >
                                        <Scroll size={20} className="text-neutral-500 group-hover:text-black transition-colors" />
                                        Scopus
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default FacultyAdvisor;
