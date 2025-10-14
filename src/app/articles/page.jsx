import Image from "next/image";
import Link from "next/link";

export const revalidate = 0; // always fetch fresh data (SSR)

export async function generateMetadata() {
    const site = "https://universitiesforllm.com";

    return {
        title: "Latest LLM Articles & News | Keekan Education",
        description:
            "Read the latest LLM articles, law education news, and university insights powered by Keekan Education. Stay updated on scholarships, admissions, and top law programs worldwide.",
        keywords:
            "LLM articles, law university news, LLM scholarships, study law abroad, Keekan Education, universities for LLM",
        alternates: { canonical: `${site}/articles` },
        openGraph: {
            type: "website",
            url: `${site}/articles`,
            title: "Latest LLM Articles & News | Keekan Education",
            description:
                "Explore global LLM insights, scholarships, and university guides curated by Keekan Education.",
            siteName: "Universities for LLM",
            images: [
                {
                    url: `${site}/og-articles.jpg`,
                    width: 1200,
                    height: 630,
                    alt: "LLM Articles - Keekan Education",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: "Latest LLM Articles | Keekan Education",
            description:
                "Explore the latest LLM law articles, scholarships, and university insights powered by Keekan Education.",
            images: [`${site}/og-articles.jpg`],
        },
    };
}

export default async function ArticlesPage({ searchParams: searchParamsPromise }) {
    const searchParams = await searchParamsPromise;


    // Pagination params
    const page = parseInt(searchParams.page || "1");
    const limit = 9;

    const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    const fixUrl = (path) => {
        if (!path) return null;
        if (path.startsWith("http")) return path;
        return `${base}${path.startsWith("/") ? path : `/${path}`}`;
    };

    // ✅ Fetch all published articles from backend
    const res = await fetch(`${base}/api/articles?page=${page}&limit=${limit}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        console.error("❌ Failed to fetch articles:", res.statusText);
        return (
            <div className="flex justify-center items-center min-h-[60vh] text-gray-500">
                Failed to load articles.
            </div>
        );
    }

    const data = await res.json();
    const articles = data.items || data;
    const total = data.total || 0;
    const totalPages = Math.ceil(total / limit);

    // ✅ Build Google JSON-LD (Blog + ItemList)
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "LLM Articles by Keekan Education",
        description:
            "Explore the latest LLM articles, university insights, and law education updates.",
        url: "https://universitiesforllm.com/articles",
        blogPost: articles.map((a) => ({
            "@type": "BlogPosting",
            headline: a.seoTitle || a.title,
            url: `https://universitiesforllm.com/article/${a.slug}`,
            image: a.metaImage || a.image,
            datePublished: a.createdAt,
            dateModified: a.lastUpdated,
            description: a.seoDescription || a.excerpt,
            author: {
                "@type": "Organization",
                name: "Keekan Education",
            },
        })),
    };

    // ✅ Render UI
    return (
        <section className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 text-center">
                Latest LLM Articles & News
            </h1>

            {/* Articles Grid */}
            {articles.length === 0 ? (
                <div className="flex justify-center items-center min-h-[40vh] text-gray-500">
                    No articles found.
                </div>
            ) : (
                <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                    {articles.map((a, i) => {
                        console.log(`🧭 Article #${i + 1}`, {
                            id: a.id,
                            title: a.title,
                            slug: a.slug,
                            link: `/articles/${a.slug}`,
                        });

                        const slug = a.slug?.toString().trim();
                        const href = `/articles/${slug}`;

                        return (
                            <Link
                                key={a.id}
                                href={href}
                                className="block bg-white rounded-xl shadow hover:shadow-lg transition  hover:border-blue-200"
                            >
                                

                                {a.image && (
                                    <Image
                                        src={fixUrl(a.image)}
                                        alt={a.title}
                                        width={400}
                                        height={240}
                                        className="w-full px-0 h-48 object-cover rounded-tl-md mb-3"
                                        loading="lazy"
                                    />
                                )}

                                <h2 className="text-lg font-semibold px-2 text-gray-800 mb-1 line-clamp-2">
                                    {a.title}
                                </h2>

                                <p className="text-sm text-gray-600 line-clamp-3 mb-2">
                                    {a.excerpt || a.seoDescription}
                                </p>

                                {/* <span className="text-blue-600 text-sm font-medium">
                                    Read More →
                                </span> */}
                            </Link>
                        );
                    })}
                </div>
            )}


            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-10 gap-3">
                    {page > 1 && (
                        <a
                            href={`/articles?page=${page - 1}`}
                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                        >
                            ← Previous
                        </a>
                    )}
                    <span className="px-4 py-2 text-gray-600">
                        Page {page} of {totalPages}
                    </span>
                    {page < totalPages && (
                        <a
                            href={`/articles?page=${page + 1}`}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                        >
                            Next →
                        </a>
                    )}
                </div>
            )}

            {/* JSON-LD Schema for Google Rich Results */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </section>
    );
}
