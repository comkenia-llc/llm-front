"use client";

import { useEffect, useState } from "react";
import ProgrammeCard from "../cards/ProgrammeCard";
import { Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import axiosClient from "@/lib/axios";

export default function FeaturedProgrammesSection() {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);

    // ✅ Fetch featured programs directly from backend
    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const res = await axiosClient.get("/api/programs?isFeatured=true&limit=6");
                setPrograms(res.data.items || []);
            } catch (err) {
                console.error("Failed to fetch featured programs:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPrograms();
    }, []);

    const handleFavorite = (id) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
        );
    };

    if (loading)
        return (
            <div className="py-24 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );

    if (!programs.length)
        return (
            <section className="py-20 px-4 sm:px-8 bg-white text-center">
                <h2 className="text-2xl font-semibold text-gray-600">
                    No featured programs available yet.
                </h2>
            </section>
        );

    return (
        <section className="py-20 px-4 sm:px-8 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
                    <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent">
                        Featured Programmes
                    </h2>
                    <Link
                        href="/programmes"
                        className="group text-sm font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1"
                    >
                        All Programmes
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Program Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {programs.map((programme) => (
                        <ProgrammeCard
                            key={programme.id}
                            programme={programme}
                            university={programme.university || programme.University} // ✅ backend relation support
                            onFavorite={handleFavorite}
                            isActive={favorites.includes(programme.id)}
                        />
                    ))}
                </div>

                {/* Button */}
                <div className="flex justify-center mt-12">
                    <Link
                        href="/programmes/featured"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition-all"
                    >
                        View All Featured Programmes
                    </Link>
                </div>
            </div>
        </section>
    );
}
