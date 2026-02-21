import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Github, Mail, Globe, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedBackground from '../AnimatedBackground';

// GB member images (actual photos)
import hafeez from '../../assets/GB PICS/Abdul Hafeez.png';
import haifa from '../../assets/GB PICS/Haifa.png';
import rayyan from '../../assets/GB PICS/Rayyan.png';
import hareem from '../../assets/GB PICS/Hareem.png';
import ahad from '../../assets/GB PICS/Abdul Ahad.png';
import nouman from '../../assets/GB PICS/Nouman.png';
import psa from '../../assets/GB PICS/PSA Khan.png';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────
// BATCH YEAR CONFIG
// ─────────────────────────────────────────
const BATCH_YEARS = [
    { label: '2024–2025', status: 'past' },
    { label: '2025–2026', status: 'current' },
    { label: '2026–2027', status: 'upcoming' },
];

// ─────────────────────────────────────────
// REAL DATA — 2025–2026
// ─────────────────────────────────────────

const GB_MEMBERS = [
    { name: 'Abdul Hafeez',    position: 'Chairman',         image: hafeez, linkedin: 'https://www.linkedin.com/in/abdulhafeez', email: null },
    { name: 'Haifa Nazeer',    position: 'Vice-Chair',        image: haifa,  linkedin: 'https://www.linkedin.com/in/haifanazeer',  email: null },
    { name: 'Rayyan Siddiqi',  position: 'General Secretary', image: rayyan, linkedin: 'https://www.linkedin.com/in/rayyansiddiqi', email: null },
    { name: 'Ahamadi Hareem',  position: 'Joint Secretary',   image: hareem, linkedin: 'https://www.linkedin.com/in/ahamadihareem', email: null },
    { name: 'Abdul Ahad',      position: 'Treasurer',         image: ahad,   linkedin: 'https://www.linkedin.com/in/abdulahad',   email: null },
    { name: 'Mohammed Nouman', position: 'Web Master',        image: nouman, linkedin: 'https://www.linkedin.com/in/mohammednouman', email: null },
    { name: 'PSA Khan',        position: 'Liaison Head',      image: psa,    linkedin: 'https://www.linkedin.com/in/psakhan',     email: null },
];

const DEPT_COLOR = {
    TECH:              '#1d4ed8',
    DESIGN:            '#0e7490',
    MEDIA:             '#0f766e',
    MARKETING:         '#be185d',
    RESEARCH:          '#5b21b6',
    'PRESS & OUTREACH':'#7c2d12',
    OPERATIONS:        '#92400e',
    DOCUMENTATION:     '#065f46',
    HR:                '#831843',
};

const mk = (name, position, department, image, { linkedin = null, github = null, portfolio = null } = {}) => ({
    name, position, department, image,
    linkedin, github, portfolio,
    color: DEPT_COLOR[department] ?? '#0e7490',
});

// image paths — all in /assets/team/execom/
const img = (filename) => `/assets/team/execom/${filename}`;

const EXECOM_DEPARTMENTS_2025 = ['ALL', 'TECH', 'MEDIA', 'MARKETING', 'HR', 'DESIGN', 'RESEARCH', 'PRESS & OUTREACH', 'OPERATIONS', 'DOCUMENTATION'];

