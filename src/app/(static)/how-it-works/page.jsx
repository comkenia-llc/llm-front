export const dynamic = "force-static";
export const revalidate = false;

import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: "How It Works | Universities for LLM",
    description:
        "Discover how Universities for LLM — powered by Keekan Education — connects students with top law universities and scholarships worldwide.",
    alternates: { canonical: "https://universitiesforllm.com/how-it-works" },
    openGraph: {
        title: "How It Works | Universities for LLM",
        description:
            "Step-by-step guide to finding, applying, and succeeding in global LLM programs with Keekan Education.",
        images: [
            {
                url: "/images/how-it-works-og.jpg",
                width: 1200,
                height: 630,
                alt: "How Universities for LLM Works",
            },
        ],
    },
};

export default function HowItWorksPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-[#010b59] via-[#0a166e] to-[#0a1040] text-gray-800 selection:bg-pink-200">
            {/* 🌈 Hero Section */}
            <section className="relative py-20 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#f613a3]/40 via-transparent to-[#9deff9]/30 backdrop-blur-md" />
                <div className="relative z-10 max-w-4xl mx-auto px-6">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 drop-shadow-xl">
                        How It Works
                    </h1>
                    <p className="text-white/90 max-w-2xl mx-auto text-lg leading-relaxed">
                        Find, compare, and apply to the world’s best LLM programs — all in
                        one place, powered by <strong>Keekan Education</strong>.
                    </p>
                </div>
            </section>

            {/* ⚙️ 3-Step Process */}
            <section className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {[
                    {
                        step: "1",
                        title: "Explore Global Programs",
                        text: "Browse thousands of accredited LLM programs from leading universities worldwide. Filter by location, tuition, and specialization to find your perfect fit.",
                        img: "/images/illustrations/search-programs.png",
                    },
                    {
                        step: "2",
                        title: "Compare & Shortlist",
                        text: "Use our comparison tools to evaluate universities, scholarships, and eligibility. Save your favorites to your dashboard for easy access later.",
                        img: "/images/illustrations/compare.png",
                    },
                    {
                        step: "3",
                        title: "Apply with Guidance",
                        text: "Submit your applications directly through our platform with professional support. Receive real-time updates and scholarship notifications.",
                        img: "/images/illustrations/apply.png",
                    },
                ].map(({ step, title, text, img }) => (
                    <div
                        key={step}
                        className="bg-white/90 backdrop-blur-lg border border-gray-100 rounded-2xl shadow-md hover:shadow-xl transition-all p-8 flex flex-col items-center text-center"
                    >
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-600 to-sky-500 text-white flex items-center justify-center text-2xl font-bold mb-5 shadow-lg">
                            {step}
                        </div>
                        <h3 className="text-xl font-semibold text-blue-900 mb-3">{title}</h3>
                        <p className="text-gray-700 leading-relaxed mb-6">{text}</p>
                        {/* <div className="relative w-40 h-32">
                            <Image
                                src={img}
                                alt={title}
                                fill
                                className="object-contain"
                                sizes="160px"
                            />
                        </div> */}
                    </div>
                ))}
            </section>

            {/* 🌍 CTA Section */}
            <section className="relative py-20 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#f613a3]/40 via-transparent to-[#9deff9]/40" />
                <div className="relative z-10 max-w-3xl mx-auto px-6">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Start Your LLM Journey Today
                    </h2>
                    <p className="text-white/80 mb-8 text-lg leading-relaxed">
                        Join thousands of students who’ve already found their dream
                        universities through <strong>Keekan Education</strong>.
                    </p>
                    <Link
                        href="/programs"
                        className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-all"
                    >
                        Browse Programs
                    </Link>
                </div>
            </section>

            {/* Footer note
            <footer className="text-center text-gray-400 pb-12 text-sm">
                © {new Date().getFullYear()} Keekan Education. All rights reserved.
            </footer> */}
        </main>
    );
}
