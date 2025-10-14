"use client";
import { useState } from "react";
import UniversityTabs from "./UniversityTabs";
import UniversityAbout from "./UniversityAbout";
import UniversityProgramsClient from "./UniversityProgramsClient";
import UniversityScholarshipsClient from "./UniversityScholarshipsClient";

export default function UniversityTabsWrapper({ uni }) {
    const [activeTab, setActiveTab] = useState("about");

    return (
        <>
            {/* 🔹 Tabs bar */}
            <UniversityTabs active={activeTab} onChange={setActiveTab} />

            {/* 🔹 Conditional content */}
            <div className="max-w-6xl mx-auto p-4 transition-all duration-300">
                {activeTab === "about" && (
                    <div className="animate-fadeIn">
                        <UniversityAbout uni={uni} />
                    </div>
                )}

                {activeTab === "programs" && (
                    <div className="animate-fadeIn">
                        <UniversityProgramsClient uniId={uni.id} />
                    </div>
                )}

                {activeTab === "scholarships" && (
                    <div className="animate-fadeIn">
                        <UniversityScholarshipsClient uniId={uni.id} />
                    </div>
                )}

                {activeTab === "articles" && (
                    <div className="animate-fadeIn text-center text-gray-500 py-10">
                        Articles coming soon...
                    </div>
                )}
            </div>
        </>
    );
}
