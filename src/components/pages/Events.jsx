import React, { useState } from "react";
import { motion } from "framer-motion";
import AnimatedBackground from "../AnimatedBackground";

import aimazing from "../../assets/posters/aimazing.png";
import plantation from "../../assets/posters/plantation.png";
import codewithcis from "../../assets/posters/codewithcis.png";
import blanket from "../../assets/posters/blanket.png";
import donation from "../../assets/posters/donation.png";
import mysterymania from "../../assets/posters/mysterymania.png";
import oceanexp from "../../assets/posters/oceanexp.png";
import envisage from "../../assets/posters/envisage.png";
import cyberunmasked from "../../assets/posters/cyberunmasked.png";
import videoalchemy from "../../assets/posters/videoalchemy.png";
import comingsoon from "../../assets/posters/comingsoon.png";

const upcomingEvents = [
    {
        title: "COMING SOON",
        image: comingsoon,
        description: "The next one’s a secret (for now).",
    },
];

export const pastEvents = [
    { title: "VIDEO ALCHEMY", image: videoalchemy, description: "AI video creation workshop" },
    { title: "CYBER UNMASKED", image: cyberunmasked, description: "AI video creation workshop" },
    { title: "ENVISAGE", image: envisage, description: "Project competition and exhibition" },
    { title: "OCEAN EXPEDITION", image: oceanexp, description: "Industrial visit to INCOIS" },
    { title: "MYSTERY MANIA", image: mysterymania, description: "Fun and exciting IEEE CIS event" },
    { title: "DONATION DRIVE", image: donation, description: "Social service donation initiative." },
    { title: "CODE WITH CIS", image: codewithcis, description: "Coding event conducted by IEEE CIS." },
    { title: "PLANTATION DRIVE", image: plantation, description: "Tree plantation initiative for environment." },
    { title: "AI AMAZING", image: aimazing, description: "AI Amazing event organized by IEEE CIS." },
];

