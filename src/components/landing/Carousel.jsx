import { useEffect, useRef } from "react";
import gsap from "gsap";

const activities = [

  {
    title: "TECHNICAL WORKSHOPS",
    description:
      "Hands-on exposure to ML, Cybersecurity and Game Development.",
    image: "/HSImages/techWorkshop.jpg",
  },
  {
    title: "FUN EVENTS",
    description:
      "Large-scale fun events helping students relax.",
    image: "/HSImages/Mystery Mania.jpg",
  },
  {
    title: "INTERNAL WORKSHOPS",
    description:
      "We conduct hands-on internal workshops to upskill our members.",
    image: "/HSImages/internalWorkshop.jpeg",
  },
  {
    title: "HACKATHONS",
    description:
      "Our teams actively participate in hackathons delivering innovation.",
    image: "/HSImages/Hackathons.png",
  },
  {
    title: "INTERNAL TEAM BONDING SESSIONS",
    description: "We build team spirit through football, iftars, lunches, and fun internal games.",
    image: "/HSImages/Internal.png"
  },
  {
    title: "INDUSTRIAL TRIPS",
    description: "We organize industry and company visits to explore real-world technologies.",
    image: "/HSImages/Field Trips.png"
  },
  {
    title: "PRESS SEGMENTS",
    description: "We host interviews and press segments to share inspiring real-world stories.",
    image: "/HSImages/press.jpg"
  },
  {
    title: "DONATION DRIVES",
    description: "We run winter and Ramadan donation drives supporting underprivileged communities.",
    image: "/HSImages/Drives.png"
  },
  {
    title: "inCISive",
    description: "Our first magazine showcases achievements and key moments of our journey.",
    image: "/HSImages/incisive.png",
    link: "https://heyzine.com/flip-book/15d3f672a5.html#page/1"
  },
];

export default function HorizontalScroll() {
  const trackRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const totalWidth = track.scrollWidth / 2;

    animationRef.current = gsap.to(track, {
      x: `-=${totalWidth}`,
      duration: 60, // slower base speed
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(
          (x) => parseFloat(x) % totalWidth
        ),
      },
    });

    return () => animationRef.current.kill();
  }, []);

  const slowDown = () => {
    gsap.to(animationRef.current, {
      timeScale: 0.25,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const speedUp = () => {
    gsap.to(animationRef.current, {
      timeScale: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const infiniteCards = [...activities, ...activities];

  return (
    <section className="relative z-0 w-full md:mt-6 mt-2 overflow-hidden py-16">
      <div
        ref={trackRef}
        onMouseEnter={slowDown}
        onMouseLeave={speedUp}
        className="
            flex
            gap-6 lg:gap-10
            w-max
            px-[7.5vw] lg:px-8
            "      >
        {infiniteCards.map((item, index) => (
          <div
            key={index}
            className="
                relative
                flex-shrink-0
                rounded-3xl
                overflow-hidden
                group

                h-[420px] w-[85vw]
                sm:h-[480px] sm:w-[75vw]
                lg:h-[570px] lg:w-[920px]
                "
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.title}
              className="
                absolute inset-0
                w-full h-full
                object-cover
                transition-transform duration-700
                group-hover:scale-105
              "
            />

            {/* Gradient */}
            <div className="
              absolute inset-0
              bg-gradient-to-t
              from-black/80
              via-black/30
              to-transparent
            " />

            {/* Content */}
            <div className="absolute bottom-10 left-10 right-10 text-white space-y-4">

              <h3 className="
                text-2xl
                sm:text-3xl
                lg:text-4xl
                font-semibold
                ">
                {item.title}
              </h3>

              <p className="
            text-sm
            sm:text-base
            lg:text-lg
            text-gray-200
            max-w-md lg:max-w-xl
            ">
                {item.description}
              </p>

              {/* ✅ Conditional Link Button */}
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-block
                    mt-3
                    px-6 py-3
                    rounded-xl
                    bg-white/90
                    text-black
                    font-medium
                    transition
                    hover:bg-white
                  "
                >
                  View More →
                </a>
              )}

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}