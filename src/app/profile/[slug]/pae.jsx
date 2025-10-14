"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import axiosClient from "@/lib/axios";
import { MapPin, Mail, Phone } from "lucide-react";

export default function PublicProfilePage() {
    const { slug } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axiosClient.get(`/api/users/slug/${slug}`);
                setUser(res.data);
            } catch (err) {
                console.error("Profile fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        if (slug) fetchUser();
    }, [slug]);

    if (loading) return <div className="text-center py-10 text-gray-500">Loading...</div>;
    if (!user) return <div className="text-center py-10 text-gray-500">User not found</div>;

    const avatar = user.avatar ? `${base}${user.avatar}` : "/images/avatar-placeholder.png";
    const banner = user.banner ? `${base}${user.banner}` : "/images/banner.jpg";

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Banner */}
            <div className="relative h-48 sm:h-56 bg-gray-200">
                <Image src={banner} alt="Banner" fill className="object-cover" sizes="100vw" />
            </div>

            {/* Profile Card */}
            <div className="max-w-4xl mx-auto px-4 -mt-16 relative z-10">
                <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 border border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
                            <Image src={avatar} alt="Avatar" fill className="object-cover" sizes="128px" />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold text-gray-900">
                                {user.firstName} {user.lastName}
                            </h1>
                            <p className="text-gray-500 capitalize">{user.role}</p>
                        </div>
                    </div>

                    {/* About */}
                    {user.about && (
                        <div className="mt-8">
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">About Me</h2>
                            <p className="text-gray-700 leading-relaxed">{user.about}</p>
                        </div>
                    )}

                    {/* Contact Info */}
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {user.address && (
                            <Info icon={<MapPin size={16} />} label="Address" value={user.address} />
                        )}
                        {user.email && (
                            <Info icon={<Mail size={16} />} label="Email" value={user.email} />
                        )}
                        {user.phone && (
                            <Info icon={<Phone size={16} />} label="Phone" value={user.phone} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function Info({ icon, label, value }) {
    return (
        <div className="flex items-center gap-2 text-gray-700 bg-gray-50 rounded-md px-3 py-2 border border-gray-100">
            {icon}
            <div>
                <p className="text-xs text-gray-500">{label}</p>
                <p className="text-sm font-medium">{value}</p>
            </div>
        </div>
    );
}
