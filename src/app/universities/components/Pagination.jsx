"use client";

export default function Pagination({ page, totalPages, onChange }) {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex justify-center gap-2 mt-8">
            <button
                disabled={page === 1}
                onClick={() => onChange(page - 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
            >
                ‹
            </button>
            {pages.map((p) => (
                <button
                    key={p}
                    onClick={() => onChange(p)}
                    className={`px-3 py-1 border rounded ${p === page ? "bg-blue-600 text-white border-blue-600" : ""
                        }`}
                >
                    {p}
                </button>
            ))}
            <button
                disabled={page === totalPages}
                onClick={() => onChange(page + 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
            >
                ›
            </button>
        </div>
    );
}
