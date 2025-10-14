"use client";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import axiosClient from "@/lib/axios";
import ArticleTable from "./components/ArticleTable";
import ArticleForm from "./components/ArticleForm";

export default function ArticlesPage() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const fetchArticles = async () => {
        try {
            const res = await axiosClient.get("/api/articles");
            setArticles(res.data.items || res.data || []);
        } catch (err) {
            console.error("Fetch articles error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this article?")) return;
        try {
            await axiosClient.delete(`/api/articles/${id}`);
            setArticles((prev) => prev.filter((a) => a.id !== id));
        } catch (err) {
            console.error("Delete error:", err);
            alert("Failed to delete article");
        }
    };

    const handleEdit = (article) => {
        setEditing(article);
        setShowForm(true);
    };

    const handleAdd = () => {
        setEditing(null);
        setShowForm(true);
    };

    const handleSaved = () => {
        setShowForm(false);
        fetchArticles();
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Articles</h1>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                    <Plus className="h-5 w-5" /> Add Article
                </button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <ArticleTable
                    articles={articles}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            {showForm && (
                <ArticleForm
                    editing={editing}
                    onClose={() => setShowForm(false)}
                    onSaved={handleSaved}
                />
            )}
        </div>
    );
}
