"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import axiosClient from "@/lib/axios";

export default function SearchBox() {
    const router = useRouter();

    const [disciplines, setDisciplines] = useState([]);
    const [countries, setCountries] = useState([]);

    const [discipline, setDiscipline] = useState("");
    const [location, setLocation] = useState("");
    const [customDiscipline, setCustomDiscipline] = useState("");
    const [customLocation, setCustomLocation] = useState("");

    // ✅ Fetch dropdown options
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [discRes, countryRes] = await Promise.all([
                    axiosClient.get("/api/disciplines"),
                    axiosClient.get("/api/locations/countries"), // ✅ only countries
                ]);
                setDisciplines(discRes.data.items || discRes.data || []);
                setCountries(countryRes.data.items || countryRes.data || []);
            } catch (err) {
                console.error("❌ Failed to load dropdown data:", err);
            }
        };
        fetchOptions();
    }, []);

    // ✅ Navigate to /search page
    const handleSearch = () => {
        const query = new URLSearchParams();
        const chosenDiscipline = customDiscipline || discipline;
        const chosenLocation = customLocation || location;

        if (chosenDiscipline) query.set("discipline", chosenDiscipline);
        if (chosenLocation) query.set("location", chosenLocation);

        if (chosenDiscipline || chosenLocation) {
            router.push(`/search?${query.toString()}`);
        }
    };

    return (
        <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/90 backdrop-blur-md 
        rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.15)] px-4 sm:px-6 py-5 w-full max-w-3xl transition-all duration-300">

            {/* 🎓 Discipline dropdown */}
            <div className="flex flex-col w-full sm:w-1/2">
                <div className="relative">
                    <select
                        value={discipline}
                        onChange={(e) => setDiscipline(e.target.value)}
                        className="w-full appearance-none rounded-md border border-gray-200 bg-white px-4 py-2.5 
                        text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                    >
                        <option value="">Search Study Programs</option>
                        {disciplines.map((d) => (
                            <option key={d.id} value={d.name || d.field || d.title}>
                                {d.name || d.field || d.title}
                            </option>
                        ))}
                        <option value="__custom__">Other (type manually)</option>
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        ▼
                    </span>
                </div>

                {discipline === "__custom__" && (
                    <input
                        type="text"
                        placeholder="Enter your discipline"
                        value={customDiscipline}
                        onChange={(e) => setCustomDiscipline(e.target.value)}
                        className="mt-2 w-full border border-gray-200 rounded-md p-2.5 text-gray-700 
                        shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                )}
            </div>

            {/* 🌍 Location dropdown (only countries) */}
            <div className="flex flex-col w-full sm:w-1/2">
                <div className="relative">
                    <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full appearance-none rounded-md border border-gray-200 bg-white px-4 py-2.5 
                        text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                    >
                        <option value="">Search Study Destinations</option>
                        {countries.map((c) => (
                            <option key={c.id} value={c.country}>
                                {c.country}
                            </option>
                        ))}
                        <option value="__custom__">Other (type manually)</option>
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        ▼
                    </span>
                </div>

                {location === "__custom__" && (
                    <input
                        type="text"
                        placeholder="Enter your preferred location"
                        value={customLocation}
                        onChange={(e) => setCustomLocation(e.target.value)}
                        className="mt-2 w-full border border-gray-200 rounded-md p-2.5 text-gray-700 
                        shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                )}
            </div>

            {/* 🔍 Search Button */}
            <button
                onClick={handleSearch}
                className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 
                text-white font-semibold rounded-md px-8 py-3 shadow-md hover:shadow-lg flex items-center justify-center gap-2 
                transition-all duration-200"
            >
                <Search className="h-5 w-5" />
                Search
            </button>
        </div>
    );
}