const EXECOM_MEMBERS_2025 = [
    // TECH
    mk('Mohammed Arfan',           'Tech Head',              'TECH',              img('Arfan.png'), { linkedin: 'https://www.linkedin.com/in/mohammed-arfan-167452171/', github: 'https://github.com/ArfanCodes' }),
    mk('Mohammed Abdullah Quadri', 'Associate Tech Head',    'TECH',              img('- MOHAMMED ABDULLAH QUADRI.jpeg'),   { linkedin: 'https://www.linkedin.com/in/abdullahquadri', github: 'https://github.com/abdullah-qdev' }),

    // MEDIA
    mk('Ismail Khan',              'Media Head',             'MEDIA',             img('Ismail Khan.png'), {}),
    mk('Aman Shaik',               'Associate Media Head',   'MEDIA',             img('Aman Shaik.jpeg'), {}),
    mk('Ismail Farooq',            'Associate Media Head',   'MEDIA',             img('1000050904 - Ismail Fr.jpeg'), {}),

    // MARKETING
    mk('Farheen Banu',             'Marketing Head',         'MARKETING',         img('IMG_7659 - FARHEEN BANU 160424733122.jpeg'), { linkedin: 'https://www.linkedin.com/in/farheen-banu-007a05388', github: 'https://github.com/eeenn10' }),
    mk('Misha Shaik',              'Associate Marketing Head','MARKETING',        img('Misha Shaikh.jpeg'), {}),

    // HR
    mk('Ali Abbas',                'HR Head',                'HR',                img('ALI ABBAS VEERJI.jpeg'), {}),
    mk('Shaista Imtiaz Khan',      'Associate HR Head',      'HR',                img('SHAISTA IMTIAZ KHAN.jpeg'), { linkedin: 'https://www.linkedin.com/in/shaista-khan-994b71390', github: 'https://github.com/shai155' }),

    // DESIGN
    mk('Syed Farhaan Ahmed',       'Design Head',            'DESIGN',            img('Syed Farhaan.jpeg'), {}),
    mk('ShaikAfroze',              'Associate Design Head',  'DESIGN',            img('Afrozeshaik.jpg'), { linkedin: 'https://www.linkedin.com/in/afroze-shaik-73473929a', github: 'https://github.com/Afrozeshaik24' }),

    // RESEARCH
    mk('Ayman Khaleel',            'Research Head',          'RESEARCH',          img('AYMAN KHALEEL AHMED.jpeg'), {}),
    mk('Quratulain Nayeem',        'Associate Research Head','RESEARCH',          img('QURATULAIN NAYEEM.JPG'), { linkedin: 'https://www.linkedin.com/in/quratulain-nayeem/', github: 'https://github.com/quratulain-nayeem' }),

    // PRESS & OUTREACH
    mk('Zainab Ahmed',             'Press & Outreach Head',  'PRESS & OUTREACH',  img('Zainab.jpeg'), { linkedin: 'https://www.linkedin.com/in/zainab-ahmed-076033324', github: 'https://github.com/zainab-py' }),
    mk('Mohammed Yahya Hussain',   'Associate P&O Head',     'PRESS & OUTREACH',  img('535e423c-2b98-452d-9f13-f91d6823e867 - Yahya Hussain.jpeg'), { linkedin: 'https://www.linkedin.com/in/yahya-hussain-a124a3290', github: 'https://github.com/Yahya986' }),

    // OPERATIONS
    mk('Muteebuddin Mohammed',     'Operations Head',        'OPERATIONS',        img('MOHAMMED MUTEEB.png'), {}),
    mk('Mohammed Ilyas Ahmed',     'Associate Ops Head',     'OPERATIONS',        img('IMG_1297.HEIC - MOHAMMED ILYAS AHMED 160423747105.jpeg'), { linkedin: 'https://www.linkedin.com/in/mohammed-ilyas-ahmed-0b52ab334', github: 'https://github.com/Ilyakhudus' }),

    // DOCUMENTATION
    mk('Safa Maheen',              'Documentation Head',     'DOCUMENTATION',     img('SAFA MAHEEN.jpeg'), { linkedin: 'https://www.linkedin.com/in/safa-maheen-aa6701336', github: 'https://github.com/safamaheen' }),
    mk('Syeda Rania',              'Associate Doc Head',     'DOCUMENTATION',     img('- SYEDA RANIA FATIMA.jpg'), {}),
];

// ── CORE 2025-2026 ──
const CORE_DEPARTMENTS_2025 = ['ALL', 'TECH', 'MEDIA', 'MARKETING', 'HR', 'DESIGN', 'RESEARCH', 'PRESS & OUTREACH', 'OPERATIONS', 'DOCUMENTATION'];

