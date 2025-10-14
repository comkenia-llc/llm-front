"use client";
import { useEffect, useState } from "react";
import axiosClient from "@/lib/axios";
import { Plus, Loader2, Pencil, Trash2, CheckCircle, XCircle } from "lucide-react";
import NewsForm from "./components/NewsForm";
import NewsTable from "./components/NewsTable";


export default function NewsAdminPage() {
    const [newsList, setNewsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);

    // ✅ Fetch all news
    const fetchNews = async () => {
        try {
            const res = await axiosClient.get("/api/news?all=true");
            setNewsList(res.data);
        } catch (err) {
            console.error("❌ Fetch news error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this article?")) return;
        try {
            await axiosClient.delete(`/api/news/${id}`);
            fetchNews();
        } catch (err) {
            alert("Failed to delete news");
        }
    };

    const handleEdit = (item) => {
        setEditing(item);
        setModalOpen(true);
    };

    const handleSuccess = () => {
        setModalOpen(false);
        setEditing(null);
        fetchNews();
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-900">📰 Manage News</h1>
                <button
                    onClick={() => setModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
                >
                    <Plus className="h-5 w-5" /> Add News
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center py-24">
                    <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
                </div>
            ) : (
                <NewsTable
                    newsList={newsList}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            {modalOpen && (
                <NewsForm
                    existing={editing}
                    onClose={() => {
                        setModalOpen(false);
                        setEditing(null);
                    }}
                    onSuccess={handleSuccess}
                />
            )}
        </div>
    );
}
