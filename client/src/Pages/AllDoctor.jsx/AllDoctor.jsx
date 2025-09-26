import { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";

const AllDoctor = ({ doctorsData }) => {
  
  // Theme colors
  const colors = {
    primary: "#209187",
    secondary: "#1f2937",
    background: "#ffffff",
    card: "#ffffff",
    accent: "#f3f4f6",
    active: "#10b981",
    inactive: "#9ca3af",
  };

  const [allDoctors, setAllDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [view, setView] = useState("grid");
  const [sortBy, setSortBy] = useState("high-rating");
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const [activeStatusFilter, setActiveStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch doctors from API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/doctors");
        setAllDoctors(res.data || []);
        setFilteredDoctors(res.data || []);
      } catch (err) {
        console.error(err);
        setAllDoctors([]);
        setFilteredDoctors([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  // Update doctors if doctorsData prop changes
  useEffect(() => {
    if (doctorsData && Array.isArray(doctorsData)) {
      setAllDoctors(doctorsData);
      setFilteredDoctors(doctorsData);
    }
  }, [doctorsData]);

  // Sorting function
  const sortDoctors = (doctors) => {
    const sorted = [...doctors];
    if (sortBy === "high-rating") return sorted.sort((a, b) => b.ratings - a.ratings);
    if (sortBy === "low-rating") return sorted.sort((a, b) => a.ratings - b.ratings);
    return sorted;
  };

  // Filtering doctors
  useEffect(() => {
    if (!allDoctors) return;

    const filtered = allDoctors.filter((doc) => {
      const search = searchTerm.toLowerCase();
      const matchesSearch =
        doc.name?.toLowerCase().includes(search) ||
        doc.specialties?.some((s) => s.toLowerCase().includes(search)) ||
        doc.address?.toLowerCase().includes(search);

      const matchesGender = genderFilter ? doc.gender === genderFilter : true;
      const matchesLanguage = languageFilter
        ? doc.languages?.some((l) => l.toLowerCase() === languageFilter.toLowerCase())
        : true;
      const matchesActiveStatus = activeStatusFilter
        ? doc.activeStatus === activeStatusFilter
        : true;

      return matchesSearch && matchesGender && matchesLanguage && matchesActiveStatus;
    });

    setFilteredDoctors(sortDoctors(filtered));
  }, [searchTerm, sortBy, allDoctors, genderFilter, languageFilter, activeStatusFilter, sortDoctors]);

  // Grid/List card component
  const DoctorCard = ({ doc }) => {
    const isNew = new Date(doc.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return (
      <div
        className={`flex flex-col ${
          view === "list" ? "sm:flex-row" : ""
        } bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden`}
      >
        <div
          className={`relative ${
            view === "list" ? "sm:w-52 sm:h-52 w-full h-64" : "w-full h-64"
          }`}
        >
          <img
            src={doc.profileImage}
            alt={doc.name}
            className="w-full h-full object-cover"
          />
          {/* Rating */}
          <div className="absolute top-2 left-2 flex items-center bg-yellow-500 px-2 py-1 rounded text-white text-sm font-semibold shadow">
            ⭐ {doc.ratings?.toFixed(1)}
          </div>
          {/* NEW Badge */}
          {isNew && (
            <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow">
              NEW
            </div>
          )}
          {/* Active Status */}
          <div
            className={`absolute bottom-2 left-2 px-3 py-1 rounded-full text-xs font-bold shadow ${
              doc.activeStatus === "active"
                ? "bg-green-500 text-white"
                : "bg-gray-400 text-white"
            }`}
          >
            {doc.activeStatus === "active" ? "Active" : "Inactive"}
          </div>
        </div>
        {/* Content */}
        <div className="flex flex-col justify-between p-4 flex-grow">
          <div>
            <h3 className="text-lg font-bold text-gray-900 truncate">
              {doc.name}
            </h3>
            <p className="flex items-center text-sm font-medium text-teal-600 mt-1 truncate">
              📍 {doc.address}
            </p>
            <p className="mt-2 text-sm text-gray-600 truncate">
              {doc.specialties?.join(", ")}
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm font-semibold text-teal-600">
              {doc.experienceYears} yrs exp
            </span>
            <Link
              to={`/doctor-details-page/${doc._id}`}
              className="px-4 py-2 rounded-full text-sm font-medium bg-teal-600 text-white hover:bg-teal-700 transition-colors"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-teal-600">All Doctors</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-500 mt-2">
          Find the best doctors based on your requirements
        </p>
        <p className="mt-2 text-gray-700">
          Showing <span className="font-bold text-teal-600">{filteredDoctors.length}</span> of{" "}
          <span className="font-bold">{allDoctors.length}</span> doctors
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-64 p-5 rounded-xl shadow-md border bg-white border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-teal-600">Filters</h2>

          {/* Search */}
          <input
            type="text"
            placeholder="Search by name, specialty, location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered w-full rounded-lg py-2 px-3 mb-4 border-gray-300 focus:border-teal-600 focus:ring focus:ring-teal-100"
          />

          {/* Sort */}
          <label className="block mb-1 font-semibold">Sort by</label>
          <select
            className="select select-bordered w-full rounded-lg mb-4 border-gray-300 focus:border-teal-600 focus:ring focus:ring-teal-100"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="high-rating">Rating (Highest)</option>
            <option value="low-rating">Rating (Lowest)</option>
          </select>

          {/* Gender */}
          <label className="block mb-1 font-semibold">Gender</label>
          <select
            className="select select-bordered w-full rounded-lg mb-4 border-gray-300 focus:border-teal-600 focus:ring focus:ring-teal-100"
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          {/* Language */}
          <label className="block mb-1 font-semibold">Language</label>
          <select
            className="select select-bordered w-full rounded-lg mb-4 border-gray-300 focus:border-teal-600 focus:ring focus:ring-teal-100"
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="Bangla">Bangla</option>
            <option value="English">English</option>
          </select>

          {/* Active Status */}
          <label className="block mb-1 font-semibold">Active Status</label>
          <select
            className="select select-bordered w-full rounded-lg mb-4 border-gray-300 focus:border-teal-600 focus:ring focus:ring-teal-100"
            value={activeStatusFilter}
            onChange={(e) => setActiveStatusFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          {/* View Toggle */}
          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={() => setView("list")}
              className={`w-10 h-10 rounded-lg border ${view === "list" ? "bg-teal-600 text-white" : "bg-white text-gray-600"} transition`}
            >
              📄
            </button>
            <button
              onClick={() => setView("grid")}
              className={`w-10 h-10 rounded-lg border ${view === "grid" ? "bg-teal-600 text-white" : "bg-white text-gray-600"} transition`}
            >
              🔳
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {loading ? (
            <p>Loading doctors...</p>
          ) : filteredDoctors.length === 0 ? (
            <p>No doctors found.</p>
          ) : (
            filteredDoctors.map((doc) => <DoctorCard key={doc._id} doc={doc} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default AllDoctor;
