"use client";
import { useState, useEffect } from "react";
import ScholarshipCard from "../cards/ScholarshipCard";
import { Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import axiosClient from "@/lib/axios";

export default function ScholarshipsSection() {
    const [scholarships, setScholarships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);

    // ✅ Fetch scholarships from backend
    useEffect(() => {
        const fetchScholarships = async () => {
            try {
                const res = await axiosClient.get("/api/scholarships");
                const data = Array.isArray(res.data) ? res.data : res.data.items || [];

                console.group("🎓 ScholarshipsSection API Debug");
                console.log("Total Scholarships Fetched:", data.length);
                console.log("Sample Data:", data[0]);
                console.groupEnd();

                // ✅ Map backend data for ScholarshipCard
                const mapped = data.map((sch) => ({
                    id: sch.id,
                    slug: sch.slug, // ✅ Added
                    title: sch.title,
                    type: sch.coverage === "full" ? "Full" : "Partial",
                    university: sch.university?.name || "Unknown University",
                    universityLogo: sch.university?.logo
                        ? `${process.env.NEXT_PUBLIC_API_URL}${sch.university.logo}`
                        : "/images/university-placeholder.png",
                    location: sch.location
                        ? [sch.location.city, sch.location.country].filter(Boolean).join(", ")
                        : sch.university?.location
                            ? [sch.university.location.city, sch.university.location.country]
                                .filter(Boolean)
                                .join(", ")
                            : "Worldwide",
                    amount: sch.amount || null,
                    deadline: sch.deadline
                        ? new Date(sch.deadline).toLocaleDateString()
                        : null,
                    currency: sch.currency || "USD",
                }));


                setScholarships(mapped);
            } catch (err) {
                console.error("❌ Error fetching scholarships:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchScholarships();
    }, []);

    // ✅ Toggle favorite
    const toggleFavorite = (id) => {
        setFavorites((prev) =>
            prev.includes(id)
                ? prev.filter((fid) => fid !== id)
                : [...prev, id]
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

    // ✅ No data state
    if (!scholarships.length) {
        return (
            <div className="py-20 text-center text-gray-500">
                No scholarships available at the moment.
            </div>
        );
    }

    // ✅ Render scholarships
    return (
        <section className="py-20 px-4 sm:px-8 bg-gradient-to-br from-white via-gray-50 to-blue-50">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent">
                        Featured Scholarships
                    </h2>
                    <Link
                        href="/scholarships"
                        className="group text-sm font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1"
                    >
                        All Scholarships
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {scholarships.map((scholarship) => (
                        <ScholarshipCard
                            key={scholarship.id}
                            scholarship={scholarship}
                            isActive={favorites.includes(scholarship.id)}
                            onFavorite={toggleFavorite}
                        />
                    ))}
                </div>

                {/* Optional button */}
                <div className="flex justify-center mt-12">
                    <Link
                        href="/scholarships"
                        className="bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-800 transition-all"
                    >
                        Explore All Scholarships
                    </Link>
                </div>
            </div>
        </section>
    );
}
