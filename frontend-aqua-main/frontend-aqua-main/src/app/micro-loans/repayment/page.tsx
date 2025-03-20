"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { makeLoanPayment } from"@/lib/api";

export default function RepaymentPage() {
  const [loanId, setLoanId] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: string; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const paymentData = { loanId, amount, paymentType };
      const response = await makeLoanPayment(paymentData);
      setMessage({ type: "success", text: response.message });

      // Reset form fields after successful payment
      setLoanId("");
      setAmount("");
      setPaymentType("");
    } catch (error) {
      setMessage({ type: "error", text: "Payment failed. Please try again." });
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-900 via-blue-800 to-blue-600 p-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/water-texture.png')] bg-cover bg-center opacity-30"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg rounded-3xl bg-blue-900/40 backdrop-blur-xl p-10 shadow-2xl border border-blue-400/20 relative z-10"
      >
        <h1 className="text-4xl font-extrabold text-green-300 text-center mb-6 drop-shadow-lg tracking-wide">
           Repayment Portal
        </h1>

        {/* Success/Error Message */}
        {message && (
          <div
            className={`mb-4 p-3 rounded-xl text-center font-semibold ${
              message.type === "success" ? "bg-green-500/80 text-white" : "bg-red-500/80 text-white"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Loan ID & Amount Fields */}
          {[
            { label: "Loan ID", value: loanId, setter: setLoanId, type: "text" },
            { label: "Amount", value: amount, setter: setAmount, type: "number" },
          ].map(({ label, value, setter, type }, index) => (
            <div key={index}>
              <label className="block mb-2 text-green-200 font-semibold text-lg">{label}</label>
              <input
                type={type}
                className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
                value={value}
                onChange={(e) => setter(e.target.value)}
                required
              />
            </div>
          ))}

          {/* Payment Type Dropdown */}
          <div>
            <label className="block mb-2 text-green-200 font-semibold text-lg">Payment Type</label>
            <select
              className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
              required
            >
              <option value="">-- Select Payment Type --</option>
              <option value="ONLINE">ONLINE</option>
              <option value="CASH">CASH</option>
              <option value="CHEQUE">CHEQUE</option>
            </select>
          </div>

          {/* Submit Button with Loading State */}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(144, 238, 144, 0.8)" }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className={`w-full rounded-xl px-6 py-3 text-white font-bold text-lg transition-all shadow-lg ${
              loading ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Processing..." : "Record Payment"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
