import AnimatedBackground from "../AnimatedBackground"

export default function Team() {
    return (
        <div className="relative  min-h-screen bg-white text-black pt-24 px-6">
            <AnimatedBackground />
            <div className="relative text-center z-10 max-w-7xl mx-auto">
                <h1 className="text-5xl font-bold mb-8">Our Team</h1>
                <p className="text-xl text-gray-300">Meet the IEEE CIS team members.</p>
            </div>
        </div>
    )
}
