import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Loader({ onComplete }) {
    const loaderRef = useRef(null)
    const digit1Ref = useRef(null)
    const digit2Ref = useRef(null)
    const digit3Ref = useRef(null)
    const progressBarRef = useRef(null)

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                gsap.to(loaderRef.current, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: onComplete,
                })
            },
        })

        const animateDigit = (digitRef, duration, delay = 0) => {
            const numHeight = digitRef.querySelector('.digit-num').clientHeight
            const totalDistance = (digitRef.querySelectorAll('.digit-num').length - 1) * numHeight

            tl.to(
                digitRef,
                {
                    y: -totalDistance,
                    duration,
                    delay,
                    ease: 'power2.inOut',
                },
                0
            )
        }

        animateDigit(digit3Ref.current, 1.8)
        animateDigit(digit2Ref.current, 2.2)
        animateDigit(digit1Ref.current, 1, 1.5)

        tl.to(
            progressBarRef.current,
            {
                width: '30%',
                duration: 0.8,
                ease: 'power2.inOut',
            },
            0
        )

        tl.to(
            progressBarRef.current,
            {
                width: '100%',
                duration: 1,
                ease: 'power3.out',
            },
            0
        )
    }, '>-0.3')

    return (
        <div
            ref={loaderRef}
            className="fixed inset-0 z-50 flex items-end justify-end gap-2 sm:gap-3 bg-cyan-500 p-4 sm:p-6 md:p-8"
        >
            <p className="text-3xl sm:text-4xl  md:text-6xl font-bold font-russo uppercase text-white">Loading</p>

            <div className="flex h-10 sm:h-16 md:h-24 text-4xl sm:text-6xl md:text-8xl font-bold  leading-none text-white overflow-hidden">
                <div ref={digit1Ref} className="relative w-[1ch]">
                    <div className="digit-num">0</div>
                    <div className="digit-num">1</div>
                </div>

                <div ref={digit2Ref} className="relative w-[1ch]">
                    {[...Array(11)].map((_, i) => (
                        <div key={i} className="digit-num">
                            {i % 10}
                        </div>      
                    ))}
                </div>

                <div ref={digit3Ref} className="relative w-[1ch]">
                    {[...Array(21)].map((_, i) => (
                        <div key={i} className="digit-num">
                            {i % 10}
                        </div>
                    ))}
                </div>

                <div className="relative">%</div>
            </div>

            <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 right-4 sm:right-6 md:right-8 h-1 bg-white/30">
                <div ref={progressBarRef} className="h-full w-0 bg-white" />
            </div>
        </div>
    )
}