const CORE_MEMBERS_2025 = [
    // TECH
    mk('Farhan Uddin',             'Core — Tech',            'TECH',              null, { linkedin: 'https://www.linkedin.com/in/farhanuddin0721', github: 'https://github.com/FarhanUddin0721' }),
    mk('Mohammed Nabeel Uddin',    'Core — Tech',            'TECH',              null, { linkedin: 'http://linkedin.com/in/mohammed-nabeel-uddin-2ab19b391', github: 'https://github.com/nabeel-lab' }),
    mk('Syed Mukhtar',             'Core — Tech',            'TECH',              null, { github: 'https://github.com/SyedMukhtar11' }),
    mk('Zaina Tahniyath',          'Core — Tech',            'TECH',              null, { linkedin: 'https://www.linkedin.com/in/zaina-tahniyath-490701336', github: 'https://github.com/ZAINA11749' }),
    mk('Amreen Fathima',           'Core — Tech',            'TECH',              null, { linkedin: 'https://www.linkedin.com/in/amreen-fathima-288380395', github: 'https://github.com/amreen1633' }),
    mk('Omar Hussain Shaikh',      'Core — Tech',            'TECH',              null, { github: 'https://github.com/command404' }),
    mk('Mohammed Ozier Nawaz',     'Core — Tech',            'TECH',              null, { linkedin: 'https://www.linkedin.com/in/ozier-nawaz-43b000335', github: 'https://github.com/oz1er' }),

    // MEDIA
    mk('Harun',                    'Core — Media',           'MEDIA',             null, {}),
    mk('Mariya Anjum',             'Core — Media',           'MEDIA',             null, {}),
    mk('Mohammed Rayyan',          'Core — Media',           'MEDIA',             null, { github: 'https://github.com/r7yn' }),
    mk('Mohammed Saleh Bawazir',   'Core — Media',           'MEDIA',             null, { linkedin: 'https://www.linkedin.com/in/mohammed-saleh-bawazir-912434338', github: 'https://github.com/MohammedBawazir25' }),

    // MARKETING
    mk('Shaik Suhaib Ahmed',       'Core — Marketing',       'MARKETING',         null, { linkedin: 'https://www.linkedin.com/in/shaik-suhaib-3a95a0376' }),
    mk('Bano Fatima',              'Core — Marketing',       'MARKETING',         null, {}),
    mk('Mohammed Farhan Khan',     'Core — Marketing',       'MARKETING',         null, {}),
    mk('Jazlain Uddin',            'Core — Marketing',       'MARKETING',         null, {}),
    mk('Syed Ayman Ashfaq',        'Core — Marketing',       'MARKETING',         null, { linkedin: 'https://www.linkedin.com/in/syed-ayman-ashfaq-9a9765297' }),

    // HR
    mk('Abdul Muqeet',             'Core — HR',              'HR',                null, { linkedin: 'https://www.linkedin.com/in/abdul-muqeet-mohammed-aa4624337', portfolio: 'https://500px.com/p/abdulmuqeetm06' }),
    mk('SAINA PERVEEN',            'Core — HR',              'HR',                null, {}),
    mk('Yousuf Bee Sumayya',       'Core — HR',              'HR',                null, {}),
    mk('Syeda Ayesha',             'Core — HR',              'HR',                null, {}),

    // DESIGN
    mk('Mustafa Ahmed Ali',        'Core — Design',          'DESIGN',            null, {}),
    mk('Afnan Ahmed Khan',         'Core — Design',          'DESIGN',            null, { linkedin: 'https://www.linkedin.com/in/afnan-ahmed-4a8963335', github: 'https://github.com/afnan-del' }),
    mk('Tanzil',                   'Core — Design',          'DESIGN',            null, {}),
    mk('Adeeba Khan',              'Core — Design',          'DESIGN',            null, {}),

    // RESEARCH
    mk('Hadiya Mariyam Ahmed',     'Core — Research',        'RESEARCH',          null, { linkedin: 'https://www.linkedin.com/in/hadiya-mariyam-ahmed-583168346' }),
    mk('AFFAAF AHMED',             'Core — Research',        'RESEARCH',          null, { linkedin: 'https://www.linkedin.com/in/affaaf-ahmed', github: 'https://github.com/Affaaf-Ahmed' }),
    mk('Arisa Laiba',              'Core — Research',        'RESEARCH',          null, { linkedin: 'https://www.linkedin.com/in/arisa-laiba', github: 'https://github.com/arisalaiba' }),
    mk('Aisha Erum',               'Core — Research',        'RESEARCH',          null, { linkedin: 'https://www.linkedin.com/in/aisha-erum-866860366' }),

    // PRESS & OUTREACH
    mk('Zuhair Tajammul',          'Core — Press & Outreach','PRESS & OUTREACH',  null, { linkedin: 'https://www.linkedin.com/in/zuhair-tajammul-19b8a5310' }),
    mk('Mohammed Ayaan Ali Khan',  'Core — Press & Outreach','PRESS & OUTREACH',  null, {}),
    mk('MOHAMMED ISHAQ ALI',       'Core — Press & Outreach','PRESS & OUTREACH',  null, { linkedin: 'https://www.linkedin.com/in/ishaq-ali-mohammed-596236389/', github: 'https://github.com/aman84sphs-debug' }),
    mk('Nashra Zarmeen',           'Core — Press & Outreach','PRESS & OUTREACH',  null, { linkedin: 'https://www.linkedin.com/in/nashra-zarmeen-4ab309332', github: 'https://github.com/nashrazarmeen7' }),
    mk('Shaza Rumman',             'Core — Press & Outreach','PRESS & OUTREACH',  null, {}),

    // OPERATIONS
    mk('Osman Bin Nasir',          'Core — Operations',      'OPERATIONS',        null, { linkedin: 'https://www.linkedin.com/in/osman-bin-nasir', github: 'https://github.com/Osman-bin-nasir/', portfolio: 'https://osman-bin-nasir.github.io/Portfolio/' }),
    mk('Murtuza Salman',           'Core — Operations',      'OPERATIONS',        null, {}),
    mk('Abdul Numan',              'Core — Operations',      'OPERATIONS',        null, { linkedin: 'https://www.linkedin.com/in/abdul-numan-17586328a/', github: 'https://github.com/Numan2244' }),
    mk('Ahmed Ibrahim Khan',       'Core — Operations',      'OPERATIONS',        null, {}),
    mk('Mohammed Azeemuddin Ahmed','Core — Operations',      'OPERATIONS',        null, { linkedin: 'https://www.linkedin.com/in/mohammed-azeem-uddin-ahmed-281145285' }),
    mk('Mohammed Ehteshamuddin Atif','Core — Operations',   'OPERATIONS',        null, {}),
    mk('Mohammed Abdul Sami',      'Core — Operations',      'OPERATIONS',        null, { github: 'https://github.com/halalfamm' }),

    // DOCUMENTATION
    mk('SYED ASIF HUSSAIN',        'Core — Documentation',   'DOCUMENTATION',     null, {}),
    mk('Ghouse Mohiuddin Ansari',  'Core — Documentation',   'DOCUMENTATION',     null, {}),
    mk('NAUSHEEN FATIMA',          'Core — Documentation',   'DOCUMENTATION',     null, {}),
    mk('Syeda Namira Naaz',        'Core — Documentation',   'DOCUMENTATION',     null, {}),
];

