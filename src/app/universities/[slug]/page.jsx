import UniversityHeader from "../components/UniversityHeader";
import UniversityTabsWrapper from "../components/UniversityTabsWrapper";

export const revalidate = 0;

// ✅ 1. SEO Metadata
export async function generateMetadata({ params }) {
    const { slug } = await params;
    const base = process.env.NEXT_PUBLIC_API_URL || "https://back.universitiesforllm.com";
    const site = "https://universitiesforllm.com";

    try {
        const res = await fetch(`${base}/api/universities/slug/${slug}`, { cache: "no-store" });
        if (!res.ok) throw new Error("University not found");

        const uni = await res.json();
        // 🏫 SEO title & description with site name
        const siteName = "Universities for LLM";

        const title = uni.seoTitle
            ? `${uni.seoTitle} | ${siteName}`
            : `${uni.name} – LLM Admission Requirements, Scholarships & Rankings | ${siteName}`;

        const description = uni.seoDescription
            ? `${uni.seoDescription} | ${siteName}`
            : `Explore ${uni.name}'s LLM programs, scholarships, tuition fees, and admission requirements. Learn more about top UK law universities on ${siteName}.`;

        const keywords =
            uni.seoKeywords ||
            "LLM, law universities, scholarships, study abroad, Keekan Education";
        const image =
            uni.metaImage || uni.banner || `${site}/default-university.jpg`;
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
                        url: image.startsWith("http") ? image : `${base}${image}`,
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
                images: [image.startsWith("http") ? image : `${base}${image}`],
            },
        };
    } catch {
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

    // 🎓 Fetch university data
    const res = await fetch(`${base}/api/universities/slug/${slug}`, { cache: "no-store" });
    if (!res.ok) {
        return (
            <div className="flex justify-center items-center min-h-[60vh] text-gray-500">
                University not found.
            </div>
        );
    }

    const uni = await res.json();

    // ❓ Fetch FAQs related to this university
    const faqRes = await fetch(
        `${base}/api/faqs?relatedType=university&relatedId=${uni.id}`,
        { cache: "no-store" }
    );
    const faqData = faqRes.ok ? await faqRes.json() : [];
    const faqs = faqData.items || faqData || [];

    // ✅ JSON-LD Schema (Rich Result)
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
            {/* 🧱 Header */}
            <UniversityHeader uni={uni} />

            {/* 🧭 Tabs (client component) */}
            <UniversityTabsWrapper uni={uni} />

            {/* 🧩 Main content */}
            <div className="max-w-6xl mx-auto p-4 transition-all duration-300 space-y-10">
                {/* === FAQ Section === */}
                {faqs.length > 0 && (
                    <section className="mt-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            FAQs about {uni.name}
                        </h2>
                        <div className="divide-y divide-gray-200 bg-white rounded-lg border">
                            {faqs.map((faq, i) => (
                                <details key={i} className="group p-4">
                                    <summary className="flex justify-between items-center cursor-pointer text-lg font-semibold text-gray-800">
                                        <span>{faq.question}</span>
                                        <span className="transition-transform group-open:rotate-180">▼</span>
                                    </summary>
                                    <p className="mt-3 text-gray-700 leading-relaxed">{faq.answer}</p>
                                </details>
                            ))}
                        </div>
                    </section>
                )}

                {/* === Empty FAQ fallback === */}
                {faqs.length === 0 && (
                    <p className="text-center text-gray-500 py-10">
                        No FAQs added yet for this university.
                    </p>
                )}
            </div>

            {/* ✅ Structured Data Scripts */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {faqs.length > 0 && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            mainEntity: faqs.map((f) => ({
                                "@type": "Question",
                                name: f.question,
                                acceptedAnswer: { "@type": "Answer", text: f.answer },
                            })),
                        }),
                    }}
                />
            )}
        </div>
    );
}
