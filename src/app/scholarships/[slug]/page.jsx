import Image from "next/image";
import Link from "next/link";
import ProgrammeCard from "@/app/components/cards/ProgrammeCard"; // ✅ Import your reusable card
import { Calendar, MapPin, Clock, DollarSign, Link as LinkIcon, ArrowLeft, Globe } from "lucide-react";

export const revalidate = 0;

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const base = process.env.NEXT_PUBLIC_API_URL || "https://back.universitiesforllm.com";
    const site = "https://universitiesforllm.com";

    try {
        const res = await fetch(`${base}/api/scholarships/${slug}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Not found");
        const scholarship = await res.json();

        const title = scholarship.seoTitle || `${scholarship.title} | ${scholarship.university?.name || "University"} | Keekan Education`;
        const desc = scholarship.seoDescription || scholarship.description?.slice(0, 160);
        const image = scholarship.metaImage ? `${base}${scholarship.metaImage}` : `${site}/default-scholarship.jpg`;
        const canonical = scholarship.canonicalUrl || `${site}/scholarships/${slug}`;

        return {
            title,
            description: desc,
            alternates: { canonical },
            openGraph: { title, description: desc, images: [image] },
            twitter: { card: "summary_large_image", title, description: desc, images: [image] },
        };
    } catch {
        return { title: "Scholarship Not Found" };
    }
}

export default async function ScholarshipDetailPage({ params }) {
    const { slug } = await params;
    const base = process.env.NEXT_PUBLIC_API_URL || "https://back.universitiesforllm.com";
    const res = await fetch(`${base}/api/scholarships/${slug}`, { cache: "no-store" });

    if (!res.ok) {
        return (
            <div className="flex justify-center items-center h-[70vh] text-gray-500 text-lg">
                Scholarship not found.
            </div>
        );
    }

    const scholarship = await res.json();
    const uni = scholarship.university || {};
    const location = scholarship.location || scholarship.university?.location || {};
    const relatedPrograms = scholarship.relatedPrograms || [];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
            {/* 🏫 Hero */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-600 opacity-80"></div>
                <div className="relative z-10 text-center py-20 px-6 text-white">
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                        {scholarship.title}
                    </h1>
                    <p className="mt-2 text-blue-100 text-lg">
                        Offered by {uni.name || "Top University"}
                    </p>
                </div>
            </div>

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <Link
                    href="/scholarships"
                    className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 mb-6"
                >
                    <ArrowLeft size={16} /> Back to Scholarships
                </Link>

                {/* 🎓 Scholarship Card */}
                <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100 mb-14">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                            <Image
                                src={uni.logo ? `${base}${uni.logo}` : "/images/university-placeholder.png"}
                                alt={uni.name || "University"}
                                width={64}
                                height={64}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800">{uni.name}</h2>
                            <p className="text-gray-500 text-sm flex items-center gap-1">
                                <MapPin size={14} /> {location.city ? `${location.city}, ${location.country}` : location.country || "Worldwide"}
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 text-gray-700">
                        <div className="flex items-center gap-2">
                            <Calendar className="text-blue-600" size={18} />
                            <span>Deadline: <strong>{scholarship.deadline ? new Date(scholarship.deadline).toLocaleDateString() : "N/A"}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                            <DollarSign className="text-green-600" size={18} />
                            <span>Amount: <strong>{scholarship.amount || "Varies"} {scholarship.currency}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="text-blue-600" size={18} />
                            <span>Duration: <strong>{scholarship.duration || "Flexible"}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Globe className="text-blue-600" size={18} />
                            <span>Coverage: <strong className="capitalize">{scholarship.coverage}</strong></span>
                        </div>
                    </div>

                    <hr className="my-8 border-gray-200" />

                    <section className="prose max-w-none text-gray-700 leading-relaxed">
                        <h3 className="text-xl font-semibold mb-3 text-gray-800">Overview</h3>
                        <p>{scholarship.description || "No description provided."}</p>

                        {scholarship.eligibility && (
                            <>
                                <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-800">Eligibility</h3>
                                <p>{scholarship.eligibility}</p>
                            </>
                        )}
                        {scholarship.requirements && (
                            <>
                                <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-800">Requirements</h3>
                                <p>{scholarship.requirements}</p>
                            </>
                        )}
                    </section>

                    {scholarship.applyUrl && (
                        <div className="mt-10 flex justify-center">
                            <a
                                href={scholarship.applyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-md"
                            >
                                <LinkIcon size={18} /> Apply Now
                            </a>
                        </div>
                    )}
                </div>

                {/* ✅ Relevant Programs */}
                {relatedPrograms.length > 0 && (
                    <section className="pb-20">
                        <h3 className="text-2xl font-bold text-gray-900 mb-8">
                            🎓 Relevant Programs for this Scholarship
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedPrograms.map((prog) => (
                                <ProgrammeCard
                                    key={prog.id}
                                    programme={prog}
                                    university={uni}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}
