
// "use client";

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
// import { makeLoanPayment, getLoanStatus, getPaymentHistory } from "@/lib/api";

// export default function RepaymentPage() {
//   const [loanId, setLoanId] = useState("");
//   const [amount, setAmount] = useState("");
//   const [paymentType, setPaymentType] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState<{ type: string; text: string } | null>(null);
//   const [pendingAmount, setPendingAmount] = useState<number | null>(null);
//   const [totalPaid, setTotalPaid] = useState<number>(0);
//   const [totalLoanWithInterest, setTotalLoanWithInterest] = useState<number>(0);
//   const [paymentHistory, setPaymentHistory] = useState([]);
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   useEffect(() => {
//     if (loanId.trim() !== "") {
//       fetchLoanDetails();
//     }
//   }, [loanId]);

//   async function fetchLoanDetails() {
//     try {
//       const loanStatus = await getLoanStatus(loanId);
//       const historyResponse = await getPaymentHistory(loanId);

//       if (loanStatus?.success) {
//         const pending = parseFloat(loanStatus.pendingAmount) || 0;
//         const paid = historyResponse?.paymentHistory.reduce((sum, p) => sum + parseFloat(p.amount), 0) || 0;
//         setPendingAmount(pending);
//         setTotalPaid(paid);
//         setTotalLoanWithInterest(pending + paid);
//       } else {
//         setPendingAmount(0);
//         setTotalPaid(0);
//         setTotalLoanWithInterest(0);
//       }

//       setPaymentHistory(historyResponse?.paymentHistory || []);
//     } catch (error) {
//       console.error("Failed to fetch loan details:", error);
//       setPendingAmount(0);
//       setTotalPaid(0);
//       setTotalLoanWithInterest(0);
//       setPaymentHistory([]);
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage(null);

//     try {
//       const paymentData = { loanId, amount, paymentType };
//       const response = await makeLoanPayment(paymentData);
//       setMessage({ type: "success", text: response?.message || "Payment successful!" });
//       fetchLoanDetails();
//     } catch (error) {
//       setMessage({ type: "error", text: "Payment failed. Please try again." });
//     }

//     setLoading(false);
//   };

//   const COLORS = ["#4CAF50", "#FF9800"]; // Green for Paid, Orange for Remaining

//   const paidPercentage = totalLoanWithInterest > 0 ? ((totalPaid / totalLoanWithInterest) * 100).toFixed(2) : 0;
//   const remainingPercentage = totalLoanWithInterest > 0 ? ((pendingAmount / totalLoanWithInterest) * 100).toFixed(2) : 0;

//   const pieData = [
//     { name: `Paid (${paidPercentage}%)`, value: totalPaid },
//     { name: `Remaining (${remainingPercentage}%)`, value: pendingAmount }
//   ];

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
//             <input
//               type="text"
//               className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3"
//               value={loanId}
//               onChange={(e) => setLoanId(e.target.value)}
//               required
//             />
//           </div>

//           {isClient && pendingAmount !== null && (
//             <p className="text-green-300 text-lg font-semibold">
//               Pending Amount (With Interest): ${pendingAmount.toLocaleString()}
//             </p>
//           )}

//           <div>
//             <label className="block mb-2 text-green-200 font-semibold text-lg">Amount</label>
//             <input 
//               type="number" 
//               className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3" 
//               value={amount} 
//               onChange={(e) => setAmount(e.target.value)} 
//               required 
//             />
//           </div>

//           <div>
//             <label className="block mb-2 text-green-200 font-semibold text-lg">Payment Type</label>
//             <select 
//               className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3" 
//               value={paymentType} 
//               onChange={(e) => setPaymentType(e.target.value)} 
//               required
//             >
//               <option value="">-- Select Payment Type --</option>
//               <option value="ONLINE">ONLINE</option>
//               <option value="CASH">CASH</option>
//               <option value="CHEQUE">CHEQUE</option>
//             </select>
//           </div>

//           <motion.button
//             whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(144, 238, 144, 0.8)" }}
//             whileTap={{ scale: 0.95 }}
//             type="submit"
//             disabled={loading}
//             className={`w-full rounded-xl px-6 py-3 text-white font-bold text-lg transition-all shadow-lg ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
//           >
//             {loading ? "Processing..." : "Record Payment"}
//           </motion.button>
//         </form>

//         {/* Pie Chart */}
//         {isClient && totalLoanWithInterest > 0 && (
//           <div className="mt-6 flex justify-center">
//             <PieChart width={400} height={400}>
//               <Pie data={pieData} cx="50%" cy="50%" outerRadius={120} fill="#8884d8" dataKey="value" label={false}>
//                 {pieData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend verticalAlign="bottom" />
//             </PieChart>
//           </div>
//         )}

//         {/* Payment History Table */}
//         {isClient && paymentHistory.length > 0 && (
//           <div className="mt-6">
//             <h2 className="text-green-300 font-bold text-lg mb-2">Payment History</h2>
//             <table className="w-full border-collapse border border-blue-500 text-white">
//               <thead>
//                 <tr className="bg-blue-700">
//                   <th className="border px-4 py-2">Date</th>
//                   <th className="border px-4 py-2">Amount ($)</th>
//                   <th className="border px-4 py-2">Payment Type</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {paymentHistory.map((payment, index) => (
//                   <tr key={index} className="bg-blue-800 text-center">
//                     <td className="border px-4 py-2">{new Date(payment.paymentDate).toLocaleDateString()}</td>
//                     <td className="border px-4 py-2">{payment.amount}</td>
//                     <td className="border px-4 py-2">{payment.paymentType}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { makeLoanPayment, getLoanStatus, getPaymentHistory } from "@/lib/api";

export default function RepaymentPage() {
  const [loanId, setLoanId] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: string; text: string } | null>(null);
  const [pendingAmount, setPendingAmount] = useState<number | null>(null);
  const [totalPaid, setTotalPaid] = useState<number>(0);
  const [totalLoanWithInterest, setTotalLoanWithInterest] = useState<number>(0);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (loanId.trim() !== "") {
      fetchLoanDetails();
    }
  }, [loanId]);

  async function fetchLoanDetails() {
    try {
      const loanStatus = await getLoanStatus(loanId);
      const historyResponse = await getPaymentHistory(loanId);

      if (loanStatus?.success) {
        const pending = parseFloat(loanStatus.pendingAmount) || 0;
        const paid = historyResponse?.paymentHistory.reduce((sum, p) => sum + parseFloat(p.amount), 0) || 0;
        setPendingAmount(pending);
        setTotalPaid(paid);
        setTotalLoanWithInterest(pending + paid);
      } else {
        setPendingAmount(0);
        setTotalPaid(0);
        setTotalLoanWithInterest(0);
      }

      setPaymentHistory(historyResponse?.paymentHistory || []);
    } catch (error) {
      console.error("Failed to fetch loan details:", error);
      setPendingAmount(0);
      setTotalPaid(0);
      setTotalLoanWithInterest(0);
      setPaymentHistory([]);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const paymentAmount = parseFloat(amount);

    // Validation Checks
    if (paymentAmount <= 0) {
      setMessage({ type: "error", text: "Limit exceeded! Enter a valid amount." });
      setLoading(false);
      return;
    }

    if (pendingAmount !== null && paymentAmount > pendingAmount) {
      setMessage({ type: "error", text: "Limit exceeded! Amount cannot exceed pending balance." });
      setLoading(false);
      return;
    }

    try {
      const paymentData = { loanId, amount, paymentType };
      const response = await makeLoanPayment(paymentData);

      if (paymentAmount === pendingAmount) {
        setMessage({ type: "success", text: "Loan cleared! No pending balance." });
      } else {
        setMessage({ type: "success", text: response?.message || "Payment successful!" });
      }

      fetchLoanDetails(); // Refresh after payment
    } catch (error) {
      setMessage({ type: "error", text: "Payment failed. Please try again." });
    }

    setLoading(false);
  };

  const COLORS = ["#4CAF50", "#FF9800"]; // Green for Paid, Orange for Remaining

  const paidPercentage = totalLoanWithInterest > 0 ? ((totalPaid / totalLoanWithInterest) * 100).toFixed(2) : 0;
  const remainingPercentage = totalLoanWithInterest > 0 ? ((pendingAmount / totalLoanWithInterest) * 100).toFixed(2) : 0;

  const pieData = [
    { name: `Paid (${paidPercentage}%)`, value: totalPaid },
    { name: `Remaining (${remainingPercentage}%)`, value: pendingAmount }
  ];

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
            <p className="text-green-300 text-lg font-semibold">
              Pending Amount (With Interest): ${pendingAmount.toLocaleString()}
            </p>
          )}

          <div>
            <label className="block mb-2 text-green-200 font-semibold text-lg">Amount</label>
            <input 
              type="number" 
              className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
              required 
            />
          </div>

          <div>
            <label className="block mb-2 text-green-200 font-semibold text-lg">Payment Type</label>
            <select 
              className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3" 
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

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(144, 238, 144, 0.8)" }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading || parseFloat(amount) <= 0 || (pendingAmount !== null && parseFloat(amount) > pendingAmount)}
            className={`w-full rounded-xl px-6 py-3 text-white font-bold text-lg transition-all shadow-lg ${
              loading || parseFloat(amount) <= 0 || (pendingAmount !== null && parseFloat(amount) > pendingAmount)
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Processing..." : "Record Payment"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
