"use client";

import { useState } from "react";

export default function LoanStatus() {
  // For now, we’ll just store a placeholder status
  // In a real app, you'd fetch this from an API or database
  const [loanStatus, setLoanStatus] = useState("PENDING");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Loan Status</h1>
      <p className="mb-2">Your current loan status is:</p>
      <p className="text-3xl font-extrabold text-blue-600">
        {loanStatus.toUpperCase()}
      </p>
    </div>
  );
}
