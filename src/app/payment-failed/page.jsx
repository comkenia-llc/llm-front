export default function PaymentFailed() {
    return (
        <div className="flex flex-col items-center justify-center h-[80vh] text-center">
            <h1 className="text-3xl font-bold text-red-600 mb-3">❌ Payment Failed</h1>
            <p className="text-gray-600 max-w-md">
                Your payment could not be processed. Please try again later.
            </p>
        </div>
    );
}
