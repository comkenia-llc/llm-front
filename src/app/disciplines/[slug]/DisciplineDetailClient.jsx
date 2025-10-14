"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosClient from "@/lib/axios";
import { Loader2 } from "lucide-react";
import ProgrammeCard from "@/app/components/cards/ProgrammeCard";
import UniversityCard from "@/app/components/cards/UniversityCard";

export default function DisciplineDetailClient() {
    const { slug } = useParams();
    const [discipline, setDiscipline] = useState(null);
    const [programs, setPrograms] = useState([]);
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;
        const fetchData = async () => {
            try {
                const res = await axiosClient.get(`/api/disciplines/${slug}/programs`);
                const data = res.data;
                setDiscipline(data.discipline);
                setPrograms(data.programs);
                setUniversities(data.universities);
            } catch (err) {
                console.error("Error fetching discipline detail:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [slug]);

    // 🦴 Skeleton loader UI
    if (loading)
        return (
            <section className="max-w-6xl mx-auto px-4 py-16">
                <div className="animate-pulse space-y-6">
                    {/* Header skeleton */}
                    <div className="h-10 w-2/3 bg-gray-200 rounded-lg" />
                    <div className="h-4 w-1/2 bg-gray-200 rounded-lg mb-10" />

                    {/* Programs skeleton grid */}
                    <h2 className="h-6 w-40 bg-gray-200 rounded mb-4"></h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="h-56 bg-gray-200 rounded-xl shadow-sm"
                            ></div>
                        ))}
                    </div>

                    {/* Universities skeleton grid */}
                    <h2 className="h-6 w-40 bg-gray-200 rounded mb-4"></h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="h-56 bg-gray-200 rounded-xl shadow-sm"
                            ></div>
                        ))}
                    </div>
                </div>
            </section>
        );

    if (!discipline)
        return (
            <div className="text-center py-24 text-gray-500">
                Discipline not found.
            </div>
        );

    return (
        <section className="max-w-6xl mx-auto px-4 py-16">
            {/* <h1 className="text-4xl font-bold text-blue-900 mb-6">{discipline.name}</h1> */}
            {/* <p className="text-gray-700 mb-10">{discipline.description}</p> */}

            {/* Programs */}
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Programs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {programs.map((p) => (
                    <ProgrammeCard key={p.id} programme={p} university={p.university} />
                ))}
            </div>

            {/* Universities */}
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Universities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {universities.map((u) => (
                    <UniversityCard key={u.id} university={u} />
                ))}
            </div>
        </section>
    );
}
