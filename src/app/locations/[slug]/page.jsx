import Image from "next/image";
import UniversityCard from "@/app/components/cards/UniversityCard";
import ProgrammeCard from "@/app/components/cards/ProgrammeCard";

export const revalidate = 0; // always fresh SSR

// ✅ Dynamic SEO metadata
export async function generateMetadata({ params }) {
    const base = process.env.NEXT_PUBLIC_API_URL || "https://back.universitiesforllm.com";
    const { slug } = params;

    try {
        const res = await fetch(`${base}/api/locations/slug/${slug}`, { cache: "no-store" });
        const data = await res.json();
        const loc = data.location || data;

        return {
            title: loc.seoTitle || `Study in ${loc.city || loc.country}`,
            description:
                loc.seoDescription ||
                `Explore universities and programs in ${loc.city || loc.country}.`,
            keywords: loc.seoKeywords || "study abroad, universities, programs",
            openGraph: {
                title: loc.seoTitle || `Study in ${loc.country}`,
                description: loc.seoDescription || "",
                images: loc.metaImage ? [`${base}${loc.metaImage}`] : [],
                url: loc.canonicalUrl || `https://universitiesforllm.com/locations/${slug}`,
            },
            alternates: {
                canonical: loc.canonicalUrl || `https://universitiesforllm.com/locations/${slug}`,
            },
        };
    } catch (err) {
        console.error("❌ SEO metadata error:", err);
        return {
            title: "Study Destination",
            description: "Find top universities and programs around the world.",
        };
    }
}

// ✅ Location detail page
export default async function LocationDetailPage({ params }) {
    const base = process.env.NEXT_PUBLIC_API_URL || "https://back.universitiesforllm.com";
    const { slug } = params;

    // 🔹 Fetch location + related universities + programs
    const res = await fetch(`${base}/api/locations/slug/${slug}`, { cache: "no-store" });

    if (!res.ok) {
        return (
            <div className="text-center py-20 text-gray-500">
                Location not found.
            </div>
        );
    }

    const data = await res.json();
    const location = data.location || data;
    const universities = data.universities || [];
    const programs = data.programs || [];

    return (
        <div className="max-w-6xl mx-auto px-4 py-10 space-y-16">
            {/* === Header Section === */}
            <div className="relative text-center mb-12">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
                    Study in {location.country || location.city}
                </h1>
                <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
                    Explore world-class universities and degree programs in{" "}
                    {location.city
                        ? `${location.city}, ${location.country}`
                        : location.country}
                    .
                </p>

                {location.flag && (
                    <div className="flex justify-center mt-4">
                        <img
                            src={`${base}${location.flag}`}
                            alt="flag"
                            className="w-14 h-auto object-contain rounded-md shadow-sm"
                        />
                    </div>
                )}
            </div>

            {/* === Universities Section === */}
            {universities.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center sm:text-left">
                        Top Universities in {location.country}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {universities.map((uni) => (
                            <UniversityCard key={uni.id} university={uni} />
                        ))}
                    </div>
                </section>
            )}

            {/* === Programs Section === */}
            {programs.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center sm:text-left">
                        Popular Study Programs in {location.country}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {programs.map((prog) => (
                            <ProgrammeCard
                                key={prog.id}
                                programme={prog}
                                university={prog.university}
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* === Empty State === */}
            {universities.length === 0 && programs.length === 0 && (
                <div className="text-center text-gray-500 py-20">
                    No universities or programs found in this location yet.
                </div>
            )}

            {/* ✅ JSON-LD Structured Data (Schema.org) */}
            {(location.schemaType || location.faqSchema) && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": location.schemaType || "Place",
                            name: location.country || location.city,
                            description:
                                location.seoDescription ||
                                `Explore universities and programs in ${location.city || location.country}.`,
                            image: location.metaImage ? `${base}${location.metaImage}` : undefined,
                            url:
                                location.canonicalUrl ||
                                `https://universitiesforllm.com/locations/${slug}`,
                            address: {
                                "@type": "PostalAddress",
                                addressCountry: location.country,
                                addressRegion: location.state,
                                addressLocality: location.city,
                            },
                            ...(Array.isArray(location.faqSchema)
                                ? {
                                    mainEntity: location.faqSchema.map((faq) => ({
                                        "@type": "Question",
                                        name: faq.question,
                                        acceptedAnswer: {
                                            "@type": "Answer",
                                            text: faq.answer,
                                        },
                                    })),
                                }
                                : {}),
                            ...(universities.length > 0
                                ? {
                                    containedInPlace: universities.map((u) => ({
                                        "@type": "CollegeOrUniversity",
                                        name: u.name,
                                        url: `https://universitiesforllm.com/universities/${u.slug}`,
                                    })),
                                }
                                : {}),
                        }),
                    }}
                />
            )}
        </div>
    );
}
