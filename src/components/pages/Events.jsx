import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedBackground from "../AnimatedBackground";
import { sanityClient } from "../../lib/sanityClient";
import { urlFor } from "../../lib/sanityImage";

// ─────────────────────────────────────────
// SANITY QUERIES
// ─────────────────────────────────────────
//
// ⚠️  ROOT CAUSE FIX:
//  'date' is a GROQ built-in function name. Using it as a field name
//  inside a GROQ filter (date < $today) is ambiguous — GROQ silently
//  treats it as the cast function, not the document field, causing the
//  filter to always return nothing.
//
//  FIX: Fetch ALL events in one query (no date filter in GROQ),
//  then split upcoming vs. past client-side using JS Date, which is
//  100% reliable regardless of timezone/format edge-cases.
//
const ALL_EVENTS_QUERY = `*[_type=="event"] | order(date asc) {
  _id, title, date, time, venue, description,
  poster, gallery, registrationLink
}`;

// ─────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────
const formatDate = (dateStr) => {
    if (!dateStr) return "TBA";
    return new Date(dateStr).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};

// Resolve a Sanity image to a usable URL string, with optional width
const imgUrl = (ref, width = 800) => {
    if (!ref) return null;
    return urlFor(ref).width(width).url();
};

// ─────────────────────────────────────────
// LOADING SPINNER
// ─────────────────────────────────────────
const Spinner = () => (
    <div className="flex justify-center items-center py-20">
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full"
        />
    </div>
);

