"use client";
import { useState } from "react";
import axiosClient from "@/lib/axios";

export default function EditProfileModal({ user, onClose, onSaved }) {
    const [form, setForm] = useState({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        about: user.about || "",
        website: user.website || "",
        address: user.address || "",
        avatar: null,
        banner: null,
    });

    const [previewAvatar, setPreviewAvatar] = useState(user.avatar ? `${process.env.NEXT_PUBLIC_API_URL}${user.avatar}` : null);
    const [previewBanner, setPreviewBanner] = useState(user.banner ? `${process.env.NEXT_PUBLIC_API_URL}${user.banner}` : null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setForm({ ...form, [name]: files[0] });
            if (name === "avatar") setPreviewAvatar(URL.createObjectURL(files[0]));
            if (name === "banner") setPreviewBanner(URL.createObjectURL(files[0]));
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
                if (form[key]) fd.append(key, form[key]);
            }
            await axiosClient.put("/api/users/me", fd, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            onSaved();
            onClose();
        } catch (err) {
            console.error("❌ Failed to update profile:", err);
            alert("Error updating profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Edit Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                        <input
                            type="text"
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            placeholder="First Name"
                            className="border p-2 rounded w-full"
                            required
                        />
                        <input
                            type="text"
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            placeholder="Last Name"
                            className="border p-2 rounded w-full"
                            required
                        />
                    </div>

                    <input
                        type="text"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+923001234567"
                        className="border p-2 rounded w-full"
                    />

                    <textarea
                        name="about"
                        value={form.about}
                        onChange={handleChange}
                        placeholder="Write about yourself..."
                        className="border p-2 rounded w-full min-h-[100px]"
                    />

                    <input
                        type="text"
                        name="website"
                        value={form.website}
                        onChange={handleChange}
                        placeholder="https://your-portfolio.com"
                        className="border p-2 rounded w-full"
                    />

                    <input
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        placeholder="Your Address"
                        className="border p-2 rounded w-full"
                    />

                    {/* Avatar Upload */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">Profile Picture</label>
                        <input type="file" name="avatar" accept="image/*" onChange={handleChange} className="w-full border p-2 rounded mt-1" />
                        {previewAvatar && <img src={previewAvatar} alt="Preview" className="w-20 h-20 rounded-full mt-2 object-cover" />}
                    </div>

                    {/* Banner Upload */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">Banner Image</label>
                        <input type="file" name="banner" accept="image/*" onChange={handleChange} className="w-full border p-2 rounded mt-1" />
                        {previewBanner && <img src={previewBanner} alt="Preview" className="w-full h-32 object-cover rounded mt-2" />}
                    </div>

                    <div className="flex justify-end gap-3 mt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
