import React from 'react';
import { motion } from 'framer-motion';

const Marque = () => {
    // Repeat text enough times to ensure no gaps on any screen size
    const text = "BUILD.CREATE.INNOVATE.".repeat(20);

    return (
        <div className="w-full overflow-hidden">
            {/* Top Row - Right to Left */}
            <MarqueeRow text={text} direction="left" />

            {/* Bottom Row - Left to Right */}
            <MarqueeRow text={text} direction="right" />
        </div>
    );
};

const MarqueeRow = ({ text, direction }) => {
    // Animation duration - adjust for speed (lower = faster)
    const duration = 10;

    return (
        <div className="relative bg-cyan-400 border-t border-b border-white py-1 md:py-2 lg:py-2 overflow-hidden">
            <motion.div
                className="flex whitespace-nowrap"
                animate={{
                    x: direction === "left" ? [0, "-50%"] : ["-50%", 0]
                }}
                transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                {/* Duplicate text twice for seamless loop */}
                <span className="marquee-text text-xl md:text-2xl lg:text-3xl leading-none font-stalinist ">{text}</span>
                <span className="marquee-text text-xl md:text-2xl lg:text-3xl leading-none font-stalinist ">{text}</span>
            </motion.div>
        </div>
    );
};

export default Marque;
