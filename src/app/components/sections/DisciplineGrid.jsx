"use client";
import { useEffect, useState } from "react";
import { Loader2, ArrowRight, BookOpen } from "lucide-react";
import * as Icons from "lucide-react";
import Link from "next/link";
import axiosClient from "@/lib/axios";

export default function DisciplineGrid() {
    const [disciplines, setDisciplines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState(null);

    const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

    // 🎨 Modern gradient pool
    const gradientPalette = [
        "from-rose-600 via-red-500 to-orange-400",
        "from-amber-500 via-orange-500 to-pink-500",
        "from-emerald-500 via-green-500 to-lime-400",
        "from-teal-500 via-cyan-500 to-sky-400",
        "from-indigo-600 via-blue-600 to-cyan-500",
        "from-blue-700 via-indigo-700 to-violet-600",
        "from-fuchsia-500 via-purple-500 to-indigo-500",
        "from-violet-600 via-fuchsia-500 to-pink-500",
        "from-yellow-500 via-amber-500 to-orange-600",
        "from-orange-600 via-red-500 to-rose-500",
        "from-gray-700 via-slate-700 to-zinc-600",
        "from-stone-500 via-gray-600 to-slate-700",
    ];

    // 🔹 Fetch from backend
    useEffect(() => {
        const fetchDisciplines = async () => {
            try {
                const res = await axiosClient.get("/api/disciplines");
                const data = Array.isArray(res.data) ? res.data : res.data.items || [];

                // 🎲 Assign gradients randomly
                const shuffled = [...gradientPalette].sort(() => 0.5 - Math.random());
                const mapped = data.map((d, i) => ({
                    ...d,
                    gradient: shuffled[i % shuffled.length],
                }));

                setDisciplines(mapped);
            } catch (err) {
                console.error("Fetch disciplines error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDisciplines();
    }, []);

    if (loading) {
        return (
            <div className="py-24 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <section className="py-20 px-4 sm:px-8 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
            {/* Floating gradient blobs */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 left-10 w-40 h-40 bg-blue-200/40 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-60 h-60 bg-indigo-200/30 rounded-full blur-3xl animate-pulse"></div>
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent">
                        Explore by Discipline
                    </h2>
                    <Link
                        href="/disciplines"
                        className="group text-sm font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1"
                    >
                        All Disciplines
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-7">
                    {disciplines.map((d) => {
                        // 🎯 Determine icon source:
                        // 1. if backend has icon path (uploaded image) → show image
                        // 2. else if it has icon name matching Lucide → render that icon
                        // 3. fallback to BookOpen
                        const IconComp =
                            d.icon && typeof d.icon === "string" && Icons[d.icon]
                                ? Icons[d.icon]
                                : BookOpen;

                        const isImage = d.icon && d.icon.startsWith("/uploads");
                        const isActive = active === d.id;

                        return (
                            <Link
                                key={d.id}
                                href={`/disciplines/${d.slug}`}
                                className={`relative flex flex-col items-center justify-center rounded-2xl p-8 text-white 
                                shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 
                                ${isActive ? "scale-105 ring-4 ring-white/30" : "opacity-95 hover:opacity-100"}
                                bg-gradient-to-br ${d.gradient}`}
                            >
                                <div className="absolute inset-0 bg-white/10 rounded-2xl backdrop-blur-sm"></div>

                                {/* Icon / Image */}
                                <div className="relative z-10 p-3 rounded-full bg-white/20 mb-3 flex items-center justify-center">
                                    {isImage ? (
                                        // Backend-uploaded icon
                                        <img
                                            src={`${base}${d.icon}`}
                                            alt={d.name}
                                            className="h-8 w-8 object-contain rounded"
                                        />
                                    ) : (
                                        // Lucide icon fallback
                                        <IconComp className="h-7 w-7 text-white drop-shadow-sm" />
                                    )}
                                </div>

                                {/* Name */}
                                <span className="relative z-10 font-semibold text-center text-sm sm:text-base drop-shadow-sm">
                                    {d.name}
                                </span>

                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/10 to-transparent opacity-0 hover:opacity-20 transition-opacity duration-500"></div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
