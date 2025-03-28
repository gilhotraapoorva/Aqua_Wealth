"use client";

import { useState } from "react";
import Link from "next/link";

export default function RiskFilter() {
  const [riskLevel, setRiskLevel] = useState("Low");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-900 via-blue-800 to-blue-600 p-10 relative overflow-hidden">
      <div className="w-full max-w-md rounded-3xl bg-blue-900/40 backdrop-blur-xl p-10 shadow-2xl border border-blue-400/20 relative z-10">
        <h1 className="text-3xl font-extrabold text-green-300 drop-shadow-lg text-center mb-6">
          Risk Filter
        </h1>
        <label className="block text-lg text-white mb-2">
          Select Risk Level:
        </label>
        <select
          className="w-full p-2 bg-blue-800/50 text-white border border-green-500/40 rounded focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
          value={riskLevel}
          onChange={(e) => setRiskLevel(e.target.value)}
        >
          <option value="Low">Low Risk</option>
          <option value="Medium">Medium Risk</option>
          <option value="High">High Risk</option>
        </select>
        <div className="mt-6 text-center">
          <Link href="/browse-projects" className="text-green-300 underline hover:text-green-400">
            Back to Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
