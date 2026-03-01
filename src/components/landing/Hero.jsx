import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── Image lists defined at module level (never recreated) ──────────────────
const desktopImages = [
    'football.jpeg',
    'fwf.jpg',
    'main5.JPG',
    'oldays.jpg',
    'main1.png',
]

const mobileImages = [
    'prayer.jpg',
    'she team.jpg',
    'CU nouman.JPG',
    'video alchemy.jpg',
    'pressL.jpg',
    'ismail.JPG',
    'main3.png',
    //'teams.jpeg',
]

export default function Hero() {
    const heroRef     = useRef(null)
    const navRef      = useRef(null)
    const headerRef   = useRef(null)
    const imageRefs   = useRef([])
    const vignetteRef = useRef(null)

    // FIX: Image set frozen once at mount via useRef — resize never triggers re-init
    const imagesRef = useRef(
        typeof window !== 'undefined' && window.innerWidth < 640
            ? mobileImages
            : desktopImages
    )
    const images = imagesRef.current

    // FIX: useLayoutEffect (not useEffect) — GSAP runs before browser paint
    // FIX: [] dependency — animation setup runs exactly once on mount
    useLayoutEffect(() => {
        // FIX: Guard all required refs before doing anything
        if (!heroRef.current || !headerRef.current) return

        // Snapshot ref values into local variables for a stable closure
        const hero     = heroRef.current
        const header   = headerRef.current
        const vignette = vignetteRef.current
        const nav      = navRef.current   // may be null — guarded on every use

        // FIX: Filter null entries before passing any array to GSAP
        const validRefs = imageRefs.current.filter(Boolean)
        if (validRefs.length === 0) return

        // gsap.context() scopes all tweens/ScrollTriggers for clean ctx.revert()
        const ctx = gsap.context(() => {
            const tl = gsap.timeline()

            // FIX: Guard navRef — it is not attached to any JSX element by default
            if (nav) gsap.set(nav, { y: -150 })
            gsap.set(header, { opacity: 0 })

            // Reveal images one by one
            tl.to(validRefs, {
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                duration: 1.2,
                stagger: 0.35,
                ease: 'power3.inOut',
            })

            // Scale-up the hero wrapper simultaneously
            tl.to(hero, {
                scale: 1.25,
                duration: 3,
                ease: 'power3.inOut',
            }, 0)

            // Slide nav down (guarded)
            if (nav) tl.to(nav, { y: 0, duration: 1 }, 0.8)

            // Pin the last image fully visible
            const lastImageIndex = validRefs.length - 1
            if (validRefs[lastImageIndex]) {
                tl.set(validRefs[lastImageIndex], {
                    clipPath: 'none',
                    opacity: 1,
                    scale: 1,
                    filter: 'none',
                    zIndex: 10,
                })
            }

            // Fade in header logo
            tl.to(header, { opacity: 1, duration: 1, ease: 'power2.out' })

            // Vignette scroll effect (guarded)
            if (vignette) {
                gsap.to(vignette, {
                    opacity: 0.6,
                    scrollTrigger: {
                        trigger: hero,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: 1,
                    },
                })
            }

            // Blur effect on final image (guarded)
            if (validRefs[lastImageIndex]) {
                gsap.to(validRefs[lastImageIndex], {
                    filter: 'blur(10px)',
                    scrollTrigger: {
                        trigger: hero,
                        start: 'top top-=1',
                        end: 'top+=20%',
                        scrub: 3,
                        toggleActions: 'play none reverse none',
                    },
                })
            }

            // FIX: Refresh after full setup so ScrollTrigger measures correctly
            ScrollTrigger.refresh()

        }, heroRef) // scope to heroRef container

        // FIX: ctx.revert() tears down all tweens + ScrollTriggers on unmount
        return () => ctx.revert()

    }, []) // FIX: empty array — runs once, never on resize

    return (
        // FIX: h-[100svh] — stable height on mobile (svh ignores URL bar changes)
        <section className="relative h-[100svh] w-screen overflow-hidden p-4 sm:p-8 md:p-12">
            <div ref={heroRef} className="relative h-full w-full">
                {images.map((img, i) => (
                    <img
                        key={img}
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
