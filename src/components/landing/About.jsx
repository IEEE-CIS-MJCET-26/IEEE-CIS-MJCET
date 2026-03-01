import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import Lenis from 'lenis'
import { ScrollText, Cpu, UsersRound } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
    const sectionRef = useRef(null)
    const textRef = useRef(null)
    const statsRef = useRef(null)
    const pinWrapperRef = useRef(null)

    const stats = [
        {
            icon: ScrollText,
            value: 20,
            suffix: '+',
            title: 'Research Papers',
            subtitle: 'Published in recognized journals and conferences',
            // Futuristic accent tokens
            gradientBorder: 'from-cyan-400 via-sky-500 to-cyan-300',
            glowColor: 'rgba(34,211,238,0.30)',
            glowHover: 'rgba(34,211,238,0.55)',
            iconRingColor: 'shadow-[0_0_0_2px_rgba(34,211,238,0.25)]',
            iconRingHover: 'group-hover:shadow-[0_0_18px_4px_rgba(34,211,238,0.50)]',
            iconBg: 'bg-cyan-950/60',
            iconColor: 'text-cyan-300',
            accentBar: 'bg-gradient-to-r from-cyan-400 to-sky-400',
            numberGlow: '[text-shadow:0_0_18px_rgba(34,211,238,0.7)]',
            shimmerColor: 'bg-cyan-400/10',
            pulseColor: 'bg-cyan-400/10',
        },
        {
            icon: Cpu,
            value: 100,
            suffix: '+',
            title: 'Technical Workshops',
            subtitle: 'Successfully conducted across diverse domains',
            gradientBorder: 'from-violet-400 via-purple-500 to-violet-300',
            glowColor: 'rgba(139,92,246,0.30)',
            glowHover: 'rgba(139,92,246,0.55)',
            iconRingColor: 'shadow-[0_0_0_2px_rgba(139,92,246,0.25)]',
            iconRingHover: 'group-hover:shadow-[0_0_18px_4px_rgba(139,92,246,0.50)]',
            iconBg: 'bg-violet-950/60',
            iconColor: 'text-violet-300',
            accentBar: 'bg-gradient-to-r from-violet-400 to-purple-400',
            numberGlow: '[text-shadow:0_0_18px_rgba(139,92,246,0.7)]',
            shimmerColor: 'bg-violet-400/10',
            pulseColor: 'bg-violet-400/10',
        },
        {
            icon: UsersRound,
            value: 1500,
            suffix: '+',
            title: 'Followers',
            subtitle: 'A growing community across leading social platforms',
            gradientBorder: 'from-emerald-400 via-teal-500 to-emerald-300',
            glowColor: 'rgba(16,185,129,0.30)',
            glowHover: 'rgba(16,185,129,0.55)',
            iconRingColor: 'shadow-[0_0_0_2px_rgba(16,185,129,0.25)]',
            iconRingHover: 'group-hover:shadow-[0_0_18px_4px_rgba(16,185,129,0.50)]',
            iconBg: 'bg-emerald-950/60',
            iconColor: 'text-emerald-300',
            accentBar: 'bg-gradient-to-r from-emerald-400 to-teal-400',
            numberGlow: '[text-shadow:0_0_18px_rgba(16,185,129,0.7)]',
            shimmerColor: 'bg-emerald-400/10',
            pulseColor: 'bg-emerald-400/10',
        }
    ]

    useEffect(() => {
        if (!sectionRef.current || !textRef.current || !statsRef.current || !pinWrapperRef.current) return

        const lenis = new Lenis()
        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)

        const text = new SplitType(textRef.current, {
            types: 'chars,words',
        })

        let ctx = gsap.context(() => {

            const masterTl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: '+=180%',
                    pin: pinWrapperRef.current,
                    pinSpacing: true,
                    scrub: 0.4,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                }
            })

            const counters = statsRef.current.querySelectorAll('.stat-count')

            text.chars.forEach((char, i) => {
                const isHighlighted = char.parentElement.closest('.highlight')
                const charDelay = i * 0.0005

                masterTl.fromTo(
                    char,
                    { opacity: 0.15, color: isHighlighted ? '#737373' : undefined },
                    {
                        opacity: 1,
                        color: isHighlighted ? '#22d3ee' : undefined,
                        duration: 0.4,
                        ease: 'none'
                    },
                    charDelay
                )
            })

            ScrollTrigger.create({
                trigger: statsRef.current,
                start: 'top 85%',
                once: true, // IMPORTANT: prevents reset
                onEnter: animateCounters
            })

            function animateCounters() {
                counters.forEach((counter, index) => {
                    const target = stats[index].value
                    const isFloat = !Number.isInteger(target)

                    gsap.fromTo(counter,
                        { textContent: 0 },
                        {
                            textContent: target,
                            duration: 2,
                            ease: 'power2.out',
                            snap: { textContent: isFloat ? 0.1 : 1 },
                            onUpdate() {
                                const val = parseFloat(counter.textContent)
                                counter.textContent = isFloat
                                    ? val.toFixed(1)
                                    : Math.ceil(val).toLocaleString()
                            }
                        }
                    )
                })
            }

        }, sectionRef)   // ✅ CLOSE gsap.context PROPERLY

        return () => {
            lenis.destroy()
            text.revert()
            ctx.revert()
        }
    }, [])

    return (
        <section
            ref={sectionRef}
            className="relative z-10 bg-white text-black"
        >
            <div
                ref={pinWrapperRef}
                className="relative z-content w-full cursor-pointer min-h-screen md:h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 pt-28 pb-16 md:pt-44 md:pb-20"
            >
                <div className="max-w-6xl w-full flex flex-col items-center">
                    {/* Header Label */}
                    <div className="flex justify-center mb-4 md:mb-8">
                        <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-cyan-400 uppercase tracking-tight">
                            ABOUT US
                        </span>
                    </div>

                    {/* Main Text Content */}
                    <div className="w-full max-w-5xl mb-6 md:mb-12">
                        <p
                            ref={textRef}
                            className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-relaxed text-center text-neutral-500"
                            style={{ wordSpacing: '0.15em' }}
                        >
                            The{" "}
                            <span className="highlight">IEEE Computational Intelligence Society (CIS) Student Chapter at MJCET</span>{" "}
                            is a community of students interested in{" "}
                            <span className="highlight">computational intelligence</span>{" "}
                            and{" "}
                            <span className="highlight">emerging technologies</span>, bringing together individuals from diverse engineering backgrounds to learn and innovate. The chapter emphasizes{" "}
                            <span className="highlight">hands-on learning</span>{" "}
                            through projects, workshops, competitions, and expert talks, helping members bridge the gap between theory and practical application. Through collaboration and IEEE’s global network, the chapter fosters professional growth while encouraging students to turn{" "}
                            <span className="highlight">ideas into real-world impact</span>.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div
                        ref={statsRef}
                        className="w-full cursor-pointer grid grid-cols-1 mb-4 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-10 items-stretch"
                    >
                        {stats.map((stat, index) => (
                            /*
                             * Gradient-border trick:
                             * outer div = gradient bg + 1px padding → inner div = dark card
                             * This gives an animated neon border without pseudo-elements.
                             */
                            <div
                                key={index}
                                className={[
                                    'group relative rounded-2xl sm:rounded-3xl h-full',
                                    'animate-stat-border-spin',
                                    index === 2 ? 'sm:col-span-2 md:col-span-1 sm:max-w-md sm:mx-auto md:max-w-none md:mx-0' : '',
                                ].join(' ')}
                                style={{
                                    background: `linear-gradient(135deg, ${stat.glowColor}, ${stat.glowHover}, ${stat.glowColor})`,
                                    backgroundSize: '200% 200%',
                                    animation: 'stat-border-spin 3s linear infinite',
                                    padding: '1.5px',
                                }}
                            >
                                {/* Inner dark glass card */}
                                <div
                                    className={[
                                        'relative flex flex-col items-center',
                                        'p-5 sm:p-7',
                                        'bg-[#080e1c]/90 backdrop-blur-md',
                                        'rounded-2xl sm:rounded-3xl',
                                        'overflow-hidden',
                                        'h-full',
                                        'transition-all duration-200 ease-out',
                                        'hover:-translate-y-2 hover:scale-[1.02]',
                                    ].join(' ')}
                                    style={{
                                        boxShadow: `0 0 0 0 transparent`,
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.boxShadow = `0 20px 60px ${stat.glowHover}, 0 0 30px ${stat.glowColor} inset`
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.boxShadow = `0 0 0 0 transparent`
                                    }}
                                >
                                    {/* Ambient glow blob (always-on, subtle) */}
                                    <div
                                        className="absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full blur-2xl pointer-events-none animate-stat-glow-pulse"
                                        style={{ background: stat.glowColor }}
                                    />

                                    {/* Shimmer sweep on hover */}
                                    <div
                                        className={`absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 overflow-hidden rounded-2xl sm:rounded-3xl`}
                                    >
                                        <div
                                            className={`absolute inset-y-0 w-1/3 ${stat.shimmerColor} blur-sm group-hover:animate-stat-shimmer`}
                                            style={{ left: '-33%' }}
                                        />
                                    </div>

                                    {/* Top accent bar */}
                                    <div
                                        className={`absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-3/4 rounded-b-full ${stat.accentBar} transition-all duration-200 ease-out`}
                                    />

                                    {/* Icon container with neon glow ring */}
                                    <div
                                        className={[
                                            'relative mb-4 sm:mb-5 z-10',
                                            'flex items-center justify-center',
                                            'w-14 h-14 sm:w-16 sm:h-16',
                                            'rounded-xl',
                                            stat.iconBg,
                                            stat.iconColor,
                                            stat.iconRingColor,
                                            stat.iconRingHover,
                                            'transition-all duration-200 ease-out',
                                            'group-hover:scale-110 group-hover:rotate-3',
                                        ].join(' ')}
                                    >
                                        <stat.icon size={26} className="sm:w-7 sm:h-7" strokeWidth={1.75} />
                                    </div>

                                    {/* Number + Suffix — .stat-count kept exactly */}
                                    <div className="flex items-baseline mb-1 sm:mb-2 z-10 relative">
                                        <span
                                            className={[
                                                'stat-count',
                                                'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black',
                                                'text-white',
                                                'transition-all duration-200',
                                                `group-hover:${stat.numberGlow}`,
                                            ].join(' ')}
                                        >
                                            0
                                        </span>
                                        <span
                                            className={[
                                                'text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black',
                                                'text-white',
                                                'transition-all duration-200',
                                                `group-hover:${stat.numberGlow}`,
                                            ].join(' ')}
                                        >
                                            {stat.suffix}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="z-10 relative text-sm sm:text-base md:text-lg font-black text-neutral-200 mb-2 sm:mb-3 uppercase tracking-wider line-clamp-1 transition-colors duration-200 group-hover:text-white">
                                        {stat.title}
                                    </h3>

                                    {/* Animated accent divider */}
                                    <div
                                        className={`z-10 relative h-[2px] w-[16px] group-hover:w-[56px] ${stat.accentBar} mx-auto mb-3 sm:mb-4 transition-all duration-200 ease-out rounded-full opacity-50 group-hover:opacity-100`}
                                        style={{ filter: 'drop-shadow(0 0 4px currentColor)' }}
                                    />

                                    {/* Subtitle */}
                                    <p className="z-10 relative text-neutral-500 text-[10px] sm:text-xs md:text-sm font-medium leading-relaxed max-w-[180px] text-center group-hover:text-neutral-400 transition-colors duration-200">
                                        {stat.subtitle}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )

}