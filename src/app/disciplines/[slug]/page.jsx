// import Hero from "@/app/components/Hero";
import DisciplineDetailClient from "./DisciplineDetailClient";


export async function generateMetadata({ params }) {
    const resolvedParams = await params; // ✅ wait for params to resolve
    const slug = resolvedParams.slug;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/disciplines/${slug}`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        return {
            title: "Discipline Not Found | Keekan Education",
            description: "This discipline does not exist or was removed.",
        };
    }

    const data = await res.json();
    return {
        title: `${data.name} | Keekan Education`,
        description:
            data.description ||
            `Explore ${data.name} programs, universities, and scholarships worldwide.`,
        openGraph: {
            title: `${data.name} | Keekan Education`,
            description:
                data.description ||
                `Explore ${data.name} programs, universities, and scholarships worldwide.`,
            images: data.icon
                ? [{ url: `${process.env.NEXT_PUBLIC_API_URL}${data.icon}`, width: 600, height: 400 }]
                : [],
        },
    };
}


export default async function DisciplinePage({ params }) {
    const { slug } = await params;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/disciplines/${slug}`, {
        cache: "force-cache",
    });
    const discipline = res.ok ? await res.json() : null;

    return (
        <>
            {/* <Hero /> */}
            {/* 🧠 Static Header (SSR, visible instantly) */}
            <header className="relative h-64 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 flex items-center justify-center text-white text-center overflow-hidden">
                <div className="absolute inset-0 bg-black/30" />
                <div className="relative z-10 px-4 max-w-3xl mx-auto">
                    {discipline?.icon && (
                        <img
                            src={`${process.env.NEXT_PUBLIC_API_URL}${discipline.icon}`}
                            alt={discipline.name}
                            className="w-16 h-16 mx-auto mb-3 rounded-full border-2 border-white shadow-md"
                        />
                    )}
                    <h1 className="text-4xl font-bold mb-2">
                        {discipline?.name || "Discipline"}
                    </h1>
                    <p className="text-white/90 text-sm leading-relaxed">
                        {discipline?.description ||
                            "Explore top programs and universities under this field."}
                    </p>
                </div>
            </header>

            {/* 👇 Client-Side Content Loads After */}
            <DisciplineDetailClient slug={slug} />
        </>
    );
}
