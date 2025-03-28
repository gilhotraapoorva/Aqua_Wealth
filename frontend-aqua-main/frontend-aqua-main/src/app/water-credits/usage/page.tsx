"use client";
import { useState, useEffect } from "react";
import { fetchUsageRecords } from "@/lib/api"; // ✅ Import API
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

interface UsageRecord {
  meterNumber: string;
  readingValue: number;
  readingDate: string;
}

export default function UsagePage() {
  const [usageData, setUsageData] = useState<UsageRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch usage records directly from API
  useEffect(() => {
    const loadData = async () => {
      try {
        const usageRecords = await fetchUsageRecords();
        console.log("Fetched Usage Records:", usageRecords);

        // ✅ Fix the `readingDate` format before displaying
        const formattedData = usageRecords.map((record) => ({
          ...record,
          readingDate: new Date(record.readingDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }), // ✅ Convert "0018-09-15T00:00:00.000+00:00" → "Sep 15, 2018"
        }));

        setUsageData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching usage data:", error);
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-green-900 via-blue-800 to-blue-600 p-10">
      <div className="w-full max-w-5xl rounded-3xl bg-blue-900/40 p-10 shadow-2xl border border-blue-400/20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-green-300 drop-shadow-lg tracking-wide">
            Water Usage Details
          </h1>
          <p className="mt-4 text-lg text-white">Water usage per meter displayed as a table and a bar graph</p>
        </div>

        {loading ? (
          <p className="text-white text-center">Loading...</p>
        ) : usageData.length === 0 ? (
          <p className="text-white text-center">No usage data available.</p>
        ) : (
          <>
            {/* ✅ Table Display */}
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-blue-800/50">
                    <th className="border p-3 text-left text-white">Meter Number</th>
                    <th className="border p-3 text-left text-white">Reading Value</th>
                    <th className="border p-3 text-left text-white">Reading Date</th>
                  </tr>
                </thead>
                <tbody>
                  {usageData.map((usage, index) => (
                    <tr key={index} className="bg-blue-800/30">
                      <td className="border p-3 text-white">{usage.meterNumber || "Not Found"}</td>
                      <td className="border p-3 text-white">{usage.readingValue}</td>
                      <td className="border p-3 text-white">{usage.readingDate}</td> {/* ✅ Fixed date */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ✅ Bar Chart Display */}
            <div className="w-full">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={usageData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="meterNumber" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip contentStyle={{ backgroundColor: "#333", color: "#fff" }} />
                  <Legend />
                  <Bar dataKey="readingValue" fill="#4CAF50" name="Water Usage" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
