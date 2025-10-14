"use client";
import { usePathname } from "next/navigation";
import useRequireAdmin from "@/hooks/useRequireAdmin";
import { Toaster } from "react-hot-toast";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";

export default function AdminLayout({ children }) {
    // Protect route (redirect if not admin)
    useRequireAdmin();

    const pathname = usePathname();

    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar />
            <div className="flex-1">
                <AdminNavbar />
                <main className="p-6">{children}</main>
                <Toaster position="top-right" />
            </div>
        </div>
    );
}
