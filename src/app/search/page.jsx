"use client";

import { Suspense } from "react";
import SearchPageContent from "./SearchPageContent";

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="text-center py-20 text-gray-500">Loading search...</div>}>
            <SearchPageContent />
        </Suspense>
    );
}
