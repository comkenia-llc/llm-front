"use client";

import { useEffect, useState } from "react";
import axiosClient from "@/lib/axios";
import { PlusCircle, Loader2 } from "lucide-react";
import ProgramForm from "./components/ProgramForm";
import ProgramTable from "./components/ProgramTable";

export default function AdminProgramsPage() {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProgram, setEditingProgram] = useState(null);

    // ✅ Fetch programs with associations
    const loadPrograms = async () => {
        try {
            setLoading(true);
            const res = await axiosClient.get("/api/programs?limit=100");
            const data = res.data.items || res.data || [];
            setPrograms(data);
        } catch (err) {
            console.error("❌ Fetch programs error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPrograms();
    }, []);

    // ✅ Delete handler
    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this program?")) return;
        try {
            await axiosClient.delete(`/api/programs/${id}`);
            loadPrograms();
        } catch (err) {
            console.error("❌ Delete program error:", err);
        }
    };

    // ✅ Edit handler
    const handleEdit = (program) => {
        setEditingProgram(program);
        setShowForm(true);
    };

    // ✅ Close modal
    const handleClose = () => {
        setShowForm(false);
        setEditingProgram(null);
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Programs Management</h1>
                <button
                    onClick={() => {
                        setEditingProgram(null);
                        setShowForm(true);
                    }}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                >
                    <PlusCircle size={18} />
                    Add Program
                </button>
            </div>

            {/* Loader or Table */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="animate-spin text-blue-600 w-8 h-8" />
                </div>
            ) : (
                <ProgramTable
                    programs={programs}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onView={(p) =>
                        alert(`Program Details\n\nTitle: ${p.title}\nUniversity: ${p.university?.name || "—"}`)
                    }
                />
            )}

            {/* Modal Form */}
            {showForm && (
                <ProgramForm
                    editing={!!editingProgram}
                    initialData={editingProgram}
                    onClose={handleClose}
                    onSaved={() => {
                        handleClose();
                        loadPrograms();
                    }}
                />
            )}
        </div>
    );
}
