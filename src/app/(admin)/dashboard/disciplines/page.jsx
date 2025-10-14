"use client";
import { useState, useEffect } from "react";
import axiosClient from "@/lib/axios";
import { Plus } from "lucide-react";
import DisciplineTable from "./components/DisciplineTable";
import DisciplineForm from "./components/DisciplineForm";

export default function DisciplinesPage() {
    const [disciplines, setDisciplines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const fetchDisciplines = async () => {
        try {
            const res = await axiosClient.get("/api/disciplines");
            setDisciplines(res.data || []);
        } catch (err) {
            console.error("Fetch disciplines error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDisciplines();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this discipline?")) return;
        try {
            await axiosClient.delete(`/api/disciplines/${id}`);
            setDisciplines((prev) => prev.filter((d) => d.id !== id));
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    const handleEdit = (discipline) => {
        setEditing(discipline);
        setShowForm(true);
    };

    const handleAdd = () => {
        setEditing(null);
        setShowForm(true);
    };

    const handleSaved = () => {
        setShowForm(false);
        fetchDisciplines();
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Disciplines</h1>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                    <Plus className="h-5 w-5" /> Add Discipline
                </button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <DisciplineTable
                    disciplines={disciplines}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            {showForm && (
                <DisciplineForm
                    editing={editing}
                    onClose={() => setShowForm(false)}
                    onSaved={handleSaved}
                />
            )}
        </div>
    );
}
