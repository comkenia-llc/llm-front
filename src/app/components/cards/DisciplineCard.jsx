"use client";
import Link from "next/link";
import Image from "next/image";

export default function DisciplineCard({ discipline }) {
    const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    const { id, name, slug, description, icon } = discipline || {};

    const iconSrc =
        icon && icon.startsWith("/uploads")
            ? `${base}${icon}`
            : icon?.startsWith("http")
                ? icon
                : "/images/discipline-placeholder.png";

    return (
        <Link
            href={`/disciplines/${slug || id}`}
            className="group rounded-xl border bg-white shadow-sm hover:shadow-lg 
                hover:-translate-y-1 transition-all duration-300 flex flex-col items-center 
                text-center p-5"
        >
            <div className="w-20 h-20 mb-4 rounded-full bg-blue-50 flex items-center justify-center 
                overflow-hidden border border-blue-100">
                <Image
                    src={iconSrc}
                    alt={name || "Discipline"}
                    width={80}
                    height={80}
                    className="object-contain"
                />
            </div>
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 line-clamp-1">
                {name || "Untitled Discipline"}
            </h3>
            {description && (
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {description}
                </p>
            )}
        </Link>
    );
}
