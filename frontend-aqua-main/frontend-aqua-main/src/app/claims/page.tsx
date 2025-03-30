"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { submitClaim } from "@/lib/api";
import { useUser } from "@/Context/UserContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const claimSchema = z.object({
  governmentId: z.string().min(1, "Government ID is required"),
  city: z.string().min(1, "City is required"),
  date: z.string().min(1, "Date is required"),
  claimAmount: z.coerce.number().min(0.1, "Minimum claim amount is $0.10"),
});

export default function ClaimsPage() {
  const { user } = useUser();

  if (!user) {
    return <p className="text-center text-red-500 font-bold">Error: User not logged in. Please log in first.</p>;
  }

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(claimSchema),
    defaultValues: {
      governmentId: user.governmentId || "",
      city: "",
      date: new Date().toISOString().split("T")[0],
      claimAmount: "",
    },
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    setError("");
    try {
      await submitClaim({
        governmentId: user.governmentId,
        city: data.city,
        date: data.date,
        claimAmount: parseFloat(data.claimAmount),
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Failed to submit claim. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-900 via-blue-800 to-blue-600 p-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/water-texture.png')] bg-cover bg-center opacity-30"></div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md rounded-3xl bg-blue-900/40 backdrop-blur-xl p-10 shadow-2xl border border-blue-400/20 relative z-10 text-center"
        >
          <h1 className="text-4xl font-extrabold text-green-300 drop-shadow-lg tracking-wide mb-4">Claim Status</h1>
          <p className="text-lg text-white mb-2">Your claim has been submitted successfully!</p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(144, 238, 144, 0.8)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSubmitted(false)}
            className="mt-6 rounded-xl px-6 py-3 text-white font-bold text-lg transition-all shadow-lg bg-green-600 hover:bg-green-700"
          >
            Submit Another Claim
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-900 via-blue-800 to-blue-600 p-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/water-texture.png')] bg-cover bg-center opacity-30"></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg rounded-3xl bg-blue-900/40 backdrop-blur-xl p-10 shadow-2xl border border-blue-400/20 relative z-10"
      >
        <h1 className="text-4xl font-extrabold text-green-300 text-center mb-6 drop-shadow-lg tracking-wide">Submit Claim</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

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
              {...register("city")}
              className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
              required
            />
            {errors.city && <p className="text-red-400">{errors.city.message}</p>}
          </div>

          <div>
            <label className="block mb-2 text-green-200 font-semibold text-lg">Claim Date</label>
            <input
              type="date"
              {...register("date")}
              className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
              required
            />
            {errors.date && <p className="text-red-400">{errors.date.message}</p>}
          </div>

          <div>
            <label className="block mb-2 text-green-200 font-semibold text-lg">Claim Amount ($)</label>
            <input
              type="number"
              step="0.01"
              {...register("claimAmount")}
              className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
              required
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
      </motion.div>
    </div>
  );
}