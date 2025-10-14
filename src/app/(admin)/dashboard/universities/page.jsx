"use client";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import axiosClient from "@/lib/axios";
import UniversityTable from "./components/UniversityTable";
import UniversityForm from "./components/UniversityForm";

export default function UniversitiesPage() {
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [showForm, setShowForm] = useState(false);

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

    const handleAdd = () => {
        setEditing(null);
        setShowForm(true);
    };

    const handleEdit = (uni) => {
        setEditing(uni);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this university?")) return;
        try {
            await axiosClient.delete(`/api/universities/${id}`);
            fetchUniversities();
        } catch (err) {
            console.error("Delete university error:", err);
        }
    };

    const handleSaved = () => {
        setShowForm(false);
        fetchUniversities();
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Universities</h1>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                    <Plus className="h-5 w-5" />
                    Add University
                </button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <UniversityTable
                    universities={universities}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            {showForm && (
                <UniversityForm
                    editing={editing}
                    onClose={() => setShowForm(false)}
                    onSaved={handleSaved}
                />
            )}
        </div>
    );
}
