import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import hafeez from '../../assets/GB PICS/Abdul Hafeez.png';
import haifa from '../../assets/GB PICS/Haifa.png';
import rayyan from '../../assets/GB PICS/Rayyan.png';
import hareem from '../../assets/GB PICS/Hareem.png';
import ahad from '../../assets/GB PICS/Abdul Ahad.png';
import nouman from '../../assets/GB PICS/Nouman.png';
import psa from '../../assets/GB PICS/PSA Khan.png';

gsap.registerPlugin(ScrollTrigger);

const GB_DATA = {
    row1: [
        { name: "Abdul Hafeez", designation: "Chairman", image: hafeez },
        { name: "Haifa Nazeer", designation: "Vice-Chair", image: haifa },
        { name: "Rayyan Siddiqi", designation: "General Secretary", image: rayyan },
        { name: "Ahamadi Hareem", designation: "Joint Secretary", image: hareem },
    ],
    row2: [
        { name: "Abdul Ahad", designation: "Treasurer", image: ahad },
        { name: "Mohammed Nouman", designation: "Web Master", image: nouman },
        { name: "PSA Khan", designation: "Liaison Head", image: psa },
    ]
};

const Marquee = () => {
    const marqueeRef = useRef(null);

    useEffect(() => {
        const marquee = marqueeRef.current;
        if (!marquee) return;

        let animation;
        const initAnimation = () => {
            if (animation) animation.kill();
            const unitWidth = marquee.children[0].offsetWidth;
            animation = gsap.to(marquee, {
                x: -unitWidth,
                duration: 25,
                ease: 'none',
                repeat: -1,
                modifiers: {
                    x: gsap.utils.unitize(x => parseFloat(x) % unitWidth)
                }
            });
        };

        const timer = setTimeout(initAnimation, 100);
        window.addEventListener('resize', initAnimation);
        return () => {
            if (animation) animation.kill();
            window.removeEventListener('resize', initAnimation);
            clearTimeout(timer);
        };  
    }, []);

    const TextItem = ({ isOutlined }) => (
        <div className="flex items-center gap-8 md:gap-16 whitespace-nowrap px-4 md:px-8">
            <span
                className={`text-[6vw] md:text-[5vw] font-black uppercase leading-[1.2] select-none py-12 ${isOutlined ? "text-transparent" : "text-cyan-400"
                    }`}
                style={isOutlined ? { WebkitTextStroke: "2px #22d3ee" } : {}}
            >
                GOVERNING BODY
            </span>
            <span className="text-[6vw] md:text-[3vw] font-black text-cyan-400 opacity-20 leading-none">•</span>
        </div>
    );

    const MarqueeUnit = () => (
        <div className="flex items-center">
            <TextItem isOutlined={false} />
            <TextItem isOutlined={true} />
        </div>
    );

    return (
        <div className="bg-white overflow-hidden py-10 border-y border-white">
            <div ref={marqueeRef} className="flex w-max will-change-transform">
                <MarqueeUnit />
                <MarqueeUnit />
                <MarqueeUnit />
                <MarqueeUnit />
                <MarqueeUnit />
            </div>
        </div>
    );
};

