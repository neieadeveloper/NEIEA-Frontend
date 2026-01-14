import React from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { format } from "date-fns";
import { Loader2, Download } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { renderToString } from "react-dom/server";
import DonationReceiptPDF from "./DonationReceipt";

const DonationHistory = () => {
  const { data: donations, isLoading, error } = useQuery({
    queryKey: ["donorDonations"],
    queryFn: async () => {
      const response = await axiosInstance.get("/donor/donations");
      return response.data.data;
    },
  });

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (isVerified) => (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isVerified ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      }`}
    >
      {isVerified ? "Completed" : "Pending"}
    </span>
  );

  const getFrequencyBadge = (frequency) => {
    const frequencyMap = {
      once: "One-Time",
      monthly: "Monthly",
      quarterly: "Quarterly",
      annually: "Annual",
    };

    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        {frequencyMap[frequency] || frequency}
      </span>
    );
  };

  const generateReceipt = async (donation) => {
    const receiptHtml = renderToString(<DonationReceiptPDF donation={donation} />);

    const receiptElement = document.createElement("div");
    receiptElement.innerHTML = receiptHtml;
    receiptElement.style.position = "absolute";
    receiptElement.style.left = "-9999px";
    document.body.appendChild(receiptElement);

    try {
      const canvas = await html2canvas(receiptElement, {
        scale: 2,
        logging: true,
        useCORS: true,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`Donation_Receipt_${donation.razorpayOrderId}.pdf`);
    } catch (err) {
      console.error("Error generating PDF:", err);
    } finally {
      document.body.removeChild(receiptElement);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );

  if (error)
    return (
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <Info className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Error loading donation history
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <p>Failed to load donation history. Please try again later.</p>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-row items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Your Donations</h2>
        <div className="text-sm text-muted-foreground">
          {donations?.length || 0} records found
        </div>
      </div>
      {donations?.length === 0 ? (
        <div className="text-center py-12">
          <Info className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No donations</h3>
          <p className="mt-1 text-sm text-gray-500">
            You haven't made any donations yet.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Donor
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Frequency
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tier
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {donations.map((donation) => (
                <tr key={donation._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(donation.createdAt), "dd MMM yyyy")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <div>{donation.firstName} {donation.lastName}</div>
                    <div className="text-sm text-gray-500">{donation.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    {formatAmount(donation.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getFrequencyBadge(donation.frequency)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                      {donation.donorType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getStatusBadge(donation.isVerified)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => generateReceipt(donation)}
                      disabled={!donation.isVerified}
                      title={
                        donation.isVerified
                          ? "Download receipt"
                          : "Receipt not available for pending donations"
                      }
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DonationHistory;
