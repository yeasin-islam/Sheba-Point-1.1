import { Star } from "lucide-react";

export default function DoctorReviews({ doctor }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Star className="h-6 w-6 text-yellow-500" />
        <div>
          <div className="text-lg font-semibold">{doctor.ratings.toFixed(1)}</div>
          <div className="text-sm text-base-content/70">Based on {doctor.totalReviews} reviews</div>
        </div>
      </div>
      <div className="card bg-base-100 shadow">
        <div className="card-body p-4">
          <p className="text-sm text-base-content/70">Reviews integration coming soon.</p>
        </div>
      </div>
    </div>
  );
}