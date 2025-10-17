export const dynamic = "force-static";
export const revalidate = false;

import Image from "next/image";

export const metadata = {
    title: "Terms & Conditions | Universities for LLM",
    description:
        "Read the official Terms and Conditions of Universities for LLM — powered by Keekan Education — detailing user rights, content policies, and service guidelines.",
    alternates: { canonical: "https://universitiesforllm.com/terms" },
    openGraph: {
        title: "Terms & Conditions | Universities for LLM",
        description:
            "Review the terms of use, content policies, and legal obligations for using Universities for LLM.",
        images: [
            {
                url: "/images/terms-og.jpg",
                width: 1200,
                height: 630,
                alt: "Terms and Conditions - Universities for LLM",
            },
        ],
    },
};

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-[#010b59] via-[#0a166e] to-[#0a1040] text-gray-800 selection:bg-pink-200">
            {/* 🌈 Hero Section */}
            <section className="relative py-20 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#f613a3]/40 via-transparent to-[#9deff9]/30 backdrop-blur-md" />
                <div className="relative z-10 max-w-4xl mx-auto px-6">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 drop-shadow-xl">
                        Terms & Conditions
                    </h1>
                    <p className="text-white/90 max-w-2xl mx-auto text-lg leading-relaxed">
                        Please read these terms carefully before using our website or
                        services.
                    </p>
                </div>
            </section>

            {/* 📜 Terms Body */}
            <section className="max-w-5xl mx-auto px-6 py-12 space-y-16">
                {[
                    {
                        title: "1. Introduction",
                        content: (
                            <p>
                                Welcome to <strong>Universities for LLM</strong>, a platform
                                powered by <strong>Keekan Education</strong>. By accessing or
                                using our website, you agree to these Terms & Conditions. If you
                                do not agree, you must discontinue using the platform.
                            </p>
                        ),
                    },
                    {
                        title: "2. Eligibility",
                        content: (
                            <p>
                                You must be at least 16 years old to use this website. By using
                                our services, you confirm that all information provided is
                                accurate and that you have the authority to agree to these
                                terms.
                            </p>
                        ),
                    },
                    {
                        title: "3. Use of Our Services",
                        content: (
                            <ul className="list-disc pl-6 space-y-2">
                                <li>
                                    Do not misuse or attempt to disrupt the website through
                                    hacking, scraping, or unauthorized access.
                                </li>
                                <li>
                                    You may not copy, modify, or distribute any part of our
                                    platform without prior written consent.
                                </li>
                                <li>
                                    You are responsible for maintaining the confidentiality of
                                    your account credentials.
                                </li>
                            </ul>
                        ),
                    },
                    {
                        title: "4. Content Ownership",
                        content: (
                            <p>
                                All logos, data, text, software, and media available on this
                                site are the intellectual property of{" "}
                                <strong>Keekan Education</strong> and its licensors. You may not
                                reuse or republish materials without permission.
                            </p>
                        ),
                    },
                    {
                        title: "5. User-Generated Content",
                        content: (
                            <>
                                <p className="mb-4">
                                    Users may contribute reviews, comments, or academic
                                    information. By doing so, you grant{" "}
                                    <strong>Keekan Education</strong> a non-exclusive,
                                    royalty-free license to use, reproduce, and display your
                                    contributions on our platform.
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Do not post false or misleading content.</li>
                                    <li>Do not upload copyrighted material you don’t own.</li>
                                    <li>
                                        Keekan reserves the right to remove content that violates
                                        these terms.
                                    </li>
                                </ul>
                            </>
                        ),
                    },
                    {
                        title: "6. Limitation of Liability",
                        content: (
                            <p>
                                We strive to ensure that all information is accurate and
                                up-to-date; however, <strong>Keekan Education</strong> makes no
                                warranties regarding completeness or reliability. We shall not
                                be liable for any indirect or consequential damages arising from
                                your use of the platform.
                            </p>
                        ),
                    },
                    {
                        title: "7. Third-Party Links",
                        content: (
                            <p>
                                Our website may contain links to external institutions or
                                partners. We are not responsible for the content, privacy
                                policies, or practices of any third-party websites.
                            </p>
                        ),
                    },
                    {
                        title: "8. Termination",
                        content: (
                            <p>
                                We reserve the right to suspend or terminate access to our
                                services if you violate these Terms or engage in fraudulent,
                                abusive, or unlawful behavior.
                            </p>
                        ),
                    },
                    {
                        title: "9. Changes to These Terms",
                        content: (
                            <p>
                                We may update these Terms periodically to reflect changes in our
                                services or legal obligations. Updated versions will be posted
                                here with the revised date.
                            </p>
                        ),
                    },
                    {
                        title: "10. Contact Us",
                        content: (
                            <address className="not-italic text-gray-700 leading-relaxed">
                                <p>
                                    For any questions regarding these Terms & Conditions, contact:
                                </p>
                                <strong>Keekan Education</strong>
                                <br />
                                Email:{" "}
                                <a
                                    href="mailto:legal@keekan.com"
                                    className="text-blue-700 hover:underline"
                                >
                                    legal@keekan.com
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
