"use client";
import { useState, useEffect } from "react";
import axiosClient from "@/lib/axios";

export default function UniversityFilters({ filters, setFilters }) {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        axiosClient.get("/api/locations").then((res) => {
            const uniqueCountries = [
                ...new Set(res.data.items.map((l) => l.country)),
            ];
            setCountries(uniqueCountries.filter(Boolean));
        });
    }, []);

    const toggleFilter = (key, value) => {
        const exists = filters[key].includes(value);
        const updated = exists
            ? filters[key].filter((v) => v !== value)
            : [...filters[key], value];
        setFilters({ ...filters, [key]: updated });
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border p-4 space-y-5">
            <h3 className="font-semibold text-lg">Filters</h3>

            {/* Sort */}
            <div>
                <p className="text-sm font-medium mb-2">Sort</p>
                {["Relevance (default)", "Number of Students", "Distance"].map((s) => (
                    <label key={s} className="block text-sm text-gray-600">
                        <input
                            type="radio"
                            name="sort"
                            className="mr-2"
                            checked={filters.sort === s.toLowerCase().split(" ")[0]}
                            onChange={() =>
                                setFilters({ ...filters, sort: s.toLowerCase().split(" ")[0] })
                            }
                        />
                        {s}
                    </label>
                ))}
            </div>

            {/* Type */}
            <div>
                <p className="text-sm font-medium mb-2">University Type</p>
                {["public", "private", "semi-government"].map((t) => (
                    <label key={t} className="block text-sm text-gray-600">
                        <input
                            type="checkbox"
                            className="mr-2"
                            checked={filters.type.includes(t)}
                            onChange={() => toggleFilter("type", t)}
                        />
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                    </label>
                ))}
            </div>

            {/* Location */}
            <div>
                <p className="text-sm font-medium mb-2">Location</p>
                {countries.map((c) => (
                    <label key={c} className="block text-sm text-gray-600">
                        <input
                            type="checkbox"
                            className="mr-2"
                            checked={filters.country.includes(c)}
                            onChange={() => toggleFilter("country", c)}
                        />
                        {c}
                    </label>
                ))}
            </div>
        </div>
    );
}
