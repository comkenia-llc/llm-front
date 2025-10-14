import DisciplinesListClient from "./DisciplinesListClient";

export const metadata = {
    title: "Explore Academic Disciplines | Keekan Education",
    description:
        "Browse all academic disciplines including Law, Medicine, Business, Engineering, and more. Find top programs and universities by field of study.",
    openGraph: {
        title: "Explore Academic Disciplines | Keekan Education",
        description:
            "Discover top disciplines, programs, and universities across the world.",
        url: "https://edu.keekan.com/disciplines",
        images: [
            {
                url: "/images/og-disciplines.jpg",
                width: 1200,
                height: 630,
                alt: "Academic Disciplines",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Explore Academic Disciplines | Keekan Education",
        description:
            "Find programs and universities by discipline — law, medicine, and more.",
        images: ["/images/og-disciplines.jpg"],
    },
};

export default function DisciplinesPage() {
    return <DisciplinesListClient />;
}
