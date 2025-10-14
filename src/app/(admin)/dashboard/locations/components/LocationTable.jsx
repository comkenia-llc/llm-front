"use client";
import { Trash, Pencil } from "lucide-react";

export default function LocationTable({ locations, onEdit, onDelete }) {
    if (!locations || locations.length === 0) {
        return <p className="text-center text-gray-600 py-6">No locations found.</p>;
    }

    return (
        <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
            <table className="min-w-full border-collapse">
                <thead className="bg-gray-100 text-sm text-gray-700 uppercase">
                    <tr>
                        <th className="border p-3 text-left w-10">#</th>
                        <th className="border p-3 text-left">Country</th>
                        <th className="border p-3 text-left">City</th>
                        <th className="border p-3 text-left">Continent</th>
                        <th className="border p-3 text-left">Currency</th>
                        <th className="border p-3 text-center">Flag</th>
                        <th className="border p-3 text-center w-32">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {locations.map((loc, index) => (
                        <tr
                            key={loc.id}
                            className="hover:bg-gray-50 border-t text-sm text-gray-800"
                        >
                            <td className="border p-3">{index + 1}</td>
                            <td className="border p-3">{loc.country}</td>
                            <td className="border p-3">{loc.city}</td>
                            <td className="border p-3">{loc.continent || "-"}</td>
                            <td className="border p-3">{loc.currency || "-"}</td>

                            <td className="border p-3 text-center">
                                {loc.flag ? (
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${loc.flag.replace(/^.*[\\/]/, "")}`}
                                        alt="flag"
                                        className="w-8 h-5 mx-auto object-cover rounded border"
                                    />

                                ) : (
                                    <span className="text-gray-400 italic">No flag</span>
                                )}
                            </td>

                            <td className="border p-3 text-center">
                                <div className="flex justify-center gap-3">
                                    <button
                                        onClick={() => onEdit(loc)}
                                        className="text-blue-600 hover:text-blue-800"
                                        title="Edit"
                                    >
                                        <Pencil size={18} />
                                    </button>
                                    <button
                                        onClick={() => onDelete(loc.id)}
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
