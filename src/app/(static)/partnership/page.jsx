export const dynamic = "force-static";
export const revalidate = false;

import Link from "next/link";
import {
    Globe2,
    BarChart3,
    Sparkles,
    Star,
    CheckCircle2,
    Rocket,
    Users2,
} from "lucide-react";

export const metadata = {
    title: "Partnership Opportunities | Universities for LLM | Keekan Education Network",
    description:
        "Partner with Universities for LLM — powered by Keekan Education — to reach global law students and showcase your university programs worldwide.",
    alternates: { canonical: "https://universitiesforllm.com/partnership" },
    openGraph: {
        title: "Partnership Opportunities | Universities for LLM",
        description:
            "Join our network of top law universities and global education partners to expand your reach.",
        images: [
            {
                url: "/images/partnership-og.jpg",
                width: 1200,
                height: 630,
                alt: "Partnership Opportunities - Universities for LLM",
            },
        ],
    },
};

export default function PartnershipPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-[#010b59] via-[#0a166e] to-[#0a1040] text-gray-800 selection:bg-pink-200">
            {/* 🌈 Hero Section */}
            <section className="relative py-20 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#f613a3]/40 via-transparent to-[#9deff9]/30 backdrop-blur-md" />
                <div className="relative z-10 max-w-4xl mx-auto px-6">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 drop-shadow-xl">
                        Partner with Us
                    </h1>
                    <p className="text-white/90 max-w-2xl mx-auto text-lg leading-relaxed">
                        Join the <strong>Keekan Education</strong> network to reach global
                        students, increase visibility, and grow your university’s brand
                        worldwide.
                    </p>
                </div>
            </section>

            {/* 🤝 Why Partner Section */}
            <section className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {[
                    {
                        icon: Globe2,
                        title: "Global Reach",
                        desc: "Gain exposure among thousands of international students seeking LLM programs every month.",
                        color: "text-blue-600",
                    },
                    {
                        icon: BarChart3,
                        title: "Actionable Analytics",
                        desc: "Access insights into impressions, engagement, and conversions through your partner dashboard.",
                        color: "text-pink-600",
                    },
                    {
                        icon: Sparkles,
                        title: "Brand Elevation",
                        desc: "Feature your university in prime listings, scholarship highlights, and media collaborations.",
                        color: "text-amber-500",
                    },
                ].map(({ icon: Icon, title, desc, color }, i) => (
                    <div
                        key={i}
                        className="bg-white/90 backdrop-blur-lg rounded-2xl p-8 border border-gray-100 shadow-md hover:shadow-xl transition-all text-center flex flex-col items-center"
                    >
                        <div
                            className={`w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-${color.replace(
                                "text-",
                                ""
                            )}/20 to-${color.replace(
                                "text-",
                                ""
                            )}/10 mb-5 shadow-lg text-4xl ${color}`}
                        >
                            <Icon className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-semibold text-blue-900 mb-3">{title}</h3>
                        <p className="text-gray-700 leading-relaxed">{desc}</p>
                    </div>
                ))}
            </section>

            {/* 🌍 Partnership Tiers */}
            <section className="max-w-5xl mx-auto px-6 py-20">
                <h2 className="text-3xl font-bold text-white text-center mb-12">
                    Partnership Models
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            name: "Basic Partner",
                            icon: Users2,
                            price: "Free",
                            features: [
                                "University profile listing",
                                "Program visibility in search",
                                "Email notifications for applicants",
                            ],
                        },
                        {
                            name: "Featured Partner",
                            icon: Star,
                            price: "$499/year",
                            features: [
                                "Priority ranking in listings",
                                "Analytics dashboard access",
                                "Scholarship promotions",
                            ],
                        },
                        {
                            name: "Global Partner",
                            icon: Rocket,
                            price: "Custom Plan",
                            features: [
                                "Dedicated account manager",
                                "Sponsored campaigns",
                                "Exclusive student webinars",
                            ],
                        },
                    ].map(({ name, price, features, icon: Icon }, i) => (
                        <div
                            key={i}
                            className="bg-white/90 backdrop-blur-lg border border-gray-100 rounded-2xl shadow-md hover:shadow-xl transition-all p-8 text-center"
                        >
                            <div className="flex justify-center mb-4 text-pink-600">
                                <Icon className="h-10 w-10" />
                            </div>
                            <h3 className="text-2xl font-semibold text-blue-900 mb-2">{name}</h3>
                            <p className="text-3xl font-bold text-pink-600 mb-6">{price}</p>
                            <ul className="text-gray-700 space-y-3 mb-6 text-sm">
                                {features.map((f, idx) => (
                                    <li key={idx} className="flex items-center justify-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href="/contact"
                                className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg transition-all"
                            >
                                Become a Partner
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* 📨 CTA Section */}
            <section className="relative py-24 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#f613a3]/40 via-transparent to-[#9deff9]/40" />
                <div className="relative z-10 max-w-3xl mx-auto px-6">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Let’s Build the Future of Legal Education Together
                    </h2>
                    <p className="text-white/80 mb-8 text-lg leading-relaxed">
                        Collaborate with <strong>Keekan Education</strong> to connect your
                        programs with qualified global students.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-all"
                    >
                        Contact Partnership Team
                    </Link>
                </div>
            </section>
        </main>
    );
}
