"use client";
import { useEffect, useState } from "react";
import axiosClient from "@/lib/axios";

export default function ProgramForm({ editing, initialData, onClose, onSaved }) {
    const [form, setForm] = useState(initialData || {});
    const [universities, setUniversities] = useState([]);
    const [disciplines, setDisciplines] = useState([]);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const [uniRes, discRes] = await Promise.all([
                axiosClient.get("/api/universities"),
                axiosClient.get("/api/disciplines"),
            ]);
            setUniversities(uniRes.data.items || uniRes.data);
            setDisciplines(discRes.data.items || discRes.data);
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (editing) {
                await axiosClient.put(`/api/programs/${form.id}`, form);
            } else {
                await axiosClient.post("/api/programs", form);
            }
            onSaved();
        } catch (err) {
            console.error("Save program error:", err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6">
                <h2 className="text-lg font-bold mb-4">
                    {editing ? "Edit Program" : "Create New Program"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                            name="title"
                            value={form.title || ""}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">University</label>
                            <select
                                name="universityId"
                                value={form.universityId || ""}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2 bg-white"
                            >
                                <option value="">Select university</option>
                                {universities.map((u) => (
                                    <option key={u.id} value={u.id}>
                                        {u.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Discipline</label>
                            <select
                                name="disciplineId"
                                value={form.disciplineId || ""}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2 bg-white"
                            >
                                <option value="">Select discipline</option>
                                {disciplines.map((d) => (
                                    <option key={d.id} value={d.id}>
                                        {d.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Level</label>
                            <select
                                name="level"
                                value={form.level || ""}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2 bg-white"
                            >
                                <option value="">Select level</option>
                                <option value="bachelor">Bachelor</option>
                                <option value="master">Master</option>
                                <option value="phd">PhD</option>
                                <option value="diploma">Diploma</option>
                                <option value="certificate">Certificate</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Status</label>
                            <select
                                name="status"
                                value={form.status || "active"}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2 bg-white"
                            >
                                <option value="active">Active</option>
                                <option value="archived">Archived</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            name="description"
                            value={form.description || ""}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            rows={3}
                        />
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            {saving ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
