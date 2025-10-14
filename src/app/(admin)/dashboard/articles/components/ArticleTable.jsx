"use client";
import { Trash, Pencil } from "lucide-react";

export default function ArticleTable({ articles, onEdit, onDelete }) {
    const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

    if (!articles || articles.length === 0) {
        return <p className="text-center text-gray-600 py-6">No articles found.</p>;
    }

    return (
        <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
            <table className="min-w-full border-collapse">
                <thead className="bg-gray-100 text-sm text-gray-700 uppercase">
                    <tr>
                        <th className="border p-3 text-left w-10">#</th>
                        <th className="border p-3 text-left">Thumbnail</th>
                        <th className="border p-3 text-left">Title</th>
                        <th className="border p-3 text-left">Author</th>
                        <th className="border p-3 text-left">Status</th>
                        <th className="border p-3 text-left">Featured</th>
                        <th className="border p-3 text-center w-32">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {articles.map((article, index) => (
                        <tr
                            key={article.id}
                            className="hover:bg-gray-50 border-t text-sm text-gray-800"
                        >
                            <td className="border p-3">{index + 1}</td>

                            <td className="border p-3">
                                <img
                                    src={`${base}${article.image || "/uploads/articles/default.jpg"}`}
                                    alt={article.title}
                                    className="w-16 h-10 object-cover rounded border"
                                />
                            </td>

                            <td className="border p-3 font-medium">{article.title}</td>
                            <td className="border p-3">{article.author?.firstName || "Admin"}</td>

                            <td className="border p-3">
                                <span
                                    className={`px-2 py-1 rounded text-xs font-semibold ${article.status === "published"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-yellow-100 text-yellow-700"
                                        }`}
                                >
                                    {article.status}
                                </span>
                            </td>

                            <td className="border p-3 text-center">
                                {article.isFeatured ? (
                                    <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded">
                                        Yes
                                    </span>
                                ) : (
                                    <span className="text-gray-400 text-xs">No</span>
                                )}
                            </td>

                            <td className="border p-3 text-center">
                                <div className="flex justify-center gap-3">
                                    <button
                                        onClick={() => onEdit(article)}
                                        className="text-blue-600 hover:text-blue-800"
                                        title="Edit"
                                    >
                                        <Pencil size={18} />
                                    </button>
                                    <button
                                        onClick={() => onDelete(article.id)}
                                        className="text-red-600 hover:text-red-800"
                                        title="Delete"
                                    >
                                        <Trash size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
