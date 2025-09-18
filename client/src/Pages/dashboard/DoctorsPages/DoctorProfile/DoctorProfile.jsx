import React, { useState, useRef } from "react";
// Make sure to install react-icons: npm install react-icons
import {
  FaStar,
  FaUserMd,
  FaMapMarkerAlt,
  FaClock,
  FaUserEdit,
  FaGraduationCap,
  FaAward,
  FaLanguage,
  FaToggleOn,
  FaBell,
  FaKey,
  FaDollarSign,
  FaCheckCircle,
  FaCamera,
  FaTimes,
  FaCalendarCheck,
} from "react-icons/fa";

// --- Main Dashboard Component ---
const DoctorDashboardProfile = () => {
  // --- STATE MANAGEMENT ---
  const [isOnline, setIsOnline] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const modalRef = useRef(null); // Ref for the dialog element
  const [activeTab, setActiveTab] = useState("About Me"); // State for active tab

  const initialData = {
    name: "Dr. Eleanor Vance",
    tagline: "Dedicated Cardiologist with a focus on patient-centric care.",
    specialty: "Cardiology Specialist",
    degrees: ["MBBS (DMC)", "FCPS (Cardiology)", "MD (USA)"],
    experience: 12, // Years
    bmdc: "BMDC Reg: A-54321",
    workplace: "Square Hospitals Ltd., Dhaka",
    consultationFee: 1500,
    rating: 4.9,
    totalReviews: 218,
    imageUrl:
      "https://t4.ftcdn.net/jpg/03/20/74/45/360_F_320744517_TaGkT7aRlqqWdfGUuzRKDABtFEoN5CiO.jpg",
    about:
      "Dr. Eleanor Vance is a renowned cardiologist in Bangladesh. She completed her MBBS from Dhaka Medical College and earned her FCPS in Cardiology. With over 12 years of dedicated service, she has been providing exceptional care to her patients, specializing in preventative cardiology and advanced cardiac imaging.",
    services: [
      "Angioplasty and Stenting",
      "Echocardiogram (ECG)",
      "Coronary Artery Bypass Grafting (CABG) Advice",
      "Pacemaker Implantation",
      "Heart Failure Management",
      "Preventive Cardiology Counseling",
    ],
    education: [
      {
        degree: "MD (Cardiology)",
        institution: "Johns Hopkins University, USA",
        year: 2012,
      },
      {
        degree: "FCPS (Cardiology)",
        institution: "Bangladesh College of Physicians and Surgeons",
        year: 2008,
      },
      { degree: "MBBS", institution: "Dhaka Medical College", year: 2004 },
    ],
    awards: [
      {
        name: "Cardiologist of the Year",
        issuer: "Bangladesh Medical Association",
        year: 2021,
      },
      {
        name: "Healthcare Excellence Award",
        issuer: "Ministry of Health",
        year: 2019,
      },
    ],
    languages: ["Bengali", "English"],
    reviews: [
      {
        id: 1,
        patient: "Abdullah Al Mamun",
        text: "The doctor listened to my problems very carefully and provided excellent treatment.",
        rating: 5,
      },
      {
        id: 2,
        patient: "Sadia Islam",
        text: "I am completely satisfied with her treatment. A very sincere and caring doctor.",
        rating: 4.5,
      },
      {
        id: 3,
        patient: "Rahim Ahmed",
        text: "One of the best doctors I have ever met. Highly recommended.",
        rating: 5,
      },
      {
        id: 4,
        patient: "Fatima Begum",
        text: "She explained my condition clearly and gave me confidence. Thank you, doctor.",
        rating: 5,
      },
      {
        id: 5,
        patient: "John Doe",
        text: "Good consultation, but the waiting time was a bit long.",
        rating: 4,
      },
    ],
    chamber: {
      name: "Doctor's Chamber",
      address: "12/3, Panthapath, Dhaka",
      schedule: "Sat - Thu, 6:00 PM - 9:00 PM",
    },
    appointments: {
      today: [
        { id: 1, time: "10:30 AM", patient: "Md. Karim", type: "Video Call" },
        {
          id: 2,
          time: "11:00 AM",
          patient: "Selina Akter",
          type: "Audio Call",
        },
        {
          id: 3,
          time: "11:00 AM",
          patient: "Selina Akter",
          type: "Audio Call",
        },
        {
          id: 4,
          time: "11:00 AM",
          patient: "Selina Akter",
          type: "Audio Call",
        },
      ],
      tomorrow: [
        {
          id: 5,
          time: "09:00 AM",
          patient: "Farhan Chowdhury",
          type: "Video Call",
        },
        {
          id: 6,
          time: "09:00 AM",
          patient: "Farhan Chowdhury",
          type: "Video Call",
        },
      ],
    },
  };

  const [doctorData, setDoctorData] = useState(initialData);
  const [formData, setFormData] = useState(initialData);

  const openModal = () => {
    setFormData(doctorData);
    modalRef.current.showModal();
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChamberChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      chamber: { ...prev.chamber, [name]: value },
    }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setDoctorData(formData);
    modalRef.current.close();
    console.log("Profile Saved:", formData);
  };

  const TabButton = ({ title }) => (
    <a
      role="tab"
      className={`tab text-base h-12 transition-all duration-300 border-b-2  font-semibold ${
        activeTab === title
          ? " border-blue-600 text-blue-600"
          : "border-transparent text-gray-500"
      }`}
      onClick={() => setActiveTab(title)}
    >
      {title}
    </a>
  );

  return (
    <>
      {/* --- Edit Profile Modal using <dialog> --- */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle font-medium">
        <div className="modal-box w-full max-w-3xl rounded-t-2xl sm:rounded-2xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-2xl mb-6 text-gray-800">
            Edit Your Profile
          </h3>
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text text-gray-600">Full Name</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text text-gray-600">Tagline</span>
              </label>
              <input
                type="text"
                name="tagline"
                value={formData.tagline}
                onChange={handleFormChange}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text text-gray-600">About Me</span>
              </label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleFormChange}
                className="textarea textarea-bordered h-24 w-full"
              ></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text text-gray-600">Workplace</span>
                </label>
                <input
                  type="text"
                  name="workplace"
                  value={formData.workplace}
                  onChange={handleFormChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text text-gray-600">
                    BMDC Registration
                  </span>
                </label>
                <input
                  type="text"
                  name="bmdc"
                  value={formData.bmdc}
                  onChange={handleFormChange}
                  className="input input-bordered w-full"
                />
              </div>
            </div>
            <div className="divider text-gray-500 pt-2">Chamber Details</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text text-gray-600">
                    Chamber Address
                  </span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.chamber.address}
                  onChange={handleChamberChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text text-gray-600">Schedule</span>
                </label>
                <input
                  type="text"
                  name="schedule"
                  value={formData.chamber.schedule}
                  onChange={handleChamberChange}
                  className="input input-bordered w-full"
                />
              </div>
            </div>
            <div className="modal-action pt-6">
              <button
                type="submit"
                className="btn btn-primary text-white w-full sm:w-auto"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </dialog>

      <div className="min-h-screen p-4 sm:p-0 font-sans text-gray-700 font-medium">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <button
              onClick={openModal}
              className="btn btn-primary text-white gap-2 mt-4 sm:mt-0 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <FaUserEdit /> Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 space-y-8">
              <div className="card bg-white shadow-md rounded-xl">
                <div className="relative group">
                  <figure className="h-64 rounded-t-xl">
                    <img
                      src={doctorData.imageUrl}
                      alt={`${doctorData.name}'s profile`}
                      className="w-full h-full object-cover rounded-t-xl"
                    />
                  </figure>
                  <div className="absolute inset-0 bg-black/10 bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex justify-center items-center cursor-pointer rounded-t-xl">
                    <FaCamera className="text-white text-4xl opacity-0 group-hover:opacity-90 transform group-hover:scale-110 transition-transform" />
                  </div>
                  <div
                    className="absolute top-4 right-4 badge badge-lg border-2 border-white"
                    style={{
                      backgroundColor: isOnline ? "#22c55e" : "#ef4444",
                      color: "white",
                    }}
                  >
                    {isOnline ? "Online" : "Offline"}
                  </div>
                </div>
                <div className="card-body items-center text-center p-6">
                  <h2 className="card-title text-2xl text-gray-800">
                    {doctorData.name}
                  </h2>
                  <p className="font-semibold text-blue-600">
                    {doctorData.specialty}
                  </p>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                    {doctorData.tagline}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 my-4">
                    {doctorData.degrees.map((degree, index) => (
                      <div
                        key={index}
                        className="badge badge-outline border-blue-200 text-blue-600 bg-blue-50 py-2 px-3"
                      >
                        {degree}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="stats stats-vertical shadow-md rounded-xl w-full bg-white">
                <div className="stat p-5">
                  <div className="stat-figure text-blue-500">
                    <FaUserMd className="text-3xl" />
                  </div>
                  <div className="stat-title text-gray-500">Experience</div>
                  <div className="stat-value text-gray-800">
                    {doctorData.experience} Years
                  </div>
                </div>
                <div className="stat p-5">
                  <div className="stat-figure text-amber-500">
                    <FaStar className="text-3xl" />
                  </div>
                  <div className="stat-title text-gray-500">Rating</div>
                  <div className="stat-value text-gray-800">
                    {doctorData.rating}
                  </div>
                  <div className="stat-desc text-gray-400">
                    {doctorData.totalReviews} Reviews
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 card bg-white shadow-md rounded-xl">
              <div className="card-body p-0">
                <div className="overflow-x-auto border-b border-gray-200">
                  <div role="tablist" className="tabs min-w-[470px]">
                    <TabButton title="About Me" />
                    <TabButton title="Expertise" />
                    <TabButton title="Appointments" />
                    <TabButton title="Settings" />
                  </div>
                </div>

                <div className="p-4 leading-relaxed">
                  {activeTab === "About Me" && (
                    <div>
                      <h3 className="text-xl font-bold mb-4 text-gray-800">
                        About Me
                      </h3>
                      <p className="text-gray-600">{doctorData.about}</p>
                      <div className="divider my-6"></div>
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-800">
                          Languages Spoken
                        </h4>
                        <div className="flex gap-2">
                          {doctorData.languages.map((lang) => (
                            <div
                              key={lang}
                              className="badge badge-info bg-sky-100 text-sky-700 border-sky-200 gap-2 p-3"
                            >
                              <FaLanguage /> {lang}
                            </div>
                          ))}
                        </div>
                        <h4 className="font-semibold text-gray-800">
                          Workplace
                        </h4>
                        <p className="text-gray-600 flex items-center gap-2">
                          <FaMapMarkerAlt />
                          {doctorData.workplace}
                        </p>
                        <h4 className="font-semibold text-gray-800">
                          BMDC Registration
                        </h4>
                        <p className="text-gray-600">{doctorData.bmdc}</p>
                      </div>
                    </div>
                  )}
                  {activeTab === "Expertise" && (
                    <div>
                      <h3 className="text-xl font-bold mb-4 text-gray-800">
                        Services & Expertise
                      </h3>
                      <ul className="space-y-2">
                        {doctorData.services.map((service, index) => (
                          <li
                            key={index}
                            className="flex items-center text-gray-600"
                          >
                            <FaCheckCircle className="text-green-500 mr-3" />
                            {service}
                          </li>
                        ))}
                      </ul>
                      <div className="divider my-6"></div>
                      <h3 className="text-xl font-bold my-4 text-gray-800">
                        Education
                      </h3>
                      <ul className="space-y-3">
                        {doctorData.education.map((edu, index) => (
                          <li className="text-gray-600">
                            <FaGraduationCap className="inline mr-3 text-blue-500" />
                            <strong>{edu.degree}</strong> - {edu.institution} (
                            {edu.year})
                          </li>
                        ))}
                      </ul>
                      <div className="divider my-6"></div>
                      <h3 className="text-xl font-bold my-4 text-gray-800">
                        Awards & Recognitions
                      </h3>
                      <ul className="space-y-3">
                        {doctorData.awards.map((award, index) => (
                          <li className="text-gray-600">
                            <FaAward className="inline mr-3 text-amber-500" />
                            <strong>{award.name}</strong> - {award.issuer} (
                            {award.year})
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {activeTab === "Appointments" && (
                    <div className="scroll-mb-32 max-h-[90vh] overflow-y-auto">
                      <h3 className="text-xl font-bold mb-4 text-gray-800">
                        My Appointments
                      </h3>
                      <div>
                        <h4 className="font-semibold text-lg mb-3 text-gray-700">
                          Today
                        </h4>
                        <div className="space-y-3">
                          {doctorData.appointments.today.map((apt) => (
                            <div
                              key={apt.id}
                              className="p-4 bg-slate-100 rounded-lg flex justify-between items-center"
                            >
                              <div>
                                <p className="font-bold text-gray-800">
                                  {apt.time} - {apt.patient}
                                </p>
                                <p className="text-sm text-blue-600">
                                  {apt.type}
                                </p>
                              </div>
                              <button className="btn btn-sm bg-green-500 hover:bg-green-600 text-white border-0">
                                Join
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="divider my-6"></div>
                      <div>
                        <h4 className="font-semibold text-lg mb-3 text-gray-700">
                          Tomorrow
                        </h4>
                        <div className="space-y-3">
                          {doctorData.appointments.tomorrow.map((apt) => (
                            <div
                              key={apt.id}
                              className="p-4 bg-slate-100 rounded-lg flex justify-between items-center"
                            >
                              <div>
                                <p className="font-bold text-gray-800">
                                  {apt.time} - {apt.patient}
                                </p>
                                <p className="text-sm text-blue-600">
                                  {apt.type}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTab === "Settings" && (
                    <div>
                      <h3 className="text-xl font-bold mb-6 text-gray-800">
                        Profile Settings
                      </h3>
                      <div className="space-y-6">
                        <div className="form-control">
                          <label className="label cursor-pointer justify-start gap-4">
                            <input
                              type="checkbox"
                              className="toggle toggle-success"
                              checked={isOnline}
                              onChange={() => setIsOnline(!isOnline)}
                            />
                            <span className="label-text text-base text-gray-700">
                              My Status
                            </span>
                          </label>
                          <div className="text-sm text-gray-500 ml-12">
                            Toggle your availability for consultations.
                          </div>
                        </div>
                        <div className="form-control">
                          <label className="label cursor-pointer justify-start gap-4">
                            <input
                              type="checkbox"
                              className="toggle toggle-info"
                              checked={notifications}
                              onChange={() => setNotifications(!notifications)}
                            />
                            <span className="label-text text-base text-gray-700">
                              Push Notifications
                            </span>
                          </label>
                          <div className="text-sm text-gray-500 ml-12">
                            Enable or disable app notifications.
                          </div>
                        </div>
                        <div className="form-control w-full max-w-xs">
                          <label className="label">
                            <span className="label-text text-gray-700 flex items-center gap-2">
                              <FaDollarSign /> Update Consultation Fee
                            </span>
                          </label>
                          <input
                            type="number"
                            defaultValue={doctorData.consultationFee}
                            placeholder="Enter new fee"
                            className="input input-bordered w-full"
                          />
                        </div>
                        <button className="btn btn-outline border-gray-300 hover:bg-gray-100 text-gray-700 mt-4 gap-2">
                          <FaKey /> Change Password
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorDashboardProfile;
