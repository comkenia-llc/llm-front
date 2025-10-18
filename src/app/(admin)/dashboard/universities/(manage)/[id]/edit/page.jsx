"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosClient from "@/lib/axios";
import UniversityForm from "../../../components/UniversityForm";

export default function EditUniversityPage() {
    const { id } = useParams();
    const [editing, setEditing] = useState(null);

    useEffect(() => {
        if (id) {
            axiosClient.get(`/api/universities/${id}`).then((res) => setEditing(res.data));
        }
    }, [id]);

    if (!editing) return <p className="p-6">Loading...</p>;

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-2xl font-semibold mb-4">Edit University</h1>
            <UniversityForm editing={editing} />
        </div>
    );
}
