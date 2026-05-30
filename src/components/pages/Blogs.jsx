import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Calendar, ArrowRight, Search, X, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import AnimatedBackground from '../AnimatedBackground';
import { sanityClient } from '../../lib/sanityClient';
import { urlFor } from '../../lib/sanityImage';
import PageSEO from '../PageSEO';

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
   CONSTANTS
   ───────────────────────────────────────── */
const BLOGS_PER_PAGE = 6;

const SORT_OPTIONS = [
    { value: 'newest', label: 'Newest to Oldest' },
    { value: 'oldest', label: 'Oldest to Newest' },
];

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

const resolveTopic = (blog) => blog.topic || blog.category || null;

/* ─────────────────────────────────────────
   ANIMATION VARIANTS
   ───────────────────────────────────────── */
const CONTAINER_VARIANTS = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.07, delayChildren: 0.05 },
    },
    exit: { opacity: 0, transition: { duration: 0.2 } },
};

const CARD_VARIANTS = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

/* ─────────────────────────────────────────
   BLOG CARD
   ───────────────────────────────────────── */
const BlogCard = ({ blog }) => {
    const topic = resolveTopic(blog);
    return (
        <div className="group flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 bg-white border border-neutral-200 shadow-sm hover:shadow-lg">
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
                {topic && (
                    <span className="text-cyan-500 text-[10px] font-bold tracking-[0.25em] uppercase mb-2.5">
                        {topic}
                    </span>
                )}

                <h3
                    className="text-[17px] text-neutral-900 font-bold leading-snug mb-2 line-clamp-2"
                    style={{ fontFamily: "'DM Serif Text', serif" }}
                >
                    {blog.title}
                </h3>

                <p
                    className="text-neutral-500 text-sm leading-relaxed mb-4 line-clamp-3"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                >
                    {blog.shortDescription}
                </p>

                <Link
                    to={`/blogs/${blog.slug?.current}`}
                    className="inline-flex items-center gap-1.5 text-cyan-500 text-xs font-semibold tracking-wider uppercase mb-4 mt-auto transition-all duration-200 hover:gap-2.5 hover:text-cyan-600 w-fit"
                >
                    Read More
                    <ArrowRight size={14} strokeWidth={2.5} />
                </Link>

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
            <div className="relative h-64 lg:h-auto overflow-hidden">
                <img
                    src={blog.mainImage ? urlFor(blog.mainImage).width(800).url() : '/assets/blog/hero-ai.png'}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 hidden lg:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent lg:hidden" />
            </div>

            <div className="relative flex flex-col justify-center p-8 lg:p-12">
                <span
                    className="inline-flex items-center gap-1 w-fit px-3 py-1 rounded-full border border-cyan-400 bg-cyan-50 text-cyan-600 text-[9px] font-semibold tracking-[0.25em] uppercase mb-4 backdrop-blur-sm"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                >
                    · FEATURED
                </span>

                {topic && (
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-[3px] h-5 bg-cyan-500 rounded-full" />
                        <span className="text-cyan-500 text-[10px] font-bold tracking-[0.3em] uppercase">
                            {topic}
                        </span>
                    </div>
                )}

                <h2
                    className="text-2xl md:text-3xl lg:text-[34px] text-neutral-900 font-bold leading-tight mb-4 line-clamp-2"
                    style={{ fontFamily: "'DM Serif Text', serif" }}
                >
                    {blog.title}
                </h2>

                <p
                    className="text-neutral-500 text-sm md:text-base leading-relaxed mb-6 max-w-lg line-clamp-3"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                >
                    {blog.shortDescription}
                </p>

                <Link
                    to={`/blogs/${blog.slug?.current}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-cyan-500 text-white text-sm font-bold tracking-wider uppercase transition-all duration-300 hover:bg-cyan-600 hover:gap-3 w-fit"
                >
                    Read More
                    <ArrowRight size={16} strokeWidth={2.5} />
                </Link>

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
   CUSTOM SORT DROPDOWN
   ───────────────────────────────────────── */
const SortDropdown = ({ sortOrder, setSortOrder }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const selected = SORT_OPTIONS.find((o) => o.value === sortOrder);

    /* Close on outside click */
    useEffect(() => {
        const handleOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', handleOutside);
        return () => document.removeEventListener('mousedown', handleOutside);
    }, []);

    return (
        <div ref={ref} className="relative flex-shrink-0" id="blog-sort-wrapper">
            {/* Trigger button */}
            <button
                id="blog-sort"
                onClick={() => setOpen((v) => !v)}
                className={`flex items-center gap-2.5 pl-3.5 pr-3 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 bg-white cursor-pointer select-none ${
                    open
                        ? 'border-cyan-400 ring-2 ring-cyan-100 text-cyan-600'
                        : 'border-neutral-200 text-neutral-600 hover:border-cyan-300 hover:text-cyan-500'
                }`}
                style={{ fontFamily: "'Inter', sans-serif", minWidth: '178px' }}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <SlidersHorizontal size={14} className={`transition-colors duration-200 ${open ? 'text-cyan-500' : 'text-neutral-400'}`} />
                <span className="flex-1 text-left">{selected?.label}</span>
                <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.22, ease: 'easeInOut' }}
                    className="flex items-center"
                >
                    <ChevronRight size={14} className="rotate-90 text-neutral-400" />
                </motion.span>
            </button>

            {/* Animated dropdown panel */}
            <AnimatePresence>
                {open && (
                    <motion.ul
                        role="listbox"
                        initial={{ opacity: 0, y: -6, scaleY: 0.92 }}
                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                        exit={{ opacity: 0, y: -6, scaleY: 0.92 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        style={{ originY: 0, fontFamily: "'Inter', sans-serif" }}
                        className="absolute z-50 top-[calc(100%+6px)] left-0 right-0 bg-white border border-neutral-200 rounded-xl shadow-lg shadow-neutral-100 overflow-hidden py-1"
                    >
                        {SORT_OPTIONS.map((opt, i) => {
                            const isActive = opt.value === sortOrder;
                            return (
                                <motion.li
                                    key={opt.value}
                                    role="option"
                                    aria-selected={isActive}
                                    initial={{ opacity: 0, x: -6 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05, duration: 0.15 }}
                                    onClick={() => { setSortOrder(opt.value); setOpen(false); }}
                                    className={`flex items-center gap-2.5 px-4 py-2.5 text-sm cursor-pointer transition-all duration-150 ${
                                        isActive
                                            ? 'bg-cyan-50 text-cyan-600 font-semibold'
                                            : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                                    }`}
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="sort-active-dot"
                                            className="w-1.5 h-1.5 rounded-full bg-cyan-500 flex-shrink-0"
                                        />
                                    )}
                                    {!isActive && <span className="w-1.5 h-1.5 flex-shrink-0" />}
                                    {opt.label}
                                </motion.li>
                            );
                        })}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

/* ─────────────────────────────────────────
   SEARCH & SORT BAR
   ───────────────────────────────────────── */
const SearchSortBar = ({ query, setQuery, sortOrder, setSortOrder, totalResults }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-3 mb-10"
        >
            {/* Search input */}
            <div className="relative flex-1">
                <Search
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                />
                <input
                    id="blog-search"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by title, author, or topic…"
                    className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-800 text-sm placeholder-neutral-400 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 transition-all duration-200"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                />
                {query && (
                    <button
                        onClick={() => setQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                        aria-label="Clear search"
                    >
                        <X size={14} />
                    </button>
                )}
            </div>

            {/* Custom sort dropdown */}
            <SortDropdown sortOrder={sortOrder} setSortOrder={setSortOrder} />

            {/* Result count */}
            {query && (
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="self-center flex-shrink-0 text-[11px] text-neutral-400 tracking-wider uppercase hidden sm:block"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                >
                    {totalResults} result{totalResults !== 1 ? 's' : ''}
                </motion.span>
            )}
        </motion.div>
    );
};

/* ─────────────────────────────────────────
   PAGINATION
   ───────────────────────────────────────── */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const pages = [];
    for (let i = 1; i <= totalPages; i++) pages.push(i);

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="flex items-center justify-center gap-2 mt-14"
        >
            {/* Prev */}
            <button
                id="pagination-prev"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-neutral-200 text-neutral-500 text-xs font-semibold tracking-wider uppercase transition-all duration-200 hover:border-cyan-400 hover:text-cyan-500 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-neutral-200 disabled:hover:text-neutral-500"
                style={{ fontFamily: "'Inter', sans-serif" }}
            >
                <ChevronLeft size={14} />
                Prev
            </button>

            {/* Page numbers */}
            <div className="flex items-center gap-1">
                {pages.map((page) => (
                    <button
                        key={page}
                        id={`pagination-page-${page}`}
                        onClick={() => onPageChange(page)}
                        className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all duration-200 ${
                            page === currentPage
                                ? 'bg-cyan-500 text-white shadow-md shadow-cyan-200'
                                : 'border border-neutral-200 text-neutral-500 hover:border-cyan-400 hover:text-cyan-500'
                        }`}
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        {page}
                    </button>
                ))}
            </div>

            {/* Next */}
            <button
                id="pagination-next"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-neutral-200 text-neutral-500 text-xs font-semibold tracking-wider uppercase transition-all duration-200 hover:border-cyan-400 hover:text-cyan-500 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-neutral-200 disabled:hover:text-neutral-500"
                style={{ fontFamily: "'Inter', sans-serif" }}
            >
                Next
                <ChevronRight size={14} />
            </button>
        </motion.div>
    );
};

