"use client";

import { Heart, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function UniversityCard({ university = {}, isActive, onFavorite }) {
    const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

    const {
        id,
        slug,
        name = "Unknown University",
        logo,
        banner,
        location,
        programsCount = 0,
        scholarshipsCount = 0,
        rating = 4,
        featured = false,
        programModes = ["on-campus"],
    } = university || {};

    let parsedModes = [];

    try {
        if (Array.isArray(programModes)) {
            // If array elements contain commas or brackets, normalize
            parsedModes = programModes
                .flatMap((m) => (typeof m === "string" ? m.split(",") : []))
                .map((m) => m.replace(/[\[\]"]/g, "").trim())
                .filter(Boolean);
        } else if (typeof programModes === "string") {
            // Remove any JSON-style brackets and quotes, then split
            parsedModes = programModes
                .replace(/[\[\]"]/g, "")
                .split(",")
                .map((m) => m.trim())
                .filter(Boolean);
        }
    } catch {
        parsedModes = [];
    }


    const studyModeText = parsedModes.length
        ? parsedModes
            .map((m) =>
                m
                    .replace("-", " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase()) // capitalize each word
            )
            .join(", ")
        : "On Campus";

    
    const logoSrc =
        logo && logo.startsWith("/uploads")
            ? `${base}${logo}`
            : logo?.startsWith("http")
                ? logo
                : "/images/university-placeholder.png";

    const bannerSrc =
        banner && banner.startsWith("/uploads")
            ? `${base}${banner}`
            : banner?.startsWith("http")
                ? banner
                : "/images/university-banner-placeholder.jpg";

    return (
        <Link
            href={`/universities/${slug || id}`}
            className={`group relative rounded-2xl overflow-hidden border bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${isActive ? "ring-4 ring-blue-400/30 shadow-blue-200/40" : ""
                }`}
        >
            {/* 🖼️ Banner */}
            <div className="relative h-40 w-full">
                <Image
                    src={bannerSrc}
                    alt={`${name} banner`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

                {/* ❤️ Favorite */}
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        onFavorite?.(id);
                    }}
                    className={`absolute top-3 right-3 rounded-full p-2 bg-white/80 backdrop-blur-md transition-all duration-200 ${isActive ? "text-red-500" : "text-gray-600 hover:text-red-500"
                        }`}
                >
                    <Heart
                        className={`h-5 w-5 ${isActive ? "fill-red-500 text-red-500" : "text-gray-500"
                            }`}
                    />
                </button>
            </div>

            {/* 🧠 Info Section */}
            <div className="relative z-10 -mt-6 px-5 pb-5">
                {/* Floating Logo */}
                <div className="flex justify-center">
                    <div className="relative w-16 h-16 rounded-xl border-4 border-white shadow-lg overflow-hidden bg-white">
                        <Image
                            src={logoSrc}
                            alt={name}
                            width={80}
                            height={80}
                            className="object-contain w-full h-full"
                        />
                    </div>
                </div>

                {/* University Info */}
                <div className="text-center mt-3">
                    <h3 className="font-semibold text-gray-900 text-lg leading-snug line-clamp-1">
                        {name}
                    </h3>
                    <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mt-1">
                        <MapPin className="h-4 w-4" />
                        <span>
                            {university.locationText ||
                                (location?.city
                                    ? `${location.city}${location.state ? `, ${location.state}` : ""}${location.country ? `, ${location.country}` : ""}`
                                    : location?.country || "Location unavailable")}
                        </span>
                        {location?.flag && (
                            <Image
                                src={`${base}${location.flag}`}
                                alt="flag"
                                width={20}
                                height={15}
                                className="object-contain"
                            />
                        )}
                    </div>


                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 text-center mt-4 text-sm">
                    <div>
                        <p className="text-gray-900 font-semibold">{programsCount}+</p>
                        <p className="text-gray-500 text-xs">Programs</p>
                    </div>
                    <div>
                        <p className="text-gray-900 font-semibold">{scholarshipsCount}+</p>
                        <p className="text-gray-500 text-xs">Scholarships</p>
                    </div>
                </div>

                {/* Rating + Featured */}
                <div className="flex items-center justify-center mt-3 gap-2">
                    <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`h-4 w-4 ${i < rating
                                        ? "text-yellow-400 fill-yellow-400"
                                        : "text-gray-300"
                                    }`}
                            />
                        ))}
                    </div>
                    {featured && (
                        <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-md">
                            Featured
                        </span>
                    )}
                </div>

                {/* Study Modes */}
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                    {parsedModes.length > 0 ? (
                        parsedModes.map((mode) => {
                            const colorMap = {
                                "on-campus": "bg-green-100 text-green-800 border border-green-200",
                                online: "bg-blue-100 text-blue-800 border border-blue-200",
                                hybrid: "bg-purple-100 text-purple-800 border border-purple-200",
                                blended: "bg-indigo-100 text-indigo-800 border border-indigo-200",
                                "part-time": "bg-amber-100 text-amber-800 border border-amber-200",
                                "full-time": "bg-pink-100 text-pink-800 border border-pink-200",
                            };

                            const normalized = mode.toLowerCase();
                            const colors = colorMap[normalized] || "bg-gray-100 text-gray-700 border border-gray-200";

                            const label = mode
                                .replace("-", " ")
                                .replace(/\b\w/g, (c) => c.toUpperCase());

                            return (
                                <span
                                    key={mode}
                                    className={`px-3 py-1 text-xs sm:text-sm font-medium rounded-full shadow-sm ${colors} transition-transform hover:scale-105`}
                                >
                                    {label}
                                </span>
                            );
                        })
                    ) : (
                        <span className="text-gray-500 text-xs italic">On Campus</span>
                    )}
                </div>



            </div>
        </Link>
    );
}
