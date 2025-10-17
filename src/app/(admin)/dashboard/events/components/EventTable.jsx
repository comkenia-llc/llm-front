"use client";
import { Pencil, Trash2, CalendarDays, Clock, MapPin } from "lucide-react";
import Image from "next/image";

export default function EventTable({ events, loading, onEdit, onDelete }) {
    if (loading)
        return <div className="text-center py-10 text-gray-500">Loading events...</div>;

    if (!events.length)
        return <div className="text-center py-10 text-gray-500">No events found.</div>;

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md border">
            <table className="w-full text-sm text-gray-700">
                <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                    <tr>
                        <th className="px-4 py-3 text-left">Banner</th>
                        <th className="px-4 py-3 text-left">Title</th>
                        <th className="px-4 py-3 text-left">Date</th>
                        <th className="px-4 py-3 text-left">Mode</th>
                        <th className="px-4 py-3 text-left">Status</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event) => (
                        <tr key={event.id} className="border-t hover:bg-gray-50 transition">
                            <td className="px-4 py-3">
                                {event.banner ? (
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_API_URL}${event.banner}`}
                                        alt={event.title}
                                        width={60}
                                        height={40}
                                        className="rounded-md object-cover"
                                    />
                                ) : (
                                    <div className="w-[60px] h-[40px] bg-gray-100 rounded-md flex items-center justify-center text-xs text-gray-400">
                                        N/A
                                    </div>
                                )}
                            </td>
                            <td className="px-4 py-3 font-medium text-gray-900">{event.title}</td>
                            <td className="px-4 py-3 flex items-center gap-1">
                                <CalendarDays size={14} className="text-blue-500" />
                                {new Date(event.date).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3 capitalize">{event.mode}</td>
                            <td className="px-4 py-3">
                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-semibold ${event.status === "published"
                                            ? "bg-green-100 text-green-700"
                                            : event.status === "draft"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-gray-100 text-gray-600"
                                        }`}
                                >
                                    {event.status}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                                <button
                                    onClick={() => onEdit(event)}
                                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                                >
                                    <Pencil size={16} />
                                </button>
                                <button
                                    onClick={() => onDelete(event.id)}
                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded ml-2"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