/* ─────────────────────────────────────────
   MAIN PAGE
   ───────────────────────────────────────── */
export default function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('newest');
    const [currentPage, setCurrentPage] = useState(1);

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
    const nonFeatured = blogs.filter((b) => !b.featured);

    /* ── Filter + Sort ── */
    const filteredAndSorted = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();

        let result = q
            ? nonFeatured.filter((b) =>
                (b.title || '').toLowerCase().includes(q) ||
                (b.author || '').toLowerCase().includes(q) ||
                (resolveTopic(b) || '').toLowerCase().includes(q) ||
                (b.shortDescription || '').toLowerCase().includes(q)
            )
            : [...nonFeatured];

        result.sort((a, b) => {
            const da = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
            const db = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
            return sortOrder === 'newest' ? db - da : da - db;
        });

        return result;
    }, [nonFeatured, searchQuery, sortOrder]);

    /* ── Pagination ── */
    const totalPages = Math.ceil(filteredAndSorted.length / BLOGS_PER_PAGE);

    const paginatedBlogs = useMemo(() => {
        const start = (currentPage - 1) * BLOGS_PER_PAGE;
        return filteredAndSorted.slice(start, start + BLOGS_PER_PAGE);
    }, [filteredAndSorted, currentPage]);

    /* Reset to page 1 when filter/sort changes */
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, sortOrder]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        // Smooth scroll to top of the blog grid
        document.getElementById('blog-grid-top')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="bg-white min-h-screen text-white">
            <PageSEO title="Blogs" />

            {/* ── Hero ── */}
            <section className="relative min-h-[50vh] pt-24 pb-16 md:pt-32 md:pb-20 flex flex-col items-center justify-center px-6 overflow-hidden">
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

                {/* Search + Sort controls */}
                {!loading && nonFeatured.length > 0 && (
                    <div id="blog-grid-top">
                        <SearchSortBar
                            query={searchQuery}
                            setQuery={setSearchQuery}
                            sortOrder={sortOrder}
                            setSortOrder={setSortOrder}
                            totalResults={filteredAndSorted.length}
                        />
                    </div>
                )}

                {/* Blog grid */}
                {!loading && (
                    <AnimatePresence mode="wait">
                        {paginatedBlogs.length > 0 ? (
                            <motion.div
                                key={`page-${currentPage}-${searchQuery}-${sortOrder}`}
                                variants={CONTAINER_VARIANTS}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                            >
                                {paginatedBlogs.map((blog) => (
                                    <motion.div key={blog._id} variants={CARD_VARIANTS} className="h-full">
                                        <BlogCard blog={blog} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="no-results"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center py-24"
                            >
                                <Search size={36} className="mx-auto text-neutral-300 mb-4" />
                                <p className="text-neutral-500 text-sm tracking-widest uppercase mb-2">
                                    No results found
                                </p>
                                <p className="text-neutral-400 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                                    Try a different keyword or{' '}
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="text-cyan-500 underline underline-offset-2 hover:text-cyan-600"
                                    >
                                        clear the search
                                    </button>
                                    .
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}

                {/* Pagination */}
                {!loading && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}

                {/* Page info */}
                {!loading && totalPages > 1 && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-neutral-400 text-[11px] tracking-widest uppercase mt-4"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        Page {currentPage} of {totalPages} &nbsp;·&nbsp; {filteredAndSorted.length} post{filteredAndSorted.length !== 1 ? 's' : ''}
                    </motion.p>
                )}

                {/* Global empty state */}
                {!loading && nonFeatured.length === 0 && !featured && (
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
