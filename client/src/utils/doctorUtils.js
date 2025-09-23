// doctorApi.js
export async function fetchDoctorById(id) {
  try {
    const res = await fetch(`http://localhost:5000/doctors/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch doctor with id ${id}: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching doctor:", err);
    throw err;
  }
}

export function weekdayName(i) {
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i] ?? "";
}

export function fullWeekdayName(i) {
  return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][i] ?? "";
}

export function getInitials(name) {
  return name
    .split(" ")
    .map((s) => s[0]?.toUpperCase())
    .slice(0, 2)
    ?.join("");
}

export function isMatchingDay(target, date) {
  const jsDay = date.getDay();
  const docDay = ((target % 7) + 7) % 7;
  return jsDay === docDay;
}

export function enumerateNextDays(count = 14) {
  const days = [];
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  for (let i = 0; i < count; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push(d);
  }
  return days;
}

export function to12h(t) {
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m.toString().padStart(2, "0")} ${ampm}`;
}

export function expandSlotsToIntervals(slot) {
  const out = [];
  const [sh, sm] = slot.startTime.split(":").map(Number);
  const [eh, em] = slot.endTime.split(":").map(Number);
  const start = sh * 60 + sm;
  const end = eh * 60 + em;
  for (let m = start; m < end; m += 30) {
    const hh = Math.floor(m / 60)
      .toString()
      .padStart(2, "0");
    const mm = (m % 60).toString().padStart(2, "0");
    out.push(`${hh}:${mm}`);
  }
  return out;
}

export function classNames(...xs) {
  return xs.filter(Boolean)?.join(" ");
}
