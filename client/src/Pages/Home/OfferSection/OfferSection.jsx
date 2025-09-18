import React from 'react';

// Icon components
const StethoscopeIcon = () => (
  <svg
    className="w-12 h-12 text-[#049CA0]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
    />
  </svg>
);

const LabTestIcon = () => (
  <svg
    className="w-12 h-12 text-[#049CA0]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
    />
  </svg>
);

const MedicineIcon = () => (
  <svg
    className="w-12 h-12 text-[#049CA0]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
    />
  </svg>
);

// Static offer data (can be replaced with props.)
const defaultOffers = [
  {
    id: 1,
    title: "First Consultation Free",
    description: "Book your first online consultation with any specialist completely free",
    icon: <StethoscopeIcon />,
    link: "/book-consultation"
  },
  {
    id: 2,
    title: "20% Off Lab Tests",
    description: "Get 20% discount on all laboratory tests and health checkups",
    icon: <LabTestIcon />,
    link: "/lab-tests"
  },
  {
    id: 3,
    title: "Flat Tk 100 off on Medicine Orders",
    description: "Min. order value Tk 500. Valid on prescription medicines",
    icon: <MedicineIcon />,
    link: "/medicines"
  }
];

const OfferSection = ({ offers = defaultOffers }) => {
  return (
    <section className="bg-[#F0FDFA] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Exclusive Health Offers
          </h2>
          <p className="text-slate-600 text-lg">
            Save more on consultations, lab tests, and medicines
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
            >
              <div className="flex flex-col items-center md:items-start">
                <div className="mb-4">{offer.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 text-center md:text-left">
                  {offer.title}
                </h3>
                <p className="text-slate-600 mb-6 text-center md:text-left">
                  {offer.description}
                </p>
                <button
                  onClick={() => window.location.href = offer.link}
                  className="px-6 py-2 bg-[#049CA0] text-white rounded-lg font-semibold hover:bg-[#038387] transition-colors duration-300 mt-auto"
                >
                  Avail Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfferSection;