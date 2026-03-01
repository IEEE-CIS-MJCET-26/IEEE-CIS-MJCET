import React from 'react';
import { motion } from 'framer-motion';


const Marque = () => {
    const text = "  BUILD.CREATE.INNOVATE. ".repeat(20);

    return (
        <div className="w-full overflow-hidden">
            <MarqueeRow text={text} direction="left" />
            <MarqueeRow text={text} direction="right" />
        </div>
    );
};

const MarqueeRow = ({ text, direction }) => {
    const duration = 10;

    return (
        <div className="relative bg-black py-3 overflow-hidden">
            <motion.div
                className="flex whitespace-nowrap"
                animate={{
                    x: direction === "left" ? [0, "-50%"] : ["-50%", 0]
                }}
                transition={{
                    duration,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                <span
                    className="text-cyan-400 text-2xl md:text-3xl lg:text-4xl leading-none tracking-widest uppercase not-italic font-bold"
                    style={{ fontFamily: "'Zen Dots', sans-serif", fontStyle: "normal" }}
                >
                    {text}
                </span>

                <span
                    className="text-cyan-400 text-2xl md:text-3xl lg:text-4xl leading-none tracking-widest uppercase not-italic font-bold"
                    style={{ fontFamily: "'Zen Dots', sans-serif", fontStyle: "normal" }}
                >
                    {text}
                </span>
            </motion.div>
        </div>
    );
};

export default Marque;