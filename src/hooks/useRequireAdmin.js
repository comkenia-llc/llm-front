"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function useRequireAdmin() {
    const { user, isAdmin, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // ✅ Wait for auth to finish loading
        if (loading) return;

        if (!user) {
            router.replace("/login");
        } else if (!isAdmin) {
            router.replace("/");
        }
    }, [user, isAdmin, loading, router]);
}
