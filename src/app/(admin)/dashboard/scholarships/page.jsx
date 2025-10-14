"use client";
import { useEffect, useState } from "react";
import axiosClient from "@/lib/axios";
import { Plus, Loader2 } from "lucide-react";
import ScholarshipTable from "./components/ScholarshipTable";
import ScholarshipForm from "./components/ScholarshipForm";

export default function ScholarshipsAdminPage() {
    const [scholarships, setScholarships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [showForm, setShowForm] = useState(false);

    // ✅ Fetch all scholarships
    const fetchScholarships = async () => {
        setLoading(true);
        try {
            const res = await axiosClient.get("/api/scholarships");
            setScholarships(res.data.items || res.data || []);
        } catch (err) {
            console.error("Fetch scholarships error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchScholarships();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this scholarship?")) return;
        try {
            await axiosClient.delete(`/api/scholarships/${id}`);
            fetchScholarships();
        } catch (err) {
            console.error("Delete scholarship error:", err);
            alert("Failed to delete scholarship");
        }
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">🎓 Scholarships</h1>
                <button
                    onClick={() => {
                        setEditing(null);
                        setShowForm(true);
                    }}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                    <Plus className="h-4 w-4" /> Add Scholarship
                </button>
            </div>

            {/* Loader */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                </div>
            ) : (
                <ScholarshipTable
                    scholarships={scholarships}
                    onEdit={(sch) => {
                        setEditing(sch);
                        setShowForm(true);
                    }}
                    onDelete={handleDelete}
                />
            )}

            {/* Form Modal */}
            {showForm && (
                <ScholarshipForm
                    editing={editing}
                    initialData={editing || {}}
                    onClose={() => setShowForm(false)}
                    onSaved={() => {
                        setShowForm(false);
                        fetchScholarships();
                    }}
                />
            )}
        </div>
    );
}
