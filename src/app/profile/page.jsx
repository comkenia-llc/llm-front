"use client";
import { useEffect, useState } from "react";
import axiosClient from "@/lib/axios";
import ProfileHeader from "./components/ProfileHeader";
import ProfileInfo from "./components/ProfileInfo";
import SavedUniversities from "./components/SavedUniversities";
import SavedPrograms from "./components/SavedPrograms";
import EditProfileModal from "./components/EditProfileModal";


export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState("profile");
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    const fetchProfile = async () => {
        try {
            const res = await axiosClient.get("/api/users/me");
            setUser(res.data);
        } catch (err) {
            console.error("❌ Failed to fetch user profile:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    if (loading) return <div className="text-center py-20 text-gray-500">Loading...</div>;
    if (!user) return <div className="text-center py-20 text-gray-500">Profile not found</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <ProfileHeader user={user} activeTab={activeTab} setActiveTab={setActiveTab} onEdit={() => setIsEditing(true)} />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
                {activeTab === "profile" && <ProfileInfo user={user} />}
                {activeTab === "universities" && <SavedUniversities user={user} />}
                {activeTab === "programs" && <SavedPrograms user={user} />}
            </div>

            {isEditing && <EditProfileModal user={user} onClose={() => setIsEditing(false)} onSaved={fetchProfile} />}
        </div>
    );
}
