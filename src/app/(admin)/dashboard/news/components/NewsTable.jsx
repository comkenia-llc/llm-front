"use client";

import { Pencil, Trash2, CheckCircle, XCircle, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NewsTable({ newsList, onEdit, onDelete, onView }) {
    // ✅ Always ensure newsList is an array
    const safeList = Array.isArray(newsList)
        ? newsList
        : newsList?.items && Array.isArray(newsList.items)
            ? newsList.items
            : [];

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md border">
            <table className="w-full border-collapse text-sm text-gray-700">
                <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                    <tr>
                        <th className="px-4 py-3 text-left">Image</th>
                        <th className="px-4 py-3 text-left">Title</th>
                        <th className="px-4 py-3 text-left">Status</th>
                        <th className="px-4 py-3 text-left">Featured</th>
                        <th className="px-4 py-3 text-left">Author</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {safeList.length === 0 ? (
                        <tr>
                            <td
                                colSpan="6"
                                className="text-center py-6 text-gray-500 italic"
                            >
                                No news found.
                            </td>
                        </tr>
                    ) : (
                        safeList.map((item) => (
                            <tr
                                key={item.id}
                                className="border-t hover:bg-gray-50 transition"
                            >
                                {/* 🖼 Thumbnail */}
                                <td className="px-4 py-3">
                                    {item.image ? (
                                        <Image
                                            src={
                                                item.image.startsWith("/uploads")
                                                    ? process.env
                                                        .NEXT_PUBLIC_API_URL +
                                                    item.image
                                                    : item.image
                                            }
                                            alt={item.title}
                                            width={60}
                                            height={40}
                                            className="rounded-md object-cover border border-gray-200"
                                        />
                                    ) : (
                                        <div className="w-16 h-10 bg-gray-200 rounded-md" />
                                    )}
                                </td>

                                {/* 📰 Title */}
                                <td className="px-4 py-3 font-medium">
                                    <Link
                                        href={`/news/${item.slug || item.id}`}
                                        target="_blank"
                                        className="text-blue-700 hover:underline hover:text-blue-900"
                                    >
                                        {item.title}
                                    </Link>
                                </td>

                                {/* ✅ Status */}
                                <td className="px-4 py-3">
                                    {item.status === "published" ? (
                                        <span className="flex items-center gap-1 text-green-600 font-semibold">
                                            <CheckCircle className="h-4 w-4" /> Published
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1 text-gray-500">
                                            <XCircle className="h-4 w-4" /> Draft
                                        </span>
                                    )}
                                </td>

                                {/* 🌟 Featured */}
                                <td className="px-4 py-3">
                                    {item.isFeatured ? (
                                        <span className="text-blue-600 font-semibold">
                                            Yes
                                        </span>
                                    ) : (
                                        <span className="text-gray-400">No</span>
                                    )}
                                </td>

                                {/* 👤 Author */}
                                <td className="px-4 py-3">
                                    {item.author ? (
                                        <Link
                                            href={`/admin/users/${item.author.id}`}
                                            className="text-gray-800 hover:text-blue-700 font-medium"
                                        >
                                            {`${item.author.firstName || ""} ${item.author.lastName || ""
                                                }`.trim() || "Admin"}
                                        </Link>
                                    ) : (
                                        "Admin"
                                    )}
                                </td>

                                {/* ⚙️ Actions */}
                                <td className="px-4 py-3 text-right flex justify-end gap-2">
                                    <button
                                        onClick={() => onView?.(item)}
                                        className="p-1.5 rounded hover:bg-gray-100 text-green-600"
                                        title="View News"
                                    >
                                        <Eye className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => onEdit?.(item)}
                                        className="p-1.5 rounded hover:bg-gray-100 text-blue-600"
                                        title="Edit News"
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => onDelete?.(item.id)}
                                        className="p-1.5 rounded hover:bg-gray-100 text-red-600"
                                        title="Delete News"
                                    >
                                        <Trash2 className="h-4 w-4" />
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
