export const metadata = {
    title: "Login | Universities for LLM",
    description:
        "Access your Universities for LLM account powered by Keekan Education. Manage applications, save universities, and explore top LLM programs worldwide.",
    alternates: { canonical: "https://universitiesforllm.com/login" },
    openGraph: {
        title: "Login | Universities for LLM",
        description:
            "Sign in to Universities for LLM to explore postgraduate law programs and scholarship opportunities globally.",
        images: [
            {
                url: "/images/login-og.jpg",
                width: 1200,
                height: 630,
                alt: "Login - Universities for LLM",
            },
        ],
    },
};

import LoginClient from "./LoginClient";

export default function LoginPage() {
    return <LoginClient />;
}
