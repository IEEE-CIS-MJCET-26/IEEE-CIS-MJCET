import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AnimatedBackground from "../AnimatedBackground";

import va1 from "../../assets/EVENT-PHOTOS/va1.jpg";
import va2 from "../../assets/EVENT-PHOTOS/va2.jpg";
import va3 from "../../assets/EVENT-PHOTOS/va3.jpg";
import va4 from "../../assets/EVENT-PHOTOS/va4.jpg";
import va5 from "../../assets/EVENT-PHOTOS/va5.jpg";

import env1 from "../../assets/EVENT-PHOTOS/env1.jpg";
import env2 from "../../assets/EVENT-PHOTOS/env2.jpg";
import env3 from "../../assets/EVENT-PHOTOS/env3.jpg";  
import env4 from "../../assets/EVENT-PHOTOS/env4.jpg";
import env5 from "../../assets/EVENT-PHOTOS/env5.jpg";

import cu1 from "../../assets/EVENT-PHOTOS/cu1.jpg";
import cu2 from "../../assets/EVENT-PHOTOS/cu2.jpg";
import cu3 from "../../assets/EVENT-PHOTOS/cu3.jpg";
import cu4 from "../../assets/EVENT-PHOTOS/cu4.jpg";
import cu5 from "../../assets/EVENT-PHOTOS/cu5.jpg";
import cu6 from "../../assets/EVENT-PHOTOS/cu6.jpg";
import cu7 from "../../assets/EVENT-PHOTOS/cu7.jpg";

import oe1 from "../../assets/EVENT-PHOTOS/oe1.jpg";
import oe2 from "../../assets/EVENT-PHOTOS/oe2.jpg";
import oe3 from "../../assets/EVENT-PHOTOS/oe3.jpg";
import oe4 from "../../assets/EVENT-PHOTOS/oe4.jpg";
import oe5 from "../../assets/EVENT-PHOTOS/oe5.jpg";
import oe6 from "../../assets/EVENT-PHOTOS/oe6.jpg";

import mm1 from "../../assets/EVENT-PHOTOS/mm1.jpg";
import mm2 from "../../assets/EVENT-PHOTOS/mm2.jpg";
import mm3 from "../../assets/EVENT-PHOTOS/mm3.jpg";
import mm4 from "../../assets/EVENT-PHOTOS/mm4.jpg";
import mm5 from "../../assets/EVENT-PHOTOS/mm5.jpg";
import mm6 from "../../assets/EVENT-PHOTOS/mm6.jpg";

import pd1 from "../../assets/EVENT-PHOTOS/pd1.jpg";
import pd2 from "../../assets/EVENT-PHOTOS/pd2.jpg";
import pd3 from "../../assets/EVENT-PHOTOS/pd3.jpg";
import pd4 from "../../assets/EVENT-PHOTOS/pd4.jpg";
import pd5 from "../../assets/EVENT-PHOTOS/pd5.jpg";

import ai1 from "../../assets/EVENT-PHOTOS/ai1.jpeg";
import ai2 from "../../assets/EVENT-PHOTOS/ai2.JPG";
import ai3 from "../../assets/EVENT-PHOTOS/ai3.jpg";
import ai4 from "../../assets/EVENT-PHOTOS/ai4.jpg";

