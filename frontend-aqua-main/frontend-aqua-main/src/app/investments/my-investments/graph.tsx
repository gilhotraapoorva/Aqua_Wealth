

"use client";

import { useState, useEffect } from "react";
import { fetchInvestments } from "@/lib/api";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Define the Investment type
type Investment = {
  investmentDate: string; // Can be Date if your API returns Date objects
  buyRate: number;
  units: number;
};

// Graph Data Type
type GraphData = {
  month: string;
  value: number;
};

export default function GraphPage() {
  const [data, setData] = useState<GraphData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadInvestmentData = async () => {
      try {
        setLoading(true);
        const investments: Investment[] = await fetchInvestments(); // Ensure proper type

        // Process data to aggregate investment amounts by month
        const monthlyData: Record<string, number> = {};
        investments.forEach((investment) => {
          const month = new Date(investment.investmentDate).toLocaleString("default", { month: "short" });
          monthlyData[month] = (monthlyData[month] || 0) + investment.buyRate * investment.units;
        });

        // Convert to array format for Recharts
        const graphData: GraphData[] = Object.entries(monthlyData).map(([month, value]) => ({ month, value }));

        setData(graphData);
      } catch (err) {
        console.error("Error fetching investments:", err);
        setError("Failed to fetch investment trends.");
      } finally {
        setLoading(false);
      }
    };

    loadInvestmentData();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Investment Trends</h2>
      {loading ? (
        <p className="text-gray-600">Loading graph...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fill: "#4B5563" }} />
              <YAxis tick={{ fill: "#4B5563" }} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#4F46E5" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
