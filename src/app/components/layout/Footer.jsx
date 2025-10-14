"use client";
import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#000484] text-white">
            {/* Top Section */}
            <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                {/* Logo + Vision */}
                <div className="sm:col-span-2 md:col-span-1">
                    <h2 className="text-2xl font-bold mb-4">Logo</h2>
                    <p className="text-sm text-gray-200 leading-relaxed mb-6 max-w-sm">
                        Our vision is to provide convenience and help increase Studies.
                    </p>

                    {/* Social Links */}
                    <div className="flex space-x-4">
                        <Link
                            href="#"
                            className="bg-red-500 hover:bg-red-600 p-2 rounded-full transition"
                        >
                            <Facebook className="h-4 w-4 text-white" />
                        </Link>
                        <Link
                            href="#"
                            className="bg-red-500 hover:bg-red-600 p-2 rounded-full transition"
                        >
                            <Twitter className="h-4 w-4 text-white" />
                        </Link>
                        <Link
                            href="#"
                            className="bg-red-500 hover:bg-red-600 p-2 rounded-full transition"
                        >
                            <Instagram className="h-4 w-4 text-white" />
                        </Link>
                    </div>
                </div>

                {/* Links Wrapper — 2 columns on small screens */}
                <div className="sm:col-span-2 grid grid-cols-2 gap-10 md:gap-16">
                    {/* About Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">About</h3>
                        <ul className="space-y-2 text-sm text-gray-200">
                            <li>
                                <Link
                                    href="/how-it-works"
                                    className="hover:text-red-400 transition"
                                >
                                    How it works
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/featured"
                                    className="hover:text-red-400 transition"
                                >
                                    Featured
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/partnership"
                                    className="hover:text-red-400 transition"
                                >
                                    Partnership
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/business-relation"
                                    className="hover:text-red-400 transition"
                                >
                                    Business Relation
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Community Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Community</h3>
                        <ul className="space-y-2 text-sm text-gray-200">
                            <li>
                                <Link
                                    href="/events"
                                    className="hover:text-red-400 transition"
                                >
                                    Events
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/blog"
                                    className="hover:text-red-400 transition"
                                >
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/podcast"
                                    className="hover:text-red-400 transition"
                                >
                                    Podcast
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/invite"
                                    className="hover:text-red-400 transition"
                                >
                                    Invite a friend
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-white/20">
                <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-200">
                    <p>© {new Date().getFullYear()} Fast. All rights reserved</p>
                    <div className="flex items-center space-x-6 mt-3 sm:mt-0">
                        <Link
                            href="/privacy-policy"
                            className="hover:text-red-400 transition"
                        >
                            Privacy & Policy
                        </Link>
                        <Link
                            href="/terms"
                            className="hover:text-red-400 transition"
                        >
                            Terms & Condition
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
