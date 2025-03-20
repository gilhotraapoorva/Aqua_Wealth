"use client";

import { useState } from "react";
import { applyForLoan } from "@/lib/api";

export default function ApplyForLoan() {
  const [formData, setFormData] = useState({
    name: "", 
    email: "", 
    governmentId: "",
    amount: "",
    collateral: "No",
    collateralDetails: "",
    purpose: "",
    termMonths: "12",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "collateral" && value === "No" ? { collateralDetails: "" } : {}),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await applyForLoan(formData);
      setResponseMessage(`Loan Approved! Loan ID: ${response.loanId}`);
    } catch (error) {
      setResponseMessage("Error applying for loan.");
      console.error("Loan Application Error:", error);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-cyan-600">
      <form onSubmit={handleSubmit} className="relative z-10 w-full max-w-md space-y-4 rounded-xl bg-white/20 p-6 shadow-xl backdrop-blur-lg border border-white/30">
        <h1 className="text-3xl font-bold text-center text-white">Apply for Loan</h1>

        {/* Name */}
        <div>
          <label className="block mb-1 font-medium text-white">Name</label>
          <input type="text" name="name" className="w-full rounded-lg border px-3 py-2 bg-blue-200 text-gray-900"
            value={formData.name} onChange={handleChange} required />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium text-white">Email</label>
          <input type="email" name="email" className="w-full rounded-lg border px-3 py-2 bg-blue-200 text-gray-900"
            value={formData.email} onChange={handleChange} required />
        </div>

        {/* Government ID */}
        <div>
          <label className="block mb-1 font-medium text-white">Government ID</label>
          <input type="text" name="governmentId" className="w-full rounded-lg border px-3 py-2 bg-blue-200 text-gray-900"
            value={formData.governmentId} onChange={handleChange} required />
        </div>

        {/* Loan Amount */}
        <div>
          <label className="block mb-1 font-medium text-white">Loan Amount</label>
          <input type="number" name="amount" className="w-full rounded-lg border px-3 py-2 bg-blue-200 text-gray-900"
            value={formData.amount} onChange={handleChange} required />
        </div>

        {/* Collateral */}
        <div>
          <label className="block mb-1 font-medium text-white">Do you have Collateral?</label>
          <select name="collateral" className="w-full rounded-lg border px-3 py-2 bg-blue-200 text-gray-900"
            value={formData.collateral} onChange={handleChange}>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        {/* Collateral Details (Only if Yes) */}
        {formData.collateral === "Yes" && (
          <div>
            <label className="block mb-1 font-medium text-white">Collateral Details</label>
            <textarea name="collateralDetails" className="w-full rounded-lg border px-3 py-2 bg-blue-200 text-gray-900"
              value={formData.collateralDetails} onChange={handleChange} required />
          </div>
        )}

        {/* Loan Purpose */}
        <div>
          <label className="block mb-1 font-medium text-white">Loan Purpose</label>
          <textarea name="purpose" className="w-full rounded-lg border px-3 py-2 bg-blue-200 text-gray-900"
            value={formData.purpose} onChange={handleChange} required />
        </div>

        {/* Loan Term */}
        <div>
          <label className="block mb-1 font-medium text-white">Term (Months)</label>
          <select name="termMonths" className="w-full rounded-lg border px-3 py-2 bg-blue-200 text-gray-900"
            value={formData.termMonths} onChange={handleChange}>
            <option value="12">1 Year</option>
            <option value="24">2 Years</option>
            <option value="36">3 Years</option>
            <option value="60">5 Years</option>
          </select>
        </div>

        <button type="submit" className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 font-semibold text-white shadow-md hover:scale-110 hover:shadow-cyan-500 transition">
          Apply
        </button>

        {responseMessage && <p className="text-center text-white">{responseMessage}</p>}
      </form>
    </div>
  );
}
