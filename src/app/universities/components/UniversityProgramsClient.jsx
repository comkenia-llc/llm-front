"use client";
import { useEffect, useState } from "react";
import axiosClient from "@/lib/axios";
import ProgrammeCard from "@/app/components/cards/ProgrammeCard";

export default function UniversityProgramsClient({ uniId }) {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!uniId) return;
        const fetchPrograms = async () => {
            try {
                const res = await axiosClient.get(`/api/programs?universityId=${uniId}`);

                setPrograms(res.data.items || []);
            } catch (err) {
                console.error("❌ Error fetching university programs:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPrograms();
    }, [uniId]);

    // 🦴 Skeleton loading
    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-gray-200 h-44 rounded-xl shadow-sm" />
                ))}
            </div>
        );
    }

    // 🚫 No programs
    if (!programs.length) {
        return (
            <p className="text-center text-gray-500 py-10">
                No programs available for this university.
            </p>
        );
    }

    // ✅ Render programs
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((p) => (
                <ProgrammeCard key={p.id} programme={p} university={p.university} />
            ))}
        </div>
    );
}
