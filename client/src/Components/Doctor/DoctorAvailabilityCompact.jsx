import { enumerateNextDays, isMatchingDay, weekdayName } from "../../utils/doctorUtils";
import { CheckCircle, XCircle } from "lucide-react";

export default function DoctorAvailabilityCompact({ doctor, onSelectDate }) {
  const days = enumerateNextDays(7);

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-7">
      {days.map((d) => {
        const avail = doctor.availability.find((a) =>
          isMatchingDay(a.dayOfWeek, d)
        );
        const has = (avail?.slots?.length ?? 0) > 0;

        return (
          <button
            key={d.toISOString()}
            onClick={() => has && onSelectDate?.(d)}
            disabled={!has}
            className={`rounded-xl p-4 text-center transition border w-full
              ${has 
                ? "border-green-500/40 bg-green-50 hover:bg-green-100 cursor-pointer shadow-sm" 
                : "border-base-300 bg-base-200/50 opacity-50 cursor-not-allowed"} 
              flex flex-col items-center justify-center`}
          >
            {/* Day name */}
            <div className="text-xs font-medium text-base-content/70 uppercase tracking-wide">
              {weekdayName(d.getDay())}
            </div>

            {/* Date */}
            <div className="text-xl font-semibold text-base-content mt-1">
              {d.getDate()}
            </div>

            {/* Status */}
            <div className="mt-2 flex items-center gap-1 text-sm">
              {has ? (
                <>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-green-700 font-medium">Available</span>
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4 text-gray-400" />
                  <span className="text-base-content/50">No slots</span>
                </>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
