export const metadata = {
    title: "Contact Us | Universities for LLM | Keekan Education Network",
    description:
        "Get in touch with the Universities for LLM team — powered by Keekan Education. We’re here to answer questions about partnerships, programs, and admissions support.",
    alternates: { canonical: "https://universitiesforllm.com/contact" },
    openGraph: {
        title: "Contact Keekan Education | Universities for LLM",
        description:
            "Reach out to our global education experts for inquiries, collaborations, or media partnerships.",
        images: [
            {
                url: "/images/contact-og.jpg",
                width: 1200,
                height: 630,
                alt: "Contact Universities for LLM",
            },
        ],
    },
};

import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-[#010b59] via-[#0a166e] to-[#0a1040] relative overflow-hidden text-gray-800 selection:bg-pink-200">
            {/* Glow layer */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#f613a3]/30 via-transparent to-[#9deff9]/30 blur-3xl" />

            <section className="relative z-10 max-w-5xl mx-auto px-6 py-20">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                        Contact Us
                    </h1>
                    <p className="text-white/90 text-lg leading-relaxed max-w-2xl mx-auto">
                        Have questions, partnership ideas, or need assistance?
                        The <strong>Keekan Education</strong> team is here to help.
                    </p>
                </div>

                {/* Grid: contact info + form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <div className="bg-white/90 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg p-6">
                            <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                                Get in Touch
                            </h2>

                            <div className="space-y-4 text-gray-700 text-sm">
                                <div className="flex items-start gap-3">
                                    <Mail className="w-5 h-5 text-pink-600 mt-0.5" />
                                    <div>
                                        <p className="font-semibold">Email</p>
                                        <p>support@universitiesforllm.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Phone className="w-5 h-5 text-pink-600 mt-0.5" />
                                    <div>
                                        <p className="font-semibold">Phone</p>
                                        <p>+44 20 1234 5678 (UK Office)</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-pink-600 mt-0.5" />
                                    <div>
                                        <p className="font-semibold">Address</p>
                                        <p>
                                            Keekan Education HQ<br />
                                            10 Hanover Square, London, UK
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Optional map iframe */}
                        <div className="rounded-2xl overflow-hidden shadow-lg border border-white/10">
                            <iframe
                                title="Keekan Education Map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19811.805224831897!2d-0.145449!3d51.511114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604cc606f5ff9%3A0x51f8dc9025a3d1db!2sHanover%20Square%2C%20London%20W1S!5e0!3m2!1sen!2suk!4v1688888888888"
                                width="100%"
                                height="260"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white/90 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg p-8">
                        <h2 className="text-2xl font-semibold text-blue-900 mb-6">
                            Send a Message
                        </h2>
                        <form className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="John Doe"
                                    className="w-full rounded-lg border border-gray-300 bg-white p-3 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    className="w-full rounded-lg border border-gray-300 bg-white p-3 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    rows={5}
                                    placeholder="Write your message..."
                                    className="w-full rounded-lg border border-gray-300 bg-white p-3 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-600 to-blue-600 text-white font-semibold py-3 rounded-full shadow-lg hover:opacity-90 transition"
                            >
                                <Send className="w-4 h-4" />
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}
