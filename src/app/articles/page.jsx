import Link from "next/link";
import Image from "next/image";

// ✅ SEO Metadata
export const metadata = {
    title: "Legal Education Blog | Universities for LLM | Keekan Education Network",
    description:
        "Read expert articles, guides, and insights about studying LLM abroad, scholarships, and legal education trends — powered by Keekan Education.",
    alternates: { canonical: "https://universitiesforllm.com/blog" },
    openGraph: {
        title: "Universities for LLM Blog | Keekan Education",
        description:
            "Explore our latest blog posts and expert insights about international legal education, scholarships, and university updates.",
        images: [
            {
                url: "/images/blog-og.jpg",
                width: 1200,
                height: 630,
                alt: "LLM Blog - Universities for LLM",
            },
        ],
    },
};

export default async function BlogPage() {
    const base =
        process.env.NEXT_PUBLIC_API_URL || "https://back.universitiesforllm.com";

    let articles = [];
    try {
        const res = await fetch(`${base}/api/articles?status=published&limit=9`, {
            cache: "no-store",
        });
        const data = await res.json();
        articles = data.items || data || [];
    } catch (err) {
        console.error("❌ Error fetching articles:", err);
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-[#010b59] via-[#0a166e] to-[#0a1040] text-gray-100 relative overflow-hidden">
            {/* 🌈 Gradient glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#f613a3]/30 via-transparent to-[#9deff9]/30 blur-3xl" />

            {/* 📰 Hero Section */}
            <section className="relative py-20 text-center">
                <div className="relative z-10 max-w-3xl mx-auto px-6">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 drop-shadow-xl">
                        Legal Education Insights & Articles
                    </h1>
                    <p className="text-white/90 text-lg leading-relaxed">
                        Stay updated with the latest LLM programs, law university rankings,
                        and expert guides from <strong>Keekan Education</strong>.
                    </p>
                </div>
            </section>

            {/* 🧾 Articles Grid */}
            <section className="relative z-10 max-w-6xl mx-auto px-6 py-20">
                {articles.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {articles.map((article) => (
                            <article
                                key={article.id}
                                className="bg-white/90 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 shadow-lg hover:shadow-xl transition-all flex flex-col"
                            >
                                {/* Thumbnail */}
                                {article.image && (
                                    <div className="relative h-52 w-full">
                                        <Image
                                            src={
                                                article.image.startsWith("http")
                                                    ? article.image
                                                    : `${base}${article.image}`
                                            }
                                            alt={article.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <h2 className="text-lg font-semibold text-blue-900 mb-2 line-clamp-2">
                                        {article.title}
                                    </h2>
                                    <p className="text-sm text-gray-700 line-clamp-3 mb-4 flex-grow">
                                        {article.description || article.excerpt}
                                    </p>
                                    <Link
                                        href={`/articles/${article.slug || article.id}`}
                                        className="inline-block bg-pink-600 hover:bg-pink-700 text-white text-sm font-semibold px-4 py-2 rounded-full self-start transition"
                                    >
                                        Read More →
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-white/80 py-20">
                        <p className="text-lg">No blog posts available yet.</p>
                        <p className="text-sm text-white/60">
                            Check back soon — new legal education articles are published every
                            week.
                        </p>
                    </div>
                )}
            </section>

            {/* 💡 CTA Section */}
            <section className="relative py-24 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#f613a3]/40 via-transparent to-[#9deff9]/40" />
                <div className="relative z-10 max-w-3xl mx-auto px-6">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Want to Publish With Us?
                    </h2>
                    <p className="text-white/80 mb-8 text-lg leading-relaxed">
                        We collaborate with law experts, universities, and researchers to
                        publish high-quality content for global law students.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-all"
                    >
                        Contact Editorial Team
                    </Link>
                </div>
            </section>
        </main>
    );
}
