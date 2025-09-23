import React from 'react';
import { 
  MdOutlineDateRange, MdOutlineStickyNote2, MdOutlineHistory, 
  MdMedicalServices, MdOutlineArrowForwardIos, MdDownload 
} from 'react-icons/md';
import { VscSearch } from "react-icons/vsc";
import { BsCheckCircleFill, BsExclamationTriangleFill } from "react-icons/bs";
import { AiOutlineArrowRight } from "react-icons/ai";

// Dummy patient data
const patientData = {
  name: 'Jane Doe',
  allergies: ['Penicillin', 'Dust'],
  activeConditions: ['Hypertension', 'Type 2 Diabetes'],
  lastVisit: 'Oct 26, 2023',
  upcomingAppointments: [
    { id: 1, date: 'Nov 15, 2023', time: '10:00 AM', doctor: 'Dr. Smith' },
    { id: 2, date: 'Dec 02, 2023', time: '2:00 PM', doctor: 'Dr. Adams' },
  ],
  healthMetrics: [
    { type: 'Blood Pressure', value: '120/80 mmHg', status: 'normal', trend: [125, 122, 120, 118, 120] },
    { type: 'Heart Rate', value: '72 bpm', status: 'normal', trend: [75, 78, 72, 70, 72] },
    { type: 'Blood Sugar', value: '145 mg/dL', status: 'abnormal', trend: [130, 140, 150, 145, 142] },
  ],
  notes: [
    { id: 1, date: 'Oct 26, 2023', text: 'Patient reported feeling better and has been compliant with medication.' },
    { id: 2, date: 'Oct 15, 2023', text: 'Adjusted medication dosage for better blood sugar control.' },
  ],
  labResults: [
    { id: 1, date: 'Oct 20, 2023', test: 'Complete Blood Count', status: 'abnormal' },
    { id: 2, date: 'Oct 15, 2023', test: 'Cholesterol Panel', status: 'normal' },
  ],
};

const HealthRecords = () => {
  // Trend chart component
  const TrendChart = ({ data, status }) => (
    <div className="flex justify-between items-end h-12 w-full p-1 bg-gray-100 rounded-lg">
      {data.map((value, index) => (
        <div
          key={index}
          className={`w-2 rounded-full transition-all duration-300 ${status === 'normal' ? 'bg-teal-400' : 'bg-red-400'}`}
          style={{ height: `${value / 1.5}px` }}
        ></div>
      ))}
    </div>
  );

  return (
    <div className='min-h-screen bg-gray-50 text-gray-800 p-4 lg:p-10 font-sans'>
      
      {/* Header & Search */}
      <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold mb-4 lg:mb-0 text-teal-600">Patient Health Records</h1>
        <div className="relative w-full lg:w-96">
          <input
            type="text"
            placeholder="Search medical history, appointments..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 text-base shadow-sm"
          />
          <VscSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={22} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* --- Left Column: Overview & Actions --- */}
        <div className="space-y-6">
          
          {/* Patient Overview */}
          <div className="bg-gradient-to-r from-teal-50 to-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold mb-4 text-teal-700">Patient Overview</h2>
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-teal-200 rounded-full flex items-center justify-center text-teal-800 font-bold text-lg mr-4 shadow-inner">
                {patientData.name.split(' ').map(n => n[0])?.join('')}
              </div>
              <div>
                <p className="text-lg font-bold">{patientData.name}</p>
                <p className="text-sm text-gray-500">Last Visit: {patientData.lastVisit}</p>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <h3 className="font-semibold text-gray-600">Allergies</h3>
                <p className="text-sm text-red-500 font-bold">{patientData.allergies?.join(', ')}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-600">Active Conditions</h3>
                <p className="text-sm text-yellow-600 font-bold">{patientData.activeConditions?.join(', ')}</p>
              </div>
            </div>

            <button className="w-full bg-teal-500 text-white py-3 rounded-xl font-semibold hover:bg-teal-600 transition-colors flex items-center justify-center shadow-md hover:shadow-lg">
              Book New Appointment <MdOutlineArrowForwardIos className="ml-2" />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold mb-4 text-teal-700">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: MdOutlineDateRange, label: 'Appointments' },
                { icon: MdOutlineHistory, label: 'History' },
                { icon: MdOutlineStickyNote2, label: 'Add Note' },
                { icon: MdDownload, label: 'Download' },
              ].map((action, idx) => (
                <button key={idx} className="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-teal-50 transition-colors shadow-sm">
                  <action.icon size={28} className="mb-2 text-teal-500" />
                  <span className="text-sm font-medium">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* --- Right Column: Health Metrics & Details --- */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          
          {/* Health Metrics */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-teal-700">Health Metrics</h2>
              <button className="text-sm text-teal-500 font-semibold hover:underline flex items-center">
                View All <AiOutlineArrowRight className="ml-1" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {patientData.healthMetrics.map((metric, idx) => (
                <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-2">
                    {metric.status === 'normal' ? (
                      <BsCheckCircleFill className="text-teal-500 mr-2" />
                    ) : (
                      <BsExclamationTriangleFill className="text-red-500 mr-2" />
                    )}
                    <span className="font-medium">{metric.type}</span>
                  </div>
                  <p className="text-2xl font-bold mb-2">{metric.value}</p>
                  <TrendChart data={metric.trend} status={metric.status} />
                </div>
              ))}
            </div>
          </div>

          {/* Lab Results */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-teal-700">Lab Results</h2>
              <button className="text-sm text-teal-500 font-semibold hover:underline flex items-center">
                View All <AiOutlineArrowRight className="ml-1" />
              </button>
            </div>
            {patientData.labResults.map(result => (
              <div key={result.id} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors rounded-lg px-2">
                <div className="flex items-center">
                  <MdMedicalServices size={24} className="text-gray-400 mr-3" />
                  <div>
                    <p className="font-medium">{result.test}</p>
                    <p className="text-sm text-gray-500">{result.date}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className={`text-sm font-semibold p-1 px-3 rounded-full ${result.status === 'normal' ? 'bg-teal-100 text-teal-600' : 'bg-red-100 text-red-600'}`}>
                    {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                  </span>
                  <MdOutlineArrowForwardIos className="text-gray-400 ml-2" />
                </div>
              </div>
            ))}
          </div>

          {/* Notes */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold mb-4 text-teal-700">Patient Notes</h2>
            {patientData.notes.map(note => (
              <div key={note.id} className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors">
                <p className="text-sm text-gray-500 mb-1">{note.date}</p>
                <p className="text-gray-700">{note.text}</p>
              </div>
            ))}
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold mb-4 text-teal-700">Upcoming Appointments</h2>
            {patientData.upcomingAppointments.map(app => (
              <div key={app.id} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors rounded-lg px-2">
                <div className="flex items-center">
                  <MdOutlineDateRange size={24} className="text-gray-400 mr-3" />
                  <div>
                    <p className="font-medium">{app.date} at {app.time}</p>
                    <p className="text-sm text-gray-500">With {app.doctor}</p>
                  </div>
                </div>
                <button className="bg-teal-50 text-teal-600 text-sm py-1 px-3 rounded-full font-semibold hover:bg-teal-100 transition-colors">
                  Details
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default HealthRecords;
