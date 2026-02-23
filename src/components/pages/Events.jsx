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
    date: "March 20, 2025",
    image: comingsoon,
    description: "New event will be announced soon.",
  },
];

export const pastEvents = [
  { title: "Video Alchemy", image: videoalchemy, description: "AI video creation workshop" },
  { title: "Cyber Unmasked", image: cyberunmasked, description: "AI video creation workshop" },
  { title: "Envisage", image: envisage, description: "Project competition and exhibition" },
  { title: "Ocean Expedition", image: oceanexp, description: "Industrial visit to INCOIS" },
  { title: "Mystery Mania", image: mysterymania, description: "Fun and exciting IEEE CIS event" },
  { title: "Donation Drive", image: donation, description: "Social service donation initiative." },
  { title: "Blanket Donation", image: blanket, description: "Donation drive for helping people in need." },
  { title: "Code With CIS", image: codewithcis, description: "Coding event conducted by IEEE CIS." },
  { title: "Plantation Drive", image: plantation, description: "Tree plantation initiative for environment." },
  { title: "AI Amazing", image: aimazing, description: "AI Amazing event organized by IEEE CIS." },
];

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
          <p className="text-xs tracking-[0.3em] text-cyan-400 mb-6 uppercase">
            IEEE Computational Intelligence Society – MJCET
          </p>

          {/* Heading with Russo One font via Tailwind */}
          <h1 className="text-6xl md:text-8xl font-extrabold leading-tight font-russo">
            <span className="block text-black">OUR</span>
            <span className="block text-cyan-400">EVENTS</span>
          </h1>

          <p className="mt-6 text-gray-500 max-w-2xl mx-auto text-lg">
            Explore our upcoming and past events.
          </p>
        </section>

       
        {/* UPCOMING EVENTS */}
<section className="mb-24">
  <div className="text-center mb-16">
    <p className="text-cyan-400 tracking-[0.3em] text-sm font-semibold uppercase mb-2">
      Discover
    </p>
    <h2 className="text-5xl md:text-6xl font-extrabold text-black font-russo">
      UPCOMING EVENTS
    </h2>
  </div>

  {upcomingEvents.map((event, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.02 }}
      className="max-w-7xl mx-auto bg-white border-4 border-black rounded-3xl overflow-hidden shadow-lg"
    >
      <div className="grid md:grid-cols-2 items-center gap-0">

        {/* LEFT IMAGE */}
        <div className="h-64 md:h-72 lg:h-80 w-full">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="px-8 md:px-12 py-6 md:py-8 text-left">
          <h3 className="text-3xl md:text-4xl font-extrabold text-black mb-4 font-russo">
            {event.title}
          </h3>

          <div className="w-16 h-1 bg-cyan-400 mb-6"></div>

          <p className="text-gray-600 text-base md:text-lg mb-4">
            {event.description}
          </p>

          <p className="text-cyan-500 font-semibold text-base md:text-lg mb-6">
            {event.date}
          </p>

          <button className="px-6 py-2 md:py-3 bg-cyan-400 text-white rounded-lg font-semibold hover:bg-black transition duration-300">
            Learn More
          </button>
        </div>

      </div>
    </motion.div>
  ))}
</section>

        {/* PAST EVENTS */}
        <section>
          <div className="text-center mb-12 mt-24">
            <p className="text-cyan-400 tracking-[0.3em] text-sm font-semibold uppercase mb-2">
              Explore
            </p>
            <h2 className="text-5xl md:text-6xl font-extrabold text-black font-russo">
              PAST EVENTS
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {pastEvents.map((event, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 25px #22d3ee" }}
                className="bg-white border border-cyan-400 rounded-2xl shadow-sm overflow-hidden relative max-w-[300px] mx-auto p-3"
              >
                <span className="absolute top-3 right-3 border border-red-500 text-red-500 text-xs px-4 py-1 rounded-full backdrop-blur-md bg-white/30 font-semibold">
                  • CONCLUDED
                </span>

                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-auto object-contain bg-white rounded-lg"
                />

                <div className="p-5 text-center">
                  <h3 className="text-lg font-semibold text-black font-russo">{event.title}</h3>
                  <p className="text-sm text-black mt-2">{event.description}</p>

                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="mt-3 border border-cyan-400 bg-cyan-400 text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-black hover:text-white"
                  >
                    View Recap
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}