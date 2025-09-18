import { 
  MapPin, 
  Languages, 
  NotebookPen, 
  Star,
  ShieldCheck
} from "lucide-react";
import DoctorOverview from "./DoctorOverview";
import { getInitials } from "../../utils/doctorUtils";
import { useState, useEffect } from "react";

// Skeleton Loader
function DoctorProfileSkeleton() {
  return (
    <section className="md:col-span-2 animate-pulse">
      <div className="bg-base-100 shadow-2xl rounded-3xl overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center p-6 gap-6 bg-base-200">
          <div className="w-28 h-28 rounded-full bg-base-300"></div>
          <div className="flex-1 space-y-3">
            <div className="h-6 w-1/2 bg-base-300 rounded"></div>
            <div className="flex gap-2">
              <div className="h-5 w-20 bg-base-300 rounded"></div>
              <div className="h-5 w-16 bg-base-300 rounded"></div>
            </div>
            <div className="h-4 w-1/3 bg-base-300 rounded"></div>
          </div>
        </div>
        <div className="grid grid-cols-3 divide-x border-t">
          <div className="h-10 bg-base-300"></div>
          <div className="h-10 bg-base-300"></div>
          <div className="h-10 bg-base-300"></div>
        </div>
        <div className="p-6 space-y-2">
          <div className="h-4 w-3/4 bg-base-300 rounded"></div>
          <div className="h-4 w-2/3 bg-base-300 rounded"></div>
        </div>
      </div>
    </section>
  );
}

export default function DoctorProfile({ doctor }) {
  const [loading, setLoading] = useState(!doctor);

  useEffect(() => {
    if (doctor) {
      const timer = setTimeout(() => setLoading(false), 500); // smooth loading
      return () => clearTimeout(timer);
    }
  }, [doctor]);

  if (loading) return <DoctorProfileSkeleton />;

  return (
    <section className="md:col-span-2 animate-fadeIn">
      <div className="bg-gradient-to-br from-white to-gray-50 shadow-2xl rounded-3xl overflow-hidden">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center p-6 gap-6 bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="avatar relative">
            <div className="w-28 h-28 rounded-full overflow-hidden shadow-lg">
              {doctor.profileImage ? (
                <img 
                  src={doctor.profileImage} 
                  alt={doctor.name} 
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-neutral text-neutral-content text-2xl font-bold">
                  {getInitials(doctor.name)}
                </div>
              )}
            </div>
            {doctor.verified && (
              <div className="absolute bottom-1 right-1 bg-primary rounded-full p-1 shadow-md">
                <ShieldCheck className="h-4 w-4 text-white" />
              </div>
            )}
          </div>

          {/* Name + Trust */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              {doctor.name}
              {doctor.verified && (
                <span className="text-sm text-primary font-medium">(Verified)</span>
              )}
            </h1>

            <div className="flex flex-wrap items-center gap-2 mt-3">
              {doctor.specialties.map((s) => (
                <span 
                  key={s} 
                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium hover:bg-primary/30 transition"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-6 mt-4 flex-wrap text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="font-medium text-base">{doctor.ratings.toFixed(1)}</span>
                <span className="text-base-content/60">({doctor.totalReviews} reviews)</span>
              </div>
              <div className="flex items-center gap-1 text-base-content/70">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>{doctor.experienceYears} yrs experience</span>
              </div>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x bg-gray-50">
          <div className="flex items-center gap-2 p-4 text-sm text-base-content/80">
            <MapPin className="h-5 w-5 text-primary" /> {doctor.address}
          </div>
          <div className="flex items-center gap-2 p-4 text-sm text-base-content/80">
            <Languages className="h-5 w-5 text-primary" /> {doctor.languages.join(", ")}
          </div>
          <div className="flex items-center gap-2 p-4 text-sm text-base-content/80">
            <NotebookPen className="h-5 w-5 text-primary" /> {doctor.qualifications.join(", ")}
          </div>
        </div>

        {/* Overview Section */}
        <div className="p-6 bg-white">
          <DoctorOverview doctor={doctor} />
        </div>
      </div>
    </section>
  );
}
