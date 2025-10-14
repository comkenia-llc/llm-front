"use client";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BlogCard({ article, isActive, onFavorite }) {
    const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

    // ✅ 1. Default frontend fallback
    let imageSrc = "/images/article-placeholder.jpg";

    // ✅ 2. Only if backend actually provided a file path
    if (article?.image) {
        if (article.image.startsWith("http")) {
            imageSrc = article.image; // already full URL
        } else if (article.image.startsWith("/uploads/")) {
            imageSrc = `${base}${article.image}`; // backend upload
        } else {
            // 🚫 any accidental '/images/...' from backend gets ignored
            imageSrc = "/images/article-placeholder.jpg";
        }
    }

    const authorName = article.author?.name || article.authorName || "Admin";
    const date = article.createdAt
        ? new Date(article.createdAt).toLocaleDateString()
        : "Unknown date";

    return (
        <div
            className={`relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 
      ${isActive ? "ring-4 ring-red-400/30 shadow-red-200/40" : ""}`}
        >
            {/* Background Image */}
            <div className="relative h-72 w-full">
                <Image
                    src={imageSrc}
                    alt={article.title || "Article image"}
                    width={600}
                    height={400}
                    priority
                    unoptimized={imageSrc.startsWith("/images/")} // ✅ only disables optimizer for local fallback
                    className="object-cover w-full h-full"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Favorite Button */}
                <button
                    onClick={() => onFavorite(article.id)}
                    className={`absolute top-3 right-3 rounded-full p-2 bg-white/80 backdrop-blur-md transition-all duration-200 
          ${isActive ? "text-red-500" : "text-gray-600 hover:text-red-500"}`}
                >
                    <Heart
                        className={`h-5 w-5 ${isActive ? "fill-red-500 text-red-500" : "text-gray-500"
                            }`}
                    />
                </button>
            </div>

            {/* Text Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <h3 className="font-semibold text-sm sm:text-lg leading-snug mb-2 line-clamp-2">
                    {article.title}
                </h3>

                <div className="flex items-center justify-between text-sm text-gray-300 mb-3">
                    <span>
                        By{" "}
                        <span className="font-semibold text-xs text-white">
                            {authorName}
                        </span>
                    </span>
                    <span>{date}</span>
                </div>

                {/* Read Button */}
                <Link
                    href={`/articles/${article.slug || article.id}`}
                    className="inline-block bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-md transition-all"
                >
                    Read Now
                </Link>
            </div>
        </div>
    );
}
