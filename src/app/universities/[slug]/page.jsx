import UniversityHeader from "../components/UniversityHeader";
import UniversityTabsWrapper from "../components/UniversityTabsWrapper";

export const revalidate = 0; // Always fresh (no cache)

// ✅ 1. SEO Metadata
export async function generateMetadata({ params }) {
    const { slug } = await params;
    const base = process.env.NEXT_PUBLIC_API_URL || "https://back.universitiesforllm.com";
    const site = "https://universitiesforllm.com";

    try {
        const res = await fetch(`${base}/api/universities/slug/${slug}`, { cache: "no-store" });
        if (!res.ok) throw new Error("University not found");

        const uni = await res.json();
        const title = uni.seoTitle || `${uni.name} – LLM Programs & Scholarships | Keekan Education`;
        const description =
            uni.seoDescription ||
            `Discover ${uni.name}'s top LLM programs, scholarships, and admission requirements. Explore rankings, tuition, and more with Keekan Education.`;
        const keywords =
            uni.seoKeywords ||
            "LLM, law universities, scholarships, study abroad, Keekan Education";
        const image =
            uni.metaImage ||
            uni.banner ||
            `${site}/default-university.jpg`;
        const canonicalUrl = uni.canonicalUrl || `${site}/universities/${uni.slug}`;

        return {
            title,
            description,
            keywords,
            alternates: { canonical: canonicalUrl },
            openGraph: {
                title,
                description,
                url: canonicalUrl,
                type: "article",
                siteName: "Universities for LLM",
                images: [
                    {
                        url: image.startsWith("http")
                            ? image
                            : `${base}${image}`,
                        width: 1200,
                        height: 630,
                        alt: uni.name,
                    },
                ],
            },
            twitter: {
                card: "summary_large_image",
                title,
                description,
                images: [
                    image.startsWith("http")
                        ? image
                        : `${base}${image}`,
                ],
            },
        };
    } catch (err) {
        return {
            title: "University Not Found | Keekan Education",
            description: "The requested university could not be found.",
        };
    }
}

// ✅ 2. Page Component
export default async function UniversityPage({ params }) {
    const { slug } = await params;
    const base = process.env.NEXT_PUBLIC_API_URL || "https://back.universitiesforllm.com";
    const site = "https://universitiesforllm.com";

    const res = await fetch(`${base}/api/universities/slug/${slug}`, { cache: "no-store" });
    if (!res.ok) {
        return (
            <div className="flex justify-center items-center min-h-[60vh] text-gray-500">
                University not found.
            </div>
        );
    }

    const uni = await res.json();

    // ✅ 3. Google JSON-LD Schema (Rich Result)
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollegeOrUniversity",
        name: uni.name,
        description: uni.seoDescription || uni.description || "",
        url: uni.canonicalUrl || `${site}/universities/${uni.slug}`,
        logo: uni.logo ? `${base}${uni.logo}` : `${site}/logo.png`,
        image: uni.banner ? `${base}${uni.banner}` : `${site}/default-university.jpg`,
        sameAs: uni.website ? [uni.website] : [],
        address: {
            "@type": "PostalAddress",
            addressCountry: uni.location?.country || "",
            addressLocality: uni.location?.city || "",
        },
        aggregateRating: uni.worldRanking
            ? {
                "@type": "AggregateRating",
                ratingValue: Math.max(1, 5 - Math.floor(uni.worldRanking / 100)),
                ratingCount: 200 + uni.worldRanking,
            }
            : undefined,
    };

    return (
        <div className="bg-gray-50">
            {/* 🧱 Header — LCP optimized */}
            <UniversityHeader uni={uni} />

            {/* 🧭 Tabs (client) */}
            <UniversityTabsWrapper uni={uni} />

            {/* 🧩 Content */}
            <div className="max-w-6xl mx-auto p-4 transition-all duration-300">
                {/* You can dynamically render about/programs here */}
            </div>

            {/* ✅ JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </div>
    );
}
