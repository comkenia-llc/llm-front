"use client";

import { Pencil, Trash2 } from "lucide-react";
import axiosClient from "@/lib/axios";

export default function FaqTable({ faqs, onEdit, onDelete }) {
    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this FAQ?")) return;
        try {
            await axiosClient.delete(`/api/faqs/${id}`);
            onDelete();
        } catch (err) {
            console.error("❌ Error deleting FAQ:", err);
            alert("Error deleting FAQ");
        }
    };

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md border">
            <table className="w-full border-collapse text-sm text-gray-700">
                <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                    <tr>
                        <th className="px-4 py-3 text-left">Question</th>
                        <th className="px-4 py-3 text-left">Answer</th>
                        <th className="px-4 py-3 text-left">Type</th>
                        <th className="px-4 py-3 text-left">Related ID</th>
                        <th className="px-4 py-3 text-center">Status</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {faqs.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="text-center py-6 text-gray-500">
                                No FAQs found.
                            </td>
                        </tr>
                    ) : (
                        faqs.map((faq) => (
                            <tr key={faq.id} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium">{faq.question}</td>
                                <td className="px-4 py-3 text-gray-600 line-clamp-2">{faq.answer}</td>
                                <td className="px-4 py-3 capitalize">{faq.relatedType}</td>
                                <td className="px-4 py-3">{faq.relatedId}</td>
                                <td className="px-4 py-3 text-center">
                                    <span
                                        className={`px-2 py-0.5 text-xs rounded-full ${faq.status === "published"
                                                ? "bg-green-100 text-green-700"
                                                : faq.status === "draft"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-gray-200 text-gray-600"
                                            }`}
                                    >
                                        {faq.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-right space-x-2">
                                    <button
                                        onClick={() => onEdit(faq)}
                                        className="p-1 text-blue-600 hover:text-blue-800"
                                    >
                                        <Pencil size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(faq.id)}
                                        className="p-1 text-red-600 hover:text-red-800"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
