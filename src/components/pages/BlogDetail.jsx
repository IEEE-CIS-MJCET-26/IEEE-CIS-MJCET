import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Calendar, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import { sanityClient } from '../../lib/sanityClient';
import { urlFor } from '../../lib/sanityImage';

/* ─────────────────────────────────────────
   SANITY QUERY
   ───────────────────────────────────────── */
const BLOG_DETAIL_QUERY = `*[_type=="blog" && slug.current==$slug][0]{
    _id,
    title,
    slug,
    shortDescription,
    author,
    category,
    publishedAt,
    mainImage,
    body
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

const estimateReadTime = (body) => {
    if (!body) return '3 min read';
    const text = body
        .filter((b) => b._type === 'block')
        .map((b) => b.children?.map((c) => c.text).join('') || '')
        .join(' ');
    const words = text.split(/\s+/).length;
    const mins = Math.max(1, Math.ceil(words / 200));
    return `${mins} min read`;
};

/* ─────────────────────────────────────────
   PORTABLE TEXT COMPONENTS
   Styled to match existing typography
   ───────────────────────────────────────── */
const portableTextComponents = {
    block: {
        h1: ({ children }) => (
            <h1
                className="text-2xl md:text-3xl text-neutral-900 font-bold leading-snug mt-12 mb-3"
                style={{ fontFamily: "'DM Serif Text', serif" }}
            >
                {children}
            </h1>
        ),
        h2: ({ children }) => (
            <h2
                className="text-xl md:text-2xl text-neutral-900 font-bold leading-snug mt-10 mb-2"
                style={{ fontFamily: "'DM Serif Text', serif" }}
            >
                {children}
            </h2>
        ),
        h3: ({ children }) => (
            <h3
                className="text-lg md:text-xl text-neutral-900 font-bold leading-snug mt-8 mb-2"
                style={{ fontFamily: "'DM Serif Text', serif" }}
            >
                {children}
            </h3>
        ),
        normal: ({ children }) => (
            <p
                className="text-neutral-600 text-base md:text-[17px] leading-relaxed md:leading-[1.85]"
                style={{ fontFamily: "'Inter', sans-serif" }}
            >
                {children}
            </p>
        ),
        blockquote: ({ children }) => (
            <blockquote className="border-l-[3px] border-cyan-500 pl-5 py-1 my-4 text-neutral-500 italic text-base leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }) => (
            <ul className="space-y-3 pl-1 my-4">{children}</ul>
        ),
        number: ({ children }) => (
            <ol className="space-y-3 pl-5 my-4 list-decimal">{children}</ol>
        ),
    },
    listItem: {
        bullet: ({ children }) => (
            <li
                className="flex gap-3 text-neutral-600 text-base md:text-[17px] leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
            >
                <span className="inline-block mt-2 w-1.5 h-1.5 rounded-full bg-cyan-500 flex-shrink-0" />
                <span>{children}</span>
            </li>
        ),
        number: ({ children }) => (
            <li
                className="text-neutral-600 text-base md:text-[17px] leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
            >
                {children}
            </li>
        ),
    },
    marks: {
        strong: ({ children }) => <strong className="font-bold text-neutral-900">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        link: ({ value, children }) => (
            <a
                href={value?.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-500 underline underline-offset-2 hover:text-cyan-600 transition-colors"
            >
                {children}
            </a>
        ),
    },
};

/* ─────────────────────────────────────────
   BLOG DETAIL PAGE
   ───────────────────────────────────────── */
export default function BlogDetail() {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        sanityClient
            .fetch(BLOG_DETAIL_QUERY, { slug })
            .then((data) => {
                setBlog(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Sanity fetch error:', err);
                setLoading(false);
            });
    }, [slug]);

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full mb-4"
                />
                <p className="text-neutral-400 text-sm tracking-widest uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Loading article...
                </p>
            </div>
        );
    }

    // 404 — blog not found
    if (!blog) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
                <h1
                    className="text-5xl font-black text-neutral-900 mb-4"
                    style={{ fontFamily: "'Russo One', sans-serif" }}
                >
                    404
                </h1>
                <p className="text-neutral-500 mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Blog post not found.
                </p>
                <Link
                    to="/blogs"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-cyan-500 text-white text-sm font-bold tracking-wider uppercase transition-all duration-300 hover:bg-cyan-600"
                >
                    <ArrowLeft size={16} />
                    Back to Blogs
                </Link>
            </div>
        );
    }

    const imageUrl = blog.mainImage ? urlFor(blog.mainImage).width(1200).url() : '/assets/blog/hero-ai.png';

    return (
        <div className="bg-white min-h-screen">

            {/* ── Back Button ── */}
            <div className="max-w-5xl mx-auto px-6 pt-24 md:pt-28 pb-4">
                <Link
                    to="/blogs"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-50 text-neutral-700 text-xs font-semibold tracking-wider uppercase border border-neutral-200 transition-all duration-200 hover:bg-white hover:shadow-md"
                >
                    <ArrowLeft size={14} />
                    All Articles
                </Link>
            </div>

            {/* ── Hero Image ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="relative max-w-5xl mx-auto px-6 mb-8"
            >
                <div className="relative rounded-2xl overflow-hidden">
                    <img
                        src={imageUrl}
                        alt={blog.title}
                        className="w-full h-auto max-h-[55vh] object-cover"
                    />
                    {/* Bottom gradient blend */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                </div>
            </motion.div>

            {/* ── Article Container ── */}
            <motion.article
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
                className="relative max-w-3xl mx-auto px-6 md:px-8 pb-20"
            >
                {/* Category badge */}
                <span className="inline-block px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-600 text-[10px] font-bold tracking-[0.25em] uppercase mb-5">
                    {blog.category}
                </span>

                {/* Title */}
                <h1
                    className="text-3xl md:text-4xl lg:text-[42px] text-neutral-900 font-bold leading-tight mb-6"
                    style={{ fontFamily: "'DM Serif Text', serif" }}
                >
                    {blog.title}
                </h1>

                {/* Meta row */}
                <div
                    className="flex flex-wrap items-center gap-5 pb-8 mb-10 border-b border-neutral-100 text-neutral-400 text-sm"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                >
                    <span className="flex items-center gap-2">
                        <User size={15} className="text-cyan-500" />
                        {blog.author}
                    </span>
                    <span className="flex items-center gap-2">
                        <Calendar size={15} className="text-cyan-500" />
                        {formatDate(blog.publishedAt)}
                    </span>
                    <span className="flex items-center gap-2">
                        <Clock size={15} className="text-cyan-500" />
                        {estimateReadTime(blog.body)}
                    </span>
                </div>

                {/* Article body — Portable Text */}
                <div className="space-y-6">
                    {blog.body && (
                        <PortableText value={blog.body} components={portableTextComponents} />
                    )}
                </div>

                {/* ── Bottom CTA ── */}
                <div className="mt-20 pt-10 border-t border-neutral-100 text-center">
                    <p
                        className="text-neutral-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        Enjoyed this article?
                    </p>
                    <h3
                        className="text-2xl md:text-3xl text-neutral-900 font-bold mb-6"
                        style={{ fontFamily: "'DM Serif Text', serif" }}
                    >
                        Explore more from CIS Journal
                    </h3>
                    <Link
                        to="/blogs"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-cyan-500 text-white text-sm font-bold tracking-wider uppercase transition-all duration-300 hover:bg-cyan-600 hover:gap-3"
                    >
                        View All Articles
                        <ArrowRight size={16} strokeWidth={2.5} />
                    </Link>
                </div>
            </motion.article>
        </div>
    );
}
