"use client";
import { Heart, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function UniversityCard({ uni }) {
    const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

    // Safe defaults
    const location = uni.location
        ? `${uni.location.city || ""}, ${uni.location.country || ""}`
        : "Unknown Location";

    // Dynamic values
    const programsCount = uni.programs?.length || uni.programsCount || 0;
    const scholarshipsCount = uni.scholarships?.length || uni.scholarshipsCount || 0;
    const featured = uni.isFeatured === true;

    // Helper for parsing modes
    const getModes = () => {
        try {
            const modes =
                typeof uni.programModes === "string"
                    ? JSON.parse(uni.programModes)
                    : uni.programModes;
            return Array.isArray(modes) && modes.length > 0
                ? modes.join(" / ")
                : "On-campus";
        } catch {
            return "On-campus";
        }
    };

    return (
        <div className="bg-white border rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
            {/* Banner */}
            <div className="relative h-32">
                <img
                    src={`${base}${uni.banner}`}
                    alt={`${uni.name} banner`}
                    className="w-full h-full object-cover"
                />

                {/* Favorite Button */}
                <button
                    title="Add to favorites"
                    className="absolute top-2 right-2 bg-white/80 rounded-full p-1.5 hover:bg-white transition"
                >
                    <Heart className="w-4 h-4 text-gray-600" />
                </button>
            </div>

            {/* Body */}
            <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                    <img
                        src={`${base}${uni.logo}`}
                        alt={`${uni.name} logo`}
                        className="w-8 h-8 rounded border object-cover"
                    />
                    <h3 className="font-semibold line-clamp-1 flex items-center gap-[1px]">
                        {uni.name}
                        {uni.status === "approved" && (
                            <img
                                src="/icons/approved.webp" // ✅ your verification badge image path
                                alt="Verified"
                                title="Verified University"
                                className="w-8 h-8 inline-block"
                            />
                        )}
                    </h3>
                </div>

                <p className="text-sm text-gray-500">📍 {location}</p>

                {programsCount > 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                        {programsCount}+ Offered Programmes
                    </p>
                )}

                {scholarshipsCount > 0 && (
                    <p className="text-xs text-gray-500">
                        {scholarshipsCount}+ Scholarships
                    </p>
                )}

                <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-gray-400">{getModes()}</span>

                    {featured && (
                        <span className="text-green-600 text-xs font-medium bg-green-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <img
                                src="/icons/star-featured.svg" // ✅ custom small featured star image (optional)
                                alt="Featured"
                                className="w-3 h-3"
                            />
                            Featured
                        </span>
                    )}
                </div>

                {/* View Details Button with Icon */}
                <Link
                    href={`/universities/${uni.slug || uni.id}`}
                    className="mt-3 flex items-center justify-end text-sm text-blue-600 hover:text-blue-700 font-medium transition"
                >
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
            </div>
        </div>
    );
}