// ─────────────────────────────────────────
// 2024–2025 — Placeholder (past batch)
// ─────────────────────────────────────────
const EXECOM_DEPARTMENTS_2024 = ['ALL', 'TECH', 'MEDIA', 'MARKETING', 'HR', 'DESIGN', 'RESEARCH', 'PRESS & OUTREACH', 'OPERATIONS', 'DOCUMENTATION'];
const EXECOM_MEMBERS_2024 = []; // Add past batch data when available
const CORE_DEPARTMENTS_2024 = EXECOM_DEPARTMENTS_2024;
const CORE_MEMBERS_2024 = [];

// ─────────────────────────────────────────
// 2026–2027 — Upcoming (locked / TBA)
// ─────────────────────────────────────────
const EXECOM_DEPARTMENTS_2026 = ['ALL', 'TECH', 'MEDIA', 'MARKETING', 'HR', 'DESIGN', 'RESEARCH', 'PRESS & OUTREACH', 'OPERATIONS', 'DOCUMENTATION'];
const EXECOM_MEMBERS_2026 = [];
const CORE_DEPARTMENTS_2026 = EXECOM_DEPARTMENTS_2026;
const CORE_MEMBERS_2026 = [];

// ── GB members by year (2024–2025 and 2026–2027 are empty intentionally) ──
const GB_MEMBERS_2024 = [];   // Photos TBD — user will supply
const GB_MEMBERS_2026 = [];   // Upcoming — not yet announced

// ── Lookup by year ──
const DATA_BY_YEAR = {
    '2024–2025': { gbMembers: GB_MEMBERS_2024, execomDepts: EXECOM_DEPARTMENTS_2024, execomMembers: EXECOM_MEMBERS_2024, coreDepts: CORE_DEPARTMENTS_2024, coreMembers: CORE_MEMBERS_2024 },
    '2025–2026': { gbMembers: GB_MEMBERS,      execomDepts: EXECOM_DEPARTMENTS_2025, execomMembers: EXECOM_MEMBERS_2025, coreDepts: CORE_DEPARTMENTS_2025, coreMembers: CORE_MEMBERS_2025 },
    '2026–2027': { gbMembers: GB_MEMBERS_2026, execomDepts: EXECOM_DEPARTMENTS_2026, execomMembers: EXECOM_MEMBERS_2026, coreDepts: CORE_DEPARTMENTS_2026, coreMembers: CORE_MEMBERS_2026 },
};

