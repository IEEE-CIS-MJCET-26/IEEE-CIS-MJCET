import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const activities = [
    {
        title: "INTERNAL WORKSHOPS",
        description: "We conduct hands-on internal workshops to upskill our members in rapidly growing and in-demand technologies, focusing on practical learning, real-world use cases, and industry-relevant skills.",
        image: "/HSImages/Internal Workshops.png"
    },
    {
        title: "HACKATHONS",
        description: "Our teams actively participate in hackathons, consistently delivering innovative solutions and achieving frequent wins through strong collaboration and problem-solving skills.",
        image: "/HSImages/Hackathons.png"
    },
    {
        title: "TECHNICAL WORKSHOPS",
        description: "We host technical workshops on campus to equip students with hands-on knowledge of high-end technologies in computational intelligence,cyber security, machine learning and game development, bridging the gap between theory and real-world applications.",
        image: "/HSImages/tech workshops.jpg"
    },
    {
        title: "INTERNAL TEAM BONDING SESSIONS",
        description: "We strengthen team spirit through football, post-event lunches, iftar gatherings, and fun internal games that boost morale and collaboration.",
        image: "/HSImages/Internal.png"
    },
    {
        title: "INDUSTRIAL TRIPS",
        description: "We organize visits to companies, industries, and factories to explore real-world technologies beyond textbooks and computer screens.",
        image: "/HSImages/Field Trips.png"
    },
    {
        title: "FUN EVENTS",
        description: "We host large-scale fun events that help students break the routine, relax, and enjoy a refreshing campus experience.",
        image: "/HSImages/Mystery Mania.jpg"
    },
    {
        title: "inCISive",
        description: "Our very first magazine that showcases our new standards, recent achievements, and key moments that define our journey.",
        image: "/HSImages/incisive.png",
        link: "https://heyzine.com/flip-book/15d3f672a5.html#page/1"
    },
    {
        title: "PRESS SEGMENTS",
        description: "We host engaging press segments and interviews with people from diverse backgrounds.These conversations keep our social media audience informed, inspired, and closely connected to real stories.",
        image: "/HSImages/press.jpg"
    },
    {
        title: "DONATION DRIVES",
        description: "We conduct donation drives in collaboration with other campus clubs during the winter season and Ramadan to support the underprivileged and ease their daily living.",
        image: "/HSImages/Drives.png"
    }
]


export default function HorizontalScroll() {
    const sectionRef = useRef(null)
    const pinRef = useRef(null)
    const scrollRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!scrollRef.current || !pinRef.current || !sectionRef.current) return

            gsap.to(scrollRef.current, {
                x: () => -(scrollRef.current.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: () => "+=" + (scrollRef.current.scrollWidth - window.innerWidth),
                    scrub: 1,
                    pin: pinRef.current,
                    pinSpacing: true,
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                },
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            id="activities"
            className="relative bg-white z-content"
        >

            <div
                ref={pinRef}
                className="relative z-content h-screen w-full flex flex-col pt-24 pb-12 md:pt-32 md:pb-16 px-6 md:px-12 overflow-hidden"
            >
                {/* Fixed Title within the pinned section */}
                <div className="max-w-7xl mx-auto w-full mb-10 md:mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-cyan-400 uppercase leading-[1.1] text-center">
                        OUR ACTIVITIES <br className="hidden md:block" /> AND ACHIEVEMENTS
                    </h2>
                </div>

                {/* Horizontal Scrolling Wrapper */}
                <div className="flex-1 relative overflow-hidden">
                    <div
                        ref={scrollRef}
                        className="flex h-full w-max items-stretch gap-6 md:gap-12 lg:gap-20"
                    >
                        {activities.map((item, index) => (
                            <div
                                key={index}
                                className="w-screen h-full flex flex-col items-center justify-center shrink-0 px-6 md:px-12 lg:px-24"
                            >
                                {/* Card Container: Bounded and Cohesive */}
                                <div className="group relative flex flex-col md:flex-row w-full max-w-6xl h-full max-h-[500px] md:max-h-[550px] border-4 border-black hover:border-cyan-400 rounded-3xl overflow-hidden bg-white transition-all duration-500 hover:shadow-[0_0_50px_rgba(34,211,238,0.3)]">

                                    {/* Left: Image Area (45% on desktop) */}
                                    <div className="w-full md:w-[45%] h-64 md:h-auto overflow-hidden relative border-b-4 md:border-b-0 md:border-r-4 group-hover:border-cyan-400/20">
                                        <div className="absolute inset-0 bg-cyan-400/5 z-0 pointer-events-none group-hover:bg-transparent transition-colors duration-500"></div>
                                        <div className="relative z-10 w-full h-full">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                                            />
                                        </div>
                                    </div>

                                    {/* Right: Text Area (55% on desktop) */}
                                    <div className="w-full md:w-[55%] p-6 md:p-10 lg:p-14 flex flex-col justify-center bg-white relative">
                                        <div className="max-w-xl">
                                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black mb-3 transition-colors duration-500 group-hover:text-cyan-400  leading-tight">
                                                {item.title}
                                            </h3>
                                            <div className="h-1.5 w-16 bg-black mb-6 rounded-full transition-all duration-500 group-hover:w-32 group-hover:bg-cyan-400"></div>
                                            <p className="text-sm md:text-base lg:text-lg font-medium text-neutral-600 leading-relaxed mb-8">
                                                {item.description}
                                            </p>

                                            {item.link && (
                                                <a
                                                    href={item.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center px-8 py-3 bg-cyan-400 text-white font-black rounded-xl hover:bg-black transition-all duration-300 hover:scale-105 w-fit"
                                                >
                                                    READ IT OUT
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/*
                          Trailing spacer — mobile only (md:hidden).
                          Gives the GSAP scroll track the extra width it needs so the
                          last card can fully scroll into view before the animation ends.
                          On desktop the px-12/px-24 card padding already provides
                          enough clearance, so no spacer is needed there.
                        */}
                        <div className="shrink-0 w-6 md:hidden" aria-hidden="true" />
                    </div>
                </div>
            </div>
        </section>
    )
}

