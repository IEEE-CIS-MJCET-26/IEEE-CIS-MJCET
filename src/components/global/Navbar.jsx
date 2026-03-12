import { useState, useRef, useLayoutEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { pathname } = useLocation()

    // Refs for pill measurement
    const containerRef = useRef(null)
    const linkRefs = useRef({})
    const [pillStyle, setPillStyle] = useState(null)

    const navLinks = [
        { name: 'HOME', href: '/' },
        { name: 'TEAM', href: '/team' },
        { name: 'EVENTS', href: '/events' },
        { name: 'BLOGS', href: '/blogs' },
        { name: 'CONTACT US', href: '/contact' },
    ]

    const isContact = (href) => href === '/contact'
    const isActive = (href) =>
        href === '/' ? pathname === '/' : pathname.startsWith(href)

    /* ── Measure the active nav link and position the pill ── */
    useLayoutEffect(() => {
        const activeLink = navLinks.find(
            (l) => !isContact(l.href) && isActive(l.href)
        )
        if (!activeLink || !linkRefs.current[activeLink.name] || !containerRef.current) {
            setPillStyle(null)
            return
        }
        const containerRect = containerRef.current.getBoundingClientRect()
        const linkRect = linkRefs.current[activeLink.name].getBoundingClientRect()
        setPillStyle({
            left: linkRect.left - containerRect.left,
            top: linkRect.top - containerRect.top,
            width: linkRect.width,
            height: linkRect.height,
        })
    }, [pathname])

    /* ── Mobile menu variants ─── */
    const menuVariants = {
        hidden: {
            scaleY: 0,
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
        },
        visible: {
            scaleY: 1,
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
        },
    }

    const navLinksContainerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
        exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    }

    const navLinkVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } },
        exit: { y: 50, opacity: 0, transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] } },
    }

    return (
        <>
            {/* ── Desktop & Mobile Navbar ─────────────────── */}
            <motion.nav
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="fixed top-0 left-0 right-0 z-50
                           bg-black/70 backdrop-blur-md
                           border-b border-white/10
                           transition-[background,backdrop-filter] duration-300"
            >
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between">

                        {/* Logo */}
                        <div className="flex items-center py-2">
                            <Link to="/">
                                <motion.img
                                    src="/assets/White Logo.png"
                                    alt="IEEE CIS"
                                    className="h-16 md:h-28 w-auto object-contain -my-2 md:-my-4 cursor-pointer"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.2, ease: 'easeOut' }}
                                />
                            </Link>
                        </div>

                        {/* Desktop Links */}
                        <div
                            ref={containerRef}
                            className="hidden md:flex items-center gap-1 relative"
                        >
                            {/* Single animated pill — driven by measured DOM bounds */}
                            {pillStyle && (
                                <motion.div
                                    className="absolute rounded-full bg-cyan-400 pointer-events-none"
                                    initial={false}
                                    animate={{
                                        left: pillStyle.left,
                                        top: pillStyle.top,
                                        width: pillStyle.width,
                                        height: pillStyle.height,
                                    }}
                                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                    style={{ zIndex: 0 }}
                                />
                            )}

                            {navLinks.map((link) => {
                                const active = isActive(link.href)
                                const contact = isContact(link.href)

                                /* CONTACT US → bordered pill CTA */
                                if (contact) {
                                    return (
                                        <Link
                                            key={link.name}
                                            to={link.href}
                                            className={`
                                                relative px-4 py-1.5 rounded-full text-sm font-semibold
                                                tracking-wider border transition-all duration-300 ml-6
                                                ${active
                                                    ? 'border-cyan-400 bg-cyan-400/15 text-cyan-400'
                                                    : 'border-cyan-400/40 text-white/70 hover:bg-cyan-400/10 hover:text-cyan-400 hover:border-cyan-400'
                                                }
                                            `}
                                        >
                                            {link.name}
                                        </Link>
                                    )
                                }

                                return (
                                    <Link
                                        key={link.name}
                                        ref={(el) => { linkRefs.current[link.name] = el }}
                                        to={link.href}
                                        className={`
                                            relative px-4 py-2 text-sm font-medium tracking-wider
                                            rounded-full select-none
                                            ${active ? 'text-black font-semibold' : 'text-white/70 hover:text-white'}
                                        `}
                                        style={{ zIndex: 1 }}
                                    >
                                        {link.name}
                                    </Link>
                                )
                            })}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="md:hidden text-white p-2 hover:text-cyan-400 transition-colors"
                            aria-label="Open menu"
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* ── Mobile Full-Screen Menu ── */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        style={{ originY: 0 }}
                        className="fixed inset-0 z-[60] bg-cyan-500/95 backdrop-blur-lg md:hidden"
                    >
                        <motion.div
                            variants={navLinksContainerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="flex flex-col h-full"
                        >
                            {/* Close Button */}
                            <motion.div variants={navLinkVariants} className="flex justify-end p-6">
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-white p-2 hover:text-white/80 transition-colors"
                                    aria-label="Close menu"
                                >
                                    <X size={32} />
                                </button>
                            </motion.div>

                            {/* Menu Links */}
                            <div className="flex-1 flex flex-col items-center justify-center gap-8">
                                {navLinks.map((link) => (
                                    <motion.div key={link.name} variants={navLinkVariants}>
                                        <Link
                                            to={link.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-white text-4xl font-bold tracking-wider hover:text-white/80 transition-colors duration-300"
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Logo at Bottom */}
                            <motion.div variants={navLinkVariants} className="flex justify-center pb-12">
                                <Link to="/" onClick={() => setIsMenuOpen(false)}>
                                    <img
                                        src="/assets/White Logo.png"
                                        alt="IEEE CIS"
                                        className="h-20 w-auto opacity-100 cursor-pointer"
                                    />
                                </Link>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
