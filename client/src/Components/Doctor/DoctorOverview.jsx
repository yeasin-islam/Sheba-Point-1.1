import { ShieldCheck, Languages, Clock, Star } from "lucide-react";
import DoctorAvailabilityCompact from "./DoctorAvailabilityCompact";
import { useState, useEffect } from "react";
import DoctorAbout from "./DoctorAbout";

function OverviewSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 animate-pulse">
      <div className="bg-base-100 shadow rounded-xl p-6 space-y-3">
        <div className="h-5 w-32 bg-base-300 rounded"></div>
        <div className="h-4 w-48 bg-base-300 rounded"></div>
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-base-300 rounded-full"></div>
          <div className="h-6 w-20 bg-base-300 rounded-full"></div>
        </div>
      </div>
      <div className="bg-base-100 shadow rounded-xl p-6 space-y-3">
        <div className="h-5 w-24 bg-base-300 rounded"></div>
        <div className="h-4 w-40 bg-base-300 rounded"></div>
        <div className="flex gap-2">
          <div className="h-6 w-14 bg-base-300 rounded-full"></div>
          <div className="h-6 w-18 bg-base-300 rounded-full"></div>
        </div>
      </div>
      <div className="md:col-span-2 bg-base-100 shadow rounded-xl p-6 space-y-3">
        <div className="h-5 w-40 bg-base-300 rounded"></div>
        <div className="h-4 w-64 bg-base-300 rounded"></div>
        <div className="flex gap-2">
          <div className="h-8 w-24 bg-base-300 rounded"></div>
          <div className="h-8 w-24 bg-base-300 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export default function DoctorOverview({ doctor }) {
  const [loading, setLoading] = useState(!doctor);

  useEffect(() => {
    if (doctor) {
      const t = setTimeout(() => setLoading(false), 400);
      return () => clearTimeout(t);
    }
  }, [doctor]);

  if (loading) return <OverviewSkeleton />;

  return (
    <div className="grid gap-6 md:grid-cols-2 animate-fadeIn">
      {/* Clinical Focus */}
      <div className="bg-base-100 shadow rounded-xl p-6 hover:shadow-md transition">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-primary" /> Clinical Focus
        </h3>
        <p className="text-sm text-base-content/60 mb-3">
          Primary areas of expertise
        </p>
        <div className="flex flex-wrap gap-2">
          {doctor.specialties.map((s) => (
            <span
              key={s}
              className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="bg-base-100 shadow rounded-xl p-6 hover:shadow-md transition">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Languages className="h-5 w-5 text-primary" /> Languages
        </h3>
        <p className="text-sm text-base-content/60 mb-3">
          Communication comfort
        </p>
        <div className="flex flex-wrap gap-2">
          {doctor.languages.map((lang) => (
            <span
              key={lang}
              className="px-3 py-1 rounded-full border border-base-300 text-sm text-base-content hover:bg-base-200 transition capitalize"
            >
              {lang}
            </span>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="md:col-span-2 bg-base-100 shadow rounded-xl p-6 hover:shadow-md transition">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" /> Next Available Slots
        </h3>
        <p className="text-sm text-base-content/60 mb-3">
          Book a time that works for you
        </p>
        <DoctorAvailabilityCompact doctor={doctor} />
        <DoctorAbout doctor={doctor}/>
      </div>
    </div>
  );
}