const PastEventCard = ({ event, onRecapClick }) => {
    return (
        <div
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="group relative hover:translate-y-[-10px] transition-all duration-500 hover:shadow-black bg-gradient-to-br from-blue-50 to-white rounded-[2rem] p-4 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] border border-cyan-400/10 flex flex-col h-full"
        >
            {/* Poster Wrapper */}
            <div className="relative aspect-[3/4] rounded-[1.5rem] bg-white overflow-hidden flex items-center justify-center p-6 transition-colors duration-500">
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-contain group:hover-scale:1.05 transition-all duration-500 rounded-xl shadow-[0_12px_40px_-8px_rgba(0,0,0,0.15)] z-10"
                />

                <div className="absolute top-4 right-4 z-20">
                    <div className="px-3 py-1.5 rounded-full bg-white/40 backdrop-blur-xl guration-500 transition-colors border  border-white/40 group-hover:border-red-500 shadow-sm flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-400 group-hover:bg-red-500"></div>
                        <span className="text-[10px] font-bold tracking-widest text-neutral-600 group-hover:text-red-500 uppercase font-inter">
                            Concluded
                        </span>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="px-4 pt-6 pb-2 flex flex-col flex-grow bg-white rounded-[1.5rem] mt-3">
                <h3 className="text-xl font-black text-neutral-900 font-russo uppercase tracking-tight mb-2 leading-tight">
                    {event.title}
                </h3>

                <p className="text-sm text-neutral-500 font-inter leading-relaxed mb-6 flex-grow line-clamp-2">
                    {event.description}
                </p>

                <motion.button
                    onClick={() => onRecapClick(event)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative w-full py-3.5 rounded-xl border border-neutral-200 bg-transparent text-neutral-900 font-black text-[11px] uppercase tracking-widest font-inter overflow-hidden transition-colors duration-300 group/btn hover:bg-black hover:text-white mb-2"
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        View Recap
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover/btn:translate-x-1">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                </motion.button>
            </div>
        </div>
    );
};

export default function Events() {
    const [selectedEvent, setSelectedEvent] = useState(null);

    return (
        <div className="relative bg-white min-h-screen overflow-hidden">

            {/* Stain-like Background Shapes */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                {/* Top-right blobs */}
                <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-400 opacity-20 blur-3xl rounded-[50%_30%_60%_40%] rotate-12"></div>
                <div className="absolute top-16 right-24 w-56 h-56 bg-cyan-400 opacity-15 blur-3xl rounded-[60%_40%_50%_70%] rotate-45"></div>

                {/* Bottom-left blobs */}
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-400 opacity-20 blur-3xl rounded-[70%_30%_60%_50%] rotate-6"></div>
                <div className="absolute bottom-20 left-16 w-48 h-48 bg-cyan-400 opacity-15 blur-3xl rounded-[60%_50%_30%_70%] rotate-30"></div>

                {/* Center blobs */}
                <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-cyan-400 opacity-15 blur-3xl rounded-[50%_60%_40%_50%] rotate-12"></div>
                <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-cyan-400 opacity-10 blur-3xl rounded-[60%_50%_50%_60%] rotate-25"></div>

                {/* Extra small blobs for depth */}
                <div className="absolute top-1/4 left-3/4 w-24 h-24 bg-cyan-400 opacity-15 blur-3xl rounded-[50%_70%_40%_60%] rotate-10"></div>
                <div className="absolute bottom-1/3 right-1/2 w-20 h-20 bg-cyan-400 opacity-10 blur-3xl rounded-[60%_50%_70%_40%] rotate-20"></div>
            </div>

            <AnimatedBackground />


            <div className="relative z-10 px-10 py-12">

                {/* Header */}
                <section className="text-center py-16">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-cyan-400 text-xs md:text-sm font-bold tracking-[0.4em] uppercase mb-4"
                    >
                        IEEE Computational Intelligence Society – MJCET
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase leading-relaxed tracking-normal text-black mb-6 font-russo"
                    >
                        <span className="block text-black">OUR</span>
                        <span className="block text-cyan-400 tracking-normal">EVENTS</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mt-6 text-gray-500 max-w-2xl mx-auto text-lg"
                    >
                        Explore our upcoming and past events.
                    </motion.p>
                </section>


                {/* UPCOMING EVENTS */}
                <section className="mb-32 px-6 md:px-10">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-20">
                            <motion.p
                                initial={{ opacity: 0, tracking: '0.1em' }}
                                whileInView={{ opacity: 1, tracking: '0.3em' }}
                                viewport={{ once: true }}
                                className="text-cyan-400 text-sm font-bold uppercase mb-4 font-inter"
                            >
                                Discover
                            </motion.p>
                            <h2 className="text-5xl md:text-7xl font-black text-black font-russo uppercase tracking-tighter">
                                UPCOMING EVENTS
                            </h2>
                            <div className="mt-6 w-24 h-1 bg-cyan-400 mx-auto rounded-full"></div>
                        </div>

                        <div className="space-y-16">
                            {upcomingEvents.map((event, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 60 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className="relative group rounded-[2.5rem] border border-neutral-200/50 bg-neutral-900 overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)]"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-neutral-800/50 to-transparent pointer-events-none"></div>
                                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none transition-all duration-1000 group-hover:bg-cyan-500/10"></div>

                                    <div className="grid md:grid-cols-[0.8fr,1.2fr] items-stretch min-h-[500px]">
                                        <div className="relative bg-black flex items-center justify-center overflow-hidden">
                                            <div className="w-full aspect-[1/1.414]">
                                                <img
                                                    src={event.image}
                                                    alt={event.title}
                                                    className="w-full h-full object-cover p-6 md:p-10 transition-transform duration-1000 group-hover:scale-105"
                                                />
                                            </div>
                                        </div>

                                        {/* Right Column: Content */}
                                        <div className="p-10 md:p-16 lg:p-20 flex flex-col justify-center relative z-10 border-l border-white/5">
                                            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 font-russo uppercase leading-none tracking-tight">
                                                {event.title}
                                            </h3>

                                            <div className="w-16 h-1 bg-cyan-500 mb-10 rounded-full group-hover:w-32 transition-all duration-500"></div>

                                            <p className="text-neutral-400 text-lg md:text-xl lg:text-2xl leading-relaxed mb-12 font-inter font-light">
                                                {event.description}
                                            </p>

                                            <div>
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="group/btn relative px-10 py-5 bg-white text-black text-sm uppercase font-black rounded-2xl font-inter transition-all duration-300 hover:bg-cyan-400 hover:text-white flex items-center gap-3"
                                                >
                                                    Learn More
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover/btn:translate-x-1">
                                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </motion.button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* PAST EVENTS */}
                <section className="px-6 md:px-10 mb-20">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16 mt-24">
                            <motion.p
                                initial={{ opacity: 0, tracking: '0.1em' }}
                                whileInView={{ opacity: 1, tracking: '0.3em' }}
                                viewport={{ once: true }}
                                className="text-cyan-400 tracking-[0.35em] text-xs font-bold uppercase mb-4 font-inter"
                            >
                                Archive
                            </motion.p>
                            <h2 className="text-5xl md:text-7xl font-black text-black font-russo uppercase tracking-tighter">
                                PAST EVENTS
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                            {pastEvents.map((event, index) => (
                                <PastEventCard
                                    key={index}
                                    event={event}
                                    onRecapClick={setSelectedEvent}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}