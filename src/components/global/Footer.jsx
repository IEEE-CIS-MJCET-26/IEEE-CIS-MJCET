import { Link } from 'react-router-dom'
import { Linkedin, Instagram, ArrowUpRight } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Footer() {
    const [hoveredDev, setHoveredDev] = useState(null)
    const [currentWordIndex, setCurrentWordIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)

    const words = ['BUILD', 'CREATE', 'INNOVATE']

    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true)
            setTimeout(() => {
                setCurrentWordIndex((prev) => (prev + 1) % words.length)
                setIsAnimating(false)
            }, 500) // Fade out duration
        }, 2000) // Switch every 2 seconds

        return () => clearInterval(interval)
    }, [])

    const quickLinks = [
        { name: 'Home', path: '/' },
        { name: 'Team', path: '/team' },
        { name: 'Events', path: '/events' },
        { name: 'Contact Us', path: '/contact' },
    ]

    const developers = Array(6).fill('MOHAMMED NOUMAN')

    return (
        <footer className="relative z-footer bg-black text-white">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Left Section - Logo & Description */}
                    <div className="space-y-6">
                        <img
                            src="/assets/White Logo - Transparent BG.png"
                            alt="IEEE CIS"
                            className="h-28 w-auto object-contain"
                        />
                        <p className="text-gray-300 text-sm leading-relaxed cursor-pointer">
                            IEEE CIS MJCET — empowering students through computational intelligence, innovation, and hands-on learning.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://www.linkedin.com/company/ieee-computational-intelligence-society-mjcet/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 cursor-pointer"
                            >
                                <Linkedin size={24} />
                            </a>
                            <a
                                href="https://www.instagram.com/ieeemjcet_cis/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 cursor-pointer"
                            >
                                <Instagram size={24} />
                            </a>
                        </div>
                    </div>

                    {/* Center Section - Quick Links */}
                    <div className="space-y-6">
                        <h3 className="text-xl cursor-pointer font-bold">QUICK LINKS</h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 cursor-pointer"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right Section - Contact Info */}
                    <div className="space-y-6">
                        {/* Work With Us */}
                        <div className="flex gap-3">
                            <ArrowUpRight
                                size={20}
                                className="text-cyan-400 flex-shrink-0 mt-1 hover:scale-110 transition-transform duration-300 cursor-pointer"
                            />
                            <div>
                                <h4 className="font-semibold cursor-pointer mb-1">WORK WITH US</h4>
                                <a
                                    href="mailto:ieeecis@gmail.com"
                                    className="text-gray-300 text-sm hover:text-cyan-400 transition-colors duration-300 cursor-pointer"
                                >
                                    Email: ieeecis@gmail.com
                                </a>
                            </div>
                        </div>

                        {/* Get In Touch */}
                        <div className="flex gap-3">
                            <ArrowUpRight
                                size={20}
                                className="text-cyan-400 flex-shrink-0 mt-1 hover:scale-110 transition-transform duration-300 cursor-pointer"
                            />
                            <div>
                                <h4 className="font-semibold cursor-pointer mb-1">GET IN TOUCH WITH US</h4>
                                <p className="text-gray-300 text-sm cursor-pointer">Chairman: +91 89787 06886</p>
                                <p className="text-gray-300 text-sm cursor-pointer">Vice Chairperson: +91 88856 27810</p>
                            </div>
                        </div>

                        {/* Find Us */}
                        <div className="flex gap-3">
                            <ArrowUpRight
                                size={20}
                                className="text-cyan-400 flex-shrink-0 mt-1 hover:scale-110 transition-transform duration-300 cursor-pointer"
                            />
                            <div>
                                <h4 className="font-semibold cursor-pointer mb-1">FIND US</h4>
                                <p className="text-gray-300 text-sm leading-relaxed cursor-pointer">
                                    Muffakham Jah College Of Engineering And Technology,<br />
                                    Road No.3, Banjara Hills,<br />
                                    Hyderabad, T.S
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Developers Section */}
                <div className="mt-12 pt-8 border-t border-gray-800">
                    <h3 className="text-xl cursor-pointer font-bold text-center mb-6">DEVELOPERS</h3>
                    <div className="flex justify-center gap-4 flex-wrap">
                        {developers.map((name, index) => (
                            <div
                                key={index}
                                className="relative"
                                onMouseEnter={() => setHoveredDev(index)}
                                onMouseLeave={() => setHoveredDev(null)}
                            >
                                <div className="w-12 h-12 rounded-full bg-gray-800 border-2 border-gray-700 hover:border-cyan-400 transition-colors duration-300 cursor-pointer" />
                                {hoveredDev === index && (
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap">
                                        {name}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Animated Text Section */}
                    <div className="mt-8 text-center">
                        <div className="inline-flex items-center gap-3 mx-auto text-3xl md:text-4xl font-bold">
                            <span
                                className={`text-cyan-400 transition-opacity duration-500 inline-block min-w-[200px] md:min-w-[280px] text-center ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
                            >
                                {words[currentWordIndex]}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <p className="text-center text-gray-400 text-sm cursor-pointer">
                        © Made by <b className='text-white hover:text-cyan-400 transition-colors duration-300'>IEEE CIS - MJCET</b>. All rights reserved
                    </p>
                </div>
            </div>
        </footer>
    )
}
