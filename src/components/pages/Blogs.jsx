import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Calendar, ArrowRight } from 'lucide-react';
import AnimatedBackground from '../AnimatedBackground';
import { sanityClient } from '../../lib/sanityClient';
import { urlFor } from '../../lib/sanityImage';

/* ─────────────────────────────────────────
   SANITY QUERIES
   ───────────────────────────────────────── */
const ALL_BLOGS_QUERY = `*[_type=="blog"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    shortDescription,
    featured,
    author,
    topic,
    category,
    publishedAt,
    mainImage
}`;

/* ─────────────────────────────────────────
   HELPERS
   ───────────────────────────────────────── */
const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

// Resolve display topic: prefer new 'topic' field, fall back to legacy 'category'
const resolveTopic = (blog) => blog.topic || blog.category || null;

/* ─────────────────────────────────────────
   ANIMATION VARIANTS
   ───────────────────────────────────────── */
const CONTAINER_VARIANTS = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.15 },
    },
};

const CARD_VARIANTS = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

/* ─────────────────────────────────────────
   BLOG CARD
   ───────────────────────────────────────── */
const BlogCard = ({ blog }) => {
    const topic = resolveTopic(blog);
    return (
        <div
            className="group flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 bg-white border border-neutral-200 shadow-sm hover:shadow-lg"
        >
            {/* Image */}
            <div className="relative h-52 overflow-hidden">
                <img
                    src={blog.mainImage ? urlFor(blog.mainImage).width(600).url() : '/assets/blog/hero-ai.png'}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col p-5 pt-4">
                {/* Topic label */}
                {topic && (
                    <span className="text-cyan-500 text-[10px] font-bold tracking-[0.25em] uppercase mb-2.5">
                        {topic}
                    </span>
                )}

                {/* Title */}
                <h3
                    className="text-[17px] text-neutral-900 font-bold leading-snug mb-2 line-clamp-2"
                    style={{ fontFamily: "'DM Serif Text', serif" }}
                >
                    {blog.title}
                </h3>

                {/* Description */}
                <p
                    className="text-neutral-500 text-sm leading-relaxed mb-4 line-clamp-3"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                >
                    {blog.shortDescription}
                </p>

                {/* Read More */}
                <Link
                    to={`/blogs/${blog.slug?.current}`}
                    className="inline-flex items-center gap-1.5 text-cyan-500 text-xs font-semibold tracking-wider uppercase mb-4 mt-auto transition-all duration-200 hover:gap-2.5 hover:text-cyan-600 w-fit"
                >
                    Read More
                    <ArrowRight size={14} strokeWidth={2.5} />
                </Link>

                {/* Meta */}
                <div className="flex items-center gap-4 pt-3 border-t border-neutral-100 text-neutral-400 text-[11px]">
                    <span className="flex items-center gap-1.5">
                        <User size={12} />
                        <span style={{ fontFamily: "'Inter', sans-serif" }}>{blog.author}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        <span style={{ fontFamily: "'Inter', sans-serif" }}>{formatDate(blog.publishedAt)}</span>
                    </span>
                </div>
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────
   SECTION SEPARATOR
   ───────────────────────────────────────── */
const SectionSeparator = ({ label }) => (
    <div className="flex items-center gap-4 my-12 md:my-16">
        <div className="flex-1 h-px bg-neutral-200" />
        <span
            className="text-neutral-400 text-[10px] font-semibold tracking-[0.3em] uppercase whitespace-nowrap"
            style={{ fontFamily: "'Inter', sans-serif" }}
        >
            {label}
        </span>
        <div className="flex-1 h-px bg-neutral-200" />
    </div>
);

/* ─────────────────────────────────────────
   FEATURED BLOG
   ───────────────────────────────────────── */
const FeaturedBlog = ({ blog }) => {
    const topic = resolveTopic(blog);
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
            className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden mb-0 bg-white border border-neutral-200 shadow-sm hover:shadow-lg transition-shadow duration-300"
        >
            {/* Image */}
            <div className="relative h-64 lg:h-auto overflow-hidden">
                <img
                    src={blog.mainImage ? urlFor(blog.mainImage).width(800).url() : '/assets/blog/hero-ai.png'}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 hidden lg:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent lg:hidden" />
            </div>

            {/* Content */}
            <div className="relative flex flex-col justify-center p-8 lg:p-12">
                {/* FEATURED badge */}
                <span
                    className="inline-flex items-center gap-1 w-fit px-3 py-1 rounded-full border border-cyan-400 bg-cyan-50 text-cyan-600 text-[9px] font-semibold tracking-[0.25em] uppercase mb-4 backdrop-blur-sm"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                >
                    · FEATURED
                </span>

                {/* Topic */}
                {topic && (
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-[3px] h-5 bg-cyan-500 rounded-full" />
                        <span className="text-cyan-500 text-[10px] font-bold tracking-[0.3em] uppercase">
                            {topic}
                        </span>
                    </div>
                )}

                {/* Title */}
                <h2
                    className="text-2xl md:text-3xl lg:text-[34px] text-neutral-900 font-bold leading-tight mb-4 line-clamp-2"
                    style={{ fontFamily: "'DM Serif Text', serif" }}
                >
                    {blog.title}
                </h2>

                {/* Description */}
                <p
                    className="text-neutral-500 text-sm md:text-base leading-relaxed mb-6 max-w-lg line-clamp-3"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                >
                    {blog.shortDescription}
                </p>

                {/* Read More */}
                <Link
                    to={`/blogs/${blog.slug?.current}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-cyan-500 text-white text-sm font-bold tracking-wider uppercase transition-all duration-300 hover:bg-cyan-600 hover:gap-3 w-fit"
                >
                    Read More
                    <ArrowRight size={16} strokeWidth={2.5} />
                </Link>

                {/* Meta */}
                <div className="flex items-center gap-5 mt-6 text-neutral-400 text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
                    <span className="flex items-center gap-1.5">
                        <User size={13} />
                        {blog.author}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Calendar size={13} />
                        {formatDate(blog.publishedAt)}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

/* ─────────────────────────────────────────
   MAIN PAGE
   ───────────────────────────────────────── */
export default function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        sanityClient.fetch(ALL_BLOGS_QUERY).then((data) => {
            setBlogs(data || []);
            setLoading(false);
        }).catch((err) => {
            console.error('Sanity fetch error:', err);
            setLoading(false);
        });
    }, []);

    const featured = blogs.find((b) => b.featured);
    const rest = blogs.filter((b) => !b.featured);

    return (
        <div className="bg-white min-h-screen text-white">

            {/* ── Hero ── */}
            <section className="relative min-h-[50vh] md:mt-12 mt-4 flex flex-col items-center justify-center px-6 overflow-hidden">
                <AnimatedBackground />

                <div className="relative z-10 text-center max-w-4xl mx-auto">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-cyan-400 text-xs md:text-sm font-bold tracking-[0.4em] uppercase mb-4"
                    >
                        IEEE Computational Intelligence Society &middot; MJCET
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase leading-tight tracking-tight mb-6"
                        style={{ fontFamily: "'Russo One', sans-serif" }}
                    >
                        <span className="text-cyan-400 tracking-wider">CIS</span>{' '}
                        <span className="text-black tracking-normal">Journal</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-neutral-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        Insights, tutorials, and stories from the minds behind
                        <br className="hidden md:block" />
                        Computational Intelligence at MJCET.
                    </motion.p>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                >
                    <motion.div
                        className="w-px h-8 bg-gradient-to-b from-cyan-400 to-transparent"
                        animate={{ scaleY: [1, 0.4, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </motion.div>
            </section>

            {/* ── Content ── */}
            <section className="relative max-w-7xl mx-auto px-6 pb-28">

                {/* Loading state */}
                {loading && (
                    <div className="text-center py-24">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full mx-auto mb-4"
                        />
                        <p className="text-neutral-400 text-sm tracking-widest uppercase">Loading blogs...</p>
                    </div>
                )}

                {/* Featured Blog */}
                {!loading && featured && (
                    <>
                        <FeaturedBlog blog={featured} />
                        <SectionSeparator label="Latest Posts" />
                    </>
                )}

                {/* All non-featured blogs — single flat grid, no filtering */}
                {!loading && (
                    <motion.div
                        variants={CONTAINER_VARIANTS}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                    >
                        {rest.map((blog) => (
                            <motion.div key={blog._id} variants={CARD_VARIANTS} className="h-full">
                                <BlogCard blog={blog} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Empty state */}
                {!loading && rest.length === 0 && !featured && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-24"
                    >
                        <p className="text-neutral-600 text-sm tracking-widest uppercase">
                            No posts yet. Check back soon.
                        </p>
                    </motion.div>
                )}
            </section>
        </div>
    );
}
