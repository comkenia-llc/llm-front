import Image from "next/image";
import { MapPin } from "lucide-react";
import Link from "next/link";
import FavoriteButton from "./FavoriteButton";

export default function UniversityHeader({ uni }) {
    const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    const verified = uni.status === "approved";

    const banner =
        uni.banner && uni.banner.startsWith("/uploads")
            ? `${base}${uni.banner}`
            : "/images/placeholder-banner.jpg";

    return (
        <section className="relative w-full bg-gradient-to-b from-blue-50 to-white overflow-hidden">
            <div className="relative w-full h-[220px] sm:h-[280px] md:h-[360px] lg:h-[420px]">
                <Image
                    src={banner}
                    alt={`${uni.name} banner`}
                    fill
                    priority
                    className="object-cover brightness-[0.9]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <FavoriteButton />
            </div>

            {/* Info Card */}
            <div className="relative z-30 max-w-6xl mx-auto -mt-14 sm:-mt-20 px-4">
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/40 p-5 sm:p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shadow-md ring-1 ring-gray-100 flex-shrink-0">
                        <Image
                            src={
                                uni.logo && uni.logo.startsWith("/uploads")
                                    ? `${base}${uni.logo}`
                                    : "/images/university-placeholder.png"
                            }
                            alt={`${uni.name} logo`}
                            fill
                            sizes="120px"
                            priority
                            className="object-cover"
                        />
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center justify-center md:justify-start gap-1 flex-wrap">
                            {uni.name}
                            {verified && (
                                <Image
                                    src="/icons/approved.webp"
                                    alt="Verified"
                                    width={28}
                                    height={28}
                                />
                            )}
                        </h1>

                        <p className="flex items-center justify-center md:justify-start gap-1 text-sm sm:text-base text-gray-600 mt-1">
                            <MapPin size={15} className="text-blue-600" />
                            {uni.location?.city || "—"}, {uni.location?.country || ""}
                        </p>

                        <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
                            {uni.website && (
                                <Link
                                    href={uni.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm sm:text-[15px] px-5 py-2 rounded-full font-medium shadow-md hover:from-blue-700 hover:to-blue-600 transition"
                                >
                                    Visit Website
                                </Link>
                            )}
                            <button className="text-blue-600 text-sm sm:text-[15px] hover:underline font-medium">
                                Read Reviews
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
