"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, LogIn } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginClient() {
    const { login } = useAuth();
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await login(form.email, form.password);
        } catch (err) {
            console.error("Login failed:", err);
            setError(err.response?.data?.message || "Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#010b59] via-[#0a166e] to-[#0a1040] relative overflow-hidden text-gray-800 selection:bg-pink-200">
            <div className="absolute inset-0 bg-gradient-to-br from-[#f613a3]/30 via-transparent to-[#9deff9]/30 blur-3xl" />

            <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 mx-4">
                <div className="text-center mb-6">
                    <div className="flex justify-center mb-3">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-600 to-blue-600 flex items-center justify-center shadow-lg">
                            <LogIn className="text-white w-7 h-7" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-blue-900">Welcome Back</h1>
                    <p className="text-gray-600 text-sm mt-2">
                        Sign in to your <strong>Universities for LLM</strong> account
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-md p-3 mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 bg-white p-3 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 bg-white p-3 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-600 to-blue-600 text-white font-semibold py-3 rounded-full shadow-lg hover:opacity-90 transition disabled:opacity-60"
                    >
                        {loading && <Loader2 className="animate-spin w-4 h-4" />}
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="text-center mt-6 text-sm text-gray-700">
                    Don’t have an account?{" "}
                    <Link
                        href="/register"
                        className="text-pink-600 font-semibold hover:underline"
                    >
                        Register here
                    </Link>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-pink-600/20 to-transparent" />
        </main>
    );
}
