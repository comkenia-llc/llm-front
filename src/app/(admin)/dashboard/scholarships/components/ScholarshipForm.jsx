"use client";
import { useEffect, useState } from "react";
import axiosClient from "@/lib/axios";
import { Loader2, Save, XCircle } from "lucide-react";

export default function ScholarshipForm({ editing = false, initialData = {}, onClose, onSaved }) {
    const [form, setForm] = useState({
        title: "",
        universityId: "",
        programId: "",
        amount: "",
        currency: "USD",
        coverage: "partial",
        deadline: "",
        eligibility: "",
        requirements: "",
        duration: "",
        applyUrl: "",
        description: "",
        isFeatured: false,
        status: "active",
        seoTitle: "",
        seoDescription: "",
        seoKeywords: "",
        canonicalUrl: "",
        metaImage: null,
    });

    const [universities, setUniversities] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [previewMeta, setPreviewMeta] = useState(null);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // ✅ Load universities and programs
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [uniRes, progRes] = await Promise.all([
                    axiosClient.get("/api/universities"),
                    axiosClient.get("/api/programs"),
                ]);
                setUniversities(uniRes.data.items || uniRes.data || []);
                setPrograms(progRes.data.items || progRes.data || []);
            } catch (err) {
                console.error("Fetch options error:", err);
            }
        };
        fetchOptions();
    }, []);

    // ✅ Pre-fill form in edit mode
    useEffect(() => {
        if (editing && initialData) {
            setForm((prev) => ({
                ...prev,
                ...initialData,
                deadline: initialData.deadline ? initialData.deadline.slice(0, 10) : "",
                seoTitle: initialData.seoTitle || "",
                seoDescription: initialData.seoDescription || "",
                seoKeywords: initialData.seoKeywords || "",
                canonicalUrl: initialData.canonicalUrl || "",
                metaImage: initialData.metaImage || null,
            }));

            if (initialData.metaImage) {
                setPreviewMeta(`${process.env.NEXT_PUBLIC_API_URL}${initialData.metaImage}`);
            }
        }
    }, [editing, initialData]);

    // ✅ Handle input & file change
    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (files) {
            const file = files[0];
            setForm((prev) => ({ ...prev, [name]: file }));

            const reader = new FileReader();
            reader.onload = (ev) => setPreviewMeta(ev.target.result);
            reader.readAsDataURL(file);
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: type === "checkbox" ? checked : value,
            }));
        }
    };

    // ✅ Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const fd = new FormData();
            for (const key in form) {
                if (form[key] !== null && form[key] !== undefined)
                    fd.append(key, form[key]);
            }

            if (editing) {
                await axiosClient.put(`/api/scholarships/${initialData.id}`, fd, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                await axiosClient.post("/api/scholarships", fd, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }

            onSaved?.();
        } catch (err) {
            console.error("Submit scholarship error:", err);
            alert("Failed to save scholarship");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl relative">
                {/* Header */}
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <h2 className="text-xl font-semibold">
                        {editing ? "Edit Scholarship" : "Add Scholarship"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-red-600 transition"
                    >
                        <XCircle className="h-6 w-6" />
                    </button>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[80vh] overflow-y-auto"
                >
                    {/* Title */}
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2"
                            required
                        />
                    </div>

                    {/* University */}
                    <div>
                        <label className="block text-sm font-medium mb-1">University</label>
                        <select
                            name="universityId"
                            value={form.universityId}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2"
                            required
                        >
                            <option value="">Select University</option>
                            {universities.map((u) => (
                                <option key={u.id} value={u.id}>
                                    {u.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Program */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Program</label>
                        <select
                            name="programId"
                            value={form.programId}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2"
                        >
                            <option value="">Select Program</option>
                            {programs.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Amount & Currency */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Amount</label>
                        <input
                            type="text"
                            name="amount"
                            value={form.amount}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Currency</label>
                        <input
                            type="text"
                            name="currency"
                            value={form.currency}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2"
                        />
                    </div>

                    {/* Coverage & Deadline */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Coverage</label>
                        <select
                            name="coverage"
                            value={form.coverage}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2"
                        >
                            <option value="full">Full</option>
                            <option value="partial">Partial</option>
                            <option value="tuition">Tuition</option>
                            <option value="living">Living</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Deadline</label>
                        <input
                            type="date"
                            name="deadline"
                            value={form.deadline}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2"
                        />
                    </div>

                    {/* Duration & Apply URL */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Duration</label>
                        <input
                            type="text"
                            name="duration"
                            value={form.duration}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Apply URL</label>
                        <input
                            type="url"
                            name="applyUrl"
                            value={form.applyUrl}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2"
                            placeholder="https://example.com/apply"
                        />
                    </div>

                    {/* Eligibility */}
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium mb-1">Eligibility</label>
                        <textarea
                            name="eligibility"
                            value={form.eligibility}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2 h-20"
                        />
                    </div>

                    {/* Requirements */}
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium mb-1">Requirements</label>
                        <textarea
                            name="requirements"
                            value={form.requirements}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2 h-20"
                        />
                    </div>

                    {/* Description */}
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2 h-24"
                        />
                    </div>

                    {/* SEO Fields */}
                    <div className="sm:col-span-2 border-t pt-4 mt-4">
                        <h3 className="font-semibold text-gray-700 mb-3">🔍 SEO Optimization</h3>

                        <input
                            type="text"
                            name="seoTitle"
                            placeholder="SEO Title"
                            value={form.seoTitle}
                            onChange={handleChange}
                            className="w-full border p-2 rounded mb-3"
                        />

                        <textarea
                            name="seoDescription"
                            placeholder="SEO Description"
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
                            placeholder="Canonical URL"
                            value={form.canonicalUrl}
                            onChange={handleChange}
                            className="w-full border p-2 rounded mb-3"
                        />

                        <div>
                            <label className="block text-sm font-medium mb-1">Meta Image</label>
                            {previewMeta && (
                                <img
                                    src={previewMeta}
                                    alt="Meta preview"
                                    className="w-32 h-20 object-cover rounded border mb-2"
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

                    {/* Featured + Status */}
                    <div className="flex items-center gap-4 sm:col-span-2 mt-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="isFeatured"
                                checked={form.isFeatured}
                                onChange={handleChange}
                            />
                            Featured
                        </label>
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="border rounded-md px-3 py-2"
                        >
                            <option value="active">Active</option>
                            <option value="upcoming">Upcoming</option>
                            <option value="expired">Expired</option>
                        </select>
                    </div>

                    {/* Submit */}
                    <div className="sm:col-span-2 flex justify-end mt-6">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                        >
                            {submitting ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Save className="h-4 w-4" />
                            )}
                            {editing ? "Update" : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
