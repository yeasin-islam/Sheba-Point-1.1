import { useState } from "react";
import DataTable from "../../../../Shared/DataTable"; // reusable component
import DataCardGrid from "../../../../Shared/DataCardGrid";

const mockPatients = [
  {
    id: 1,
    name: "Alice Johnson",
    phone: "+8801700000001",
    address: "Dhaka, Bangladesh",
    dateOfBirth: "1995-04-10",
    gender: "female",
    insuranceInfo: "GreenLife Insurance #A12345",
    medicalHistory: ["Asthma"],
    allergies: ["Peanuts"],
    medications: ["Inhaler"],
    createdAt: "2023-06-10T08:30:00",
  },
  {
    id: 2,
    name: "Michael Smith",
    phone: "+8801700000002",
    address: "Chittagong, Bangladesh",
    dateOfBirth: "1988-09-22",
    gender: "male",
    insuranceInfo: "MediCare Plus #B67890",
    medicalHistory: ["Diabetes"],
    allergies: ["None"],
    medications: ["Insulin"],
    createdAt: "2023-03-15T11:15:00",
  },
  {
    id: 3,
    name: "Sophia Lee",
    phone: "+8801700000003",
    address: "Khulna, Bangladesh",
    dateOfBirth: "2000-12-05",
    gender: "female",
    insuranceInfo: "HealthFirst #C55555",
    medicalHistory: ["Migraine"],
    allergies: ["Dust"],
    medications: ["Pain Relievers"],
    createdAt: "2023-01-20T09:00:00",
  },
  {
    id: 4,
    name: "David Brown",
    phone: "+8801700000004",
    address: "Sylhet, Bangladesh",
    dateOfBirth: "1992-07-18",
    gender: "male",
    insuranceInfo: "CarePlus #D22222",
    medicalHistory: ["Hypertension"],
    allergies: ["Seafood"],
    medications: ["Beta Blockers"],
    createdAt: "2023-07-01T13:45:00",
  },
];

const AllPatients = () => {
  const [patients] = useState(mockPatients);

  const columns = [
    {
      accessorKey: "name",
      header: "Patient Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <img
            src={`https://i.pravatar.cc/100?img=${row.original.id + 20}`}
            alt={row.original.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-medium">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "address",
      header: "Address",
    },
    {
      accessorKey: "dateOfBirth",
      header: "Date of Birth",
      cell: ({ row }) =>
        new Date(row.original.dateOfBirth).toLocaleDateString(),
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.gender}</span>
      ),
    },
    {
      accessorKey: "insuranceInfo",
      header: "Insurance Info",
    },
    {
      accessorKey: "createdAt",
      header: "Member Since",
      cell: ({ row }) => {
        const date = new Date(row.original.createdAt);
        return (
          <div>
            <p>{date.toLocaleDateString()}</p>
            <p className="text-xs text-gray-400">
              {date.toLocaleTimeString()}
            </p>
          </div>
        );
      },
    },
  ];

  return (
    <section className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">List of Patients</h2>
    
      <div className="hidden md:block">
        <DataTable data={patients} columns={columns} />
      </div>
 
      <div className="md:hidden">
        <DataCardGrid data={patients} columns={columns} />
      </div>
    </section>
  );
};

export default AllPatients;
