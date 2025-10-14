"use client";

import { useEffect, useState } from "react";
import axiosClient from "@/lib/axios";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function NewsDetailClient({ news }) {
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);

    const base = process.env.NEXT_PUBLIC_API_URL || "";

    useEffect(() => {
        const fetchRelated = async () => {
            try {
                const res = await axiosClient.get("/api/news?limit=3&status=published");
                setRelated(res.data.items || res.data || []);
            } catch (err) {
                console.error("❌ Error fetching related news:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchRelated();
    }, []);

    // ✅ Build image URL
    const image = news.metaImage
        ? `${base}${news.metaImage}`
        : news.image
            ? `${base}${news.image}`
            : "/images/og-news.jpg";

    // ✅ Build JSON-LD Schema (Rich Results)
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": news.schemaType || "NewsArticle",
        headline: news.seoTitle || news.title,
        description:
            news.seoDescription ||
            news.excerpt ||
            "Educational insights from Keekan Education.",
        image: [image],
        author: {
            "@type": "Person",
            name:
                news.author?.firstName || news.author?.lastName
                    ? `${news.author.firstName || ""} ${news.author.lastName || ""}`.trim()
                    : "Keekan Team",
        },
        publisher: {
            "@type": "Organization",
            name: "Keekan Education",
            logo: {
                "@type": "ImageObject",
                url: "https://universitiesforllm.com/logo.png",
            },
        },
        datePublished: news.createdAt,
        dateModified: news.updatedAt || news.createdAt,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://universitiesforllm.com/news/${news.slug}`,
        },
    };

    return (
        <article className="min-h-screen bg-gray-50 py-10">
            {/* ===== Banner ===== */}
            {(news.metaImage || news.image) && (
                <div className="relative w-full h-72 sm:h-96 mb-8">
                    <img
                        src={image}
                        alt={news.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent"></div>
                </div>
            )}

            {/* ===== Article ===== */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 bg-white p-8 rounded-lg shadow">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                    {news.title}
                </h1>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                    <span>
                        {news.author
                            ? `${news.author.firstName || ""} ${news.author.lastName || ""}`.trim() ||
                            "Admin"
                            : "Admin"}
                    </span>
                    <span>
                        {new Date(news.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                        })}
                    </span>
                </div>

                {news.excerpt && (
                    <p className="italic text-gray-700 mb-6 border-l-4 border-blue-600 pl-4">
                        {news.excerpt}
                    </p>
                )}

                <div
                    className="prose max-w-none text-gray-800"
                    dangerouslySetInnerHTML={{ __html: news.content }}
                />
            </div>

            {/* ===== Related News ===== */}
            {!loading && related.length > 0 && (
                <div className="max-w-6xl mx-auto mt-16 px-4 sm:px-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">
                        Related News
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {related.map((item) => (
                            <Link
                                key={item.id}
                                href={`/news/${item.slug || item.id}`}
                                className="group bg-white rounded-xl border shadow-sm hover:shadow-lg overflow-hidden transition"
                            >
                                {(item.metaImage || item.image) && (
                                    <img
                                        src={
                                            item.metaImage
                                                ? `${base}${item.metaImage}`
                                                : item.image?.startsWith("/uploads")
                                                    ? `${base}${item.image}`
                                                    : item.image
                                        }
                                        alt={item.title}
                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                )}
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 line-clamp-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                        {item.excerpt || item.seoDescription}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* ===== JSON-LD Schema ===== */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd, null, 2),
                }}
            />
        </article>
    );
}
