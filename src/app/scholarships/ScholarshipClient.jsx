"use client";

import { useState, useEffect } from "react";
import axiosClient from "@/lib/axios";
import ScholarshipCard from "../components/cards/ScholarshipCard";
import { Loader2, Filter, Search } from "lucide-react";

export default function ScholarshipClient({ initialScholarships }) {
    const [scholarships, setScholarships] = useState(initialScholarships || []);
    const [loading, setLoading] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [filters, setFilters] = useState({
        coverage: "",
        country: "",
        keyword: "",
        status: "active",
    });

    const toggleFavorite = (id) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
        );
    };

    // ✅ Fetch on filter change
    useEffect(() => {
        const fetchScholarships = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (filters.coverage) params.append("coverage", filters.coverage);
                if (filters.status) params.append("status", filters.status);
                if (filters.country) params.append("country", filters.country);
                if (filters.keyword) params.append("keyword", filters.keyword);
                const res = await axiosClient.get(`/api/scholarships?${params.toString()}`);
                const data = Array.isArray(res.data)
                    ? res.data
                    : res.data.items || [];
                setScholarships(data);
            } catch (err) {
                console.error("Fetch scholarships error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchScholarships();
    }, [filters]);

    return (
        <>
            {/* 🔍 Filters */}
            <div className="bg-white shadow-sm border-b sticky top-0 z-20">
                <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-3 px-4 py-4">
                    <div className="flex items-center gap-2 border rounded-md px-3 py-1.5 flex-grow sm:flex-grow-0">
                        <Search size={16} className="text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search scholarships..."
                            className="outline-none text-sm w-full"
                            value={filters.keyword}
                            onChange={(e) =>
                                setFilters((f) => ({ ...f, keyword: e.target.value }))
                            }
                        />
                    </div>

                    <select
                        value={filters.coverage}
                        onChange={(e) =>
                            setFilters((f) => ({ ...f, coverage: e.target.value }))
                        }
                        className="border rounded-md px-3 py-1.5 text-sm"
                    >
                        <option value="">All Coverage</option>
                        <option value="full">Full</option>
                        <option value="partial">Partial</option>
                        <option value="tuition">Tuition</option>
                        <option value="living">Living</option>
                    </select>

                    <select
                        value={filters.status}
                        onChange={(e) =>
                            setFilters((f) => ({ ...f, status: e.target.value }))
                        }
                        className="border rounded-md px-3 py-1.5 text-sm"
                    >
                        <option value="">All Status</option>
                        <option value="active">Active</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="expired">Expired</option>
                    </select>

                    <button
                        onClick={() =>
                            setFilters({ coverage: "", country: "", keyword: "", status: "" })
                        }
                        className="ml-auto flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm"
                    >
                        <Filter size={14} /> Reset
                    </button>
                </div>
            </div>

            {/* 🧩 Scholarships Grid */}
            <div className="max-w-6xl mx-auto px-4 py-10">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="animate-spin text-blue-600 w-6 h-6" />
                    </div>
                ) : scholarships.length === 0 ? (
                    <p className="text-center text-gray-500 py-10">
                        No scholarships found for the selected filters.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {scholarships.map((sch) => (
                            <ScholarshipCard
                                key={sch.id}
                                scholarship={{
                                    id: sch.id,
                                    slug:sch.slug,
                                    title: sch.title,
                                    university: sch.university?.name || "Unknown University",
                                    universityLogo: sch.university?.logo
                                        ? `${process.env.NEXT_PUBLIC_API_URL}${sch.university.logo}`
                                        : "/images/university-placeholder.png",
                                    location: sch.location
                                        ? [
                                            sch.location.city,
                                            sch.location.state,
                                            sch.location.country,
                                        ]
                                            .filter(Boolean)
                                            .join(", ")
                                        : "Global",
                                    coverage: sch.coverage || "partial",
                                    amount: sch.amount || null,
                                    currency: sch.currency || "USD",
                                    deadline: sch.deadline,
                                }}
                                isActive={favorites.includes(sch.id)}
                                onFavorite={toggleFavorite}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
