import { Video, Stethoscope } from "lucide-react";
import DoctorQuickBook from "./DoctorQuickBook";

export default function DoctorPricingCard({ doctor }) {
  return (
    <div className="bg-base-100 rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300 p-6 flex flex-col gap-6">
      
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-xl font-bold tracking-tight text-primary">
          Consultation Fees
        </h2>
        <p className="text-sm text-base-content/70">
          Transparent & upfront pricing
        </p>
      </div>

      {/* Fees Details */}
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 rounded-xl bg-base-200 shadow-inner">
          <span className="flex items-center gap-2 font-medium">
            <Video className="h-5 w-5 text-primary" /> Video Consult
          </span>
          <span className="font-semibold text-base-content">
            ৳ {doctor?.consultationFee}
          </span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-xl bg-base-200 shadow-inner">
          <span className="flex items-center gap-2 font-medium">
            <Stethoscope className="h-5 w-5 text-primary" /> In‑Person
          </span>
          <span className="font-semibold text-base-content">৳ +200</span>
        </div>

        <div className="border-t border-base-300 my-2"></div>

        <div className="flex items-center justify-between text-sm text-base-content/70">
          <span>Follow-up within 7 days</span>
          <span className="font-medium">Free</span>
        </div>
      </div>

      {/* Call to Action */}
      <DoctorQuickBook
        doctor={doctor}
        variant="primary"
        className="mt-4 w-full rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
      />
    </div>
  );
}
