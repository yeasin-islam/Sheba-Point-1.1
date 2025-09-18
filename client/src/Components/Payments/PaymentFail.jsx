import React from "react";
import { XCircle } from "lucide-react";

export default function PaymentFail() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
        {/* Fail Icon */}
        <XCircle className="mx-auto text-red-500 w-16 h-16 mb-4" />

        {/* Title */}
        <h1 className="text-2xl font-bold mb-2">Payment Failed!</h1>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          Something went wrong with your payment. Please try again.
        </p>

        {/* Optional info */}
        <div className="text-gray-500 text-sm mb-6">
          If the issue persists, contact support.
        </div>

        {/* Retry CTA */}
        <button
          onClick={() => (window.location.href = "/")}
          className="btn btn-primary w-full"
        >
          Retry Payment
        </button>
      </div>
    </div>
  );
}
