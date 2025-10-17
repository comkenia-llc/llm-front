"use client";

import { useState } from "react";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import clsx from "clsx";

/**
 * 💎 SaaS-Grade FAQ Section Component
 * Props:
 * - title: string
 * - faqs: [{ question, answer }]
 * - showSchema: boolean (default true)
 */
export default function FaqSection({
    title = "Frequently Asked Questions",
    faqs = [],
    showSchema = true,
}) {
    if (!faqs || faqs.length === 0) return null;

    // ✅ Generate FAQ schema for SEO
    const schemaJson = showSchema
        ? {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
        }
        : null;

    return (
        <section className="max-w-5xl mx-auto py-20 px-2 relative">
            {/* 🌈 Subtle Gradient Glow */}
            <div className="absolute -z-10 inset-0 opacity-30 bg-gradient-to-tr from-blue-200 via-purple-100 to-pink-100 blur-3xl" />

            {/* 💬 Header */}
            <div className="flex flex-col items-center text-center mb-6">
                <div className="inline-flex items-center gap-3 bg-[#000484] text-white px-4 py-2 rounded-full shadow-sm">
                    <MessageCircleQuestion className="w-5 h-5" />
                    <span className="font-semibold">Got Questions?</span>
                </div>
                <h2 className="mt-4 text-2xl font-extrabold text-gray-900 tracking-tight">
                    {title}
                </h2>
                {/* <p className="text-gray-500 mt-3 max-w-2xl">
                    Find quick answers to the most common questions about this program or
                    university.
                </p> */}
            </div>

            {/* 💠 FAQ List */}
            <div className="divide-y divide-gray-200 bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.04)] border border-gray-100">
                {faqs.map((faq, i) => (
                    <FaqCard key={i} {...faq} />
                ))}
            </div>

            {/* SEO Schema */}
            {showSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
                />
            )}
        </section>
    );
}

/* 💬 Single FAQ Card with Motion */
function FaqCard({ question, answer }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={clsx(
                "transition-all duration-300 hover:bg-white/80",
                open && "bg-white/90"
            )}
        >
            <button
                className="w-full flex justify-between items-center pl-3 pr-6 py-4 text-left"
                onClick={() => setOpen(!open)}
            >
                <h3 className="text-base font-semibold text-gray-900 flex-1 pr-3">
                    {question}
                </h3>
                <ChevronDown
                    className={clsx(
                        "w-5 h-5 sm:w-6 sm:h-6 text-gray-400 transition-transform duration-300",
                        open && "rotate-180 text-blue-600"
                    )}
                />
            </button>

            <div
                className={clsx(
                    "px-3 pb-3 text-gray-700 text-base leading-relaxed transition-all duration-500 ease-in-out",
                    open
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0 overflow-hidden"
                )}
            >
                {answer}
            </div>
        </div>
    );
}
