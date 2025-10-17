"use client";

import { useEffect, useState } from "react";
import axiosClient from "@/lib/axios";
import { Plus } from "lucide-react";
import FaqTable from "./components/FaqTable";
import FaqForm from "./components/FaqForm";

export default function FaqsPage() {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const fetchFaqs = async () => {
        try {
            const res = await axiosClient.get("/api/faqs");
            setFaqs(res.data);
        } catch (err) {
            console.error("❌ Error fetching FAQs:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFaqs();
    }, []);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">FAQ Management</h1>
                <button
                    onClick={() => {
                        setEditing(null);
                        setShowForm(true);
                    }}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    <Plus size={18} /> Add FAQ
                </button>
            </div>

            {loading ? (
                <div className="text-gray-500">Loading FAQs...</div>
            ) : (
                <FaqTable
                    faqs={faqs}
                    onEdit={(faq) => {
                        setEditing(faq);
                        setShowForm(true);
                    }}
                    onDelete={fetchFaqs}
                />
            )}

            {showForm && (
                <FaqForm
                    editing={editing}
                    onClose={() => setShowForm(false)}
                    onSaved={fetchFaqs}
                />
            )}
        </div>
    );
}
