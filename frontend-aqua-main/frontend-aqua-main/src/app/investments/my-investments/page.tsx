
"use client";

import InvestmentTable from "./table";
import InvestmentGraph from "./graph";

export default function MyInvestments() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-900 via-blue-800 to-blue-600 p-10 relative overflow-hidden">
      <div className="w-full max-w-7xl rounded-3xl bg-blue-900/40 backdrop-blur-xl p-10 shadow-2xl border border-blue-400/20 relative z-10">
        <h1 className="text-4xl font-extrabold text-green-300 drop-shadow-lg text-center mb-8">
          My Investments
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InvestmentGraph />
          <InvestmentTable />
        </div>
      </div>
    </div>
  );
}