const MemberCard = ({ member, isHoverEnabled, hoveredMember, onMouseEnter, onMouseLeave }) => {
    const isSelfHovered = hoveredMember?.name === member.name;
    const isOtherHovered = hoveredMember && hoveredMember.name !== member.name;

    return (
        <div
            className="relative flex flex-col items-center"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >

            {/* Tooltip */}
            <div
                className={`absolute -top-20 left-1/2 -translate-x-1/2 w-max bg-black text-white px-4 py-2 rounded-lg text-center transition-all duration-300 pointer-events-none z-20 ${isSelfHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
            >
                <p className="font-bold text-sm md:text-base">{member.name}</p>
                <p className="text-xs md:text-sm text-cyan-400">{member.designation}</p>
                {/* Arrow */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-black" />
            </div>

            {/* Image Wrapper */}
            <div
                className={`relative w-[24vw] h-[30vw] max-w-[200px] max-h-[260px] 
                md:w-[180px] md:h-[340px] lg:w-[210px] lg:h-[380px] 
                overflow-hidden transition-all duration-500 will-change-[filter,transform]
                ${isOtherHovered ? "blur-md grayscale scale-95" : "blur-0 scale-100"}
                ${isSelfHovered ? "grayscale-0" : "grayscale"}`}
            >
                <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                />

                {/* White fade at bottom */}
                 <div className="pointer-events-none absolute bottom-0 left-0 w-full h-1/4 
                bg-gradient-to-t from-white/90 via-white/40 to-transparent" />
            </div>
        </div>
    );
};

const GB = () => {
    const sectionRef = useRef(null);
    const row1Ref = useRef(null);
    const row2Ref = useRef(null);
    const [isHoverEnabled, setIsHoverEnabled] = useState(false);
    const [hoveredMember, setHoveredMember] = useState(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top center",
                    end: () => `+=${window.innerHeight * 0.8}`,
                    scrub: true,
                    onUpdate: (self) => {
                        // Enable hover when animation is 95% complete
                        if (self.progress >= 0.35) {
                            setIsHoverEnabled(true);
                        } else {
                            setIsHoverEnabled(false);
                        }
                    }
                }
            });

            // Row 1: All images slide from top to center together
            tl.from(row1Ref.current.children, {
                y: -200,
                opacity: 1,
                ease: "power2.out"
            }, 0);

            // Row 2: All images slide from bottom to center together
            tl.from(row2Ref.current.children, {
                y: 200,
                opacity: 1,
                ease: "power2.out"
            }, 0);
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleMouseEnter = (member) => {
        if (isHoverEnabled) {
            setHoveredMember(member);
        }
    };

    const handleMouseLeave = () => {
        setHoveredMember(null);
    };

    return (
        <section
            ref={sectionRef}
            className="relative bg-white pb-32 overflow-hidden flex flex-col items-center"
        >
            <div className="bg-decorations" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
                <motion.div className=" hidden md:block " style={{
                        position:'absolute',
                        top:'55px',
                        right:'40px',
                        width: '256px',
                        height: '256px',
                        borderRadius:'50%',
                        backgroundColor: 'rgba(34, 211, 238, 0.2)'
                }}
                 animate={{
                        y: [0, -20, 0],
                        rotate: -360
                    }}
                    transition={{
                        y: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
                        rotate: { duration: 40, repeat: Infinity, ease: 'linear' }
                    }}                
            />
                <motion.div
                    style={{
                        position: 'absolute',
                        right: '80px',
                        top: '50%',
                        width: '18px',
                        height: '18px',
                        backgroundColor: 'rgba(14, 204, 242, 0.65)',
                        translateY: '-50%'
                    }}
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                />
                <motion.div
                    style={{
                        position: 'absolute',
                        left: '35%',
                        top: '45%',
                        width: '14px',
                        height: '14px',
                        backgroundColor: 'rgba(14, 204, 242, 0.65)'
                    }}
                    animate={{ rotate: -360 }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                />
                
            </div>
            <Marquee />
            <div className="relative z-content max-w-6xl w-full mx-auto space-y-1">

                {/* Row 1: 4 Members */}
                <div
                    ref={row1Ref}
                    className="flex justify-center items-center gap-3 md:gap-8 px-4"
                >
                    {GB_DATA.row1.map((member, i) => (
                        <MemberCard
                            key={i}
                            member={member}
                            isHoverEnabled={isHoverEnabled}
                            hoveredMember={hoveredMember}
                            onMouseEnter={() => handleMouseEnter(member)}
                            onMouseLeave={handleMouseLeave}
                        />
                    ))}
                </div>

                {/* Row 2: 3 Members */}
                <div
                    ref={row2Ref}
                    className="flex justify-center items-center gap-3 md:gap-8 px-4"
                >
                    {GB_DATA.row2.map((member, i) => (
                        <MemberCard
                            key={i}
                            member={member}
                            isHoverEnabled={isHoverEnabled}
                            hoveredMember={hoveredMember}
                            onMouseEnter={() => handleMouseEnter(member)}
                            onMouseLeave={handleMouseLeave}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default GB;
