import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import AnimatedBackground from "../AnimatedBackground";
import PageSEO from "../PageSEO";

const rotatingWords = [
  "MOST FUN",
  "MOST TECHNICAL",
  "MOST ACTIVE",
  "BEST",
];

const portfolios = [
  {
    title: "Events",
    description:
      "Plan and execute events, brainstorm ideas, prepare activities, coordinate with different teams, and manage event requirements.",
    fit: "You enjoy planning, coordinating and making things happen. (until people call your event a flop after you worked like a egyptian slave building the pyramids)",
  },
  {
    title: "Operations",
    description:
      "Handle logistics, resources, scheduling, requirements, coordination, and on-ground arrangements to keep activities running smoothly.",
    fit: "You're organised, dependable and good at keeping things on track. (until you have to haggle with the unc for 2rs while trying to explain that the treasury is in negative)",
  },
  {
    title: "Marketing",
    description:
      "Develop promotional ideas, campaigns, outreach strategies, and collaborations to increase awareness and participation.",
    fit: "You like ideas, communication, social media and getting people excited (and can handle rejection)",
  },
  {
    title: "Documentation",
    description:
      "Prepare event reports, meeting minutes, captions, records, write-ups, and other written content.",
    fit: "You enjoy writing, organising information and communicating clearly (and if you were on wattpad at some point in your life)",
  },
  {
    title: "Media",
    description:
      "Handle club socials and Cover events and activities through photography, videography, reels, editing, creative content, and other visual formats.",
    fit: "You love cameras, editing, reels and capturing moments (and don't mind retaking the same shot for the 100th time because someone thinks they look a bit off)",
  },
  {
    title: "Design",
    description:
      "Create posters, social media creatives, event branding, presentations, and other visual content.",
    fit: "You enjoy turning ideas into visuals that people notice. (until you are trying to figure out the perfect color combo on a poster that was due 3 days ago at 3am )",
  },
  {
    title: "Tech",
    description:
      "Conduct and support technical sessions, explore new technologies, form and support hackathon teams, work on projects, and organise technical workshops.",
    fit: "You like building, experimenting, coding and exploring technology. (until your code randomly stops working and you almost smash your laptop out of rage)",
  },
  {
    title: "Press & Outreach",
    description:
      "Handle press-related activities,conduct press segments. prepare questions for interactions and interviews, and cover events from a press perspective.",
    fit: "You enjoy talking to people, asking questions and telling stories. (and somehow get everyone to spill the tea)",
  },
  {
    title: "Human Resource",
    description:
      "Keep the team connected and involved. Handle internal coordination, Google Forms, team requirements, member follow-ups, and ensure the team stays active and engaged.",
    fit: "You like working with people and keeping a team connected. (if you're the person that always )",
  },
  {
    title: "Research",
    description:
      "Explore research ideas and emerging topics. Conduct literature reviews, identify research gaps, collect and analyse data, collaborate on research projects, and contribute to developing and publishing research papers.",
    fit: "You're curious, analytical and want to work towards publishing research papers. (and you're an expert at finding out someone's entire family tree just by the first letter of their name)",
  },
];

