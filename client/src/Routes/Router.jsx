import MainLayout from "../Layouts/MainLayout/MainLayout";
import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home/Home";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import Appointments from "../pages/Dashboard/DoctorsPages/Appointments/Appointments";
import Referrals from "../pages/Dashboard/DoctorsPages/Referrals/Referrals";
import DoctorsPatient from "../pages/Dashboard/DoctorsPages/DoctorsPatient/DoctorsPatient";
import DoctorConsulation from "../pages/Dashboard/DoctorsPages/DoctorConsultation/DoctorConsultation";
import PatientConsultation from "../pages/Dashboard/PatientsPages/PatientConsultation/PatientConsultation";
import HealthRecords from "../pages/Dashboard/PatientsPages/HealthRecords/HealthRecords";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import MedicineReminders from "../pages/Dashboard/PatientsPages/MedicineReminders/MedicineReminders";
import PatientProfile from "../pages/Dashboard/PatientsPages/PatientProfile/PatientProfile";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import About from "../pages/About/About";
import AllPatients from "../pages/Dashboard/AdminPages/AllPatients/AllPatients";
import ManageReport from "../Pages/dashboard/AdminPages/ManageReport/ManageReport";
import PendingDoctors from "../Pages/dashboard/AdminPages/PendingDoctors.jsx/PendingDoctors";
import PendingPharmaLabs from "../Pages/dashboard/AdminPages/PendingPharma&Labs/PendingPharmaLabs";
import AdminProfile from "../Pages/dashboard/AdminPages/AdminProfile/AdminProfile";
import Emergency from "../pages/Emergency/Emergency";
import MyBooking from "../pages/Dashboard/PatientsPages/MyBooking/MyBooking";
import MyBookingDetails from "../pages/Dashboard/PatientsPages/MyBooking/MyBookingDetails";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import AuthHome from "../pages/Authentication/AuthHome/AuthHome";
import ManageBookings from "../pages/Dashboard/DoctorsPages/ManageBookings/ManageBookings";
import MyPatients from "../pages/Dashboard/DoctorsPages/MyPatients/MyPatients";
import PaymentSuccess from "../components/Payments/PaymentSuccess";
import PaymentFail from "../components/Payments/PaymentFail";
import PaymentCancel from "../components/Payments/PaymentCancel";
import AllDoctor from "../Pages/AllDoctor.jsx/AllDoctor";
import DoctorDetailsPage from "../Pages/DoctorDetailsPage/DoctorDetailsPage";
import ConsultationLayout from "../Layouts/ConsultationLayout";
import DoctorApplication from "../Pages/dashboard/PatientsPages/DoctorApplication";
import DoctorProfile from "../components/Doctor/DoctorProfile";
import AllDoctors from "../Pages/dashboard/AdminPages/AllDoctors/AllDoctors";

export const router = createBrowserRouter([
  // Keep standards, use elements instead of Components for consistency
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "doctor-details-page/:id",
        element: <DoctorDetailsPage />,
      },
      {
        path: "payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "all-doctors",
        element: <AllDoctor />,
      },
      {
        path: "payment-fail",
        element: <PaymentFail />,
      },
      {
        path: "payment-cancel",
        element: <PaymentCancel />,
      },
      {
        path: "all-available-doctors",
        element: <AllDoctor />,
      },

      // {
      //   path: "/login",
      //   Component: Login,
      // },
      // {
      //   path: "/register",
      //   element: <Register></Register>,
      // },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "/emergency",
        element: <Emergency />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },

      // Patients Private Pages
      // These routes will be wrapped with private route after role setup
      {
        path: "patient/consultation/:consultationId",
        element: <PatientConsultation />,
      },
      {
        path: "patient/health-records",
        element: <HealthRecords />,
      },
      {
        path: "patient/profile",
        element: <PatientProfile></PatientProfile>,
      },
      {
        path: "patient/doctor-application",
        element: <DoctorApplication />,
      },
      {
        path: "patient/my-booking",
        element: <MyBooking />,
      },
      {
        path: "patient/my-booking-details",
        element: <MyBookingDetails />,
      },
      // Doctors Private Pages
      // These routes will be wrapped with private route after role setup
      {
        path: "doctor/appointments",
        element: <Appointments />,
      },
      {
        path: "doctor/consultation/:consultationId",
        element: <DoctorConsulation />,
      },
      {
        path: "doctor/referrals",
        element: <Referrals />,
      },
      {
        path: "doctor/manage-bookings",
        element: <ManageBookings />,
      },
      {
        path: "doctor/profile",
        element: <DoctorProfile />,
      },
      {
        path: "doctor/patient/:patientId",
        element: <DoctorsPatient />,
      },
      // Admin Private Pages
      // These routes will be wrapped with private route after role setup
      {
        path: "all-patients",
        element: <AllPatients />,
      },
      {
        path: "my-patients",
        element: <MyPatients />,
      },
      {
        path: "all-doctors",
        element: <AllDoctors />,
      },
      {
        path: "reports",
        element: <ManageReport />,
      },
      {
        path: "pending-pharmacies&labs",
        element: <PendingPharmaLabs />,
      },
      {
        path: "pending-doctors",
        element: <PendingDoctors />,
      },
      {
        path: "admin-profile",
        element: <AdminProfile />,
      },
    ],
  },
  {
    path: "/consultation",
    element: <ConsultationLayout></ConsultationLayout>,
  },
  {
    path: "/*",
    element: <ErrorPage></ErrorPage>,
  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        index: true,
        element: <AuthHome />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);