// ─────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────

/** Marquee section divider — white bg, cyan text, matching GB.jsx style */
const SectionBanner = ({ label }) => {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        let anim;
        const start = () => {
            if (anim) anim.kill();
            const unit = el.children[0]?.offsetWidth || 400;
            anim = gsap.to(el, {
                x: -unit, duration: 22, ease: 'none', repeat: -1,
                modifiers: { x: gsap.utils.unitize(x => parseFloat(x) % unit) },
            });
        };
        const t = setTimeout(start, 100);
        window.addEventListener('resize', start);
        return () => { anim?.kill(); clearTimeout(t); window.removeEventListener('resize', start); };
    }, []);

    const Item = ({ outlined }) => (
        <div className="flex items-center gap-8 md:gap-16 whitespace-nowrap px-6 md:px-12">
            <span
                className={`text-[6vw] md:text-[4vw] font-black uppercase leading-none select-none py-10 tracking-tighter ${outlined ? 'text-transparent' : 'text-cyan-400'}`}
                style={outlined ? { WebkitTextStroke: '2px #22d3ee' } : {}}
            >
                {label}
            </span>
            <span className="text-[4vw] md:text-[2vw] font-black text-cyan-400 opacity-20">•</span>
        </div>
    );

    return (
        <div className="overflow-hidden border-y border-neutral-100 bg-white py-2">
            <div ref={ref} className="flex w-max will-change-transform">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex">
                        <Item outlined={false} />
                        <Item outlined={true} />
                    </div>
                ))}
            </div>
        </div>
    );
};

