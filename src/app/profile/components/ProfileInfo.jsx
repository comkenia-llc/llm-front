"use client";
import { Mail, Phone, MapPin, User, Globe } from "lucide-react";

export default function ProfileInfo({ user }) {
    return (
        <div className="bg-white shadow rounded-xl p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Personal Info</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
                {user.about || "You haven’t added a personal description yet."}
            </p>

            <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
                <Info label="Email" value={user.email} icon={<Mail size={15} />} />
                <Info label="Phone" value={user.phone || "Not provided"} icon={<Phone size={15} />} />
                <Info label="Address" value={user.address || "Not provided"} icon={<MapPin size={15} />} />
                <Info label="Role" value={user.role} icon={<User size={15} />} />
                <Info label="Website" value={user.website || "Not provided"} icon={<Globe size={15} />} />
            </div>
        </div>
    );
}

function Info({ label, value, icon }) {
    return (
        <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 p-3 rounded-md">
            <div className="text-blue-600">{icon}</div>
            <div>
                <p className="text-xs text-gray-500">{label}</p>
                <p className="font-medium">{value}</p>
            </div>
        </div>
    );
}
