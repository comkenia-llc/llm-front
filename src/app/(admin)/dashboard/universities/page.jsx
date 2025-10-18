"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import axiosClient from "@/lib/axios";
import UniversityTable from "./components/UniversityTable";

export default function UniversitiesPage() {
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUniversities = async () => {
        try {
            const res = await axiosClient.get("/api/universities");
            setUniversities(res.data.items || []);
        } catch (err) {
            console.error("Fetch universities error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUniversities();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this university?")) return;
        try {
            await axiosClient.delete(`/api/universities/${id}`);
            fetchUniversities();
        } catch (err) {
            console.error("Delete university error:", err);
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Universities</h1>

                {/* ✅ Navigate to /admin/universities/new */}
                <Link
                    href="/dashboard/universities/add"
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                    <Plus className="h-5 w-5" />
                    Add University
                </Link>
            </div>

            {/* List */}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <UniversityTable
                    universities={universities}
                    onEdit={(uni) =>
                        (window.location.href = `/dashboard/universities/${uni.id}/edit`)
                    }
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
}
