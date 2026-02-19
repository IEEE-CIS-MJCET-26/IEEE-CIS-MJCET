import AnimatedBackground from "../AnimatedBackground"

export default function Events() {
    return (
        <div className="relative min-h-screen bg-white text-black pt-24 px-6">
            <AnimatedBackground />
            <div className="relative text-center z-10 max-w-7xl mx-auto">
                <h1 className="text-5xl font-bold mb-8">Events</h1>
                <p className="text-xl text-gray-300">Explore our upcoming and past events.</p>
            </div>
        </div>
    )
}
