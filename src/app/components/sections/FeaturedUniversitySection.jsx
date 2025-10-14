"use client";

import { useEffect, useState } from "react";
import UniversityCard from "../cards/UniversityCard";
import { Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import axiosClient from "@/lib/axios";

export default function FeaturedUniversitiesSection() {
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);

    // ✅ Fetch featured universities from backend
    useEffect(() => {
        const fetchFeaturedUniversities = async () => {
            try {
                const res = await axiosClient.get("/api/universities/featured");
                const data = Array.isArray(res.data) ? res.data : res.data.items || [];
                setUniversities(data);
            } catch (err) {
                console.error("❌ Fetch featured universities error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedUniversities();
    }, []);

    // ✅ Toggle favorite
    const toggleFavorite = (id) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
        );
    };

    if (loading) {
        return (
            <div className="py-24 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    if (!universities.length) {
        return (
            <div className="py-20 text-center text-gray-500">
                No featured universities found.
            </div>
        );
    }

    return (
        <section className="py-10 px-4 sm:px-8 bg-gradient-to-br from-gray-50 via-white to-blue-50">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent">
                        Featured Universities
                    </h2>
                    <Link
                        href="/universities"
                        className="group text-sm font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1"
                    >
                        All Universities
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {universities.map((uni) => (
                        <UniversityCard
                            key={uni.id}
                            university={{
                                ...uni,
                                programsCount: uni.programs?.length || uni.programsCount || 0,
                                scholarshipsCount: uni.scholarships?.length || uni.scholarshipsCount || 0,
                                rating: uni.rating || 4,
                                featured: uni.isFeatured === 1 || uni.isFeatured === true,
                            }}
                            isActive={favorites.includes(uni.id)}
                            onFavorite={toggleFavorite}
                        />

                    ))}
                </div>
            </div>
        </section>
    );
}
