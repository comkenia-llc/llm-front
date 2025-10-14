"use client";
import { useEffect, useState } from "react";
import axiosClient from "@/lib/axios";

export default function UniversityForm({ editing, onClose, onSaved }) {
    const [form, setForm] = useState(
        editing
            ? {
                ...editing,
                name: editing.name || "",
                website: editing.website || "",
                description: editing.description || "",
                type: editing.type || "public",
                status: editing.status || "pending",
                locationId: editing.locationId || "",
                logo: editing.logo || null,
                banner: editing.banner || null,
                seoTitle: editing.seoTitle || "",
                seoDescription: editing.seoDescription || "",
                seoKeywords: editing.seoKeywords || "",
                canonicalUrl: editing.canonicalUrl || "",
                metaImage: editing.metaImage || null,
            }
            : {
                name: "",
                website: "",
                type: "public",
                status: "pending",
                locationId: "",
                logo: null,
                banner: null,
                description: "",
                seoTitle: "",
                seoDescription: "",
                seoKeywords: "",
                canonicalUrl: "",
                metaImage: null,
            }
    );

    const [locations, setLocations] = useState([]);
    const [previewLogo, setPreviewLogo] = useState(
        editing?.logo ? `${process.env.NEXT_PUBLIC_API_URL}${editing.logo}` : null
    );
    const [previewBanner, setPreviewBanner] = useState(
        editing?.banner ? `${process.env.NEXT_PUBLIC_API_URL}${editing.banner}` : null
    );
    const [previewMeta, setPreviewMeta] = useState(
        editing?.metaImage ? `${process.env.NEXT_PUBLIC_API_URL}${editing.metaImage}` : null
    );
    const [loading, setLoading] = useState(false);

    // ✅ Load locations
    useEffect(() => {
        axiosClient.get("/api/locations").then((res) => {
            setLocations(res.data.items || []);
        });
    }, []);

    // ✅ Handle change
    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files) {
            const file = files[0];
            setForm({ ...form, [name]: file });

            const reader = new FileReader();
            reader.onload = (ev) => {
                if (name === "logo") setPreviewLogo(ev.target.result);
                if (name === "banner") setPreviewBanner(ev.target.result);
                if (name === "metaImage") setPreviewMeta(ev.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    // ✅ Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const fd = new FormData();
            for (const key in form) {
                if (form[key] !== null && form[key] !== undefined)
                    fd.append(key, form[key]);
            }

            if (editing) {
                await axiosClient.put(`/api/universities/${editing.id}`, fd, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                await axiosClient.post(`/api/universities`, fd, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }

            onSaved();
        } catch (err) {
            console.error("❌ Save university error:", err);
            alert("Error saving university");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl overflow-y-auto max-h-[90vh]">
                <h2 className="text-xl font-semibold mb-4">
                    {editing ? "Edit University" : "Add New University"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* 🏫 Basic Info */}
                    <input
                        type="text"
                        name="name"
                        placeholder="University Name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />

                    {/* 🌍 Location */}
                    <select
                        name="locationId"
                        value={form.locationId}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    >
                        <option value="">Select Location</option>
                        {locations.map((loc) => (
                            <option key={loc.id} value={loc.id}>
                                {loc.city}, {loc.country}
                            </option>
                        ))}
                    </select>

                    {/* 🏷 Type + Status */}
                    <div className="flex gap-3">
                        <select
                            name="type"
                            value={form.type}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        >
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                            <option value="semi-government">Semi-Government</option>
                        </select>

                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>

                    {/* 🌐 Website */}
                    <input
                        type="text"
                        name="website"
                        placeholder="Website URL"
                        value={form.website || ""}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />

                    {/* 📝 Description */}
                    <textarea
                        name="description"
                        placeholder="Short description"
                        value={form.description || ""}
                        onChange={handleChange}
                        className="w-full border p-2 rounded min-h-[100px]"
                    />

                    {/* 🖼 Logo + Banner + Meta Image */}
                    <div className="grid grid-cols-3 gap-4 mt-4">
                        {/* Logo */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Logo</label>
                            {previewLogo && (
                                <img
                                    src={previewLogo}
                                    alt="Logo preview"
                                    className="w-24 h-24 object-cover rounded border mb-2"
                                />
                            )}
                            <input
                                type="file"
                                name="logo"
                                accept="image/*"
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            />
                        </div>

                        {/* Banner */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Banner</label>
                            {previewBanner && (
                                <img
                                    src={previewBanner}
                                    alt="Banner preview"
                                    className="w-full h-24 object-cover rounded border mb-2"
                                />
                            )}
                            <input
                                type="file"
                                name="banner"
                                accept="image/*"
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            />
                        </div>

                        {/* Meta Image */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Meta Image (SEO)</label>
                            {previewMeta && (
                                <img
                                    src={previewMeta}
                                    alt="Meta image preview"
                                    className="w-full h-24 object-cover rounded border mb-2"
                                />
                            )}
                            <input
                                type="file"
                                name="metaImage"
                                accept="image/*"
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            />
                        </div>
                    </div>

                    {/* 🔍 SEO Fields */}
                    <div className="mt-6 border-t pt-4">
                        <h3 className="font-semibold text-gray-700 mb-3">
                            🔍 SEO Optimization
                        </h3>

                        <input
                            type="text"
                            name="seoTitle"
                            placeholder="SEO Title (e.g., 'Top LLM Universities in UK 2025')"
                            value={form.seoTitle}
                            onChange={handleChange}
                            className="w-full border p-2 rounded mb-3"
                        />

                        <textarea
                            name="seoDescription"
                            placeholder="SEO Description (shown in Google results)"
                            value={form.seoDescription}
                            onChange={handleChange}
                            className="w-full border p-2 rounded mb-3 min-h-[80px]"
                        />

                        <input
                            type="text"
                            name="seoKeywords"
                            placeholder="SEO Keywords (comma-separated)"
                            value={form.seoKeywords}
                            onChange={handleChange}
                            className="w-full border p-2 rounded mb-3"
                        />

                        <input
                            type="text"
                            name="canonicalUrl"
                            placeholder="Canonical URL (auto or custom)"
                            value={form.canonicalUrl}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    {/* 🔘 Buttons */}
                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
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
