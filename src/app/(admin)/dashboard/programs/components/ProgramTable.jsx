"use client";
import { Pencil, Trash2, Eye, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

export default function ProgramTable({ programs, onEdit, onDelete, onView }) {
    const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow border">
            <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-gray-100 text-gray-600 text-left">
                    <tr>
                        <th className="p-3 font-medium">Program</th>
                        <th className="p-3 font-medium">University</th>
                        <th className="p-3 font-medium">Discipline</th>
                        <th className="p-3 font-medium">Level</th>
                        <th className="p-3 font-medium">Mode</th>
                        <th className="p-3 font-medium text-center">Status</th>
                        <th className="p-3 font-medium text-center">Image</th>
                        <th className="p-3 font-medium text-right">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {programs.length > 0 ? (
                        programs.map((program) => (
                            <tr
                                key={program.id}
                                className="border-b hover:bg-gray-50 transition"
                            >
                                {/* Program title */}
                                <td className="p-3">
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-gray-900">
                                            {program.title}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {program.language || "English"}
                                        </span>
                                    </div>
                                </td>

                                {/* University */}
                                <td className="p-3">
                                    {program.university?.name || "—"}
                                </td>

                                {/* Discipline */}
                                <td className="p-3">
                                    {program.discipline?.name || "—"}
                                </td>

                                {/* Level */}
                                <td className="p-3 capitalize">
                                    {program.level}
                                </td>

                                {/* Mode */}
                                <td className="p-3 capitalize">
                                    {program.studyMode}
                                </td>

                                {/* Status */}
                                <td className="p-3 text-center">
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-semibold ${program.status === "active"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-gray-100 text-gray-600"
                                            }`}
                                    >
                                        {program.status}
                                    </span>
                                </td>

                                {/* Featured image */}
                                <td className="p-3 text-center">
                                    {program.featuredImage ? (
                                        <div className="flex justify-center">
                                            <Image
                                                src={`${base}${program.featuredImage}`}
                                                alt={program.title}
                                                width={40}
                                                height={30}
                                                className="rounded object-cover border"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex justify-center">
                                            <ImageIcon
                                                className="text-gray-400"
                                                size={18}
                                            />
                                        </div>
                                    )}
                                </td>

                                {/* Actions */}
                                <td className="p-3 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            title="View details"
                                            onClick={() => onView(program)}
                                            className="text-gray-500 hover:text-blue-600"
                                        >
                                            <Eye size={18} />
                                        </button>

                                        <button
                                            title="Edit"
                                            onClick={() => onEdit(program)}
                                            className="text-gray-500 hover:text-blue-700"
                                        >
                                            <Pencil size={18} />
                                        </button>

                                        <button
                                            title="Delete"
                                            onClick={() => onDelete(program.id)}
                                            className="text-gray-500 hover:text-red-600"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan="8"
                                className="text-center py-10 text-gray-500"
                            >
                                No programs found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
