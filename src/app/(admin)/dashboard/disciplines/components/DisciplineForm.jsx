"use client";
import { useState } from "react";
import axiosClient from "@/lib/axios";

export default function DisciplineForm({ editing, onClose, onSaved }) {
    const [form, setForm] = useState(
        editing || {
            name: "",
            description: "",
            status: "active",
            isFeatured: false,
            icon: null,
        }
    );

    const [preview, setPreview] = useState(editing?.icon || null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (files) {
            setForm({ ...form, [name]: files[0] });
            setPreview(URL.createObjectURL(files[0]));
        } else if (type === "checkbox") {
            setForm({ ...form, [name]: checked });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const fd = new FormData();
            for (const key in form) {
                fd.append(key, form[key]);
            }

            if (editing) {
                await axiosClient.put(`/api/disciplines/${editing.id}`, fd, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                await axiosClient.post(`/api/disciplines`, fd, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }

            onSaved();
        } catch (err) {
            console.error("Save discipline error:", err);
            alert("Error saving discipline");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
                <h2 className="text-lg font-semibold mb-4">
                    {editing ? "Edit Discipline" : "Add New Discipline"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        type="text"
                        name="name"
                        placeholder="Discipline name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={form.description || ""}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="isFeatured"
                            checked={form.isFeatured}
                            onChange={handleChange}
                        />
                        <label className="text-sm text-gray-700">Featured Discipline</label>
                    </div>

                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    >
                        <option value="active">Active</option>
                        <option value="archived">Archived</option>
                    </select>

                    <div>
                        <label className="block text-sm font-medium mb-1">Icon</label>
                        <input
                            type="file"
                            name="icon"
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-20 h-20 mt-2 object-cover rounded border"
                            />
                        )}
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            {loading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
