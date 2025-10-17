export const dynamic = "force-static";
export const revalidate = false;

import Image from "next/image";

export const metadata = {
    title: "Privacy Policy | Universities for LLM",
    description:
        "Read how Universities for LLM — powered by Keekan Education — collects, protects, and manages your personal information with full GDPR compliance.",
    alternates: { canonical: "https://universitiesforllm.com/privacy-policy" },
    openGraph: {
        title: "Privacy Policy | Universities for LLM",
        description:
            "We are committed to protecting your privacy and ensuring transparency in how we handle your personal data.",
        images: [
            {
                url: "/images/privacy-og.jpg",
                width: 1200,
                height: 630,
                alt: "Privacy Policy - Universities for LLM",
            },
        ],
    },
};

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-[#010b59] via-[#0a166e] to-[#0a1040] text-gray-800 selection:bg-pink-200">
            {/* 🌈 Hero Section */}
            <section className="relative py-20 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#f613a3]/40 via-transparent to-[#9deff9]/30 backdrop-blur-md" />
                <div className="relative z-10 max-w-4xl mx-auto px-6">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 drop-shadow-xl">
                        Privacy Policy
                    </h1>
                    <p className="text-white/90 max-w-2xl mx-auto text-lg leading-relaxed">
                        Your trust matters to us. This page explains how we collect, use,
                        and safeguard your information.
                    </p>
                </div>
            </section>

            {/* 📜 Policy Body */}
            <section className="max-w-5xl mx-auto px-6 py-12 space-y-16">
                {[
                    {
                        title: "1. Introduction",
                        content: (
                            <p>
                                At <strong>Universities for LLM</strong>, powered by{" "}
                                <strong>Keekan Education</strong>, we take your privacy
                                seriously. This Privacy Policy describes how we handle your
                                personal data when you use our platform, in compliance with
                                global standards such as GDPR and CCPA.
                            </p>
                        ),
                    },
                    {
                        title: "2. Information We Collect",
                        content: (
                            <ul className="list-disc pl-6 space-y-2">
                                <li>
                                    <strong>Account Information:</strong> name, email, and password
                                    when you register.
                                </li>
                                <li>
                                    <strong>Usage Data:</strong> pages visited, programs viewed,
                                    and time spent on the site.
                                </li>
                                <li>
                                    <strong>Device Data:</strong> browser type, IP address, and
                                    operating system.
                                </li>
                                <li>
                                    <strong>Communication Data:</strong> your messages or requests
                                    sent through forms or chat.
                                </li>
                            </ul>
                        ),
                    },
                    {
                        title: "3. How We Use Your Information",
                        content: (
                            <>
                                <p className="mb-4">
                                    We use your information only to deliver a personalized, secure
                                    experience:
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>
                                        To recommend programs and scholarships suited to your
                                        profile.
                                    </li>
                                    <li>
                                        To provide partner universities with aggregated analytics.
                                    </li>
                                    <li>
                                        To send important notifications and updates (you can opt out
                                        anytime).
                                    </li>
                                    <li>
                                        To enhance our services through usage feedback and data.
                                    </li>
                                </ul>
                            </>
                        ),
                    },
                    {
                        title: "4. Data Protection & Security",
                        content: (
                            <p>
                                We store your data securely on encrypted servers. Access is
                                limited to authorized personnel only. All sensitive information,
                                including passwords and tokens, is hashed or encrypted at rest.
                            </p>
                        ),
                    },
                    {
                        title: "5. Your Rights",
                        content: (
                            <>
                                <p className="mb-3">You have the right to:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Access or request a copy of your personal data.</li>
                                    <li>Request correction or deletion of inaccurate data.</li>
                                    <li>Withdraw consent for marketing communications.</li>
                                </ul>
                                <p className="mt-4">
                                    To exercise your rights, email{" "}
                                    <a
                                        href="mailto:privacy@keekan.com"
                                        className="text-blue-700 hover:underline"
                                    >
                                        privacy@keekan.com
                                    </a>
                                    .
                                </p>
                            </>
                        ),
                    },
                    {
                        title: "6. Cookies and Tracking",
                        content: (
                            <p>
                                We use essential and analytics cookies to enhance your browsing
                                experience. You can manage cookie preferences through your
                                browser settings or our consent manager.
                            </p>
                        ),
                    },
                    {
                        title: "7. Contact Us",
                        content: (
                            <>
                                <p>
                                    For questions about this Privacy Policy or data handling,
                                    please contact:
                                </p>
                                <address className="not-italic mt-3">
                                    <strong>Keekan Education</strong> <br />
                                    Email:{" "}
                                    <a
                                        href="mailto:privacy@keekan.com"
                                        className="text-blue-700 hover:underline"
                                    >
                                        privacy@keekan.com
                                    </a>
                                    <br />
                                    Website:{" "}
                                    <a
                                        href="https://universitiesforllm.com"
                                        className="text-blue-700 hover:underline"
                                    >
                                        universitiesforllm.com
                                    </a>
                                </address>
                            </>
                        ),
                    },
                ].map(({ title, content }, idx) => (
                    <div
                        key={idx}
                        className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-md p-8 border border-gray-100 hover:shadow-lg transition-all"
                    >
                        <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                            {title}
                        </h2>
                        <div className="text-gray-700 leading-relaxed">{content}</div>
                    </div>
                ))}
            </section>

            {/* Footer note */}
            <footer className="text-center text-gray-400 pb-12 text-sm">
                Last updated: <strong>October 2025</strong>
            </footer>
        </main>
    );
}
