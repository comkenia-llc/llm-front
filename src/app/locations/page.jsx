import LocationCard from "../components/cards/LocationCard";

export const revalidate = 0;

export default async function LocationsPage() {
    const base = process.env.NEXT_PUBLIC_API_URL || "https://back.universitiesforllm.com";

    const res = await fetch(`${base}/api/locations?type=country`, { cache: "no-store" });
    if (!res.ok) {
        return (
            <div className="text-center py-20 text-gray-500">
                Failed to load locations.
            </div>
        );
    }

    const data = await res.json();
    const locations = data.items || data || [];

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center">
                Explore Study Destinations by Country
            </h1>

            {locations.length === 0 ? (
                <div className="text-center text-gray-500">No locations found.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {locations.map((loc) => (
                        <LocationCard
                            key={loc.id}
                            location={loc}
                            universityCount={loc.universityCount || 0}
                            programCount={loc.programCount || 0}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
