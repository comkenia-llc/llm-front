import Image from "next/image";
import Link from "next/link";
import { Star, Globe2, BookOpen, School } from "lucide-react";

export const dynamic = "force-static";
export const revalidate = 60; // refresh every 1 min

export const metadata = {
    title: "Featured Universities & Scholarships | Universities for LLM",
    description:
        "Explore featured universities, programs, and scholarships for law students worldwide — powered by Keekan Education.",
    alternates: { canonical: "https://universitiesforllm.com/featured" },
    openGraph: {
        title: "Featured Universities & Scholarships | Universities for LLM",
        description:
            "Discover top universities, law programs, and scholarships for 2026 admissions — curated by Keekan Education.",
        images: [
            {
                url: "/images/featured-og.jpg",
                width: 1200,
                height: 630,
                alt: "Featured Universities & Scholarships - Universities for LLM",
            },
        ],
    },
};

export default async function FeaturedPage() {
    const base = process.env.NEXT_PUBLIC_API_URL || "https://back.universitiesforllm.com";

    // ✅ Fetch data concurrently for maximum performance
    const [uniRes, progRes, schRes] = await Promise.all([
        fetch(`${base}/api/universities?featured=true&limit=6`, { cache: "no-store" }),
        fetch(`${base}/api/programs?featured=true&limit=6`, { cache: "no-store" }),
        fetch(`${base}/api/scholarships?featured=true&limit=6`, { cache: "no-store" }),
    ]);

    const [universities, programs, scholarships] = await Promise.all([
        uniRes.ok ? uniRes.json() : [],
        progRes.ok ? progRes.json() : [],
        schRes.ok ? schRes.json() : [],
    ]);

    return (
        <main className="min-h-screen bg-gradient-to-b from-[#010b59] via-[#0a166e] to-[#0a1040] text-gray-800 selection:bg-pink-200">
            {/* 🌈 Hero Section */}
            <section className="relative py-20 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#f613a3]/40 via-transparent to-[#9deff9]/30 backdrop-blur-md" />
                <div className="relative z-10 max-w-4xl mx-auto px-6">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 drop-shadow-xl">
                        Featured Universities & Scholarships
                    </h1>
                    <p className="text-white/90 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed">
                        Discover globally recognized universities, top LLM programs, and
                        exclusive scholarships curated by <strong>Keekan Education</strong>.
                    </p>
                </div>
            </section>

            {/* 🏛 Featured Universities */}
            {Array.isArray(universities.items || universities) &&
                (universities.items?.length || universities.length) > 0 && (
                    <section className="max-w-6xl mx-auto px-6 py-10">
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white text-center mb-12">
                            🌍 Top Featured Universities
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {(universities.items || universities).map((uni) => {
                                const logo = uni.logo
                                    ? `${base}${uni.logo}`
                                    : "/images/university-placeholder.png";
                                return (
                                    <Link
                                        key={uni.id}
                                        href={`/universities/${uni.slug}`}
                                        className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-100 shadow-md hover:shadow-xl transition-all text-center"
                                    >
                                        <div className="relative w-20 h-20 mx-auto mb-5 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                            <Image
                                                src={logo}
                                                alt={uni.name}
                                                fill
                                                className="object-contain"
                                                sizes="80px"
                                            />
                                        </div>
                                        <h3 className="text-xl font-semibold text-blue-900">
                                            {uni.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {uni.location?.city} {uni.location?.country}
                                        </p>
                                        {uni.isFeatured && (
                                            <div className="flex justify-center gap-1 mt-3 text-yellow-500">
                                                <Star className="w-4 h-4 fill-yellow-400" />
                                                <span className="text-xs font-semibold">Featured</span>
                                            </div>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </section>
                )}

            {/* 🎓 Featured Programs */}
            {Array.isArray(programs.items || programs) &&
                (programs.items?.length || programs.length) > 0 && (
                    <section className="max-w-6xl mx-auto px-6 py-20">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white text-center mb-12">
                            🎓 Featured Programs
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {(programs.items || programs).map((p) => (
                                <Link
                                    key={p.id}
                                    href={`/programs/${p.slug}`}
                                    className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-100 shadow-md hover:shadow-xl transition-all"
                                >
                                    <div className="flex items-center justify-center mb-4 text-pink-600">
                                        <School className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-blue-900 mb-1">
                                        {p.title}
                                    </h3>
                                    <p className="text-sm text-gray-700 mb-2">
                                        {p.university?.name || "University"}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {p.location?.city}, {p.location?.country}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

            {/* 💰 Featured Scholarships */}
            {Array.isArray(scholarships.items || scholarships) &&
                (scholarships.items?.length || scholarships.length) > 0 && (
                    <section className="max-w-6xl mx-auto px-6 py-20">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white text-center mb-12">
                            💰 Featured Scholarships
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {(scholarships.items || scholarships).map((s) => (
                                <Link
                                    key={s.id}
                                    href={`/scholarships/${s.slug}`}
                                    className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-100 shadow-md hover:shadow-xl transition-all"
                                >
                                    <div className="flex items-center justify-center mb-4 text-pink-600">
                                        <BookOpen className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-center text-blue-900 mb-1">
                                        {s.title}
                                    </h3>
                                    <p className="text-sm text-center text-gray-700 mb-2">
                                        {s.university?.name || s.sponsor || "Global"}
                                    </p>
                                    {/* 💰 Coverage Tag */}
                                    <div className="mt-3 flex justify-center">
                                        {(() => {
                                            // Normalize coverage value from backend (e.g. "partial", "full", "half", etc.)
                                            const coverage =
                                                s.coverage?.trim().toLowerCase() || "unspecified";

                                            // Define color mapping
                                            const colorMap = {
                                                full: "bg-green-100 text-green-800 border-green-200",
                                                partial: "bg-yellow-100 text-yellow-800 border-yellow-200",
                                                half: "bg-blue-100 text-blue-800 border-blue-200",
                                                unspecified: "bg-gray-100 text-gray-700 border-gray-200",
                                            };

                                            // Select the right color
                                            const colors = colorMap[coverage] || colorMap.unspecified;

                                            // Capitalize first letter (e.g. "full" → "Full")
                                            const label = coverage.charAt(0).toUpperCase() + coverage.slice(1);

                                            return (
                                                <span
                                                    className={`px-3 py-1 text-xs font-medium rounded-full border ${colors}`}
                                                >
                                                    {label} Funding
                                                </span>
                                            );
                                        })()}
                                    </div>

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
                        Join the League of Leading Universities
                    </h2>
                    <p className="text-white/80 mb-8 text-lg leading-relaxed">
                        Showcase your programs and scholarships among the world’s best and
                        reach qualified LLM candidates globally.
                    </p>
                    <Link
                        href="/partnership"
                        className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-all"
                    >
                        Become a Featured Partner
                    </Link>
                </div>
            </section>


        </main>
    );
}
