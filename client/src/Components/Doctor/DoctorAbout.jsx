import { Phone, Mail, Award, Video, Home } from "lucide-react";

export default function DoctorAbout({ doctor }) {
  return (
    <section className="space-y-8 max-w-4xl mx-auto px-4 py-8">
      {/* About Section */}
      <div className="bg-white shadow-lg rounded-xl p-6 md:p-8 border border-gray-100">
        <h2 className="text-2xl font-semibold mb-4">About Dr. {doctor.name}</h2>
        <p className="text-base text-gray-700 leading-relaxed">
          Dr. {doctor.name.split(" ")[1]} is a seasoned{" "}
          <span className="font-medium text-primary">
            {doctor.specialties[0].toLowerCase()}
          </span>{" "}
          specialist with <span className="font-medium">{doctor.experienceYears}+ years</span> of clinical experience. 
          Focused on <span className="italic">evidence‑based care</span>, preventive medicine, and patient education.
        </p>
      </div>

      {/* Qualifications */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-xl p-6 shadow-inner border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <Award className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg">Qualifications</h3>
          </div>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {doctor.qualifications.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </div>

        {/* Clinic & Telemedicine */}
        <div className="bg-gray-50 rounded-xl p-6 shadow-inner border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <Video className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg">Clinic & Telemedicine</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Available for secure <span className="font-medium">video consultations</span> 
            and limited <span className="font-medium">in‑person visits</span>. 
            For emergencies, call local services; this platform is not a substitute for emergency care.
          </p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <Home className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-lg">Contact</h3>
        </div>
        <div className="flex flex-col gap-2 text-gray-700">
          {/* <p className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-primary" /> {doctor.phone}
          </p> */}
          <p className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-primary" /> {doctor.email}
          </p>
        </div>
      </div>
    </section>
  );
}
