import NewsListClient from "./NewsListClient";

// ✅ Metadata works here (because no "use client")
export const metadata = {
    title: "Latest News & Updates about LLM | Keekan Education",
    description:
        "Stay informed with the latest education, scholarships, and university updates from around the world. Read verified news, insights, and announcements from Keekan Education.",
    openGraph: {
        title: "Latest News & Updates | Keekan Education",
        description:
            "Stay informed with the latest education, scholarships, and university updates from around the world.",
        url: "https://edu.keekan.com/news",
        type: "website",
        images: [
            {
                url: "/images/og-news.jpg",
                width: 1200,
                height: 630,
                alt: "Latest Education News",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Keekan Education News",
        description:
            "Latest university, scholarship, and education updates from around the world.",
        images: ["/images/og-news.jpg"],
    },
};

// ✅ Server component (SSR)
export default function NewsPage() {
    return <NewsListClient />;
}
