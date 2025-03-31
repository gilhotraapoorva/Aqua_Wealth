// // "use client";

// // const investmentData = [
// //   { id: 1, name: "Project A", amount: "$10,000", status: "Approved" },
// //   { id: 2, name: "Project B", amount: "$7,500", status: "Pending" },
// //   { id: 3, name: "Project C", amount: "$15,000", status: "Completed" },
// // ];

// // export default function InvestmentTable() {
// //   return (
// //     <div className="bg-white shadow-md rounded-lg p-6">
// //       <h2 className="text-2xl font-semibold text-gray-700 mb-4">Investment Details</h2>
// //       <div className="overflow-x-auto">
// //         <table className="w-full border-collapse text-sm text-gray-700">
// //           <thead>
// //             <tr className="bg-gray-200 text-gray-600 uppercase text-xs font-semibold">
// //               <th className="px-4 py-3 text-left">ID</th>
// //               <th className="px-4 py-3 text-left">Project Name</th>
// //               <th className="px-4 py-3 text-left">Amount</th>
// //               <th className="px-4 py-3 text-left">Status</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {investmentData.map((investment) => (
// //               <tr key={investment.id} className="border-b last:border-none hover:bg-gray-100">
// //                 <td className="px-4 py-3">{investment.id}</td>
// //                 <td className="px-4 py-3">{investment.name}</td>
// //                 <td className="px-4 py-3">{investment.amount}</td>
// //                 <td className={`px-4 py-3 font-medium ${investment.status === "Approved" ? "text-green-600" : investment.status === "Pending" ? "text-yellow-600" : "text-gray-600"}`}>
// //                   {investment.status}
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // }


// "use client";

// import { useState, useEffect } from "react";
// import { fetchInvestments } from "@/lib/api";  // API function to get investments

// // Investment Type
// type Investment = {
//   user: {
//     userName: string;
//   };
//   buyRate: number;
//   units: number;
//   investmentDate: string;
//   status: string;
//   project: {
//     projectName: string;
//   };
// };

// export default function InvestmentTable() {
//   const [investments, setInvestments] = useState<Investment[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch investments from backend
//   useEffect(() => {
//     const loadInvestments = async () => {
//       try {
//         setLoading(true);
//         const data = await fetchInvestments();
//         setInvestments(data);
//       } catch (err) {
//         setError("Failed to fetch investments. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadInvestments();
//   }, []);

//   return (
//     <div className="bg-white shadow-md rounded-lg p-6">
//       <h2 className="text-2xl font-semibold text-gray-700 mb-4">Investment Details</h2>
//       {loading ? (
//         <p className="text-gray-600">Loading investments...</p>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse text-sm text-gray-700">
//             <thead>
//               <tr className="bg-gray-200 text-gray-600 uppercase text-xs font-semibold">
//                 <th className="px-4 py-3 text-left">Investor Name</th>
//                 <th className="px-4 py-3 text-left">Project</th>
//                 <th className="px-4 py-3 text-left">Buy Rate</th>
//                 <th className="px-4 py-3 text-left">Units</th>
//                 <th className="px-4 py-3 text-left">Investment Date</th>
//                 <th className="px-4 py-3 text-left">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {investments.map((investment, index) => (
//                 <tr key={index} className="border-b last:border-none hover:bg-gray-100">
//                   <td className="px-4 py-3">{investment.user.userName}</td>
//                   <td className="px-4 py-3">{investment.project.projectName}</td>
//                   <td className="px-4 py-3">${investment.buyRate.toFixed(2)}</td>
//                   <td className="px-4 py-3">{investment.units}</td>
//                   <td className="px-4 py-3">{new Date(investment.investmentDate).toLocaleDateString()}</td>
//                   <td className={`px-4 py-3 font-medium ${investment.status === "Approved" ? "text-green-600" : investment.status === "Pending" ? "text-yellow-600" : "text-gray-600"}`}>
//                     {investment.status}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }
// "use client";

// const investmentData = [
//   { id: 1, name: "Project A", amount: "$10,000", status: "Approved" },
//   { id: 2, name: "Project B", amount: "$7,500", status: "Pending" },
//   { id: 3, name: "Project C", amount: "$15,000", status: "Completed" },
// ];

// export default function InvestmentTable() {
//   return (
//     <div className="bg-white shadow-md rounded-lg p-6">
//       <h2 className="text-2xl font-semibold text-gray-700 mb-4">Investment Details</h2>
//       <div className="overflow-x-auto">
//         <table className="w-full border-collapse text-sm text-gray-700">
//           <thead>
//             <tr className="bg-gray-200 text-gray-600 uppercase text-xs font-semibold">
//               <th className="px-4 py-3 text-left">ID</th>
//               <th className="px-4 py-3 text-left">Project Name</th>
//               <th className="px-4 py-3 text-left">Amount</th>
//               <th className="px-4 py-3 text-left">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {investmentData.map((investment) => (
//               <tr key={investment.id} className="border-b last:border-none hover:bg-gray-100">
//                 <td className="px-4 py-3">{investment.id}</td>
//                 <td className="px-4 py-3">{investment.name}</td>
//                 <td className="px-4 py-3">{investment.amount}</td>
//                 <td className={px-4 py-3 font-medium ${investment.status === "Approved" ? "text-green-600" : investment.status === "Pending" ? "text-yellow-600" : "text-gray-600"}}>
//                   {investment.status}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { fetchInvestments } from "@/lib/api";  // API function to get investments

// Investment Type
type Investment = {
  user: {
    userName: string;
  };
  buyRate: number;
  units: number;
  investmentDate: string;
  status: string;
  project: {
    projectName: string;
  };
};

export default function InvestmentTable() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch investments from backend
  useEffect(() => {
    const loadInvestments = async () => {
      try {
        setLoading(true);
        const data = await fetchInvestments();
        setInvestments(data);
      } catch (err) {
        setError("Failed to fetch investments. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadInvestments();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Investment Details</h2>
      {loading ? (
        <p className="text-gray-600">Loading investments...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm text-gray-700">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-xs font-semibold">
                <th className="px-4 py-3 text-left">Investor Name</th>
                <th className="px-4 py-3 text-left">Project</th>
                <th className="px-4 py-3 text-left">Buy Rate</th>
                <th className="px-4 py-3 text-left">Units</th>
                <th className="px-4 py-3 text-left">Investment Date</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {investments.map((investment, index) => (
                <tr key={index} className="border-b last:border-none hover:bg-gray-100">
                  <td className="px-4 py-3">{investment.user.userName}</td>
                  <td className="px-4 py-3">{investment.project.projectName}</td>
                  <td className="px-4 py-3">${investment.buyRate.toFixed(2)}</td>
                  <td className="px-4 py-3">{investment.units}</td>
                  <td className="px-4 py-3">{new Date(investment.investmentDate).toLocaleDateString()}</td>
                  <td className={`px-4 py-3 font-medium ${investment.status === "Approved" ? "text-green-600" : investment.status === "Pending" ? "text-yellow-600" : "text-gray-600"}`}>
                    {investment.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}