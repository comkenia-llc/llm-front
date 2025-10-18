"use client";

import UniversityForm from "../../components/UniversityForm";


export default function NewUniversityPage() {
    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-2xl font-semibold mb-4">Add New University</h1>
            <UniversityForm />
        </div>
    );
}
