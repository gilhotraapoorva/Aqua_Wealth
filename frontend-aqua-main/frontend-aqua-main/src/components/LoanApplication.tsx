"use client";
import { useState } from "react";
import { applyForLoan } from "../lib/api";

export default function LoanApplication() {
  const [formData, setFormData] = useState({
    governmentId: "",
    amount: "",
    collateral: "No",
    collateralId: "",
    purpose: "",
    term: "1 Year",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await applyForLoan(formData);
      setResponseMessage(`Loan Approved! ID: ${response.loanId}`);
    } catch (error) {
      setResponseMessage("Error applying for loan.");
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold">Apply for Loan</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Government ID */}
        <div>
          <label className="block font-medium">Government ID:</label>
          <input type="text" name="governmentId" value={formData.governmentId} onChange={handleChange} required className="w-full border p-2 rounded" />
        </div>

        {/* Loan Amount */}
        <div>
          <label className="block font-medium">Loan Amount:</label>
          <input type="number" name="amount" value={formData.amount} onChange={handleChange} required className="w-full border p-2 rounded" />
        </div>

        {/* Collateral Dropdown */}
        <div>
          <label className="block font-medium">Collateral:</label>
          <select name="collateral" value={formData.collateral} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        {/* Collateral ID (Only if collateral is Yes) */}
        {formData.collateral === "Yes" && (
          <div>
            <label className="block font-medium">Collateral ID:</label>
            <input type="text" name="collateralId" value={formData.collateralId} onChange={handleChange} className="w-full border p-2 rounded" />
          </div>
        )}

        {/* Loan Purpose */}
        <div>
          <label className="block font-medium">Loan Purpose:</label>
          <textarea name="purpose" value={formData.purpose} onChange={handleChange} required className="w-full border p-2 rounded" />
        </div>

        {/* Loan Term Dropdown */}
        <div>
          <label className="block font-medium">Term (Years):</label>
          <select name="term" value={formData.term} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="1 Year">1 Year</option>
            <option value="2 Years">2 Years</option>
            <option value="3 Years">3 Years</option>
            <option value="5 Years">5 Years</option>
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Apply</button>
      </form>

      {responseMessage && <p className="mt-2 text-green-600">{responseMessage}</p>}
    </div>
  );
}
