"use client";

export default function UniversityLocations({ uni }) {
    if (!uni.location) return null;

    const locs = Array.isArray(uni.locations) ? uni.locations : [uni.location];

    return (
        <div className="max-w-5xl mx-auto mt-10">
            <h2 className="text-xl font-bold mb-4">Locations</h2>
            <div className="grid md:grid-cols-2 gap-4">
                {locs.map((loc, i) => (
                    <div key={i} className="bg-white border rounded-lg shadow-sm overflow-hidden">
                        <div className="p-3">
                            <h3 className="font-semibold">{uni.name}</h3>
                            <p className="text-sm text-gray-500">{loc.address || "Address unavailable"}</p>
                        </div>
                        <iframe
                            src={`https://maps.google.com/maps?q=${loc.city || ""},${loc.country || ""}&z=4&output=embed`}
                            className="w-full h-40 border-t"
                        ></iframe>
                    </div>
                ))}
            </div>
        </div>
    );
}
