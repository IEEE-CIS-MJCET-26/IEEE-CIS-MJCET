import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
    const heroRef = useRef(null)
    const navRef = useRef(null)
    const headerRef = useRef(null)
    const imageRefs = useRef([])
    const vignetteRef = useRef(null)

    // Detect mobile viewport
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 640)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)

        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Desktop images
    const desktopImages = [
        'football.jpeg',
        'fwf.jpg',
        'joy.jpg',
        'oldays.jpg',
        'main5.JPG',
    ]

    // Mobile images
    const mobileImages = [
        'prayer.jpg',
        'she team.jpg',
        'CU nouman.JPG',
        'video alchemy.jpg',
        'pressL.jpg',
        'ismail.JPG',
        'teams.jpeg',
    ]

    // Select the appropriate image set
    const images = isMobile ? mobileImages : desktopImages

    useEffect(() => {
        if (!heroRef.current || !headerRef.current) return

        let ctx = gsap.context(() => {
            const tl = gsap.timeline()

            gsap.set(navRef.current, { y: -150 })
            gsap.set(headerRef.current, { opacity: 0 })

            tl.to(imageRefs.current, {
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                duration: 1.2,
                stagger: 0.35,
                ease: 'power3.inOut',
            })

            tl.to(
                heroRef.current,
                {
                    scale: 1.25,
                    duration: 3,
                    ease: 'power3.inOut',
                },
                0
            )

            tl.to(navRef.current, { y: 0, duration: 1 }, 0.8)

            // CRITICAL: Use dynamic reference to last image
            const lastImageIndex = imageRefs.current.length - 1
            if (imageRefs.current[lastImageIndex]) {
                tl.set(imageRefs.current[lastImageIndex], {
                    clipPath: 'none',
                    opacity: 1,
                    scale: 1,
                    filter: 'none',
                    zIndex: 10,
                })
            }

            tl.to(headerRef.current, { opacity: 1, duration: 1, ease: 'power2.out' })

            // Vignette scroll effect
            gsap.to(vignetteRef.current, {
                opacity: 0.6,
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1,
                },
            })

            // Blur effect on final image - use dynamic reference
            if (imageRefs.current[lastImageIndex]) {
                gsap.to(imageRefs.current[lastImageIndex], {
                    filter: 'blur(10px)',
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: 'top top-=1',
                        end: 'top+=20%',
                        scrub: 3,
                        toggleActions: 'play none reverse none',
                    },
                })
            }
        }, heroRef)

        return () => ctx.revert()
    }, [images]) // Re-run when images array changes

    return (
        <section className="relative h-screen w-screen overflow-hidden p-4 sm:p-8 md:p-12">
            <div ref={heroRef} className="relative h-full w-full">
                {images.map((img, i) => (
                    <img
                        key={i}
                        ref={(el) => (imageRefs.current[i] = el)}
                        src={`/assets/${img}`}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover clip-hidden"
                        style={{ zIndex: i }}
                    />
                ))}
                <div
                    ref={vignetteRef}
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle, transparent 30%, rgba(0,0,0,0.8) 100%)',
                        opacity: 0,
                        zIndex: 8,
                    }}
                />
            </div>

            <div className="absolute inset-0 z-10">


                <div
                    ref={headerRef}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4"
                >
                    <img
                        src="/assets/White Logo.png"
                        alt="IEEE CIS"
                        className="w-auto h-48 sm:h-64 md:h-80 max-w-[90vw]"
                    />
                </div>
            </div>
        </section>
    )
}
