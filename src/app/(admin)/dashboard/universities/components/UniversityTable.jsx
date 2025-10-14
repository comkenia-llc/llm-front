"use client";
import { Pencil, Trash } from "lucide-react";

export default function UniversityTable({ universities, onEdit, onDelete }) {
    if (!universities || universities.length === 0)
        return <p className="text-gray-600 text-center py-6">No universities found.</p>;

    return (
        <div className="overflow-x-auto border rounded-lg shadow-sm">
            <table className="min-w-full border-collapse text-sm">
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                        <th className="p-3 border">#</th>
                        <th className="p-3 border text-left">Logo</th>
                        <th className="p-3 border text-left">Name</th>
                        <th className="p-3 border text-left">Location</th>
                        <th className="p-3 border text-left">Type</th>
                        <th className="p-3 border text-left">Status</th>
                        <th className="p-3 border text-left">Website</th>
                        <th className="p-3 border text-center w-32">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {universities.map((u, index) => (
                        <tr key={u.id} className="hover:bg-gray-50 border-t">
                            <td className="p-3 border">{index + 1}</td>
                            <td className="p-3 border">
                                <img
                                    src={`${process.env.NEXT_PUBLIC_API_URL}${u.logo}`}
                                    alt="logo"
                                    className="w-10 h-10 object-cover rounded"
                                />
                            </td>
                            <td className="p-3 border font-medium">{u.name}</td>
                            <td className="p-3 border">
                                {u.location
                                    ? `${u.location.city}, ${u.location.country}`
                                    : "-"}
                            </td>
                            <td className="p-3 border">{u.type}</td>
                            <td className="p-3 border capitalize">{u.status}</td>
                            <td className="p-3 border text-blue-600">
                                {u.website ? (
                                    <a
                                        href={u.website}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="hover:underline"
                                    >
                                        Visit
                                    </a>
                                ) : (
                                    "-"
                                )}
                            </td>
                            <td className="p-3 border text-center">
                                <div className="flex justify-center gap-3">
                                    <button
                                        onClick={() => onEdit(u)}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        <Pencil size={18} />
                                    </button>
                                    <button
                                        onClick={() => onDelete(u.id)}
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
