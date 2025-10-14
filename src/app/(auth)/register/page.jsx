"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { apiRequest } from "@/lib/api";

export default function RegisterPage() {
    const router = useRouter();
    const { login } = useAuth();

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await apiRequest("/auth/register", "POST", form);
            login(res.user, res.token);
            router.push("/");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md rounded-lg bg-white p-6 shadow-md"
            >
                <h1 className="mb-4 text-2xl font-bold text-center">Create Account</h1>

                {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

                <div className="grid grid-cols-2 gap-2">
                    <input
                        name="firstName"
                        placeholder="First Name"
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                    />
                    <input
                        name="lastName"
                        placeholder="Last Name"
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                    />
                </div>

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="mt-3 w-full border p-2 rounded"
                    required
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="mt-3 w-full border p-2 rounded"
                    required
                />

                <input
                    name="phone"
                    placeholder="Phone (+923001234567)"
                    onChange={handleChange}
                    className="mt-3 w-full border p-2 rounded"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-4 w-full rounded bg-blue-600 py-2 text-white font-semibold hover:bg-blue-700"
                >
                    {loading ? "Registering..." : "Register"}
                </button>

                <p className="mt-3 text-sm text-center">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-600 underline">
                        Login
                    </a>
                </p>
            </form>
        </div>
    );
}
