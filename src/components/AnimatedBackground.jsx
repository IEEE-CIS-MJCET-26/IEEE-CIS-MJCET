import { motion } from 'framer-motion';


const AnimatedBackground = () => {
    const floatingVariants = {
        animate: {
            y: [0, -20, 0],
            transition: {
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
            },
        },
    };

    // Slower floating for variety
    const floatingSlowVariants = {
        animate: {
            y: [0, -15, 0],
            transition: {
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
            },
        },
    };

    // Gentle rotation animation
    const rotatingVariants = {
        animate: {
            rotate: [0, 360],
            transition: {
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
            },
        },
    };
    const reverseRotatingVariants = {
        animate: {
            rotate: [0, -360],
            transition: {
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
            },
        },
    };

    return (
        <div
            className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0"
            aria-hidden="true"
        >
            {/* Large Circle - Top Left */}
            <motion.div
                className="absolute top-10 left-10 w-64 h-64 hidden md:block  md:w-80 md:h-80 rounded-full border-2 border-cyan-400/20 will-change-transform"
                variants={floatingVariants}
                animate="animate"
            />

            {/* Medium Circle - Top Right */}
            <motion.div
                className="absolute top-20 right-16 hidden md:block w-48 h-48 md:w-60 md:h-60 rounded-full border border-cyan-400/8 will-change-transform"
                variants={floatingSlowVariants}
                animate="animate"
            />



            {/* Large Rounded Square - Bottom Right */}
            <motion.div
                className="absolute bottom-16 right-12 w-56 h-56 md:w-72 md:h-72 rounded-3xl border-2 border-cyan-400/20 will-change-transform"
                variants={rotatingVariants}
                animate="animate"
            />


            {/* Small Rounded Square - Top Center */}
            <motion.div
                className="absolute top-32 left-1/2 w-36 h-36 md:w-44 md:h-44 rounded-xl border-2 border-cyan-400/12 will-change-transform"
                variants={rotatingVariants}
                animate="animate"
                transition={{ delay: 1.5 }}
            />

            {/* Extra Circle - Mid Right */}
            <motion.div
                className="absolute top-1/3 right-8 w-32 h-32 md:w-20 md:h-20 rounded-full border border-cyan-400/10 will-change-transform"
                variants={floatingSlowVariants}
                animate="animate"
                transition={{ delay: 2 }}
            />

            {/* Extra Rounded Square - Mid Left */}
            <motion.div
                className="absolute bottom-10 left-16 w-48 h-48 md:w-30 md:h-30 rounded-2xl border-2 border-cyan-400/8 will-change-transform"
                variants={reverseRotatingVariants}
                animate="animate"
                transition={{ delay: 0.8 }}
            />
        </div>
    );
};

export default AnimatedBackground;
