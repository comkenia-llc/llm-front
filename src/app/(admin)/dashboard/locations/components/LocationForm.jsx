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
        image: null,
        metaImage: null,
        seoTitle: "",
        seoDescription: "",
        seoKeywords: "",
        canonicalUrl: "",
        schemaType: "Place",
        faqSchema: "",
        tags: "",
        isFeatured: false,
    });

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showSEO, setShowSEO] = useState(false);

    const [previews, setPreviews] = useState({
        flag: null,
        image: null,
        metaImage: null,
    });

    // ✅ Load all countries on mount
    useEffect(() => {
        axiosClient.get("/api/locations?type=country&limit=500").then((res) => {
            setCountries(res.data.items || res.data || []);
        });
    }, []);

    // ✅ Prefill edit data
    useEffect(() => {
        if (editing) {
            const faqString =
                typeof editing.faqSchema === "object"
                    ? JSON.stringify(editing.faqSchema, null, 2)
                    : editing.faqSchema || "";

            setForm((f) => ({
                ...f,
                ...editing,
                faqSchema: faqString,
                tags: Array.isArray(editing.tags)
                    ? editing.tags.join(", ")
                    : editing.tags || "",
                flag: null,
                image: null,
                metaImage: null,
            }));

            setPreviews({
                flag: editing.flag ? `${process.env.NEXT_PUBLIC_API_URL}${editing.flag}` : null,
                image: editing.image ? `${process.env.NEXT_PUBLIC_API_URL}${editing.image}` : null,
                metaImage: editing.metaImage
                    ? `${process.env.NEXT_PUBLIC_API_URL}${editing.metaImage}`
                    : null,
            });

            // 🧠 If editing a state/city, fetch parent chain
            if (editing.type === "state" && editing.parentId) {
                setForm((f) => ({ ...f, parentId: editing.parentId }));
            } else if (editing.type === "city" && editing.parentId) {
                // Find state's parent country
                axiosClient.get(`/api/locations/${editing.parentId}`).then(async (res) => {
                    const stateData = res.data;
                    if (stateData && stateData.parentId) {
                        const countryId = stateData.parentId;
                        // Fetch states for that country
                        const statesRes = await axiosClient.get(
                            `/api/locations?type=state&parentId=${countryId}`
                        );
                        setStates(statesRes.data.items || []);
                        // Assign both parent levels
                        setForm((f) => ({
                            ...f,
                            parentId: editing.parentId, // state
                            countryId,
                        }));
                    }
                });
            }

            if (editing.seoTitle || editing.seoDescription) setShowSEO(true);
        }
    }, [editing]);

    // ✅ When country changes → fetch states
    const handleCountrySelect = async (countryId) => {
        setStates([]);
        if (countryId) {
            const res = await axiosClient.get(`/api/locations?type=state&parentId=${countryId}`);
            setStates(res.data.items || []);
        }
        // For state type → countryId is parentId
        if (form.type === "state") {
            setForm((f) => ({ ...f, parentId: countryId }));
        } else {
            // For city → we store selected country separately
            setForm((f) => ({ ...f, countryId }));
        }
    };

    // ✅ When selecting state for city
    const handleStateSelect = (stateId) => {
        setForm((f) => ({ ...f, parentId: stateId }));
    };

    // ✅ Field updates
    const handleChange = (e) => {
        const { name, value, files, type, checked } = e.target;
        const val = files ? files[0] : type === "checkbox" ? checked : value;
        setForm({ ...form, [name]: val });

        if (files && files[0]) {
            const url = URL.createObjectURL(files[0]);
            setPreviews((prev) => ({ ...prev, [name]: url }));
        }
    };

    // ✅ Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.faqSchema.trim()) {
            try {
                JSON.parse(form.faqSchema);
            } catch {
                alert("❌ Invalid JSON in FAQ Schema.");
                return;
            }
        }

        setLoading(true);
        try {
            const fd = new FormData();
            Object.keys(form).forEach((k) => {
                if ((k === "flag" || k === "image" || k === "metaImage") && !form[k]) return;
                if (form[k] !== null && form[k] !== undefined) fd.append(k, form[k]);
            });

            if (form.tags && typeof form.tags === "string") {
                const tagsArray = form.tags.split(",").map((t) => t.trim()).filter(Boolean);
                fd.set("tags", JSON.stringify(tagsArray));
            }

            if (form.faqSchema && typeof form.faqSchema === "string") {
                try {
                    const parsed = JSON.parse(form.faqSchema);
                    fd.set("faqSchema", JSON.stringify(parsed));
                } catch {
                    console.warn("Invalid FAQ Schema JSON — skipping");
                }
            }

            if (editing) {
                await axiosClient.put(`/api/locations/${editing.id}`, fd, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                await axiosClient.post(`/api/locations`, fd, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }

            onSaved();
            onClose();
        } catch (err) {
            console.error("❌ Save error:", err);
            alert("Error saving location");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg overflow-y-auto max-h-[90vh]">
                <h2 className="text-xl font-semibold mb-4">
                    {editing
                        ? `Edit ${editing.type.charAt(0).toUpperCase() + editing.type.slice(1)}`
                        : parent
                            ? `Add child under ${parent.country || parent.city}`
                            : "Add Location"}
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

                    {/* === Hierarchy Dropdowns === */}
                    {form.type !== "country" && (
                        <div className="grid grid-cols-2 gap-2">
                            {/* Select Country */}
                            <select
                                onChange={(e) => handleCountrySelect(e.target.value)}
                                value={form.countryId || ""}
                                className="border p-2 rounded"
                            >
                                <option value="">Select Country</option>
                                {countries.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.country}
                                    </option>
                                ))}
                            </select>

                            {/* Select State (for city / neighborhood) */}
                            {(form.type === "city" || form.type === "neighborhood") && (
                                <select
                                    onChange={(e) => handleStateSelect(e.target.value)}
                                    value={form.parentId || ""}
                                    className="border p-2 rounded"
                                    disabled={!states.length}
                                >
                                    <option value="">Select State</option>
                                    {states.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.state}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
                    )}

                    {/* === Name Inputs === */}
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
                                placeholder="Country Code (e.g. US, PK)"
                                value={form.countryCode}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            />
                        </>
                    )}
                    {form.type === "state" && (
                        <input
                            name="state"
                            placeholder="State / Province Name"
                            value={form.state}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        />
                    )}
                    {form.type === "city" && (
                        <input
                            name="city"
                            placeholder="City Name"
                            value={form.city}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        />
                    )}

                    {/* ✅ Featured toggle */}
                    <div className="flex items-center gap-2 mt-3">
                        <input
                            type="checkbox"
                            id="isFeatured"
                            name="isFeatured"
                            checked={form.isFeatured}
                            onChange={handleChange}
                            className="h-4 w-4"
                        />
                        <label htmlFor="isFeatured" className="text-sm text-gray-700">
                            Mark as Featured
                        </label>
                    </div>

                    {/* 🏳 Flag Image */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Flag</label>
                        <input
                            type="file"
                            name="flag"
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                        {previews.flag && (
                            <img
                                src={previews.flag}
                                alt="Flag"
                                className="mt-2 w-16 h-10 object-cover border rounded"
                            />
                        )}
                    </div>

                    {/* 🏙 Main Image */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Main Image</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                        {previews.image && (
                            <img
                                src={previews.image}
                                alt="Location preview"
                                className="mt-2 w-full h-32 object-cover border rounded"
                            />
                        )}
                    </div>

                    {/* 🌐 Meta Image */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Meta Image</label>
                        <input
                            type="file"
                            name="metaImage"
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                        {previews.metaImage && (
                            <img
                                src={previews.metaImage}
                                alt="Meta preview"
                                className="mt-2 w-full h-32 object-cover border rounded"
                            />
                        )}
                    </div>

                    {/* SEO */}
                    <div className="border-t pt-3 mt-3">
                        <button
                            type="button"
                            onClick={() => setShowSEO(!showSEO)}
                            className="text-blue-600 text-sm font-semibold"
                        >
                            {showSEO ? "Hide SEO ▲" : "Show SEO ▼"}
                        </button>
                    </div>

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
                                placeholder="SEO Keywords"
                                value={form.seoKeywords}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            />
                            <input
                                name="canonicalUrl"
                                placeholder="Canonical URL"
                                value={form.canonicalUrl}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            />
                            <textarea
                                name="faqSchema"
                                placeholder='FAQ Schema JSON [{"question":"...","answer":"..."}]'
                                value={form.faqSchema}
                                onChange={handleChange}
                                className="w-full border p-2 rounded font-mono text-sm min-h-[100px]"
                            />
                        </div>
                    )}

                    {/* Submit */}
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
