"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { applyForLoan } from "@/lib/api";

const loanSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  governmentId: z.string().min(10, "Invalid ID (min 10 characters)"),
  amount: z.coerce.number().min(1000, "Minimum loan amount is $1000"),
  collateral: z.string(),
  collateralDetails: z.string().optional(),
  purpose: z.string().min(1, "Loan purpose is required"),
  termMonths: z.string(),
});

export default function ApplyForLoan() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(loanSchema),
    defaultValues: {
      name: "",
      email: "",
      governmentId: "",
      amount: "",
      collateral: "No",
      collateralDetails: "",
      purpose: "",
      termMonths: "12",
    },
  });

  const [responseMessage, setResponseMessage] = useState("");

  const calculateInterest = (amount: number, term: number, collateral: string) => {
    const rate = collateral === "Yes" ? 12.1 : 17;
    const interest = amount * (Math.pow(1 + rate / 100, term / 12) - 1);
    return interest.toFixed(2);
  };

  const onSubmit = async (data) => {
    try {
      const response = await applyForLoan(data);
      const interest = calculateInterest(Number(data.amount), Number(data.termMonths), data.collateral);
      setResponseMessage(`Loan Approved! Loan ID: ${response.loanId}. Interest Applied: $${interest}. Compound Interest (CI) is applied. `);
    } catch (error) {
      setResponseMessage("Error applying for loan.");
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
        <h1 className="text-4xl font-extrabold text-green-300 text-center mb-6 drop-shadow-lg tracking-wide">Apply for Loan</h1>

        {responseMessage && (
          <p className="text-center text-white">
            {responseMessage}
            {responseMessage.includes("Loan Approved!") && (
              <span> <a href="https://en.wikipedia.org/wiki/Compound_interest" target="_blank" className="underline text-cyan-300">Know More</a></span>
            )}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {[{ label: "Full Name", name: "name" }, { label: "Email", name: "email" }, { label: "Government ID", name: "governmentId" }].map(({ label, name }) => (
            <div key={name}>
              <label className="block mb-2 text-green-200 font-semibold text-lg">{label}</label>
              <input type="text" className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md" {...register(name)} required />
              {errors[name] && <p className="text-red-400">{errors[name]?.message}</p>}
            </div>
          ))}

          <div>
            <label className="block mb-2 text-green-200 font-semibold text-lg">Loan Amount ($)</label>
            <input type="number" {...register("amount")} className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md" required />
          </div>

          <div>
            <label className="block mb-2 text-green-200 font-semibold text-lg">Do you have Collateral?</label>
            <select {...register("collateral")} className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md">
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          {watch("collateral") === "Yes" && (
            <div>
              <label className="block mb-2 text-green-200 font-semibold text-lg">Collateral Details</label>
              <textarea {...register("collateralDetails")} className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md" required />
            </div>
          )}

          <div>
            <label className="block mb-2 text-green-200 font-semibold text-lg">Loan Purpose</label>
            <textarea {...register("purpose")} className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md" required />
          </div>

          <div>
            <label className="block mb-2 text-green-200 font-semibold text-lg">Term (Months)</label>
            <select {...register("termMonths")} className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md">
              <option value="12">1 Year</option>
              <option value="24">2 Years</option>
              <option value="36">3 Years</option>
              <option value="60">5 Years</option>
            </select>
          </div>

          <motion.button whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(144, 238, 144, 0.8)" }} whileTap={{ scale: 0.95 }} type="submit" className="w-full rounded-xl px-6 py-3 text-white font-bold text-lg transition-all shadow-lg bg-green-600 hover:bg-green-700">
            Apply
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
