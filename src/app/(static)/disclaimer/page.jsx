export const metadata = {
    title: "Disclaimer | Universities for LLM | Keekan Education",
    description:
        "Official disclaimer for Universities for LLM, a Keekan Education platform. Learn about our responsibilities, information accuracy, and third-party content policy.",
    alternates: { canonical: "https://universitiesforllm.com/disclaimer" },
    openGraph: {
        title: "Disclaimer | Universities for LLM",
        description:
            "Understand the terms and limitations of the information provided by Keekan Education on Universities for LLM.",
        images: [
            {
                url: "/images/disclaimer-og.jpg",
                width: 1200,
                height: 630,
                alt: "Disclaimer - Universities for LLM",
            },
        ],
    },
};

export default function DisclaimerPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-[#010b59] via-[#0a166e] to-[#0a1040] relative overflow-hidden text-gray-800 selection:bg-pink-200">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#f613a3]/30 via-transparent to-[#9deff9]/30 blur-3xl" />

            <section className="relative z-10 max-w-5xl mx-auto px-6 py-20">
                <h1 className="text-4xl sm:text-5xl font-bold text-center text-white mb-10">
                    Disclaimer
                </h1>

                <div className="bg-white/90 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg p-8 text-gray-700 leading-relaxed space-y-6">
                    <p>
                        The information provided on{" "}
                        <strong>Universities for LLM</strong> (a platform operated by{" "}
                        <strong>Keekan Education</strong>) is intended for general
                        informational purposes only. While we strive to ensure accuracy and
                        relevance, we make no representations or warranties of any kind,
                        express or implied, about the completeness, reliability, or
                        suitability of the information for any particular purpose.
                    </p>

                    <h2 className="text-xl font-semibold text-blue-900">
                        Academic Information
                    </h2>
                    <p>
                        Program details, rankings, scholarships, and university profiles
                        listed on our website are gathered from publicly available data and
                        partner institutions. Changes to course structures, tuition fees,
                        or application deadlines may occur without prior notice. Students
                        are strongly encouraged to verify all academic information directly
                        with the respective universities.
                    </p>

                    <h2 className="text-xl font-semibold text-blue-900">
                        Professional and Legal Disclaimer
                    </h2>
                    <p>
                        Keekan Education is not a university, government body, or legal
                        authority. The content available on this website does not constitute
                        legal advice, admission guarantees, or contractual obligations.
                        Users should consult with qualified advisors or official
                        representatives before making educational, immigration, or financial
                        decisions.
                    </p>

                    <h2 className="text-xl font-semibold text-blue-900">
                        External Links Disclaimer
                    </h2>
                    <p>
                        Our platform may contain links to external websites that are not
                        maintained or controlled by Keekan Education. We do not endorse or
                        assume responsibility for the content, privacy practices, or
                        reliability of these third-party sites.
                    </p>

                    <h2 className="text-xl font-semibold text-blue-900">
                        Affiliate & Advertising Disclosure
                    </h2>
                    <p>
                        Universities for LLM participates in affiliate and advertising
                        partnerships. When you click on certain links or engage with
                        promotional content, we may earn a commission. This helps support
                        our platform at no additional cost to you. We always strive to
                        maintain transparency and editorial independence in all listings and
                        recommendations.
                    </p>

                    <h2 className="text-xl font-semibold text-blue-900">
                        Limitation of Liability
                    </h2>
                    <p>
                        Under no circumstance shall Keekan Education or its affiliates be
                        held liable for any loss or damage, including without limitation,
                        indirect or consequential loss arising out of, or in connection with,
                        the use of this website or reliance on the information provided
                        herein.
                    </p>

                    <h2 className="text-xl font-semibold text-blue-900">
                        Consent & Updates
                    </h2>
                    <p>
                        By using our website, you hereby consent to our disclaimer and agree
                        to its terms. Keekan Education reserves the right to update or
                        modify this disclaimer at any time without prior notice. The updated
                        version will be posted on this page with a revised date.
                    </p>

                    <p className="pt-4 text-sm text-gray-600">
                        Last updated: {new Date().toLocaleDateString("en-GB", {
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
