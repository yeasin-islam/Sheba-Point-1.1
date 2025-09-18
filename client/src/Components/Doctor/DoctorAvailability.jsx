import { enumerateNextDays, isMatchingDay, expandSlotsToIntervals, to12h, weekdayName, fullWeekdayName } from "../../utils/doctorUtils";

export default function DoctorAvailability({ doctor }) {
  const days = enumerateNextDays(14);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-7">
        {days.map((d) => {
          const avail = doctor.availability.find((a) => isMatchingDay(a.dayOfWeek, d));
          const slots = avail?.slots ?? [];
          return (
            <div key={d.toISOString()} className="card bg-base-100 shadow overflow-hidden">
              <div className="card-body p-4">
                <h3 className="text-sm font-medium">
                  {weekdayName(d.getDay())}, {d.getDate()}
                </h3>
                <p className="text-xs text-base-content/70">
                  {fullWeekdayName(d.getDay())}
                </p>
                {slots.length === 0 ? (
                  <p className="text-sm text-base-content/70">No slots</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {slots.flatMap(expandSlotsToIntervals).map((t) => (
                      <div key={t} className="badge badge-outline">
                        {to12h(t)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="rounded-xl bg-base-200 p-4 text-sm text-base-content/70">
        <p className="mb-2 font-medium">How booking works</p>
        <ul className="list-inside list-disc space-y-1">
          <li>Select a date & slot from above.</li>
          <li>Choose Video or In‑Person consultation.</li>
          <li>Pay securely via bKash, Nagad, or card.</li>
          <li>Get reminders 30 minutes before your visit.</li>
        </ul>
      </div>
    </div>
  );
}