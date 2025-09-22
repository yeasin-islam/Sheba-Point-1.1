import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Plus,
  X,
  User,
  Stethoscope,
  Calendar,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import useAxios from "./../../../Hooks/useAxios";
import toast from "react-hot-toast";

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
  const axiosInstance = useAxios();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful, isSubmitted },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      dateOfBirth: "",
      gender: "",
      experienceYears: "",
      specialties: [],
      qualifications: [],
      languages: [],
      availability: [],
      isActive: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "availability",
  });

  const onSubmit = async (data) => {
    try {
      const submissionData = {
        ...data,
        experienceYears: Number(data.experienceYears),
      };
      await axiosInstance
        .post("/patients/doctor-apply", submissionData)
        .then((response) => {
          if (response.data.error) {
            toast.error(response.data.error);
          } else if (response.data.insertedId) {
            toast.success("Application submitted successfully!");
            reset();
          }
        });
    } catch (error) {
      toast.error("Submission error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-600 rounded-full mb-4">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Doctor Application
          </h1>
          <p className="text-gray-600 text-lg">
            Join our healthcare platform and make a difference
          </p>
        </div>

        {/* Success Message */}
        {isSubmitSuccessful && (
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 mb-8 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-teal-600" />
            <span className="text-teal-800 font-medium">
              Application submitted successfully!
            </span>
          </div>
        )}

        {/* Error Message */}
        {isSubmitted && !isSubmitSuccessful && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-red-800 font-medium">
              Failed to submit application. Please try again.
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Personal Information */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-teal-600 to-green-600 p-6">
              <div className="flex items-center gap-3">
                <User className="w-6 h-6 text-white" />
                <h2 className="text-xl font-semibold text-white">
                  Personal Information
                </h2>
              </div>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  {...register("name", { required: true })}
                  className="w-full px-4 py-3 border rounded-xl"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">Name is required</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience *
                </label>
                <input
                  type="number"
                  {...register("experienceYears", { required: true, min: 0 })}
                  className="w-full px-4 py-3 border rounded-xl"
                  placeholder="0"
                />
                {errors.experienceYears && (
                  <p className="text-red-500 text-sm mt-1">Required</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="w-full px-4 py-3 border rounded-xl"
                  placeholder="doctor@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">Email is required</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  {...register("phone", { required: true })}
                  className="w-full px-4 py-3 border rounded-xl"
                  placeholder="+880 1234 567890"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">Phone is required</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <input
                  {...register("address", { required: true })}
                  className="w-full px-4 py-3 border rounded-xl"
                  placeholder="Your address"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">
                    Address is required
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  {...register("dateOfBirth", { required: true })}
                  className="w-full px-4 py-3 border rounded-xl"
                />
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-sm mt-1">Required</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender *
                </label>
                <select
                  {...register("gender", { required: true })}
                  className="w-full px-4 py-3 border rounded-xl"
                >
                  <option value="">Select Gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">Required</p>
                )}
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6">
              <div className="flex items-center gap-3">
                <Stethoscope className="w-6 h-6 text-white" />
                <h2 className="text-xl font-semibold text-white">
                  Professional Information
                </h2>
              </div>
            </div>

            <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Specialties */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specialties *
                </label>
                {specialtiesOptions.map((sp) => (
                  <label key={sp} className="flex items-center gap-2 mb-2">
                    <input
                      type="checkbox"
                      value={sp}
                      {...register("specialties")}
                    />
                    {sp}
                  </label>
                ))}
                {errors.specialties && (
                  <p className="text-red-500 text-sm mt-1">Required</p>
                )}
              </div>

              {/* Qualifications */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Qualifications *
                </label>
                {qualificationsOptions.map((q) => (
                  <label key={q} className="flex items-center gap-2 mb-2">
                    <input
                      type="checkbox"
                      value={q}
                      {...register("qualifications")}
                    />
                    {q}
                  </label>
                ))}
                {errors.qualifications && (
                  <p className="text-red-500 text-sm mt-1">Required</p>
                )}
              </div>

              {/* Languages */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Languages *
                </label>
                {languagesOptions.map((lang) => (
                  <label key={lang} className="flex items-center gap-2 mb-2">
                    <input
                      type="checkbox"
                      value={lang}
                      {...register("languages")}
                    />
                    {lang}
                  </label>
                ))}
                {errors.languages && (
                  <p className="text-red-500 text-sm mt-1">Required</p>
                )}
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-teal-600 p-6 flex justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-white" />
                <h2 className="text-xl font-semibold text-white">
                  Availability Schedule
                </h2>
              </div>
              <button
                type="button"
                onClick={() =>
                  append({
                    dayOfWeek: "",
                    slots: [{ startTime: "", endTime: "" }],
                  })
                }
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Day
              </button>
            </div>

            <div className="p-8">
              {fields.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No availability slots added yet.
                </div>
              )}

              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="border border-primary/20 rounded-xl p-6 mb-4"
                >
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                        Day of Week *
                      </label>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex-1">
                      <select
                        {...register(`availability.${index}.dayOfWeek`, {
                          required: true,
                        })}
                        className="w-full px-4 py-3 border rounded-xl"
                      >
                        <option value="">Select Day</option>
                        {daysOfWeek.map((d) => (
                          <option key={d.value} value={d.value}>
                            {d.label}
                          </option>
                        ))}
                      </select>
                      {errors.availability?.[index]?.dayOfWeek && (
                        <p className="text-red-500 text-sm mt-1">Required</p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="mr-4 px-2 py-1 text-red-500 hover:bg-red-50 rounded-full"
                    >
                      <X className="" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Time *
                      </label>
                      <input
                        type="time"
                        {...register(
                          `availability.${index}.slots.0.startTime`,
                          {
                            required: true,
                          }
                        )}
                        className="w-full px-4 py-3 border rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Time *
                      </label>
                      <input
                        type="time"
                        {...register(`availability.${index}.slots.0.endTime`, {
                          required: true,
                        })}
                        className="w-full px-4 py-3 border rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="bg-white rounded-2xl shadow-lg border p-8 text-center space-y-6">
            <div className="flex items-center justify-center gap-3">
              <input
                type="checkbox"
                {...register("isActive")}
                className="w-5 h-5"
              />
              <label className="text-gray-700 font-medium">
                Set profile as active upon approval
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-12 py-4 rounded-xl font-semibold text-lg shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>

            <p className="text-sm text-gray-500">
              Your application will be reviewed within 2-3 business days
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorApplication;
