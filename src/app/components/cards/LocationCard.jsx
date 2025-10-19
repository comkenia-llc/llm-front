"use client";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Globe2 } from "lucide-react";
import { motion } from "framer-motion";

export default function LocationCard({ location, universityCount = 0, programCount = 0 }) {
    const base = process.env.NEXT_PUBLIC_API_URL || "https://back.universitiesforllm.com";

    // Dynamic image sources
    const mainImage =
        (location.image && `${base}${location.image}`) ||
        (location.metaImage && `${base}${location.metaImage}`) ||
        "/images/default-location.webp";

    const flag =
        (location.flag && `${base}${location.flag}`) || "/images/default-flag.webp";

    // Continent color theme
    const continentColors = {
        Europe: "from-blue-600 via-indigo-700 to-sky-600",
        Asia: "from-teal-600 via-emerald-700 to-lime-600",
        Africa: "from-amber-600 via-orange-700 to-red-600",
        "North America": "from-cyan-600 via-blue-700 to-indigo-700",
        "South America": "from-pink-600 via-rose-700 to-orange-600",
        Oceania: "from-purple-600 via-fuchsia-700 to-pink-600",
        default: "from-gray-600 via-slate-700 to-gray-500",
    };

    const gradient = continentColors[location.continent] || continentColors.default;

    return (
        <motion.div
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 180, damping: 15 }}
            className="relative"
        >
            <Link
                href={`/locations/${location.slug}`}
                className="group block overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500"
            >
                {/* === Hero Image === */}
                <div className="relative h-52 sm:h-60 overflow-hidden">
                    <Image
                        src={mainImage}
                        alt={location.country || location.state || location.city}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 25vw"
                        priority
                    />

                    {/* === Bottom Blur & Gradient only === */}
                    {/* <div
                        className={`absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t ${gradient}`}
                    ></div> */}

                    {/* === Floating Flag & Continent === */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                        <div className="relative w-8 h-5 rounded overflow-hidden border border-white/80 shadow-md bg-white/50 backdrop-blur-md">
                            <Image
                                src={flag}
                                alt={`${location.country} flag`}
                                fill
                                className="object-cover"
                                sizes="32px"
                            />
                        </div>
                        <span className="text-white text-xs bg-black/30 px-2 py-0.5 rounded-full backdrop-blur-sm">
                            {location.continent || "Global"}
                        </span>
                    </div>

                    {/* === Featured Tag === */}
                    {location.isFeatured && (
                        <div className="absolute top-3 right-3 bg-green-600 text-white text-xs font-semibold px-2 py-0.5 rounded shadow-sm backdrop-blur-sm">
                            Featured
                        </div>
                    )}
                </div>

                {/* === Info Section === */}
                <div className="relative p-5 flex flex-col items-center text-center">
                    {/* Subtle top glow line */}
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/60 to-transparent opacity-60"></div>

                    <h3 className="font-semibold text-lg text-gray-900 mt-1 group-hover:text-blue-700 transition-colors line-clamp-1">
                        {location.country || location.state || location.city}
                    </h3>

                    {location.state || location.city ? (
                        <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                            {location.city
                                ? `${location.city}${location.state ? `, ${location.state}` : ""}`
                                : location.state}
                        </p>
                    ) : (
                        <p className="text-sm text-gray-500 mt-1 capitalize">{location.type}</p>
                    )}

                    {/* === Stats Section === */}
                    <div className="mt-4 grid grid-cols-2 gap-3 w-full">
                        <div className="flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 rounded-xl py-3 shadow-inner text-gray-800">
                            <GraduationCap className="h-5 w-5 text-emerald-600 mb-1" />
                            <span className="text-lg font-semibold">{universityCount}</span>
                            <span className="text-sm text-gray-600">Universities</span>
                        </div>

                        <div className="flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 rounded-xl py-3 shadow-inner text-gray-800">
                            <Globe2 className="h-5 w-5 text-blue-600 mb-1" />
                            <span className="text-lg font-semibold">{programCount}</span>
                            <span className="text-sm text-gray-600">Programs</span>
                        </div>
                    </div>


                    {/* Hover border glow */}
                    <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-blue-500/20 transition-all"></div>
                </div>
            </Link>
        </motion.div>
    );
}
