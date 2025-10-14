"use client";

import { useState } from "react";
import axiosClient from "@/lib/axios";
import {
    X,
    Loader2,
    ChevronDown,
    ChevronUp,
    Info,
    Globe,
    FileJson,
} from "lucide-react";

export default function NewsForm({ existing, onClose, onSuccess }) {
    const [form, setForm] = useState({
        title: existing?.title || "",
        excerpt: existing?.excerpt || "",
        content: existing?.content || "",
        status: existing?.status || "draft",
        isFeatured: existing?.isFeatured || false,
        image: null,

        // ✅ SEO + Schema fields
        seoTitle: existing?.seoTitle || "",
        seoDescription: existing?.seoDescription || "",
        seoKeywords: existing?.seoKeywords || "",
        canonicalUrl: existing?.canonicalUrl || "",
        metaImage: null,
        schemaType: existing?.schemaType || "NewsArticle",
    });

    const [saving, setSaving] = useState(false);
    const [showSEO, setShowSEO] = useState(false);
    const [showSchemaPreview, setShowSchemaPreview] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            if (value !== null && value !== undefined) formData.append(key, value);
        });

        try {
            if (existing) {
                await axiosClient.put(`/api/news/${existing.id}`, formData);
            } else {
                await axiosClient.post("/api/news", formData);
            }
            onSuccess?.();
        } catch (err) {
            console.error("❌ Save news error:", err);
            alert("Failed to save news");
        } finally {
            setSaving(false);
        }
    };

    // ✅ Generate schema preview
    const schemaPreview = {
        "@context": "https://schema.org",
        "@type": form.schemaType || "NewsArticle",
        headline: form.seoTitle || form.title,
        description: form.seoDescription || form.excerpt,
        author: { "@type": "Person", name: "Author Name" },
        publisher: {
            "@type": "Organization",
            name: "Keekan Education",
            logo: { "@type": "ImageObject", url: "https://universitiesforllm.com/logo.png" },
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id":
                form.canonicalUrl ||
                "https://universitiesforllm.com/news/sample-slug",
        },
        image: ["https://universitiesforllm.com/og-news.jpg"],
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg overflow-hidden">
                {/* ===== Header ===== */}
                <div className="flex items-center justify-between px-5 py-3 border-b">
                    <h2 className="font-bold text-lg flex items-center gap-2">
                        <Globe className="h-5 w-5 text-blue-600" />
                        {existing ? "Edit News" : "Add News"}
                    </h2>
                    <button onClick={onClose}>
                        <X className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                    </button>
                </div>

                {/* ===== Form ===== */}
                <form
                    onSubmit={handleSubmit}
                    className="p-5 space-y-4 overflow-y-auto max-h-[85vh]"
                >
                    {/* Title */}
                    <div>
                        <label className="font-medium text-sm">Title</label>
                        <input
                            type="text"
                            className="w-full border rounded-md px-3 py-2 mt-1"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            required
                        />
                    </div>

                    {/* Excerpt */}
                    <div>
                        <label className="font-medium text-sm">Excerpt</label>
                        <textarea
                            rows={2}
                            className="w-full border rounded-md px-3 py-2 mt-1"
                            value={form.excerpt}
                            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <label className="font-medium text-sm">Content</label>
                        <textarea
                            rows={6}
                            className="w-full border rounded-md px-3 py-2 mt-1"
                            value={form.content}
                            onChange={(e) => setForm({ ...form, content: e.target.value })}
                        />
                    </div>

                    {/* Featured + Status */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                checked={form.isFeatured}
                                onChange={(e) =>
                                    setForm({ ...form, isFeatured: e.target.checked })
                                }
                            />
                            Featured
                        </label>

                        <select
                            value={form.status}
                            onChange={(e) => setForm({ ...form, status: e.target.value })}
                            className="border rounded-md px-3 py-1.5 text-sm"
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                    </div>

                    {/* Main Image */}
                    <div>
                        <label className="font-medium text-sm">Main Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full mt-1 text-sm"
                            onChange={(e) =>
                                setForm({ ...form, image: e.target.files[0] })
                            }
                        />
                    </div>

                    {/* ===== SEO + Schema Section ===== */}
                    <div className="border rounded-lg mt-4">
                        <button
                            type="button"
                            onClick={() => setShowSEO(!showSEO)}
                            className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold bg-gray-50 hover:bg-gray-100 transition"
                        >
                            <span>SEO & Schema Settings</span>
                            {showSEO ? (
                                <ChevronUp className="h-4 w-4" />
                            ) : (
                                <ChevronDown className="h-4 w-4" />
                            )}
                        </button>

                        {showSEO && (
                            <div className="p-4 space-y-3 bg-white border-t">
                                {/* SEO Title */}
                                <div>
                                    <label className="font-medium text-sm">SEO Title</label>
                                    <input
                                        type="text"
                                        className="w-full border rounded-md px-3 py-2 mt-1"
                                        value={form.seoTitle}
                                        onChange={(e) =>
                                            setForm({ ...form, seoTitle: e.target.value })
                                        }
                                    />
                                </div>

                                {/* SEO Description */}
                                <div>
                                    <label className="font-medium text-sm">
                                        SEO Description
                                    </label>
                                    <textarea
                                        rows={2}
                                        className="w-full border rounded-md px-3 py-2 mt-1"
                                        value={form.seoDescription}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                seoDescription: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                {/* SEO Keywords */}
                                <div>
                                    <label className="font-medium text-sm">SEO Keywords</label>
                                    <input
                                        type="text"
                                        className="w-full border rounded-md px-3 py-2 mt-1"
                                        placeholder="e.g. LLM, Scholarships, Law Study Abroad"
                                        value={form.seoKeywords}
                                        onChange={(e) =>
                                            setForm({ ...form, seoKeywords: e.target.value })
                                        }
                                    />
                                </div>

                                {/* Canonical URL */}
                                <div>
                                    <label className="font-medium text-sm">Canonical URL</label>
                                    <input
                                        type="url"
                                        className="w-full border rounded-md px-3 py-2 mt-1"
                                        placeholder="https://universitiesforllm.com/news/your-slug"
                                        value={form.canonicalUrl}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                canonicalUrl: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                {/* Schema Type */}
                                <div>
                                    <label className="font-medium text-sm">Schema Type</label>
                                    <select
                                        value={form.schemaType}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                schemaType: e.target.value,
                                            })
                                        }
                                        className="w-full border rounded-md px-3 py-2 mt-1"
                                    >
                                        <option value="NewsArticle">NewsArticle</option>
                                        <option value="BlogPosting">BlogPosting</option>
                                        <option value="Article">Article</option>
                                        <option value="EducationalOccupationalProgram">
                                            EducationalOccupationalProgram
                                        </option>
                                    </select>
                                </div>

                                {/* Meta Image */}
                                <div>
                                    <label className="font-medium text-sm">
                                        Meta Image (for Social)
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="w-full mt-1 text-sm"
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                metaImage: e.target.files[0],
                                            })
                                        }
                                    />
                                </div>

                                {/* Schema Preview (Optional) */}
                                <div className="pt-3 border-t mt-3">
                                    <button
                                        type="button"
                                        className="text-xs flex items-center gap-1 text-blue-600 hover:text-blue-800"
                                        onClick={() =>
                                            setShowSchemaPreview(!showSchemaPreview)
                                        }
                                    >
                                        <FileJson className="h-4 w-4" />
                                        {showSchemaPreview
                                            ? "Hide Schema Preview"
                                            : "Show Schema Preview"}
                                    </button>
                                    {showSchemaPreview && (
                                        <pre className="text-xs bg-gray-50 border rounded-md p-2 mt-2 overflow-x-auto text-gray-700 whitespace-pre-wrap">
                                            {JSON.stringify(schemaPreview, null, 2)}
                                        </pre>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ===== Save Button ===== */}
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2.5 rounded-md font-semibold mt-4 flex justify-center items-center gap-2"
                    >
                        {saving ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" /> Saving...
                            </>
                        ) : (
                            "Save News"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
