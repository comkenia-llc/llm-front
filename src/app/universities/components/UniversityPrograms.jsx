"use client";
import { useEffect, useState } from "react";
import axiosClient from "@/lib/axios";
import ProgrammeCard from "@/app/components/cards/ProgrammeCard";


export default function UniversityPrograms({ uni }) {
    const [programs, setPrograms] = useState([]);
    const [favorites, setFavorites] = useState([]);

    // ✅ Fetch programs from backend for this university
    useEffect(() => {
        if (!uni?.id) return;
        axiosClient
            .get(`/api/programs?universityId=${uni.id}`)
            .then((res) => setPrograms(res.data.items || []))
            .catch((err) => console.error("Fetch programs error:", err));
    }, [uni?.id]);

    // ✅ Handle favorites (local only for now)
    const handleFavorite = (id) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
        );
    };

    if (!programs.length)
        return <p className="text-gray-500 text-center py-8">No programs available yet.</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program) => (
                <ProgrammeCard
                    key={program.id}
                    programme={program}
                    university={uni}
                    onFavorite={handleFavorite}
                    isActive={favorites.includes(program.id)}
                />
            ))}
        </div>
    );
}
