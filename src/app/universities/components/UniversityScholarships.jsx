"use client";
import { useEffect, useState } from "react";
import axiosClient from "@/lib/axios";

export default function UniversityScholarships({ uni }) {
    const [scholarships, setScholarships] = useState([]);

    useEffect(() => {
        axiosClient
            .get(`/api/scholarships?universityId=${uni.id}`)
            .then((res) => setScholarships(res.data.items || []))
            .catch((err) => console.error("Fetch scholarships error:", err));
    }, [uni.id]);

    if (!scholarships.length) return <p>No scholarships available.</p>;

    return (
        <div className="space-y-4">
            {scholarships.map((s) => (
                <div
                    key={s.id}
                    className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
                >
                    <h3 className="font-semibold">{s.title}</h3>
                    <p className="text-sm text-gray-500">
                        {s.type} · {s.amount || "N/A"} {s.currency || ""}
                    </p>
                </div>
            ))}
        </div>
    );
}
