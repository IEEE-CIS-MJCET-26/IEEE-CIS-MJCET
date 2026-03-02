import { Link } from 'react-router-dom'
import { Linkedin, Instagram, Github, ArrowUpRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import noumanImg from '../../assets/GB PICS/WEB MASTER.png'
import hafeezImg from '../../assets/GB PICS/Abdul Hafeez.png'
import arfanImg from '../../assets/Arfan.png'

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

    const developers = [
        { name: 'Mohammed Nouman', role: 'Web Master', initials: 'MN', color: '#22d3ee', image: noumanImg, imageStyle: { scale: '1.75', objectPosition: 'center 15%' } },
        { name: 'Abdul Hafeez', role: 'Chairman', initials: 'AH', color: '#2481fb', image: hafeezImg, imageStyle: { scale: '1.5', objectPosition: 'center 0%' } },
        { name: 'Mohammed Arfan', role: 'Tech Head', initials: 'MA', color: '#818cf8', image: arfanImg, imageStyle: { scale: '1.3', objectPosition: 'center center' } },
        { name: 'Abdullah Quadri', role: 'Associate Tech Head', initials: 'AQ', color: '#34d399', image: '/assets/team/execom/Abdullah.jpg', imageStyle: { scale: '1.1', objectPosition: 'center 10%' } },
        { name: 'Mohammed Ozier Nawaz', role: 'Tech Core', initials: 'ON', color: '#f472b6', image: '/assets/team/core/ozier.jpeg', imageStyle: { scale: '1.1', objectPosition: 'center top' } },
        { name: 'Zaina Tahniyat', role: 'Tech Core', initials: 'ZT', color: '#fb923c', image: '/assets/team/core/ZAINA TAHNIYATH.jpg', imageStyle: { scale: '1.1', objectPosition: 'center top' } },
        { name: 'Omar Hussain Shaikh', role: 'Tech Core', initials: 'OS', color: '#a855f7', image: '/assets/team/core/Omar hussan.jpg', imageStyle: { scale: '1.1', objectPosition: 'center top' } },
        { name: 'Amreen Fathima', role: 'Tech Core', initials: 'AF', color: '#06b6d4', image: '/assets/team/core/amreen fathima.jpeg', imageStyle: { scale: '1.3', objectPosition: 'center top' } },
    ]

    return (
        <footer className="relative z-footer bg-black text-white">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Left Section - Logo & Description */}
                    <div className="space-y-6">
                        <Link to="/">
                            <img
                                src="/assets/White Logo.png"
                                alt="IEEE CIS"
                                className="h-28 w-auto object-contain cursor-pointer"
                            />
                        </Link>
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
                            <a
                                href="https://github.com/IEEE-CIS-MJCET-26"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 cursor-pointer"
                            >
                                <Github size={24} />
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
                                    href="mailto:ieeecismjcet@gmail.com"
                                    className="text-gray-300 text-sm hover:text-cyan-400 transition-colors duration-300 cursor-pointer"
                                >
                                    Email: ieeecismjcet@gmail.com
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
                <div className="mt-8 pt-6 border-t border-gray-800">
                    <h3 className="text-xs font-bold text-center tracking-[0.3em] text-gray-500 uppercase mb-8">CRAFTED BY</h3>

                    <style>{`
                        @keyframes dev-ring-pulse {
                            0%   { transform: translate(-50%, -50%) scale(1);    opacity: 0.55; }
                            50%  { transform: translate(-50%, -50%) scale(1.28); opacity: 0; }
                            100% { transform: translate(-50%, -50%) scale(1);    opacity: 0.55; }
                        }
                        .dev-ring {
                            animation: dev-ring-pulse 4s ease-in-out infinite;
                            position: absolute;
                            border-radius: 50%;
                            pointer-events: none;
                        }
                        .dev-card:hover .dev-ring { animation-play-state: paused; opacity: 0.8; }
                        .dev-avatar {
                            transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease;
                            position: relative;
                            z-index: 1;
                        }
                        .dev-card:hover .dev-avatar {
                            transform: scale(1.08) translateY(-3px);
                        }
                        .dev-tooltip {
                            opacity: 0;
                            transform: translateY(6px);
                            transition: opacity 0.25s ease, transform 0.25s ease;
                            pointer-events: none;
                        }
                        .dev-card:hover .dev-tooltip {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    `}</style>

                    <div className="flex justify-center items-center gap-5 sm:gap-6 lg:gap-4 xl:gap-8 flex-wrap lg:flex-nowrap">
                        {developers.map((dev, index) => (
                            <div
                                key={index}
                                className="dev-card flex flex-col items-center cursor-pointer"
                                onMouseEnter={() => setHoveredDev(index)}
                                onMouseLeave={() => setHoveredDev(null)}
                            >
                                {/* Tooltip above */}
                                <div className="dev-tooltip mb-3 text-center">
                                    <div
                                        className="px-2.5 py-1 rounded-xl text-[10px] sm:text-xs font-bold whitespace-nowrap"
                                        style={{
                                            background: `linear-gradient(135deg, ${dev.color}22, ${dev.color}11)`,
                                            border: `1px solid ${dev.color}55`,
                                            color: dev.color,
                                            backdropFilter: 'blur(8px)'
                                        }}
                                    >
                                        {dev.name}
                                    </div>
                                    <p className="text-gray-500 text-[10px] mt-1 tracking-wider">{dev.role}</p>
                                </div>

                                {/* Ring + Avatar wrapper — overflow hidden keeps ring clipped */}
                                <div
                                    className="relative flex items-center justify-center"
                                    style={{ width: '80px', height: '80px' }}
                                >
                                    {/* Pulsing ring — clipped to this wrapper */}
                                    <div
                                        className="dev-ring"
                                        style={{
                                            width: '100%', height: '100%',
                                            top: '50%', left: '50%',
                                            border: `1.5px solid ${dev.color}`,
                                        }}
                                    />

                                    {/* Avatar circle */}
                                    <div
                                        className="dev-avatar w-16 h-16 rounded-full overflow-hidden flex items-center justify-center text-lg font-black select-none"
                                        style={{
                                            background: `linear-gradient(135deg, ${dev.color}33, ${dev.color}11)`,
                                            border: `2px solid ${dev.color}88`,
                                            boxShadow: `0 0 20px ${dev.color}44, 0 0 6px ${dev.color}22 inset`,
                                            color: dev.color,
                                        }}
                                    >
                                        {dev.image ? (
                                            <img
                                                src={dev.image}
                                                alt={dev.name}
                                                className="w-full h-full object-cover"
                                                style={{
                                                    scale: dev.imageStyle?.scale ?? '1',
                                                    objectPosition: dev.imageStyle?.objectPosition ?? 'center center',
                                                }}
                                            />
                                        ) : (
                                            dev.initials
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Animated Text Section */}
                    <div className="mt-6 text-center">
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
                        © {new Date().getFullYear()} Made by <Link to="/" className='text-white hover:text-cyan-400 transition-colors duration-300 font-bold'>IEEE CIS - MJCET</Link>. All rights reserved
                    </p>
                </div>
            </div>
        </footer>
    )
}
