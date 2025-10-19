import UniversityCard from "@/app/components/cards/UniversityCard";
import ProgrammeCard from "@/app/components/cards/ProgrammeCard";
import LocationCard from "@/app/components/cards/LocationCard";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 0;

// ✅ Dynamic SEO Metadata
export async function generateMetadata({ params }) {
    const base = process.env.NEXT_PUBLIC_API_URL || "https://back.universitiesforllm.com";
    const { slug } = await params;

    try {
        const res = await fetch(`${base}/api/locations/slug/${slug}`, { cache: "no-store" });
        if (!res.ok) return { title: "Location not found" };

        const data = await res.json();
        const location = data.location || {};

        const title =
            location.seoTitle ||
            `Top Universities and Programs in ${location.city || location.state || location.country}`;
        const description =
            location.seoDescription ||
            `Explore top universities, programs, and scholarships in ${location.city || location.state || location.country}. Find your perfect study destination today.`;

        const image = location.metaImage
            ? `${base}${location.metaImage}`
            : location.image
                ? `${base}${location.image}`
                : "/images/default-location.jpg";

        const url = location.canonicalUrl || `https://universitiesforllm.com/locations/${slug}`;

        return {
            metadataBase: new URL("https://universitiesforllm.com"),
            title,
            description,
            alternates: { canonical: url },
            openGraph: {
                title,
                description,
                url,
                siteName: "Universities for LLM",
                images: [{ url: image, width: 1200, height: 630, alt: title }],
                type: "website",
            },
            twitter: {
                card: "summary_large_image",
                title,
                description,
                images: [image],
                site: "@UniversitiesLLM",
            },
        };
    } catch (err) {
        console.error("❌ SEO metadata fetch error:", err);
        return { title: "Study Locations | Universities for LLM" };
    }
}

// ✅ Main Page
export default async function LocationDetailPage({ params }) {
    const { slug } = await params;
    const base = process.env.NEXT_PUBLIC_API_URL || "https://back.universitiesforllm.com";

    // 🏙️ Fetch location details
    const res = await fetch(`${base}/api/locations/slug/${slug}`, { cache: "no-store" });
    if (!res.ok) {
        return <div className="text-center py-20 text-gray-500">Location not found.</div>;
    }

    const data = await res.json();
    const location = data.location || {};
    const children = data.children || [];
    const universities = data.universities || [];
    const programs = data.programs || [];

    // 🧩 Fetch FAQs (Server-Side)
    const faqRes = await fetch(
        `${base}/api/faqs?relatedType=location&relatedId=${location.id}`,
        { cache: "no-store" }
    );
    const faqData = faqRes.ok ? await faqRes.json() : [];
    const faqs = faqData.items || faqData || [];

    // ✅ Build FAQ Schema (must be an object, not a string!)
    const faqSchema =
        faqs.length > 0
            ? {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: faqs.map((faq) => ({
                    "@type": "Question",
                    name: faq.question,
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: faq.answer,
                    },
                })),
            }
            : null;

    // ✅ Determine cover image
    const coverImage = location.image
        ? `${base}${location.image}`
        : location.metaImage
            ? `${base}${location.metaImage}`
            : "/images/default-location.jpg";

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-14">
            {/* === Header === */}
            <div className="relative h-56 sm:h-72 rounded-2xl overflow-hidden shadow-md">
                <Image
                    src={coverImage}
                    alt={location.country || location.city}
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                {/* === Title + Flag === */}
                <div className="absolute bottom-5 left-6 text-white">
                    <h1 className="text-3xl sm:text-4xl font-bold drop-shadow-lg">
                        {location.city || location.state || location.country}
                    </h1>

                    {location.flag && (
                        <img
                            src={`${base}${location.flag}`}
                            alt="Flag"
                            className="w-10 h-auto mt-2 rounded shadow-sm"
                        />
                    )}

                    {/* === Breadcrumb === */}
                    {location.breadcrumb?.length > 0 && (
                        <nav className="text-sm text-gray-200 mt-3">
                            <Link href="/" className="hover:text-white/80">
                                Home
                            </Link>
                            {location.breadcrumb.map((crumb, i) => (
                                <span key={i}>
                                    {" › "}
                                    <span className="opacity-80">{crumb}</span>
                                </span>
                            ))}
                        </nav>
                    )}
                </div>
            </div>

            {/* === Sub-Locations === */}
            {children.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center sm:text-left">
                        Explore {location.type === "country" ? "Regions / States" : "Cities"} in{" "}
                        {location.country || location.state}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {children.map((child) => (
                            <LocationCard
                                key={child.id}
                                location={child}
                                universityCount={child.universityCount || 0}
                                programCount={child.programCount || 0}
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* === Universities === */}
            {universities.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center sm:text-left">
                        Top Universities in {location.country || location.city}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {universities.map((uni) => (
                            <UniversityCard key={uni.id} university={uni} />
                        ))}
                    </div>
                </section>
            )}

            {/* === Programs === */}
            {programs.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center sm:text-left">
                        Popular Programs in {location.country || location.city}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {programs.map((prog) => (
                            <ProgrammeCard key={prog.id} programme={prog} university={prog.university} />
                        ))}
                    </div>
                </section>
            )}

            {/* === FAQs Section === */}
            {faqs.length > 0 && (
                <section className="mt-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center sm:text-left">
                        FAQs about Studying in {location.city || location.state || location.country}
                    </h2>

                    <div className="divide-y divide-gray-200 bg-gray-50 rounded-lg border">
                        {faqs.map((faq, idx) => (
                            <details key={idx} className="group p-4">
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

            {/* === Empty State === */}
            {children.length === 0 && universities.length === 0 && programs.length === 0 && (
                <div className="text-center text-gray-500 py-20">
                    No data found for this location yet.
                </div>
            )}

            {/* === ✅ Correctly formatted JSON-LD (no escaped quotes) === */}
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        // Only stringify once — do not double encode
                        __html: JSON.stringify(faqSchema),
                    }}
                />
            )}
        </div>
    );
}
