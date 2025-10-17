import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock, MapPin, Globe, Users } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const base = process.env.NEXT_PUBLIC_API_URL || "https://back.universitiesforllm.com";

    let event = {};
    try {
        const res = await fetch(`${base}/api/events/slug/${slug}`, { cache: "no-store" });
        event = await res.json();
    } catch (err) {
        console.error("❌ Metadata fetch error:", err);
    }

    return {
        title: `${event.title || "Event"} | Universities for LLM`,
        description:
            event.description?.slice(0, 150) ||
            "Event details for LLM aspirants worldwide.",
        alternates: { canonical: `https://universitiesforllm.com/events/${slug}` },
        openGraph: {
            title: event.title || "Upcoming Event",
            description: event.description || "Explore upcoming law events worldwide.",
            images: [
                {
                    url: event.banner
                        ? `${base}${event.banner}`
                        : "/images/event-placeholder.jpg",
                    width: 1200,
                    height: 630,
                    alt: event.title || "Event banner",
                },
            ],
        },
    };
}

export default async function EventDetailPage({ params: paramsPromise }) {
    const { slug } = await paramsPromise; // ✅ FIXED
    const base = process.env.NEXT_PUBLIC_API_URL || "https://back.universitiesforllm.com";

    let event = null;
    try {
        const res = await fetch(`${base}/api/events/slug/${slug}`, { cache: "no-store" });
        event = await res.json();
    } catch (err) {
        console.error("❌ Error fetching event detail:", err);
    }

    if (!event || !event.id) {
        return (
            <main className="min-h-screen flex items-center justify-center text-gray-300 bg-gradient-to-b from-[#010b59] via-[#0a166e] to-[#0a1040]">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold">Event Not Found</h1>
                    <Link href="/events" className="text-pink-500 hover:underline">
                        ← Back to Events
                    </Link>
                </div>
            </main>
        );
    }

    const bannerUrl = event.banner ? `${base}${event.banner}` : "/images/event-placeholder.jpg";

    return (
        <main className="min-h-screen bg-gradient-to-b from-[#010b59] via-[#0a166e] to-[#0a1040] text-white">
            {/* 🖼 Banner */}
            <section className="relative h-72 w-full overflow-hidden">
                <Image
                    src={bannerUrl}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-32 left-1/2 -translate-x-1/2 text-center">
                    <h1 className="text-xl sm:text-5xl font-bold drop-shadow-lg max-w-3xl px-4">
                        {event.title}
                    </h1>
                </div>
            </section>

            {/* 📝 Event Info */}
            <section className="max-w-4xl mx-auto px-6 py-16 space-y-10">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 border border-white/10">
                    <div className="flex items-center gap-3">
                        <CalendarDays className="text-pink-400" />
                        <span>
                            {new Date(event.date).toLocaleDateString("en-US", {
                                weekday: "short",
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Clock className="text-blue-400" />
                        <span>{event.time || "TBA"}</span>
                    </div>

                    {event.location && (
                        <div className="flex items-center gap-3">
                            <MapPin className="text-green-400" />
                            <span>{event.location}</span>
                        </div>
                    )}

                    <div className="flex items-center gap-3">
                        <Globe className="text-cyan-400" />
                        <span className="capitalize">{event.mode}</span>
                    </div>

                    {event.organizer && (
                        <div className="flex items-center gap-3 sm:col-span-2">
                            <Users className="text-yellow-400" />
                            <span>Organized by {event.organizer}</span>
                        </div>
                    )}
                </div>

                <article className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 leading-relaxed text-white/90 border border-white/10 prose prose-invert max-w-none">
                    {event.description ? (
                        <div dangerouslySetInnerHTML={{ __html: event.description }} />
                    ) : (
                        <p>No description available for this event.</p>
                    )}
                </article>

                {event.registrationLink && (
                    <div className="text-center mt-10">
                        <a
                            href={event.registrationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition"
                        >
                            Register Now
                        </a>
                    </div>
                )}

                <div className="text-center pt-10">
                    <Link
                        href="/events"
                        className="text-pink-400 hover:text-pink-300 transition underline"
                    >
                        ← Back to All Events
                    </Link>
                </div>
            </section>
        </main>
    );
}
