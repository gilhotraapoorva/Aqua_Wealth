"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { applyForInsurance } from "@/lib/api";
import { useUser } from "@/Context/UserContext"; // Import User Context

const insuranceSchema = z.object({
  coverageType: z.string().min(1, "Select a coverage type"),
  coverageAmount: z.coerce.number().min(100000, "Minimum ₹1 Lakh required"),
  startDate: z.string().min(1, "Start date is required"),
});

export default function BuyInsurancePage() {
  const { user } = useUser(); // Get user details from context
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-center text-red-500 font-bold">
          Error: User not logged in. Please log in to apply for insurance.
        </p>
      </div>
    );
  }
  // if (!user) {
    
  //   //return <p className="text-center text-red-500 font-bold">Error: User not logged in. Please log in first.</p>;
  // }

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(insuranceSchema),
    defaultValues: {
      coverageType: "",
      coverageAmount: 100000,
      startDate: new Date().toISOString().split("T")[0], // Default to today's date
    },
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const startDate = watch("startDate");
  const coverageAmount = watch("coverageAmount", 100000);
  const premiumAmount = coverageAmount / 30;

  const endDate = (() => {
    if (!startDate) return "N/A";
    const date = new Date(startDate);
    if (isNaN(date.getTime())) return "N/A";
    date.setFullYear(date.getFullYear() + 1);
    return date.toISOString().split("T")[0];
  })();

  const onSubmit = async (data) => {
    setError("");
    try {
      await applyForInsurance({
        userName: user.name, // Use logged-in user name
        email: user.email, // Use logged-in user email
        governmentId: user.governmentId, // Use logged-in user governmentId
        coverageType: data.coverageType,
        coverageAmount: data.coverageAmount,
        startDate: data.startDate,
      });
      setSubmitted(true);
    } catch (err) {
      setError("Failed to apply for insurance. Please try again.");
    }
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
          Buy Insurance
        </h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {submitted ? (
          <div className="text-center text-green-500 font-bold">
            Insurance Applied Successfully!
            <p className="text-white mt-2"><strong>Start Date:</strong> {startDate}</p>
            <p className="text-white"><strong>End Date:</strong> {endDate}</p>
            <motion.button whileHover={{ scale: 1.05 }} className="mt-4 px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow-lg hover:bg-green-700" onClick={() => setSubmitted(false)}>
              Buy Another Insurance
            </motion.button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Auto-filled and non-editable fields */}
            {[{ label: "Full Name", value: user.name }, { label: "Email", value: user.email }, { label: "Government ID", value: user.governmentId }].map(({ label, value }) => (
              <div key={label}>
                <label className="block mb-2 text-green-200 font-semibold text-lg">{label}</label>
                <input
                  type="text"
                  className="w-full rounded-xl bg-gray-700 text-white px-4 py-3 border border-green-500/40 focus:outline-none shadow-md"
                  value={value}
                  disabled
                />
              </div>
            ))}

            <div>
              <label className="block mb-2 text-green-200 font-semibold text-lg">Coverage Type</label>
              <select {...register("coverageType")} className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md">
                <option value="">-- Select Coverage Type --</option>
                <option value="Basic">Basic</option>
                <option value="Premium">Premium</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-green-200 font-semibold text-lg">Coverage Amount (₹)</label>
              <select {...register("coverageAmount")} className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md">
                {[1,2,3,4,5,6,7,8,9,10].map(lakh => (
                  <option key={lakh} value={lakh * 100000}>{`₹${lakh} Lakh`}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 text-green-200 font-semibold text-lg">Start Date</label>
              <input
                type="date"
                {...register("startDate")}
                className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
              />
              {errors.startDate && <p className="text-red-400">{errors.startDate.message}</p>}
            </div>

            <p className="text-green-300"><strong>Premium Amount:</strong> ₹{premiumAmount.toFixed(2)}</p>
            <p className="text-green-300"><strong>End Date:</strong> {endDate}</p>

            <motion.button whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(144, 238, 144, 0.8)" }} whileTap={{ scale: 0.95 }} type="submit" className="w-full rounded-xl px-6 py-3 text-white font-bold text-lg transition-all shadow-lg bg-green-600 hover:bg-green-700">
              Buy Now
            </motion.button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
