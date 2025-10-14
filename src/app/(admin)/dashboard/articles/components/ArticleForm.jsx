"use client";
import { useState, useEffect } from "react";
import axiosClient from "@/lib/axios";

export default function ArticleForm({ editing, onClose, onSaved }) {
    const [form, setForm] = useState(
        editing || {
            title: "",
            slug: "",
            content: "",
            category: "",
            status: "draft",
            isFeatured: false,
            image: null,
            universityId: "",
            // 🔍 SEO Fields
            seoTitle: "",
            seoDescription: "",
            seoKeywords: "",
            canonicalUrl: "",
            metaImage: "",
        }
    );

    const [universities, setUniversities] = useState([]);
    const [preview, setPreview] = useState(editing?.image || null);
    const [loading, setLoading] = useState(false);

    // ✅ Fetch universities for dropdown
    useEffect(() => {
        const fetchUniversities = async () => {
            try {
                const res = await axiosClient.get("/api/universities");
                setUniversities(res.data.items || res.data);
            } catch (err) {
                console.error("Failed to load universities", err);
            }
        };
        fetchUniversities();
    }, []);

    const handleChange = (e) => {
        const { name, value, files, type, checked } = e.target;
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
                if (form[key] !== null && form[key] !== undefined)
                    fd.append(key, form[key]);
            }

            if (editing) {
                await axiosClient.put(`/api/articles/${editing.id}`, fd, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                await axiosClient.post(`/api/articles`, fd, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }

            onSaved();
        } catch (err) {
            console.error("❌ Save article error:", err);
            alert("Error saving article");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">
                    {editing ? "Edit Article" : "Add New Article"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Basic Fields */}
                    <input
                        type="text"
                        name="title"
                        placeholder="Article Title"
                        value={form.title}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />

                    <input
                        type="text"
                        name="slug"
                        placeholder="Slug (auto or custom)"
                        value={form.slug}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />

                    <textarea
                        name="content"
                        placeholder="Write article content..."
                        value={form.content || ""}
                        onChange={handleChange}
                        className="w-full border p-2 rounded min-h-[150px]"
                    />

                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={form.category || ""}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />

                    {/* 🏫 University dropdown */}
                    <select
                        name="universityId"
                        value={form.universityId ?? ""}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    >
                        <option value="">Select University</option>
                        {universities.map((u) => (
                            <option key={u.id} value={u.id}>
                                {u.name}
                            </option>
                        ))}
                    </select>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="isFeatured"
                            checked={form.isFeatured}
                            onChange={handleChange}
                        />
                        <label className="text-sm text-gray-700">Featured Article</label>
                    </div>

                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>

                    {/* Thumbnail */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Thumbnail
                        </label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-32 h-20 mt-2 object-cover rounded border"
                            />
                        )}
                    </div>

                    {/* 🔍 SEO Section */}
                    <div className="mt-6 border-t pt-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            SEO Metadata
                        </h3>

                        <input
                            type="text"
                            name="seoTitle"
                            placeholder="SEO Title"
                            value={form.seoTitle || ""}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />

                        <textarea
                            name="seoDescription"
                            placeholder="SEO Description"
                            value={form.seoDescription || ""}
                            onChange={handleChange}
                            className="w-full border p-2 rounded min-h-[80px]"
                        />

                        <input
                            type="text"
                            name="seoKeywords"
                            placeholder="SEO Keywords (comma separated)"
                            value={form.seoKeywords || ""}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />

                        <input
                            type="text"
                            name="canonicalUrl"
                            placeholder="Canonical URL"
                            value={form.canonicalUrl || ""}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />

                        <input
                            type="text"
                            name="metaImage"
                            placeholder="Meta Image URL (optional)"
                            value={form.metaImage || ""}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 mt-4">
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
