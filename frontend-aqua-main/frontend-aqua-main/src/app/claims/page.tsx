"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { submitClaim } from "@/lib/api";
import { useUser } from "@/Context/UserContext"; // Import User Context

export default function ClaimsPage() {
  const { user } = useUser(); // Get user details from context

  if (!user) {
    return <p className="text-center text-red-500 font-bold">Error: User not logged in. Please log in first.</p>;
  }

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      governmentId: user.governmentId || "", // Pre-fill government ID
      city: "",
      date: new Date().toISOString().split("T")[0], // Default to today's date
      claimAmount: "",
    },
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    setError("");
    try {
      await submitClaim({
        governmentId: user.governmentId, // Use logged-in user's government ID
        city: data.city,
        date: data.date,
        claimAmount: parseFloat(data.claimAmount),
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Failed to submit claim. Please try again.");
    }
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
          Submit Claim
        </h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {submitted ? (
          <div className="text-center text-green-500 font-bold">
            Claim Submitted Successfully!
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="mt-4 px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow-lg hover:bg-green-700"
              onClick={() => setSubmitted(false)}
            >
              Submit Another Claim
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

            {/* Editable fields */}
            <div>
              <label className="block mb-2 text-green-200 font-semibold text-lg">City</label>
              <input
                type="text"
                className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
                {...register("city", { required: "City is required" })}
              />
              {errors.city && <p className="text-red-400">{errors.city.message}</p>}
            </div>

            <div>
              <label className="block mb-2 text-green-200 font-semibold text-lg">Claim Date</label>
              <input
                type="date"
                className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
                {...register("date", { required: "Date is required" })}
              />
            </div>

            <div>
              <label className="block mb-2 text-green-200 font-semibold text-lg">Claim Amount</label>
              <input
                type="number"
                step="0.01"
                className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
                {...register("claimAmount", { required: "Claim amount is required", min: 0.1 })}
              />
              {errors.claimAmount && <p className="text-red-400">{errors.claimAmount.message}</p>}
            </div>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(144, 238, 144, 0.8)" }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full rounded-xl px-6 py-3 text-white font-bold text-lg transition-all shadow-lg bg-green-600 hover:bg-green-700"
            >
              Submit Claim
            </motion.button>
          </form>
        )}
      </motion.div>
    </div>
  );
}