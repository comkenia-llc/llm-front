export const metadata = {
    title: "Register | Universities for LLM",
    description:
        "Create your account on Universities for LLM — powered by Keekan Education — to explore top LLM programs, scholarships, and law universities worldwide.",
    alternates: { canonical: "https://universitiesforllm.com/register" },
    openGraph: {
        title: "Register | Universities for LLM",
        description:
            "Join Universities for LLM to connect with global legal education opportunities and discover the best LLM programs for you.",
        images: [
            {
                url: "/images/register-og.jpg",
                width: 1200,
                height: 630,
                alt: "Register - Universities for LLM",
            },
        ],
    },
};

import RegisterClient from "./RegisterClient";

export default function RegisterPage() {
    return <RegisterClient />;
}
