// app/programs/page.jsx
import ProgrammeCard from "@/app/components/cards/ProgrammeCard";

export const revalidate = 0; // always fresh

export default async function ProgramsPage() {
    const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

    // ✅ Fetch all programs (SSR)
    const res = await fetch(`${base}/api/programs?limit=30`, {
        cache: "no-store",
    });

    if (!res.ok) {
        return (
            <div className="flex justify-center items-center min-h-[60vh] text-gray-500">
                Failed to load programs.
            </div>
        );
    }

    const data = await res.json();
    const programs = data.items || data || [];

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            
            <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">
                Explore Study Programs
            </h1>

            <p className="text-gray-600 mb-10">
                Find the perfect study program that matches your interests and goals.
            </p>

            {programs.length === 0 ? (
                <p className="text-center text-gray-500 py-10">
                    No programs available at the moment.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {programs.map((p) => (
                        <ProgrammeCard
                            key={p.id}
                            programme={p}
                            university={p.university}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
