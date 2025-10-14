import UniversityCard from "@/app/components/cards/UniversityCard";

// ✅ Always fresh SSR data
export const revalidate = 0;

// ✅ 1. Dynamic SEO metadata
export async function generateMetadata() {
    const base = process.env.NEXT_PUBLIC_API_URL || "https://back.universitiesforllm.com";
    const site = "https://universitiesforllm.com";

    const res = await fetch(`${base}/api/universities?limit=100`, { cache: "no-store" });
    const data = await res.json();
    const universities = data.items || data || [];

    const total = universities.length;

    return {
        title: `Explore Top LLM Universities (${total}) | Keekan Education`,
        description: `Discover the best law and LLM universities worldwide. Compare rankings, programs, tuition, scholarships, and more — powered by Keekan Education.`,
        keywords: "LLM, Law Universities, Top Universities, Study Abroad, Scholarships, Keekan Education",
        alternates: {
            canonical: `${site}/universities`,
        },
        openGraph: {
            title: "Top LLM Universities | Keekan Education",
            description:
                "Explore leading law universities and programs around the world with rankings, tuition, and scholarships.",
            url: `${site}/universities`,
            images: [
                {
                    url: `${site}/og-universities.jpg`,
                    width: 1200,
                    height: 630,
                    alt: "Top LLM Universities",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: "Explore Top LLM Universities",
            description:
                "Find and compare global universities offering LLM and law programs — curated by Keekan Education.",
            images: [`${site}/og-universities.jpg`],
        },
    };
}

// ✅ 2. Page Component
export default async function UniversitiesPage() {
    const base = process.env.NEXT_PUBLIC_API_URL || "https://back.universitiesforllm.com";
    const res = await fetch(`${base}/api/universities?limit=100`, { cache: "no-store" });
    const data = await res.json();
    const universities = data.items || data || [];

    // ✅ Build Google JSON-LD Schema
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Top LLM Universities List",
        description:
            "Curated list of law and LLM universities from around the world. Find scholarships, rankings, and admissions info.",
        itemListElement: universities.map((uni, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: uni.seoTitle || uni.name,
            description: uni.seoDescription || uni.description || "",
            url: `https://universitiesforllm.com/universities/${uni.slug}`,
        })),
    };

    return (
        <section className="py-16 px-4 sm:px-8 bg-gradient-to-br from-gray-50 via-white to-blue-50">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10">
                    <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent">
                        Explore Universities
                    </h1>
                    <p className="text-gray-500 text-sm mt-2 sm:mt-0">
                        Showing {universities.length} universities
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {universities.map((uni) => (
                        <UniversityCard
                            key={uni.id}
                            university={{
                                ...uni,
                                location: uni.location
                                    ? `${uni.location.city || ""}, ${uni.location.country || ""}`
                                    : "Unknown",
                                programsCount: uni.programs?.length || 0,
                                scholarshipsCount: uni.scholarships?.length || 0,
                                rating: uni.worldRanking
                                    ? 5 - Math.min(4, Math.floor(uni.worldRanking / 100))
                                    : 4,
                                featured: uni.isFeatured,
                            }}
                        />
                    ))}
                </div>

                {/* Empty state */}
                {universities.length === 0 && (
                    <p className="text-center text-gray-500 py-20">
                        No universities found.
                    </p>
                )}
            </div>

            {/* ✅ Google Rich Results Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </section>
    );
}
