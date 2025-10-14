"use client";

import { useEffect, useState } from "react";
import axiosClient from "@/lib/axios";
import { Loader2, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function NewsListClient() {
    const [newsList, setNewsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                const res = await axiosClient.get(`/api/news?page=${page}&limit=9`);
                const { items, pagination } = res.data;
                setNewsList(items || []);
                if (pagination) {
                    setTotalPages(Math.ceil(pagination.total / pagination.limit));
                }
            } catch (err) {
                console.error("❌ Error fetching news:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, [page]);

    if (loading)
        return (
            <div className="flex justify-center py-24">
                <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
            </div>
        );

    return (
        <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-16 px-4 sm:px-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent">
                    Latest News & Insights
                </h1>

                {!newsList.length ? (
                    <p className="text-center text-gray-500 py-16">No news articles found.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {newsList.map((news) => {
                            const base = process.env.NEXT_PUBLIC_API_URL || "";
                            const image =
                                news.image?.startsWith("/uploads") && base
                                    ? `${base}${news.image}`
                                    : news.image || "/images/og-news.jpg";
                            return (
                                <Link
                                    key={news.id}
                                    href={`/news/${news.slug || news.id}`}
                                    className="group border bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="relative w-full h-48 overflow-hidden">
                                        <img
                                            src={image}
                                            alt={news.title}
                                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>

                                    <div className="p-5 space-y-2">
                                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 line-clamp-2">
                                            {news.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm line-clamp-3">
                                            {news.excerpt || news.seoDescription || "Read the full story..."}
                                        </p>
                                        <div className="flex justify-between items-center pt-3 text-xs text-gray-500">
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
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-10">
                        <button
                            disabled={page <= 1}
                            onClick={() => setPage(page - 1)}
                            className={`flex items-center gap-1 px-4 py-2 rounded-md border text-sm ${page <= 1
                                    ? "text-gray-400 border-gray-200"
                                    : "text-blue-700 border-blue-300 hover:bg-blue-50"
                                }`}
                        >
                            <ArrowLeft className="h-4 w-4" /> Prev
                        </button>

                        <span className="text-sm text-gray-600">
                            Page {page} of {totalPages}
                        </span>

                        <button
                            disabled={page >= totalPages}
                            onClick={() => setPage(page + 1)}
                            className={`flex items-center gap-1 px-4 py-2 rounded-md border text-sm ${page >= totalPages
                                    ? "text-gray-400 border-gray-200"
                                    : "text-blue-700 border-blue-300 hover:bg-blue-50"
                                }`}
                        >
                            Next <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
