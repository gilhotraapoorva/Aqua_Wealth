"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function LoanStatus() {
  const [loanStatus, setLoanStatus] = useState("SUCCESSFUL");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-900 via-blue-800 to-blue-600 p-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/water-texture.png')] bg-cover bg-center opacity-30"></div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-3xl bg-blue-900/40 backdrop-blur-xl p-10 shadow-2xl border border-blue-400/20 relative z-10 text-center"
      >
        <h1 className="text-4xl font-extrabold text-green-300 drop-shadow-lg tracking-wide mb-4">
          Loan Status
        </h1>
        <p className="text-lg text-white mb-2">Your current loan status is:</p>
        <motion.p
          className="text-5xl font-extrabold text-green-400 drop-shadow-lg"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          {loanStatus.toUpperCase()}
        </motion.p>
      </motion.div>
    </div>
  );
}