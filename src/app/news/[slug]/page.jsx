import NewsDetailClient from "./NewsDetailsClient";


export const revalidate = 0; // Always fetch fresh data

// ✅ Generate Metadata for SSR SEO
export async function generateMetadata({ params }) {
    const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    const res = await fetch(`${base}/api/news/${params.slug}`, { cache: "no-store" });

    if (!res.ok) {
        return {
            title: "News Not Found | Keekan Education",
            description: "The requested news article could not be found.",
        };
    }

    const news = await res.json();

    const title = news.seoTitle || `${news.title} | Keekan Education`;
    const description =
        news.seoDescription ||
        news.excerpt ||
        "Latest educational insights and updates from Keekan Education.";
    const image = news.metaImage
        ? `${base}${news.metaImage}`
        : news.image
            ? `${base}${news.image}`
            : "/images/og-news.jpg";
    const canonical =
        news.canonicalUrl || `https://universitiesforllm.com/news/${news.slug}`;
    const keywords = news.seoKeywords || "";

    return {
        title,
        description,
        keywords,
        alternates: { canonical },
        openGraph: {
            title,
            description,
            url: canonical,
            type: "article",
            images: [{ url: image }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
        },
        other: {
            "article:published_time": news.createdAt,
            "article:modified_time": news.updatedAt,
        },
    };
}

// ✅ Server-Side Page
export default async function NewsDetailPage({ params }) {
    const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    const res = await fetch(`${base}/api/news/${params.slug}`, { cache: "no-store" });
    const news = await res.json();

    if (!news?.id) {
        return (
            <div className="flex justify-center items-center min-h-[60vh] text-gray-500">
                News article not found.
            </div>
        );
    }

    return <NewsDetailClient news={news} />;
}
