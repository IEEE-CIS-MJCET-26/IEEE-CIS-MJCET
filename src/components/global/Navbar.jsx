import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const navLinks = [
        { name: 'HOME', href: '/' },
        { name: 'TEAM', href: '/team' },
        { name: 'EVENTS', href: '/events' },
        { name: 'CONTACT US', href: '/contact' },
    ]

    const menuVariants = {
        hidden: {
            scaleY: 0,
            transition: {
                duration: 0.5,
                ease: [0.76, 0, 0.24, 1],
                delay: 0.3, // Wait for nav links to exit first
            },
        },
        visible: {
            scaleY: 1,
            transition: {
                duration: 0.5,
                ease: [0.76, 0, 0.24, 1],
            },
        },
    }

    // Parent container for staggered children
    const navLinksContainerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
        exit: {
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1,
            },
        },
    }

    // Individual nav link animation - vertical from below
    const navLinkVariants = {
        hidden: {
            y: 50,
            opacity: 0,
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: [0.76, 0, 0.24, 1],
            },
        },
        exit: {
            y: 50,
            opacity: 0,
            transition: {
                duration: 0.3,
                ease: [0.76, 0, 0.24, 1],
            },
        },
    }

    return (
        <>
            {/* Desktop & Mobile Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black  ">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center py-2">
                            <img
                                src="/assets/White Logo.png"
                                alt="IEEE CIS"
                                className="h-16 md:h-20 w-auto object-contain -my-2"
                            />
                        </div>

                        {/* Desktop Links */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="text-white font-medium text-sm tracking-wider hover:text-cyan-400 transition-colors duration-300"
                                >
                                    {link.name}
                                </Link>
                            ))}
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
            </nav>

            {/* Mobile Full-Screen Menu with Framer Motion */}
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
                            <motion.div
                                variants={navLinkVariants}
                                className="flex justify-end p-6"
                            >
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-white p-2 hover:text-white/80 transition-colors"
                                    aria-label="Close menu"
                                >
                                    <X size={32} />
                                </button>
                            </motion.div>

                            {/* Menu Links with Staggered Animation */}
                            <div className="flex-1 flex flex-col items-center justify-center gap-8">
                                {navLinks.map((link) => (
                                    <motion.div
                                        key={link.name}
                                        variants={navLinkVariants}
                                    >
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
                            <motion.div
                                variants={navLinkVariants}
                                className="flex justify-center pb-12"
                            >
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
