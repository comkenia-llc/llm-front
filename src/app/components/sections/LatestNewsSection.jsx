"use client";
import { useEffect, useState } from "react";
import { Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import NewsCard from "../cards/NewsCard";
import axiosClient from "@/lib/axios"; // ✅ your axios instance

export default function LatestNewsSection() {
    const [newsList, setNewsList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLatestNews = async () => {
            try {
                setLoading(true);

                console.log("📰 Fetching latest news from backend...");
                const res = await axiosClient.get(
                    `/api/news?limit=4&_t=${Date.now()}`, // ✅ prevent 304 cache
                    { headers: { "Cache-Control": "no-cache" } }
                );

                console.log("✅ Raw news API response:", res.data);

                // If backend returns {items: [...], pagination: {...}}
                const data = Array.isArray(res.data)
                    ? res.data
                    : res.data.items || [];

                console.log("🧩 Parsed news list:", data);
                setNewsList(data);
            } catch (err) {
                console.error("❌ Error fetching latest news:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchLatestNews();
    }, []);

    if (loading) {
        return (
            <div className="py-24 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <section className="py-20 px-4 sm:px-8 bg-white">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent">
                        Latest News & Insights
                    </h2>
                    <Link
                        href="/news"
                        className="group text-sm font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1"
                    >
                        All News
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Grid */}
                {newsList.length ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                        {newsList.map((news) => (
                            <NewsCard key={news.id} news={news} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 py-10">
                        No news found.
                    </p>
                )}
            </div>
        </section>
    );
}
