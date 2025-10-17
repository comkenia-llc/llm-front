export const dynamic = "force-dynamic";
export const revalidate = 60;

import { CalendarDays, Clock, MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: "Upcoming Events | Universities for LLM",
    description:
        "Join webinars, student fairs, and university events powered by Keekan Education. Connect with top law schools and explore global opportunities.",
    alternates: { canonical: "https://universitiesforllm.com/events" },
    openGraph: {
        title: "Upcoming Events | Universities for LLM",
        description:
            "Discover upcoming webinars, open houses, and international events for LLM aspirants worldwide.",
        images: [
            {
                url: "/images/events-og.jpg",
                width: 1200,
                height: 630,
                alt: "Events - Universities for LLM",
            },
        ],
    },
};

export default async function EventsPage() {
    const base = process.env.NEXT_PUBLIC_API_URL || "https://back.universitiesforllm.com";

    let events = [];
    try {
        const res = await fetch(`${base}/api/events?status=published&limit=9`, {
            cache: "no-store",
        });
        const data = await res.json();
        events = data.items || data || [];
    } catch (err) {
        console.error("❌ Error fetching events:", err);
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-[#010b59] via-[#0a166e] to-[#0a1040] text-gray-100">
            {/* 🎓 Hero */}
            <section className="relative py-20 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#f613a3]/40 via-transparent to-[#9deff9]/30 backdrop-blur-md" />
                <div className="relative z-10 max-w-3xl mx-auto px-6">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 drop-shadow-xl">
                        Upcoming Events & Webinars
                    </h1>
                    <p className="text-white/90 text-lg leading-relaxed">
                        Explore upcoming law fairs, open days, and webinars organized by{" "}
                        <strong>Keekan Education</strong> in collaboration with top global universities.
                    </p>
                </div>
            </section>

            {/* 🗓️ Events Grid */}
            <section className="max-w-6xl mx-auto px-6 py-20">
                {events.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {events.map((event) => {
                            const imageUrl = event.banner
                                ? `${base}${event.banner}`
                                : "/images/event-placeholder.jpg";
                            return (
                                <Link
                                    key={event.id}
                                    href={`/events/${event.slug}`}
                                    className="group relative rounded-2xl overflow-hidden bg-white text-gray-800 border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
                                >
                                    {/* 🖼️ Banner */}
                                    <div className="relative h-48 w-full">
                                        <Image
                                            src={imageUrl}
                                            alt={event.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    </div>

                                    {/* 📋 Details */}
                                    <div className="p-6 space-y-3">
                                        <h3 className="font-semibold text-xl text-blue-900 line-clamp-2">
                                            {event.title}
                                        </h3>
                                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                                            <CalendarDays size={16} className="text-pink-600" />
                                            <span>
                                                {new Date(event.date).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                                            <Clock size={16} className="text-blue-600" />
                                            <span>{event.time || "TBA"}</span>
                                        </div>
                                        {event.location && (
                                            <div className="flex items-center gap-2 text-gray-600 text-sm">
                                                <MapPin size={16} className="text-green-600" />
                                                <span>{event.location}</span>
                                            </div>
                                        )}

                                        <div className="pt-3">
                                            <span className="inline-flex items-center gap-1 text-pink-600 font-semibold group-hover:gap-2 transition-all">
                                                Learn More <ArrowRight size={16} />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center text-white/80 py-20">
                        <p className="text-lg">No upcoming events at the moment.</p>
                        <p className="text-sm text-white/60">
                            Please check back later — new webinars are added weekly.
                        </p>
                    </div>
                )}
            </section>

            {/* 💡 CTA */}
            <section className="relative py-24 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#f613a3]/40 via-transparent to-[#9deff9]/40" />
                <div className="relative z-10 max-w-3xl mx-auto px-6">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Want to Host an Event?
                    </h2>
                    <p className="text-white/80 mb-8 text-lg leading-relaxed">
                        Collaborate with <strong>Keekan Education</strong> to host global webinars or open
                        house events for international students.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-all"
                    >
                        Contact Events Team
                    </Link>
                </div>
            </section>

        </main>
    );
}
