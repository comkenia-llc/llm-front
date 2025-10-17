"use client";

import { useEffect, useState } from "react";
import LocationCard from "../cards/LocationCard";
import { Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import axiosClient from "@/lib/axios";

export default function FeaturedLocationsSection() {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);

    // ✅ Fetch featured locations from backend
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const res = await axiosClient.get("/api/locations?isFeatured=true&limit=6");
                setLocations(res.data.items || res.data || []);
            } catch (err) {
                console.error("❌ Failed to fetch featured locations:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchLocations();
    }, []);

    // ✅ Loading state
    if (loading)
        return (
            <div className="py-24 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );

    // ✅ Empty state
    if (!locations.length)
        return (
            <section className="py-20 px-4 sm:px-8 bg-white text-center">
                <h2 className="text-2xl font-semibold text-gray-600">
                    No featured locations available yet.
                </h2>
            </section>
        );

    // ✅ Main section
    return (
        <section className="py-20 px-4 sm:px-8 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-6xl mx-auto">
                {/* === Header === */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
                    <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent">
                        Featured Study Destinations
                    </h2>
                    <Link
                        href="/locations"
                        className="group text-sm font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1"
                    >
                        All Locations
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* === Location Grid === */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {locations.map((loc) => (
                        <LocationCard
                            key={loc.id}
                            location={loc}
                            universityCount={loc.universitiesCount || 0}
                            programCount={loc.programsCount || 0}
                        />
                    ))}
                </div>

                {/* === Button === */}
                <div className="flex justify-center mt-12">
                    <Link
                        href="/locations/featured"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition-all"
                    >
                        View All Featured Locations
                    </Link>
                </div>
            </div>
        </section>
    );
}
