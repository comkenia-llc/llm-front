"use client";

import { useState, useEffect } from "react";
import axiosClient from "@/lib/axios";

export default function FaqForm({ editing, onClose, onSaved }) {
    const [form, setForm] = useState(
        editing || {
            relatedType: "location",
            relatedId: "",
            question: "",
            answer: "",
            isFeatured: false,
            status: "published",
        }
    );

    const [loading, setLoading] = useState(false);

    // location hierarchy
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    // other entity lists
    const [universities, setUniversities] = useState([]);
    const [programs, setPrograms] = useState([]);

    // ✅ Fetch countries initially
    useEffect(() => {
        if (form.relatedType === "location") {
            axiosClient.get("/api/locations?type=country&limit=200").then((res) => {
                setCountries(res.data.items || []);
            });
        }
    }, [form.relatedType]);

    // ✅ Fetch states when a country is selected
    const handleCountrySelect = async (countryId) => {
        setStates([]);
        setCities([]);
        setForm({ ...form, relatedId: countryId });
        const res = await axiosClient.get(`/api/locations?type=state&parentId=${countryId}`);
        setStates(res.data.items || []);
    };

    // ✅ Fetch cities when a state is selected
    const handleStateSelect = async (stateId) => {
        setCities([]);
        setForm({ ...form, relatedId: stateId });
        const res = await axiosClient.get(`/api/locations?type=city&parentId=${stateId}`);
        setCities(res.data.items || []);
    };

    // ✅ When city selected
    const handleCitySelect = (cityId) => {
        setForm({ ...form, relatedId: cityId });
    };

    // ✅ Fetch universities/programs depending on relatedType
    useEffect(() => {
        if (form.relatedType === "university") {
            axiosClient.get("/api/universities?limit=200").then((res) => {
                setUniversities(res.data.items || res.data);
            });
        } else if (form.relatedType === "program") {
            axiosClient.get("/api/programs?limit=200").then((res) => {
                setPrograms(res.data.items || res.data);
            });
        }
    }, [form.relatedType]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editing) await axiosClient.put(`/api/faqs/${editing.id}`, form);
            else await axiosClient.post("/api/faqs", form);
            onSaved();
            onClose();
        } catch (err) {
            console.error("❌ Error saving FAQ:", err);
            alert("Error saving FAQ");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
                <h2 className="text-xl font-semibold mb-4">
                    {editing ? "Edit FAQ" : "Add New FAQ"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Related Type */}
                    <select
                        name="relatedType"
                        value={form.relatedType}
                        onChange={(e) => {
                            setForm({ ...form, relatedType: e.target.value, relatedId: "" });
                            setCountries([]);
                            setStates([]);
                            setCities([]);
                        }}
                        className="w-full border p-2 rounded"
                        required
                    >
                        <option value="location">Location</option>
                        <option value="university">University</option>
                        <option value="program">Program</option>
                    </select>

                    {/* Related Selection */}
                    {form.relatedType === "location" && (
                        <div className="grid grid-cols-3 gap-3">
                            <select
                                className="border p-2 rounded"
                                onChange={(e) => handleCountrySelect(e.target.value)}
                            >
                                <option value="">Select Country</option>
                                {countries.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.country}
                                    </option>
                                ))}
                            </select>

                            <select
                                className="border p-2 rounded"
                                onChange={(e) => handleStateSelect(e.target.value)}
                                disabled={!states.length}
                            >
                                <option value="">Select State</option>
                                {states.map((s) => (
                                    <option key={s.id} value={s.id}>
                                        {s.state}
                                    </option>
                                ))}
                            </select>

                            <select
                                className="border p-2 rounded"
                                onChange={(e) => handleCitySelect(e.target.value)}
                                disabled={!cities.length}
                            >
                                <option value="">Select City</option>
                                {cities.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.city}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {form.relatedType === "university" && (
                        <select
                            name="relatedId"
                            value={form.relatedId}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        >
                            <option value="">Select University</option>
                            {universities.map((u) => (
                                <option key={u.id} value={u.id}>
                                    {u.name}
                                </option>
                            ))}
                        </select>
                    )}

                    {form.relatedType === "program" && (
                        <select
                            name="relatedId"
                            value={form.relatedId}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        >
                            <option value="">Select Program</option>
                            {programs.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.title || p.name}
                                </option>
                            ))}
                        </select>
                    )}

                    {/* Question */}
                    <input
                        type="text"
                        name="question"
                        placeholder="FAQ Question"
                        value={form.question}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />

                    {/* Answer */}
                    <textarea
                        name="answer"
                        placeholder="Answer"
                        value={form.answer}
                        onChange={handleChange}
                        className="w-full border p-2 rounded min-h-[100px]"
                        required
                    />

                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="isFeatured"
                                checked={form.isFeatured}
                                onChange={handleChange}
                            />
                            <span>Mark as Featured</span>
                        </label>

                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        >
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                            <option value="archived">Archived</option>
                        </select>
                    </div>

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
