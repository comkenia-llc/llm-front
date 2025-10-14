"use client";

export default function UniversityTabs({ active, onChange }) {
    const tabs = [
        { key: "about", label: "About" },
        { key: "programs", label: "Offered Programmes" },
        { key: "scholarships", label: "Offered Scholarships" },
        { key: "articles", label: "Articles & News" },
    ];

    return (
        <nav className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-6xl mx-auto px-3 sm:px-6 overflow-x-auto">
                <div className="flex gap-2 sm:gap-3 py-2 sm:py-3 min-w-max">
                    {tabs.map((tab) => {
                        const isActive = active === tab.key;
                        return (
                            <button
                                key={tab.key}
                                onClick={() => onChange(tab.key)}
                                className={`px-4 sm:px-6 py-2.5 rounded-tl-2xl text-sm sm:text-[15px] font-medium whitespace-nowrap transition-all duration-200
                ${isActive
                                        ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md hover:from-blue-700 hover:to-blue-600"
                                        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
