export const dynamic = "force-static";
export const revalidate = 120;

import { Building2, Users2, Handshake, Globe2, LineChart, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: "Business Relations | Universities for LLM | Keekan Education Network",
    description:
        "Explore business and partnership opportunities with Universities for LLM — powered by Keekan Education. Collaborate with global institutions and reach law students worldwide.",
    alternates: { canonical: "https://universitiesforllm.com/business-relation" },
    openGraph: {
        title: "Business Relations | Universities for LLM | Keekan Education Netwrok",
        description:
            "Partner with Keekan Education to enhance your institution’s reach, analytics, and engagement with international law students.",
        images: [
            {
                url: "/images/business-og.jpg",
                width: 1200,
                height: 630,
                alt: "Business Relations - Universities for LLM",
            },
        ],
    },
};

export default async function BusinessRelationPage() {
    const base = process.env.NEXT_PUBLIC_API_URL || "https://back.universitiesforllm.com";

    // Fetch featured partners or universities for credibility display
    let partners = [];
    try {
        const res = await fetch(`${base}/api/universities?featured=true&limit=4`, { cache: "no-store" });
        const data = await res.json();
        partners = data.items || data || [];
    } catch (err) {
        console.error("Failed to fetch featured partners:", err);
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-[#010b59] via-[#0a166e] to-[#0a1040] text-gray-800">
            {/* 💼 Hero Section */}
            <section className="relative py-20 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#f613a3]/40 via-transparent to-[#9deff9]/30 backdrop-blur-md" />
                <div className="relative z-10 max-w-4xl mx-auto px-6">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 drop-shadow-xl">
                        Business Relations & Partnerships
                    </h1>
                    <p className="text-white/90 max-w-2xl mx-auto text-lg leading-relaxed">
                        Build long-term strategic collaborations with{" "}
                        <strong>Keekan Education</strong> to accelerate your university’s digital reach,
                        marketing performance, and student engagement worldwide.
                    </p>
                </div>
            </section>

            {/* 🤝 Partnership Benefits */}
            <section className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    {
                        icon: <Handshake className=" h-8 w-8 text-pink-600" />,
                        title: "Strategic Collaboration",
                        desc: "Partner with a global education network trusted by law schools and students in 120+ countries.",
                    },
                    {
                        icon: <LineChart className="h-8 w-8 text-green-600" />,
                        title: "Data-Driven Insights",
                        desc: "Access advanced analytics dashboards to track engagement, applications, and conversions.",
                    },
                    {
                        icon: <ShieldCheck className="h-8 w-8 text-blue-600" />,
                        title: "Trusted Brand Alignment",
                        desc: "Enhance credibility by featuring your institution alongside the world’s most respected law schools.",
                    },
                    {
                        icon: <Users2 className="h-8 w-8 text-purple-600" />,
                        title: "Community Engagement",
                        desc: "Collaborate in webinars, conferences, and live sessions with thousands of global law students.",
                    },
                    {
                        icon: <Globe2 className="h-8 w-8 text-cyan-600" />,
                        title: "International Expansion",
                        desc: "Promote your programs and scholarships to targeted audiences across continents.",
                    },
                    {
                        icon: <Building2 className="h-8 w-8 text-amber-600" />,
                        title: "Enterprise Partnerships",
                        desc: "Partner with Keekan to co-develop educational technology and legal innovation solutions.",
                    },
                ].map(({ icon, title, desc }, i) => (
                    <div
                        key={i}
                        className="bg-white/90 backdrop-blur-lg rounded-2xl p-8 border border-gray-100 shadow-md hover:shadow-xl transition-all flex flex-col items-center text-center justify-center"
                    >
                        <div className="mb-4">{icon}</div>
                        <h3 className="text-xl font-semibold text-blue-900 mb-2">{title}</h3>
                        <p className="text-gray-700 leading-relaxed">{desc}</p>
                    </div>

                ))}
            </section>

            {/* 🌍 Featured Partners */}
            {partners.length > 0 && (
                <section className="max-w-6xl mx-auto px-6 py-20">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">
                        Our Global University Partners
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 justify-items-center">
                        {partners.map((u) => (
                            <Link
                                key={u.id}
                                href={`/universities/${u.slug}`}
                                className="flex flex-col items-center text-center group"
                            >
                                <div className="relative w-20 h-20 bg-white rounded-full overflow-hidden shadow-lg mb-3">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <Image
                                        src={`${base}${u.logo}`}
                                        width={50}
                                        height={20}
                                        alt={u.name}
                                        className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <p className="text-sm text-white/90 group-hover:text-pink-400 transition">
                                    {u.name}
                                </p>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* 🚀 CTA Section */}
            <section className="relative py-24 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#f613a3]/40 via-transparent to-[#9deff9]/40" />
                <div className="relative z-10 max-w-3xl mx-auto px-6">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Let’s Build the Future of Legal Education Together
                    </h2>
                    <p className="text-white/80 mb-8 text-lg leading-relaxed">
                        Partner with <strong>Keekan Education</strong> to strengthen your global presence,
                        enhance student diversity, and modernize your digital outreach.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-all"
                    >
                        Contact Business Team
                    </Link>
                </div>
            </section>


        </main>
    );
}
