"use client";
import { Pencil, Trash } from "lucide-react";

export default function DisciplineTable({ disciplines, onEdit, onDelete }) {
    const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

    if (!disciplines.length) {
        return (
            <p className="text-center text-gray-500 py-8">
                No disciplines found. Add one above.
            </p>
        );
    }

    return (
        <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
            <table className="min-w-full border-collapse">
                <thead className="bg-gray-100 text-sm text-gray-700 uppercase">
                    <tr>
                        <th className="border p-3 text-left w-10">#</th>
                        <th className="border p-3 text-left">Icon</th>
                        <th className="border p-3 text-left">Name</th>
                        <th className="border p-3 text-left">Slug</th>
                        <th className="border p-3 text-left">Status</th>
                        <th className="border p-3 text-left">Featured</th>
                        <th className="border p-3 text-center w-32">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {disciplines.map((d, i) => (
                        <tr
                            key={d.id}
                            className="hover:bg-gray-50 border-t text-sm text-gray-800"
                        >
                            <td className="border p-3">{i + 1}</td>

                            <td className="border p-3">
                                <img
                                    src={
                                        d.icon
                                            ? `${base}${d.icon}`
                                            : "/images/discipline-placeholder.png"
                                    }
                                    alt="icon"
                                    className="w-10 h-10 object-cover rounded border"
                                />
                            </td>

                            <td className="border p-3 font-semibold">{d.name}</td>
                            <td className="border p-3 text-gray-500">{d.slug}</td>

                            <td className="border p-3">
                                <span
                                    className={`px-2 py-1 text-xs font-semibold rounded ${d.status === "active"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-gray-200 text-gray-700"
                                        }`}
                                >
                                    {d.status}
                                </span>
                            </td>

                            <td className="border p-3">
                                {d.isFeatured ? (
                                    <span className="bg-blue-100 text-blue-700 px-2 py-1 text-xs font-semibold rounded">
                                        Yes
                                    </span>
                                ) : (
                                    <span className="text-gray-400 text-xs">No</span>
                                )}
                            </td>

                            <td className="border p-3 text-center">
                                <div className="flex justify-center gap-3">
                                    <button
                                        onClick={() => onEdit(d)}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        <Pencil size={18} />
                                    </button>
                                    <button
                                        onClick={() => onDelete(d.id)}
                                        className="text-red-600 hover:text-red-800"
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
