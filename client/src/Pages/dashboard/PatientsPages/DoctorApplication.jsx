import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { FaPlus, FaTimes, FaUserMd } from "react-icons/fa"; // Using react-icons for better visuals
import useAxios from "../../../Hooks/useAxios";

// Reusable data for form options
const specialtiesOptions = [
  "Cardiology",
  "Dermatology",
  "Pediatrics",
  "Internal Medicine",
  "Neurology",
];
const qualificationsOptions = [
  "MBBS",
  "MD Cardiology",
  "MD Dermatology",
  "FCPS",
  "FRCS",
];
const languagesOptions = ["Bangla", "English", "Hindi", "Arabic"];
const daysOfWeek = [
  { value: 0, label: "Sunday" },
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
];

const DoctorApplication = () => {
  const axiosInstance=useAxios()
  // state for image preview
  const [profileImagePreview, setProfileImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }, // destructure errors for displaying validation messages
  } = useForm({
    defaultValues: {
      specialties: [],
      qualifications: [],
      languages: [],
      availability: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "availability",
  });

  const onSubmit = (data) => {
    // Convert experienceYears to number for proper data handling
    data.experienceYears = Number(data.experienceYears);

    // TODO: Handle profile image upload here before sending to backend.
    // The `data.profileImage` will be a FileList object.
    console.log("Doctor Application Data:", data);
  axiosInstance.post('/patients/doctor-apply', data)
    reset(); // Reset form after successful submission
    setProfileImagePreview(null); // Clear image preview
  };

  // Handle image file change and create a preview URL
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImagePreview(URL.createObjectURL(file));
    } else {
      setProfileImagePreview(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-5xl w-full mx-auto p-8  shadow-xl rounded-2xl">
        {/* Header section with a visual icon */}
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-3xl font-extrabold text-center text-primary">
            Doctor Application Form
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Section for Personal Information and Image */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Image Upload and Preview */}
            <div className="col-span-1 flex flex-col items-center">
              <label className="font-semibold text-gray-700 mb-2">
                Profile Picture
              </label>
              <div className="w-32 h-32 rounded-full border-4 border-primary/60 flex items-center justify-center overflow-hidden bg-gray-200 mb-4 relative">
                {profileImagePreview ? (
                  <img
                    src={profileImagePreview}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUserMd className="text-gray-500 text-5xl" />
                )}
                <input
                  {...register("profileImage", {
                    required: "Profile image is required",
                  })}
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                />
              </div>
              {errors.profileImage && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.profileImage.message}
                </span>
              )}
            </div>

            {/* Basic Info Inputs */}
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  {...register("name", { required: "Full name is required" })}
                  placeholder="Full Name"
                  className="input input-bordered w-full"
                />
                {errors.name && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </span>
                )}
              </div>
              <div>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  placeholder="Email"
                  className="input input-bordered w-full"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div>
                <input
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                  type="tel"
                  placeholder="Phone Number"
                  className="input input-bordered w-full"
                />
                {errors.phone && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </span>
                )}
              </div>
              <div>
                <input
                  {...register("address", { required: "Address is required" })}
                  placeholder="Address"
                  className="input input-bordered w-full"
                />
                {errors.address && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.address.message}
                  </span>
                )}
              </div>
              <div>
                <label className="text-sm text-gray-500 block">
                  Date of Birth
                </label>
                <input
                  {...register("dateOfBirth", {
                    required: "Date of birth is required",
                  })}
                  type="date"
                  className="input input-bordered w-full"
                />
                {errors.dateOfBirth && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.dateOfBirth.message}
                  </span>
                )}
              </div>
              <div>
                <label className="text-sm text-gray-500 block">Gender</label>
                <select
                  {...register("gender", { required: "Gender is required" })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
                {errors.gender && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.gender.message}
                  </span>
                )}
              </div>
              <div>
                <input
                  {...register("experienceYears", {
                    required: "Years of experience is required",
                    min: { value: 0, message: "Experience cannot be negative" },
                  })}
                  type="number"
                  placeholder="Years of Experience"
                  className="input input-bordered w-full"
                />
                {errors.experienceYears && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.experienceYears.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200" />
          {/* Section for Professional Information */}
          <h3 className="text-xl font-bold text-primary">
            Professional Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Specialties */}
            <div>
              <label className="font-semibold text-gray-700 mb-2 block">
                Specialties
              </label>
              <select
                {...register("specialties", {
                  required: "At least one specialty is required",
                })}
                multiple
                className="select select-bordered w-full h-fit"
              >
                {specialtiesOptions.map((sp) => (
                  <option key={sp} value={sp}>
                    {sp}
                  </option>
                ))}
              </select>
              {errors.specialties && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.specialties.message}
                </span>
              )}
            </div>

            {/* Qualifications */}
            <div>
              <label className="font-semibold text-gray-700 mb-2 block">
                Qualifications
              </label>
              <select
                {...register("qualifications", {
                  required: "At least one qualification is required",
                })}
                multiple
                className="select select-bordered w-full h-fit"
              >
                {qualificationsOptions.map((q) => (
                  <option key={q} value={q}>
                    {q}
                  </option>
                ))}
              </select>
              {errors.qualifications && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.qualifications.message}
                </span>
              )}
            </div>

            {/* Languages */}
            <div>
              <label className="font-semibold text-gray-700 mb-2 block">
                Languages
              </label>
              <select
                {...register("languages", {
                  required: "At least one language is required",
                })}
                multiple
                className="select select-bordered w-full h-fit"
              >
                {languagesOptions.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
              {errors.languages && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.languages.message}
                </span>
              )}
            </div>
          </div>
          <hr className="my-3 border-gray-200" />
          {/* Availability Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-primary">Availability</h3>
              <button
                type="button"
                onClick={() =>
                  append({
                    dayOfWeek: "",
                    slots: [{ startTime: "", endTime: "" }],
                  })
                }
                className="btn btn-primary btn-sm flex items-center gap-2 transition-transform transform hover:scale-105"
              >
                <FaPlus />
                Add Day
              </button>
            </div>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="border border-gray-300 rounded-xl p-4 mb-4 bg-gray-50  transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  {/* Day of Week Selector */}
                  <div className="w-full">
                    <label htmlFor={`day-${index}`} className="sr-only">
                      Select Day
                    </label>
                    <select
                      id={`day-${index}`}
                      {...register(`availability.${index}.dayOfWeek`, {
                        required: "Day is required",
                      })}
                      className="select select-bordered w-full"
                    >
                      <option value="">Select Day</option>
                      {daysOfWeek.map((d) => (
                        <option key={d.value} value={d.value}>
                          {d.label}
                        </option>
                      ))}
                    </select>
                    {errors.availability?.[index]?.dayOfWeek && (
                      <span className="text-red-500 text-sm mt-1 block">
                        {errors.availability[index].dayOfWeek.message}
                      </span>
                    )}
                  </div>
                  {/* Remove Day Button */}
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="btn btn-ghost text-red-500 hover:bg-red-100 btn-sm ml-2"
                    aria-label="Remove day"
                  >
                    <FaTimes className="text-lg" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Start Time Input */}
                  <div>
                    <label
                      htmlFor={`start-time-${index}`}
                      className="text-sm text-gray-500 block"
                    >
                      Start Time
                    </label>
                    <input
                      id={`start-time-${index}`}
                      {...register(`availability.${index}.slots.0.startTime`, {
                        required: "Start time is required",
                      })}
                      type="time"
                      className="input input-bordered w-full"
                    />
                    {errors.availability?.[index]?.slots?.[0]?.startTime && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors.availability[index].slots[0].startTime.message}
                      </span>
                    )}
                  </div>
                  {/* End Time Input */}
                  <div>
                    <label
                      htmlFor={`end-time-${index}`}
                      className="text-sm text-gray-500 block"
                    >
                      End Time
                    </label>
                    <input
                      id={`end-time-${index}`}
                      {...register(`availability.${index}.slots.0.endTime`, {
                        required: "End time is required",
                      })}
                      type="time"
                      className="input input-bordered w-full"
                    />
                    {errors.availability?.[index]?.slots?.[0]?.endTime && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors.availability[index].slots[0].endTime.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <hr className="my-6 border-gray-200" />
          {/* Active Status and Submit */}
          <div className="flex flex-col items-center">
            <div className="form-control mb-6">
              <label className="label cursor-pointer gap-2">
                <input
                  type="checkbox"
                  {...register("isActive")}
                  className="checkbox checkbox-primary"
                />
                <span className="label-text">Set profile as active</span>
              </label>
            </div>

            <button type="submit" className="btn btn-primary px-10 text-lg">
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorApplication;
