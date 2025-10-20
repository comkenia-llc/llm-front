export const metadata = {
    title: "DMCA Notice | Universities for LLM | Keekan Education",
    description:
        "Submit a Digital Millennium Copyright Act (DMCA) notice to Keekan Education if you believe your copyrighted work has been used on Universities for LLM without authorization.",
    alternates: { canonical: "https://universitiesforllm.com/dmca" },
    openGraph: {
        title: "DMCA Takedown Policy | Universities for LLM",
        description:
            "Learn how to file a DMCA notice or counter-notice with Keekan Education in compliance with U.S. copyright law.",
        images: [
            {
                url: "/images/dmca-og.jpg",
                width: 1200,
                height: 630,
                alt: "DMCA Policy - Universities for LLM",
            },
        ],
    },
};

export default function DmcaPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-[#010b59] via-[#0a166e] to-[#0a1040] relative overflow-hidden text-gray-800 selection:bg-pink-200">
            <div className="absolute inset-0 bg-gradient-to-br from-[#f613a3]/30 via-transparent to-[#9deff9]/30 blur-3xl" />

            <section className="relative z-10 max-w-5xl mx-auto px-6 py-20">
                <h1 className="text-4xl sm:text-5xl font-bold text-center text-white mb-10">
                    DMCA Notice & Takedown Policy
                </h1>

                <div className="bg-white/90 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg p-8 text-gray-700 leading-relaxed space-y-6">
                    <p>
                        <strong>Keekan Education</strong> respects the intellectual property
                        rights of others and expects users of{" "}
                        <strong>Universities for LLM</strong> to do the same. This policy
                        describes how to notify us of alleged copyright infringement in
                        accordance with the <strong>Digital Millennium Copyright Act
                            (DMCA)</strong>.
                    </p>

                    <h2 className="text-xl font-semibold text-blue-900">
                        Filing a DMCA Notice
                    </h2>
                    <p>
                        If you believe that your copyrighted material has been used or
                        displayed on our website without authorization, please submit a
                        written DMCA notice that includes the following:
                    </p>

                    <ul className="list-decimal pl-6 space-y-2">
                        <li>
                            A physical or electronic signature of the copyright owner or an
                            authorized representative.
                        </li>
                        <li>
                            Identification of the copyrighted work claimed to have been
                            infringed.
                        </li>
                        <li>
                            The exact URL or location of the infringing material on our
                            website.
                        </li>
                        <li>
                            Your contact information, including name, address, phone number,
                            and email.
                        </li>
                        <li>
                            A statement that you have a good-faith belief that the disputed
                            use is not authorized by the copyright owner, its agent, or the
                            law.
                        </li>
                        <li>
                            A statement that the information provided in the notice is
                            accurate and that, under penalty of perjury, you are authorized to
                            act on behalf of the copyright owner.
                        </li>
                    </ul>

                    <p>
                        Send your DMCA notice to our designated agent at:
                        <br />
                        <strong>Email:</strong> dmca@universitiesforllm.com
                    </p>

                    <h2 className="text-xl font-semibold text-blue-900">
                        Counter-Notification
                    </h2>
                    <p>
                        If you believe that your content was removed in error, you may file
                        a counter-notification. This notice must include:
                    </p>

                    <ul className="list-decimal pl-6 space-y-2">
                        <li>Your name, address, and telephone number.</li>
                        <li>
                            Identification of the material removed and its prior location.
                        </li>
                        <li>
                            A statement under penalty of perjury that you have a good-faith
                            belief the material was removed due to mistake or misidentification.
                        </li>
                        <li>
                            Your consent to the jurisdiction of the courts in your region for
                            legal resolution of the matter.
                        </li>
                    </ul>

                    <h2 className="text-xl font-semibold text-blue-900">
                        Repeat Infringement Policy
                    </h2>
                    <p>
                        Keekan Education reserves the right to suspend or terminate the
                        accounts of users who repeatedly infringe the copyrights or other
                        intellectual property rights of others.
                    </p>

                    <h2 className="text-xl font-semibold text-blue-900">
                        Changes to This Policy
                    </h2>
                    <p>
                        We may update this DMCA Policy periodically. Any modifications will
                        be posted on this page with a revised effective date.
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