import cwc1 from "../../assets/EVENT-PHOTOS/cwc1.jpg";
import cwc2 from "../../assets/EVENT-PHOTOS/cwc2.jpg";
import cwc3 from "../../assets/EVENT-PHOTOS/cwc3.jpg";
import cwc4 from "../../assets/EVENT-PHOTOS/cwc4.jpg";

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
  {
  title: "VIDEO ALCHEMY",
  images: [videoalchemy,va1, va2, va3, va4, va5],
  description: "Video Alchemy was a vibrant and hands-on event that introduced students to the art of video editing and digital storytelling. Participants learned how to transform simple ideas into impactful visual content through scripting, editing techniques, transitions, and sound design. The practical approach allowed students to experiment with tools and express their creativity freely. The sessions encouraged originality and effective communication through multimedia platforms. From raw clips to polished videos, participants experienced the complete creative process. Video Alchemy not only enhanced technical skills but also boosted confidence, inspiring students to explore content creation with creativity and passion.",
  date: "15 Feb 2025",
  time: "10:00 AM",
  venue: "Seminar Hall"
  },
  {
    title: "CYBER UNMASKED",
    images: [cyberunmasked, cu1, cu2, cu3, cu4, cu5, cu6, cu7],
    description: "Cyber Unmasked was an informative and engaging event that highlighted the importance of cybersecurity in today’s digital age. Participants learned about common online threats such as phishing, malware, and data breaches, along with practical ways to stay safe online. Real-world examples and interactive explanations made the sessions relatable and easy to understand. The event emphasized the need for digital awareness and responsible internet usage. Students actively participated in discussions, gaining confidence in identifying and preventing cyber risks. Cyber Unmasked successfully equipped attendees with essential knowledge while sparking interest in cybersecurity as a vital and growing field.",
    date: "10 Jan 2025",
    time: "11:00 AM",
    venue: "Auditorium"
  },
  {
    title: "ENVISAGE",
    images: [envisage, env1, env2, env3, env4, env5],
    description: "Envisage was a creative and forward-looking event that encouraged students to think beyond boundaries and present innovative ideas. It provided a supportive platform where participants could share solutions to real-world problems and receive valuable feedback. The event promoted confidence, communication skills, and critical thinking through interactive discussions and idea presentations. Students were inspired to transform their imagination into practical concepts and explore new perspectives. The collaborative atmosphere fostered creativity and mutual learning. Envisage ultimately empowered participants to believe in their ideas, think strategically, and take meaningful steps toward their academic and professional aspirations.",
    date: "5 July 2025",
    time: "9:00 AM",
    venue: "Ghulam Ahmed Hall"
  },
  {
    title: "OCEAN EXPEDITION",
    images: [oceanexp, oe1, oe2, oe3, oe4, oe5, oe6],
    description: "Ocean Expedition was an eye-opening event that focused on raising awareness about marine life and environmental conservation. Through engaging presentations and interactive discussions, students learned about ocean biodiversity, pollution, and the urgent need to protect aquatic ecosystems. The event encouraged participants to reflect on how daily habits, such as plastic usage, impact marine life. Students actively shared ideas on sustainable practices and climate action. The sessions were both informative and inspiring, promoting responsibility toward the environment. Ocean Expedition not only expanded participants’ knowledge but also motivated them to adopt eco-friendly habits and become more conscious global citizens.",
    date: "2 May 2025",
    time: "8:00 AM",
    venue: "INCOIS Hyderabad"
  },
  {
    title: "MYSTERY MANIA",
    images: [mysterymania, mm1, mm2, mm3, mm4, mm5, mm6],
    description: "Mystery Mania was a lively and exciting event that brought out the problem-solver in every participant. Filled with puzzles, riddles, and clue-based challenges, the event tested analytical thinking, teamwork, and quick decision-making. Teams worked together under time pressure, creating an atmosphere of suspense and friendly competition. The energy in the room was contagious as participants eagerly decoded clues and solved tricky problems. Beyond the fun, the event helped sharpen critical thinking skills and encouraged collaboration. Mystery Mania successfully combined learning with entertainment, leaving students with a sense of achievement and plenty of memorable moments.",
    date: "20 March 2025",
    time: "2:00 PM",
    venue: "Seminar Hall"
  },
  {
    title: "DONATION DRIVE",
    images: [donation, donation],
    description: "The Ramadan Donation Drive was a thoughtful and compassionate effort to support underprivileged families during the holy month of Ramadan. Students and volunteers united to collect groceries, essential food items, and funds to prepare donation kits for those facing financial difficulties. The initiative reflected the true spirit of Ramadan; generosity, gratitude, and community service. Volunteers carefully organized and distributed the kits to ensure families could observe the month with dignity and comfort. The drive fostered unity and empathy among participants, creating a strong sense of purpose. It was a meaningful experience that not only helped many families but also reinforced the importance of giving back to society.",
    date: "12 April 2025",
    time: "10:30 AM",
    venue: "Campus Grounds"
  },
  {
    title: "CODE WITH CIS",
    images: [codewithcis, cwc1, cwc2, cwc3, cwc4],
    description: "Code with CIS was an enriching five-day online workshop designed to strengthen students’ programming foundations, particularly in the C language. The sessions covered everything from basic algorithms and flowcharts to advanced topics like pointers and file handling. Each class combined clear explanations with practical coding exercises, helping participants apply what they learned in real time. The speakers focused on building logical thinking and problem-solving skills, making the learning process interactive and engaging. Students actively participated in discussions and hands-on tasks, which boosted their confidence in coding. Overall, Code with CIS created a supportive learning environment that empowered beginners to take their first strong steps into the world of programming..",
    date: "18 Feb 2025",
    time: "1:00 PM",
    venue: "Computer Lab"
  },
  {
    title: "PLANTATION DRIVE",
    images: [plantation, pd1, pd2, pd3, pd4, pd5],
    description: "The Plantation Drive was a meaningful initiative that brought students together for a greener cause. With the aim of promoting environmental awareness and sustainability, volunteers planted saplings around the campus as a step toward increasing green cover. The activity symbolized hope, responsibility, and a shared commitment to protecting nature. Along with planting trees, participants learned about the importance of maintaining ecological balance and combating climate change. The drive created a sense of teamwork and collective action, as everyone contributed enthusiastically. More than just planting saplings, the event planted a sense of environmental responsibility in the hearts of students, encouraging them to care for the planet long term",
    date: "22 Aug 2024",
    time: "9:30 AM",
    venue: "College Campus"
  },
  {
    title: "AI AMAZING",
    images: [aimazing, ai1, ai2, ai3, ai4],
    description: "AI Mazing was an engaging and inspiring technical event that introduced students to the fascinating world of Artificial Intelligence. Through interactive sessions and real-life examples, participants explored how AI and machine learning are shaping industries such as healthcare, automation, and cybersecurity. The speakers broke down complex concepts into simple, easy-to-understand explanations, making the sessions accessible even for beginners. Live demonstrations and practical insights kept the audience actively involved and curious throughout. The event not only enhanced technical understanding but also encouraged students to think innovatively and ethically about AI’s future. Overall, Ai mazing sparked interest, boosted confidence, and motivated participants to explore opportunities in this rapidly growing field.",
    date: "15 Sept 2024",
    time: "10:00 AM",
    venue: "Main Auditorium"
  }
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
                    src={event.images?.[0]}
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
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
    if (selectedEvent) setCurrentIndex(0);
    }, [selectedEvent]);

    useEffect(() => {
    }, [selectedEvent]);
    
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

            
{selectedEvent && (
  <div
    className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50"
    onClick={() => setSelectedEvent(null)}
  >
    {/* MODAL BOX */}
    <div
      className="relative bg-white text-gray-900 rounded-2xl p-8 w-[90%] max-w-4xl max-h-[85vh] overflow-y-auto shadow-2xl border border-cyan-400/30"
      onClick={(e) => e.stopPropagation()}
    >

      {/* CLOSE BUTTON */}
      <button
        onClick={() => setSelectedEvent(null)}
        className="absolute top-4 right-5 text-2xl text-gray-400 hover:text-cyan-400 transition"
      >
        ✕
      </button>

      {/* EVENT TITLE */}
      <h2 className="text-3xl font-russo font-black text-center mb-8 text-gray-900 tracking-normal uppercase">
        {selectedEvent.title}
    </h2>

      
<div className="overflow-hidden w-full mb-10">

  
{selectedEvent?.images && (
  <div className="overflow-hidden w-full mb-10">

    <motion.div
      className="flex gap-6"
      animate={{ x: ["0%", "-50%"] }}
      transition={{
        ease: "linear",
        duration: 18,
        repeat: Infinity,
      }}
    >
      {[...selectedEvent.images, ...selectedEvent.images].map(
        (img, index) => (
          <div
            key={index}
            className="w-40 h-40 flex-shrink-0 rounded-xl overflow-hidden border border-cyan-400/40"
          >
            <img
              src={img}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        )
      )}
    </motion.div>

  </div>
)}
</div>

      {/* ABOUT EVENT */}
      <div className="text-center mb-12">
        <h3 className="font-inter text-cyan-400 text-sm md:text-base tracking-[0.35em] uppercase text-center mb-4">
        • ABOUT EVENT •
        </h3>

        <p className="text-gray-600 max-w-2xl mx-auto">
          {selectedEvent.description}
        </p>
      </div>

      {/* DATE TIMEs ITEM VEENUE */}
      <div className="grid grid-cols-3 text-center gap-6">

        <div>
          <p className="text-xs text-cyan-400 tracking-widest">DATE</p>
          <p className="font-semibold text-gray">
            {selectedEvent.date}
          </p>
        </div>

        <div>
          <p className="text-xs text-cyan-400 tracking-widest">TIME</p>
          <p className="font-semibold text-gray">
            {selectedEvent.time}
          </p>
        </div>

        <div>
          <p className="text-xs text-cyan-400 tracking-widest">VENUE</p>
          <p className="font-semibold text-gray">
            {selectedEvent.venue}
          </p>
        </div>

      </div>
    </div>
  </div>
)}
        
</div>
);
}