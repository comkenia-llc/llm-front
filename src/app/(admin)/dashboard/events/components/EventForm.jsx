"use client";

import { useEffect, useState } from "react";
import axiosClient from "@/lib/axios";
import { X, ImageIcon } from "lucide-react";
import Image from "next/image";

export default function EventForm({ event, onClose, onSuccess }) {
    const [locations, setLocations] = useState([]);
    const [saving, setSaving] = useState(false);
    const [preview, setPreview] = useState(
        event?.banner ? `${process.env.NEXT_PUBLIC_API_URL}${event.banner}` : ""
    );

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
            banner: null,
        }
    );

    // ✅ Fetch locations
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const res = await axiosClient.get("/api/locations?type=city");
                setLocations(res.data.items || []);
            } catch (err) {
                console.error("❌ Error fetching locations:", err);
                setLocations([]);
            }
        };
        fetchLocations();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === "file" && files.length > 0) {
            const file = files[0];
            setForm({ ...form, banner: file });
            setPreview(URL.createObjectURL(file));
        } else {
            setForm({ ...form, [name]: type === "checkbox" ? checked : value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const formData = new FormData();
            for (const key in form) {
                formData.append(key, form[key]);
            }

            if (event) {
                await axiosClient.put(`/api/events/${event.id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                await axiosClient.post("/api/events", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
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
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative flex flex-col max-h-[90vh]">
                {/* 🔺 Header (sticky inside modal) */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
                    <h2 className="text-2xl font-bold text-blue-900">
                        {event ? "Edit Event" : "Create New Event"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-red-600 transition"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* 🔹 Scrollable Body */}
                <div className="overflow-y-auto px-6 pb-6 space-y-5 custom-scrollbar">
                    <form onSubmit={handleSubmit} className="space-y-5 mt-4">
                        {/* 🖼️ Banner Upload */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Banner Image
                            </label>

                            <div className="border border-gray-300 rounded-lg p-3 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer relative">
                                {preview ? (
                                    <div className="relative w-full h-40 rounded-lg overflow-hidden">
                                        <Image
                                            src={preview}
                                            alt="Banner preview"
                                            fill
                                            className="object-cover"
                                            sizes="100vw"
                                        />
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center text-gray-500">
                                        <ImageIcon className="w-10 h-10 mb-2" />
                                        <span className="text-sm">Click to upload event banner</span>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    name="banner"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="absolute opacity-0 w-full h-full cursor-pointer"
                                />
                            </div>
                        </div>

                        {/* 🏷 Title */}
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

                        {/* 📝 Description */}
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

                        {/* 📅 Date & Time */}
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

                        {/* 📍 Location & Mode */}
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
                                    {Array.isArray(locations) &&
                                        locations.map((loc) => (
                                            <option key={loc.id} value={loc.id}>
                                                {loc.city || loc.state || loc.country}
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

                        {/* 🔗 Registration + Featured */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    Registration Link
                                </label>
                                <input
                                    type="url"
                                    name="registrationLink"
                                    value={form.registrationLink || ""}
                                    onChange={handleChange}
                                    className="..."
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

                        {/* 🧭 Buttons */}
                        <div className="flex justify-end gap-3 pt-6 pb-2 sticky bottom-0 bg-white">
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
        </div>
    );

}
