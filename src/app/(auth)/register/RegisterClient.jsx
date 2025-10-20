"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { apiRequest } from "@/lib/api";
import { Loader2, UserPlus, GraduationCap, University } from "lucide-react";
import Link from "next/link";

export default function RegisterClient() {
    const router = useRouter();
    const { login } = useAuth();

    const [role, setRole] = useState("student");
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        universityName: "",
        website: "",
        description: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const phoneRegex = /^\+\d{7,15}$/;
        if (form.phone && !phoneRegex.test(form.phone)) {
            setError("Please enter a valid phone number starting with + (e.g. +923001234567)");
            return;
        }
        setLoading(true);
        setError("");

        try {
            const res = await apiRequest("/api/auth/register", "POST", { ...form, role });
            login(res.user, res.token);
            router.push("/login");
        } catch (err) {
            console.error("Registration failed:", err);
            setError(err.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#010b59] via-[#0a166e] to-[#0a1040] text-gray-800 relative overflow-hidden selection:bg-pink-200">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#f613a3]/30 via-transparent to-[#9deff9]/30 blur-3xl" />

            <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 mx-4">
                {/* Header */}
                <div className="text-center mb-6">
                    <div className="flex justify-center mb-3">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-600 to-blue-600 flex items-center justify-center shadow-lg">
                            <UserPlus className="text-white w-7 h-7" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-blue-900">Create Account</h1>
                    <p className="text-gray-600 text-sm mt-2">
                        Join <strong>Universities for LLM</strong> to explore global law programs
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-md p-3 mb-4">
                        {error}
                    </div>
                )}

                {/* Role Selection */}
                <div className="flex justify-center gap-4 mb-6">
                    <button
                        type="button"
                        onClick={() => setRole("student")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition ${role === "student"
                                ? "bg-gradient-to-r from-pink-600 to-blue-600 text-white shadow-lg"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        <GraduationCap className="w-4 h-4" /> Student
                    </button>
                    <button
                        type="button"
                        onClick={() => setRole("university")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition ${role === "university"
                                ? "bg-gradient-to-r from-pink-600 to-blue-600 text-white shadow-lg"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        <University className="w-4 h-4" /> University
                    </button>
                </div>

                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Fields */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                First Name
                            </label>
                            <input
                                name="firstName"
                                placeholder="John"
                                value={form.firstName}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 bg-white p-3 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Last Name
                            </label>
                            <input
                                name="lastName"
                                placeholder="Doe"
                                value={form.lastName}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 bg-white p-3 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition"
                                required
                            />
                        </div>
                    </div>

                    {/* Email */}
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

                    {/* Password */}
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

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone (must start with +, e.g. +923001234567)
                        </label>
                        <input
                            name="phone"
                            placeholder="+923001234567"
                            value={form.phone}
                            onChange={handleChange}
                            pattern="^\+\d{7,15}$" // ✅ HTML validation
                            title="Phone number must start with + and contain 7–15 digits"
                            className="w-full rounded-lg border border-gray-300 bg-white p-3 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition"
                        />

                    </div>

                    {/* University-Specific Fields */}
                    {role === "university" && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    University Name
                                </label>
                                <input
                                    name="universityName"
                                    placeholder="Example University"
                                    value={form.universityName}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 bg-white p-3 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Website (optional)
                                </label>
                                <input
                                    name="website"
                                    placeholder="https://example.edu"
                                    value={form.website}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 bg-white p-3 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Short Description
                                </label>
                                <textarea
                                    name="description"
                                    rows={3}
                                    placeholder="Tell us briefly about your university..."
                                    value={form.description}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 bg-white p-3 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition"
                                />
                            </div>
                        </>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-600 to-blue-600 text-white font-semibold py-3 rounded-full shadow-lg hover:opacity-90 transition disabled:opacity-60"
                    >
                        {loading && <Loader2 className="animate-spin w-4 h-4" />}
                        {loading ? "Registering..." : "Create Account"}
                    </button>
                </form>

                {/* Footer */}
                <div className="text-center mt-6 text-sm text-gray-700">
                    Already have an account?{" "}
                    <Link href="/login" className="text-pink-600 font-semibold hover:underline">
                        Login here
                    </Link>
                </div>
            </div>

            {/* Bottom Glow */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-pink-600/20 to-transparent" />
        </main>
    );
}
