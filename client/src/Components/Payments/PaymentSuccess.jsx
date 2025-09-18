import React from "react";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
        {/* Success Icon */}
        <CheckCircle className="mx-auto text-green-500 w-16 h-16 mb-4" />
        
        {/* Title */}
        <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
        
        {/* Message */}
        <p className="text-gray-600 mb-6">
          Your appointment has been booked successfully. Thank you for choosing our service!
        </p>

        {/* Optional info or tips */}
        <div className="text-gray-500 text-sm mb-6">
          You can check your appointment details in the dashboard.
        </div>

        {/* CTA button */}
        <button
          onClick={() => (window.location.href = "/dashboard")}
          className="btn btn-primary w-full"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
