import Image from "next/image";
import { GraduationCap, Clock, DollarSign, Globe, BookOpen, MapPin, School, FileText } from "lucide-react";
import Link from "next/link";
import FaqSection from "@/app/components/FaqSection";

export const revalidate = 0; // Always fetch fresh data

// ✅ 1. SEO Metadata
export async function generateMetadata({ params }) {
    const base = process.env.NEXT_PUBLIC_API_URL || "https://back.universitiesforllm.com";
    const site = "https://universitiesforllm.com";
    const { slug } = params;

    try {
        const res = await fetch(`${base}/api/programs/slug/${slug}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Program not found");

        const program = await res.json();
        const title =
            program.seoTitle ||
            `${program.title} from ${program.university?.name || "Top University"} | Keekan Education`;
        const description =
            program.seoDescription ||
            `Explore details about ${program.title} offered by ${program.university?.name
            }. Learn about tuition, eligibility, scholarships, and admission deadlines.`;
        const image =
            program.metaImage || program.featuredImage
                ? `${base}${program.metaImage || program.featuredImage}`
                : `${site}/program3.jpg`;
        const canonical = program.canonicalUrl || `${site}/programs/${program.slug}`;

        return {
            title,
            description,
            alternates: { canonical },
            openGraph: { title, description, images: [image], url: canonical },
            twitter: { card: "summary_large_image", title, description, images: [image] },
        };
    } catch {
        return { title: "Program Not Found | Keekan Education" };
    }
}



export default async function ProgramDetailPage({ params }) {
    const base = process.env.NEXT_PUBLIC_API_URL || "https://back.universitiesforllm.com";
    const site = "https://universitiesforllm.com";

    // ✅ Fetch the program by slug
    const res = await fetch(`${base}/api/programs/slug/${params.slug}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        return (
            <div className="flex justify-center items-center min-h-[60vh] text-gray-500">
                Program not found.
            </div>
        );
    }

    const program = await res.json();
    const uni = program.university || {};
    const loc = program.location || {};
    const discipline = program.discipline || {};


    // 🎯 Fetch FAQs
    const faqRes = await fetch(
        `${base}/api/faqs?relatedType=program&relatedId=${program.id}`,
        { cache: "no-store" }
    );
    const faqData = faqRes.ok ? await faqRes.json() : [];
    const faqs = faqData.items || faqData || [];

    const imageUrl = program.featuredImage
        ? `${base}${program.featuredImage}`
        : "/images/program-placeholder.jpg";

    const uniLogo = uni.logo ? `${base}${uni.logo}` : "/images/uni1.png";



    // ✅ Helpers
    const formatCurrency = (amount, currency = "USD") =>
        amount ? `${currency} ${Number(amount).toLocaleString()}` : "N/A";

    const formatDate = (date) =>
        date ? new Date(date).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "N/A";

    
    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            {/* ===== Hero Section ===== */}
            <div className="relative h-72 w-full rounded-2xl overflow-hidden shadow-lg">
                <Image
                    src={imageUrl}
                    alt={program.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                    <h1 className="text-3xl sm:text-4xl font-bold drop-shadow-lg">
                        {program.title}
                    </h1>
                    {discipline?.name && (
                        <p className="text-sm mt-1 opacity-90">{discipline.name}</p>
                    )}
                </div>
            </div>

            {/* ===== University Header ===== */}
            <div className="flex flex-col sm:flex-row items-center justify-between mt-8 bg-white border rounded-2xl shadow-sm p-6 gap-4">
                <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 border">
                        <Image
                            src={uniLogo}
                            alt={uni.name || "University"}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                            {uni.name || "Unknown University"}
                        </h2>
                        <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                            <MapPin className="h-4 w-4" />
                            <span>
                                {loc.city
                                    ? `${loc.city}, ${loc.country}`
                                    : loc.country || "Location not specified"}
                            </span>
                        </div>
                    </div>
                </div>

                <Link
                    href={`/apply/${program.slug}`}
                    target="_blank"
                    // rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg shadow transition-all"
                >
                    Apply Now
                </Link>
            </div>

            {/* ===== Key Information Grid ===== */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
                <InfoCard icon={GraduationCap} label="Level" value={program.level || "N/A"} />
                <InfoCard icon={Clock} label="Duration" value={program.duration || "Flexible"} />
                <InfoCard icon={DollarSign} label="Tuition Fee" value={formatCurrency(program.tuitionFee, program.currency)} />
                <InfoCard icon={FileText} label="Application Fee" value={program.applicationFee || "N/A"} />
                <InfoCard icon={BookOpen} label="Language" value={program.language || "English"} />
                <InfoCard icon={Globe} label="Mode" value={program.studyMode || "On-Campus"} />
            </div>

            {/* ===== About Program ===== */}
            <section className="mt-10 bg-white rounded-2xl shadow-sm border p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">About this Program</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {program.description?.trim() ||
                        "Details about this program are coming soon. Please check back later."}
                </p>
            </section>

            {/* ===== Admission Requirements ===== */}
            <section className="mt-8 bg-white rounded-2xl shadow-sm border p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Admission Requirements</h3>
                <ul className="text-gray-700 space-y-2">
                    {program.requirements ? (
                        program.requirements
                            .split("\n")
                            .filter(Boolean)
                            .map((r, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <span className="text-blue-500">•</span>
                                    {r}
                                </li>
                            ))
                    ) : (
                        <p>No specific requirements provided.</p>
                    )}
                </ul>
            </section>

            {/* ===== Entry Tests / Scores ===== */}
            <section className="mt-8 bg-white rounded-2xl shadow-sm border p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Entry Test Requirements</h3>
                <div className="grid sm:grid-cols-2 gap-4 text-gray-700">
                    <Score label="IELTS" value={program.ieltsRequirement} />
                    <Score label="TOEFL" value={program.toeflRequirement} />
                    <Score label="GRE" value={program.greRequirement} />
                    <Score label="GPA" value={program.gpaRequirement} />
                </div>
            </section>

            {/* ===== Additional Info ===== */}
            <section className="mt-8 bg-white rounded-2xl shadow-sm border p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Additional Details</h3>
                <div className="grid sm:grid-cols-2 gap-4 text-gray-700">
                    <p><strong>Intake Months:</strong> {Array.isArray(program.intakeMonths) && program.intakeMonths.length > 0 ? program.intakeMonths.join(", ") : "Not specified"}</p>
                    <p><strong>Application Deadline:</strong> {formatDate(program.applicationDeadline)}</p>
                    <p><strong>Scholarships:</strong> {program.scholarshipsAvailable ? "Available" : "Not Available"}</p>
                    <p><strong>Status:</strong> {program.status}</p>
                </div>
            </section>


            {/* ===== Relevant Scholarships ===== */}
            {program.relatedScholarships?.length > 0 && (
                <section className="mt-12 bg-white rounded-2xl shadow-sm border p-6">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                        🎓 Scholarships Available for this Program
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {program.relatedScholarships.map((sch) => (
                            <Link
                                key={sch.id}
                                href={`/scholarships/${sch.slug}`}
                                className="flex flex-col justify-between rounded-xl border bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                            >
                                <div className="p-5 flex flex-col gap-2">
                                    <div className="flex justify-between items-start">
                                        <h4 className="text-lg font-semibold text-gray-900 leading-snug line-clamp-2">
                                            {sch.title}
                                        </h4>
                                        {sch.isFeatured && (
                                            <span className="text-xs bg-yellow-100 text-yellow-800 font-semibold px-2 py-0.5 rounded-md">
                                                Featured
                                            </span>
                                        )}
                                    </div>

                                    <div className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                                        <MapPin className="w-4 h-4 text-blue-600" />
                                        {sch.location?.city
                                            ? `${sch.location.city}, ${sch.location.country}`
                                            : sch.location?.country || "Global"}
                                    </div>

                                    {sch.deadline && (
                                        <p className="text-sm text-gray-600 flex items-center gap-1">
                                            <Clock className="w-4 h-4 text-blue-600" />
                                            Deadline:{" "}
                                            <span className="font-medium">
                                                {new Date(sch.deadline).toLocaleDateString()}
                                            </span>
                                        </p>
                                    )}

                                    <p className="text-sm mt-1 text-gray-600">
                                        💰 Coverage: <span className="capitalize font-medium">{sch.coverage}</span>
                                    </p>
                                </div>

                                {/* University footer */}
                                <div className="border-t bg-gray-50 p-4 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-100 rounded-md overflow-hidden">
                                        <Image
                                            src={
                                                sch.university?.logo
                                                    ? `${base}${sch.university.logo}`
                                                    : "/images/university-placeholder.png"
                                            }
                                            alt={sch.university?.name || "University"}
                                            width={40}
                                            height={40}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">
                                            {sch.university?.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {sch.currency} {sch.amount || "Varies"}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}


            {/* ===== FAQs ===== */}
            {/* {faqs.length > 0 && (
                <section className="mt-12 bg-white rounded-2xl shadow-sm border p-6">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                        FAQs about {program.title}
                    </h3>
                    <div className="divide-y divide-gray-200 bg-white rounded-lg border">
                        {faqs.map((faq, i) => (
                            <details key={i} className="group p-4">
                                <summary className="flex justify-between items-center cursor-pointer text-lg font-semibold text-gray-800">
                                    <span>{faq.question}</span>
                                    <span className="transition-transform group-open:rotate-180">▼</span>
                                </summary>
                                <p className="mt-3 text-gray-700 leading-relaxed">{faq.answer}</p>
                            </details>
                        ))}
                    </div>
                </section>
            )}

            {faqs.length === 0 && (
                <p className="text-center text-gray-500 py-10">
                    No FAQs available for this program yet.
                </p>
            )} */}

            <FaqSection
                title={`Faq Section about ${program.title}`}
                faqs={faqs}
            />
            {/* ===== JSON-LD Rich Schema ===== */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "EducationalOccupationalProgram",
                        name: program.title,
                        description: program.description || program.seoDescription || "",
                        educationalCredentialAwarded: program.level || "Master's Degree",
                        hasCourse: {
                            "@type": "Course",
                            name: program.title,
                            provider: {
                                "@type": "CollegeOrUniversity",
                                name: uni.name || "",
                                url: uni.website || "",
                            },
                        },
                        timeToComplete: program.duration || "Varies",
                        occupationalCategory: discipline?.name || "Law",
                        provider: {
                            "@type": "CollegeOrUniversity",
                            name: uni.name || "",
                            sameAs: uni.website || undefined,
                        },
                        programPrerequisites: program.requirements
                            ? program.requirements.split("\n").filter(Boolean)
                            : [],
                    }),
                }}
            />

            {/* FAQ Rich Result */}
            {faqs.length > 0 && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            mainEntity: faqs.map((f) => ({
                                "@type": "Question",
                                name: f.question,
                                acceptedAnswer: { "@type": "Answer", text: f.answer },
                            })),
                        }),
                    }}
                />
            )}
            
        </div>
    );
}

// ✅ Subcomponents for clarity
function InfoCard({ icon: Icon, label, value }) {
    return (
        <div className="bg-white border rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-all">
            <div className="mx-auto w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 mb-2">
                <Icon size={18} />
            </div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-base font-semibold text-gray-800">{value}</p>
        </div>
    );
}

function Score({ label, value }) {
    return (
        <p>
            <strong>{label}:</strong> {value || "Not Required"}
        </p>
    );
}
