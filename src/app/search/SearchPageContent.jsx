"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axiosClient from "@/lib/axios";
import ProgrammeCard from "@/app/components/cards/ProgrammeCard";

export default function SearchPageContent() {
    const params = useSearchParams();
    const discipline = params.get("discipline");
    const location = params.get("location");

    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const query = new URLSearchParams();
                if (discipline) query.set("discipline", discipline);
                if (location) query.set("location", location);

                const res = await axiosClient.get(`/api/programs?${query.toString()}`);
                setPrograms(res.data.items || res.data);
            } catch (err) {
                console.error("❌ Error fetching programs:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPrograms();
    }, [discipline, location]);

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">Search Results</h1>
            <p className="text-gray-600 mb-8">
                Showing results for:
                {discipline && <span className="font-semibold"> {discipline}</span>}
                {location && <span className="font-semibold"> in {location}</span>}
            </p>

            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : programs.length === 0 ? (
                <p className="text-center text-gray-500 py-10">
                    No programs found for your search.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {programs.map((p) => (
                        <ProgrammeCard key={p.id} programme={p} university={p.university} />
                    ))}
                </div>
            )}
        </div>
    );
}