/** Department filter pills — white bg style */
const FilterTabs = ({ departments, active, onChange }) => (
    <div className="flex flex-wrap justify-center gap-2 md:gap-3">
        {departments.map(dep => (
            <motion.button
                key={dep}
                onClick={() => onChange(dep)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-bold tracking-widest uppercase border-2 transition-all duration-300 ${
                    active === dep
                        ? 'bg-cyan-400 text-black border-cyan-400'
                        : 'bg-white text-neutral-400 border-neutral-200 hover:border-cyan-400/60 hover:text-cyan-400'
                }`}
            >
                {dep}
            </motion.button>
        ))}
    </div>
);

/** Gradient placeholder for members without photos */
const PhotoPlaceholder = ({ color }) => (
    <div
        className="w-full h-full flex items-end justify-center pb-8"
        style={{ background: `linear-gradient(160deg, ${color}33 0%, ${color}88 60%, ${color}bb 100%)` }}
    >
        <span className="text-5xl md:text-6xl font-black text-white/15 select-none tracking-widest">PN</span>
    </div>
);

// ─────────────────────────────────────────
// CARDS
// ─────────────────────────────────────────

/** GB Card — portrait image | name | position | linkedin + email */
const GBCard = ({ member, index }) => {
    
};

/** ExecCom / Core card — portrait image | name | position | portfolio | linkedin + github */
const MemberCard = ({ member, index }) => {
    
};

// ─────────────────────────────────────────
// SECTION HEADING — reusable
// ─────────────────────────────────────────
const SectionHeading = ({ eyebrow, title, subtitle }) => {
    const ref = useRef(null);
    useEffect(() => {
        if (!ref.current) return;
        gsap.fromTo(ref.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
              scrollTrigger: { trigger: ref.current, start: 'top 85%' } }
        );
    }, []);

    return (
        <div ref={ref} className="text-center mb-14 md:mb-20">
            <p className="text-cyan-400 text-xs font-bold tracking-[0.4em] uppercase mb-3">{eyebrow}</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-black uppercase tracking-tighter"
                style={{ fontFamily: "'Russo One', sans-serif" }}>
                {title}
            </h2>
            <p className="text-neutral-500 mt-4 text-sm md:text-base max-w-md mx-auto leading-relaxed">{subtitle}</p>
            <div className="mx-auto mt-5 w-12 h-[3px] bg-cyan-400 rounded-full" />
        </div>
    );
};

// ─────────────────────────────────────────
// PAGE HERO
// ─────────────────────────────────────────
const TeamHero = () => (
    <section className="relative min-h-[60vh] flex flex-col items-center justify-center px-6 bg-white overflow-hidden">
        <AnimatedBackground />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
            <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="text-cyan-400 text-xs md:text-sm font-bold tracking-[0.4em] uppercase mb-4">
                IEEE Computational Intelligence Society · MJCET
            </motion.p>

            <motion.h1
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase leading-none tracking-tighter text-black mb-6"
                style={{ fontFamily: "'Russo One', sans-serif" }}>
                OUR<br />
                <span className="text-cyan-400">TEAM</span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                className="text-neutral-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                The brilliant minds driving innovation, excellence,<br className="hidden md:block" />
                and the future of Computational Intelligence at MJCET.
            </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>

            <motion.div className="w-px h-8 bg-gradient-to-b from-cyan-400 to-transparent"
                animate={{ scaleY: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
        </motion.div>
    </section>
);

// ─────────────────────────────────────────
// GB SECTION
// ─────────────────────────────────────────
const GoverningBodySection = ({ gbMembers, yearStatus }) => (
    <section className="relative bg-white py-20 md:py-28 px-6 overflow-hidden">
        <AnimatedBackground />
        <div className="relative z-10 max-w-7xl mx-auto">
            <SectionHeading
                eyebrow="Leadership"
                title="Governing Body"
                subtitle="Meet the visionary leaders who guide our organisation towards research excellence and driven success."
            />
            {gbMembers.length === 0 ? (
                <EmptyYearScreen label={yearStatus === 'upcoming' ? 'Coming Soon' : 'Data Not Available'} />
            ) : (
                <div className="space-y-6 md:space-y-8">
                    {/* Row 1 — 4 members */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-5">
                        {gbMembers.slice(0, 4).map((m, i) => <GBCard key={i} member={m} index={i} />)}
                    </div>
                    {/* Row 2 — 3 members, centered */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-5 max-w-3xl mx-auto">
                        {gbMembers.slice(4).map((m, i) => <GBCard key={i + 4} member={m} index={i + 4} />)}
                    </div>
                </div>
            )}
        </div>
    </section>
);

// ─────────────────────────────────────────
// YEAR SWITCHER
// ─────────────────────────────────────────
const YearSwitcher = ({ activeYear, onChange }) => (
    <div className="flex justify-center gap-3 flex-wrap">
        {BATCH_YEARS.map(({ label, status }) => (
            <motion.button
                key={label}
                onClick={() => onChange(label)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className={`relative px-6 py-2.5 rounded-full text-sm font-black tracking-widest uppercase border-2 transition-all duration-300 ${
                    activeYear === label
                        ? 'bg-cyan-400 text-black border-cyan-400 shadow-[0_0_24px_rgba(34,211,238,0.35)]'
                        : 'bg-white text-neutral-400 border-neutral-200 hover:border-cyan-400/60 hover:text-cyan-400'
                }`}
            >
                {label}
                {status === 'current' && (
                    <span className="absolute -top-1.5 -right-1.5 bg-cyan-400 text-black text-[9px] font-black px-1.5 py-0.5 rounded-full tracking-wider uppercase leading-none">
                        NOW
                    </span>
                )}
                {status === 'upcoming' && (
                    <span className="absolute -top-1.5 -right-1.5 bg-neutral-200 text-neutral-500 text-[9px] font-black px-1.5 py-0.5 rounded-full tracking-wider uppercase leading-none">
                        TBA
                    </span>
                )}
            </motion.button>
        ))}
    </div>
);

const EmptyYearScreen = ({ label }) => (
    <div className="text-center py-24 px-6">
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex flex-col items-center gap-4"
        >
            <div className="w-20 h-20 rounded-full border-2 border-dashed border-cyan-400/40 flex items-center justify-center">
                <span className="text-3xl text-cyan-400/40">✦</span>
            </div>
            <p className="text-2xl font-black text-neutral-200 uppercase tracking-widest" style={{ fontFamily: "'Russo One', sans-serif" }}>
                {label}
            </p>
            <p className="text-neutral-400 text-sm tracking-widest uppercase">Team data will be revealed soon</p>
        </motion.div>
    </div>
);

// ─────────────────────────────────────────
// EXECOM SECTION
// ─────────────────────────────────────────
const ExecomSection = ({ execomDepts, execomMembers, yearStatus }) => {
    const [activeTab, setActiveTab] = useState('ALL');
    useEffect(() => { setActiveTab('ALL'); }, [execomMembers]);
    const filtered = activeTab === 'ALL' ? execomMembers : execomMembers.filter(m => m.department === activeTab);

    return (
        <section className="relative bg-white py-20 md:py-28 px-6 overflow-hidden">
            {/* Subtle top separator */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent pointer-events-none" />
            <AnimatedBackground />

            <div className="relative z-10 max-w-7xl mx-auto">
                <SectionHeading
                    eyebrow="Executive Committee"
                    title="Execom Members"
                    subtitle="The passionate team members who bring our vision to life, year after year."
                />

                {execomMembers.length === 0 ? (
                    <EmptyYearScreen label={yearStatus === 'upcoming' ? 'Coming Soon' : 'Data Not Available'} />
                ) : (
                    <>
                        <div className="mb-10 md:mb-12">
                            <FilterTabs departments={execomDepts} active={activeTab} onChange={setActiveTab} />
                        </div>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.32, ease: 'easeInOut' }}
                                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
                                {filtered.map((m, i) => <MemberCard key={`ec-${i}`} member={m} index={i} />)}
                            </motion.div>
                        </AnimatePresence>
                        {filtered.length === 0 && (
                            <div className="text-center py-20 text-neutral-300">
                                <p className="text-4xl mb-3">—</p>
                                <p className="text-sm tracking-widest uppercase">No members in this department</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

// ─────────────────────────────────────────
// CORE SECTION
// ─────────────────────────────────────────
const CoreSection = ({ coreDepts, coreMembers, yearStatus }) => {
    const [activeTab, setActiveTab] = useState('ALL');
    useEffect(() => { setActiveTab('ALL'); }, [coreMembers]);
    const filtered = activeTab === 'ALL' ? coreMembers : coreMembers.filter(m => m.department === activeTab);

    return (
        <section className="relative bg-white py-20 md:py-28 px-6 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent pointer-events-none" />
            <AnimatedBackground />

            <div className="relative z-10 max-w-7xl mx-auto">
                <SectionHeading
                    eyebrow="Core Team"
                    title="Core Members"
                    subtitle="The backbone of our society — dedicated individuals who make things happen behind the scenes."
                />

                {coreMembers.length === 0 ? (
                    <EmptyYearScreen label={yearStatus === 'upcoming' ? 'Coming Soon' : 'Data Not Available'} />
                ) : (
                    <>
                        <div className="mb-10 md:mb-12">
                            <FilterTabs departments={coreDepts} active={activeTab} onChange={setActiveTab} />
                        </div>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.32, ease: 'easeInOut' }}
                                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
                                {filtered.map((m, i) => <MemberCard key={`core-${i}`} member={m} index={i} />)}
                            </motion.div>
                        </AnimatePresence>
                        {filtered.length === 0 && (
                            <div className="text-center py-20 text-neutral-300">
                                <p className="text-4xl mb-3">—</p>
                                <p className="text-sm tracking-widest uppercase">No members in this department</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

// ─────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────
export default function Team() {
    const [activeYear, setActiveYear] = useState('2025–2026');
    const yearData = DATA_BY_YEAR[activeYear];
    const yearStatus = BATCH_YEARS.find(b => b.label === activeYear)?.status ?? 'current';

    return (
        <div className="bg-white text-black min-h-screen">
            <TeamHero />

            {/* ── Year Switcher Bar ── */}
            <section className="relative bg-white py-10 px-6 border-b border-neutral-100">
                <AnimatedBackground />
                <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center gap-3">
                    <p className="text-neutral-400 text-xs font-bold tracking-[0.35em] uppercase">Select Batch Year</p>
                    <YearSwitcher activeYear={activeYear} onChange={setActiveYear} />
                </div>
            </section>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeYear}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.45, ease: 'easeInOut' }}
                >
                    <SectionBanner label={`Governing Body · ${activeYear}`} />
                    <GoverningBodySection gbMembers={yearData.gbMembers} yearStatus={yearStatus} />
                    {activeYear !== '2024–2025' && (
                        <>
                            <SectionBanner label={`Execom · ${activeYear}`} />
                            <ExecomSection
                                execomDepts={yearData.execomDepts}
                                execomMembers={yearData.execomMembers}
                                yearStatus={yearStatus}
                            />
                            <SectionBanner label={`Core Team · ${activeYear}`} />
                            <CoreSection
                                coreDepts={yearData.coreDepts}
                                coreMembers={yearData.coreMembers}
                                yearStatus={yearStatus}
                            />
                        </>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
