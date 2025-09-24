import Swal from "sweetalert2";
import { useState, useMemo } from "react";
import { CalendarDays, Video, Stethoscope, X } from "lucide-react";
import {
  enumerateNextDays,
  isMatchingDay,
  expandSlotsToIntervals,
  to12h,
  weekdayName,
  classNames,
} from "../../utils/doctorUtils";
import useAxios from "../../Hooks/useAxios";

export default function DoctorQuickBook({
  doctor,
  size = "sm",
  variant = "primary",
  className,
  user = { _id: "1", email: "test@gmail.com" },
}) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("video");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [note, setNote] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const axiosInstance = useAxios();

  const next7 = useMemo(() => enumerateNextDays(7), []);
  const availableForDate = useMemo(() => {
    if (!selectedDate) return [];
    const date = new Date(selectedDate);
    const avail = doctor?.availability?.find((a) =>
      isMatchingDay(a.dayOfWeek, date)
    );
    return avail?.slots?.flatMap(expandSlotsToIntervals) ?? [];
  }, [selectedDate, doctor?.availability]);

  const handleConfirmBooking = async () => {
    setSubmitting(true);
    try {
      const bookingData = {
        patientId: user?._id,
        patientMail: user?.email,
        doctorId: doctor?._id,
        scheduledTime: new Date(
          `${selectedDate.split("T")[0]}T${selectedTime}:00Z`
        ).toISOString(),
        status: "pending",
        consultationType: mode,
        notes: note || "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const bookingRes = await axiosInstance.post('/appointments', bookingData);
      const paymentRes = await axiosInstance.post(`/sslPayment/create-ssl-payment`, {
        amount: mode === "video"
          ? doctor?.consultationFee || 800
          : (doctor?.consultationFee || 800) + 200,
        email: user?.email,
        appointmentId: bookingRes.data.insertedId,
      });

      if (paymentRes.data.gatewayURL) {
        window.location.href = paymentRes.data.gatewayURL;
      } else {
        throw new Error("Payment gateway URL not found");
      }
    } catch (err) {
      Swal.fire({
        title: "Error ❌",
        text: err.response?.data?.message || "Something went wrong, please try again.",
        icon: "error",
        confirmButtonText: "Retry",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        className={`btn btn-${variant} btn-${size} ${className} flex items-center gap-2`}
        onClick={() => setOpen(true)}
      >
        <CalendarDays className="h-4 w-4" /> Book Appointment
      </button>

      {/* Modal Overlay */}
      <div
        className={`fixed inset-0 z-20 pt-20 flex items-center justify-center bg-black/50 backdrop-blur-sm transition ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl ring-1 ring-gray-200 p-6 transition-all transform scale-100">
          {/* Close */}
          <button
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 rounded-full p-2 hover:bg-gray-100 focus:ring-2 focus:ring-primary transition"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>

          {/* Header */}
          <h3 className="text-2xl font-bold tracking-tight mb-1">
            Book with <span className="text-primary">{doctor?.name}</span>
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {doctor?.specialties?.[0]} • {doctor?.experienceYears}+ yrs experience
          </p>

          {/* Scrollable Content */}
          <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-2">
            {/* Mode Selection */}
            <div className="grid grid-cols-2 gap-3">
              {["video", "inperson"].map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={classNames(
                    "flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition shadow-sm",
                    mode === m
                      ? "bg-primary text-white shadow-lg"
                      : "hover:bg-gray-100 bg-base-100"
                  )}
                >
                  {m === "video" ? <Video className="h-4 w-4" /> : <Stethoscope className="h-4 w-4" />}
                  {m === "video" ? "Video" : "In-Person"}
                </button>
              ))}
            </div>

            {/* Date Picker */}
            <div>
              <label className="block text-sm font-medium mb-2">Date</label>
              <div className="grid grid-cols-7 gap-2">
                {next7.map((d) => {
                  const key = d.toISOString();
                  const selected = selectedDate && new Date(selectedDate).toDateString() === d.toDateString();
                  const isAvailable = doctor?.availability?.some((a) => isMatchingDay(a.dayOfWeek, d));

                  return (
                    <button
                      key={key}
                      onClick={() => isAvailable && setSelectedDate(d.toISOString())}
                      disabled={!isAvailable}
                      className={classNames(
                        "rounded-lg border p-2 text-center text-sm transition shadow-sm",
                        selected
                          ? "bg-primary text-white shadow-lg"
                          : isAvailable
                          ? "hover:bg-gray-100"
                          : "opacity-40 cursor-not-allowed"
                      )}
                    >
                      <div className="text-xs text-muted-foreground">{weekdayName(d.getDay())}</div>
                      <div className="font-semibold">{d.getDate()}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Picker */}
            <div>
              <label className="block text-sm font-medium mb-2">Choose Time</label>
              {selectedDate ? (
                availableForDate.length ? (
                  <div className="flex flex-wrap gap-2">
                    {availableForDate.map((t) => (
                      <button
                        key={t}
                        onClick={() => setSelectedTime(t)}
                        className={classNames(
                          "rounded-lg border px-3 py-1.5 text-sm transition shadow-sm",
                          selectedTime === t
                            ? "bg-primary text-white shadow-lg"
                            : "hover:bg-gray-100 bg-base-100"
                        )}
                      >
                        {to12h(t)}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No slots for this day.</p>
                )
              ) : (
                <p className="text-sm text-muted-foreground">Select a date first.</p>
              )}
            </div>

            {/* Note */}
            <div>
              <label className="block text-sm font-medium mb-2">Reason (optional)</label>
              <textarea
                className="w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-primary transition"
                placeholder="Briefly describe your symptoms"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            {/* Consent */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="consent"
                className="mt-1 rounded border-gray-300 focus:ring-primary"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
              />
              <label htmlFor="consent" className="text-sm text-muted-foreground">
                I agree to the Telemedicine Terms and understand this is not for emergencies.
              </label>
            </div>

            {/* Fee */}
            <div className="flex justify-between rounded-lg bg-gray-50 px-3 py-2 text-sm font-medium shadow-inner">
              <span className="text-muted-foreground">Estimated fee</span>
              <span className="text-gray-900">
                ৳ {mode === "video" ? doctor?.consultationFee || 0 : (doctor?.consultationFee || 0) + 200}
              </span>
            </div>
          </div>

          {/* Confirm Button */}
          <div className="mt-5">
            <button
              onClick={handleConfirmBooking}
              disabled={!selectedDate || !selectedTime || !consent || submitting}
              className="w-full rounded-xl bg-primary px-4 py-2 text-white font-medium shadow-lg hover:scale-[1.03] transition transform focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Processing..." : "Confirm & Pay"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
