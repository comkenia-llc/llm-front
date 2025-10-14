"use client";
import Image from "next/image";
import { Pencil, Trash2, Star } from "lucide-react";

export default function ScholarshipTable({ scholarships, onEdit, onDelete }) {
    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md border">
            <table className="w-full border-collapse text-sm text-gray-700">
                <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                    <tr>
                        <th className="px-4 py-3 text-left">University</th>
                        <th className="px-4 py-3 text-left">Title</th>
                        <th className="px-4 py-3 text-left">Coverage</th>
                        <th className="px-4 py-3 text-left">Deadline</th>
                        <th className="px-4 py-3 text-left">Status</th>
                        <th className="px-4 py-3 text-left">Featured</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {scholarships.length === 0 && (
                        <tr>
                            <td
                                colSpan="7"
                                className="text-center py-6 text-gray-500 italic"
                            >
                                No scholarships found.
                            </td>
                        </tr>
                    )}

                    {scholarships.map((sch) => (
                        <tr
                            key={sch.id}
                            className="border-b hover:bg-gray-50 transition"
                        >
                            {/* University */}
                            <td className="px-4 py-3 flex items-center gap-2">
                                {sch.university?.logo && (
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_API_URL}${sch.university.logo}`}
                                        alt={sch.university.name}
                                        width={36}
                                        height={36}
                                        className="rounded object-cover border"
                                    />
                                )}
                                <span className="font-medium">{sch.university?.name}</span>
                            </td>

                            {/* Title */}
                            <td className="px-4 py-3">{sch.title}</td>

                            {/* Coverage */}
                            <td className="px-4 py-3 capitalize">{sch.coverage}</td>

                            {/* Deadline */}
                            <td className="px-4 py-3">
                                {sch.deadline
                                    ? new Date(sch.deadline).toLocaleDateString()
                                    : "—"}
                            </td>

                            {/* Status */}
                            <td className="px-4 py-3 capitalize">
                                <span
                                    className={`px-2 py-1 rounded text-xs font-semibold ${sch.status === "active"
                                            ? "bg-green-100 text-green-700"
                                            : sch.status === "upcoming"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {sch.status}
                                </span>
                            </td>

                            {/* Featured */}
                            <td className="px-4 py-3 text-center">
                                <Star
                                    className={`inline-block w-4 h-4 ${sch.isFeatured
                                            ? "text-yellow-500 fill-yellow-500"
                                            : "text-gray-300"
                                        }`}
                                />
                            </td>

                            {/* Actions */}
                            <td className="px-4 py-3 text-right flex justify-end gap-3">
                                <button
                                    onClick={() => onEdit(sch)}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    <Pencil className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => onDelete(sch.id)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
