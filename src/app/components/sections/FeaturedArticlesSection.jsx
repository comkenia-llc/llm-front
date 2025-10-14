"use client";
import { useState, useEffect } from "react";
import axiosClient from "@/lib/axios";
import BlogCard from "../cards/BlogCard";
import { Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FeaturedArticlesSection() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);

    // ✅ Fetch from backend
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await axiosClient.get("/api/articles");
                // Adjust key names to your actual backend response
                setArticles(res.data.items || res.data || []);
            } catch (err) {
                console.error("Fetch articles error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    // ✅ Handle favorites toggle
    const toggleFavorite = (id) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
        );
    };

    // ✅ Loading state
    if (loading) {
        return (
            <div className="py-24 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    // ✅ Empty state
    if (!articles.length) {
        return (
            <section className="py-20 px-4 sm:px-8 bg-white text-center">
                <p className="text-gray-500 text-lg">No featured articles yet.</p>
            </section>
        );
    }

    // ✅ Main render
    return (
        <section className="py-20 px-4 sm:px-8 bg-white">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent">
                        Featured Articles
                    </h2>
                    <Link
                        href="/articles"
                        className="group text-sm font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1"
                    >
                        All Articles
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {articles.map((article) => (
                        <BlogCard
                            key={article.id}
                            article={article}
                            isActive={favorites.includes(article.id)}
                            onFavorite={toggleFavorite}
                        />
                    ))}
                </div>

                {/* Button */}
                <div className="flex justify-center mt-12">
                    <Link href="/articles">
                        <button className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition-all">
                            See All Articles
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
