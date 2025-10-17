import Image from "next/image";
import DisciplineDetailClient from "./DisciplineDetailClient";

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const base = process.env.NEXT_PUBLIC_API_URL || "https://back.universitiesforllm.com";
    const site = "https://universitiesforllm.com";

    try {
        const res = await fetch(`${base}/api/disciplines/${slug}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Discipline not found");
        const discipline = await res.json();

        const title =
            discipline.seoTitle ||
            `${discipline.name} – Programs, Universities & Scholarships | Keekan Education`;
        const description =
            discipline.seoDescription ||
            `Discover top universities, scholarships, and programs in ${discipline.name}. Learn about admission, fees, and opportunities worldwide.`;
        const image = discipline.icon
            ? `${base}${discipline.icon}`
            : `${site}/default-discipline.jpg`;
        const canonical = discipline.canonicalUrl || `${site}/disciplines/${discipline.slug}`;

        return {
            title,
            description,
            alternates: { canonical },
            keywords: discipline.seoKeywords || "LLM, universities, scholarships, Keekan Education",
            openGraph: {
                title,
                description,
                url: canonical,
                type: "article",
                siteName: "Universities for LLM",
                images: [{ url: image, width: 1200, height: 630, alt: discipline.name }],
            },
            twitter: {
                card: "summary_large_image",
                title,
                description,
                images: [image],
            },
        };
    } catch {
        return {
            title: "Discipline Not Found | Keekan Education",
            description: "This discipline does not exist or was removed.",
        };
    }
}

export default async function DisciplinePage({ params }) {
    const { slug } = await params;
    const base = process.env.NEXT_PUBLIC_API_URL || "https://back.universitiesforllm.com";
    const site = "https://universitiesforllm.com";

    const res = await fetch(`${base}/api/disciplines/${slug}`, { cache: "no-store" });
    const discipline = res.ok ? await res.json() : null;

    const jsonLd = discipline
        ? {
            "@context": "https://schema.org",
            "@type": "DefinedTerm",
            name: discipline.name,
            description: discipline.description || "",
            url: `${site}/disciplines/${discipline.slug}`,
            image: discipline.icon ? `${base}${discipline.icon}` : `${site}/default-discipline.jpg`,
            inDefinedTermSet: `${site}/disciplines`,
        }
        : null;

    return (
        <>
            {/* ===== Hero Header with next/image ===== */}
            <header className="relative h-64 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 flex items-center justify-center text-white text-center overflow-hidden">
                <div className="absolute inset-0 bg-black/30 z-0" />

                <div className="relative z-10 px-4 max-w-3xl mx-auto">
                    {discipline?.icon && (
                        <div className="mx-auto mb-4 w-20 h-20 relative">
                            <Image
                                src={`${base}${discipline.icon}`}
                                alt={discipline.name || "Discipline Icon"}
                                fill
                                sizes="80px"
                                className="rounded-full border-2 border-white shadow-lg object-cover"
                                priority
                            />
                        </div>
                    )}
                    <h1 className="text-4xl font-bold mb-2">{discipline?.name || "Discipline"}</h1>
                    <p className="text-white/90 text-sm leading-relaxed">
                        {discipline?.description ||
                            "Explore top programs and universities under this field."}
                    </p>
                </div>
            </header>

            {/* ===== Client-Side Section ===== */}
            <DisciplineDetailClient slug={slug} />

            {/* ===== JSON-LD Schema ===== */}
            {jsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            )}
        </>
    );
}
