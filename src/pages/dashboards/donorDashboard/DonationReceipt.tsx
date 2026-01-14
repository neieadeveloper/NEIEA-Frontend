import React from "react";
import { format } from "date-fns";

const DonationReceiptPDF = ({ donation }) => {
  const formatAmount = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);

  const watermarkStyle = {
    backgroundImage:
      "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkt6uqT8QVym9Vi4OizVqcc2q-031gr7ozSw&s')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    opacity: 0.1,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  };

  return (
    <div className="p-12 bg-gray-100 min-h-screen flex items-center justify-center relative">
      <div style={watermarkStyle}></div>
      <div
        className="shadow-xl rounded-lg border border-gray-200 p-12 max-w-4xl w-full relative"
        style={{ lineHeight: "2.0" }}
      >
        {/* Header */}
        <div className="text-center border-b-2 border-blue-500 pb-8 mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            The New Equitable and Innovative Educational Association (NEIEA)
          </h1>
          <p className="text-xl text-gray-600">Donation Receipt</p>
        </div>

        {/* Receipt Info */}
        <div className="flex justify-between mb-10">
          <div className="text-left">
            <p className="font-semibold text-gray-800 text-xl">
              Receipt # {donation.razorpayOrderId}
            </p>
            <p className="text-gray-600 mt-3 text-lg">
              Date: {format(new Date(donation.createdAt), "dd MMMM yyyy")}
            </p>
          </div>
          <div className="text-right">
            <p className="text-yellow-600 font-bold text-3xl">
              {formatAmount(donation.amount)}
            </p>
            <p className="text-gray-600 mt-3 text-lg capitalize">
              {donation.frequency.replace(/([A-Z])/g, " $1").trim()} Donation
            </p>
          </div>
        </div>

        {/* Donor Info */}
        <div className="mb-10">
          <h3 className="font-semibold text-red-700 text-2xl mb-6 border-b border-gray-200 pb-3">
            Donor Information
          </h3>
          <div className="bg-gray-50 rounded-lg p-8 space-y-6">
            <div className="flex items-baseline">
              <p className="font-semibold text-gray-700 w-40">Name:</p>
              <p className="text-gray-600 text-lg">
                {donation.firstName} {donation.lastName}
              </p>
            </div>
            <div className="flex items-baseline">
              <p className="font-semibold text-gray-700 w-40">Email:</p>
              <p className="text-gray-600 text-lg">{donation.email}</p>
            </div>
            <div className="flex items-baseline">
              <p className="font-semibold text-gray-700 w-40">Phone:</p>
              <p className="text-gray-600 text-lg">{donation.phone}</p>
            </div>
            <div className="flex items-baseline">
              <p className="font-semibold text-gray-700 w-40">Address:</p>
              <p className="text-gray-600 text-lg">
                {donation.address}, {donation.city}, {donation.state}{" "}
                {donation.zipCode}, {donation.country}
              </p>
            </div>
          </div>
        </div>

        {/* Payment Info */}
        <div className="mb-10">
          <h3 className="font-semibold text-red-700 text-2xl mb-6 border-b border-gray-200 pb-3">
            Payment Details
          </h3>
          <div className="bg-gray-50 rounded-lg p-8 space-y-6">
            <div className="flex items-baseline">
              <p className="font-semibold text-gray-700 w-40">
                Transaction ID:
              </p>
              <p className="text-gray-600 text-lg">
                {donation.razorpayPaymentId}
              </p>
            </div>
            <div className="flex items-baseline">
              <p className="font-semibold text-gray-700 w-40">Donation Tier:</p>
              <p className="text-gray-600 text-lg">{donation.donorType}</p>
            </div>
            <div className="flex items-baseline">
              <p className="font-semibold text-gray-700 w-40">Status:</p>
              <p className="text-gray-600 text-lg">
                {donation.isVerified ? "Completed" : "Pending"}
              </p>
            </div>
          </div>
        </div>

        {/* Thank You */}
        <div className="bg-gray-50 p-8 rounded-lg text-center text-gray-700 mb-10">
          <p className="text-xl">
            Thank you for your generous donation. Your support helps us continue
            our mission.
          </p>
        </div>

        {/* Footer */}
        <div className="text-center text-base text-gray-500 border-t border-gray-200 pt-8">
          <p className="font-semibold text-lg">
            NEIEA - Educational Initiatives
          </p>
          <p className="my-3">Tax Exempt ID: 123456789</p>
          <p className="mt-3">
            <a
              href="mailto:contact@neiea.org"
              className="text-blue-600 hover:underline"
            >
              contact@neiea.org
            </a>{" "}
            |{" "}
            <a
              href="https://www.neiea.org"
              className="text-blue-600 hover:underline"
            >
              www.neiea.org
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DonationReceiptPDF;
