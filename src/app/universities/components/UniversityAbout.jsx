"use client";

import { useEffect } from "react";
import { GraduationCap, Users, BookOpen, Award, FileText } from "lucide-react";

export default function UniversityAbout({ uni }) {
    // Log when component mounts
    useEffect(() => {
        console.log("🧩 UniversityAbout mounted");
        console.log("📦 uni.about:", uni.about);
        console.log("📦 uni.description:", uni.description);
    }, [uni]);

    const stats = [
        {
            label: "Scholarships",
            value: uni.scholarshipsCount ?? uni.scholarships?.length ?? 0,
            icon: Award,
        },
        {
            label: "Programmes",
            value: uni.programsCount ?? uni.programs?.length ?? 0,
            icon: GraduationCap,
        },
        {
            label: "Articles",
            value: uni.articlesCount ?? uni.articles?.length ?? 0,
            icon: FileText,
        },
    ];

    return (
        <section className="py-8 sm:py-10">
            {/* ===== Stats Grid ===== */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                {stats.map((s, i) => {
                    const Icon = s.icon;
                    const isZero = !s.value || s.value === 0;
                    return (
                        <div
                            key={i}
                            className={`rounded-xl text-center p-4 sm:p-5 border transition-all duration-300 
                ${isZero
                                    ? "bg-gray-50 border-gray-200 text-gray-400"
                                    : "bg-gradient-to-br from-blue-50 to-white border-blue-100 shadow-sm hover:shadow-md"
                                }`}
                        >
                            <div
                                className={`mx-auto w-10 h-10 flex items-center justify-center rounded-full mb-3
                  ${isZero ? "bg-gray-100 text-gray-400" : "bg-blue-100 text-blue-600"}`}
                            >
                                <Icon size={20} />
                            </div>
                            <p
                                className={`text-xl sm:text-2xl font-bold 
                  ${isZero ? "text-gray-400" : "text-gray-900"}`}
                            >
                                {s.value}
                            </p>
                            <p
                                className={`text-xs sm:text-sm font-medium 
                  ${isZero ? "text-gray-400" : "text-gray-600"}`}
                            >
                                {s.label}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* ===== About Section ===== */}
            <div className="max-w-4xl mx-auto bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">
                    History & About
                </h2>

                {uni.about || uni.description ? (
                    <div
                        className="prose prose-blue max-w-none text-gray-800 prose-h2:text-gray-900 prose-strong:text-gray-900 prose-li:my-1"
                        dangerouslySetInnerHTML={{
                            __html: uni.about || uni.description,
                        }}
                    />
                ) : (
                    <p className="text-gray-500 text-center py-6">
                        No about section found.
                    </p>
                )}
            </div>
        </section>
    );
}
