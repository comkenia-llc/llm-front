import UniversityCard from "@/app/components/cards/UniversityCard";
import ProgrammeCard from "@/app/components/cards/ProgrammeCard";
import Image from "next/image";
import Link from "next/link";
import LocationCard from "@/app/components/cards/LocationCard";

export const revalidate = 0;

export default async function LocationDetailPage({ params }) {
    const { slug } = await params;
    const base = process.env.NEXT_PUBLIC_API_URL || "https://back.universitiesforllm.com";

    const res = await fetch(`${base}/api/locations/slug/${slug}`, { cache: "no-store" });
    if (!res.ok) {
        return <div className="text-center py-20 text-gray-500">Location not found.</div>;
    }

    const data = await res.json();
    const location = data.location || data;
    const children = data.children || [];
    const universities = data.universities || [];
    const programs = data.programs || [];

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-14">
            {/* === Header === */}
            <div className="relative h-56 sm:h-72 rounded-2xl overflow-hidden shadow-md">
                <Image
                    src={
                        location.image
                            ? `${base}${location.image}`
                            : location.metaImage
                                ? `${base}${location.metaImage}`
                                : "/images/default-location.jpg"
                    }
                    alt={location.country || location.city}
                    fill
                    className="object-cover"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                <div className="absolute bottom-5 left-6 text-white">
                    <h1 className="text-3xl sm:text-4xl font-bold">
                        {location.city || location.state || location.country}
                    </h1>
                    {location.flag && (
                        <img
                            src={`${base}${location.flag}`}
                            alt="Flag"
                            className="w-10 h-auto mt-2 rounded shadow-sm"
                        />
                    )}
                </div>
            </div>

            {/* === Sub-Locations === */}
            {children.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center sm:text-left">
                        Explore {location.type === "country" ? "Regions / States" : "Cities"} in{" "}
                        {location.country || location.state}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {children.map((child) => (
                            <LocationCard
                                key={child.id}
                                location={child}
                                universityCount={child.universityCount || 0}
                                programCount={child.programCount || 0}
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* === Universities === */}
            {universities.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center sm:text-left">
                        Top Universities in {location.country || location.city}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {universities.map((uni) => (
                            <UniversityCard key={uni.id} university={uni} />
                        ))}
                    </div>
                </section>
            )}

            {/* === Programs === */}
            {programs.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center sm:text-left">
                        Popular Programs in {location.country || location.city}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {programs.map((prog) => (
                            <ProgrammeCard
                                key={prog.id}
                                programme={prog}
                                university={prog.university}
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* === Empty State === */}
            {children.length === 0 &&
                universities.length === 0 &&
                programs.length === 0 && (
                    <div className="text-center text-gray-500 py-20">
                        No data found for this location yet.
                    </div>
                )}
        </div>
    );
}