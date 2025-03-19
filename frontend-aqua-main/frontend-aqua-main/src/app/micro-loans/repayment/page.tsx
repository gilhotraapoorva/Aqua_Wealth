"use client";

import { useState } from "react";

export default function RepaymentPage() {
  // Form fields (no status field)
  const [loanId, setLoanId] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [paymentType, setPaymentType] = useState("");

  // Local array to display submitted payments (for demo)
  const [payments, setPayments] = useState<any[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPayment = {
      loan_id: loanId,
      amount,
      payment_date: paymentDate,
      payment_type: paymentType,
    };
    setPayments((prev) => [...prev, newPayment]);

    // Reset form
    setLoanId("");
    setAmount("");
    setPaymentDate("");
    setPaymentType("");

    alert("Payment record added (local state only)!");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded bg-white p-6 shadow">
        <h1 className="text-2xl font-bold mb-4">Repayment</h1>
        <p className="mb-6">
          Record your loan payments here. Fill out the form below to add a new payment.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          {/* Loan ID */}
          <div>
            <label htmlFor="loanId" className="block mb-1 font-medium">
              Loan ID
            </label>
            <input
              type="text"
              id="loanId"
              className="w-full rounded border px-3 py-2"
              value={loanId}
              onChange={(e) => setLoanId(e.target.value)}
              placeholder="Enter the Loan ID"
              required
            />
          </div>

          {/* Amount */}
          <div>
            <label htmlFor="amount" className="block mb-1 font-medium">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              className="w-full rounded border px-3 py-2"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Payment amount"
              required
            />
          </div>

          {/* Payment Date */}
          <div>
            <label htmlFor="paymentDate" className="block mb-1 font-medium">
              Payment Date
            </label>
            <input
              type="datetime-local"
              id="paymentDate"
              className="w-full rounded border px-3 py-2"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              required
            />
          </div>

          {/* Payment Type */}
          <div>
            <label htmlFor="paymentType" className="block mb-1 font-medium">
              Payment Type
            </label>
            <select
              id="paymentType"
              className="w-full rounded border px-3 py-2"
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
              required
            >
              <option value="">-- Select Payment Type --</option>
              <option value="ONLINE">ONLINE</option>
              <option value="CASH">CASH</option>
              <option value="CHEQUE">CHEQUE</option>
              {/* Add more if needed */}
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700"
          >
            Record Payment
          </button>
        </form>

        {/* Display local payment records */}
        {payments.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Recorded Payments</h2>
            <ul className="space-y-2">
              {payments.map((pay, index) => (
                <li key={index} className="border p-3 rounded bg-gray-50">
                  <p>
                    <strong>Loan ID:</strong> {pay.loan_id}
                  </p>
                  <p>
                    <strong>Amount:</strong> {pay.amount}
                  </p>
                  <p>
                    <strong>Payment Date:</strong> {pay.payment_date}
                  </p>
                  <p>
                    <strong>Payment Type:</strong> {pay.payment_type}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
