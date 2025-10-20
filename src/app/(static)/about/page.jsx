export const metadata = {
    title: "About Us | Universities for LLM | Keekan Education",
    description:
        "Learn about Keekan Education and Universities for LLM — a global legal-education platform helping students connect with top universities and scholarships worldwide.",
    alternates: { canonical: "https://universitiesforllm.com/about" },
    openGraph: {
        title: "About Keekan Education | Universities for LLM",
        description:
            "Discover our mission to simplify international legal education access and empower students to study LLM programs globally.",
        images: [
            {
                url: "/images/about-og.jpg",
                width: 1200,
                height: 630,
                alt: "About Universities for LLM",
            },
        ],
    },
};

import Link from "next/link";
import { Globe2, GraduationCap, Rocket, Users2 } from "lucide-react";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-[#010b59] via-[#0a166e] to-[#0a1040] text-gray-800 relative overflow-hidden selection:bg-pink-200">
            {/* glowing backdrop */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#f613a3]/30 via-transparent to-[#9deff9]/30 blur-3xl" />

            <section className="relative z-10 max-w-5xl mx-auto px-6 py-20">
                <h1 className="text-4xl sm:text-5xl font-bold text-center text-white mb-8">
                    About Keekan Education
                </h1>
                <p className="text-white/90 text-lg leading-relaxed text-center max-w-3xl mx-auto mb-16">
                    <strong>Universities for LLM</strong> is a flagship project by{" "}
                    <strong>Keekan Education</strong> — a SaaS-driven global education
                    network designed to make postgraduate legal education accessible to
                    every student, everywhere. We blend technology, data analytics, and
                    human guidance to simplify the process of discovering, applying, and
                    enrolling in the world’s top LLM programs.
                </p>

                {/* mission cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        {
                            icon: Globe2,
                            title: "Global Access",
                            desc: "Connecting students from 150+ countries with universities offering world-class LLM programs.",
                        },
                        {
                            icon: GraduationCap,
                            title: "Smart Discovery",
                            desc: "AI-powered search tools match students with programs that fit their career and financial goals.",
                        },
                        {
                            icon: Rocket,
                            title: "Growth for Universities",
                            desc: "Institutions use our SaaS dashboard to manage leads, track analytics, and expand international reach.",
                        },
                        {
                            icon: Users2,
                            title: "Trusted by Students",
                            desc: "Thousands rely on our transparent listings, verified scholarships, and real-time application guidance.",
                        },
                    ].map(({ icon: Icon, title, desc }, i) => (
                        <div
                            key={i}
                            className="bg-white/90 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition"
                        >
                            <div className="flex justify-center mb-4 text-pink-600">
                                <Icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-semibold text-blue-900 mb-2">
                                {title}
                            </h3>
                            <p className="text-gray-700 text-sm leading-relaxed">{desc}</p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-20">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Join Our Global Education Network
                    </h2>
                    <p className="text-white/80 max-w-2xl mx-auto mb-8">
                        Whether you are a student exploring international opportunities or a
                        university looking to reach qualified applicants,{" "}
                        <strong>Keekan Education</strong> provides the tools and visibility
                        you need.
                    </p>
                    <Link
                        href="/partnership"
                        className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition"
                    >
                        Become a Partner
                    </Link>
                </div>
            </section>
        </main>
    );
}
