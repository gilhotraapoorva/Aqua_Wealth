"use client";
import { useState } from "react";
import { makePayment } from "@/lib/api";

export default function LoanPayment() {
  const [formData, setFormData] = useState({ loanId: "", amount: "" });
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await makePayment(formData);
      setResponseMessage("Payment Successful!");
    } catch (error) {
      setResponseMessage("Error processing payment.");
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold">Make a Loan Payment</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input name="loanId" placeholder="Loan ID" onChange={handleChange} required />
        <input name="amount" placeholder="Payment Amount" onChange={handleChange} required />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Pay Now
        </button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}
