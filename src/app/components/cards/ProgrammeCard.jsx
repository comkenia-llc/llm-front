"use client";
import Image from "next/image";
import { Heart, MapPin, Clock, DollarSign } from "lucide-react";
import Link from "next/link";

export default function ProgrammeCard({ programme, university, onFavorite, isActive }) {
    const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

    // ✅ Resolve image URLs and fallbacks
    const featuredImage = programme.featuredImage
        ? `${base}${programme.featuredImage}`
        : "/images/program3.jpg";

    const uniLogo = university?.logo
        ? `${base}${university.logo}`
        : "/images/uni1.png";

    const tuition =
        programme.tuitionFee && !isNaN(Number(programme.tuitionFee))
            ? `${programme.currency || "USD"} ${Number(programme.tuitionFee).toLocaleString()}`
            : "Tuition varies";

    return (
        <div
            className={`relative flex flex-col justify-between rounded-2xl border bg-white shadow-sm hover:shadow-xl 
      hover:-translate-y-1 transition-all duration-300 overflow-hidden 
      ${isActive ? "ring-4 ring-blue-400/30 shadow-blue-200/40" : ""}`}
        >
            <Link
                href={`/programs/${programme.slug || programme.id}`}
            >

                {/* ✅ Program Thumbnail */}
                <div className="relative h-44 sm:h-52 w-full">
                    <Image
                        src={featuredImage}
                        alt={programme.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />

                    {/* ❤️ Favorite button */}
                    <button
                        onClick={() => onFavorite?.(programme.id)}
                        className={`absolute top-3 right-3 rounded-full p-2 bg-white/80 backdrop-blur-sm transition-colors 
          ${isActive ? "text-red-500" : "text-gray-600 hover:text-red-500"}`}
                    >
                        <Heart
                            className={`h-5 w-5 ${isActive ? "fill-red-500 text-red-500" : "text-gray-500"}`}
                        />
                    </button>

                    {/* ⭐ Featured tag */}
                    {programme.isFeatured && (
                        <span className="absolute bottom-2 left-2 bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-0.5 rounded-md shadow-sm">
                            Featured
                        </span>
                    )}
                </div>
            </Link>
            {/* ✅ Program Details */}
            <div className="p-5 flex flex-col gap-3">
                <h3 className="font-semibold text-gray-900 text-lg leading-snug line-clamp-2">
                    {programme.title}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 text-xs mt-1">
                    {programme.level && (
                        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium capitalize">
                            {programme.level}
                        </span>
                    )}
                    {programme.studyMode && (
                        <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium capitalize">
                            {programme.studyMode.replace("-", " ")}
                        </span>
                    )}
                    {programme.language && (
                        <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full font-medium">
                            {programme.language}
                        </span>
                    )}
                </div>

                {/* Tuition & Duration */}
                <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
                    <div className="flex items-center gap-1">
                        <Clock size={15} className="text-blue-500" />
                        <span>{programme.duration || "Flexible"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <DollarSign size={15} className="text-green-600" />
                        <span>{tuition}</span>
                    </div>
                </div>

                {/* ✅ University info */}
                {university && (
                    <div className="flex items-start gap-3 border-t pt-3 mt-3">
                        <div className="relative w-10 h-10 bg-gray-100 rounded-md overflow-hidden shrink-0">
                            <Image
                                src={uniLogo}
                                alt={`${university.name} logo`}
                                fill
                                className="object-cover"
                                sizes="40px"
                            />
                        </div>
                        <div className="flex flex-col text-sm">
                            <span className="font-medium text-gray-800">{university.name}</span>
                            {programme.location && (
                                <div className="flex items-center text-gray-500 gap-1">
                                    <MapPin className="h-3.5 w-3.5" />
                                    <span>
                                        {programme.location.city}, {programme.location.country}
                                    </span>
                                </div>
                            )}

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
