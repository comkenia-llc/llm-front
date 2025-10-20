"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FaqClient({ faqs }) {
    const [active, setActive] = useState(null);

    const toggleFAQ = (index) => {
        setActive(active === index ? null : index);
    };

    return (
        <main className="min-h-screen bg-gradient-to-b from-[#010b59] via-[#0a166e] to-[#0a1040] text-gray-100 relative overflow-hidden selection:bg-pink-200">
            {/* 🌈 Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#f613a3]/30 via-transparent to-[#9deff9]/30 blur-3xl" />

            {/* 🧠 Hero Section */}
            <section className="relative py-20 text-center">
                <div className="relative z-10 max-w-3xl mx-auto px-6">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 drop-shadow-xl">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-white/90 text-lg leading-relaxed">
                        Find quick answers to the most common questions about{" "}
                        <strong>LLM admissions</strong>, <strong>scholarships</strong>, and{" "}
                        <strong>Keekan Education</strong>.
                    </p>
                </div>
            </section>

            {/* ❓ FAQ Section */}
            <section className="relative z-10 max-w-4xl mx-auto px-6 py-20">
                {faqs.length > 0 ? (
                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <div
                                key={faq.id || index}
                                className="bg-white/90 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg overflow-hidden transition"
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full flex justify-between items-center text-left p-5 focus:outline-none"
                                >
                                    <h3 className="text-lg font-semibold text-blue-900">
                                        {faq.question}
                                    </h3>
                                    <ChevronDown
                                        className={`w-5 h-5 text-pink-600 transition-transform ${active === index ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>
                                <div
                                    className={`px-5 pb-5 text-gray-700 text-sm leading-relaxed transition-all duration-300 ${active === index
                                            ? "max-h-[500px] opacity-100"
                                            : "max-h-0 opacity-0 overflow-hidden"
                                        }`}
                                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-white/80 py-20">
                        <p className="text-lg">No FAQs available yet.</p>
                        <p className="text-sm text-white/60">
                            We’re updating this section soon with the most common student queries.
                        </p>
                    </div>
                )}
            </section>

            {/* 💬 CTA Section */}
            <section className="relative py-24 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#f613a3]/40 via-transparent to-[#9deff9]/40" />
                <div className="relative z-10 max-w-3xl mx-auto px-6">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Still Have Questions?
                    </h2>
                    <p className="text-white/80 mb-8 text-lg leading-relaxed">
                        Our support team is here to help with admissions, scholarships, and
                        partnership opportunities.
                    </p>
                    <a
                        href="/contact"
                        className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-all"
                    >
                        Contact Support
                    </a>
                </div>
            </section>
        </main>
    );
}
