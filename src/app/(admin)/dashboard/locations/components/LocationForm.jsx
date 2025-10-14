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
    });

    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [autoData, setAutoData] = useState(null);

    // 🧠 Fetch all countries for dropdowns
    useEffect(() => {
        axiosClient.get("/api/locations/countries").then((res) => setCountries(res.data));
    }, []);

    // 🧠 Auto-fill flag & currency when selecting parent country
    useEffect(() => {
        if (form.parentId && form.type !== "country") {
            const selectedCountry = countries.find((c) => c.id === parseInt(form.parentId));
            if (selectedCountry) {
                setAutoData(selectedCountry);
            }
        } else {
            setAutoData(null);
        }
    }, [form.parentId, countries]);

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
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-xl font-semibold mb-4">
                    {editing ? "Edit Location" : parent ? `Add child under ${parent.country || parent.city}` : "Add Country"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-3">
                    {/* Type selector only for new entries */}
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

                    {/* Parent dropdown for non-country */}
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

                    {/* Country / City / State Inputs */}
                    {form.type === "country" && (
                        <>
                            <input
                                name="country"
                                placeholder="Country Name"
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                                required
                            />
                            <input
                                name="countryCode"
                                placeholder="Country Code (e.g. PK, US)"
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
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        />
                    )}

                    {/* Auto-filled info */}
                    {autoData && (
                        <div className="bg-gray-50 border p-3 rounded text-sm text-gray-700 space-y-1">
                            <p><b>Flag:</b> {autoData.flag ? <img src={`${process.env.NEXT_PUBLIC_API_URL}${autoData.flag}`} className="w-5 inline-block ml-2" /> : "None"}</p>
                            <p><b>Currency:</b> {autoData.currency}</p>
                            <p><b>Continent:</b> {autoData.continent || "N/A"}</p>
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
