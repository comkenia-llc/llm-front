import FaqClient from "./FaqClient"; // ✅ This file can be client

// ✅ SERVER-SIDE SEO METADATA
export const metadata = {
    title: "Frequently Asked Questions | Universities for LLM | Keekan Education Network",
    description:
        "Find answers to common questions about studying LLM abroad, applications, scholarships, and partnerships with Keekan Education and Universities for LLM.",
    alternates: { canonical: "https://universitiesforllm.com/faqs" },
    openGraph: {
        title: "FAQs | Universities for LLM | Keekan Education",
        description:
            "Explore frequently asked questions about LLM programs, scholarships, and our education platform — powered by Keekan Education.",
        images: [
            {
                url: "/images/faq-og.jpg",
                width: 1200,
                height: 630,
                alt: "Frequently Asked Questions - Universities for LLM",
            },
        ],
    },
};

export default async function FAQPage() {
    const base =
        process.env.NEXT_PUBLIC_API_URL || "https://back.universitiesforllm.com";

    let faqs = [];
    try {
        const res = await fetch(`${base}/api/faqs`, { cache: "no-store" });
        faqs = await res.json();
    } catch (err) {
        console.error("❌ Error fetching FAQs:", err);
    }

    // ✅ Pass data to client component for interactivity
    return <FaqClient faqs={faqs || []} />;
}
