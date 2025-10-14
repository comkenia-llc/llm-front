"use client";
import Link from "next/link";
import { Building, GraduationCap, Map, Award, LayoutDashboard, BadgeDollarSign, FileText, BookOpen, Newspaper } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/locations", label: "Locations", icon: Map },
    { href: "/dashboard/universities", label: "Universities", icon: Building },
    { href: "/dashboard/programs", label: "Programs", icon: GraduationCap },
    { href: "/dashboard/scholarships", label: "Scholarships", icon: BadgeDollarSign },
    { href: "/dashboard/articles", label: "Articles", icon: FileText },
    { href: "/dashboard/disciplines", label: "Discplines", icon: BookOpen },
    { href: "/dashboard/news", label: "News", icon: Newspaper },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const { isAdmin, user } = useAuth();

    if (!isAdmin) return null;

    return (
        <aside className="w-64 bg-white shadow-lg border-r">
            <div className="p-4 text-xl font-bold text-blue-700 border-b flex items-center justify-between">
                <span>Study Portal Admin</span>
                {user && (
                    <span className="text-xs text-gray-500 truncate max-w-[100px]">
                        {user.firstName}
                    </span>
                )}
            </div>

            <nav className="p-3 flex flex-col space-y-2">
                {navItems.map((item) => {
                    const isActive =
                        pathname === item.href || pathname.startsWith(item.href + "/");

                    return (
                        <Link
                            key={item.href}
                            href={item.href} // ✅ removed /admin prefix
                            className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${isActive
                                    ? "bg-blue-100 text-blue-700 font-semibold"
                                    : "text-gray-700 hover:bg-gray-100"
                                }`}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
