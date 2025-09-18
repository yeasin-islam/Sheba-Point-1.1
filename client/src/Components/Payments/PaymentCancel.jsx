import React from "react";
import { Slash } from "lucide-react";

export default function PaymentCancel() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
        {/* Cancel Icon */}
        <Slash className="mx-auto text-yellow-500 w-16 h-16 mb-4" />

        {/* Title */}
        <h1 className="text-2xl font-bold mb-2">Payment Cancelled</h1>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          You have cancelled the payment process. No charges were made.
        </p>

        {/* Optional info */}
        <div className="text-gray-500 text-sm mb-6">
          You can try booking again anytime.
        </div>

        {/* Retry CTA */}
        <button
          onClick={() => (window.location.href = "/")}
          className="btn btn-primary w-full"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
