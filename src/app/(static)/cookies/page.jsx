export const metadata = {
    title: "Cookie Policy | Universities for LLM | Keekan Education Network",
    description:
        "Learn how Keekan Education and Universities for LLM use cookies and similar technologies to enhance your browsing experience and deliver personalized content.",
    alternates: { canonical: "https://universitiesforllm.com/cookies" },
    openGraph: {
        title: "Cookie Policy | Universities for LLM",
        description:
            "Understand our use of cookies, analytics, and advertising technologies at Universities for LLM.",
        images: [
            {
                url: "/images/cookie-policy-og.jpg",
                width: 1200,
                height: 630,
                alt: "Cookie Policy - Universities for LLM",
            },
        ],
    },
};

export default function CookiePolicyPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-[#010b59] via-[#0a166e] to-[#0a1040] relative overflow-hidden text-gray-800 selection:bg-pink-200">
            <div className="absolute inset-0 bg-gradient-to-br from-[#f613a3]/30 via-transparent to-[#9deff9]/30 blur-3xl" />

            <section className="relative z-10 max-w-5xl mx-auto px-6 py-20">
                <h1 className="text-4xl sm:text-5xl font-bold text-center text-white mb-10">
                    Cookie Policy
                </h1>

                <div className="bg-white/90 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg p-8 text-gray-700 leading-relaxed space-y-6">
                    <p>
                        This Cookie Policy explains how <strong>Keekan Education</strong>,
                        operating <strong>Universities for LLM</strong>, uses cookies and
                        similar technologies to recognize you when you visit our website.
                        It explains what these technologies are, why we use them, and your
                        rights to control our use of them.
                    </p>

                    <h2 className="text-xl font-semibold text-blue-900">
                        What Are Cookies?
                    </h2>
                    <p>
                        Cookies are small text files stored on your computer or mobile
                        device when you visit a website. They help websites function
                        efficiently, provide a better user experience, and supply analytics
                        data.
                    </p>

                    <h2 className="text-xl font-semibold text-blue-900">
                        How We Use Cookies
                    </h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            <strong>Essential Cookies:</strong> Required for core site
                            functionality such as authentication and navigation.
                        </li>
                        <li>
                            <strong>Analytics Cookies:</strong> Help us understand visitor
                            behavior, page performance, and improve user experience.
                        </li>
                        <li>
                            <strong>Advertising Cookies:</strong> Used to show relevant ads
                            and measure campaign effectiveness. We may partner with Google
                            AdSense and other ad networks.
                        </li>
                        <li>
                            <strong>Preference Cookies:</strong> Remember your location,
                            language, and display settings.
                        </li>
                    </ul>

                    <h2 className="text-xl font-semibold text-blue-900">
                        Managing Your Cookies
                    </h2>
                    <p>
                        You can accept or reject cookies at any time by adjusting your
                        browser settings. Most browsers allow you to delete or block
                        cookies, but doing so may limit website functionality.
                    </p>

                    <h2 className="text-xl font-semibold text-blue-900">
                        Third-Party Cookies
                    </h2>
                    <p>
                        Some cookies on our website are placed by trusted third parties,
                        including analytics providers and advertising partners. These third
                        parties may use cookies to deliver personalized ads or track usage
                        trends. Please refer to their individual privacy policies for more
                        details.
                    </p>

                    <h2 className="text-xl font-semibold text-blue-900">
                        Updates to This Policy
                    </h2>
                    <p>
                        We may update this Cookie Policy from time to time to reflect
                        changes in technology, regulation, or our business practices. Any
                        updates will be posted on this page with a revised “last updated”
                        date.
                    </p>

                    <p className="pt-4 text-sm text-gray-600">
                        Last updated:{" "}
                        {new Date().toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                        })}
                    </p>
                </div>
            </section>
        </main>
    );
}
