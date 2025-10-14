"use client";
import Image from "next/image";
import { Pencil } from "lucide-react";
import { useEffect, useMemo } from "react";

export default function ProfileHeader({ user, activeTab, setActiveTab, onEdit }) {
    const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

    // ✅ URL validator
    const isValidUrl = (url) => {
        try {
            if (!url) return false;
            // prepend base if it's a relative path
            const full = url.startsWith("http") ? url : `${base}${url}`;
            new URL(full);
            return true;
        } catch {
            return false;
        }
    };

    // ✅ Compute avatar/banner safely
    const avatar = useMemo(() => {
        const raw = user?.avatar;
        if (isValidUrl(raw)) {
            return raw.startsWith("http") ? raw : `${base}${raw}`;
        }
        return "/images/avatar-placeholder.png";
    }, [user, base]);

    const banner = useMemo(() => {
        const raw = user?.banner;
        if (isValidUrl(raw)) {
            return raw.startsWith("http") ? raw : `${base}${raw}`;
        }
        return "/images/banner.jpg";
    }, [user, base]);

    // 🪵 Debug logs
    useEffect(() => {
        console.group("🧩 ProfileHeader Debug");
        console.log("base:", base);
        console.log("user.avatar raw:", user?.avatar);
        console.log("final avatar:", avatar);
        console.log("user.banner raw:", user?.banner);
        console.log("final banner:", banner);
        console.groupEnd();
    }, [user, avatar, banner]);

    return (
        <div className="relative bg-gradient-to-r from-blue-50 via-pink-50 to-purple-50 border-b border-gray-200">
            {/* ===== Banner ===== */}
            <div className="relative w-full h-40 sm:h-56 overflow-hidden">
                <Image
                    src={banner}
                    alt="Profile banner"
                    fill
                    className="object-cover opacity-90"
                    sizes="100vw"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />
            </div>

            {/* ===== Profile Info ===== */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 relative z-10 -mt-20">
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                    {/* 🧩 Avatar */}
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md bg-gray-100">
                        <Image
                            src={avatar}
                            alt="Avatar"
                            fill
                            className="object-cover"
                            sizes="128px"
                            priority
                        />
                    </div>

                    {/* 🧠 User Info */}
                    <div className="flex-1">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                            {user?.firstName} {user?.lastName}
                        </h1>
                        <p className="text-gray-500 capitalize">{user?.role || "Student"}</p>
                        {user?.email && (
                            <p className="text-gray-500 text-sm mt-1">{user.email}</p>
                        )}
                    </div>

                    {/* ✏️ Edit Button */}
                    <button
                        onClick={onEdit}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition"
                    >
                        <Pencil size={16} />
                        Edit Profile
                    </button>
                </div>

                {/* ===== Tabs ===== */}
                <div className="mt-8 flex flex-wrap gap-3 border-b border-gray-200 pb-2">
                    {[
                        { key: "profile", label: "Profile" },
                        { key: "universities", label: "Saved Universities" },
                        { key: "programs", label: "Saved Programs" },
                        { key: "applications", label: "Applications" },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`px-4 py-2 text-sm font-semibold rounded-t-md transition-colors ${activeTab === tab.key
                                    ? "bg-white shadow text-blue-600 border-b-2 border-blue-600"
                                    : "text-gray-600 hover:text-blue-600"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
