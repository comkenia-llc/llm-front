"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function PaymentContent() {
    const searchParams = useSearchParams();
    const paymentId = searchParams.get("paymentId");

    return (
        <div className="p-10 text-center">
            <h1 className="text-2xl font-semibold text-green-600">Payment Successful 🎉</h1>
            <p className="mt-2 text-gray-700">Your Payment ID: {paymentId}</p>
        </div>
    );
}

export default function PaymentSuccess() {
    return (
        <Suspense fallback={<div className="text-center py-20">Loading payment info...</div>}>
            <PaymentContent />
        </Suspense>
    );
}
