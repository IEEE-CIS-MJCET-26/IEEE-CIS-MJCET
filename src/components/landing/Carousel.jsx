const activities = [
  {
    title: "TECHNICAL WORKSHOPS",
    description: "Hands-on exposure to ML, Cybersecurity and Game Development.",
    image: "/HSImages/techWorkshop.jpg",
  },
  {
    title: "FUN EVENTS",
    description: "Large-scale fun events helping students relax.",
    image: "/HSImages/BT.png",
  },
  {
    title: "INTERNAL WORKSHOPS",
    description: "We conduct hands-on internal workshops to upskill our members.",
    image: "/HSImages/internalWorkshop.jpeg",
  },
  {
    title: "HACKATHONS",
    description: "Our teams actively participate in hackathons delivering innovation.",
    image: "/HSImages/Hackathons.png",
  },
  {
    title: "INTERNAL TEAM BONDING SESSIONS",
    description: "We build team spirit through football, iftars, lunches, and fun internal games.",
    image: "/HSImages/Internal.jpeg",
  },
  {
    title: "INDUSTRIAL TRIPS",
    description: "We organize industry and company visits to explore real-world technologies.",
    image: "/HSImages/Incursion.jpg",
  },
  {
    title: "PRESS SEGMENTS",
    description: "We host interviews and press segments to share inspiring real-world stories.",
    image: "/HSImages/press.jpg",
  },
  {
    title: "DONATION DRIVES",
    description: "We run winter and Ramadan donation drives supporting underprivileged communities.",
    image: "/HSImages/Drives.png",
  },
  {
    title: "inCISive",
    description: "Our first magazine showcases achievements and key moments of our journey.",
    image: "/HSImages/magazine.png",
    link: "https://heyzine.com/flip-book/0653afaeb2.html",
  },
];

/* ─── Single card ─────────────────────────────────────────────────── */
function ActivityCard({ item }) {
  return (
    <div
      className="
        relative flex-shrink-0 rounded-3xl overflow-hidden group
        h-[420px]  w-[85vw]
        sm:h-[480px] sm:w-[75vw]
        lg:h-[570px] lg:w-[920px]
      "
    >
      {/* Image */}
      <img
        src={item.image}
        alt={item.title}
        className="
          absolute inset-0 w-full h-full object-cover
          transition-transform duration-700 group-hover:scale-105
        "
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Text content */}
      <div className="absolute bottom-10 left-10 right-10 text-white space-y-4">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
          {item.title}
        </h3>
        <p className="text-sm sm:text-base lg:text-lg text-gray-200 max-w-md lg:max-w-xl">
          {item.description}
        </p>

        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group/vm relative inline-flex items-center gap-2
              mt-3 px-6 py-3 rounded-xl
              bg-white text-black
              text-sm font-black uppercase tracking-wider
              overflow-hidden transition-colors duration-300
            "
          >
            <span className="
              absolute inset-0 bg-cyan-400
              translate-x-[-101%] group-hover/vm:translate-x-0
              transition-transform duration-300 ease-out rounded-xl
            " />
            <span className="relative z-10 flex items-center gap-2 group-hover/vm:text-black transition-colors duration-300">
              View More
              <svg
                width="14" height="14"
                viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-300 group-hover/vm:translate-x-1"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        )}
      </div>
    </div>
  );
}

/* ─── Carousel ────────────────────────────────────────────────────── */
/*
 * Pure-CSS infinite marquee — no GSAP, no useEffect, no JS measurement.
 *
 * How the seamless -50% loop works:
 *   The moving element (.cis-marquee) contains TWO identical inner flex
 *   rows (set A and set B).  Each inner row ends with a right-margin equal
 *   to the gap so that both halves are exactly the same pixel width.
 *   translateX(-50%) therefore moves precisely one full set to the left,
 *   landing at a position that looks identical to translateX(0).
 *   CSS then restarts the animation from 0 — zero visible jump, ever.
 */
export default function HorizontalScroll() {
  return (
    <section className="cis-marquee-wrapper relative z-0 w-full md:mt-6 mt-2 overflow-hidden py-16">
      {/* The animated track — w-max is CRITICAL: translateX percentages are
          relative to the element's own offsetWidth, so we must force it to
          max-content so -50% equals exactly one full set width */}
      <div className="cis-marquee flex w-max">

        {/* Set A */}
        <div className="flex gap-6 lg:gap-8 mr-6 lg:mr-8">
          {activities.map((item, i) => (
            <ActivityCard key={`a-${i}`} item={item} />
          ))}
        </div>

        {/* Set B — identical duplicate, gives the seamless wrap */}
        <div className="flex gap-6 lg:gap-8 mr-6 lg:mr-8">
          {activities.map((item, i) => (
            <ActivityCard key={`b-${i}`} item={item} />
          ))}
        </div>

      </div>
    </section>
  );
}