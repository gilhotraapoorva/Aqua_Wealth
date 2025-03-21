"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { applyForInsurance } from "@/lib/api";

const insuranceSchema = z.object({
  userName: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  governmentId: z.string().min(10, "Invalid ID (min 10 characters)"),
  coverageType: z.string().min(1, "Select a coverage type"),
  coverageAmount: z.coerce.number().min(100000, "Minimum ₹1 Lakh required"),
  startDate: z.string(),
});

export default function BuyInsurancePage() {
  const { register, handleSubmit, control, watch, formState: { errors } } = useForm({
    resolver: zodResolver(insuranceSchema),
    defaultValues: {
      userName: "",
      email: "",
      governmentId: "",
      coverageType: "",
      coverageAmount: 100000,
      startDate: new Date().toISOString().split("T")[0], // Default to today
    },
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const coverageAmount = watch("coverageAmount", 100000);
  const premiumAmount = coverageAmount / 30;

  const endDate = (() => {
    const startDate = watch("startDate", new Date().toISOString().split("T")[0]);
    if (!startDate) return "";
    const date = new Date(startDate);
    date.setFullYear(date.getFullYear() + 1);
    return date.toISOString().split("T")[0];
  })();

  const onSubmit = async (data: any) => {
    setError(""); // Clear previous errors
    try {
      console.log("Submitting Data:", { ...data, premiumAmount, endDate });

      await applyForInsurance({
        user: {
          name: data.userName,
          email: data.email,
        },
        governmentId: data.governmentId,
        coverageType: data.coverageType,
        coverageAmount: data.coverageAmount,
        premiumAmount,
        startDate: data.startDate,
        endDate,
        status: "ACTIVE",
      });

      setSubmitted(true);
    } catch (err) {
      setError("Failed to apply for insurance. Please try again.");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500">
      {/* Background Animation */}
      <div className="absolute inset-0 w-full h-full bg-[url('/wave-animation.svg')] bg-cover bg-center opacity-30 animate-move"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg bg-white/20 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-blue-400/30 relative z-10"
      >
        <h1 className="text-4xl font-bold text-white text-center mb-4"> Buy Insurance</h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {submitted ? (
          <div className="text-center text-green-500 font-bold">
            🎉 Insurance Applied Successfully!
            <p className="text-white mt-2"><strong>Start Date:</strong> {watch("startDate")}</p>
            <p className="text-white"><strong>End Date:</strong> {endDate}</p>
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700"
              onClick={() => setSubmitted(false)}
            >
              Buy Another Insurance
            </motion.button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-blue-200">Full Name</label>
              <input type="text" {...register("userName")} className="w-full p-3 rounded-xl bg-white/10 text-white border border-blue-300/30" />
              {errors.userName && <p className="text-red-400">{errors.userName.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-blue-200">Email</label>
              <input type="email" {...register("email")} className="w-full p-3 rounded-xl bg-white/10 text-white border border-blue-300/30" />
              {errors.email && <p className="text-red-400">{errors.email.message}</p>}
            </div>

            {/* Government ID */}
            <div>
              <label className="block text-blue-200">Government ID</label>
              <input type="text" {...register("governmentId")} className="w-full p-3 rounded-xl bg-white/10 text-white border border-blue-300/30" />
              {errors.governmentId && <p className="text-red-400">{errors.governmentId.message}</p>}
            </div>

            {/* Coverage Type */}
            <div>
              <label className="block text-blue-200">Coverage Type</label>
              <select {...register("coverageType")} className="w-full p-3 rounded-xl bg-white/10 text-white border border-blue-300/30">
                <option value="">Select Type</option>
                <option value="Basic">Basic</option>
                <option value="Premium">Premium</option>
              </select>
              {errors.coverageType && <p className="text-red-400">{errors.coverageType.message}</p>}
            </div>

            {/* Coverage Amount */}
            <div>
              <label className="block text-blue-200">Coverage Amount (₹)</label>
              <select {...register("coverageAmount", { valueAsNumber: true })} className="w-full p-3 rounded-xl bg-white/10 text-white border border-blue-300/30">
                {[1,2,3,4,5,6,7,8,9,10].map(lakh => (
                  <option key={lakh} value={lakh * 100000}>{`₹${lakh} Lakh`}</option>
                ))}
              </select>
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-blue-200">Start Date</label>
              <Controller
                control={control}
                name="startDate"
                render={({ field }) => (
                  <input type="date" {...field} className="w-full p-3 rounded-xl bg-white/10 text-white border border-blue-300/30" />
                )}
              />
            </div>

            {/* Auto-calculated Fields */}
            <p className="text-blue-100"><strong>Premium Amount:</strong> ₹{premiumAmount.toFixed(2)}</p>
            <p className="text-blue-100"><strong>End Date:</strong> {endDate}</p>

            {/* Buy Now Button */}
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              className="w-full bg-green-600 text-white font-semibold p-3 rounded-xl shadow-lg hover:bg-green-700" 
              type="submit"
            >
              Buy Now
            </motion.button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
