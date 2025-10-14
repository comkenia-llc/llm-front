"use client";
import { Heart } from "lucide-react";

export default function FavoriteButton() {
    return (
        <button
            title="Add to favorites"
            className="absolute top-4 right-4 z-30 backdrop-blur-md bg-white/30 hover:bg-white/60 text-gray-800 p-2 rounded-full shadow-md transition"
        >
            <Heart className="w-5 h-5 text-white drop-shadow-sm" />
        </button>
    );
}
