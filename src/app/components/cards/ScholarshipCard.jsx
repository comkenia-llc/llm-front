"use client";
import { Heart, Calendar, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function ScholarshipCard({ scholarship, isActive, onFavorite }) {
    useEffect(() => {
        if (process.env.NODE_ENV === "development") {
            console.group(`🎓 ScholarshipCard Debug → ${scholarship.title}`);
            console.log("Full Scholarship Object:", scholarship);
            console.log("University:", scholarship.university);
            console.log("University Logo:", scholarship.universityLogo);
            console.log("Location:", scholarship.location);
            console.log("Coverage:", scholarship.coverage);
            console.log("Amount:", scholarship.amount);
            console.groupEnd();
        }
    }, [scholarship]);

    const scholarshipUrl = `/scholarships/${scholarship.slug}`; // ✅ fixed plural route


    return (
        <div
            className={`relative flex flex-col justify-between rounded-2xl border bg-white shadow-sm hover:shadow-xl 
      hover:-translate-y-1 transition-all duration-300 overflow-hidden ${isActive ? "ring-4 ring-blue-400/30 shadow-blue-200/40" : ""
                }`}
        >
            {/* Top Section */}
            <Link
                href={scholarshipUrl}
                className="justify-between flex flex-col"
            >
                <div className="p-5 flex flex-col gap-3">
                    <div className="flex items-start justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 leading-snug line-clamp-2">
                            {scholarship.title || "Untitled Scholarship"}
                        </h3>
                        <button
                            onClick={() => onFavorite?.(scholarship.id)}
                            className={`rounded-full p-2 transition-colors ${isActive ? "text-red-500" : "text-gray-400 hover:text-red-500"
                                }`}
                        >
                            <Heart
                                className={`h-5 w-5 ${isActive ? "fill-red-500 text-red-500" : "text-gray-400"
                                    }`}
                            />
                        </button>
                    </div>

                    {/* Type + Coverage */}
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-emerald-600 font-medium capitalize">
                            {scholarship.coverage || "Partial"} Scholarship
                        </span>
                        {scholarship.deadline && (
                            <span className="text-gray-500 flex items-center gap-1">
                                <Calendar size={14} />
                                {new Date(scholarship.deadline).toLocaleDateString()}
                            </span>
                        )}
                    </div>

                    {/* Amount */}
                    {scholarship.amount && (
                        <div className="text-sm text-gray-700 mt-1">
                            💰 <strong>{scholarship.amount}</strong>{" "}
                            <span className="text-gray-500">{scholarship.currency || "USD"}</span>
                        </div>
                    )}
                </div>

                {/* Bottom Section */}
                <div className="border-t p-5 flex items-center gap-3 bg-gray-50">
                    {/* University logo */}
                    <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                        <Image
                            src={scholarship.universityLogo || "/images/university-placeholder.png"}
                            alt={scholarship.university || "University Logo"}
                            width={120}
                            height={220}
                            className="object-cover w-full h-full"
                        />
                    </div>

                    {/* University info */}
                    <div className="flex flex-col text-sm">
                        <span className="font-medium text-gray-800 line-clamp-1">
                            {scholarship.university}
                        </span>
                        <div className="flex items-center gap-1 text-gray-500 text-xs">
                            {scholarship.flag && (
                                <Image
                                    src={scholarship.flag}
                                    alt="flag"
                                    width={20}
                                    height={15}
                                    className="rounded-sm"
                                />
                            )}
                            <span>{scholarship.location}</span>
                        </div>
                    </div>

                </div>
            </Link>
        </div>
    );
}
