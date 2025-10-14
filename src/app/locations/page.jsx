import Image from "next/image";

export const revalidate = 0; // always fresh SSR

export default async function LocationsPage() {
    const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

    // ✅ fetch all countries only
    const res = await fetch(`${base}/api/locations?type=country`, {
        cache: "no-store",
    });

    if (!res.ok) {
        return (
            <div className="text-center py-20 text-gray-500">
                Failed to load locations.
            </div>
        );
    }

    // ✅ Safely parse JSON and normalize into array
    const data = await res.json();
    const locations = Array.isArray(data)
        ? data
        : data.items || data.data || [];

    if (!Array.isArray(locations) || locations.length === 0) {
        return (
            <div className="text-center py-20 text-gray-500">
                No locations found.
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center">
                Study Destinations
            </h1>
            <p className="text-center text-gray-600 mb-10">
                Discover the best countries to study abroad — explore top universities
                and programs.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {locations.map((loc) => (
                    <a
                        key={loc.id}
                        href={`/locations/${loc.slug}`}
                        className="group bg-white border rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden"
                    >
                        <div className="relative w-full h-24 bg-gray-50">
                            {loc.flag && (
                                <Image
                                    src={`${base}${loc.flag}`}
                                    alt={loc.country}
                                    fill
                                    className="object-contain p-4"
                                    sizes="(max-width: 768px) 50vw, 200px"
                                />
                            )}
                        </div>
                        <div className="p-3 text-center">
                            <h2 className="font-semibold text-gray-900 group-hover:text-blue-600">
                                {loc.country}
                            </h2>
                            {loc.city && (
                                <p className="text-xs text-gray-500 mt-1">{loc.city}</p>
                            )}
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
