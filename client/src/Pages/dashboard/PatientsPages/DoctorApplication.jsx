import React, { useState } from "react";
import { Plus, X, User, Stethoscope, Calendar, CheckCircle, AlertCircle } from "lucide-react";
import useAxios from './../../../Hooks/useAxios';

// Mock axios instance for demonstration

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
  const axiosInstance = useAxios();
  
  // State management
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    gender: '',
    experienceYears: '',
    specialties: [],
    qualifications: [],
    languages: [],
    availability: [],
    isActive: false
  });
  
  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle multi-select changes
  const handleMultiSelectChange = (e, fieldName) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({
      ...prev,
      [fieldName]: selectedOptions
    }));
    
    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: ''
      }));
    }
  };

  // Add availability day
  const addAvailabilityDay = () => {
    setFormData(prev => ({
      ...prev,
      availability: [
        ...prev.availability,
        {
          id: Date.now(),
          dayOfWeek: '',
          slots: [{ startTime: '', endTime: '' }]
        }
      ]
    }));
  };

  // Remove availability day
  const removeAvailabilityDay = (id) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.filter(day => day.id !== id)
    }));
  };

  // Update availability day
  const updateAvailabilityDay = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.map(day =>
        day.id === id 
          ? field.includes('Time')
            ? { ...day, slots: [{ ...day.slots[0], [field]: value }] }
            : { ...day, [field]: value }
          : day
      )
    }));
  };
    // TODO: Handle profile image upload here before sending to backend.
    // The `data.profileImage` will be a FileList object.
    console.log("Doctor Application Data:", data);
  axiosInstance.post('/patients/doctor-apply', data)
    reset(); // Reset form after successful submission
    setProfileImagePreview(null); // Clear image preview
  // Validation function
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.experienceYears) newErrors.experienceYears = 'Years of experience is required';
    else if (Number(formData.experienceYears) < 0) {
      newErrors.experienceYears = 'Experience cannot be negative';
    }
    
    if (formData.specialties.length === 0) {
      newErrors.specialties = 'At least one specialty is required';
    }
    if (formData.qualifications.length === 0) {
      newErrors.qualifications = 'At least one qualification is required';
    }
    if (formData.languages.length === 0) {
      newErrors.languages = 'At least one language is required';
    }
    
    // Validate availability
    formData.availability.forEach((day, index) => {
      if (!day.dayOfWeek && day.dayOfWeek !== 0) {
        newErrors[`availability_${index}_day`] = 'Day is required';
      }
      if (!day.slots[0].startTime) {
        newErrors[`availability_${index}_start`] = 'Start time is required';
      }
      if (!day.slots[0].endTime) {
        newErrors[`availability_${index}_end`] = 'End time is required';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitError(false);
    
    try {
      const submissionData = {
        ...formData,
        experienceYears: Number(formData.experienceYears)
      };
      
      await axiosInstance.post('/patients/doctor-apply', submissionData);
      
      setSubmitSuccess(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        dateOfBirth: '',
        gender: '',
        experienceYears: '',
        specialties: [],
        qualifications: [],
        languages: [],
        availability: [],
        isActive: false
      });
      
      setTimeout(() => setSubmitSuccess(false), 5000);
      
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError(true);
      setTimeout(() => setSubmitError(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Doctor Application
          </h1>
          <p className="text-gray-600 text-lg">Join our healthcare platform and make a difference</p>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-8 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-medium">Application submitted successfully!</span>
          </div>
        )}

        {/* Error Message */}
        {submitError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-red-800 font-medium">Failed to submit application. Please try again.</span>
          </div>
        )}

        <div onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
              <div className="flex items-center gap-3">
                <User className="w-6 h-6 text-white" />
                <h2 className="text-xl font-semibold text-white">Personal Information</h2>
              </div>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience *</label>
                  <input
                    name="experienceYears"
                    type="number"
                    value={formData.experienceYears}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="0"
                  />
                  {errors.experienceYears && (
                    <p className="text-red-500 text-sm mt-1">{errors.experienceYears}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="doctor@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="+880 1234 567890"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                  <input
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Your address"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                  <input
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                  {errors.dateOfBirth && (
                    <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select Gender</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Professional Information Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6">
              <div className="flex items-center gap-3">
                <Stethoscope className="w-6 h-6 text-white" />
                <h2 className="text-xl font-semibold text-white">Professional Information</h2>
              </div>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Specialties *</label>
                  <select
                    multiple
                    value={formData.specialties}
                    onChange={(e) => handleMultiSelectChange(e, 'specialties')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 h-32"
                  >
                    {specialtiesOptions.map((sp) => (
                      <option key={sp} value={sp} className="py-2">
                        {sp}
                      </option>
                    ))}
                  </select>
                  <p className="text-sm text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
                  {errors.specialties && (
                    <p className="text-red-500 text-sm mt-1">{errors.specialties}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Qualifications *</label>
                  <select
                    multiple
                    value={formData.qualifications}
                    onChange={(e) => handleMultiSelectChange(e, 'qualifications')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 h-32"
                  >
                    {qualificationsOptions.map((q) => (
                      <option key={q} value={q} className="py-2">
                        {q}
                      </option>
                    ))}
                  </select>
                  <p className="text-sm text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
                  {errors.qualifications && (
                    <p className="text-red-500 text-sm mt-1">{errors.qualifications}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Languages *</label>
                  <select
                    multiple
                    value={formData.languages}
                    onChange={(e) => handleMultiSelectChange(e, 'languages')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 h-32"
                  >
                    {languagesOptions.map((lang) => (
                      <option key={lang} value={lang} className="py-2">
                        {lang}
                      </option>
                    ))}
                  </select>
                  <p className="text-sm text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
                  {errors.languages && (
                    <p className="text-red-500 text-sm mt-1">{errors.languages}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Availability Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-violet-600 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-white" />
                  <h2 className="text-xl font-semibold text-white">Availability Schedule</h2>
                </div>
                <button
                  type="button"
                  onClick={addAvailabilityDay}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 transform hover:scale-105"
                >
                  <Plus className="w-4 h-4" />
                  Add Day
                </button>
              </div>
            </div>
            
            <div className="p-8">
              {formData.availability.length === 0 && (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No availability slots added yet. Click "Add Day" to get started.</p>
                </div>
              )}

              {formData.availability.map((day) => (
                <div
                  key={day.id}
                  className="bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-100 rounded-xl p-6 mb-4 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Day of Week *</label>
                      <select
                        value={day.dayOfWeek}
                        onChange={(e) => updateAvailabilityDay(day.id, 'dayOfWeek', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="">Select Day</option>
                        {daysOfWeek.map((d) => (
                          <option key={d.value} value={d.value}>
                            {d.label}
                          </option>
                        ))}
                      </select>
                      {errors[`availability_${formData.availability.indexOf(day)}_day`] && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors[`availability_${formData.availability.indexOf(day)}_day`]}
                        </p>
                      )}
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => removeAvailabilityDay(day.id)}
                      className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Start Time *</label>
                      <input
                        type="time"
                        value={day.slots[0].startTime}
                        onChange={(e) => updateAvailabilityDay(day.id, 'startTime', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      />
                      {errors[`availability_${formData.availability.indexOf(day)}_start`] && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors[`availability_${formData.availability.indexOf(day)}_start`]}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">End Time *</label>
                      <input
                        type="time"
                        value={day.slots[0].endTime}
                        onChange={(e) => updateAvailabilityDay(day.id, 'endTime', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      />
                      {errors[`availability_${formData.availability.indexOf(day)}_end`] && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors[`availability_${formData.availability.indexOf(day)}_end`]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center gap-3">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label className="text-gray-700 font-medium">Set profile as active upon approval</label>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </span>
                ) : (
                  "Submit Application"
                )}
              </button>
              
              <p className="text-sm text-gray-500">
                Your application will be reviewed within 2-3 business days
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorApplication;