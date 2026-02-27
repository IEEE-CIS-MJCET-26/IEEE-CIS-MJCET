import React, { useState } from 'react';
import { MapPin, Mail, Phone, Linkedin, Instagram, X, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import DotGrid from './DotGrid';

/* ─── Success Modal ─────────────────────────────────────────── */
const SuccessModal = ({ onClose }) => (
    <AnimatePresence>
        <motion.div
            key="overlay"
            className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(10px)' }}
        >
            <motion.div
                key="card"
                className="relative bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center"
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    aria-label="Close modal"
                    className="absolute top-4 right-4 text-cyan-400 hover:text-cyan-600 transition-colors"
                >
                    <X size={24} />
                </button>

                {/* Animated Check Icon */}
                <motion.div
                    className="flex justify-center mb-6"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <div className="w-20 h-20 rounded-full bg-cyan-50 flex items-center justify-center shadow-lg shadow-cyan-100">
                        <CheckCircle className="text-cyan-400" size={48} strokeWidth={1.8} />
                    </div>
                </motion.div>

                {/* Heading */}
                <h2 className="text-2xl font-black text-gray-800 mb-3 uppercase tracking-tight">
                    Message Sent!
                </h2>

                {/* Body */}
                <p className="text-gray-500 text-base leading-relaxed mb-8">
                    Form submitted successfully. We'll reach out to you shortly.{' '}
                    <span className="font-semibold text-gray-700">Thank you for contacting us.</span>
                </p>

                {/* Return to Home */}
                <Link
                    to="/"
                    onClick={onClose}
                    className="inline-block w-full py-3 px-6 rounded-xl font-bold text-white text-base transition-all duration-300 hover:scale-105 active:scale-95"
                    style={{ background: 'linear-gradient(45deg, #06b6d4, #3b82f6)' }}
                >
                    Return to Home Page
                </Link>
            </motion.div>
        </motion.div>
    </AnimatePresence>
);

/* ─── Contact Page ───────────────────────────────────────────── */
const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const data = new FormData();
            Object.entries(formData).forEach(([k, v]) => data.append(k, v));
            // Disable redirect — formsubmit sends to this URL but we intercept
            data.append('_captcha', 'false');

            await fetch('https://formsubmit.co/ieeecismjcet@gmail.com', {
                method: 'POST',
                body: data,
                headers: { Accept: 'application/json' }
            });

            // Show success modal regardless of network nuances
            setIsSubmitted(true);
            setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
        } catch (err) {
            console.error('Form submission error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative bg-white min-h-screen">
            {/* Success Modal */}
            {isSubmitted && <SuccessModal onClose={() => setIsSubmitted(false)} />}

            {/* DotGrid Background */}
            <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}>
                <DotGrid
                    dotSize={10}
                    gap={25}
                    baseColor="#f0f0f0"
                    activeColor="#22d3ee"
                    speedTrigger={100}
                    maxSpeed={5000}
                    resistance={750}
                    proximity={120}
                    shockRadius={250}
                    shockStrength={15}
                    returnDuration={2}
                />
            </div>

            <section className="pt-32 lg:pt-36">
                <div className="mb-12 relative z-10 text-center">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-cyan-400 uppercase leading-tight tracking-relaxed">
                        Got ideas ? Let's ship them together !
                    </h2>
                    <p className="text-black text-lg leading-relaxed mt-3">
                        From ideas to execution, we're just a message away.
                    </p>
                </div>
            </section>

            {/* Main Content Section */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

                    {/* Contact Form */}
                    <div className="order-1 lg:order-2">
                        <div className="backdrop-blur-md bg-white/10 border-2 border-cyan-400 rounded-3xl p-8 md:p-10 shadow-xl">
                            <h2 className="text-3xl md:text-4xl uppercase font-black text-gray-800 mb-6">
                                Send us a message
                            </h2>
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >
                                {/* Name */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full md:col-span-2 px-5 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:outline-none transition-colors"
                                        required
                                    />
                                </div>

                                {/* Phone & Email */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:outline-none transition-colors"
                                        required
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:outline-none transition-colors"
                                        required
                                    />
                                </div>

                                {/* Subject */}
                                <input
                                    type="text"
                                    name="subject"
                                    placeholder="Subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:outline-none transition-colors"
                                    required
                                />

                                {/* Message */}
                                <textarea
                                    name="message"
                                    placeholder="Your Message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="6"
                                    className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                                    required
                                />

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 px-8 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                                    style={{ background: 'linear-gradient(45deg, #06b6d4, #3b82f6)' }}
                                >
                                    {isSubmitting ? 'Sending…' : 'Send Message'}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="order-2 lg:order-1">
                        <div className="space-y-8">
                            <div className="mb-12 mt-8 mr-30 relative z-10">
                                <h2 className="text-3xl sm:text-2xl md:text-3xl lg:text-3xl font-black uppercase leading-tight tracking-tighter">
                                    Connect with us.
                                </h2>
                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                                    <Mail className="text-cyan-500" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Work With Us</h3>
                                    <p className="text-gray-600">
                                        <a href="mailto:ieee.cis@mjcollege.ac.in" className="hover:text-cyan-500 transition-colors">
                                            ieee.cis@mjcollege.ac.in
                                        </a>
                                    </p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                                    <Phone className="text-cyan-500" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Get in touch with us</h3>
                                    <p className="text-gray-600">
                                        <a href="tel:+918978706886" className="hover:text-cyan-500 transition-colors">
                                            +91 89787 06886
                                        </a>
                                    </p>
                                </div>
                            </div>

                            {/* Address */}
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                                    <MapPin className="text-cyan-500" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Find Us</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Muffakham Jah College of Engineering &amp; Technology, Block 5,{' '}
                                        Road No.3, Banjara Hills, Hyderabad, T.S
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="mt-10">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Follow Us</h3>
                            <div className="flex gap-4">
                                <a
                                    href="https://www.linkedin.com/company/ieee-computational-intelligence-society-mjcet/"
                                    className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-cyan-400 hover:text-white transition-all duration-300"
                                >
                                    <Linkedin size={20} />
                                </a>
                                <a
                                    href="https://www.instagram.com/ieeemjcet_cis/"
                                    className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-cyan-400 hover:text-white transition-all duration-300"
                                >
                                    <Instagram size={20} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Google Map */}
            <section className="relative w-full py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-10 flex items-center justify-center gap-4 text-center">
                        <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                            <MapPin className="text-cyan-500" size={20} />
                        </div>
                        <h2 className="text-3xl font-black text-gray-900">
                            Where to Find Us
                        </h2>
                    </div>
                    <div className="rounded-2xl overflow-hidden border border-cyan-200 shadow-lg">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.656328647182!2d78.442908!3d17.428273000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90cd7708dfd7%3A0x77482b7aa8b696f3!2sMuffakham%20Jah%20College%20of%20Engineering%20%26%20Technology%20(MJCET)!5e0!3m2!1sen!2sin!4v1771331684032!5m2!1sen!2sin"
                            className="w-full h-[420px]"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
