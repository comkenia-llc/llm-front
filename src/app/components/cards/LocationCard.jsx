"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, GraduationCap, Globe2 } from "lucide-react";

export default function LocationCard({ location, universityCount = 0, programCount = 0 }) {
    const base = process.env.NEXT_PUBLIC_API_URL || "https://back.universitiesforllm.com";

    const flag = location.flag
        ? `${base}${location.flag}`
        : "/images/default-flag.png";

    const metaImage = location.metaImage
        ? `${base}${location.metaImage}`
        : null;

    return (
        <Link
            href={`/locations/${location.slug}`}
            className="group block bg-white rounded-2xl border shadow-sm hover:shadow-lg hover:-translate-y-1 
                 transition-all duration-300 overflow-hidden"
        >
            {/* === Flag / Image === */}
            <div className="relative h-32 w-full bg-gray-50">
                <Image
                    src={metaImage || flag}
                    alt={location.country}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 250px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

                {/* ✅ Featured Tag */}
                {location.isFeatured && (
                    <span className="absolute top-2 left-2 bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-0.5 rounded-md shadow-sm">
                        Featured
                    </span>
                )}
            </div>

            {/* === Text Info === */}
            <div className="p-4 flex flex-col items-center text-center">
                <h3 className="font-semibold text-gray-900 text-lg group-hover:text-blue-700 transition-colors line-clamp-1">
                    {location.country}
                </h3>

                {location.city && (
                    <p className="text-xs text-gray-500 mt-0.5">
                        {location.city}, {location.state || ""}
                    </p>
                )}

                {/* === Type & Stats === */}
                <div className="flex items-center justify-center gap-3 text-xs text-gray-600 mt-3">
                    <div className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-blue-500" />
                        <span className="capitalize">{location.type}</span>
                    </div>

                    {universityCount > 0 && (
                        <div className="flex items-center gap-1">
                            <GraduationCap className="h-3.5 w-3.5 text-emerald-500" />
                            <span>{universityCount} Universities</span>
                        </div>
                    )}

                    {programCount > 0 && (
                        <div className="flex items-center gap-1">
                            <Globe2 className="h-3.5 w-3.5 text-purple-500" />
                            <span>{programCount} Programs</span>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}
