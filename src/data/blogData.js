/* ─────────────────────────────────────────
   SHARED BLOG DATA
   Used by Blogs.jsx and BlogDetail.jsx
   ───────────────────────────────────────── */

const BLOG_DATA = [
    {
        id: 1,
        title: 'How Computational Intelligence Is Shaping the Future of AI',
        description: 'A deep dive into how CI methodologies — from fuzzy logic to evolutionary algorithms — are driving the next wave of intelligent systems and reshaping industries worldwide.',
        category: 'AI & ML',
        image: '/assets/blog/hero-ai.png',
        author: 'Mohammed Nouman',
        date: 'Feb 20, 2026',
        readTime: '8 min read',
        featured: true,
        content: [
            { type: 'paragraph', text: 'Computational Intelligence (CI) is a set of nature-inspired computational methodologies and approaches that address complex real-world problems. Unlike traditional artificial intelligence, CI draws inspiration from biological and physical processes — evolution, swarm behaviour, neural networks, and fuzzy reasoning — to build systems that can learn, adapt, and make decisions in uncertain environments.' },
            { type: 'heading', text: 'What Falls Under Computational Intelligence?' },
            { type: 'paragraph', text: 'The IEEE Computational Intelligence Society broadly defines CI as encompassing three major pillars, each with deep roots in mathematical theory and practical engineering applications:' },
            {
                type: 'list', items: [
                    'Neural Networks — Inspired by the human brain, these architectures learn patterns from data. Modern deep learning (CNNs, RNNs, Transformers) is built on this foundation.',
                    'Fuzzy Logic — Deals with reasoning that is approximate rather than fixed and exact. Particularly useful in control systems where inputs are imprecise.',
                    'Evolutionary Computation — Algorithms inspired by natural selection: genetic algorithms, evolution strategies, and genetic programming that optimise through iterative improvement.',
                ]
            },
            { type: 'heading', text: 'Why CI Matters Now More Than Ever' },
            { type: 'paragraph', text: 'As the world generates more data than ever before — from IoT sensors to social media streams — traditional rule-based systems struggle to keep pace. CI methodologies thrive in exactly these conditions: high dimensionality, noise, uncertainty, and incomplete information.' },
            { type: 'paragraph', text: 'Industries from healthcare to autonomous driving are adopting CI-powered solutions. Swarm intelligence optimises logistics. Neural networks detect diseases from medical images. Evolutionary algorithms design structures that human engineers never imagined.' },
            { type: 'heading', text: 'The Road Ahead' },
            { type: 'paragraph', text: 'The convergence of CI with emerging technologies — quantum computing, edge AI, and neuromorphic hardware — promises to unlock capabilities we are only beginning to imagine. At IEEE CIS MJCET, we believe understanding these foundations is essential for any aspiring engineer or researcher in the field.' },
            { type: 'paragraph', text: 'Whether you are building your first neural network or exploring swarm-based optimisation, the principles of computational intelligence provide a powerful, flexible, and mathematically grounded toolkit for solving the problems that matter.' },
        ],
    },
    {
        id: 2,
        title: 'Inside CIS Hackathon 2026: A Recap of Innovation',
        description: "Teams competed for 24 hours to build solutions powered by computational intelligence. Here's what happened, who won, and what we learned.",
        category: 'Events',
        image: '/assets/blog/card-hackathon.png',
        author: 'Mohammed Nouman',
        date: 'Feb 15, 2026',
        readTime: '6 min read',
        content: [
            { type: 'paragraph', text: 'The CIS Hackathon 2026 brought together over 120 participants across 30 teams for an intense 24-hour sprint of innovation, creativity, and computational intelligence. Hosted at MJCET\'s central auditorium, the event was our largest and most ambitious hackathon to date.' },
            { type: 'heading', text: 'The Challenge' },
            { type: 'paragraph', text: 'This year\'s theme was "Intelligence for Impact" — teams were tasked with building solutions that leverage CI methodologies to address real-world challenges in healthcare, education, sustainability, or accessibility. The only rule: your solution must incorporate at least one CI technique.' },
            {
                type: 'list', items: [
                    'Team Swarm Logic — Built a drone fleet coordination system using particle swarm optimisation.',
                    'Team NeuroAssist — Created an accessible learning tool using NLP and adaptive neural networks.',
                    'Team EcoEvolve — Developed a genetic algorithm-based system for optimising urban energy grids.',
                ]
            },
            { type: 'heading', text: 'Key Takeaways' },
            { type: 'paragraph', text: 'Beyond the technical achievements, the hackathon reinforced something we deeply believe at CIS: the best learning happens when theory meets urgency. Under time pressure, participants made architectural decisions, debugged complex systems, and presented their work — skills no classroom can fully replicate.' },
            { type: 'paragraph', text: 'We are already planning the next edition. Stay tuned for CIS Hackathon 2026.5 — the mid-year sprint.' },
        ],
    },
    {
        id: 3,
        title: 'Research Spotlight: Swarm Intelligence in Autonomous Systems',
        description: 'Our research team explores how swarm-based algorithms are enabling decentralised decision-making in robotics and drone fleets.',
        category: 'Research',
        image: '/assets/blog/card-research.png',
        author: 'Mohammed Nouman',
        date: 'Feb 10, 2026',
        readTime: '10 min read',
        content: [
            { type: 'paragraph', text: 'Swarm intelligence — the collective behaviour of decentralised, self-organised systems — has moved from theoretical curiosity to engineering reality. Our research group at IEEE CIS MJCET has been exploring how swarm-based algorithms can solve coordination problems in autonomous systems.' },
            { type: 'heading', text: 'From Ants to Algorithms' },
            { type: 'paragraph', text: 'The inspiration comes from nature: ant colonies find shortest paths, bird flocks navigate without central control, and fish schools evade predators through simple local rules. These behaviours emerge from individual agents following basic interaction protocols — no leader required.' },
            {
                type: 'list', items: [
                    'Ant Colony Optimisation (ACO) — Mimics pheromone trail communication for pathfinding and routing.',
                    'Particle Swarm Optimisation (PSO) — Simulates social behaviour for continuous optimisation problems.',
                    'Artificial Bee Colony (ABC) — Models foraging behaviour for resource allocation.',
                ]
            },
            { type: 'heading', text: 'Applications in Autonomous Drones' },
            { type: 'paragraph', text: 'Our team has been applying PSO-based coordination to multi-drone surveillance scenarios. Each drone maintains only local awareness — its position, velocity, and the positions of nearby neighbours — yet the swarm converges on optimal coverage patterns without any centralised controller.' },
            { type: 'heading', text: 'What We Learned' },
            { type: 'paragraph', text: 'The key insight from our experiments: robustness scales with simplicity. The simpler the individual agent rules, the more resilient the swarm behaviour becomes when agents fail or communication is disrupted. This counter-intuitive result has profound implications for designing reliable autonomous systems.' },
        ],
    },
    {
        id: 4,
        title: 'Getting Started with Neural Networks: A Practical Guide',
        description: 'A beginner-friendly walkthrough for building your first neural network from scratch using Python and NumPy — no frameworks required.',
        category: 'Tutorials',
        image: '/assets/blog/card-tutorial.png',
        author: 'Mohammed Nouman',
        date: 'Feb 5, 2026',
        readTime: '12 min read',
        content: [
            { type: 'paragraph', text: 'Neural networks can feel intimidating when you first encounter them — layers, activations, backpropagation, gradient descent. But at their core, they are surprisingly simple: a series of matrix multiplications followed by non-linear functions, trained by iteratively adjusting weights to minimise error.' },
            { type: 'heading', text: 'What You Will Build' },
            { type: 'paragraph', text: 'In this tutorial, we will build a 2-layer neural network from scratch using only Python and NumPy. No TensorFlow, no PyTorch — just raw linear algebra. By the end, you will understand every line of code and every mathematical operation that makes a neural network learn.' },
            {
                type: 'list', items: [
                    'Forward propagation — How data flows through the network to produce predictions.',
                    'Loss calculation — Measuring how wrong our predictions are using cross-entropy loss.',
                    'Backpropagation — Computing gradients to understand how each weight contributes to the error.',
                    'Weight updates — Using gradient descent to iteratively improve the network.',
                ]
            },
            { type: 'heading', text: 'Why Build From Scratch?' },
            { type: 'paragraph', text: 'Frameworks like PyTorch abstract away the details — which is powerful for production, but dangerous for understanding. When you build from scratch, you develop intuition for why certain architectures work, why training sometimes fails, and how to debug models that are not converging.' },
            { type: 'heading', text: 'Next Steps' },
            { type: 'paragraph', text: 'Once you are comfortable with the fundamentals, move to a framework. But carry this understanding with you — it will make you a significantly better ML engineer than someone who only knows the API.' },
        ],
    },
    {
        id: 5,
        title: 'Building a Tech Community That Actually Lasts',
        description: "Lessons from running IEEE CIS at MJCET — what works, what doesn't, and why consistency beats hype every single time.",
        category: 'Events',
        image: '/assets/blog/card-community.png',
        author: 'Mohammed Nouman',
        date: 'Jan 28, 2026',
        readTime: '7 min read',
        content: [
            { type: 'paragraph', text: 'Most student tech communities follow a predictable arc: an enthusiastic founding, a burst of events, growing fatigue, and then silence. At IEEE CIS MJCET, we have been thinking deeply about how to break this cycle — and we believe we have found some answers.' },
            { type: 'heading', text: 'The Consistency Principle' },
            { type: 'paragraph', text: 'The single most important factor in community longevity is not talent, budget, or even leadership. It is consistency. Regular events, predictable communication, and reliable follow-through create trust — and trust is what makes people show up again.' },
            {
                type: 'list', items: [
                    'Ship regularly — One well-executed event per month beats five rushed ones per semester.',
                    'Document everything — Knowledge transfer is how communities survive leadership transitions.',
                    'Celebrate learning, not just achievement — Create space for beginners and questions.',
                    'Build systems, not dependencies — No community should collapse when one person leaves.',
                ]
            },
            { type: 'heading', text: 'What We Got Wrong' },
            { type: 'paragraph', text: 'We have made mistakes too. Early on, we over-indexed on large flagship events and neglected the small, intimate sessions where real learning happens. We learned that a 15-person workshop where everyone codes together creates more lasting impact than a 200-person seminar with a guest speaker.' },
            { type: 'heading', text: 'The Long Game' },
            { type: 'paragraph', text: 'Building a community is not a sprint — it is infrastructure work. Every session documented, every member mentored, every process systematised compounds over time. Play the long game.' },
        ],
    },
    {
        id: 6,
        title: 'Deep Learning Demystified: CNNs, RNNs, and Transformers',
        description: 'An accessible breakdown of the three architectures powering modern AI — with visual explanations and real-world use cases.',
        category: 'AI & ML',
        image: '/assets/blog/card-deeplearning.png',
        author: 'Mohammed Nouman',
        date: 'Jan 20, 2026',
        readTime: '9 min read',
        content: [
            { type: 'paragraph', text: 'Deep learning is not one thing — it is a family of architectures, each designed for different types of data and problems. Understanding when to use which architecture is one of the most important skills in modern machine learning.' },
            { type: 'heading', text: 'Convolutional Neural Networks (CNNs)' },
            { type: 'paragraph', text: 'CNNs are the workhorses of computer vision. They use learnable filters that slide across input images, detecting features at multiple scales — edges, textures, shapes, and eventually high-level concepts like faces or objects. The key innovation is parameter sharing: the same filter is applied across the entire image, dramatically reducing the number of parameters.' },
            { type: 'heading', text: 'Recurrent Neural Networks (RNNs)' },
            { type: 'paragraph', text: 'RNNs process sequential data — text, time series, audio — by maintaining a hidden state that carries information from previous steps. While powerful in theory, vanilla RNNs suffer from vanishing gradients. This led to LSTM and GRU variants, which use gating mechanisms to selectively remember and forget information.' },
            { type: 'heading', text: 'Transformers: The Current Revolution' },
            { type: 'paragraph', text: 'Transformers abandoned recurrence entirely in favour of self-attention — a mechanism that allows every element in a sequence to attend to every other element simultaneously. This parallelisability, combined with the attention mechanism\'s expressiveness, has made Transformers the dominant architecture for NLP, and increasingly for vision and multimodal tasks.' },
            {
                type: 'list', items: [
                    'CNNs → Best for spatial data: images, video, medical scans.',
                    'RNNs/LSTMs → Useful for sequential data where order matters and sequences are short.',
                    'Transformers → State-of-the-art for language, long sequences, and increasingly for everything else.',
                ]
            },
            { type: 'heading', text: 'Choosing the Right Architecture' },
            { type: 'paragraph', text: 'The architecture should match your data and constraints. CNNs remain more efficient for pure vision tasks. RNNs still have a place in edge devices where Transformer overhead is prohibitive. And Transformers, while powerful, require significant data and compute. Understanding these trade-offs is what separates engineers who build working systems from those who only follow tutorials.' },
        ],
    },
];

export default BLOG_DATA;
