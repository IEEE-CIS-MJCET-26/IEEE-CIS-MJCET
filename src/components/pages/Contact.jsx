import React, { useState } from 'react';
import { MapPin, Mail, Phone, Clock, Linkedin, Instagram, Twitter, Facebook } from 'lucide-react';
import DotGrid from './DotGrid';
const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
    };

    return (
        <div className="relative bg-white min-h-screen">
            {/* DotGrid Background - Behind all content */}
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
                          Got ideas ? Let’s ship them together !
                    </h2>
                    <p className="text-black text-lg leading-relaxed mt-3">
                        From ideas to execution, we’re just a message away.
                    </p>
            </div>
        </section>

            {/* Main Content Section */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

                    {/* Contact Form - Appears First on Mobile */}
                    <div className="order-1  lg:order-2">
                        <div className=" backdrop-blur-md bg-white/10 border-2 border-cyan-400 rounded-3xl p-8 md:p-10 shadow-xl">
                            <h2 className="text-3xl md:text-4xl uppercase font-black text-gray-800 mb-6">
                                Send us a message
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name & Company - Row on Desktop */}
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

                                {/* Phone & Email - Row on Desktop */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full  px-5 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:outline-none transition-colors"
                                        required
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full  px-5 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:outline-none transition-colors"
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
                                    className="w-full  px-5 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:outline-none transition-colors"
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
                                    className="w-full py-4 px-8 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
                                    style={{
                                        background: 'linear-gradient(45deg, #06b6d4, #3b82f6)'
                                    }}
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Contact Information - Appears Second on Mobile */}
                    <div className="order-2 lg:order-1">
                        <div className="space-y-8">
                        <div className="mb-12 mt-8 mr-30 relative z-10">
                            <h2 className="text-3xl sm:text-2xl md:text-3xl lg:text-3xl font-black  uppercase leading-tight tracking-tighter">
                               Connect with us.
                            </h2>
                        </div>

                            {/* Email Support */}
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

                            {/* Let's Talk */}
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                                    <Phone className="text-cyan-500" size={24} />
                                </div>
                                <div>
                                    <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Get in touch with us</h3>
                                    <p className="text-gray-600">
                                        <a href="tel:+918978706886" className="hover:text-cyan-500 transition-colors">
                                            +91 89787 06886
                                        </a>
                                    </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                                            <MapPin className="text-cyan-500" size={24} />
                                   </div>

                                    {/* Text wrapper */}
                                    <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                                        Find Us
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Muffakham Jah College of Engineering & Technology, Block 5,  
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
    
                      {/* Heading */}
                            <div className="mb-10 flex items-center justify-center gap-4 text-center">
                                <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                                    <MapPin className="text-cyan-500" size={20} />
                                </div>
                                <h2 className="text-3xl font-black text-gray-900">
                                    Where to Find Us
                                </h2>
                            </div>

                            {/* Map Container */}
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
