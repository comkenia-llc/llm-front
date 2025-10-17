"use client";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock, MapPin, Globe, ArrowRight } from "lucide-react";

export default function EventCard({ event, base }) {
    const imageUrl = event.banner ? `${base}${event.banner}` : "/images/event-placeholder.jpg";

    return (
        <Link
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
                {event.isFeatured && (
                    <span className="absolute top-3 left-3 bg-pink-600 text-white text-xs px-2 py-1 rounded-full shadow">
                        Featured
                    </span>
                )}
            </div>

            {/* 📋 Details */}
            <div className="p-6 space-y-3">
                <h3 className="font-semibold text-xl text-blue-900 line-clamp-2">{event.title}</h3>

                {event.organizer && (
                    <p className="text-sm text-gray-500 italic">By {event.organizer}</p>
                )}

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

                <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Globe size={16} className="text-indigo-600" />
                    <span className="capitalize">{event.mode}</span>
                </div>

                {event.registrationLink && (
                    <a
                        href={event.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 text-sm font-semibold text-pink-600 hover:underline"
                    >
                        Register Now
                    </a>
                )}

                <div className="pt-3">
                    <span className="inline-flex items-center gap-1 text-pink-600 font-semibold group-hover:gap-2 transition-all">
                        Learn More <ArrowRight size={16} />
                    </span>
                </div>
            </div>
        </Link>
    );
}
