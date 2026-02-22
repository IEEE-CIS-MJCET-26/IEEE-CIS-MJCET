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
            subtitle: 'Successfully Published'
        },
        {
            icon: Cpu,
            value: 100,
            suffix: '+',
            title: 'Technical Workshops',
            subtitle: 'Organized'
        },
        {
            icon: UsersRound,
            value: 1500,
            suffix: '+',
            title: 'Followers',
            subtitle: 'Across social media platforms like LinkedIn, Instagram and Twitter'
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
                end: '+=300%',
                pin: pinWrapperRef.current,
                pinSpacing: true,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            }
        })

        const counters = statsRef.current.querySelectorAll('.stat-count')

        text.chars.forEach((char, i) => {
            const isHighlighted = char.parentElement.closest('.highlight')
            const charDelay = i * 0.02

            masterTl.fromTo(
                char,
                { opacity: 0.15, color: isHighlighted ? '#737373' : undefined },
                {
                    opacity: 1,
                    color: isHighlighted ? '#22d3ee' : undefined,
                    duration: 0.8,
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
            className="relative bg-white text-black overflow-hidden"
        >
            <div
                ref={pinWrapperRef}
                className="relative z-content w-full cursor-pointer min-h-screen md:h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 pt-28 pb-12 md:pt-32 md:pb-16"
            >
                <div className="max-w-6xl w-full flex flex-col items-center">
                    {/* Header Label */}
                    <div className="flex justify-center mb-4 md:mb-8">
                        <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-cyan-400 uppercase">
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
                        className="w-full cursor-pointer grid grid-cols-1 mb-4 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-10"
                    >
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className={`group flex flex-col items-center p-4 sm:p-6 bg-white border-2 border-neutral-100 rounded-2xl sm:rounded-3xl transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(34,211,238,0.15)] hover:border-cyan-400/30 ${index === 2 ? 'sm:col-span-2 md:col-span-1 sm:max-w-md sm:mx-auto md:max-w-none md:mx-0' : ''}`}
                            >
                                <div className="mb-3 sm:mb-4 text-neutral-400 transition-colors duration-500 group-hover:text-cyan-400">
                                    <stat.icon size={32} className="sm:w-11 sm:h-11" strokeWidth={1.5} />
                                </div>

                                <div className="flex flex-col items-center text-center">
                                    <div className="flex items-baseline mb-1 sm:mb-2">
                                        <span className="stat-count text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-black transition-colors duration-500 group-hover:text-cyan-400">
                                            0
                                        </span>
                                        <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-black transition-colors duration-500 group-hover:text-cyan-400">
                                            {stat.suffix}
                                        </span>
                                    </div>
                                    <h3 className="text-sm sm:text-base md:text-lg font-black text-black mb-2 sm:mb-3 uppercase tracking-wider transition-colors duration-500 group-hover:text-cyan-400 line-clamp-1">
                                        {stat.title}
                                    </h3>
                                    <div className='h-[3px] sm:h-[4px] w-[15px] sm:w-[20px] bg-neutral-200 mx-auto mb-3 sm:mb-4 group-hover:bg-cyan-400 group-hover:w-[60px] transition-all duration-500 ease-out rounded-full'></div>
                                    <p className="text-neutral-500 text-[10px] sm:text-xs md:text-sm font-medium leading-relaxed max-w-[180px]">
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