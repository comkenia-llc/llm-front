"use client";
import { useEffect, useState } from "react";
import axiosClient from "@/lib/axios";

export default function LocationForm({ editing, parent, onClose, onSaved }) {
    const [form, setForm] = useState({
        country: "",
        countryCode: "",
        state: "",
        city: "",
        type: "country",
        parentId: parent?.id || null,
        flag: null,
        seoTitle: "",
        seoDescription: "",
        seoKeywords: "",
        canonicalUrl: "",
        metaImage: null,
        schemaType: "Place",
        faqSchema: "",
        tags: "",
    });

    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showSEO, setShowSEO] = useState(false);

    // ✅ Prefill form when editing
    useEffect(() => {
        if (editing) {
            setForm({
                country: editing.country || "",
                countryCode: editing.countryCode || "",
                state: editing.state || "",
                city: editing.city || "",
                type: editing.type || "country",
                parentId: editing.parentId || null,
                flag: editing.flag || null,
                seoTitle: editing.seoTitle || "",
                seoDescription: editing.seoDescription || "",
                seoKeywords: editing.seoKeywords || "",
                canonicalUrl: editing.canonicalUrl || "",
                metaImage: editing.metaImage || null,
                schemaType: editing.schemaType || "Place",
                faqSchema: JSON.stringify(editing.faqSchema || "", null, 2),
                tags: Array.isArray(editing.tags) ? editing.tags.join(", ") : (editing.tags || ""),
            });

            // Auto-open SEO if it already has data
            if (editing.seoTitle || editing.seoDescription) {
                setShowSEO(true);
            }
        }
    }, [editing]);

    // 🧠 Fetch all countries
    useEffect(() => {
        axiosClient.get("/api/locations/countries").then((res) => setCountries(res.data));
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setForm({ ...form, [name]: files ? files[0] : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const fd = new FormData();
            Object.keys(form).forEach((k) => {
                if (form[k] !== null && form[k] !== undefined) fd.append(k, form[k]);
            });

            // Convert JSON-like fields properly
            if (form.faqSchema && typeof form.faqSchema === "string") {
                try {
                    const parsed = JSON.parse(form.faqSchema);
                    fd.set("faqSchema", JSON.stringify(parsed));
                } catch {
                    console.warn("Invalid JSON for faqSchema — skipping");
                }
            }

            if (form.tags && typeof form.tags === "string") {
                const tagsArray = form.tags
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean);
                fd.set("tags", JSON.stringify(tagsArray));
            }

            if (editing) {
                await axiosClient.put(`/api/locations/${editing.id}`, fd);
            } else {
                await axiosClient.post(`/api/locations`, fd);
            }

            onSaved();
        } catch (err) {
            console.error("Save error:", err);
            alert("Error saving location");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg overflow-y-auto max-h-[90vh]">
                <h2 className="text-xl font-semibold mb-4">
                    {editing ? "Edit Location" : parent ? `Add child under ${parent.country || parent.city}` : "Add Country"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-3">
                    {/* Type selector */}
                    {!editing && (
                        <select
                            name="type"
                            value={form.type}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        >
                            <option value="country">Country</option>
                            <option value="state">State</option>
                            <option value="city">City</option>
                            <option value="neighborhood">Neighborhood</option>
                        </select>
                    )}

                    {/* Parent dropdown */}
                    {form.type !== "country" && (
                        <select
                            name="parentId"
                            value={form.parentId || ""}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        >
                            <option value="">Select Country</option>
                            {countries.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.country}
                                </option>
                            ))}
                        </select>
                    )}

                    {/* Country / City / State */}
                    {form.type === "country" && (
                        <>
                            <input
                                name="country"
                                placeholder="Country Name"
                                value={form.country}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                                required
                            />
                            <input
                                name="countryCode"
                                placeholder="Country Code (e.g. PK, US)"
                                value={form.countryCode}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            />
                            <input
                                type="file"
                                name="flag"
                                accept="image/*"
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            />
                        </>
                    )}

                    {form.type !== "country" && (
                        <input
                            name={form.type}
                            placeholder={`${form.type.charAt(0).toUpperCase() + form.type.slice(1)} Name`}
                            value={form[form.type] || ""}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        />
                    )}

                    {/* 🧠 SEO Section Toggle */}
                    <div className="border-t pt-3 mt-3">
                        <button
                            type="button"
                            onClick={() => setShowSEO(!showSEO)}
                            className="text-blue-600 text-sm font-semibold"
                        >
                            {showSEO ? "Hide SEO & Rich Results ▲" : "Show SEO & Rich Results ▼"}
                        </button>
                    </div>

                    {/* SEO Fields */}
                    {showSEO && (
                        <div className="bg-gray-50 border p-3 rounded space-y-2 mt-2">
                            <input
                                name="seoTitle"
                                placeholder="SEO Title"
                                value={form.seoTitle}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            />
                            <textarea
                                name="seoDescription"
                                placeholder="SEO Description"
                                value={form.seoDescription}
                                onChange={handleChange}
                                className="w-full border p-2 rounded min-h-[80px]"
                            />
                            <input
                                name="seoKeywords"
                                placeholder="SEO Keywords (comma-separated)"
                                value={form.seoKeywords}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            />
                            <input
                                name="canonicalUrl"
                                placeholder="Canonical URL (optional)"
                                value={form.canonicalUrl}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            />
                            <input
                                type="file"
                                name="metaImage"
                                accept="image/*"
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            />

                            {/* Rich Result (JSON-LD) */}
                            <h4 className="font-medium mt-3 text-gray-700">Structured Data (JSON-LD)</h4>
                            <select
                                name="schemaType"
                                value={form.schemaType}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            >
                                <option value="Place">Place</option>
                                <option value="EducationalOrganization">EducationalOrganization</option>
                                <option value="City">City</option>
                                <option value="Country">Country</option>
                            </select>
                            <textarea
                                name="faqSchema"
                                placeholder='FAQ Schema (JSON format, e.g. [{"question": "...", "answer": "..."}])'
                                value={form.faqSchema}
                                onChange={handleChange}
                                className="w-full border p-2 rounded min-h-[100px] font-mono text-sm"
                            />
                            <input
                                name="tags"
                                placeholder="Tags (comma-separated)"
                                value={form.tags}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            />
                        </div>
                    )}

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
