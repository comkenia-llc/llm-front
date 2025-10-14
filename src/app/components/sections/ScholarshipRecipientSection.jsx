"use client";
import { useEffect, useState } from "react";
import { Loader2, ArrowRight } from "lucide-react";

import Link from "next/link";
import ScholarRecipientCard from "../cards/ScholarshipRecipientCard";

export default function ScholarRecipientsSection() {
    const [recipients, setRecipients] = useState([]);
    const [loading, setLoading] = useState(true);

    // 🔹 Simulated API Fetch (replace later)
    useEffect(() => {
        setTimeout(() => {
            setRecipients([
                {
                    id: 1,
                    name: "Michal Wong",
                    scholarshipTitle: "Outstanding Achievement in Timber Framing Award",
                    program: "(Hons) Criminology and Psychology",
                    country: "Overseas Exchange",
                    university: "Edinburgh Napier University",
                    universityLogo: "/images/uni1.png",
                    avatar: "/images/student1.jpg",
                },
                {
                    id: 2,
                    name: "Hala Bin Abdullah",
                    scholarshipTitle: "Roy E.L. Watson Graduate Scholarship",
                    program: "LLB (Hons) Law with Psychology",
                    country: "Hong Kong",
                    university: "European School of Political and Social Sciences (ESPOL)",
                    universityLogo: "/images/uni1.png",
                    avatar: "/images/student2.jpg",
                },
                {
                    id: 3,
                    name: "Hala Bin Abdullah",
                    scholarshipTitle: "Roy E.L. Watson Graduate Scholarship",
                    program: "LLB (Hons) Law with Psychology",
                    country: "Hong Kong",
                    university: "European School of Political and Social Sciences (ESPOL)",
                    universityLogo: "/images/uni1.png",
                    avatar: "/images/student2.jpg",
                },
                {
                    id: 4,
                    name: "Hala Bin Abdullah",
                    scholarshipTitle: "Roy E.L. Watson Graduate Scholarship",
                    program: "LLB (Hons) Law with Psychology",
                    country: "Hong Kong",
                    university: "European School of Political and Social Sciences (ESPOL)",
                    universityLogo: "/images/uni1.png",
                    avatar: "/images/student2.jpg",
                },
            ]);
            setLoading(false);
        }, 600);
    }, []);

    if (loading) {
        return (
            <div className="py-24 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <section className="py-20 px-4 sm:px-8 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent">
                        Scholarship Recipients
                    </h2>
                    <Link
                        href="/recipients"
                        className="group text-sm font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1"
                    >
                        All Recipients
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {recipients.map((recipient) => (
                        <ScholarRecipientCard key={recipient.id} recipient={recipient} />
                    ))}
                </div>

                {/* Pagination dots (mocked) */}
                <div className="flex justify-center mt-10 space-x-2">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className={`h-2 w-2 rounded-full ${i === 0 ? "bg-blue-700" : "bg-gray-400"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
