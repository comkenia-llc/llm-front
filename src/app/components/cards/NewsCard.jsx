"use client";
import Link from "next/link";

export default function NewsCard({ news }) {
    return (
        <div className="group cursor-pointer">
            <Link href={`/news/${news.slug || news.id}`}>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 group-hover:text-red-600 transition-colors duration-200">
                    {news.title}
                </h3>
            </Link>
            <p className="text-sm sm:text-base text-gray-600 mt-1 leading-snug">
                {news.excerpt}
            </p>

            {/* underline hover effect */}
            <div className="w-0 group-hover:w-1/3 h-[2px] bg-red-600 mt-2 transition-all duration-300"></div>
        </div>
    );
}