export default function JoinUs() {
  const [wordIndex, setWordIndex] = useState(0);
  const [portfolioIndex, setPortfolioIndex] = useState(0);
  const [isPortfolioHovered, setIsPortfolioHovered] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(1);

  /* ================= ROTATING HERO WORD ================= */

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  /* ================= RESPONSIVE CARDS ================= */

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerView(3);
      } else if (window.innerWidth >= 640) {
        setCardsPerView(2);
      } else {
        setCardsPerView(1);
      }
    };

    updateCardsPerView();

    window.addEventListener("resize", updateCardsPerView);

    return () => {
      window.removeEventListener("resize", updateCardsPerView);
    };
  }, []);

  /* ================= RESET INDEX ON RESIZE ================= */

  useEffect(() => {
    const maxIndex = Math.max(0, portfolios.length - cardsPerView);

    setPortfolioIndex((prev) => Math.min(prev, maxIndex));
  }, [cardsPerView]);

  /* ================= AUTO SLIDER ================= */

  useEffect(() => {
    if (isPortfolioHovered) return;

    const maxIndex = Math.max(0, portfolios.length - cardsPerView);

    const interval = setInterval(() => {
      setPortfolioIndex((prev) => {
        if (prev >= maxIndex) {
          return 0;
        }

        return prev + 1;
      });
    }, 3800);

    return () => clearInterval(interval);
  }, [isPortfolioHovered, cardsPerView]);

  /* ================= SLIDER CONTROLS ================= */

  const maxIndex = Math.max(0, portfolios.length - cardsPerView);

  const goNext = () => {
    setPortfolioIndex((prev) => {
      if (prev >= maxIndex) {
        return 0;
      }

      return prev + 1;
    });
  };

  const goPrevious = () => {
    setPortfolioIndex((prev) => {
      if (prev <= 0) {
        return maxIndex;
      }

      return prev - 1;
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      <PageSEO title="Join Us" />

      {/* ========================================================= */}
      {/* BACKGROUND */}
      {/* ========================================================= */}

      <div className="fixed inset-0 -z-10 overflow-hidden">
        <AnimatedBackground />

        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-cyan-400 opacity-10 blur-3xl" />

        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-cyan-400 opacity-10 blur-3xl" />
      </div>

      <main className="relative z-10">

        {/* ========================================================= */}
        {/* HERO */}
        {/* ========================================================= */}

        <section className="relative flex min-h-[90vh] flex-col items-center justify-center border-b border-gray-200 px-6 pt-32 text-center md:pt-36">

          {/* Main heading */}

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl font-black uppercase leading-[0.82] tracking-tight text-black sm:text-6xl md:text-8xl"
          >

            {/* JOIN THE */}

            <span className="block">
              JOIN THE
            </span>


            {/* ROTATING WORD */}

            <span className="relative mx-auto block h-[0.85em] overflow-hidden text-cyan-400">

              <AnimatePresence mode="wait">

                <motion.span
                  key={rotatingWords[wordIndex]}
                  initial={{
                    y: "100%",
                    opacity: 0,
                  }}
                  animate={{
                    y: "0%",
                    opacity: 1,
                  }}
                  exit={{
                    y: "-100%",
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {rotatingWords[wordIndex]}
                </motion.span>

              </AnimatePresence>

            </span>


            {/* CLUB ON CAMPUS */}

            <span className="block">
              CLUB ON CAMPUS
            </span>

          </motion.h1>


          {/* Description */}

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.25,
            }}
            className="mt-8 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg"
          >
            Build.Create.Innovate
            <br />
            Find your place in a community that does it all.
          </motion.p>


          {/* CTA */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.4,
            }}
            className="mt-10"
          >
            <Link
              to="https://docs.google.com/forms/d/e/1FAIpQLSdaROWg0WN2TrsILhT6HrhPrIET3cKl_ju5N43OcrI9VxNV7Q/viewform"
              className="group inline-flex items-center gap-3 rounded-full bg-black px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-cyan-400 hover:text-black"
            >
              Find Your Place

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </motion.div>


        </section>


        {/* ========================================================= */}
        {/* PORTFOLIOS */}
        {/* ========================================================= */}

        <section
          id="portfolios"
          className="relative border-b border-gray-200 px-6 py-28 md:py-36"
        >

          <div className="mx-auto max-w-7xl">

            {/* SECTION HEADING */}

            <div className="mb-14 text-center">

              <motion.p
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                }}
                className="text-3xl font-bold uppercase tracking-[0.3em] text-cyan-500"
              >
                CONFUSED?
              </motion.p>


              <motion.h2
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.1,
                }}
                className="mt-3 text-4xl font-black uppercase leading-none text-black sm:text-5xl md:text-7xl"
              >
                WE GOT YOU.
              </motion.h2>


              <motion.p
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                }}
                className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg"
              >
                There&apos;s a place for every kind of person.
                <br />
                Find the portfolio that feels like you.
              </motion.p>

            </div>


            {/* ===================================================== */}
            {/* CAROUSEL */}
            {/* ===================================================== */}

            <div
              className="relative px-1 sm:px-8 lg:px-12"
              onMouseEnter={() => setIsPortfolioHovered(true)}
              onMouseLeave={() => setIsPortfolioHovered(false)}
            >

              {/* VIEWPORT */}

              <div className="overflow-hidden">

                {/* TRACK */}

                <motion.div
                  className="flex"
                  animate={{
                    x: `-${portfolioIndex * (100 / cardsPerView)}%`,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >

                  {portfolios.map((portfolio, index) => (

                    <div
                      key={portfolio.title}
                      className="w-full flex-shrink-0 px-2 sm:w-1/2 lg:w-1/3"
                    >

                      <motion.div
                        whileHover={{
                          y: -8,
                        }}
                        transition={{
                          duration: 0.25,
                        }}
                        className="group flex min-h-[390px] cursor-pointer flex-col rounded-3xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 hover:border-cyan-300 hover:shadow-xl md:p-8"
                      >

                        {/* CARD HEADER */}

                        <div className="flex items-start justify-end">

                          <span className="text-xs font-bold tracking-[0.2em] text-gray-300">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                        </div>


                        {/* TITLE */}

                        <h3 className="mt-3 text-2xl font-black uppercase tracking-tight text-black md:text-3xl">
                          {portfolio.title}
                        </h3>


                        {/* WHO IS IT FOR? */}

                        <div className="mt-5">

                          <p className="text-xs font-bold uppercase tracking-widest text-cyan-500">
                            You might like this if...
                          </p>

                          <p className="mt-2 text-sm font-medium leading-relaxed text-gray-800">
                            {portfolio.fit}
                          </p>

                        </div>


                        {/* DESCRIPTION */}

                        <p className="mt-5 text-sm leading-relaxed text-gray-500">
                          {portfolio.description}
                        </p>


                      </motion.div>

                    </div>

                  ))}

                </motion.div>

              </div>


              {/* =================================================== */}
              {/* PREVIOUS BUTTON */}
              {/* =================================================== */}

              <button
                type="button"
                onClick={goPrevious}
                aria-label="Previous portfolio"
                className="absolute left-0 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-lg text-black shadow-md transition-all duration-300 hover:bg-black hover:text-white sm:-left-2 lg:-left-4"
              >
                ←
              </button>


              {/* =================================================== */}
              {/* NEXT BUTTON */}
              {/* =================================================== */}

              <button
                type="button"
                onClick={goNext}
                aria-label="Next portfolio"
                className="absolute right-0 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-lg text-black shadow-md transition-all duration-300 hover:bg-black hover:text-white sm:-right-2 lg:-right-4"
              >
                →
              </button>

            </div>


            {/* ===================================================== */}
            {/* DOTS */}
            {/* ===================================================== */}

            <div className="mt-10 flex justify-center gap-2">

              {Array.from({
                length: maxIndex + 1,
              }).map((_, index) => (

                <button
                  key={index}
                  type="button"
                  onClick={() => setPortfolioIndex(index)}
                  aria-label={`Go to portfolio group ${index + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === portfolioIndex
                      ? "w-8 bg-cyan-400"
                      : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                />

              ))}

            </div>


            {/* ===================================================== */}
            {/* SLIDER HINT */}
            {/* ===================================================== */}

            <p className="mt-5 text-center text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
              Hover to pause · Use the arrows to explore
            </p>

          </div>

        </section>


        {/* ========================================================= */}
        {/* WHY JOIN */}
        {/* ========================================================= */}

        <section className="border-b border-gray-200 px-6 py-28 md:py-36">

          <div className="mx-auto max-w-6xl">

            <div className="text-center">

              <motion.p
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-500"
              >
                WHAT&apos;S IN IT FOR YOU?
              </motion.p>

              <motion.h2
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: 0.1,
                }}
                className="mt-3 text-4xl font-black uppercase text-black md:text-7xl"
              >
                WHY CIS?
              </motion.h2>

            </div>


            <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {[
                {
                  title: "Build & Create",
                  text: "Work on projects, technical initiatives and ideas that go beyond the classroom.",
                },
                {
                  title: "Make Unforgettable Memories",
                  text: "Pre event preps, post event lunches, hackathons, field trips, marketing sheananigans. Make memories worth revisiting",
                },
                {
                  title: "Upskill",
                  text: "Develop technical, creative, communication, leadership and organisational skills.",
                },
                {
                  title: "Meet People",
                  text: "Meet people from completely different backgrounds, years, branches. Who knows, you just might meet someone who FINALLY shares your interests",
                },
                {
                  title: "Take The Lead",
                  text: "Get opportunities to take responsibility, organise initiatives and lead teams.",
                },
                {
                  title: "Do More",
                  text: "Workshops, events, hackathons, research and projects. There is always something happening.",
                },
              ].map((item) => (

                <motion.div
                  key={item.title}
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  whileHover={{
                    y: -5,
                  }}
                  className="rounded-3xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:border-cyan-300 hover:shadow-lg"
                >

                  <h3 className="text-xl font-black uppercase text-black">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-gray-500">
                    {item.text}
                  </p>

                </motion.div>

              ))}

            </div>

          </div>

        </section>


        {/* ========================================================= */}
        {/* EVENTS CTA */}
        {/* ========================================================= */}

        <section className="border-b border-gray-200 px-6 py-24">

          <div className="mx-auto max-w-6xl">

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              className="flex flex-col items-center justify-between gap-8 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm md:flex-row md:p-12"
            >

              <div>

                <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-500">
                  SEE WHAT WE DO
                </p>

                <h2 className="mt-3 text-3xl font-black uppercase text-black md:text-5xl">
                  EXPERIENCE CIS
                </h2>

                <p className="mt-4 max-w-xl text-gray-500">
                  Technical events, Fun events, Hackathons, Workshops, Field trips. We are always doing something.
                </p>

              </div>


              <Link
                to="https://ieeecismjcet.in/events"
                className="group flex-shrink-0 rounded-full bg-black px-7 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-cyan-400 hover:text-black"
              >
                Explore Events
                <span className="ml-3 transition-all duration-300 group-hover:ml-5">
                  →
                </span>
              </Link>

            </motion.div>

          </div>

        </section>


        {/* ========================================================= */}
{/* FAQ */}
{/* ========================================================= */}

<section className="border-b border-gray-200 px-6 py-28 md:py-36">

  <div className="mx-auto max-w-4xl">

    {/* FAQ HEADING */}

    <div className="mb-14 text-center">

      <p className="text-xl font-bold uppercase tracking-[0.3em] text-cyan-500">
        GOT QUESTIONS?
      </p>

      <h2 className="mt-3 text-4xl font-black uppercase text-black md:text-6xl">
        FAQ
      </h2>

    </div>


    {/* FAQ QUESTIONS */}

    <div className="space-y-4">

      {[
        {
          question: "Do I need to be good at coding?",
          answer:
            "Not at all. CIS has portfolios covering technology, design, media, marketing, events, research, HR and much more.",
        },
        {
          question: "Can I join if I'm a beginner?",
          answer:
            "Absolutely. You don't need to know everything before joining. CIS is also a place to learn, experiment and improve.",
        },
        {
          question: "Can I apply for multiple portfolios?",
          answer:
            "Yes. Choose the areas that genuinely interest you and we'll help you find where you fit best.",
        },
        {
          question: "What will I actually get to do?",
          answer:
            "You'll work on real events, projects, campaigns, technical initiatives, research and team activities depending on your portfolio.",
        },
        {
          question: "Is CIS only for technical students?",
          answer:
            "No. Technical and non-technical portfolios work together to make CIS happen.",
        },
      ].map((faq, index) => (

        <motion.details
          key={faq.question}
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: index * 0.05,
          }}
          className="group rounded-2xl border border-gray-200 bg-white p-6"
        >

          {/* QUESTION + ARROW */}

          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base font-bold text-black md:text-lg">

            <span>
              {faq.question}
            </span>

            <span className="flex-shrink-0 text-xl font-normal text-cyan-500 transition-transform duration-300 group-open:rotate-180">
              ↓
            </span>

          </summary>


          {/* ANSWER */}

          <p className="mt-4 text-sm leading-relaxed text-gray-500">
            {faq.answer}
          </p>

        </motion.details>

      ))}

    </div>


    {/* ===================================================== */}
    {/* STILL HAVE DOUBTS */}
    {/* ===================================================== */}

    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      className="mt-16 border-t border-gray-200 pt-10 text-center"
    >

      <p className="text-3xl font-bold uppercase tracking-[0.3em] text-cyan-500">
        STILL HAVE DOUBTS?
      </p>

      <p className="mt-3 text-gray-500">
        Contact Us
      </p>


      {/* WHATSAPP CONTACTS */}

      <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">

        <a
          href="https://wa.me/9959298015"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-gray-200 px-6 py-3 text-sm font-bold text-black transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-400"
        >
          ABDULLAH: +91 99592 98015
        </a>

        <a
          href="https://wa.me/9393059590"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-gray-200 px-6 py-3 text-sm font-bold text-black transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-400"
        >
          ZAINAB: +91 93930 59590
        </a>

      </div>

    </motion.div>

  </div>

</section>


        {/* ========================================================= */}
        {/* JOIN CIS */}
        {/* ========================================================= */}

        <section className="border-b border-gray-200 px-6 py-24">

          <div className="mx-auto max-w-5xl">

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.97,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
              }}
              className="relative overflow-hidden rounded-[2rem] bg-black px-8 py-16 text-center md:px-16 md:py-20"
            >

              {/* Cyan glow */}

              <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-400 opacity-20 blur-3xl" />


              <div className="relative z-10">

                <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-400">
                  READY?
                </p>

                <h2 className="mt-4 text-5xl font-black uppercase leading-none text-white md:text-7xl">
                  JOIN CIS.
                </h2>

                <p className="mx-auto mt-6 max-w-xl text-gray-300">
                  Find your portfolio. Meet your people.
                  Build something worth remembering.
                </p>

                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdaROWg0WN2TrsILhT6HrhPrIET3cKl_ju5N43OcrI9VxNV7Q/viewform"
                  className="mt-9 inline-flex items-center gap-3 rounded-full bg-cyan-400 px-8 py-4 text-sm font-black uppercase tracking-wider text-black transition-all duration-300 hover:bg-white"
                >
                  Apply Now
                  <span>→</span>
                </a> 

              </div>

            </motion.div>

          </div>

        </section>


        {/* ========================================================= */}
        {/* STILL NOT CONVINCED */}
        {/* ========================================================= */}

        <section className="border-b border-gray-200 px-6 py-28 md:py-36">

          <div className="mx-auto max-w-4xl text-center">

            <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-500">
              STILL HAVING SECOND THOUGHTS?
            </p>

            <h2 className="mt-4 text-4xl font-black uppercase leading-tight text-black md:text-6xl">
              STALK OUR SOCIALS
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-gray-500">
              Maybe our world-class reels will change your mind?
            </p>


            {/* SOCIAL LINKS */}

            <div className="mt-10 flex flex-wrap justify-center gap-4">

              <a
                href="https://www.instagram.com/ieeemjcet_cis/"
                className="rounded-full border border-gray-200 px-6 py-3 text-sm font-bold uppercase tracking-wider text-black transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-400"
              >
                Instagram
              </a>

              <a
                href="https://www.linkedin.com/company/ieee-computational-intelligence-society-mjcet/posts/?feedView=all"
                className="rounded-full border border-gray-200 px-6 py-3 text-sm font-bold uppercase tracking-wider text-black transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-400"
              >
                LinkedIn
              </a>
            </div>

          </div>

        </section>

      </main>

    </div>
  );
}