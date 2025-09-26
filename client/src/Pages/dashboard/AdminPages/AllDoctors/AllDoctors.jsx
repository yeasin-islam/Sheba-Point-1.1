import { useState } from "react";
import DataTable from "../../../../Shared/DataTable";
import { FaEye } from "react-icons/fa";
import DataCardGrid from "../../../../Shared/DataCardGrid";

const mockDoctors = [
  {
    id: 1,
    name: "Dr. Darren Elder",
    specialty: "Dental",
    photo: "https://i.pravatar.cc/100?img=11",
    createdAt: "2023-06-11T04:50:00",
    consultationFee: 5000,
    status: "Verified",
    activStatus: "Active",
  },
  {
    id: 2,
    name: "Dr. Deborah Angel",
    specialty: "Cardiology",
    photo: "https://i.pravatar.cc/100?img=12",
    createdAt: "2018-01-04T09:40:00",
    consultationFee: 3300,
    status: "Verified",
    activStatus: "Inactive",
  },
  {
    id: 3,
    name: "Dr. John Gibbs",
    specialty: "Dental",
    photo: "https://i.pravatar.cc/100?img=13",
    createdAt: "2018-04-21T14:59:00",
    consultationFee: 4100,
    status: "Verified",
    activStatus: "Active",
  },
  {
    id: 4,
    name: "Dr. Katharine Berthold",
    specialty: "Orthopaedics",
    photo: "https://i.pravatar.cc/100?img=14",
    createdAt: "2023-03-23T14:50:00",
    consultationFee: 4000,
    status: "Verified",
    activStatus: "Active",
  },
];

const AllDoctors = () => {
  const [doctors, setDoctors] = useState(mockDoctors);

  const toggleStatus = (id) => {
    setDoctors((prev) =>
      prev.map((doc) =>
        doc.id === id
          ? {
              ...doc,
              activStatus: doc.activStatus === "Active" ? "Inactive" : "Active",
            }
          : doc
      )
    );
  };

  const columns = [
    {
      accessorKey: "name",
      header: "Doctor Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <img
            src={row.original.photo}
            alt={row.original.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-medium">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "specialty",
      header: "Speciality",
    },
    {
      accessorKey: "createdAt",
      header: "Member Since",
      cell: ({ row }) => {
        const date = new Date(row.original.createdAt);
        return (
          <div>
            <p>{date.toLocaleDateString()}</p>
            <p className="text-xs text-gray-400">{date.toLocaleTimeString()}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span className="font-semibold text-primary rounded-full px-2 py-1 bg-base-300">
          {row.original.status}
        </span>
      ),
    },
    {
      accessorKey: "consultationFee",
      header: "Earned",
      cell: ({ row }) => (
        <span className="font-semibold">
          ${row.original.consultationFee}.00
        </span>
      ),
    },
    {
      accessorKey: "Detaila",
      header: "Details",
      cell: ({ row }) => (
        <button
          className="btn btn-sm rounded-full hover:bg-primary"
          onClick={() => alert(`Details for ${row.original.name}`)}
        >
          <FaEye className="text-xl" />
        </button>
      ),
    },
    {
      accessorKey: "activStatus",
      header: "Account",
      cell: ({ row }) => {
        const isActive = row.original.activStatus === "Active";
        return (
          <div
            onClick={() => toggleStatus(row.original.id)}
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
              isActive ? "bg-green-500" : "bg-red-500"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                isActive ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </div>
        );
      },
    },
  ];

  return (
    <section className="container mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">List of Doctors</h2>
      <div className="hidden md:block">
        <DataTable data={doctors} columns={columns} />
      </div>
      <div className="md:hidden">
        <DataCardGrid data={doctors} columns={columns} />
      </div>
    </section>
  );
};

export default AllDoctors;
