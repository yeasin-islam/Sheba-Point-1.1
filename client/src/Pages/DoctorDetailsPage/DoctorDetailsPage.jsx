import { useEffect, useState } from "react";
import { useParams } from "react-router";
import DoctorProfile from "../../components/Doctor/DoctorProfile";
import DoctorSidebar from "../../components/Doctor/DoctorSidebar";
import DoctorQuickBook from "../../components/Doctor/DoctorQuickBook";
import { fetchDoctorById } from "../../utils/doctorUtils";
import DoctorDetailsSkeleton from "../../components/Doctor/DoctorDetailsSkeleton";
import DoctorFeedback from "../../components/Doctor/DoctorFeedback";

export default function DoctorDetailsPage() {
  const { id } = useParams();  
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔝 Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const d = await fetchDoctorById(id);
        setDoctor(d);
      } catch (e) {
        setError(e?.message ?? "Failed to load doctor");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (error) 
    return <div className="flex justify-center items-center min-h-screen text-red-600">{error}</div>;

  if (loading || !doctor) return <DoctorDetailsSkeleton />;

  return (
    <div className="min-h-screen bg-base-100">
      <main className="mx-auto grid container grid-cols-1 gap-6 px-4 py-6 md:grid-cols-3 md:py-10">
        <DoctorProfile doctor={doctor} />
        <DoctorSidebar doctor={doctor} />
      </main>

      {/* Mobile sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-base-100 p-3 shadow-2xl md:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm">
            <span className="h-4 w-4 bg-yellow-300 rounded-full animate-pulse"></span>
            <span className="font-medium">{doctor.ratings.toFixed(1)}</span>
            <span className="text-base-content/70">({doctor.totalReviews})</span>
          </div>
          <DoctorQuickBook doctor={doctor} size="lg" className="flex-1" />
        </div>
      </div>
      <DoctorFeedback></DoctorFeedback>
    </div>
  );
}
