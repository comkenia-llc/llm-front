"use client";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import axiosClient from "@/lib/axios";
import LocationTree from "./components/LocationTree";
import LocationForm from "./components/LocationForm";


export default function LocationsPage() {
    const [tree, setTree] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [parent, setParent] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const fetchTree = async () => {
        try {
            const res = await axiosClient.get("/api/locations/tree");
            setTree(res.data);
        } catch (err) {
            console.error("Fetch tree error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTree();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this location?")) return;
        try {
            await axiosClient.delete(`/api/locations/${id}`);
            fetchTree();
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    const handleEdit = (loc) => {
        setEditing(loc);
        setParent(null);
        setShowForm(true);
    };

    const handleAdd = (parentNode) => {
        setEditing(null);
        setParent(parentNode);
        setShowForm(true);
    };

    const handleSaved = () => {
        setShowForm(false);
        fetchTree();
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Locations (Tree View)</h1>
                <button
                    onClick={() => handleAdd(null)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                    <Plus className="h-5 w-5" />
                    Add Country
                </button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <LocationTree
                    tree={tree}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onAddChild={handleAdd}
                />
            )}

            {showForm && (
                <LocationForm
                    editing={editing}
                    parent={parent}
                    onClose={() => setShowForm(false)}
                    onSaved={handleSaved}
                />
            )}
        </div>
    );
}
