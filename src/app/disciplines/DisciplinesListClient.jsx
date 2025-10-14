"use client";

import { useEffect, useState } from "react";
import axiosClient from "@/lib/axios";
import { Loader2 } from "lucide-react";
import DisciplineCard from "@/app/components/cards/DisciplineCard";

export default function DisciplinesListClient() {
    const [disciplines, setDisciplines] = useState([]); // ✅ this was missing
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDisciplines = async () => {
            try {
                setLoading(true);
                const res = await axiosClient.get(`/api/disciplines?page=1&limit=12&_t=${Date.now()}`);
                console.log("🎓 Disciplines API Response:", res.data);

                const data = Array.isArray(res.data) ? res.data : res.data.items || [];
                setDisciplines(data);
                console.log("✅ Parsed Disciplines:", data);
            } catch (err) {
                console.error("❌ Error fetching disciplines:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDisciplines();
    }, []);

    if (loading)
        return (
            <div className="flex justify-center items-center py-24">
                <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
            </div>
        );

    if (!disciplines.length)
        return (
            <div className="text-center py-24 text-gray-500">
                No disciplines found.
            </div>
        );

    return (
        <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-16 px-4 sm:px-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent">
                    Explore Disciplines
                </h1>

                {/* ✅ Grid Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {disciplines.map((d) => (
                        <DisciplineCard key={d.id} discipline={d} />
                    ))}
                </div>
            </div>
        </section>
    );
}
