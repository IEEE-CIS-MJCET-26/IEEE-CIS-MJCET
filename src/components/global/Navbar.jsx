import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { pathname } = useLocation()

    const navLinks = [
        { name: 'HOME', href: '/' },
        { name: 'TEAM', href: '/team' },
        { name: 'EVENTS', href: '/events' },
        { name: 'BLOGS', href: '/blogs' },
        { name: 'CONTACT US', href: '/contact' },
    ]

    /* ── Mobile menu variants (unchanged logic) ─── */
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

    const isContact = (href) => href === '/contact'
    const isActive = (href) =>
        href === '/' ? pathname === '/' : pathname.startsWith(href)

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
                            <motion.img
                                src="/assets/White Logo.png"
                                alt="IEEE CIS"
                                className="h-16 md:h-28 w-auto object-contain -my-2 md:-my-4 cursor-pointer"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2, ease: 'easeOut' }}
                            />
                        </div>

                        {/* Desktop Links */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => {
                                const active = isActive(link.href)
                                const contact = isContact(link.href)

                                /* CONTACT US → pill CTA style */
                                if (contact) {
                                    return (
                                        <Link
                                            key={link.name}
                                            to={link.href}
                                            className={`
                                                relative px-4 py-1.5 rounded-full text-sm font-semibold
                                                tracking-wider border transition-all duration-300
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

                                /* Regular links with animated underline */
                                return (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        className={`
                                            group relative flex flex-col items-center gap-0.5
                                            text-sm font-medium tracking-wider
                                            transition-colors duration-300
                                            ${active ? 'text-cyan-400' : 'text-white/70 hover:text-white'}
                                        `}
                                    >
                                        {link.name}

                                        {/* Animated underline */}
                                        {active ? (
                                            <motion.span
                                                layoutId="nav-underline"
                                                className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-cyan-400"
                                            />
                                        ) : (
                                            <span
                                                className="absolute -bottom-1 left-0 h-[2px] w-0 rounded-full
                                                           bg-cyan-400 transition-all duration-300
                                                           group-hover:w-full"
                                            />
                                        )}
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

            {/* ── Mobile Full-Screen Menu (logic & variants unchanged) ── */}
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
                                <img
                                    src="/assets/White Logo.png"
                                    alt="IEEE CIS"
                                    className="h-20 w-auto opacity-100"
                                />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
