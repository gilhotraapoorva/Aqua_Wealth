"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { makeLoanPayment, getPendingAmount, getPaymentHistory } from "@/lib/api";

export default function RepaymentPage() {
  const [loanId, setLoanId] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: string; text: string } | null>(null);
  const [pendingAmount, setPendingAmount] = useState<number | null>(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [isClient, setIsClient] = useState(false); // Fix hydration error

  // Ensure component is client-side before fetching data
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (loanId && isClient) {
      fetchLoanDetails();
    }
  }, [loanId, isClient]);

  async function fetchLoanDetails() {
    try {
      const pendingResponse = await getPendingAmount(loanId);
      const historyResponse = await getPaymentHistory(loanId);

      console.log("Pending Amount Response:", pendingResponse);
      console.log("Payment History Response:", historyResponse);

      setPendingAmount(pendingResponse.pendingAmount); // Ensure correct object structure
      setPaymentHistory(historyResponse.paymentHistory);
    } catch (error) {
      console.error("Failed to fetch loan details", error);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const paymentData = { loanId, amount, paymentType };
      const response = await makeLoanPayment(paymentData);
      setMessage({ type: "success", text: response.message });
      fetchLoanDetails(); // Refresh data after payment
    } catch (error) {
      setMessage({ type: "error", text: "Payment failed. Please try again." });
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-900 via-blue-800 to-blue-600 p-10 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg rounded-3xl bg-blue-900/40 backdrop-blur-xl p-10 shadow-2xl border border-blue-400/20 relative z-10"
      >
        <h1 className="text-4xl font-extrabold text-green-300 text-center mb-6 drop-shadow-lg tracking-wide">
          Repayment Portal
        </h1>

        {message && (
          <div className={`mb-4 p-3 rounded-xl text-center font-semibold ${message.type === "success" ? "bg-green-500/80 text-white" : "bg-red-500/80 text-white"}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-green-200 font-semibold text-lg">Loan ID</label>
            <input
              type="text"
              className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3"
              value={loanId}
              onChange={(e) => setLoanId(e.target.value)}
              required
            />
          </div>

          {isClient && pendingAmount !== null && (
            <p className="text-green-300 text-lg font-semibold">Pending Amount: ${pendingAmount}</p>
          )}

          <div>
            <label className="block mb-2 text-green-200 font-semibold text-lg">Amount</label>
            <input type="number" className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3" value={amount} onChange={(e) => setAmount(e.target.value)} required />
          </div>

          <div>
            <label className="block mb-2 text-green-200 font-semibold text-lg">Payment Type</label>
            <select className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3" value={paymentType} onChange={(e) => setPaymentType(e.target.value)} required>
              <option value="">-- Select Payment Type --</option>
              <option value="ONLINE">ONLINE</option>
              <option value="CASH">CASH</option>
              <option value="CHEQUE">CHEQUE</option>
            </select>
          </div>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(144, 238, 144, 0.8)" }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className={`w-full rounded-xl px-6 py-3 text-white font-bold text-lg transition-all shadow-lg ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
          >
            {loading ? "Processing..." : "Record Payment"}
          </motion.button>
        </form>

        {isClient && paymentHistory.length > 0 && (
          <div className="mt-6">
            <h2 className="text-green-300 font-bold text-lg">Payment History:</h2>
            <ul className="text-white">
              {paymentHistory.map((payment, index) => (
                <li key={index}>Paid ${payment.amount} via {payment.paymentType}</li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    </div>
  );
}
// "use client";

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { makeLoanPayment, getPendingAmount, getPaymentHistory } from "@/lib/api";

// export default function RepaymentPage() {
//   const [loanId, setLoanId] = useState("");
//   const [amount, setAmount] = useState("");
//   const [paymentType, setPaymentType] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState<{ type: string; text: string } | null>(null);
//   const [pendingAmount, setPendingAmount] = useState<number | null>(null);
//   const [paymentHistory, setPaymentHistory] = useState<LoanPayment[]>([]); // ✅ Ensure it's an array
//   const [isClient, setIsClient] = useState(false); // ✅ Fix hydration issue

//   useEffect(() => {
//     setIsClient(true); // ✅ Ensures it runs only on the client
//   }, []);

//   useEffect(() => {
//     if (loanId) {
//       fetchLoanDetails();
//     }
//   }, [loanId]);

//   async function fetchLoanDetails() {
//     try {
//       const pending = await getPendingAmount(loanId);
//       const history = await getPaymentHistory(loanId);
//       setPendingAmount(pending);
//       setPaymentHistory(history);
//     } catch (error) {
//       console.error("Failed to fetch loan details", error);
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage(null);

//     try {
//       const paymentData = { loanId, amount, paymentType };
//       const response = await makeLoanPayment(paymentData);
//       setMessage({ type: "success", text: response.message });
//       setLoanId("");
//       setAmount("");
//       setPaymentType("");
//       fetchLoanDetails();
//     } catch (error) {
//       setMessage({ type: "error", text: "Payment failed. Please try again." });
//     }

//     setLoading(false);
//   };

//   if (!isClient) {
//     return <p className="text-white text-center">Loading...</p>; // ✅ Prevents hydration error
//   }

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-900 via-blue-800 to-blue-600 p-10 relative overflow-hidden">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-lg rounded-3xl bg-blue-900/40 backdrop-blur-xl p-10 shadow-2xl border border-blue-400/20 relative z-10"
//       >
//         <h1 className="text-4xl font-extrabold text-green-300 text-center mb-6 drop-shadow-lg tracking-wide">
//           Repayment Portal
//         </h1>

//         {message && (
//           <div className={`mb-4 p-3 rounded-xl text-center font-semibold ${message.type === "success" ? "bg-green-500/80 text-white" : "bg-red-500/80 text-white"}`}>
//             {message.text}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block mb-2 text-green-200 font-semibold text-lg">Loan ID</label>
//             <input type="text" className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3" value={loanId} onChange={(e) => setLoanId(e.target.value)} required />
//           </div>

//           {pendingAmount !== null && (
//             <p className="text-green-300 text-lg font-semibold">Pending Amount: ${pendingAmount}</p>
//           )}

//           <div>
//             <label className="block mb-2 text-green-200 font-semibold text-lg">Amount</label>
//             <input type="number" className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3" value={amount} onChange={(e) => setAmount(e.target.value)} required />
//           </div>

//           <div>
//             <label className="block mb-2 text-green-200 font-semibold text-lg">Payment Type</label>
//             <select className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3" value={paymentType} onChange={(e) => setPaymentType(e.target.value)} required>
//               <option value="">-- Select Payment Type --</option>
//               <option value="ONLINE">ONLINE</option>
//               <option value="CASH">CASH</option>
//               <option value="CHEQUE">CHEQUE</option>
//             </select>
//           </div>

//           <motion.button whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(144, 238, 144, 0.8)" }} whileTap={{ scale: 0.95 }} type="submit" disabled={loading} className={`w-full rounded-xl px-6 py-3 text-white font-bold text-lg transition-all shadow-lg ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}>
//             {loading ? "Processing..." : "Record Payment"}
//           </motion.button>
//         </form>

//         {Array.isArray(paymentHistory) && paymentHistory.length > 0 && ( // ✅ Prevents "undefined" error
//           <div className="mt-6">
//             <h2 className="text-green-300 font-bold text-lg">Payment History:</h2>
//             <ul className="text-white">
//               {paymentHistory.map((payment, index) => (
//                 <li key={index}>Paid ${payment.amount} via {payment.paymentType}</li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// }
