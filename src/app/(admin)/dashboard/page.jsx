"use client";
import { useEffect, useState } from "react";
import axiosClient from "@/lib/axios";
import toast from "react-hot-toast";


export default function DashboardPage() {
    const [stats, setStats] = useState({
        universities: 0,
        programs: 0,
        locations: 0,
        // scholarships: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [u, p, l, s] = await Promise.all([
                    axiosClient.get("/api/universities"),
                    axiosClient.get("/api/programs"),
                    axiosClient.get("/api/locations"),
                    // axiosClient.get("/scholarships"),
                ]);

                setStats({
                    universities: u.data.total || u.data.length,
                    programs: p.data.total || p.data.length,
                    locations: l.data.total || l.data.length,
                    // scholarships: s.data.total || s.data.length,
                });
            } catch (err) {
                console.error("Dashboard fetch error:", err);
                toast.error("Failed to load dashboard stats");
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Object.entries(stats).map(([key, value]) => (
                <div key={key} className="bg-white shadow rounded-lg p-6 text-center">
                    <h3 className="text-gray-500 capitalize">{key}</h3>
                    <p className="text-2xl font-semibold text-blue-600">{value}</p>
                </div>
            ))}
        </div>
    );
}
