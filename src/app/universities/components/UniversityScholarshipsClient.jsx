"use client";
import { useEffect, useState } from "react";
import axiosClient from "@/lib/axios";
import ScholarshipCard from "@/app/components/cards/ScholarshipCard";

export default function UniversityScholarshipsClient({ uniId }) {
    const [scholarships, setScholarships] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!uniId) return;

        const fetchScholarships = async () => {
            try {
                const res = await axiosClient.get(`/api/scholarships?universityId=${uniId}`);
                const data = Array.isArray(res.data) ? res.data : res.data.items || [];

                const mapped = data.map((sch) => ({
                    id: sch.id,
                    slug: sch.slug, // ✅ Add this line
                    title: sch.title,
                    type: sch.coverage === "full" ? "Full" : "Partial",
                    university: sch.university?.name || "Unknown University",
                    universityLogo: sch.university?.logo
                        ? `${process.env.NEXT_PUBLIC_API_URL}${sch.university.logo}`
                        : "/images/university-placeholder.png",
                    location: sch.location
                        ? [sch.location.city, sch.location.country].filter(Boolean).join(", ")
                        : sch.university?.location
                            ? [sch.university.location.city, sch.university.location.country]
                                .filter(Boolean)
                                .join(", ")
                            : "Worldwide",
                    amount: sch.amount || null,
                    deadline: sch.deadline
                        ? new Date(sch.deadline).toLocaleDateString()
                        : null,
                    currency: sch.currency || "USD",
                }));

                setScholarships(mapped);
            } catch (err) {
                console.error("❌ Error fetching university scholarships:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchScholarships();
    }, [uniId]);

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-gray-200 h-44 rounded-xl shadow-sm" />
                ))}
            </div>
        );
    }

    if (!scholarships.length) {
        return (
            <p className="text-center text-gray-500 py-10">
                No scholarships available for this university.
            </p>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {scholarships.map((s) => (
                <ScholarshipCard key={s.id} scholarship={s} />
            ))}
        </div>
    );
}
