"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Heart, User, Rocket, Menu, X, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
    const [query, setQuery] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const { user, logout } = useAuth();

    // Close user dropdown on outside click
    useEffect(() => {
        const handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("click", handler);
        return () => document.removeEventListener("click", handler);
    }, []);

    const hasCustomAvatar =
        user?.avatar &&
        user.avatar !== "/uploads/users/default-avatar.png" &&
        user.avatar !== "default-avatar.png";

    const avatarSrc = hasCustomAvatar
        ? `${process.env.NEXT_PUBLIC_API_URL.replace("/api", "")}${user.avatar}`
        : "/images/avatar.webp";


    return (
        <header className="w-full border-b border-blue-900/10 bg-white shadow-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3">
                {/* Left: Logo */}
                <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-700">
                    {/* StudyPortal */}
                    <div className="relative w-40 h-14">
                        <Image
                            src="/logo.webp"
                            alt="Universities for LLM"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>

                </Link>

                {/* Center (Desktop only): Discover + Search */}
                <div className="hidden lg:flex flex-1 items-center justify-center gap-4 px-6">
                    <Link
                        href="/discover"
                        className="flex items-center gap-2 text-gray-800 hover:text-blue-700"
                    >
                        <Rocket className="h-5 w-5 text-blue-800" />
                        <span className="font-medium">Discover</span>
                    </Link>

                    <div className="flex w-full max-w-md items-center rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-blue-500">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search universities or programs..."
                            className="w-full rounded-l-md bg-gray-100 px-4 py-2 text-sm text-gray-700 focus:outline-none"
                        />
                        <button className="rounded-r-md bg-red-500 p-2 hover:bg-red-600">
                            <Search className="h-5 w-5 text-white" />
                        </button>
                    </div>
                </div>

                {/* Right (Desktop only) */}
                <div className="hidden lg:flex items-center gap-6">
                    <Link
                        href="/favourites"
                        className="flex items-center gap-2 text-gray-800 hover:text-blue-700"
                    >
                        <Heart className="h-5 w-5" />
                        <span className="text-sm font-medium">Favourites</span>
                    </Link>

                    {user ? (
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="flex items-center cursor-pointer gap-2 focus:outline-none"
                            >
                                <Image
                                    src={avatarSrc}
                                    alt="Profile"
                                    width={32}
                                    height={32}
                                    className="rounded-full border border-gray-200 object-cover"
                                />


                                <span className="text-sm font-medium text-gray-800">
                                    {user.firstName}
                                </span>
                            </button>

                            {menuOpen && (
                                <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg border border-gray-100 py-2 z-50">
                                    <Link
                                        href="/profile"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                    >
                                        View Profile
                                    </Link>

                                    <Link
                                        href="/dashboard"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={() => logout()}
                                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="flex items-center gap-2 text-gray-800 hover:text-blue-700"
                        >
                            <User className="h-5 w-5" />
                            <span className="text-sm font-medium">Register / Log in</span>
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="lg:hidden p-2 rounded-md hover:bg-gray-100"
                >
                    {mobileMenuOpen ? (
                        <X className="h-6 w-6 text-gray-800" />
                    ) : (
                        <Menu className="h-6 w-6 text-gray-800" />
                    )}
                </button>
            </div>

            {/* Mobile Menu (Slide Down) */}
            {mobileMenuOpen && (
                <div className="lg:hidden border-t border-gray-100 bg-white shadow-md">
                    <div className="flex flex-col px-4 py-4 space-y-4">
                        {/* Search Bar */}
                        <div className="flex w-full items-center rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-blue-500">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search anything"
                                className="w-full rounded-l-md bg-gray-100 px-4 py-2 text-sm text-gray-700 focus:outline-none"
                            />
                            <button className="rounded-r-md bg-red-500 p-2 hover:bg-red-600">
                                <Search className="h-5 w-5 text-white" />
                            </button>
                        </div>

                        {/* Links */}
                        <Link
                            href="/discover"
                            className="flex items-center gap-2 text-gray-800 hover:text-blue-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <Rocket className="h-5 w-5 text-blue-800" />
                            <span className="font-medium">Discover</span>
                        </Link>

                        <Link
                            href="/favourites"
                            className="flex items-center gap-2 text-gray-800 hover:text-blue-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <Heart className="h-5 w-5 text-red-500" />
                            <span className="font-medium">Favourites</span>
                        </Link>

                        {user ? (
                            <>
                                <Link
                                    href={`/profile/${user.id}`}
                                    className="flex items-center gap-2 text-gray-800 hover:text-blue-700"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <User className="h-5 w-5" />
                                    <span className="font-medium">My Profile</span>
                                </Link>

                                <button
                                    onClick={() => {
                                        logout();
                                        setMobileMenuOpen(false);
                                    }}
                                    className="flex items-center gap-2 text-red-600 hover:text-red-700"
                                >
                                    <LogOut className="h-5 w-5" />
                                    <span className="font-medium">Logout</span>
                                </button>
                            </>
                        ) : (
                            <Link
                                href="/login"
                                className="flex items-center gap-2 text-gray-800 hover:text-blue-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <User className="h-5 w-5" />
                                <span className="font-medium">Register / Log in</span>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
