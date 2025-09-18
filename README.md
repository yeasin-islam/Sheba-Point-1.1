<p align="center">
  <img src="client/public/WebLogo.png" alt="ShebaPoint Logo" width="300" />
</p>

# ShebaPoint - Telemedicine Platform

**Tagline:** *Your health, anywhere, anytime.*

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Data Models](#data-models)
- [Development Strategy](#development-strategy)
- [Security & Compliance](#security--compliance)
- [Testing & Deployment](#testing--deployment)
- [Team Members](#team-members)
- [Team Members & Responsibilities](#team-members--responsibilities)
- [Team Member Roles](#team-member-roles-optional)
- [License](#license)

---

## Project Overview

**ShebaPoint** is a comprehensive telemedicine platform designed to connect patients, doctors, pharmacies, and labs for seamless healthcare delivery. The platform supports video/audio consultations, AI-powered symptom checking, digital prescriptions, medicine ordering, lab bookings, and emergency tele-ambulance requests. Built with scalability, security, and accessibility in mind, ShebaPoint aims to make quality healthcare available to everyone, everywhere.

---

## Features

- **User Roles & Authentication:** Patient, Doctor, Pharmacy/Lab, Admin with role-based access and secure authentication (JWT, OAuth2, OTP).
- **Doctor Search & Booking:** Advanced filters, guest-friendly booking, and contextual login prompts.
- **AI Symptom Checker:** Accessible to all users for quick health assessments.
- **Video/Audio Consultations:** Real-time communication using WebRTC and Socket.io.
- **Digital Prescriptions & Medicine Orders:** Secure prescription management and integrated pharmacy ordering.
- **Lab Test Booking:** Book and receive lab results digitally.
- **Emergency Requests:** Tele-ambulance request and tracking.
- **Push Notifications:** Medicine reminders, alerts, and updates.
- **Offline Support:** Service workers and IndexedDB for intermittent connectivity.
- **Admin Dashboard:** User, content, and analytics management.
- **Security & Compliance:** AES-256 encryption, RBAC, audit logging, and HIPAA-aligned policies.

---

## Tech Stack

| Layer         | Technology                                      | Purpose/Description                                 |
|---------------|-------------------------------------------------|-----------------------------------------------------|
| Frontend      | React.js, Tailwind CSS                          | UI, responsive design, component-based architecture |
| State Mgmt    | React Query / Redux                             | Data fetching, caching, global state                |
| Routing       | React Router                                    | SPA navigation, route protection                    |
| Backend       | Node.js, Express.js                             | RESTful API server, business logic                  |
| Database      | MongoDB                                         | Document store for users, records, chats            |
| Cache         | Redis                                           | AI response/session cache, rate limiting            |
| AI/ML         | OpenAI/Gemini API, TensorFlow.js                | Symptom checker, AI notes, analytics                |
| Real-Time     | WebRTC, Socket.io, Firestore                    | Video/audio, real-time messaging                    |
| Payments      | SSL-Commerz, bKash, Nagad, Stripe               | Payment processing, subscriptions                   |
| Security      | JWT, OAuth2, AES-256                            | Auth, authorization, encryption                     |
| Notifications | Firebase Cloud Messaging                        | Push notifications                                  |
| Offline       | Service Workers, IndexedDB                      | Offline-first experience                            |
| Analytics     | Google Analytics, Custom Dashboards             | Usage tracking, performance monitoring              |

---
## Folder Structure

```
/shebapoint
  ├── /client                                       # [folder] Frontend (React)
  │   ├── /public                                   # [folder] Static files (FavIcon.png, WebLogo.png, etc.)
  │   └── /src                                      # [folder] Source code
  │   │    ├── /api                                 # [folder] API request functions
  │   │    ├── /assets                              # [folder] Images, icons, fonts
  │   │    ├── /components                          # [folder] React components
  │   │    │   ├── /auth                            # [folder] Auth components
  │   │    │   ├── /common                          # [folder] Common/reusable components
  │   │    │   ├── /Doctor                          # [folder] Doctor-related components
  │   │    │   ├── /Footer                          # [folder] Footer components
  │   │    │   ├── /Navbar                          # [folder] Navbar components
  │   │    │   ├── /PageIndications                 # [folder] Page indication components
  │   │    │   ├── /patient                         # [folder] Patient-related components
  │   │    │   ├── /pharmacy                        # [folder] Pharmacy-related components
  │   │    │   ├── /symptomChecker                  # [folder] Symptom checker UI
  │   │    │   ├── /ui                              # [folder] UI helpers (ErrorState, Skeleton, etc.)
  │   │    ├── /Context                             # [folder] Context providers
  │   │    │   ├── /AuthContext                     # [folder] Auth context
  │   │    │   └── /AuthProvider                    # [folder] Auth provider
  │   │    ├── /contexts                            # [folder] React contexts
  │   │    ├── /Firebase                            # [folder] Firebase config/init
  │   │    ├── /Layouts                             # [folder] Layout components
  │   │    │   ├── /AuthLayout                      # [folder] Auth layout
  │   │    │   ├── /DashboardLayout                 # [folder] Dashboard layout
  │   │    │   └── /MainLayout                      # [folder] Main layout
  │   │    ├── /Pages                               # [folder] Page components
  │   │    │   ├── /About                           # [folder] About page
  │   │    │   │   └── /OurMission                  # [folder] Mission section
  │   │    │   ├── /admin                           # [folder] Admin pages
  │   │    │   ├── /Auth                            # [folder] Auth pages
  │   │    │   ├── /Authentication                  # [folder] Authentication flows
  │   │    │   │   ├── /AuthHome                    # [folder] Auth home
  │   │    │   │   ├── /AuthNav                     # [folder] Auth navigation
  │   │    │   │   ├── /Login                       # [folder] Login page
  │   │    │   │   ├── /Register                    # [folder] Register page
  │   │    │   │   └── /SocialLogin                 # [folder] Social login
  │   │    │   ├── /dashboard                       # [folder] Dashboard pages
  │   │    │   │   ├── /AdminPages                  # [folder] Admin dashboard pages
  │   │    │   │   │   ├── /AdminProfile            # [folder] Admin profile
  │   │    │   │   │   ├── /AllDoctors              # [folder] All doctors
  │   │    │   │   │   ├── /AllPatients             # [folder] All patients
  │   │    │   │   │   ├── /ManageReport            # [folder] Report management
  │   │    │   │   │   ├── /Overview                # [folder] Overview
  │   │    │   │   │   ├── /PendingDoctors.jsx      # [file] Pending doctors
  │   │    │   │   │   └── /PendingPharma&Labs      # [folder] Pending pharmacies/labs
  │   │    │   │   ├── /DashboardHome               # [folder] Dashboard home
  │   │    │   │   ├── /DoctorsPages                # [folder] Doctor dashboard pages
  │   │    │   │   │   ├── /Appointments            # [folder] Appointments
  │   │    │   │   │   ├── /DoctorConsultation      # [folder] Consultation
  │   │    │   │   │   ├── /DoctorProfile           # [folder] Doctor profile
  │   │    │   │   │   ├── /DoctorsPatient          # [folder] Doctor's patients
  │   │    │   │   │   ├── /ManageBookings          # [folder] Manage bookings
  │   │    │   │   │   ├── /MyPatients              # [folder] My patients
  │   │    │   │   │   └── /Referrals               # [folder] Referrals
  │   │    │   │   ├── /PatientsPages               # [folder] Patient dashboard pages
  │   │    │   │   │   ├── /DoctorApplication.jsx   # [file] Doctor application
  │   │    │   │   │   ├── /HealthRecords           # [folder] Health records
  │   │    │   │   │   ├── /MedicineReminders       # [folder] Medicine reminders
  │   │    │   │   │   ├── /MyBooking               # [folder] My bookings
  │   │    │   │   │   ├── /PatientConsultation     # [folder] Patient consultation
  │   │    │   │   │   └── /PatientProfile          # [folder] Patient profile
  │   │    │   ├── /doctor                          # [folder] Doctor pages
  │   │    │   ├── /DoctorDetailsPage               # [folder] Doctor details
  │   │    │   ├── /Emergency                       # [folder] Emergency page
  │   │    │   ├── /ErrorPage                       # [folder] Error page
  │   │    │   ├── /guest                           # [folder] Guest pages
  │   │    │   ├── /Home                            # [folder] Home page
  │   │    │   │   ├── /Banner                      # [folder] Banner section
  │   │    │   │   └── /Home                        # [folder] Home section
  │   │    │   ├── /patient                         # [folder] Patient pages
  │   │    │   ├── /pharmacy                        # [folder] Pharmacy pages
  │   │    │   └── /public                          # [folder] Public pages
  │   │    ├── /routes                              # [folder] Route definitions
  │   │    ├── /services                            # [folder] Service integrations
  │   │    ├── /Shared                              # [folder] Shared components
  │   │    ├── /store                               # [folder] State management
  │   │    ├── /styles                              # [folder] Global styles
  │   │    └── /utils                               # [folder] Utility functions
  │   │    ├── index.css                            # [file] Global CSS
  │   │    ├── main.jsx                             # [file] React entry point
  │   ├── .env.local                                # [file] Local environment variables
  │   ├── .gitignore                                # [file] Git ignore rules
  │   ├── eslint.config.js                          # [file] ESLint configuration
  │   ├── index.html                                # [file] Main HTML entry
  │   ├── package.json                              # [file] NPM dependencies and scripts
  │   ├── pnpm-lock.yaml                            # [file] pnpm lockfile
  │   ├── README.md                                 # [file] Frontend documentation
  │   ├── tailwind.config.js                        # [file] Tailwind CSS config
  │   └── vite.config.js                            # [file] Vite config
  │
  ├── /docs                                         # [folder] API docs, architecture diagrams, user guides
  │
  ├── /server                                       # [folder] Backend (Node.js + Express + MongoDB)

  │   ├── /config                                   # [folder] Config files
  │   ├── /controllers                              # [folder] API controllers
  │   ├── /db                                       # [folder] Database connection
  │   ├── /middlewares                              # [folder] Express middlewares
  │   ├── /models                                   # [folder] Mongoose models
  │   ├── /routes                                   # [folder] API routes
  │   ├── /scripts                                  # [folder] Scripts (seeders, etc.)
  │   ├── /services                                 # [folder] Business logic/services
  │   ├── /tests                                    # [folder] Unit/integration tests
  │   ├── /utils                                    # [folder] Utility functions
  │   ├── .env                                      # [file] Server environment variables
  │   ├── .gitignore                                # [file] Git ignore rules
  │   ├── package.json                              # [file] NPM dependencies and scripts
  │   ├── README.md                                 # [file] Backend documentation
  │   └── server.js                                 # [file] Server entry point
  │
  └── /README.md                                    # [file] Project documentation
```

---

## Data Models

```plaintext
User {
  id: ObjectId,
  name: String,
  email: String,
  passwordHash: String,
  role: { type: String, enum: ['patient', 'doctor', 'pharmacy', 'lab', 'admin'] },
  createdAt: Date,
  updatedAt: Date
}

PatientProfile {
  userId: ObjectId,
  phone: String,
  address: String,
  dateOfBirth: Date,
  gender: { type: String, enum: ['male', 'female', 'other'] },
  insuranceInfo: String,
  medicalHistory: [String],
  allergies: [String],
  medications: [String],
  createdAt: Date,
  updatedAt: Date
}

DoctorProfile {
  userId: ObjectId,
  specialty: String,
  qualifications: [String],
  experience: Number,
  clinicAddress: String,
  phone: String,
  consultationFee: Number,
  createdAt: Date,
  updatedAt: Date
}

Appointment {
  id: ObjectId,
  patientId: ObjectId,
  doctorId: ObjectId,
  pharmacyId: ObjectId,
  labId: ObjectId,
  status: { type: String, enum: ['scheduled', 'completed', 'canceled'] },
  appointmentType: { type: String, enum: ['video', 'audio', 'in-person'] },
  symptoms: [String],
  prescription: String,
  labTests: [String],
  createdAt: Date,
  updatedAt: Date
}

Prescription {
  id: ObjectId,
  appointmentId: ObjectId,
  patientId: ObjectId,
  doctorId: ObjectId,
  pharmacyId: ObjectId,
  medications: [String],
  dosage: [String],
  frequency: [String],
  instructions: String,
  createdAt: Date,
  updatedAt: Date
}

LabTest {
  id: ObjectId,
  appointmentId: ObjectId,
  patientId: ObjectId,
  doctorId: ObjectId,
  labId: ObjectId,
  tests: [String],
  results: [String],
  createdAt: Date,
  updatedAt: Date
}

Chat {
  id: ObjectId,
  senderId: ObjectId,
  receiverId: ObjectId,
  message: String,
  timestamp: Date
}

Notification {
  id: ObjectId,
  userId: ObjectId,
  type: String,
  message: String,
  isRead: Boolean,
  timestamp: Date
}
```

---

## Development Strategy

- **Agile Methodology:** Iterative development, continuous feedback, and adaptive planning.
- **Sprints:** 2-week sprints with defined goals, deliverables, and reviews.
- **Daily Stand-ups:** 15-minute meetings to discuss progress, plans, and blockers.
- **Sprint Reviews:** Demonstrate completed features and gather feedback.
- **Retrospectives:** Reflect on the sprint, discuss improvements, and celebrate successes.

---

## Security & Compliance

- **Data Encryption:** AES-256 encryption for data at rest and in transit.
- **Authentication & Authorization:** JWT and OAuth2 for secure access.
- **Role-Based Access Control (RBAC):** Fine-grained access control based on user roles.
- **Audit Logging:** Comprehensive logging of user activities and system events.
- **HIPAA Compliance:** Adherence to HIPAA regulations for handling healthcare data.
- **Regular Security Assessments:** Periodic security reviews and vulnerability assessments.

---

## Testing & Deployment

- **Testing Frameworks:** Jest and React Testing Library for unit and integration tests.
- **End-to-End Testing:** Cypress for simulating user interactions and testing workflows.
- **Continuous Integration (CI):** Automated testing and linting on code commits and pull requests.
- **Continuous Deployment (CD):** Automated deployment to staging and production environments.
- **Monitoring & Logging:** Real-time monitoring and logging of application performance and errors.

---

## Team Members

- [yeasin-islam](https://github.com/yeasin-islam)
- [tanmayislam2006](https://github.com/tanmayislam2006)
- [shakilsarkar12](https://github.com/shakilsarkar12)
- [Bokul98](https://github.com/Bokul98)

---

## Team Member Roles (Optional)

- **Project Manager:** Oversees the project, manages the timeline, and coordinates the team.
- **Frontend Developers:** Develop the client-side application, implement UI/UX designs, and ensure responsiveness.
- **Backend Developers:** Develop the server-side application, implement APIs, and manage the database.
- **DevOps Engineer:** Manage the deployment pipeline, monitor application performance, and ensure security.
- **QA Engineer:** Conduct testing, identify bugs, and ensure the quality of the application.
- **UI/UX Designer:** Design the user interface, create prototypes, and conduct user research.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
