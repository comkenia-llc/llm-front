"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminNavbar() {
    const { user, logout, isAdmin } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        toast.success("Logged out successfully");
        router.push("/login");
    };

    if (!isAdmin) return null; // only show navbar for admins

    return (
        <header className="sticky top-0 z-40 flex items-center justify-between bg-white border-b px-6 py-3 shadow-sm">
            {/* Left: page label */}
            <h1 className="text-lg font-semibold text-gray-800">Admin Panel</h1>

            {/* Right: admin info */}
            <div className="flex items-center gap-4">
                {user && (
                    <div className="flex items-center gap-2 text-gray-700">
                        <User className="h-5 w-5 text-blue-600" />
                        <span className="text-sm font-medium">
                            {user.firstName} {user.lastName}
                        </span>
                        <span className="text-xs text-gray-400">({user.role})</span>
                    </div>
                )}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-red-500 text-white hover:bg-red-600 text-sm font-medium"
                >
                    <LogOut className="h-4 w-4" />
                    Logout
                </button>
            </div>
        </header>
    );
}
