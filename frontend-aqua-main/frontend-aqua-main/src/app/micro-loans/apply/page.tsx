"use client";

import { useState } from "react";

export default function ApplyForLoan() {
  // Form fields
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [termMonths, setTermMonths] = useState("");
  const [purpose, setPurpose] = useState("");
  const [collateral, setCollateral] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Example: Log the form data (replace with API call as needed)
    console.log("Loan Application Data:", {
      user_id: userId,
      amount,
      interest_rate: interestRate,
      term_months: termMonths,
      purpose,
      collateral_details: collateral,
    });
    alert("Loan application submitted!");
    // Reset form
    setUserId("");
    setAmount("");
    setInterestRate("");
    setTermMonths("");
    setPurpose("");
    setCollateral("");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 rounded bg-white p-6 shadow"
      >
        <h1 className="text-2xl font-bold mb-4">Apply for Loan</h1>

        {/* User ID */}
        <div>
          <label className="block mb-1 font-medium" htmlFor="userId">
            User ID
          </label>
          <input
            type="text"
            id="userId"
            className="w-full rounded border px-3 py-2"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter your User ID"
            required
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block mb-1 font-medium" htmlFor="amount">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            className="w-full rounded border px-3 py-2"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter the loan amount"
            required
          />
        </div>

        {/* Interest Rate */}
        <div>
          <label className="block mb-1 font-medium" htmlFor="interestRate">
            Interest Rate
          </label>
          <input
            type="number"
            id="interestRate"
            className="w-full rounded border px-3 py-2"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            placeholder="e.g., 5.5"
            required
          />
        </div>

        {/* Term (Months) */}
        <div>
          <label className="block mb-1 font-medium" htmlFor="termMonths">
            Term (Months)
          </label>
          <input
            type="number"
            id="termMonths"
            className="w-full rounded border px-3 py-2"
            value={termMonths}
            onChange={(e) => setTermMonths(e.target.value)}
            placeholder="e.g., 12"
            required
          />
        </div>

        {/* Purpose */}
        <div>
          <label className="block mb-1 font-medium" htmlFor="purpose">
            Purpose
          </label>
          <textarea
            id="purpose"
            className="w-full rounded border px-3 py-2"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="Describe the purpose of the loan"
            required
          />
        </div>

        {/* Collateral Details */}
        <div>
          <label className="block mb-1 font-medium" htmlFor="collateral">
            Collateral Details
          </label>
          <textarea
            id="collateral"
            className="w-full rounded border px-3 py-2"
            value={collateral}
            onChange={(e) => setCollateral(e.target.value)}
            placeholder="Describe your collateral (e.g., land, livestock)"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}
