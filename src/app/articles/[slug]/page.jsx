// app/articles/[slug]/page.jsx
import Image from "next/image";

export const revalidate = 0; // Always fresh SSR

// ✅ Dynamic SEO Metadata
export async function generateMetadata({ params }) {
    const { slug } = await params;
    const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    const safeSlug = slug.toLowerCase();

    try {
        const res = await fetch(`${base}/api/articles/${safeSlug}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Metadata fetch failed");

        const article = await res.json();
        const site = "https://universitiesforllm.com";

        return {
            title: article.seoTitle || article.title,
            description: article.seoDescription || article.excerpt,
            keywords:
                article.seoKeywords ||
                "LLM, law, university articles, scholarships, Keekan Education",
            alternates: { canonical: article.canonicalUrl || `${site}/articles/${article.slug}` },
            openGraph: {
                type: "article",
                url: article.canonicalUrl || `${site}/articles/${article.slug}`,
                title: article.seoTitle || article.title,
                description: article.seoDescription || article.excerpt,
                siteName: "Universities for LLM",
                images: [
                    {
                        url: article.metaImage || article.image || `${site}/default-og.jpg`,
                        width: 1200,
                        height: 630,
                        alt: article.title,
                    },
                ],
            },
            twitter: {
                card: "summary_large_image",
                title: article.seoTitle || article.title,
                description: article.seoDescription || article.excerpt,
                images: [article.metaImage || article.image || `${site}/default-og.jpg`],
            },
        };
    } catch (err) {
        console.error("❌ Metadata error:", err.message);
        return {
            title: "Article Not Found | Keekan Education",
            description: "The requested article could not be found.",
        };
    }
}

// ✅ Page Component
export default async function ArticlePage({ params }) {
    const { slug } = await params;
    const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    const safeSlug = slug.toLowerCase();
    const site = "https://universitiesforllm.com";

    console.log("🧭 [Page] Fetching article:", safeSlug, "from", `${base}/api/articles/${safeSlug}`);

    let article = null;
    try {
        const res = await fetch(`${base}/api/articles/${safeSlug}`, { cache: "no-store" });

        console.log("🧭 [Page] Response status:", res.status, res.statusText);

        if (!res.ok) {
            const text = await res.text();
            console.error("❌ [Page] Fetch failed. Body:", text);
            throw new Error(`Article not found (${res.status})`);
        }

        article = await res.json();
        console.log("✅ [Page] Article fetched:", article);
    } catch (err) {
        console.error("❌ [Page] Error loading article:", err.message);
        return (
            <div className="flex justify-center items-center min-h-[60vh] text-gray-500">
                Article not found. ({err.message})
            </div>
        );
    }

    if (!article || !article.id) {
        console.warn("⚠️ [Page] Empty article object received.");
        return (
            <div className="flex justify-center items-center min-h-[60vh] text-gray-500">
                Article data missing.
            </div>
        );
    }

    // ✅ Build JSON-LD Schema for Google
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": article.schemaType || "Article",
        headline: article.seoTitle || article.title,
        description: article.seoDescription || article.excerpt,
        image: article.metaImage || article.image,
        author: { "@type": "Organization", name: "Keekan Education", url: site },
        publisher: {
            "@type": "Organization",
            name: "Universities for LLM",
            logo: { "@type": "ImageObject", url: `${site}/logo.png` },
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": article.canonicalUrl || `${site}/articles/${article.slug}`,
        },
        datePublished: article.createdAt,
        dateModified: article.lastUpdated,
    };

    if (article.faqSchema && Array.isArray(article.faqSchema) && article.faqSchema.length > 0) {
        jsonLd.mainEntity = article.faqSchema.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
        }));
    }

    // ✅ Render
    return (
        <article className="max-w-4xl mx-auto px-4 py-10">
            {/* Title */}
            <h1 className="text-3xl font-bold mb-3 text-gray-900">{article.title}</h1>

            {/* Meta info */}
            <div className="flex items-center text-sm text-gray-500 mb-6 gap-3">
                <span>By Keekan Education</span>
                {article.createdAt && (
                    <>
                        <span>•</span>
                        <time>{new Date(article.createdAt).toLocaleDateString()}</time>
                    </>
                )}
            </div>

            {/* Cover Image */}
            {article.image && (
                <div className="w-full rounded-lg overflow-hidden mb-6">
                    <Image
                        src={
                            article.image.startsWith("http")
                                ? article.image
                                : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}${article.image}`
                        }
                        alt={article.title}
                        width={1200}
                        height={630}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                        priority
                        className="w-full h-auto object-cover rounded-lg"
                    />
                </div>
            )}


            {/* Article Content */}
            <div
                className="prose prose-lg max-w-none text-gray-800"
                dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags */}
            {article.tags && Array.isArray(article.tags) && article.tags.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2">
                    {article.tags.map((tag, i) => (
                        <span
                            key={i}
                            className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}

            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </article>
    );
}
