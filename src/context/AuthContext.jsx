"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import axiosClient from "@/lib/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // ✅ Fetch current logged-in user from backend cookie session
    useEffect(() => {
        const fetchMe = async () => {
            try {
                const res = await axiosClient.get("/api/auth/me");
                setUser(res.data);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchMe();
    }, []);

    // ✅ Login — backend sets cookie, then refresh user state
    const login = async (email, password) => {
        try {
            const res = await axiosClient.post("/api/auth/login", { email, password });
            setUser(res.data.user);
            router.push("/dashboard");
        } catch (err) {
            throw err;
        }
    };

    // ✅ Logout — clear cookie via backend
    const logout = async () => {
        try {
            await axiosClient.post("/api/auth/logout");
        } catch (err) {
            console.error("Logout error:", err);
        } finally {
            setUser(null);
            router.push("/login");
        }
    };

    // ✅ Helper flag
    const isAdmin = user?.role === "admin" || user?.role === "editor";

    return (
        <AuthContext.Provider value={{ user, isAdmin, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
