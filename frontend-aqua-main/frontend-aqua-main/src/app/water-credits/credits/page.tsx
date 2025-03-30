"use client";

import { useState, useEffect } from "react";
import { fetchWaterCredits } from "@/lib/api";
import { motion } from "framer-motion";

interface CreditRecord {
  meterNumber: string;
  creditsEarned: number;
  earningDate: string;
  expiryDate: string;
}

export default function CreditsPage() {
  const [creditsData, setCreditsData] = useState<CreditRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCredits = async () => {
      try {
        const data = await fetchWaterCredits();
        const formattedData = data.map((credit: any) => ({
          meterNumber: credit.meterNumber,
          creditsEarned: credit.creditsEarned,
          earningDate: new Date(credit.earningDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          expiryDate: new Date(credit.expiryDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
        }));
        setCreditsData(formattedData);
      } catch (error) {
        console.error("Error fetching credit data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCredits();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-900 via-blue-800 to-blue-600 p-10 relative overflow-hidden">
      {/* Background Water Texture */}
      <div className="absolute inset-0 bg-[url('/water-texture.png')] bg-cover bg-center opacity-30"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl rounded-3xl bg-blue-900/40 backdrop-blur-xl p-10 shadow-2xl border border-blue-400/20 relative z-10"
      >
        <h1 className="text-4xl font-extrabold text-green-300 text-center mb-6 drop-shadow-lg tracking-wide">
          Water Credits Earned 💧
        </h1>

        {loading ? (
          <p className="text-white text-center">Loading...</p>
        ) : creditsData.length === 0 ? (
          <p className="text-white text-center">No credit data available.</p>
        ) : (
          <>
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-blue-800/50">
                    <th className="border p-3 text-left text-white">Meter Number</th>
                    <th className="border p-3 text-left text-white">Credits Earned</th>
                    <th className="border p-3 text-left text-white">Earning Date</th>
                    <th className="border p-3 text-left text-white">Expiry Date</th>
                  </tr>
                </thead>
                <tbody>
                  {creditsData.map((credit, index) => (
                    <motion.tr key={index} className="bg-blue-800/30 hover:bg-blue-700/40 transition-all" whileHover={{ scale: 1.02 }}>
                      <td className="border p-3 text-white">{credit.meterNumber || "Not Found"}</td>
                      <td className="border p-3 text-white">{credit.creditsEarned}</td>
                      <td className="border p-3 text-white">{credit.earningDate}</td>
                      <td className="border p-3 text-white">{credit.expiryDate}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Use Credits Button */}
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(144, 238, 144, 0.8)" }}
                whileTap={{ scale: 0.95 }}
                className="rounded-xl bg-green-600 px-8 py-3 text-white font-bold text-lg transition-all shadow-lg hover:bg-green-700"
                onClick={() => {
                  alert("Redirecting to credits redemption page...");
                  window.location.href = "/water-credits/redeem";
                }}
              >
                Redeem Credits
              </motion.button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
