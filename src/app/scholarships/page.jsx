import ScholarshipClient from "./ScholarshipClient";

// ✅ SEO Metadata
export const metadata = {
    title: "Top Global Scholarships | Keekan Education",
    description:
        "Discover the best scholarships worldwide for LLM, MBA, and other postgraduate programs. Filter by coverage, status, and country — powered by Keekan Education.",
    keywords:
        "global scholarships, university funding, study abroad, tuition aid, postgraduate scholarships, LLM scholarships",
    openGraph: {
        title: "Top Global Scholarships | Keekan Education",
        description:
            "Explore full and partial scholarships from top universities worldwide.",
        url: "https://universitiesforllm.com/scholarships",
        type: "website",
        siteName: "Universities for LLM",
        images: [
            {
                url: "https://universitiesforllm.com/og-scholarships.jpg",
                width: 1200,
                height: 630,
                alt: "Global Scholarships",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Top Global Scholarships | Keekan Education",
        description:
            "Explore top full and partial scholarships worldwide for LLM, MBA, and more.",
        images: ["https://universitiesforllm.com/og-scholarships.jpg"],
    },
};

export const revalidate = 0; // always fresh SSR

// ✅ Server-side fetching
async function getScholarships() {
    const base =
        process.env.NEXT_PUBLIC_API_URL || "https://back.universitiesforllm.com";
    const res = await fetch(`${base}/api/scholarships?limit=100`, {
        cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : data.items || [];
}

// ✅ Main Page
export default async function ScholarshipsPage() {
    const scholarships = await getScholarships();
    const site = "https://universitiesforllm.com";

    // ✅ JSON-LD structured data
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Scholarships Directory",
        itemListElement: scholarships.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${site}/scholarships/${s.slug}`,
            name: s.title,
            description: s.description || "",
        })),
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* 🧭 Header */}
            <header className="bg-gradient-to-br from-blue-700 to-blue-500 text-white py-16 text-center">
                <h1 className="text-4xl font-bold">Global Scholarships</h1>
                <p className="text-white/90 mt-2">
                    Explore top scholarships from leading universities around the world.
                </p>
            </header>

            {/* 🧩 Client Component */}
            <ScholarshipClient initialScholarships={scholarships} />

            {/* ✅ Inject Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </div>
    );
}