// ─────────────────────────────────────────
// PAST EVENT CARD
// ─────────────────────────────────────────
const PastEventCard = ({ event, onRecapClick }) => {
    const posterSrc = imgUrl(event.poster, 600);

    return (
        <div
            className="group relative hover:translate-y-[-10px] transition-all duration-500 hover:shadow-black bg-gradient-to-br from-blue-50 to-white rounded-[2rem] p-4 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] border border-cyan-400/10 flex flex-col h-full"
        >
            {/* Poster Wrapper */}
            <div className="relative aspect-[3/4] rounded-[1.5rem] bg-white overflow-hidden flex items-center justify-center p-6 transition-colors duration-500">
                {posterSrc ? (
                    <img
                        src={posterSrc}
                        alt={event.title}
                        className="w-full h-full object-contain rounded-bl-3xl rounded-tl-3xl group:hover-scale:1.05 transition-all duration-500 rounded-xl shadow-[0_12px_40px_-8px_rgba(0,0,0,0.15)] z-10"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-cyan-100 to-blue-100 rounded-xl flex items-center justify-center">
                        <span className="text-cyan-400/40 text-4xl font-black uppercase tracking-widest">
                            {event.title?.slice(0, 2)}
                        </span>
                    </div>
                )}

                <div className="absolute top-4 right-4 z-20">
                    <div className="px-3 py-1.5 rounded-full bg-white/40 backdrop-blur-xl transition-colors border border-white/40 group-hover:border-red-500 shadow-sm flex items-center gap-1.5">
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
                    <span className="relative z-10 font-russo text-cyan-500 flex items-center justify-center gap-2">
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

// ─────────────────────────────────────────
// UNIFIED EVENT MODAL
// Opens for both upcoming (no gallery) and past events (with gallery)
// ─────────────────────────────────────────
const EventModal = ({ event, onClose, isUpcoming = false }) => {
    if (!event) return null;

    const posterSrc = imgUrl(event.poster, 800);
    const galleryImages = (event.gallery || [])
        .map((img) => imgUrl(img, 400))
        .filter(Boolean);
    const showGallery = !isUpcoming && galleryImages.length > 0;

    return (
        <AnimatePresence>
            <motion.div
                key="modal-backdrop"
                className={
                    isUpcoming
                        ? "fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 md:p-10"
                        : "fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50"
                }
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: isUpcoming ? 0.3 : 0.25, ease: "easeInOut" }}
            >
                {isUpcoming ? (
                    /* ── Upcoming modal: dark split-layout ── */
                    <motion.div
                        key="upcoming-modal-box"
                        className="group relative bg-neutral-900 rounded-[2.5rem] w-full max-w-5xl overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border border-neutral-200/20"
                        onClick={(e) => e.stopPropagation()}
                        initial={{ opacity: 0, scale: 0.93, y: 24 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.93, y: 24 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Close */}
                        <button
                            onClick={onClose}
                            className="group absolute top-6 right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-cyan-500 hover:border-cyan-500 transition-all duration-300"
                            aria-label="Close"
                        >
                            <span className="text-lg leading-none font-bold transition-all duration-300 group-hover:rotate-180 inline-block">✕</span>
                        </button>

                        <div className="grid md:grid-cols-[0.8fr,1.2fr] items-stretch min-h-[400px] md:min-h-[500px]">
                            {/* Left: image */}
                            <div className="relative bg-black flex items-center justify-center overflow-hidden p-8 md:p-12 md:rounded-l-[2.5rem]">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none transition-all duration-1000 group-hover:bg-cyan-500/20"></div>
                                {posterSrc ? (
                                    <img
                                        src={posterSrc}
                                        alt={event.title || "Coming Soon"}
                                        className="w-full h-full object-contain relative z-10 transition-transform duration-1000 group-hover:scale-105 rounded-tl-3xl rounded-bl-3xl md:rounded-tl-[2.5rem] md:rounded-bl-[2.5rem]"
                                    />
                                ) : (
                                    <div className="w-full h-64 flex items-center justify-center">
                                        <span className="text-cyan-400/30 text-6xl font-black">?</span>
                                    </div>
                                )}
                            </div>

                            {/* Right: content */}
                            <div className="p-10 md:p-16 flex flex-col justify-center relative z-10 border-l border-white/5 bg-neutral-900">
                                <h2 className="text-4xl md:text-5xl font-black text-white mb-4 font-russo uppercase leading-none tracking-tight">
                                    {event.title || "COMING SOON..."}
                                </h2>

                                <div className="w-16 h-1 bg-cyan-500 mb-12 rounded-full group-hover:w-32 transition-all duration-500"></div>

                                <p className="text-white text-md md:text-xl tracking-[0.2em] font-bold uppercase mb-10 font-inter">
                                    {event.description || "Something's cooking"}
                                </p>

                                {/* Date / Time / Venue */}
                                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 mt-auto">
                                    <div>
                                        <p className="text-xs text-neutral-400 tracking-widest mb-2 font-inter">DATE</p>
                                        <p className="font-semibold text-white font-inter">{event.date ? formatDate(event.date) : "TBA"}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-neutral-400 tracking-widest mb-2 font-inter">TIME</p>
                                        <p className="font-semibold text-white font-inter">{event.time || "TBA"}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-neutral-400 tracking-widest mb-2 font-inter">VENUE</p>
                                        <p className="font-semibold text-white font-inter">{event.venue || "TBA"}</p>
                                    </div>
                                </div>

                                {/* REGISTER NOW — only shown if registrationLink exists */}
                                {event.registrationLink && (
                                    <motion.a
                                        href={event.registrationLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="group/reg mt-8 inline-flex items-center gap-3 px-10 py-5 bg-cyan-500 text-black text-sm uppercase font-black rounded-2xl font-inter transition-all duration-300 hover:bg-white hover:text-black"
                                    >
                                        Register Now
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover/reg:translate-x-1">
                                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </motion.a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    /* ── Past event modal: white scrollable ── */
                    <>
                        <style>{`
              .event-modal-scroll {
                scrollbar-width: thin;
                scrollbar-color: #22d4f5 transparent;
              }
              .event-modal-scroll::-webkit-scrollbar { width: 5px; }
              .event-modal-scroll::-webkit-scrollbar-track { background: transparent; }
              .event-modal-scroll::-webkit-scrollbar-thumb {
                background-color: #22d4f5;
                border-radius: 999px;
              }
            `}</style>
                        <motion.div
                            key="modal-box"
                            className="event-modal-scroll relative bg-white text-gray-900 rounded-2xl p-8 w-[90%] max-w-4xl max-h-[85vh] overflow-y-auto shadow-2xl border border-cyan-400/30"
                            onClick={(e) => e.stopPropagation()}
                            initial={{ opacity: 0, scale: 0.93, y: 24 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.93, y: 24 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {/* Close */}
                            <button
                                onClick={onClose}
                                className="group absolute top-4 right-5 w-9 h-9 flex items-center justify-center rounded-full bg-white border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 transition-colors duration-300"
                                aria-label="Close"
                            >
                                <span className="text-base leading-none font-bold transition-all duration-300 group-hover:rotate-180 group-hover:text-white inline-block" style={{ display: "inline-block" }}>
                                    ✕
                                </span>
                            </button>

                            {/* Title */}
                            <h2 className="text-3xl font-russo font-black text-center mb-8 text-gray-900 tracking-normal uppercase">
                                {event.title}
                            </h2>

                            {/* Gallery slider — only if gallery images exist */}
                            {showGallery && (
                                <div className="relative w-full mb-10 overflow-hidden">
                                    <motion.div
                                        className="flex gap-6 w-max"
                                        animate={{ x: [0, -((160 + 24) * galleryImages.length)] }}
                                        transition={{
                                            duration: galleryImages.length * 4,
                                            ease: "linear",
                                            repeat: Infinity,
                                        }}
                                    >
                                        {[...galleryImages, ...galleryImages].map((src, i) => (
                                            <div
                                                key={i}
                                                className="w-40 h-40 flex-shrink-0 rounded-xl overflow-hidden border border-cyan-400/20"
                                            >
                                                <img
                                                    src={src}
                                                    alt=""
                                                    className="w-full h-full object-cover pointer-events-none"
                                                />
                                            </div>
                                        ))}
                                    </motion.div>
                                </div>
                            )}

                            {/* About Event */}
                            <div className="text-center mb-12">
                                <h3 className="font-inter text-cyan-400 text-sm md:text-base tracking-[0.35em] uppercase text-center mb-4">
                                    • ABOUT EVENT •
                                </h3>
                                <p className="text-gray-600 max-w-2xl mx-auto">{event.description}</p>
                            </div>

                            {/* Date / Time / Venue */}
                            <div className="grid grid-cols-3 text-center gap-6">
                                <div>
                                    <p className="text-xs text-cyan-400 tracking-widest">DATE</p>
                                    <p className="font-semibold text-gray-800">{formatDate(event.date)}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-cyan-400 tracking-widest">TIME</p>
                                    <p className="font-semibold text-gray-800">{event.time || "—"}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-cyan-400 tracking-widest">VENUE</p>
                                    <p className="font-semibold text-gray-800">{event.venue || "—"}</p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </motion.div>
        </AnimatePresence>
    );
};

// ─────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────
export default function Events() {
    const [upcomingEvent, setUpcomingEvent] = useState(null);
    const [pastEvents, setPastEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal state — one modal for both upcoming + past
    const [activeEvent, setActiveEvent] = useState(null);   // the event object
    const [activeIsUpcoming, setActiveIsUpcoming] = useState(false);

    const openUpcoming = (event) => {
        setActiveEvent(event);
        setActiveIsUpcoming(true);
    };
    const openPast = (event) => {
        setActiveEvent(event);
        setActiveIsUpcoming(false);
    };
    const closeModal = () => {
        setActiveEvent(null);
        setActiveIsUpcoming(false);
    };

    useEffect(() => {
        console.log("[Events] Fetching all events from Sanity...");

        sanityClient.fetch(ALL_EVENTS_QUERY)
            .then((allEvents) => {
                console.log("[Events] Raw Sanity response:", allEvents);
                console.log("[Events] Total events fetched:", allEvents?.length ?? 0);

                if (!allEvents || allEvents.length === 0) {
                    console.warn("[Events] No events returned from Sanity. Check _type=='event' documents are published.");
                    setLoading(false);
                    return;
                }

                // Client-side date split — compare "YYYY-MM-DD" strings directly.
                // Sanity's date field stores "YYYY-MM-DD", which sorts lexicographically
                // exactly like a calendar date, so string comparison is perfectly safe.
                const todayStr = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
                console.log("[Events] Today's date string for comparison:", todayStr);

                const past = [];
                const upcoming = [];

                allEvents.forEach((ev) => {
                    console.log(`[Events] Event: "${ev.title}" | date field: "${ev.date}" | isPast: ${ev.date < todayStr}`);
                    if (!ev.date) {
                        console.warn(`[Events] Event "${ev.title}" has no date field — skipping`);
                        return;
                    }
                    if (ev.date < todayStr) {
                        past.push(ev);
                    } else {
                        upcoming.push(ev);
                    }
                });

                // Past: newest first
                past.sort((a, b) => b.date.localeCompare(a.date));
                // Upcoming: nearest first → take only first
                upcoming.sort((a, b) => a.date.localeCompare(b.date));

                console.log("[Events] Past events:", past.length, past.map(e => e.title));
                console.log("[Events] Upcoming events:", upcoming.length, upcoming.map(e => e.title));

                setPastEvents(past);
                setUpcomingEvent(upcoming[0] || null);
            })
            .catch((err) => {
                console.error("[Events] Sanity fetch error:", err);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="relative bg-white min-h-screen overflow-hidden">

            {/* Background blobs */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-400 opacity-20 blur-3xl rounded-[50%_30%_60%_40%] rotate-12"></div>
                <div className="absolute top-16 right-24 w-56 h-56 bg-cyan-400 opacity-15 blur-3xl rounded-[60%_40%_50%_70%] rotate-45"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-400 opacity-20 blur-3xl rounded-[70%_30%_60%_50%] rotate-6"></div>
                <div className="absolute bottom-20 left-16 w-48 h-48 bg-cyan-400 opacity-15 blur-3xl rounded-[60%_50%_30%_70%] rotate-30"></div>
                <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-cyan-400 opacity-15 blur-3xl rounded-[50%_60%_40%_50%] rotate-12"></div>
                <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-cyan-400 opacity-10 blur-3xl rounded-[60%_50%_50%_60%] rotate-25"></div>
                <div className="absolute top-1/4 left-3/4 w-24 h-24 bg-cyan-400 opacity-15 blur-3xl rounded-[50%_70%_40%_60%] rotate-10"></div>
                <div className="absolute bottom-1/3 right-1/2 w-20 h-20 bg-cyan-400 opacity-10 blur-3xl rounded-[60%_50%_70%_40%] rotate-20"></div>
            </div>

            <div className="relative z-10 py-12">

                {/* ── Header ── */}
                <section className="relative text-center py-16 px-6 md:px-10 overflow-hidden">
                    <AnimatedBackground />
                    <div className="relative z-10">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-cyan-400 text-xs md:text-sm font-bold tracking-[0.4em] uppercase mb-4"
                        >
                            IEEE Computational Intelligence Society · MJCET
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
                    </div>
                </section>


                {/* ── UPCOMING EVENTS ── */}
                <section className="relative mb-32 px-6 md:px-10">
                    <AnimatedBackground />
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-20">
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
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

                        {loading ? (
                            <Spinner />
                        ) : upcomingEvent ? (
                            <div className="space-y-16">
                                <motion.div
                                    initial={{ opacity: 0, y: 60 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className="relative group rounded-[2.5rem] border border-neutral-200/50 bg-neutral-900 overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)]"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-neutral-800/50 to-transparent pointer-events-none"></div>
                                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none transition-all duration-1000 group-hover:bg-cyan-500/10"></div>

                                    <div className="grid grid-cols-1 md:grid-cols-[0.8fr,1.2fr] items-stretch min-h-[500px]">
                                        {/* Image column */}
                                        <div className="relative bg-black flex items-center justify-center overflow-hidden rounded-t-[2.5rem] md:rounded-t-none md:rounded-l-[2.5rem]">
                                            <div className="w-full aspect-[1/1.414] p-6 sm:p-8 md:p-10">
                                                {imgUrl(upcomingEvent.poster) ? (
                                                    <img
                                                        src={imgUrl(upcomingEvent.poster)}
                                                        alt={upcomingEvent.title}
                                                        className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-105 rounded-xl md:rounded-none"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <span className="text-cyan-400/30 text-7xl font-black">?</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Content column */}
                                        <div className="p-8 md:p-16 lg:p-20 flex flex-col justify-center relative z-10 md:border-l md:border-white/5 border-t border-white/5 md:border-t-0">
                                            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 font-russo uppercase leading-none tracking-tight">
                                                {upcomingEvent.title}
                                            </h3>

                                            <div className="w-16 h-1 bg-cyan-500 mb-10 rounded-full group-hover:w-32 transition-all duration-500"></div>

                                            <p className="text-neutral-400 text-lg md:text-xl lg:text-2xl leading-relaxed mb-12 font-inter font-light">
                                                {upcomingEvent.description}
                                            </p>

                                            <div>
                                                <motion.button
                                                    onClick={() => openUpcoming(upcomingEvent)}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="group/btn relative px-10 py-5 bg-white text-black text-sm uppercase font-black rounded-2xl font-inter transition-all duration-300 hover:bg-cyan-400 hover:text-white flex items-center gap-3"
                                                >
                                                    View More
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover/btn:translate-x-1">
                                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </motion.button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        ) : (
                            /* No upcoming event in Sanity → show a "coming soon" placeholder */
                            <div className="space-y-16">
                                <motion.div
                                    initial={{ opacity: 0, y: 60 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className="relative group rounded-[2.5rem] border border-neutral-200/50 bg-neutral-900 overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)]"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-neutral-800/50 to-transparent pointer-events-none"></div>
                                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none transition-all duration-1000 group-hover:bg-cyan-500/10"></div>

                                    <div className="grid grid-cols-1 md:grid-cols-[0.8fr,1.2fr] items-stretch min-h-[500px]">
                                        <div className="relative bg-black flex items-center justify-center overflow-hidden rounded-t-[2.5rem] md:rounded-t-none md:rounded-l-[2.5rem]">
                                            <div className="w-full aspect-[1/1.414] p-6 sm:p-8 md:p-10 flex items-center justify-center">
                                                <span className="text-cyan-400/20 text-8xl font-black">?</span>
                                            </div>
                                        </div>
                                        <div className="p-8 md:p-16 lg:p-20 flex flex-col justify-center relative z-10 md:border-l md:border-white/5 border-t border-white/5 md:border-t-0">
                                            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 font-russo uppercase leading-none tracking-tight">
                                                COMING SOON
                                            </h3>
                                            <div className="w-16 h-1 bg-cyan-500 mb-10 rounded-full group-hover:w-32 transition-all duration-500"></div>
                                            <p className="text-neutral-400 text-lg md:text-xl lg:text-2xl leading-relaxed mb-12 font-inter font-light">
                                                The next one's a secret (for now).
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        )}
                    </div>
                </section>


                {/* ── PAST EVENTS ── */}
                <section className="relative px-6 md:px-10 mb-20">
                    <AnimatedBackground />
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16 mt-24">
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="text-cyan-400 tracking-[0.35em] text-xs font-bold uppercase mb-4 font-inter"
                            >
                                Archive
                            </motion.p>
                            <h2 className="text-5xl md:text-7xl font-black text-black font-russo uppercase tracking-tighter">
                                PAST EVENTS
                            </h2>
                        </div>

                        {loading ? (
                            <Spinner />
                        ) : pastEvents.length === 0 ? (
                            <p className="text-center text-neutral-400 py-16 tracking-widest uppercase text-sm">
                                No past events yet.
                            </p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                                {pastEvents.map((event) => (
                                    <PastEventCard
                                        key={event._id}
                                        event={event}
                                        onRecapClick={openPast}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </div>

            {/* ── UNIFIED MODAL ── */}
            <AnimatePresence>
                {activeEvent && (
                    <EventModal
                        key={activeEvent._id}
                        event={activeEvent}
                        onClose={closeModal}
                        isUpcoming={activeIsUpcoming}
                    />
                )}
            </AnimatePresence>

        </div>
    );
}