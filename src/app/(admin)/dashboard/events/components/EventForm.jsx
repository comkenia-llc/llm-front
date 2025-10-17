"use client";

import { useEffect, useState } from "react";
import axiosClient from "@/lib/axios";
import { X } from "lucide-react";

export default function EventForm({ event, onClose, onSuccess }) {
    const [locations, setLocations] = useState([]);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState(
        event || {
            title: "",
            description: "",
            date: "",
            time: "",
            locationId: "",
            mode: "online",
            status: "published",
            isFeatured: false,
            registrationLink: "",
        }
    );

    // ✅ Fetch locations properly (use items array)
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const res = await axiosClient.get("/api/locations?type=city");
                const data = res.data;
                const cities = Array.isArray(data.items) ? data.items : [];
                setLocations(cities);
            } catch (err) {
                console.error("❌ Error fetching locations:", err);
                setLocations([]);
            }
        };
        fetchLocations();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (event) {
                await axiosClient.put(`/api/events/${event.id}`, form);
            } else {
                await axiosClient.post("/api/events", form);
            }
            onSuccess?.();
            onClose?.();
        } catch (err) {
            console.error("❌ Save event error:", err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 relative">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition"
                >
                    <X size={20} />
                </button>

                <h2 className="text-2xl font-bold text-blue-900 mb-6">
                    {event ? "Edit Event" : "Create New Event"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="e.g. Global Law Summit 2025"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Write a brief about the event..."
                        />
                    </div>

                    {/* Date & Time */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Date
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Time
                            </label>
                            <input
                                type="time"
                                name="time"
                                value={form.time}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Location & Mode */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Location
                            </label>
                            <select
                                name="locationId"
                                value={form.locationId}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                <option value="">Select Location</option>
                                {locations.map((loc) => (
                                    <option key={loc.id} value={loc.id}>
                                        {loc.city || loc.state || loc.country || "Unnamed"}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Mode
                            </label>
                            <select
                                name="mode"
                                value={form.mode}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                <option value="online">Online</option>
                                <option value="on-campus">On Campus</option>
                                <option value="hybrid">Hybrid</option>
                            </select>
                        </div>
                    </div>

                    {/* Registration + Featured */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Registration Link
                            </label>
                            <input
                                type="url"
                                name="registrationLink"
                                value={form.registrationLink}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="https://example.com/register"
                            />
                        </div>

                        <div className="flex items-center gap-2 mt-6">
                            <input
                                type="checkbox"
                                name="isFeatured"
                                checked={form.isFeatured}
                                onChange={handleChange}
                                className="w-4 h-4 accent-blue-600"
                            />
                            <label className="text-sm font-medium text-gray-700">
                                Mark as Featured
                            </label>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow transition disabled:opacity-60"
                        >
                            {saving ? "Saving..." : "Save Event"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
