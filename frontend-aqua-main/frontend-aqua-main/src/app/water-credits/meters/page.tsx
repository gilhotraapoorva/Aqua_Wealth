// // // "use client";
// // // import { useState, useEffect } from "react";
// // // import { fetchMeters, addWaterMeter, deleteWaterMeter, addWaterUsage } from "@/lib/api";
// // // import { useUser } from "@/Context/UserContext"; 

// // // export default function MetersPage() {
// // //   const { user } = useUser();
// // //   const [meters, setMeters] = useState([]);
// // //   const [showAddMeterModal, setShowAddMeterModal] = useState(false);
// // //   const [showUsageModal, setShowUsageModal] = useState(false);
// // //   const [selectedMeter, setSelectedMeter] = useState("");
// // //   const [newUsage, setNewUsage] = useState({
// // //     meterNumber: "",
// // //     readingValue: "",
// // //     readingDate: new Date().toISOString().split("T")[0],
// // //   });
// // //   const [newMeter, setNewMeter] = useState({
// // //     meterNumber: "",
// // //     installationDate: "",
// // //     lastReadingDate: "",
// // //     status: "ACTIVE",
// // //     user: {
// // //       name: user?.name || "",
// // //       email: user?.email || "",
// // //       governmentId: user?.governmentId || "",
// // //     },
// // //   });

// // //   // Handle adding water usage
// // //   const handleAddUsage = async () => {
// // //     if (!newUsage.readingValue || !newUsage.readingDate) {
// // //       alert("Please fill out all fields");
// // //       return;
// // //     }

// // //     try {
// // //       await addWaterUsage({
// // //         ...newUsage,
// // //         meterNumber: selectedMeter,
// // //       });
// // //       alert("Usage added successfully!");
// // //       setShowUsageModal(false);
// // //       setNewUsage({
// // //         meterNumber: "",
// // //         readingValue: "",
// // //         readingDate: new Date().toISOString().split("T")[0],
// // //       });
// // //     } catch (error) {
// // //       alert(error.message);
// // //     }
// // //   };

// // //   // ... (keep all other existing code)

// // //   return (
// // //     <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-900 via-blue-800 to-blue-600 p-10 relative overflow-hidden">
// // //       {/* ... (keep existing meter cards and add meter modal) */}

// // //       {/* Add Usage Modal */}
// // //       {showUsageModal && (
// // //         <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50">
// // //           <div className="w-full max-w-md rounded-3xl bg-blue-900/40 backdrop-blur-xl p-6 shadow-2xl border border-blue-400/20">
// // //             <h2 className="text-2xl font-bold text-green-300 mb-4 drop-shadow-lg">
// // //               Add Water Usage for Meter: {selectedMeter}
// // //             </h2>
// // //             <div className="space-y-4">
// // //               <label className="block text-white font-semibold">Reading Value (cubic meters)</label>
// // //               <input
// // //                 type="number"
// // //                 placeholder="Enter reading value"
// // //                 value={newUsage.readingValue}
// // //                 onChange={(e) => setNewUsage({ ...newUsage, readingValue: e.target.value })}
// // //                 className="w-full px-4 py-2 rounded bg-gray-800 text-white"
// // //               />

// // //               <label className="block text-white font-semibold">Reading Date</label>
// // //               <input
// // //                 type="date"
// // //                 value={newUsage.readingDate}
// // //                 onChange={(e) => setNewUsage({ ...newUsage, readingDate: e.target.value })}
// // //                 className="w-full px-4 py-2 rounded bg-gray-800 text-white"
// // //               />
// // //             </div>

// // //             <div className="mt-6 flex justify-end space-x-4">
// // //               <button onClick={() => setShowUsageModal(false)} className="bg-gray-300 px-4 py-2 rounded">
// // //                 Cancel
// // //               </button>
// // //               <button onClick={handleAddUsage} className="bg-green-600 px-4 py-2 text-white rounded">
// // //                 Submit Usage
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }
// // // // // // "use client";

// // // // // // import { useState } from "react";
// // // // // // import { addWaterMeter, fetchMeters } from "@/lib/api";
// // // // // // interface Meter {
// // // // // //   meterNumber: string;
// // // // // //   installationDate: string;
// // // // // //   lastReadingDate: string;
// // // // // //   status: "ACTIVE" | "INACTIVE" | "MAINTENANCE";
// // // // // // }

// // // // // // interface UsageData {
// // // // // //   meterNumber: string;
// // // // // //   readingValue: string;
// // // // // //   readingDate: string;
// // // // // //   efficiencyScore: string;
// // // // // // }

// // // // // // export default function MetersPage() {
// // // // // //   // State for meter list
// // // // // //   const [meters, setMeters] = useState<Meter[]>([
// // // // // //     {
// // // // // //       meterNumber: "MTR-001",
// // // // // //       installationDate: "2023-01-01",
// // // // // //       lastReadingDate: "2023-04-15",
// // // // // //       status: "ACTIVE",
// // // // // //     },
// // // // // //   ]);

// // // // // //   // State for usage update (existing functionality)
// // // // // //   const [showUsageForm, setShowUsageForm] = useState(false);
// // // // // //   const [selectedMeter, setSelectedMeter] = useState<string>("");
// // // // // //   const [readingValue, setReadingValue] = useState("");
// // // // // //   const [readingDate, setReadingDate] = useState("");
// // // // // //   const [efficiencyScore, setEfficiencyScore] = useState("");
// // // // // //   const [usageRecords, setUsageRecords] = useState<UsageData[]>([]);

// // // // // //   // State for "Add New Meter" modal
// // // // // //   const [showAddMeterModal, setShowAddMeterModal] = useState(false);
// // // // // //   const [newMeterNumber, setNewMeterNumber] = useState("");
// // // // // //   const [newInstallationDate, setNewInstallationDate] = useState("");
// // // // // //   const [newStatus, setNewStatus] = useState<"ACTIVE" | "INACTIVE" | "MAINTENANCE">("ACTIVE");

// // // // // //   // Delete a meter
// // // // // //   const handleDeleteMeter = (meterNumber: string) => {
// // // // // //     setMeters(meters.filter((m) => m.meterNumber !== meterNumber));
// // // // // //   };

// // // // // //   // Add a new meter with mandatory field check and uniqueness check
// // // // // //   const handleAddMeter = () => {
// // // // // //     if (!newMeterNumber.trim() || !newInstallationDate.trim() || !newStatus) {
// // // // // //       alert("Please fill out all fields.");
// // // // // //       return;
// // // // // //     }
// // // // // //     const exists = meters.some((meter) => meter.meterNumber === newMeterNumber);
// // // // // //     if (exists) {
// // // // // //       alert("This meter number has already been used. Please use a unique meter number.");
// // // // // //       return;
// // // // // //     }
// // // // // //     const newMeter: Meter = {
// // // // // //       meterNumber: newMeterNumber,
// // // // // //       installationDate: newInstallationDate,
// // // // // //       lastReadingDate: newInstallationDate, // Initially, lastReadingDate equals installationDate
// // // // // //       status: newStatus,
// // // // // //     };
// // // // // //     setMeters([...meters, newMeter]);
// // // // // //     setNewMeterNumber("");
// // // // // //     setNewInstallationDate("");
// // // // // //     setNewStatus("ACTIVE");
// // // // // //     setShowAddMeterModal(false);
// // // // // //   };

// // // // // //   // Show usage update form for a selected meter
// // // // // //   const handleShowUsageForm = (meterNumber: string) => {
// // // // // //     setSelectedMeter(meterNumber);
// // // // // //     setReadingValue("");
// // // // // //     setReadingDate("");
// // // // // //     setEfficiencyScore("");
// // // // // //     setShowUsageForm(true);
// // // // // //   };

// // // // // //   // Submit usage update with mandatory field check
// // // // // //   const handleUsageSubmit = () => {
// // // // // //     if (!readingValue.trim() || !readingDate.trim() || !efficiencyScore.trim()) {
// // // // // //       alert("Please fill out all fields for usage details.");
// // // // // //       return;
// // // // // //     }
// // // // // //     const newUsage: UsageData = {
// // // // // //       meterNumber: selectedMeter,
// // // // // //       readingValue,
// // // // // //       readingDate,
// // // // // //       efficiencyScore,
// // // // // //     };
// // // // // //     setUsageRecords([...usageRecords, newUsage]);
// // // // // //     setMeters((prev) =>
// // // // // //       prev.map((m) =>
// // // // // //         m.meterNumber === selectedMeter ? { ...m, lastReadingDate: readingDate } : m
// // // // // //       )
// // // // // //     );
// // // // // //     setShowUsageForm(false);
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-900 via-blue-800 to-blue-600 p-10 relative overflow-hidden">
// // // // // //       <div className="w-full max-w-4xl rounded-3xl bg-blue-900/40 backdrop-blur-xl p-10 shadow-2xl border border-blue-400/20 relative z-10">
// // // // // //         {/* Explanatory Header */}
// // // // // //         <div className="mb-8 text-center">
// // // // // //           <h1 className="text-4xl font-extrabold text-green-300 drop-shadow-lg tracking-wide">
// // // // // //             Manage Your Water Meters
// // // // // //           </h1>
// // // // // //           <p className="mt-4 text-lg text-white">
// // // // // //             This page allows you to view and manage all your water meters. Each meter card displays its number, installation date, last reading date, and current status.
// // // // // //             You can update the usage details for each meter or remove a meter if it’s no longer needed. Use the “Add New Meter” button below to register a new meter – note that meter numbers must be unique.
// // // // // //           </p>
// // // // // //         </div>

// // // // // //         {/* Meter Cards */}
// // // // // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // // // //           {meters.map((meter) => (
// // // // // //             <div key={meter.meterNumber} className="rounded-2xl bg-blue-900/40 backdrop-blur-xl p-6 shadow-lg border border-blue-400/20 text-white">
// // // // // //               <h2 className="text-xl font-bold text-green-300 drop-shadow-lg">
// // // // // //                 {meter.meterNumber}
// // // // // //               </h2>
// // // // // //               <p>Installation Date: {meter.installationDate}</p>
// // // // // //               <p>Last Reading Date: {meter.lastReadingDate}</p>
// // // // // //               <p>Status: {meter.status}</p>
// // // // // //               <div className="mt-4 flex space-x-3">
// // // // // //                 <button
// // // // // //                   onClick={() => handleShowUsageForm(meter.meterNumber)}
// // // // // //                   className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 shadow"
// // // // // //                 >
// // // // // //                   Update Usage
// // // // // //                 </button>
// // // // // //                 <button
// // // // // //                   onClick={() => handleDeleteMeter(meter.meterNumber)}
// // // // // //                   className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 shadow"
// // // // // //                 >
// // // // // //                   Delete
// // // // // //                 </button>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           ))}
// // // // // //         </div>

// // // // // //         {/* Add New Meter Button Positioned Below Meter Cards */}
// // // // // //         <div className="mt-8 flex justify-center">
// // // // // //           <button
// // // // // //             onClick={() => setShowAddMeterModal(true)}
// // // // // //             className="rounded-full bg-green-600 px-6 py-3 text-white shadow-lg hover:bg-green-700"
// // // // // //           >
// // // // // //             Add New Meter
// // // // // //           </button>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* Add New Meter Modal */}
// // // // // //       {showAddMeterModal && (
// // // // // //         <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50">
// // // // // //           <div className="w-full max-w-md rounded-3xl bg-blue-900/40 backdrop-blur-xl p-6 shadow-2xl border border-blue-400/20">
// // // // // //             <h2 className="text-2xl font-bold text-green-300 mb-4 drop-shadow-lg">
// // // // // //               Add New Meter
// // // // // //             </h2>
// // // // // //             <div className="space-y-4">
// // // // // //               <div>
// // // // // //                 <label className="block text-sm font-medium text-white">Meter Number</label>
// // // // // //                 <input
// // // // // //                   type="text"
// // // // // //                   className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
// // // // // //                   value={newMeterNumber}
// // // // // //                   onChange={(e) => setNewMeterNumber(e.target.value)}
// // // // // //                   placeholder="Enter unique meter number"
// // // // // //                   required
// // // // // //                 />
// // // // // //               </div>
// // // // // //               <div>
// // // // // //                 <label className="block text-sm font-medium text-white">Installation Date</label>
// // // // // //                 <input
// // // // // //                   type="date"
// // // // // //                   className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
// // // // // //                   value={newInstallationDate}
// // // // // //                   onChange={(e) => setNewInstallationDate(e.target.value)}
// // // // // //                   required
// // // // // //                 />
// // // // // //               </div>
// // // // // //               <div>
// // // // // //                 <label className="block text-sm font-medium text-white">Status</label>
// // // // // //                 <select
// // // // // //                   className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
// // // // // //                   value={newStatus}
// // // // // //                   onChange={(e) =>
// // // // // //                     setNewStatus(e.target.value as "ACTIVE" | "INACTIVE" | "MAINTENANCE")
// // // // // //                   }
// // // // // //                   required
// // // // // //                 >
// // // // // //                   <option value="ACTIVE">ACTIVE</option>
// // // // // //                   <option value="INACTIVE">INACTIVE</option>
// // // // // //                   <option value="MAINTENANCE">MAINTENANCE</option>
// // // // // //                 </select>
// // // // // //               </div>
// // // // // //               <div className="flex justify-end space-x-3 mt-4">
// // // // // //                 <button
// // // // // //                   onClick={() => setShowAddMeterModal(false)}
// // // // // //                   className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400 text-gray-800 shadow"
// // // // // //                 >
// // // // // //                   Cancel
// // // // // //                 </button>
// // // // // //                 <button
// // // // // //                   onClick={handleAddMeter}
// // // // // //                   className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 shadow"
// // // // // //                 >
// // // // // //                   Add Meter
// // // // // //                 </button>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       )}

// // // // // //       {/* Update Usage Modal */}
// // // // // //       {showUsageForm && (
// // // // // //         <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50">
// // // // // //           <div className="w-full max-w-md rounded-3xl bg-blue-900/40 backdrop-blur-xl p-6 shadow-2xl border border-blue-400/20">
// // // // // //             <h2 className="text-2xl font-bold text-green-300 mb-4 drop-shadow-lg">
// // // // // //               Update Usage for {selectedMeter}
// // // // // //             </h2>
// // // // // //             <div className="space-y-4">
// // // // // //               <div>
// // // // // //                 <label className="block text-sm font-medium text-white">Reading Value</label>
// // // // // //                 <input
// // // // // //                   type="text"
// // // // // //                   className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
// // // // // //                   value={readingValue}
// // // // // //                   onChange={(e) => setReadingValue(e.target.value)}
// // // // // //                   required
// // // // // //                 />
// // // // // //               </div>
// // // // // //               <div>
// // // // // //                 <label className="block text-sm font-medium text-white">Reading Date</label>
// // // // // //                 <input
// // // // // //                   type="date"
// // // // // //                   className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
// // // // // //                   value={readingDate}
// // // // // //                   onChange={(e) => setReadingDate(e.target.value)}
// // // // // //                   required
// // // // // //                 />
// // // // // //               </div>
// // // // // //               <div>
// // // // // //                 <label className="block text-sm font-medium text-white">Efficiency Score</label>
// // // // // //                 <input
// // // // // //                   type="text"
// // // // // //                   className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
// // // // // //                   value={efficiencyScore}
// // // // // //                   onChange={(e) => setEfficiencyScore(e.target.value)}
// // // // // //                   required
// // // // // //                 />
// // // // // //               </div>
// // // // // //             </div>
// // // // // //             <div className="mt-6 flex justify-end space-x-4">
// // // // // //               <button
// // // // // //                 onClick={() => setShowUsageForm(false)}
// // // // // //                 className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400 text-gray-800 shadow"
// // // // // //               >
// // // // // //                 Cancela
// // // // // //               </button>
// // // // // //               <button
// // // // // //                 onClick={handleUsageSubmit}
// // // // // //                 className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 shadow"
// // // // // //               >
// // // // // //                 Submit
// // // // // //               </button>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );
// // // // // // }
// // // // // "use client";

// // // // // import { useState, useEffect } from "react";
// // // // // import { addWaterMeter, fetchMeters} from "@/lib/api";

// // // // // interface User {
// // // // //   name: string;
// // // // //   email: string;
// // // // //   governmentId: string;
// // // // // }

// // // // // interface Meter {
// // // // //   // id?: number;
// // // // //   meterNumber: string;
// // // // //   installationDate: string;
// // // // //   lastReadingDate: string;
// // // // //   // status: "ACTIVE" | "INACTIVE" | "MAINTENANCE";
// // // // //   // user?: User;
// // // // // }

// // // // // interface UsageData {
// // // // //   meterNumber: string;
// // // // //   readingValue: string;
// // // // //   readingDate: string;
// // // // //   efficiencyScore: string;
// // // // // }

// // // // // export default function MetersPage() {
// // // // //   // State for meter list
// // // // //   const [meters, setMeters] = useState<Meter[]>([]);
// // // // //   const [isLoading, setIsLoading] = useState(true);

// // // // //   // State for usage update (existing functionality)
// // // // //   const [showUsageForm, setShowUsageForm] = useState(false);
// // // // //   const [selectedMeter, setSelectedMeter] = useState<string>("");
// // // // //   const [readingValue, setReadingValue] = useState("");
// // // // //   const [readingDate, setReadingDate] = useState("");
// // // // //   const [efficiencyScore, setEfficiencyScore] = useState("");
// // // // //   const [usageRecords, setUsageRecords] = useState<UsageData[]>([]);

// // // // //   // State for "Add New Meter" modal
// // // // //   const [showAddMeterModal, setShowAddMeterModal] = useState(false);
// // // // //   const [newMeterNumber, setNewMeterNumber] = useState("");
// // // // //   const [newInstallationDate, setNewInstallationDate] = useState("");
// // // // //   const [newStatus, setNewStatus] = useState<"ACTIVE" | "INACTIVE" | "MAINTENANCE">("ACTIVE");

// // // // //   // Fetch meters on component mount
// // // // //   useEffect(() => {
// // // // //     const loadMeters = async () => {
// // // // //       try {
// // // // //         const response = await fetchMeters();
// // // // //         setMeters(response);
// // // // //         setIsLoading(false);
// // // // //       } catch (error) {
// // // // //         console.error("Failed to fetch meters:", error);
// // // // //         setIsLoading(false);
// // // // //       }
// // // // //     };
    
// // // // //     loadMeters();
// // // // //   }, []);

// // // // //   // Delete a meter
// // // // //   // const handleDeleteMeter = async (meterNumber: string) => {
// // // // //   //   try {
// // // // //   //     // Find the meter to get its ID
// // // // //   //     const meterToDelete = meters.find(m => m.meterNumber === meterNumber);
// // // // //   //     if (!meterToDelete || !meterToDelete.id) {
// // // // //   //       throw new Error("Meter not found");
// // // // //   //     }
      
// // // // //   //     // Call the API to delete
// // // // //   //     await deleteWaterMeter(meterToDelete.id);
      
// // // // //   //     // If successful, update local state
// // // // //   //     setMeters(meters.filter((m) => m.meterNumber !== meterNumber));
// // // // //   //   } catch (error) {
// // // // //   //     console.error("Failed to delete meter:", error);
// // // // //   //     alert("Failed to delete meter. Please try again.");
// // // // //   //   }
// // // // //   // };

// // // // //   // Add a new meter with mandatory field check and uniqueness check
// // // // //   // Update your state for the new meter modal
// // // // // const [newLastReadingDate, setNewLastReadingDate] = useState("");

// // // // // // Update your handleAddMeter function
// // // // // const handleAddMeter = async () => {
// // // // //   if (!newMeterNumber.trim() || !newInstallationDate.trim() || !newLastReadingDate.trim() || !newStatus) {
// // // // //     alert("Please fill out all fields.");
// // // // //     return;
// // // // //   }
  
// // // // //   const exists = meters.some((meter) => meter.meterNumber === newMeterNumber);
// // // // //   if (exists) {
// // // // //     alert("This meter number has already been used. Please use a unique meter number.");
// // // // //     return;
// // // // //   }

// // // // //   try {
// // // // //     const currentUser = {
// // // // //       name: "John Doe",
// // // // //       email: "john@example.com",
// // // // //       governmentId: "123456789"
// // // // //     };

// // // // //     const meterData = {
// // // // //       meterNumber: newMeterNumber,
// // // // //       installationDate: newInstallationDate,
// // // // //       lastReadingDate: newLastReadingDate, // Use the new field
// // // // //       status: newStatus,
// // // // //       user: currentUser
// // // // //     };

// // // // //     const response = await addWaterMeter(meterData);
      
// // // // //     const newMeter: Meter = {
// // // // //       meterNumber: newMeterNumber,
// // // // //       installationDate: newInstallationDate,
// // // // //       lastReadingDate: newLastReadingDate, // Use the new field
// // // // //       status: newStatus,
// // // // //     };
      
// // // // //     setMeters([...meters, newMeter]);
// // // // //     setNewMeterNumber("");
// // // // //     setNewInstallationDate("");
// // // // //     setNewLastReadingDate(""); // Reset the new field
// // // // //     setNewStatus("ACTIVE");
// // // // //     setShowAddMeterModal(false);
      
// // // // //   } catch (error) {
// // // // //     console.error("Failed to add meter:", error);
// // // // //     alert(`Failed to add meter: ${error instanceof Error ? error.message : 'Unknown error'}`);
// // // // //   }
// // // // // };

// // // // // // Update your modal JSX to include the new field
// // // // // {showAddMeterModal && (
// // // // //   <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50">
// // // // //     <div className="w-full max-w-md rounded-3xl bg-blue-900/40 backdrop-blur-xl p-6 shadow-2xl border border-blue-400/20">
// // // // //       <h2 className="text-2xl font-bold text-green-300 mb-4 drop-shadow-lg">
// // // // //         Add New Meter
// // // // //       </h2>
// // // // //       <div className="space-y-4">
// // // // //         {/* Existing fields... */}
        
// // // // //         {/* Add this new field */}
// // // // //         <div>
// // // // //           <label className="block text-sm font-medium text-white">Last Reading Date</label>
// // // // //           <input
// // // // //             type="date"
// // // // //             className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
// // // // //             value={newLastReadingDate}
// // // // //             onChange={(e) => setNewLastReadingDate(e.target.value)}
// // // // //             required
// // // // //           />
// // // // //         </div>
        
// // // // //         {/* Rest of your modal content... */}
// // // // //       </div>
// // // // //     </div>
// // // // //   </div>
// // // // // )}

// // // // //   // Show usage update form for a selected meter
// // // // //   const handleShowUsageForm = (meterNumber: string) => {
// // // // //     setSelectedMeter(meterNumber);
// // // // //     setReadingValue("");
// // // // //     setReadingDate("");
// // // // //     setEfficiencyScore("");
// // // // //     setShowUsageForm(true);
// // // // //   };

// // // // //   // Submit usage update with mandatory field check
// // // // //   const handleUsageSubmit = () => {
// // // // //     if (!readingValue.trim() || !readingDate.trim() || !efficiencyScore.trim()) {
// // // // //       alert("Please fill out all fields for usage details.");
// // // // //       return;
// // // // //     }
// // // // //     const newUsage: UsageData = {
// // // // //       meterNumber: selectedMeter,
// // // // //       readingValue,
// // // // //       readingDate,
// // // // //       efficiencyScore,
// // // // //     };
// // // // //     setUsageRecords([...usageRecords, newUsage]);
// // // // //     setMeters((prev) =>
// // // // //       prev.map((m) =>
// // // // //         m.meterNumber === selectedMeter ? { ...m, lastReadingDate: readingDate } : m
// // // // //       )
// // // // //     );
// // // // //     setShowUsageForm(false);
// // // // //   };

// // // // //   if (isLoading) {
// // // // //     return (
// // // // //       <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-900 via-blue-800 to-blue-600">
// // // // //         <div className="text-white text-xl">Loading meters...</div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-900 via-blue-800 to-blue-600 p-10 relative overflow-hidden">
// // // // //       <div className="w-full max-w-4xl rounded-3xl bg-blue-900/40 backdrop-blur-xl p-10 shadow-2xl border border-blue-400/20 relative z-10">
// // // // //         {/* Explanatory Header */}
// // // // //         <div className="mb-8 text-center">
// // // // //           <h1 className="text-4xl font-extrabold text-green-300 drop-shadow-lg tracking-wide">
// // // // //             Manage Your Water Meters
// // // // //           </h1>
// // // // //           <p className="mt-4 text-lg text-white">
// // // // //             This page allows you to view and manage all your water meters. Each meter card displays its number, installation date, last reading date, and current status.
// // // // //             You can update the usage details for each meter or remove a meter if it's no longer needed. Use the "Add New Meter" button below to register a new meter – note that meter numbers must be unique.
// // // // //           </p>
// // // // //         </div>

// // // // //         {/* Meter Cards */}
// // // // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // // //           {meters.map((meter) => (
// // // // //             <div key={meter.meterNumber} className="rounded-2xl bg-blue-900/40 backdrop-blur-xl p-6 shadow-lg border border-blue-400/20 text-white">
// // // // //               <h2 className="text-xl font-bold text-green-300 drop-shadow-lg">
// // // // //                 {meter.meterNumber}
// // // // //               </h2>
// // // // //               <p>Installation Date: {meter.installationDate}</p>
// // // // //               <p>Last Reading Date: {meter.lastReadingDate}</p>
// // // // //               <p>Status: {meter.status}</p>
// // // // //               <div className="mt-4 flex space-x-3">
// // // // //                 <button
// // // // //                   onClick={() => handleShowUsageForm(meter.meterNumber)}
// // // // //                   className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 shadow"
// // // // //                 >
// // // // //                   Update Usage
// // // // //                 </button>
// // // // //                 {/* <button
// // // // //                   onClick={() => handleDeleteMeter(meter.meterNumber)}
// // // // //                   className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 shadow"
// // // // //                 >
// // // // //                   Delete
// // // // //                 </button> */}
// // // // //               </div>
// // // // //             </div>
// // // // //           ))}
// // // // //         </div>

// // // // //         {/* Add New Meter Button Positioned Below Meter Cards */}
// // // // //         <div className="mt-8 flex justify-center">
// // // // //           <button
// // // // //             onClick={() => setShowAddMeterModal(true)}
// // // // //             className="rounded-full bg-green-600 px-6 py-3 text-white shadow-lg hover:bg-green-700"
// // // // //           >
// // // // //             Add New Meter
// // // // //           </button>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Add New Meter Modal */}
// // // // //       {showAddMeterModal && (
// // // // //         <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50">
// // // // //           <div className="w-full max-w-md rounded-3xl bg-blue-900/40 backdrop-blur-xl p-6 shadow-2xl border border-blue-400/20">
// // // // //             <h2 className="text-2xl font-bold text-green-300 mb-4 drop-shadow-lg">
// // // // //               Add New Meter
// // // // //             </h2>
// // // // //             <div className="space-y-4">
// // // // //               <div>
// // // // //                 <label className="block text-sm font-medium text-white">Meter Number</label>
// // // // //                 <input
// // // // //                   type="text"
// // // // //                   className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
// // // // //                   value={newMeterNumber}
// // // // //                   onChange={(e) => setNewMeterNumber(e.target.value)}
// // // // //                   placeholder="Enter unique meter number"
// // // // //                   required
// // // // //                 />
// // // // //               </div>
// // // // //               <div>
// // // // //                 <label className="block text-sm font-medium text-white">Installation Date</label>
// // // // //                 <input
// // // // //                   type="date"
// // // // //                   className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
// // // // //                   value={newInstallationDate}
// // // // //                   onChange={(e) => setNewInstallationDate(e.target.value)}
// // // // //                   required
// // // // //                 />
// // // // //               </div>
// // // // //               <div>
// // // // //                 <label className="block text-sm font-medium text-white">Status</label>
// // // // //                 <select
// // // // //                   className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
// // // // //                   value={newStatus}
// // // // //                   onChange={(e) =>
// // // // //                     setNewStatus(e.target.value as "ACTIVE" | "INACTIVE" | "MAINTENANCE")
// // // // //                   }
// // // // //                   required
// // // // //                 >
// // // // //                   <option value="ACTIVE">ACTIVE</option>
// // // // //                   <option value="INACTIVE">INACTIVE</option>
// // // // //                   <option value="MAINTENANCE">MAINTENANCE</option>
// // // // //                 </select>
// // // // //               </div>
// // // // //               <div className="flex justify-end space-x-3 mt-4">
// // // // //                 <button
// // // // //                   onClick={() => setShowAddMeterModal(false)}
// // // // //                   className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400 text-gray-800 shadow"
// // // // //                 >
// // // // //                   Cancel
// // // // //                 </button>
// // // // //                 <button
// // // // //                   onClick={handleAddMeter}
// // // // //                   className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 shadow"
// // // // //                 >
// // // // //                   Add Meter
// // // // //                 </button>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}

// // // // //       {/* Update Usage Modal */}
// // // // //       {showUsageForm && (
// // // // //         <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50">
// // // // //           <div className="w-full max-w-md rounded-3xl bg-blue-900/40 backdrop-blur-xl p-6 shadow-2xl border border-blue-400/20">
// // // // //             <h2 className="text-2xl font-bold text-green-300 mb-4 drop-shadow-lg">
// // // // //               Update Usage for {selectedMeter}
// // // // //             </h2>
// // // // //             <div className="space-y-4">
// // // // //               <div>
// // // // //                 <label className="block text-sm font-medium text-white">Reading Value</label>
// // // // //                 <input
// // // // //                   type="text"
// // // // //                   className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
// // // // //                   value={readingValue}
// // // // //                   onChange={(e) => setReadingValue(e.target.value)}
// // // // //                   required
// // // // //                 />
// // // // //               </div>
// // // // //               <div>
// // // // //                 <label className="block text-sm font-medium text-white">Reading Date</label>
// // // // //                 <input
// // // // //                   type="date"
// // // // //                   className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
// // // // //                   value={readingDate}
// // // // //                   onChange={(e) => setReadingDate(e.target.value)}
// // // // //                   required
// // // // //                 />
// // // // //               </div>
// // // // //               <div>
// // // // //                 <label className="block text-sm font-medium text-white">Efficiency Score</label>
// // // // //                 <input
// // // // //                   type="text"
// // // // //                   className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
// // // // //                   value={efficiencyScore}
// // // // //                   onChange={(e) => setEfficiencyScore(e.target.value)}
// // // // //                   required
// // // // //                 />
// // // // //               </div>
// // // // //             </div>
// // // // //             <div className="mt-6 flex justify-end space-x-4">
// // // // //               <button
// // // // //                 onClick={() => setShowUsageForm(false)}
// // // // //                 className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400 text-gray-800 shadow"
// // // // //               >
// // // // //                 Cancel
// // // // //               </button>
// // // // //               <button
// // // // //                 onClick={handleUsageSubmit}
// // // // //                 className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 shadow"
// // // // //               >
// // // // //                 Submit
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // }
// // // // "use client";

// // // // import { useState, useEffect } from "react";
// // // // import { addWaterMeter, fetchMeters } from "@/lib/api";

// // // // interface Meter {
// // // //   meterNumber: string;
// // // //   installationDate: string;
// // // //   lastReadingDate: string;
// // // //   status: "ACTIVE" | "INACTIVE" | "MAINTENANCE";
// // // // }

// // // // interface UsageData {
// // // //   meterNumber: string;
// // // //   readingValue: string;
// // // //   readingDate: string;
// // // //   efficiencyScore: string;
// // // // }

// // // // export default function MetersPage() {
// // // //   // State for meter list
// // // //   const [meters, setMeters] = useState<Meter[]>([]);
// // // //   const [isLoading, setIsLoading] = useState(true);

// // // //   // State for usage update
// // // //   const [showUsageForm, setShowUsageForm] = useState(false);
// // // //   const [selectedMeter, setSelectedMeter] = useState<string>("");
// // // //   const [readingValue, setReadingValue] = useState("");
// // // //   const [readingDate, setReadingDate] = useState("");
// // // //   const [efficiencyScore, setEfficiencyScore] = useState("");
// // // //   const [usageRecords, setUsageRecords] = useState<UsageData[]>([]);

// // // //   // State for "Add New Meter" modal
// // // //   const [showAddMeterModal, setShowAddMeterModal] = useState(false);
// // // //   const [newMeterNumber, setNewMeterNumber] = useState("");
// // // //   const [newInstallationDate, setNewInstallationDate] = useState("");
// // // //   const [newLastReadingDate, setNewLastReadingDate] = useState("");
// // // //   const [newStatus, setNewStatus] = useState<"ACTIVE" | "INACTIVE" | "MAINTENANCE">("ACTIVE");

// // // //   // Fetch meters on component mount
// // // //   useEffect(() => {
// // // //     const loadMeters = async () => {
// // // //       try {
// // // //         const response = await fetchMeters();
// // // //         setMeters(response);
// // // //         setIsLoading(false);
// // // //       } catch (error) {
// // // //         console.error("Failed to fetch meters:", error);
// // // //         setIsLoading(false);
// // // //       }
// // // //     };
    
// // // //     loadMeters();
// // // //   }, []);

// // // //   // Add a new meter with mandatory field check and uniqueness check
// // // //   const handleAddMeter = async () => {
// // // //     if (!newMeterNumber.trim() || !newInstallationDate.trim() || !newLastReadingDate.trim() || !newStatus) {
// // // //       alert("Please fill out all fields.");
// // // //       return;
// // // //     }
    
// // // //     const exists = meters.some((meter) => meter.meterNumber === newMeterNumber);
// // // //     if (exists) {
// // // //       alert("This meter number has already been used. Please use a unique meter number.");
// // // //       return;
// // // //     }

// // // //     try {
// // // //       const meterData = {
// // // //         meterNumber: newMeterNumber,
// // // //         installationDate: newInstallationDate,
// // // //         lastReadingDate: newLastReadingDate,
// // // //         status: newStatus,
// // // //         user: {
// // // //           name: "John Doe", // Replace with actual user data
// // // //           email: "john@example.com", // Replace with actual user data
// // // //           governmentId: "123456789" // Replace with actual user data
// // // //         }
// // // //       };

// // // //       await addWaterMeter(meterData);
      
// // // //       const newMeter: Meter = {
// // // //         meterNumber: newMeterNumber,
// // // //         installationDate: newInstallationDate,
// // // //         lastReadingDate: newLastReadingDate,
// // // //         status: newStatus,
// // // //       };
      
// // // //       setMeters([...meters, newMeter]);
// // // //       setNewMeterNumber("");
// // // //       setNewInstallationDate("");
// // // //       setNewLastReadingDate("");
// // // //       setNewStatus("ACTIVE");
// // // //       setShowAddMeterModal(false);
      
// // // //     } catch (error) {
// // // //       console.error("Failed to add meter:", error);
// // // //       alert(`Failed to add meter: ${error instanceof Error ? error.message : 'Unknown error'}`);
// // // //     }
// // // //   };

// // // //   // Show usage update form for a selected meter
// // // //   const handleShowUsageForm = (meterNumber: string) => {
// // // //     setSelectedMeter(meterNumber);
// // // //     setReadingValue("");
// // // //     setReadingDate("");
// // // //     setEfficiencyScore("");
// // // //     setShowUsageForm(true);
// // // //   };

// // // //   // Submit usage update with mandatory field check
// // // //   const handleUsageSubmit = () => {
// // // //     if (!readingValue.trim() || !readingDate.trim() || !efficiencyScore.trim()) {
// // // //       alert("Please fill out all fields for usage details.");
// // // //       return;
// // // //     }
// // // //     const newUsage: UsageData = {
// // // //       meterNumber: selectedMeter,
// // // //       readingValue,
// // // //       readingDate,
// // // //       efficiencyScore,
// // // //     };
// // // //     setUsageRecords([...usageRecords, newUsage]);
// // // //     setMeters((prev) =>
// // // //       prev.map((m) =>
// // // //         m.meterNumber === selectedMeter ? { ...m, lastReadingDate: readingDate } : m
// // // //       )
// // // //     );
// // // //     setShowUsageForm(false);
// // // //   };

// // // //   if (isLoading) {
// // // //     return (
// // // //       <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-900 via-blue-800 to-blue-600">
// // // //         <div className="text-white text-xl">Loading meters...</div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-900 via-blue-800 to-blue-600 p-10 relative overflow-hidden">
// // // //       <div className="w-full max-w-4xl rounded-3xl bg-blue-900/40 backdrop-blur-xl p-10 shadow-2xl border border-blue-400/20 relative z-10">
// // // //         {/* Explanatory Header */}
// // // //         <div className="mb-8 text-center">
// // // //           <h1 className="text-4xl font-extrabold text-green-300 drop-shadow-lg tracking-wide">
// // // //             Manage Your Water Meters
// // // //           </h1>
// // // //           <p className="mt-4 text-lg text-white">
// // // //             This page allows you to view and manage all your water meters. Each meter card displays its number, installation date, last reading date, and current status.
// // // //             You can update the usage details for each meter or remove a meter if it's no longer needed. Use the "Add New Meter" button below to register a new meter – note that meter numbers must be unique.
// // // //           </p>
// // // //         </div>

// // // //         {/* Meter Cards */}
// // // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // //           {meters.map((meter) => (
// // // //             <div key={meter.meterNumber} className="rounded-2xl bg-blue-900/40 backdrop-blur-xl p-6 shadow-lg border border-blue-400/20 text-white">
// // // //               <h2 className="text-xl font-bold text-green-300 drop-shadow-lg">
// // // //                 {meter.meterNumber}
// // // //               </h2>
// // // //               <p>Installation Date: {meter.installationDate}</p>
// // // //               <p>Last Reading Date: {meter.lastReadingDate}</p>
// // // //               <p>Status: {meter.status}</p>
// // // //               <div className="mt-4 flex space-x-3">
// // // //                 <button
// // // //                   onClick={() => handleShowUsageForm(meter.meterNumber)}
// // // //                   className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 shadow"
// // // //                 >
// // // //                   Update Usage
// // // //                 </button>
// // // //               </div>
// // // //             </div>
// // // //           ))}
// // // //         </div>

// // // //         {/* Add New Meter Button */}
// // // //         <div className="mt-8 flex justify-center">
// // // //           <button
// // // //             onClick={() => setShowAddMeterModal(true)}
// // // //             className="rounded-full bg-green-600 px-6 py-3 text-white shadow-lg hover:bg-green-700"
// // // //           >
// // // //             Add New Meter
// // // //           </button>
// // // //         </div>
// // // //       </div>

// // // //       {/* Add New Meter Modal */}
// // // //       {showAddMeterModal && (
// // // //         <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50">
// // // //           <div className="w-full max-w-md rounded-3xl bg-blue-900/40 backdrop-blur-xl p-6 shadow-2xl border border-blue-400/20">
// // // //             <h2 className="text-2xl font-bold text-green-300 mb-4 drop-shadow-lg">
// // // //               Add New Meter
// // // //             </h2>
// // // //             <div className="space-y-4">
// // // //               <div>
// // // //                 <label className="block text-sm font-medium text-white">Meter Number</label>
// // // //                 <input
// // // //                   type="text"
// // // //                   className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
// // // //                   value={newMeterNumber}
// // // //                   onChange={(e) => setNewMeterNumber(e.target.value)}
// // // //                   placeholder="Enter unique meter number"
// // // //                   required
// // // //                 />
// // // //               </div>
// // // //               <div>
// // // //                 <label className="block text-sm font-medium text-white">Installation Date</label>
// // // //                 <input
// // // //                   type="date"
// // // //                   className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
// // // //                   value={newInstallationDate}
// // // //                   onChange={(e) => setNewInstallationDate(e.target.value)}
// // // //                   required
// // // //                 />
// // // //               </div>
// // // //               <div>
// // // //                 <label className="block text-sm font-medium text-white">Last Reading Date</label>
// // // //                 <input
// // // //                   type="date"
// // // //                   className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
// // // //                   value={newLastReadingDate}
// // // //                   onChange={(e) => setNewLastReadingDate(e.target.value)}
// // // //                   required
// // // //                 />
// // // //               </div>
// // // //               <div>
// // // //                 <label className="block text-sm font-medium text-white">Status</label>
// // // //                 <select
// // // //                   className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
// // // //                   value={newStatus}
// // // //                   onChange={(e) =>
// // // //                     setNewStatus(e.target.value as "ACTIVE" | "INACTIVE" | "MAINTENANCE")
// // // //                   }
// // // //                   required
// // // //                 >
// // // //                   <option value="ACTIVE">ACTIVE</option>
// // // //                   <option value="INACTIVE">INACTIVE</option>
// // // //                   <option value="MAINTENANCE">MAINTENANCE</option>
// // // //                 </select>
// // // //               </div>
// // // //               <div className="flex justify-end space-x-3 mt-4">
// // // //                 <button
// // // //                   onClick={() => setShowAddMeterModal(false)}
// // // //                   className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400 text-gray-800 shadow"
// // // //                 >
// // // //                   Cancel
// // // //                 </button>
// // // //                 <button
// // // //                   onClick={handleAddMeter}
// // // //                   className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 shadow"
// // // //                 >
// // // //                   Add Meter
// // // //                 </button>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {/* Update Usage Modal */}
// // // //       {showUsageForm && (
// // // //         <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50">
// // // //           <div className="w-full max-w-md rounded-3xl bg-blue-900/40 backdrop-blur-xl p-6 shadow-2xl border border-blue-400/20">
// // // //             <h2 className="text-2xl font-bold text-green-300 mb-4 drop-shadow-lg">
// // // //               Update Usage for {selectedMeter}
// // // //             </h2>
// // // //             <div className="space-y-4">
// // // //               <div>
// // // //                 <label className="block text-sm font-medium text-white">Reading Value</label>
// // // //                 <input
// // // //                   type="text"
// // // //                   className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
// // // //                   value={readingValue}
// // // //                   onChange={(e) => setReadingValue(e.target.value)}
// // // //                   required
// // // //                 />
// // // //               </div>
// // // //               <div>
// // // //                 <label className="block text-sm font-medium text-white">Reading Date</label>
// // // //                 <input
// // // //                   type="date"
// // // //                   className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
// // // //                   value={readingDate}
// // // //                   onChange={(e) => setReadingDate(e.target.value)}
// // // //                   required
// // // //                 />
// // // //               </div>
// // // //               <div>
// // // //                 <label className="block text-sm font-medium text-white">Efficiency Score</label>
// // // //                 <input
// // // //                   type="text"
// // // //                   className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
// // // //                   value={efficiencyScore}
// // // //                   onChange={(e) => setEfficiencyScore(e.target.value)}
// // // //                   required
// // // //                 />
// // // //               </div>
// // // //             </div>
// // // //             <div className="mt-6 flex justify-end space-x-4">
// // // //               <button
// // // //                 onClick={() => setShowUsageForm(false)}
// // // //                 className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400 text-gray-800 shadow"
// // // //               >
// // // //                 Cancel
// // // //               </button>
// // // //               <button
// // // //                 onClick={handleUsageSubmit}
// // // //                 className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 shadow"
// // // //               >
// // // //                 Submit
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // // "use client";
// // // import { useState, useEffect } from "react";
// // // import { fetchMeters, addWaterMeter, deleteWaterMeter } from "@/lib/api"; // Import API functions
// // // import { useUser } from "@/Context/UserContext"; 
// // // export default function MetersPage() {
// // //   const [meters, setMeters] = useState([]);
// // //   const [showAddMeterModal, setShowAddMeterModal] = useState(false);
// // //   const [newMeter, setNewMeter] = useState({
// // //     meterNumber: "",
// // //     installationDate: "",
// // //     lastReadingDate: "", // ✅ Last Reading Date is back!
// // //     status: "ACTIVE",
// // //     user: {
// // //       name: "",
// // //       email: "",
// // //       governmentId: "",
// // //     },
// // //   });

// // //   // Fetch meters on load
// // //   useEffect(() => {
// // //     const loadMeters = async () => {
// // //       try {
// // //         const data = await fetchMeters();
// // //         setMeters(data);
// // //       } catch (error) {
// // //         console.error("Error fetching meters:", error);
// // //       }
// // //     };
// // //     loadMeters();
// // //   }, []);

// // //   // Handle adding a new meter
// // //   const handleAddMeter = async () => {
// // //     if (!newMeter.meterNumber || !newMeter.installationDate || !newMeter.user.name || !newMeter.user.email || !newMeter.user.governmentId) {
// // //       alert("Please fill out all fields.");
// // //       return;
// // //     }

// // //     // ✅ Ensure lastReadingDate matches installationDate initially
// // //     const meterData = {
// // //       ...newMeter,
// // //       lastReadingDate: newMeter.installationDate,
// // //     };

// // //     try {
// // //       await addWaterMeter(meterData);
// // //       setMeters([...meters, meterData]); // Update UI
// // //       setShowAddMeterModal(false);
// // //     } catch (error) {
// // //       alert(error.message);
// // //     }
// // //   };

// // //   return (
// // //     <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-900 via-blue-800 to-blue-600 p-10 relative overflow-hidden">
// // //       <div className="w-full max-w-4xl rounded-3xl bg-blue-900/40 backdrop-blur-xl p-10 shadow-2xl border border-blue-400/20 relative z-10">
// // //         {/* Explanatory Header */}
// // //         <div className="mb-8 text-center">
// // //           <h1 className="text-4xl font-extrabold text-green-300 drop-shadow-lg tracking-wide">
// // //             Manage Your Water Meters
// // //           </h1>
// // //           <p className="mt-4 text-lg text-white">
// // //             This page allows you to view and manage all your water meters. Each meter card displays its number, installation date, last reading date, and current status.
// // //           </p>
// // //         </div>

// // //         {/* Meter Cards */}
// // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //           {meters.map((meter) => (
// // //             <div key={meter.meterNumber} className="rounded-2xl bg-blue-900/40 backdrop-blur-xl p-6 shadow-lg border border-blue-400/20 text-white">
// // //               <h2 className="text-xl font-bold text-green-300 drop-shadow-lg">{meter.meterNumber}</h2>
// // //               <p>Installation Date: {meter.installationDate}</p>
// // //               <p>Last Reading Date: {meter.lastReadingDate}</p> {/* ✅ Last Reading Date displayed */}
// // //               <p>Status: {meter.status}</p>
// // //               <div className="mt-4 flex space-x-3">
// // //                 <button
// // //                   onClick={() => deleteWaterMeter(meter.meterNumber)}
// // //                   className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 shadow"
// // //                 >
// // //                   Delete
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           ))}
// // //         </div>

// // //         {/* Add New Meter Button */}
// // //         <div className="mt-8 flex justify-center">
// // //           <button onClick={() => setShowAddMeterModal(true)} className="rounded-full bg-green-600 px-6 py-3 text-white shadow-lg hover:bg-green-700">
// // //             Add New Meter
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* Add New Meter Modal */}
// // //       {showAddMeterModal && (
// // //         <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50">
// // //           <div className="w-full max-w-md rounded-3xl bg-blue-900/40 backdrop-blur-xl p-6 shadow-2xl border border-blue-400/20">
// // //             <h2 className="text-2xl font-bold text-green-300 mb-4 drop-shadow-lg">
// // //               Add New Meter
// // //             </h2>
// // //             <div className="space-y-4">
// // //               <label className="block text-white font-semibold">Meter Number</label>
// // //               <input
// // //                 type="text"
// // //                 placeholder="Enter meter number"
// // //                 value={newMeter.meterNumber}
// // //                 onChange={(e) => setNewMeter({ ...newMeter, meterNumber: e.target.value })}
// // //                 className="w-full px-4 py-2 rounded bg-gray-800 text-white"
// // //               />

// // //               <label className="block text-white font-semibold">Installation Date</label>
// // //               <input
// // //                 type="date"
// // //                 value={newMeter.installationDate}
// // //                 onChange={(e) => setNewMeter({ 
// // //                   ...newMeter, 
// // //                   installationDate: e.target.value, 
// // //                   lastReadingDate: e.target.value // ✅ Last Reading Date automatically set
// // //                 })}
// // //                 className="w-full px-4 py-2 rounded bg-gray-800 text-white"
// // //               />

// // //               <label className="block text-white font-semibold">Last Reading Date</label>
// // //               <input
// // //                 type="date"
// // //                 value={newMeter.lastReadingDate}
// // //                 onChange={(e) => setNewMeter({ ...newMeter, lastReadingDate: e.target.value })}
// // //                 className="w-full px-4 py-2 rounded bg-gray-800 text-white"
// // //               />

// // //               <label className="block text-white font-semibold">Name</label>
// // //               <input
// // //                 type="text"
// // //                 placeholder="Enter full name"
// // //                 value={newMeter.user.name}
// // //                 onChange={(e) => setNewMeter({ ...newMeter, user: { ...newMeter.user, name: e.target.value } })}
// // //                 className="w-full px-4 py-2 rounded bg-gray-800 text-white"
// // //               />

// // //               <label className="block text-white font-semibold">Email</label>
// // //               <input
// // //                 type="email"
// // //                 placeholder="Enter email"
// // //                 value={newMeter.user.email}
// // //                 onChange={(e) => setNewMeter({ ...newMeter, user: { ...newMeter.user, email: e.target.value } })}
// // //                 className="w-full px-4 py-2 rounded bg-gray-800 text-white"
// // //               />

// // //               <label className="block text-white font-semibold">Government ID</label>
// // //               <input
// // //                 type="text"
// // //                 placeholder="Enter government ID"
// // //                 value={newMeter.user.governmentId}
// // //                 onChange={(e) => setNewMeter({ ...newMeter, user: { ...newMeter.user, governmentId: e.target.value } })}
// // //                 className="w-full px-4 py-2 rounded bg-gray-800 text-white"
// // //               />

// // //               <label className="block text-white font-semibold">Meter Status</label>
// // //               <select
// // //                 value={newMeter.status}
// // //                 onChange={(e) => setNewMeter({ ...newMeter, status: e.target.value })}
// // //                 className="w-full px-4 py-2 rounded bg-gray-800 text-white"
// // //               >
// // //                 <option value="ACTIVE">ACTIVE</option>
// // //                 <option value="INACTIVE">INACTIVE</option>
// // //                 <option value="MAINTENANCE">MAINTENANCE</option>
// // //               </select>
// // //             </div>

// // //             <div className="mt-6 flex justify-end space-x-4">
// // //               <button onClick={() => setShowAddMeterModal(false)} className="bg-gray-300 px-4 py-2 rounded">
// // //                 Cancel
// // //               </button>
// // //               <button onClick={handleAddMeter} className="bg-green-600 px-4 py-2 text-white rounded">
// // //                 Add Meter
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }




// // // "use client";
// // // import { useState, useEffect } from "react";
// // // import { fetchMeters, addWaterMeter, addWaterUsage} from "@/lib/api";
// // // import { useUser } from "@/Context/UserContext"; 

// // // export default function MetersPage() {
// // //   const { user } = useUser();
// // //   const [meters, setMeters] = useState([]);
// // //   const [showAddMeterModal, setShowAddMeterModal] = useState(false);
// // //   const [newMeter, setNewMeter] = useState({
// // //     meterNumber: "",
// // //     installationDate: "",
// // //     lastReadingDate: "",
// // //     status: "ACTIVE",
// // //     user: {
// // //       name: user?.name || "",
// // //       email: user?.email || "",
// // //       governmentId: user?.governmentId || "",
// // //     },
// // //   });

// // //   // Update newMeter when user context changes
// // //   useEffect(() => {
// // //     if (user) {
// // //       setNewMeter(prev => ({
// // //         ...prev,
// // //         user: {
// // //           name: user.name,
// // //           email: user.email,
// // //           governmentId: user.governmentId,
// // //         }
// // //       }));
// // //     }
// // //   }, [user]);

// // //   // Fetch meters on load
// // //   useEffect(() => {
// // //     const loadMeters = async () => {
// // //       try {
// // //         const data = await fetchMeters();
// // //         setMeters(data);
// // //       } catch (error) {
// // //         console.error("Error fetching meters:", error);
// // //       }
// // //     };
// // //     loadMeters();
// // //   }, []);

// // //   // Handle adding a new meter
// // //   const handleAddMeter = async () => {
// // //     if (!newMeter.meterNumber || !newMeter.installationDate) {
// // //       alert("Please fill out all required fields.");
// // //       return;
// // //     }

// // //     const meterData = {
// // //       ...newMeter,
// // //       lastReadingDate: newMeter.installationDate,
// // //     };

// // //     try {
// // //       await addWaterMeter(meterData);
// // //       setMeters([...meters, meterData]);
// // //       setShowAddMeterModal(false);
// // //     } catch (error) {
// // //       alert(error.message);
// // //     }
// // //   };

// // //   if (!user) {
// // //     return (
// // //       <div className="flex items-center justify-center min-h-screen">
// // //         <p className="text-center text-red-500 font-bold">
// // //           Error: User not logged in. Please log in to manage water meters.
// // //         </p>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-900 via-blue-800 to-blue-600 p-10 relative overflow-hidden">
// // //       <div className="w-full max-w-4xl rounded-3xl bg-blue-900/40 backdrop-blur-xl p-10 shadow-2xl border border-blue-400/20 relative z-10">
// // //         {/* Explanatory Header */}
// // //         <div className="mb-8 text-center">
// // //           <h1 className="text-4xl font-extrabold text-green-300 drop-shadow-lg tracking-wide">
// // //             Manage Your Water Meters
// // //           </h1>
// // //           <p className="mt-4 text-lg text-white">
// // //             This page allows you to view and manage all your water meters. Each meter card displays its number, installation date, last reading date, and current status.
// // //           </p>
// // //         </div>

// // //         {/* Meter Cards */}
// // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //           {meters.map((meter) => (
// // //             <div key={meter.meterNumber} className="rounded-2xl bg-blue-900/40 backdrop-blur-xl p-6 shadow-lg border border-blue-400/20 text-white">
// // //               <h2 className="text-xl font-bold text-green-300 drop-shadow-lg">{meter.meterNumber}</h2>
// // //               <p>Installation Date: {meter.installationDate}</p>
// // //               <p>Last Reading Date: {meter.lastReadingDate}</p>
// // //               <p>Status: {meter.status}</p>
// // //               <div className="mt-4 flex space-x-3">
// // //                 <button
// // //                   onClick={() => {
// // //                     setSelectedMeter(meter.meterNumber);
// // //                     setShowUsageModal(true);
// // //                   }}
// // //                   className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 shadow"
// // //                 >
// // //                   Add Usage
// // //                 </button>
// // //                 <button
// // //                   onClick={() => deleteWaterMeter(meter.meterNumber)}
// // //                   className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 shadow"
// // //                 >
// // //                   Delete
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           ))}
// // //         </div>

// // //         {/* Add New Meter Button */}
// // //         <div className="mt-8 flex justify-center">
// // //           <button onClick={() => setShowAddMeterModal(true)} className="rounded-full bg-green-600 px-6 py-3 text-white shadow-lg hover:bg-green-700">
// // //             Add New Meter
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* Add New Meter Modal */}
// // //       {showAddMeterModal && (
// // //         <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50">
// // //           <div className="w-full max-w-md rounded-3xl bg-blue-900/40 backdrop-blur-xl p-6 shadow-2xl border border-blue-400/20">
// // //             <h2 className="text-2xl font-bold text-green-300 mb-4 drop-shadow-lg">
// // //               Add New Meter
// // //             </h2>
// // //             <div className="space-y-4">
// // //               <label className="block text-white font-semibold">Meter Number</label>
// // //               <input
// // //                 type="text"
// // //                 placeholder="Enter meter number"
// // //                 value={newMeter.meterNumber}
// // //                 onChange={(e) => setNewMeter({ ...newMeter, meterNumber: e.target.value })}
// // //                 className="w-full px-4 py-2 rounded bg-gray-800 text-white"
// // //               />

// // //               <label className="block text-white font-semibold">Installation Date</label>
// // //               <input
// // //                 type="date"
// // //                 value={newMeter.installationDate}
// // //                 onChange={(e) => setNewMeter({ 
// // //                   ...newMeter, 
// // //                   installationDate: e.target.value, 
// // //                   lastReadingDate: e.target.value
// // //                 })}
// // //                 className="w-full px-4 py-2 rounded bg-gray-800 text-white"
// // //               />

// // //               <label className="block text-white font-semibold">Last Reading Date</label>
// // //               <input
// // //                 type="date"
// // //                 value={newMeter.lastReadingDate}
// // //                 onChange={(e) => setNewMeter({ ...newMeter, lastReadingDate: e.target.value })}
// // //                 className="w-full px-4 py-2 rounded bg-gray-800 text-white"
// // //               />

// // //               {/* Non-editable user information */}
// // //               {[
// // //                 { label: "Name", value: newMeter.user.name },
// // //                 { label: "Email", value: newMeter.user.email },
// // //                 { label: "Government ID", value: newMeter.user.governmentId }
// // //               ].map((field) => (
// // //                 <div key={field.label}>
// // //                   <label className="block text-white font-semibold">{field.label}</label>
// // //                   <input
// // //                     type="text"
// // //                     className="w-full px-4 py-2 rounded bg-gray-700 text-white"
// // //                     value={field.value}
// // //                     disabled
// // //                   />
// // //                 </div>
// // //               ))}

// // //               <label className="block text-white font-semibold">Meter Status</label>
// // //               <select
// // //                 value={newMeter.status}
// // //                 onChange={(e) => setNewMeter({ ...newMeter, status: e.target.value })}
// // //                 className="w-full px-4 py-2 rounded bg-gray-800 text-white"
// // //               >
// // //                 <option value="ACTIVE">ACTIVE</option>
// // //                 <option value="INACTIVE">INACTIVE</option>
// // //                 <option value="MAINTENANCE">MAINTENANCE</option>
// // //               </select>
// // //             </div>

// // //             <div className="mt-6 flex justify-end space-x-4">
// // //               <button onClick={() => setShowAddMeterModal(false)} className="bg-gray-300 px-4 py-2 rounded">
// // //                 Cancel
// // //               </button>
// // //               <button onClick={handleAddMeter} className="bg-green-600 px-4 py-2 text-white rounded">
// // //                 Add Meter
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }


// // // "use client";
// // // import { useState, useEffect } from "react";
// // // import { fetchMeters, addWaterMeter, addWaterUsage } from "@/lib/api";
// // // import { useUser } from "@/Context/UserContext"; 
// // // import { motion } from "framer-motion";

// // // export default function MetersPage() {
// // //   const { user } = useUser();
// // //   const [meters, setMeters] = useState([]);
// // //   const [showAddMeterModal, setShowAddMeterModal] = useState(false);
// // //   const [showUsageModal, setShowUsageModal] = useState(false);
// // //   const [selectedMeter, setSelectedMeter] = useState("");
// // //   const [newUsage, setNewUsage] = useState({
// // //     meterNumber: "",
// // //     readingValue: "",
// // //     readingDate: new Date().toISOString().split("T")[0],
// // //   });
// // //   const [newMeter, setNewMeter] = useState({
// // //     meterNumber: "",
// // //     installationDate: "",
// // //     lastReadingDate: "",
// // //     status: "ACTIVE",
// // //     user: {
// // //       name: user?.name || "",
// // //       email: user?.email || "",
// // //       governmentId: user?.governmentId || "",
// // //     },
// // //   });

// // //   // Update newMeter when user context changes
// // //   useEffect(() => {
// // //     if (user) {
// // //       setNewMeter(prev => ({
// // //         ...prev,
// // //         user: {
// // //           name: user.name,
// // //           email: user.email,
// // //           governmentId: user.governmentId,
// // //         }
// // //       }));
// // //     }
// // //   }, [user]);

// // //   // Fetch meters on load
// // //   useEffect(() => {
// // //     const loadMeters = async () => {
// // //       try {
// // //         const data = await fetchMeters();
// // //         setMeters(data);
// // //       } catch (error) {
// // //         console.error("Error fetching meters:", error);
// // //       }
// // //     };
// // //     loadMeters();
// // //   }, []);

// // //   // Handle adding a new meter
// // //   const handleAddMeter = async () => {
// // //     if (!newMeter.meterNumber || !newMeter.installationDate) {
// // //       alert("Please fill out all required fields.");
// // //       return;
// // //     }

// // //     const meterData = {
// // //       ...newMeter,
// // //       lastReadingDate: newMeter.installationDate,
// // //     };

// // //     try {
// // //       await addWaterMeter(meterData);
// // //       setMeters([...meters, meterData]);
// // //       setShowAddMeterModal(false);
// // //     } catch (error) {
// // //       alert(error.message);
// // //     }
// // //   };

// // //   // Handle adding water usage
// // //   const handleAddUsage = async () => {
// // //     if (!newUsage.readingValue || !newUsage.readingDate) {
// // //       alert("Please fill out all fields");
// // //       return;
// // //     }

// // //     try {
// // //       await addWaterUsage({
// // //         ...newUsage,
// // //         meterNumber: selectedMeter,
// // //       });
// // //       alert("Water usage added successfully!");
// // //       setShowUsageModal(false);
// // //       setNewUsage({
// // //         meterNumber: "",
// // //         readingValue: "",
// // //         readingDate: new Date().toISOString().split("T")[0],
// // //       });
// // //     } catch (error) {
// // //       alert(error.message);
// // //     }
// // //   };

// // //   if (!user) {
// // //     return (
// // //       <div className="flex items-center justify-center min-h-screen">
// // //         <p className="text-center text-red-500 font-bold">
// // //           Error: User not logged in. Please log in to manage water meters.
// // //         </p>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-900 via-blue-800 to-blue-600 p-10 relative overflow-hidden">
// // //       <div className="w-full max-w-4xl rounded-3xl bg-blue-900/40 backdrop-blur-xl p-10 shadow-2xl border border-blue-400/20 relative z-10">
// // //         {/* Explanatory Header */}
// // //         <div className="mb-8 text-center">
// // //           <h1 className="text-4xl font-extrabold text-green-300 drop-shadow-lg tracking-wide">
// // //             Manage Your Water Meters
// // //           </h1>
// // //           <p className="mt-4 text-lg text-white">
// // //             This page allows you to view and manage all your water meters. Each meter card displays its number, installation date, last reading date, and current status.
// // //           </p>
// // //         </div>

// // //         {/* Meter Cards */}
// // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //           {meters.map((meter) => (
// // //             <motion.div 
// // //               key={meter.meterNumber} 
// // //               whileHover={{ y: -5 }}
// // //               className="rounded-2xl bg-blue-900/40 backdrop-blur-xl p-6 shadow-lg border border-blue-400/20 text-white"
// // //             >
// // //               <h2 className="text-xl font-bold text-green-300 drop-shadow-lg">{meter.meterNumber}</h2>
// // //               <p>Installation Date: {meter.installationDate}</p>
// // //               <p>Last Reading Date: {meter.lastReadingDate}</p>
// // //               <p>Status: {meter.status}</p>
// // //               <div className="mt-4 flex space-x-3">
// // //                 <motion.button
// // //                   whileHover={{ scale: 1.05 }}
// // //                   whileTap={{ scale: 0.95 }}
// // //                   onClick={() => {
// // //                     setSelectedMeter(meter.meterNumber);
// // //                     setNewUsage(prev => ({
// // //                       ...prev,
// // //                       meterNumber: meter.meterNumber,
// // //                       readingDate: new Date().toISOString().split("T")[0]
// // //                     }));
// // //                     setShowUsageModal(true);
// // //                   }}
// // //                   className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 shadow"
// // //                 >
// // //                   Add Usage
// // //                 </motion.button>
// // //               </div>
// // //             </motion.div>
// // //           ))}
// // //         </div>

// // //         {/* Add New Meter Button */}
// // //         <div className="mt-8 flex justify-center">
// // //           <motion.button 
// // //             whileHover={{ scale: 1.05 }}
// // //             whileTap={{ scale: 0.95 }}
// // //             onClick={() => setShowAddMeterModal(true)} 
// // //             className="rounded-full bg-green-600 px-6 py-3 text-white shadow-lg hover:bg-green-700"
// // //           >
// // //             Add New Meter
// // //           </motion.button>
// // //         </div>
// // //       </div>

// // //       {/* Add New Meter Modal */}
// // //       {showAddMeterModal && (
// // //         <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50">
// // //           <motion.div 
// // //             initial={{ opacity: 0, scale: 0.9 }}
// // //             animate={{ opacity: 1, scale: 1 }}
// // //             className="w-full max-w-md rounded-3xl bg-blue-900/40 backdrop-blur-xl p-6 shadow-2xl border border-blue-400/20"
// // //           >
// // //             <h2 className="text-2xl font-bold text-green-300 mb-4 drop-shadow-lg">
// // //               Add New Meter
// // //             </h2>
// // //             <div className="space-y-4">
// // //               <label className="block text-white font-semibold">Meter Number</label>
// // //               <input
// // //                 type="text"
// // //                 placeholder="Enter meter number"
// // //                 value={newMeter.meterNumber}
// // //                 onChange={(e) => setNewMeter({ ...newMeter, meterNumber: e.target.value })}
// // //                 className="w-full px-4 py-2 rounded bg-gray-800 text-white"
// // //               />

// // //               <label className="block text-white font-semibold">Installation Date</label>
// // //               <input
// // //                 type="date"
// // //                 value={newMeter.installationDate}
// // //                 onChange={(e) => setNewMeter({ 
// // //                   ...newMeter, 
// // //                   installationDate: e.target.value, 
// // //                   lastReadingDate: e.target.value
// // //                 })}
// // //                 className="w-full px-4 py-2 rounded bg-gray-800 text-white"
// // //               />

// // //               <label className="block text-white font-semibold">Last Reading Date</label>
// // //               <input
// // //                 type="date"
// // //                 value={newMeter.lastReadingDate}
// // //                 onChange={(e) => setNewMeter({ ...newMeter, lastReadingDate: e.target.value })}
// // //                 className="w-full px-4 py-2 rounded bg-gray-800 text-white"
// // //               />

// // //               {/* Non-editable user information */}
// // //               {[
// // //                 { label: "Name", value: newMeter.user.name },
// // //                 { label: "Email", value: newMeter.user.email },
// // //                 { label: "Government ID", value: newMeter.user.governmentId }
// // //               ].map((field) => (
// // //                 <div key={field.label}>
// // //                   <label className="block text-white font-semibold">{field.label}</label>
// // //                   <input
// // //                     type="text"
// // //                     className="w-full px-4 py-2 rounded bg-gray-700 text-white"
// // //                     value={field.value}
// // //                     disabled
// // //                   />
// // //                 </div>
// // //               ))}

// // //               <label className="block text-white font-semibold">Meter Status</label>
// // //               <select
// // //                 value={newMeter.status}
// // //                 onChange={(e) => setNewMeter({ ...newMeter, status: e.target.value })}
// // //                 className="w-full px-4 py-2 rounded bg-gray-800 text-white"
// // //               >
// // //                 <option value="ACTIVE">ACTIVE</option>
// // //                 <option value="INACTIVE">INACTIVE</option>
// // //                 <option value="MAINTENANCE">MAINTENANCE</option>
// // //               </select>
// // //             </div>

// // //             <div className="mt-6 flex justify-end space-x-4">
// // //               <motion.button 
// // //                 whileHover={{ scale: 1.05 }}
// // //                 whileTap={{ scale: 0.95 }}
// // //                 onClick={() => setShowAddMeterModal(false)} 
// // //                 className="bg-gray-300 px-4 py-2 rounded"
// // //               >
// // //                 Cancel
// // //               </motion.button>
// // //               <motion.button 
// // //                 whileHover={{ scale: 1.05 }}
// // //                 whileTap={{ scale: 0.95 }}
// // //                 onClick={handleAddMeter} 
// // //                 className="bg-green-600 px-4 py-2 text-white rounded"
// // //               >
// // //                 Add Meter
// // //               </motion.button>
// // //             </div>
// // //           </motion.div>
// // //         </div>
// // //       )}

// // //       {/* Add Usage Modal */}
// // //       {showUsageModal && (
// // //         <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50">
// // //           <motion.div
// // //             initial={{ opacity: 0, scale: 0.9 }}
// // //             animate={{ opacity: 1, scale: 1 }}
// // //             className="w-full max-w-md rounded-3xl bg-blue-900/40 backdrop-blur-xl p-6 shadow-2xl border border-blue-400/20"
// // //           >
// // //             <h2 className="text-2xl font-bold text-green-300 mb-4 drop-shadow-lg">
// // //               Add Water Usage for Meter: {selectedMeter}
// // //             </h2>
// // //             <div className="space-y-4">
// // //               <label className="block text-white font-semibold">Reading Value (cubic meters)</label>
// // //               <input
// // //                 type="number"
// // //                 placeholder="Enter reading value"
// // //                 value={newUsage.readingValue}
// // //                 onChange={(e) => setNewUsage({ ...newUsage, readingValue: e.target.value })}
// // //                 className="w-full px-4 py-2 rounded bg-gray-800 text-white"
// // //               />

// // //               <label className="block text-white font-semibold">Reading Date</label>
// // //               <input
// // //                 type="date"
// // //                 value={newUsage.readingDate}
// // //                 onChange={(e) => setNewUsage({ ...newUsage, readingDate: e.target.value })}
// // //                 className="w-full px-4 py-2 rounded bg-gray-800 text-white"
// // //               />
// // //             </div>

// // //             <div className="mt-6 flex justify-end space-x-4">
// // //               <motion.button
// // //                 whileHover={{ scale: 1.05 }}
// // //                 whileTap={{ scale: 0.95 }}
// // //                 onClick={() => setShowUsageModal(false)}
// // //                 className="bg-gray-300 px-4 py-2 rounded"
// // //               >
// // //                 Cancel
// // //               </motion.button>
// // //               <motion.button
// // //                 whileHover={{ scale: 1.05 }}
// // //                 whileTap={{ scale: 0.95 }}
// // //                 onClick={handleAddUsage}
// // //                 className="bg-green-600 px-4 py-2 text-white rounded"
// // //               >
// // //                 Submit Usage
// // //               </motion.button>
// // //             </div>
// // //           </motion.div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }
// // // "use client";
// // // import { useState, useEffect } from "react";
// // // import { fetchMeters, addWaterMeter, addWaterUsage } from "@/lib/api";
// // // import { useUser } from "@/Context/UserContext"; 
// // // import { motion } from "framer-motion";

// // // interface Meter {
// // //   id: number; 
// // //   meterNumber: string;
// // //   installationDate: string;
// // //   lastReadingDate: string;
// // //   status: string;
// // //   user: {
// // //     name: string;
// // //     email: string;
// // //     governmentId: string;
// // //   };
// // // }

// // // interface WaterUsage {
// // //   meterNumber: string;
// // //   readingValue: string;
// // //   readingDate: string;
// // // }

// // // export default function MetersPage() {
// // //   const { user } = useUser();
// // //   const [meters, setMeters] = useState<Meter[]>([]);
// // //   const [showAddMeterModal, setShowAddMeterModal] = useState(false);
// // //   const [showUsageModal, setShowUsageModal] = useState(false);
// // //   const [selectedMeter, setSelectedMeter] = useState("");
// // //   const [newUsage, setNewUsage] = useState<WaterUsage>({
// // //     meterNumber: "",
// // //     readingValue: "",
// // //     readingDate: new Date().toISOString().split("T")[0],
// // //   });
// // //   const [newMeter, setNewMeter] = useState<Omit<Meter, "meterNumber"> & { meterNumber: string }>({
// // //     id:"",
// // //     meterNumber: "",
// // //     installationDate: "",
// // //     lastReadingDate: "",
// // //     status: "ACTIVE",
// // //     user: {
// // //       name: user?.name || "",
// // //       email: user?.email || "",
// // //       governmentId: user?.governmentId || "",
// // //     },
// // //   });
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState<string | null>(null);

// // //   // Update newMeter when user context changes
// // //   useEffect(() => {
// // //     if (user) {
// // //       setNewMeter(prev => ({
// // //         ...prev,
// // //         user: {
// // //           name: user.name,
// // //           email: user.email,
// // //           governmentId: user.governmentId,
// // //         }
// // //       }));
// // //     }
// // //   }, [user]);

// // //   // Fetch meters on load
// // //   useEffect(() => {
// // //     const loadMeters = async () => {
// // //       try {
// // //         setLoading(true);
// // //         const data = await fetchMeters();
// // //         setMeters(data);
// // //         setError(null);
// // //       } catch (err) {
// // //         console.error("Error fetching meters:", err);
// // //         setError("Failed to fetch meters. Please try again.");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };
// // //     loadMeters();
// // //   }, []);

// // //   // Handle adding a new meter
// // //   const handleAddMeter = async () => {
// // //     if (!newMeter.meterNumber || !newMeter.installationDate) {
// // //       alert("Please fill out all required fields.");
// // //       return;
// // //     }

// // //     const meterData = {
// // //       ...newMeter,
// // //       lastReadingDate: newMeter.installationDate,
// // //     };

// // //     try {
// // //       const addedMeter = await addWaterMeter(meterData);
// // //       setMeters([...meters, addedMeter]);
// // //       setShowAddMeterModal(false);
// // //       setNewMeter({
// // //         id : "",
// // //         meterNumber: "",
// // //         installationDate: "",
// // //         lastReadingDate: "",
// // //         status: "ACTIVE",
// // //         user: {
// // //           name: user?.name || "",
// // //           email: user?.email || "",
// // //           governmentId: user?.governmentId || "",
// // //         },
// // //       });
// // //     } catch (error) {
// // //       console.error("Error adding meter:", error);
// // //       alert(error instanceof Error ? error.message : "Failed to add meter");
// // //     }
// // //   };

// // //   // Handle adding water usage
// // //   // const handleAddUsage = async () => {
// // //   //   if (!newUsage.readingValue || !newUsage.readingDate) {
// // //   //     alert("Please fill out all fields");
// // //   //     return;
// // //   //   }

// // //   //   try {
// // //   //     await addWaterUsage(selectedMeter, {
// // //   //       readingValue: newUsage.readingValue,
// // //   //       readingDate: newUsage.readingDate,
// // //   //     });
// // //   //     alert("Water usage added successfully!");
// // //   //     setShowUsageModal(false);
// // //   //     setNewUsage({
// // //   //       meterNumber: "",
// // //   //       readingValue: "",
// // //   //       readingDate: new Date().toISOString().split("T")[0],
// // //   //     });
// // //   //     // Refresh meters data
// // //   //     const updatedMeters = await fetchMeters();
// // //   //     setMeters(updatedMeters);
// // //   //   } catch (error) {
// // //   //     console.error("Error adding water usage:", error);
// // //   //     alert(error instanceof Error ? error.message : "Failed to add water usage");
// // //   //   }
// // //   // };
// // //   const handleAddUsage = async () => {
// // //     try {
// // //       if (!newUsage.readingValue) {
// // //         alert("Please enter a reading value");
// // //         return;
// // //       }
  
// // //       // First find the meter to get its ID
// // //       const meter = meters.find(m => m.meterNumber === selectedMeter);
// // //       if (!meter) {
// // //         throw new Error("Meter not found");
// // //       }
  
// // //       // Get the ID (you'll need to add id to your Meter interface)
// // //       const meterId = meter.id; // Make sure your Meter interface has an id field
      
// // //       await addWaterUsage(meterId, {
// // //         readingValue: newUsage.readingValue,
// // //         readingDate: newUsage.readingDate || new Date().toISOString().split('T')[0]
// // //       });
      
// // //       alert("Usage added successfully!");
// // //       setShowUsageModal(false);
      
// // //       // Refresh meter data
// // //       const updatedMeters = await fetchMeters();
// // //       setMeters(updatedMeters);
// // //     } catch (error) {
// // //       console.error("Error adding usage:", error);
// // //       alert(`Error: ${error instanceof Error ? error.message : "Failed to add usage"}`);
// // //     }
// // //   };
// // //   if (!user) {
// // //     return (
// // //       <div className="flex items-center justify-center min-h-screen">
// // //         <p className="text-center text-red-500 font-bold">
// // //           Error: User not logged in. Please log in to manage water meters.
// // //         </p>
// // //       </div>
// // //     );
// // //   }

// // //   if (loading) {
// // //     return (
// // //       <div className="flex items-center justify-center min-h-screen">
// // //         <p className="text-center text-white">Loading meters...</p>
// // //       </div>
// // //     );
// // //   }

// // //   if (error) {
// // //     return (
// // //       <div className="flex items-center justify-center min-h-screen">
// // //         <p className="text-center text-red-500">{error}</p>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-900 via-blue-800 to-blue-600 p-10 relative overflow-hidden">
// // //       <div className="w-full max-w-4xl rounded-3xl bg-blue-900/40 backdrop-blur-xl p-10 shadow-2xl border border-blue-400/20 relative z-10">
// // //         {/* Explanatory Header */}
// // //         <div className="mb-8 text-center">
// // //           <h1 className="text-4xl font-extrabold text-green-300 drop-shadow-lg tracking-wide">
// // //             Manage Your Water Meters
// // //           </h1>
// // //           <p className="mt-4 text-lg text-white">
// // //             This page allows you to view and manage all your water meters. Each meter card displays its number, installation date, last reading date, and current status.
// // //           </p>
// // //         </div>

// // //         {/* Meter Cards */}
// // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //           {meters.length > 0 ? (
// // //             meters.map((meter) => (
// // //               <motion.div 
// // //                 key={meter.meterNumber} 
// // //                 whileHover={{ y: -5 }}
// // //                 className="rounded-2xl bg-blue-900/40 backdrop-blur-xl p-6 shadow-lg border border-blue-400/20 text-white"
// // //               >
// // //                 <h2 className="text-xl font-bold text-green-300 drop-shadow-lg">{meter.meterNumber}</h2>
// // //                 <p>Installation Date: {meter.installationDate}</p>
// // //                 <p>Last Reading Date: {meter.lastReadingDate}</p>
// // //                 <p>Status: {meter.status}</p>
// // //                 <div className="mt-4 flex space-x-3">
// // //                   <motion.button
// // //                     whileHover={{ scale: 1.05 }}
// // //                     whileTap={{ scale: 0.95 }}
// // //                     onClick={() => {
// // //                       setSelectedMeter(meter.meterNumber);
// // //                       setNewUsage({
// // //                         meterNumber: meter.meterNumber,
// // //                         readingValue: "",
// // //                         readingDate: new Date().toISOString().split("T")[0]
// // //                       });
// // //                       setShowUsageModal(true);
// // //                     }}
// // //                     className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 shadow"
// // //                   >
// // //                     Add Usage
// // //                   </motion.button>
// // //                 </div>
// // //               </motion.div>
// // //             ))
// // //           ) : (
// // //             <div className="col-span-2 text-center text-white">
// // //               No water meters found. Add your first meter to get started.
// // //             </div>
// // //           )}
// // //         </div>

// // //         {/* Add New Meter Button */}
// // //         <div className="mt-8 flex justify-center">
// // //           <motion.button 
// // //             whileHover={{ scale: 1.05 }}
// // //             whileTap={{ scale: 0.95 }}
// // //             onClick={() => setShowAddMeterModal(true)} 
// // //             className="rounded-full bg-green-600 px-6 py-3 text-white shadow-lg hover:bg-green-700"
// // //           >
// // //             Add New Meter
// // //           </motion.button>
// // //         </div>
// // //       </div>

// // //       {/* Add New Meter Modal */}
// // //       {showAddMeterModal && (
// // //         <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50">
// // //           <motion.div 
// // //             initial={{ opacity: 0, scale: 0.9 }}
// // //             animate={{ opacity: 1, scale: 1 }}
// // //             className="w-full max-w-md rounded-3xl bg-blue-900/40 backdrop-blur-xl p-6 shadow-2xl border border-blue-400/20"
// // //           >
// // //             <h2 className="text-2xl font-bold text-green-300 mb-4 drop-shadow-lg">
// // //               Add New Meter
// // //             </h2>
// // //             <div className="space-y-4">
// // //               <label className="block text-white font-semibold">Meter Number *</label>
// // //               <input
// // //                 type="text"
// // //                 placeholder="Enter meter number"
// // //                 value={newMeter.meterNumber}
// // //                 onChange={(e) => setNewMeter({ ...newMeter, meterNumber: e.target.value })}
// // //                 className="w-full px-4 py-2 rounded bg-gray-800 text-white"
// // //                 required
// // //               />

// // //               <label className="block text-white font-semibold">Installation Date *</label>
// // //               <input
// // //                 type="date"
// // //                 value={newMeter.installationDate}
// // //                 onChange={(e) => setNewMeter({ 
// // //                   ...newMeter, 
// // //                   installationDate: e.target.value, 
// // //                   lastReadingDate: e.target.value
// // //                 })}
// // //                 className="w-full px-4 py-2 rounded bg-gray-800 text-white"
// // //                 required
// // //               />

// // //               <label className="block text-white font-semibold">Last Reading Date</label>
// // //               <input
// // //                 type="date"
// // //                 value={newMeter.lastReadingDate}
// // //                 onChange={(e) => setNewMeter({ ...newMeter, lastReadingDate: e.target.value })}
// // //                 className="w-full px-4 py-2 rounded bg-gray-800 text-white"
// // //               />

// // //               {/* Non-editable user information */}
// // //               {[
// // //                 { label: "Name", value: newMeter.user.name },
// // //                 { label: "Email", value: newMeter.user.email },
// // //                 { label: "Government ID", value: newMeter.user.governmentId }
// // //               ].map((field) => (
// // //                 <div key={field.label}>
// // //                   <label className="block text-white font-semibold">{field.label}</label>
// // //                   <input
// // //                     type="text"
// // //                     className="w-full px-4 py-2 rounded bg-gray-700 text-white"
// // //                     value={field.value}
// // //                     disabled
// // //                   />
// // //                 </div>
// // //               ))}

// // //               <label className="block text-white font-semibold">Meter Status</label>
// // //               <select
// // //                 value={newMeter.status}
// // //                 onChange={(e) => setNewMeter({ ...newMeter, status: e.target.value })}
// // //                 className="w-full px-4 py-2 rounded bg-gray-800 text-white"
// // //               >
// // //                 <option value="ACTIVE">ACTIVE</option>
// // //                 <option value="INACTIVE">INACTIVE</option>
// // //                 <option value="MAINTENANCE">MAINTENANCE</option>
// // //               </select>
// // //             </div>

// // //             <div className="mt-6 flex justify-end space-x-4">
// // //               <motion.button 
// // //                 whileHover={{ scale: 1.05 }}
// // //                 whileTap={{ scale: 0.95 }}
// // //                 onClick={() => setShowAddMeterModal(false)} 
// // //                 className="bg-gray-300 px-4 py-2 rounded"
// // //               >
// // //                 Cancel
// // //               </motion.button>
// // //               <motion.button 
// // //                 whileHover={{ scale: 1.05 }}
// // //                 whileTap={{ scale: 0.95 }}
// // //                 onClick={handleAddMeter} 
// // //                 className="bg-green-600 px-4 py-2 text-white rounded"
// // //               >
// // //                 Add Meter
// // //               </motion.button>
// // //             </div>
// // //           </motion.div>
// // //         </div>
// // //       )}

// // //       {/* Add Usage Modal */}
// // //       {showUsageModal && (
// // //         <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50">
// // //           <motion.div
// // //             initial={{ opacity: 0, scale: 0.9 }}
// // //             animate={{ opacity: 1, scale: 1 }}
// // //             className="w-full max-w-md rounded-3xl bg-blue-900/40 backdrop-blur-xl p-6 shadow-2xl border border-blue-400/20"
// // //           >
// // //             <h2 className="text-2xl font-bold text-green-300 mb-4 drop-shadow-lg">
// // //               Add Water Usage for Meter: {selectedMeter}
// // //             </h2>
// // //             <div className="space-y-4">
// // //               <label className="block text-white font-semibold">Reading Value (cubic meters) *</label>
// // //               <input
// // //                 type="number"
// // //                 placeholder="Enter reading value"
// // //                 value={newUsage.readingValue}
// // //                 onChange={(e) => setNewUsage({ ...newUsage, readingValue: e.target.value })}
// // //                 className="w-full px-4 py-2 rounded bg-gray-800 text-white"
// // //                 required
// // //               />

// // //               <label className="block text-white font-semibold">Reading Date *</label>
// // //               <input
// // //                 type="date"
// // //                 value={newUsage.readingDate}
// // //                 onChange={(e) => setNewUsage({ ...newUsage, readingDate: e.target.value })}
// // //                 className="w-full px-4 py-2 rounded bg-gray-800 text-white"
// // //                 required
// // //               />
// // //             </div>

// // //             <div className="mt-6 flex justify-end space-x-4">
// // //               <motion.button
// // //                 whileHover={{ scale: 1.05 }}
// // //                 whileTap={{ scale: 0.95 }}
// // //                 onClick={() => setShowUsageModal(false)}
// // //                 className="bg-gray-300 px-4 py-2 rounded"
// // //               >
// // //                 Cancel
// // //               </motion.button>
// // //               <motion.button
// // //                 whileHover={{ scale: 1.05 }}
// // //                 whileTap={{ scale: 0.95 }}
// // //                 onClick={handleAddUsage}
// // //                 className="bg-green-600 px-4 py-2 text-white rounded"
// // //               >
// // //                 Submit Usage
// // //               </motion.button>
// // //             </div>
// // //           </motion.div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }
// // // "use client";
// // // import { useState, useEffect } from "react";
// // // import { fetchMeters, addWaterMeter, addWaterUsage } from "@/lib/api";
// // // import { useUser } from "@/Context/UserContext"; 
// // // import { motion } from "framer-motion";

// // // interface Meter {
// // //   id: number; 
// // //   meterNumber: string;
// // //   installationDate: string;
// // //   lastReadingDate: string;
// // //   status: string;
// // //   user: {
// // //     name: string;
// // //     email: string;
// // //     governmentId: string;
// // //   };
// // // }

// // // interface WaterUsage {
// // //   meterId: number;  // Changed from meterNumber to meterId
  
// // //   // meterNumber: string;
// // //   readingValue: string;
// // //   readingDate: string;
// // // }

// // // export default function MetersPage() {
// // //   const { user } = useUser();
// // //   const [meters, setMeters] = useState<Meter[]>([]);
// // //   const [showAddMeterModal, setShowAddMeterModal] = useState(false);
// // //   const [showUsageModal, setShowUsageModal] = useState(false);
// // //   const [selectedMeter, setSelectedMeter] = useState<Meter | null>(null);
// // //   const [newUsage, setNewUsage] = useState<WaterUsage>({
// // //     meterId: 0,
// // //     meterNumber: "",
// // //     readingValue: "",
// // //     readingDate: new Date().toISOString().split("T")[0],
// // //   });
// // //   const [newMeter, setNewMeter] = useState<Omit<Meter, "id"> & { id?: number }>({
// // //     meterNumber: "",
// // //     installationDate: "",
// // //     lastReadingDate: "",
// // //     status: "ACTIVE",
// // //     user: {
// // //       name: user?.name || "",
// // //       email: user?.email || "",
// // //       governmentId: user?.governmentId || "",
// // //     },
// // //   });
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState<string | null>(null);

// // //   // Update newMeter when user context changes
// // //   useEffect(() => {
// // //     if (user) {
// // //       setNewMeter(prev => ({
// // //         ...prev,
// // //         user: {
// // //           name: user.name,
// // //           email: user.email,
// // //           governmentId: user.governmentId,
// // //         }
// // //       }));
// // //     }
// // //   }, [user]);

// // //   // Fetch meters on load
// // //   useEffect(() => {
// // //     const loadMeters = async () => {
// // //       try {
// // //         setLoading(true);
// // //         const data = await fetchMeters();
// // //         setMeters(data);
// // //         setError(null);
// // //       } catch (err) {
// // //         console.error("Error fetching meters:", err);
// // //         setError("Failed to fetch meters. Please try again.");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };
// // //     loadMeters();
// // //   }, []);

// // //   // Handle adding a new meter
// // //   const handleAddMeter = async () => {
// // //     if (!newMeter.meterNumber || !newMeter.installationDate) {
// // //       alert("Please fill out all required fields.");
// // //       return;
// // //     }

// // //     const meterData = {
// // //       ...newMeter,
// // //       lastReadingDate: newMeter.installationDate,
// // //     };

// // //     try {
// // //       const addedMeter = await addWaterMeter(meterData);
// // //       setMeters([...meters, addedMeter]);
// // //       setShowAddMeterModal(false);
// // //       setNewMeter({
// // //         meterNumber: "",
// // //         installationDate: "",
// // //         lastReadingDate: "",
// // //         status: "ACTIVE",
// // //         user: {
// // //           name: user?.name || "",
// // //           email: user?.email || "",
// // //           governmentId: user?.governmentId || "",
// // //         },
// // //       });
// // //     } catch (error) {
// // //       console.error("Error adding meter:", error);
// // //       alert(error instanceof Error ? error.message : "Failed to add meter");
// // //     }
// // //   };

// // //   // Handle adding water usage
// // //   const handleAddUsage = async () => {
// // //     try {
// // //       if (!selectedMeter || !newUsage.readingValue) {
// // //         alert("Please select a meter and enter a reading value");
// // //         return;
// // //       }

// // //       await addWaterUsage(selectedMeter.id, {
// // //         readingValue: newUsage.readingValue,
// // //         readingDate: newUsage.readingDate || new Date().toISOString().split('T')[0]
// // //       });
      
// // //       alert("Usage added successfully!");
// // //       setShowUsageModal(false);
      
// // //       // Refresh meter data
// // //       // const updatedMeters = await fetchMeters();
// // //       // setMeters(updatedMeters);
// // //     } catch (error) {
// // //       console.error("Error adding usage:", error);
// // //       alert(`Error: ${error instanceof Error ? error.message : "Failed to add usage"}`);
// // //     }
// // //   };

// // //   if (!user) {
// // //     return (
// // //       <div className="flex items-center justify-center min-h-screen">
// // //         <p className="text-center text-red-500 font-bold">
// // //           Error: User not logged in. Please log in to manage water meters.
// // //         </p>
// // //       </div>
// // //     );
// // //   }

// // //   if (loading) {
// // //     return (
// // //       <div className="flex items-center justify-center min-h-screen">
// // //         <p className="text-center text-white">Loading meters...</p>
// // //       </div>
// // //     );
// // //   }

// // //   if (error) {
// // //     return (
// // //       <div className="flex items-center justify-center min-h-screen">
// // //         <p className="text-center text-red-500">{error}</p>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-900 via-blue-800 to-blue-600 p-10 relative overflow-hidden">
// // //       <div className="w-full max-w-4xl rounded-3xl bg-blue-900/40 backdrop-blur-xl p-10 shadow-2xl border border-blue-400/20 relative z-10">
// // //         {/* Explanatory Header */}
// // //         <div className="mb-8 text-center">
// // //           <h1 className="text-4xl font-extrabold text-green-300 drop-shadow-lg tracking-wide">
// // //             Manage Your Water Meters
// // //           </h1>
// // //           <p className="mt-4 text-lg text-white">
// // //             This page allows you to view and manage all your water meters. Each meter card displays its number, installation date, last reading date, and current status.
// // //           </p>
// // //         </div>

// // //         {/* Meter Cards */}
// // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //           {meters.length > 0 ? (
// // //             meters.map((meter) => (
// // //               <motion.div 
// // //                 key={meter.id} 
// // //                 whileHover={{ y: -5 }}
// // //                 className="rounded-2xl bg-blue-900/40 backdrop-blur-xl p-6 shadow-lg border border-blue-400/20 text-white"
// // //               >
// // //                 <h2 className="text-xl font-bold text-green-300 drop-shadow-lg">{meter.meterNumber}</h2>
// // //                 <p>Installation Date: {meter.installationDate}</p>
// // //                 <p>Last Reading Date: {meter.lastReadingDate}</p>
// // //                 <p>Status: {meter.status}</p>
// // //                 <div className="mt-4 flex space-x-3">
// // //                   <motion.button
// // //                     whileHover={{ scale: 1.05 }}
// // //                     whileTap={{ scale: 0.95 }}
// // //                     onClick={() => {
// // //                       setSelectedMeter(meter);
// // //                       setNewUsage({
// // //                         meterNumber: meter.meterNumber,
// // //                         readingValue: "",
// // //                         readingDate: new Date().toISOString().split("T")[0]
// // //                       });
// // //                       setShowUsageModal(true);
// // //                     }}
// // //                     className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 shadow"
// // //                   >
// // //                     Add Usage
// // //                   </motion.button>
// // //                 </div>
// // //               </motion.div>
// // //             ))
// // //           ) : (
// // //             <div className="col-span-2 text-center text-white">
// // //               No water meters found. Add your first meter to get started.
// // //             </div>
// // //           )}
// // //         </div>

// // //         {/* Add New Meter Button */}
// // //         <div className="mt-8 flex justify-center">
// // //           <motion.button 
// // //             whileHover={{ scale: 1.05 }}
// // //             whileTap={{ scale: 0.95 }}
// // //             onClick={() => setShowAddMeterModal(true)} 
// // //             className="rounded-full bg-green-600 px-6 py-3 text-white shadow-lg hover:bg-green-700"
// // //           >
// // //             Add New Meter
// // //           </motion.button>
// // //         </div>
// // //       </div>

// // //       {/* Add New Meter Modal */}
// // //       {showAddMeterModal && (
// // //         <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50">
// // //           <motion.div 
// // //             initial={{ opacity: 0, scale: 0.9 }}
// // //             animate={{ opacity: 1, scale: 1 }}
// // //             className="w-full max-w-md rounded-3xl bg-blue-900/40 backdrop-blur-xl p-6 shadow-2xl border border-blue-400/20"
// // //           >
// // //             <h2 className="text-2xl font-bold text-green-300 mb-4 drop-shadow-lg">
// // //               Add New Meter
// // //             </h2>
// // //             <div className="space-y-4">
// // //               <label className="block text-white font-semibold">Meter Number *</label>
// // //               <input
// // //                 type="text"
// // //                 placeholder="Enter meter number"
// // //                 value={newMeter.meterNumber}
// // //                 onChange={(e) => setNewMeter({ ...newMeter, meterNumber: e.target.value })}
// // //                 className="w-full px-4 py-2 rounded bg-gray-800 text-white"
// // //                 required
// // //               />

// // //               <label className="block text-white font-semibold">Installation Date *</label>
// // //               <input
// // //                 type="date"
// // //                 value={newMeter.installationDate}
// // //                 onChange={(e) => setNewMeter({ 
// // //                   ...newMeter, 
// // //                   installationDate: e.target.value, 
// // //                   lastReadingDate: e.target.value
// // //                 })}
// // //                 className="w-full px-4 py-2 rounded bg-gray-800 text-white"
// // //                 required
// // //               />

// // //               <label className="block text-white font-semibold">Last Reading Date</label>
// // //               <input
// // //                 type="date"
// // //                 value={newMeter.lastReadingDate}
// // //                 onChange={(e) => setNewMeter({ ...newMeter, lastReadingDate: e.target.value })}
// // //                 className="w-full px-4 py-2 rounded bg-gray-800 text-white"
// // //               />

// // //               {/* Non-editable user information */}
// // //               {[
// // //                 { label: "Name", value: newMeter.user.name },
// // //                 { label: "Email", value: newMeter.user.email },
// // //                 { label: "Government ID", value: newMeter.user.governmentId }
// // //               ].map((field) => (
// // //                 <div key={field.label}>
// // //                   <label className="block text-white font-semibold">{field.label}</label>
// // //                   <input
// // //                     type="text"
// // //                     className="w-full px-4 py-2 rounded bg-gray-700 text-white"
// // //                     value={field.value}
// // //                     disabled
// // //                   />
// // //                 </div>
// // //               ))}

// // //               <label className="block text-white font-semibold">Meter Status</label>
// // //               <select
// // //                 value={newMeter.status}
// // //                 onChange={(e) => setNewMeter({ ...newMeter, status: e.target.value })}
// // //                 className="w-full px-4 py-2 rounded bg-gray-800 text-white"
// // //               >
// // //                 <option value="ACTIVE">ACTIVE</option>
// // //                 <option value="INACTIVE">INACTIVE</option>
// // //                 <option value="MAINTENANCE">MAINTENANCE</option>
// // //               </select>
// // //             </div>

// // //             <div className="mt-6 flex justify-end space-x-4">
// // //               <motion.button 
// // //                 whileHover={{ scale: 1.05 }}
// // //                 whileTap={{ scale: 0.95 }}
// // //                 onClick={() => setShowAddMeterModal(false)} 
// // //                 className="bg-gray-300 px-4 py-2 rounded"
// // //               >
// // //                 Cancel
// // //               </motion.button>
// // //               <motion.button 
// // //                 whileHover={{ scale: 1.05 }}
// // //                 whileTap={{ scale: 0.95 }}
// // //                 onClick={handleAddMeter} 
// // //                 className="bg-green-600 px-4 py-2 text-white rounded"
// // //               >
// // //                 Add Meter
// // //               </motion.button>
// // //             </div>
// // //           </motion.div>
// // //         </div>
// // //       )}

// // //       {/* Add Usage Modal */}
// // //       {showUsageModal && selectedMeter && (
// // //         <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50">
// // //           <motion.div
// // //             initial={{ opacity: 0, scale: 0.9 }}
// // //             animate={{ opacity: 1, scale: 1 }}
// // //             className="w-full max-w-md rounded-3xl bg-blue-900/40 backdrop-blur-xl p-6 shadow-2xl border border-blue-400/20"
// // //           >
// // //             <h2 className="text-2xl font-bold text-green-300 mb-4 drop-shadow-lg">
// // //               Add Water Usage for Meter: {selectedMeter.meterNumber}
// // //             </h2>
// // //             <div className="space-y-4">
// // //               <label className="block text-white font-semibold">Reading Value (cubic meters) *</label>
// // //               <input
// // //                 type="number"
// // //                 placeholder="Enter reading value"
// // //                 value={newUsage.readingValue}
// // //                 onChange={(e) => setNewUsage({ ...newUsage, readingValue: e.target.value })}
// // //                 className="w-full px-4 py-2 rounded bg-gray-800 text-white"
// // //                 required
// // //               />

// // //               <label className="block text-white font-semibold">Reading Date *</label>
// // //               <input
// // //                 type="date"
// // //                 value={newUsage.readingDate}
// // //                 onChange={(e) => setNewUsage({ ...newUsage, readingDate: e.target.value })}
// // //                 className="w-full px-4 py-2 rounded bg-gray-800 text-white"
// // //                 required
// // //               />
// // //             </div>

// // //             <div className="mt-6 flex justify-end space-x-4">
// // //               <motion.button
// // //                 whileHover={{ scale: 1.05 }}
// // //                 whileTap={{ scale: 0.95 }}
// // //                 onClick={() => setShowUsageModal(false)}
// // //                 className="bg-gray-300 px-4 py-2 rounded"
// // //               >
// // //                 Cancel
// // //               </motion.button>
// // //               <motion.button
// // //                 whileHover={{ scale: 1.05 }}
// // //                 whileTap={{ scale: 0.95 }}
// // //                 onClick={handleAddUsage}
// // //                 className="bg-green-600 px-4 py-2 text-white rounded"
// // //               >
// // //                 Submit Usage
// // //               </motion.button>
// // //             </div>
// // //           </motion.div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }
// // "use client";
// // import { useState, useEffect } from "react";
// // import { fetchMeters, addWaterMeter, addWaterUsage } from "@/lib/api";
// // import { useUser } from "@/Context/UserContext"; 
// // import { motion } from "framer-motion";

// // interface Meter {
// //   id: number; 
// //   meterNumber: string;
// //   installationDate: string;
// //   lastReadingDate: string;
// //   status: string;
// //   user: {
// //     name: string;
// //     email: string;
// //     governmentId: string;
// //   };
// // }

// // // interface WaterUsage {
// // //   // meterId: number;
// // //   meterNumber: string;
// // //   readingValue: string;
// // //   readingDate: string;
// // // }
// // interface WaterUsage {
// //   readingValue: string;
// //   readingDate: string;
// // }
// // export default function MetersPage() {
// //   const { user } = useUser();
// //   const [meters, setMeters] = useState<Meter[]>([]);
// //   const [showAddMeterModal, setShowAddMeterModal] = useState(false);
// //   const [showUsageModal, setShowUsageModal] = useState(false);
// //   const [selectedMeter, setSelectedMeter] = useState<Meter | null>(null);
// //   const [newUsage, setNewUsage] = useState<WaterUsage>({
// //     readingValue: "",
// //     readingDate: new Date().toISOString().split("T")[0],
// //   });
// //   const [newMeter, setNewMeter] = useState<Omit<Meter, "id"> & { id?: number }>({
// //     meterNumber: "",
// //     installationDate: "",
// //     lastReadingDate: "",
// //     status: "ACTIVE",
// //     user: {
// //       name: user?.name || "",
// //       email: user?.email || "",
// //       governmentId: user?.governmentId || "",
// //     },
// //   });
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);

// //   useEffect(() => {
// //     if (user) {
// //       setNewMeter(prev => ({
// //         ...prev,
// //         user: {
// //           name: user.name,
// //           email: user.email,
// //           governmentId: user.governmentId,
// //         }
// //       }));
// //     }
// //   }, [user]);

// //   useEffect(() => {
// //     const loadMeters = async () => {
// //       try {
// //         setLoading(true);
// //         const data = await fetchMeters();
// //         setMeters(data);
// //         setError(null);
// //       } catch (err) {
// //         console.error("Error fetching meters:", err);
// //         setError("Failed to fetch meters. Please try again.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     loadMeters();
// //   }, []);

// //   const handleAddMeter = async () => {
// //     if (!newMeter.meterNumber || !newMeter.installationDate) {
// //       alert("Please fill out all required fields.");
// //       return;
// //     }

// //     const meterData = {
// //       ...newMeter,
// //       lastReadingDate: newMeter.installationDate,
// //     };

// //     try {
// //       const addedMeter = await addWaterMeter(meterData);
// //       setMeters([...meters, addedMeter]);
// //       setShowAddMeterModal(false);
// //       setNewMeter({
// //         meterNumber: "",
// //         installationDate: "",
// //         lastReadingDate: "",
// //         status: "ACTIVE",
// //         user: {
// //           name: user?.name || "",
// //           email: user?.email || "",
// //           governmentId: user?.governmentId || "",
// //         },
// //       });
// //     } catch (error) {
// //       console.error("Error adding meter:", error);
// //       alert(error instanceof Error ? error.message : "Failed to add meter");
// //     }
// //   };
// //   const handleAddUsage = async () => {
// //     try {
// //       if (!selectedMeter || !newUsage.readingValue) {
// //         alert("Please select a meter and enter a reading value");
// //         return;
// //       }
  
// //       await addWaterUsage(selectedMeter.id, {
// //         readingValue: newUsage.readingValue,
// //         readingDate: newUsage.readingDate
// //       });
      
// //       alert("Usage added successfully!");
// //       setShowUsageModal(false);
// //       const updatedMeters = await fetchMeters();
// //       setMeters(updatedMeters);
// //     } catch (error) {
// //       console.error("Error adding usage:", error);
// //       alert(`Error: ${error instanceof Error ? error.message : "Failed to add usage"}`);
// //     }
// //   };
// //   // const handleAddUsage = async () => {
// //   //   try {
// //   //     if (!selectedMeter || !newUsage.readingValue) {
// //   //       alert("Please select a meter and enter a reading value");
// //   //       return;
// //   //     }
  
// //   //     await addWaterUsage({
// //   //       meterId: selectedMeter.id, // Make sure this is the correct property
// //   //       readingValue: newUsage.readingValue,
// //   //       readingDate: newUsage.readingDate || new Date().toISOString().split('T')[0]
// //   //     });
      
// //   //     alert("Usage added successfully!");
// //   //     setShowUsageModal(false);
// //   //     const updatedMeters = await fetchMeters();
// //   //     setMeters(updatedMeters);
// //   //   } catch (error) {
// //   //     console.error("Error adding usage:", error);
// //   //     alert(`Error: ${error instanceof Error ? error.message : "Failed to add usage"}`);
// //   //   }
// //   // };
// //   // const handleAddUsage = async () => {
// //   //   try {
// //   //     if (!selectedMeter || !newUsage.readingValue) {
// //   //       alert("Please select a meter and enter a reading value");
// //   //       return;
// //   //     }

// //   //     await addWaterUsage({
// //   //       // meterId: selectedMeter.id,
// //   //       meterNumber: selectedMeter.meterNumber,
// //   //       readingValue: newUsage.readingValue,
// //   //       readingDate: newUsage.readingDate || new Date().toISOString().split('T')[0]
// //   //     });
      
// //   //     alert("Usage added successfully!");
    
// //   //     setShowUsageModal(false);
// //   //       // Refresh meters data
// //   //     const updatedMeters = await fetchMeters();
// //   //     setMeters(updatedMeters);
// //   //   } catch (error) {
// //   //     console.error("Error adding usage:", error);
// //   //     alert(`Error: ${error instanceof Error ? error.message : "Failed to add usage"}`);
// //   //   }
// //   // };

// //   if (!user) {
// //     return (
// //       <div className="flex items-center justify-center min-h-screen">
// //         <p className="text-center text-red-500 font-bold">
// //           Error: User not logged in. Please log in to manage water meters.
// //         </p>
// //       </div>
// //     );
// //   }

// //   if (loading) {
// //     return (
// //       <div className="flex items-center justify-center min-h-screen">
// //         <p className="text-center text-white">Loading meters...</p>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="flex items-center justify-center min-h-screen">
// //         <p className="text-center text-red-500">{error}</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-900 via-blue-800 to-blue-600 p-10 relative overflow-hidden">
// //       <div className="w-full max-w-4xl rounded-3xl bg-blue-900/40 backdrop-blur-xl p-10 shadow-2xl border border-blue-400/20 relative z-10">
// //         <div className="mb-8 text-center">
// //           <h1 className="text-4xl font-extrabold text-green-300 drop-shadow-lg tracking-wide">
// //             Manage Your Water Meters
// //           </h1>
// //           <p className="mt-4 text-lg text-white">
// //             This page allows you to view and manage all your water meters. Each meter card displays its number, installation date, last reading date, and current status.
// //           </p>
// //         </div>

// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //           {meters.length > 0 ? (
// //             meters.map((meter) => (
// //               <motion.div 
// //                 key={meter.id} 
// //                 whileHover={{ y: -5 }}
// //                 className="rounded-2xl bg-blue-900/40 backdrop-blur-xl p-6 shadow-lg border border-blue-400/20 text-white"
// //               >
// //                 <h2 className="text-xl font-bold text-green-300 drop-shadow-lg">{meter.meterNumber}</h2>
// //                 <p>Installation Date: {meter.installationDate}</p>
// //                 <p>Last Reading Date: {meter.lastReadingDate}</p>
// //                 <p>Status: {meter.status}</p>
// //                 <div className="mt-4 flex space-x-3">
// //                   <motion.button
// //                     whileHover={{ scale: 1.05 }}
// //                     whileTap={{ scale: 0.95 }}
// //                     // onClick={() => {
// //                     //   setSelectedMeter(meter);
// //                     //   setNewUsage({
// //                     //     meterId: meter.id,
// //                     //     readingValue: "",
// //                     //     readingDate: new Date().toISOString().split("T")[0]
// //                     //   });
// //                     //   setShowUsageModal(true);
// //                     // }}
// //                     onClick={() => {
// //                       setSelectedMeter(meter); // This sets the complete meter object
// //                       setNewUsage({
// //                         readingValue: "",
// //                         readingDate: new Date().toISOString().split("T")[0]
// //                       });
// //                       setShowUsageModal(true);
// //                     }}
// //                     className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 shadow"
// //                   >
// //                     Add Usage
// //                   </motion.button>
// //                 </div>
// //               </motion.div>
// //             ))
// //           ) : (
// //             <div className="col-span-2 text-center text-white">
// //               No water meters found. Add your first meter to get started.
// //             </div>
// //           )}
// //         </div>

// //         <div className="mt-8 flex justify-center">
// //           <motion.button 
// //             whileHover={{ scale: 1.05 }}
// //             whileTap={{ scale: 0.95 }}
// //             onClick={() => setShowAddMeterModal(true)} 
// //             className="rounded-full bg-green-600 px-6 py-3 text-white shadow-lg hover:bg-green-700"
// //           >
// //             Add New Meter
// //           </motion.button>
// //         </div>
// //       </div>

// //       {showAddMeterModal && (
// //         <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50">
// //           <motion.div 
// //             initial={{ opacity: 0, scale: 0.9 }}
// //             animate={{ opacity: 1, scale: 1 }}
// //             className="w-full max-w-md rounded-3xl bg-blue-900/40 backdrop-blur-xl p-6 shadow-2xl border border-blue-400/20"
// //           >
// //             <h2 className="text-2xl font-bold text-green-300 mb-4 drop-shadow-lg">
// //               Add New Meter
// //             </h2>
// //             <div className="space-y-4">
// //               <label className="block text-white font-semibold">Meter Number *</label>
// //               <input
// //                 type="text"
// //                 placeholder="Enter meter number"
// //                 value={newMeter.meterNumber}
// //                 onChange={(e) => setNewMeter({ ...newMeter, meterNumber: e.target.value })}
// //                 className="w-full px-4 py-2 rounded bg-gray-800 text-white"
// //                 required
// //               />

// //               <label className="block text-white font-semibold">Installation Date *</label>
// //               <input
// //                 type="date"
// //                 value={newMeter.installationDate}
// //                 onChange={(e) => setNewMeter({ 
// //                   ...newMeter, 
// //                   installationDate: e.target.value, 
// //                   lastReadingDate: e.target.value
// //                 })}
// //                 className="w-full px-4 py-2 rounded bg-gray-800 text-white"
// //                 required
// //               />

// //               <label className="block text-white font-semibold">Last Reading Date</label>
// //               <input
// //                 type="date"
// //                 value={newMeter.lastReadingDate}
// //                 onChange={(e) => setNewMeter({ ...newMeter, lastReadingDate: e.target.value })}
// //                 className="w-full px-4 py-2 rounded bg-gray-800 text-white"
// //               />

// //               {[
// //                 { label: "Name", value: newMeter.user.name },
// //                 { label: "Email", value: newMeter.user.email },
// //                 { label: "Government ID", value: newMeter.user.governmentId }
// //               ].map((field) => (
// //                 <div key={field.label}>
// //                   <label className="block text-white font-semibold">{field.label}</label>
// //                   <input
// //                     type="text"
// //                     className="w-full px-4 py-2 rounded bg-gray-700 text-white"
// //                     value={field.value}
// //                     disabled
// //                   />
// //                 </div>
// //               ))}

// //               <label className="block text-white font-semibold">Meter Status</label>
// //               <select
// //                 value={newMeter.status}
// //                 onChange={(e) => setNewMeter({ ...newMeter, status: e.target.value })}
// //                 className="w-full px-4 py-2 rounded bg-gray-800 text-white"
// //               >
// //                 <option value="ACTIVE">ACTIVE</option>
// //                 <option value="INACTIVE">INACTIVE</option>
// //                 <option value="MAINTENANCE">MAINTENANCE</option>
// //               </select>
// //             </div>

// //             <div className="mt-6 flex justify-end space-x-4">
// //               <motion.button 
// //                 whileHover={{ scale: 1.05 }}
// //                 whileTap={{ scale: 0.95 }}
// //                 onClick={() => setShowAddMeterModal(false)} 
// //                 className="bg-gray-300 px-4 py-2 rounded"
// //               >
// //                 Cancel
// //               </motion.button>
// //               <motion.button 
// //                 whileHover={{ scale: 1.05 }}
// //                 whileTap={{ scale: 0.95 }}
// //                 onClick={handleAddMeter} 
// //                 className="bg-green-600 px-4 py-2 text-white rounded"
// //               >
// //                 Add Meter
// //               </motion.button>
// //             </div>
// //           </motion.div>
// //         </div>
// //       )}

// //       {showUsageModal && selectedMeter && (
// //         <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50">
// //           <motion.div
// //             initial={{ opacity: 0, scale: 0.9 }}
// //             animate={{ opacity: 1, scale: 1 }}
// //             className="w-full max-w-md rounded-3xl bg-blue-900/40 backdrop-blur-xl p-6 shadow-2xl border border-blue-400/20"
// //           >
// //             <h2 className="text-2xl font-bold text-green-300 mb-4 drop-shadow-lg">
// //               Add Water Usage for Meter: {selectedMeter.meterNumber}
// //             </h2>
// //             <div className="space-y-4">
// //               <label className="block text-white font-semibold">Reading Value (cubic meters) *</label>
// //               <input
// //                 type="number"
// //                 placeholder="Enter reading value"
// //                 value={newUsage.readingValue}
// //                 onChange={(e) => setNewUsage({ ...newUsage, readingValue: e.target.value })}
// //                 className="w-full px-4 py-2 rounded bg-gray-800 text-white"
// //                 required
// //               />

// //               <label className="block text-white font-semibold">Reading Date *</label>
// //               <input
// //                 type="date"
// //                 value={newUsage.readingDate}
// //                 onChange={(e) => setNewUsage({ ...newUsage, readingDate: e.target.value })}
// //                 className="w-full px-4 py-2 rounded bg-gray-800 text-white"
// //                 required
// //               />
// //             </div>

// //             <div className="mt-6 flex justify-end space-x-4">
// //               <motion.button
// //                 whileHover={{ scale: 1.05 }}
// //                 whileTap={{ scale: 0.95 }}
// //                 onClick={() => setShowUsageModal(false)}
// //                 className="bg-gray-300 px-4 py-2 rounded"
// //               >
// //                 Cancel
// //               </motion.button>
// //               <motion.button
// //                 whileHover={{ scale: 1.05 }}
// //                 whileTap={{ scale: 0.95 }}
// //                 onClick={handleAddUsage}
// //                 className="bg-green-600 px-4 py-2 text-white rounded"
// //               >
// //                 Submit Usage
// //               </motion.button>
// //             </div>
// //           </motion.div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// "use client";
// import { useState, useEffect } from "react";
// import { useUser } from "@/Context/UserContext"; 
// import { motion } from "framer-motion";
// import { fetchMeters, addWaterMeter, addWaterUsage } from "@/lib/api";

// interface Meter {
//   id: number;
//   meterNumber: string;
//   installationDate: string;
//   lastReadingDate: string;
//   status: string;
//   user: {
//     name: string;
//     email: string;
//     governmentId: string;
//   };
// }

// interface WaterUsage {
//   readingValue: string;
//   readingDate: string;
// }

// export default function MetersPage() {
//   const { user } = useUser();
//   const [meters, setMeters] = useState<Meter[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Meter Form State
//   const [meterFormOpen, setMeterFormOpen] = useState(false);
//   const [usageFormOpen, setUsageFormOpen] = useState(false);
//   const [selectedMeter, setSelectedMeter] = useState<Meter | null>(null);
//   const [newMeter, setNewMeter] = useState<Omit<Meter, "id"> & { id?: number }>({
//     meterNumber: "",
//     installationDate: "",
//     lastReadingDate: "",
//     status: "ACTIVE",
//     user: {
//       name: user?.name || "",
//       email: user?.email || "",
//       governmentId: user?.governmentId || "",
//     },
//   });
//   const [newUsage, setNewUsage] = useState<WaterUsage>({
//     readingValue: "",
//     readingDate: new Date().toISOString().split("T")[0],
//   });

//   // Fetch meters from backend
//   useEffect(() => {
//     if (user) {
//       setNewMeter(prev => ({
//         ...prev,
//         user: {
//           name: user.name,
//           email: user.email,
//           governmentId: user.governmentId,
//         }
//       }));
//     }
//   }, [user]);

//   useEffect(() => {
//     const loadMeters = async () => {
//       try {
//         setLoading(true);
//         const data = await fetchMeters();
//         setMeters(data);
//         setError(null);
//       } catch (err) {
//         setError("Failed to fetch meters. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadMeters();
//   }, []);

//   const openMeterForm = () => {
//     setNewMeter({
//       meterNumber: "",
//       installationDate: "",
//       lastReadingDate: "",
//       status: "ACTIVE",
//       user: {
//         name: user?.name || "",
//         email: user?.email || "",
//         governmentId: user?.governmentId || "",
//       },
//     });
//     setMeterFormOpen(true);
//   };

//   const closeMeterForm = () => {
//     setMeterFormOpen(false);
//   };

//   const openUsageForm = (meter: Meter) => {
//     if (!user) {
//       alert("You must be logged in to add usage.");
//       return;
//     }
//     setSelectedMeter(meter);
//     setNewUsage({
//       readingValue: "",
//       readingDate: new Date().toISOString().split("T")[0],
//     });
//     setUsageFormOpen(true);
//   };

//   const closeUsageForm = () => {
//     setUsageFormOpen(false);
//     setSelectedMeter(null);
//   };

//   const submitMeterForm = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
    
//     if (!newMeter.meterNumber || !newMeter.installationDate) {
//       alert("Please fill out all required fields.");
//       return;
//     }

//     const meterData = {
//       ...newMeter,
//       lastReadingDate: newMeter.installationDate,
//     };

//     try {
//       const addedMeter = await addWaterMeter(meterData);
//       setMeters([...meters, addedMeter]);
//       closeMeterForm();
//     } catch (error) {
//       console.error("Error adding meter:", error);
//       alert(error instanceof Error ? error.message : "Failed to add meter");
//     }
//   };

//   const submitUsageForm = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
    
//     if (!selectedMeter || !newUsage.readingValue) {
//       alert("Please select a meter and enter a reading value");
//       return;
//     }

//     try {
//       await addWaterUsage(selectedMeter.id, {
//         readingValue: newUsage.readingValue,
//         readingDate: newUsage.readingDate
//       });
      
//       alert("Usage added successfully!");
//       closeUsageForm();
//       const updatedMeters = await fetchMeters();
//       setMeters(updatedMeters);
//     } catch (error) {
//       console.error("Error adding usage:", error);
//       alert(`Error: ${error instanceof Error ? error.message : "Failed to add usage"}`);
//     }
//   };

//   if (!user) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <p className="text-center text-red-500 font-bold">
//           Error: User not logged in. Please log in to manage water meters.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen p-10 bg-gradient-to-br from-green-900 via-blue-800 to-blue-600">
//       <motion.div 
//         initial={{ opacity: 0 }} 
//         animate={{ opacity: 1 }} 
//         className="max-w-7xl mx-auto"
//       >
//         <h1 className="text-4xl font-bold text-center text-green-300 mb-8">
//           Manage Your Water Meters
//         </h1>

//         {/* Meters List */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {loading ? (
//             <p className="text-white text-lg col-span-3 text-center">Loading meters...</p>
//           ) : error ? (
//             <p className="text-red-400 text-lg col-span-3 text-center">{error}</p>
//           ) : meters.length > 0 ? (
//             meters.map((meter) => (
//               <motion.div
//                 key={meter.id}
//                 whileHover={{ y: -5 }}
//                 className="p-6 bg-blue-900/40 rounded-2xl shadow-lg border border-blue-400/20 text-white"
//               >
//                 <h2 className="text-xl font-bold text-green-300">{meter.meterNumber}</h2>
//                 <p className="text-green-200">Installed: {meter.installationDate}</p>
//                 <p>Last Reading: {meter.lastReadingDate}</p>
//                 <p>Status: <span className="font-semibold">{meter.status}</span></p>
                
//                 <div className="mt-4 flex justify-between">
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => openUsageForm(meter)}
//                     className="rounded-xl px-4 py-2 text-white font-semibold shadow-md bg-green-600 hover:bg-green-700"
//                   >
//                     Add Usage
//                   </motion.button>
//                 </div>
//               </motion.div>
//             ))
//           ) : (
//             <div className="col-span-3 text-center text-white">
//               No water meters found. Add your first meter to get started.
//             </div>
//           )}
//         </div>

//         <div className="mt-8 flex justify-center">
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={openMeterForm}
//             className="rounded-full bg-green-600 px-6 py-3 text-white shadow-lg hover:bg-green-700"
//           >
//             Add New Meter
//           </motion.button>
//         </div>
//       </motion.div>

//       {/* Meter Form Modal */}
//       {meterFormOpen && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-20 backdrop-blur-sm">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="w-full max-w-md rounded-3xl bg-blue-900/40 backdrop-blur-xl p-8 shadow-2xl border border-blue-400/20 relative z-30"
//           >
//             <h2 className="text-2xl font-bold text-green-300 mb-6">Add New Water Meter</h2>
            
//             <form onSubmit={submitMeterForm} className="space-y-4">
//               <div>
//                 <label className="block mb-2 text-green-200 font-semibold">Meter Number</label>
//                 <input
//                   type="text"
//                   value={newMeter.meterNumber}
//                   onChange={(e) => setNewMeter({ ...newMeter, meterNumber: e.target.value })}
//                   required
//                   className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
//                 />
//               </div>
              
//               <div>
//                 <label className="block mb-2 text-green-200 font-semibold">Installation Date</label>
//                 <input
//                   type="date"
//                   value={newMeter.installationDate}
//                   onChange={(e) => setNewMeter({ 
//                     ...newMeter, 
//                     installationDate: e.target.value,
//                     lastReadingDate: e.target.value
//                   })}
//                   required
//                   className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
//                 />
//               </div>

//               <div>
//                 <label className="block mb-2 text-green-200 font-semibold">Status</label>
//                 <select
//                   value={newMeter.status}
//                   onChange={(e) => setNewMeter({ ...newMeter, status: e.target.value })}
//                   className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
//                 >
//                   <option value="ACTIVE">Active</option>
//                   <option value="INACTIVE">Inactive</option>
//                   <option value="MAINTENANCE">Maintenance</option>
//                 </select>
//               </div>

//               <div className="flex justify-end space-x-4 pt-4">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   type="button"
//                   onClick={closeMeterForm}
//                   className="px-6 py-2 rounded-xl text-white font-semibold shadow-md bg-red-600 hover:bg-red-700"
//                 >
//                   Cancel
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(144, 238, 144, 0.8)" }}
//                   whileTap={{ scale: 0.95 }}
//                   type="submit"
//                   className="px-6 py-2 rounded-xl text-white font-semibold shadow-md bg-green-600 hover:bg-green-700"
//                 >
//                   Add Meter
//                 </motion.button>
//               </div>
//             </form>
//           </motion.div>
//         </div>
//       )}

//       {/* Usage Form Modal */}
//       {usageFormOpen && selectedMeter && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-20 backdrop-blur-sm">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="w-full max-w-md rounded-3xl bg-blue-900/40 backdrop-blur-xl p-8 shadow-2xl border border-blue-400/20 relative z-30"
//           >
//             <h2 className="text-2xl font-bold text-green-300 mb-6">
//               Add Water Usage for Meter: {selectedMeter.meterNumber}
//             </h2>
            
//             <form onSubmit={submitUsageForm} className="space-y-4">
//               <div>
//                 <label className="block mb-2 text-green-200 font-semibold">Reading Value (cubic meters)</label>
//                 <input
//                   type="number"
//                   value={newUsage.readingValue}
//                   onChange={(e) => setNewUsage({ ...newUsage, readingValue: e.target.value })}
//                   required
//                   className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
//                 />
//               </div>
              
//               <div>
//                 <label className="block mb-2 text-green-200 font-semibold">Reading Date</label>
//                 <input
//                   type="date"
//                   value={newUsage.readingDate}
//                   onChange={(e) => setNewUsage({ ...newUsage, readingDate: e.target.value })}
//                   required
//                   className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
//                 />
//               </div>

//               <div className="flex justify-end space-x-4 pt-4">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   type="button"
//                   onClick={closeUsageForm}
//                   className="px-6 py-2 rounded-xl text-white font-semibold shadow-md bg-red-600 hover:bg-red-700"
//                 >
//                   Cancel
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(144, 238, 144, 0.8)" }}
//                   whileTap={{ scale: 0.95 }}
//                   type="submit"
//                   className="px-6 py-2 rounded-xl text-white font-semibold shadow-md bg-green-600 hover:bg-green-700"
//                 >
//                   Submit Usage
//                 </motion.button>
//               </div>
//             </form>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";
import { useState, useEffect } from "react";
import { fetchMeters, addWaterUsage } from "@/lib/api";
import { useUser } from "@/Context/UserContext"; 
import { motion } from "framer-motion";

interface Meter {
  meterId: number; // Meter ID
  installationDate: string;
  lastReadingDate: string;
  status: string;
  user: {
    name: string;
    email: string;
    governmentId: string;
  };
}

export default function MetersPage() {
  const { user } = useUser(); // Get user details from context
  const [meters, setMeters] = useState<Meter[]>([]);
  const [showUsageModal, setShowUsageModal] = useState(false);
  const [selectedMeter, setSelectedMeter] = useState<Meter | null>(null);
  const [readingValue, setReadingValue] = useState("");
  const [readingDate, setReadingDate] = useState(new Date().toISOString().split("T")[0]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch meters on load
  useEffect(() => {
    const loadMeters = async () => {
      try {
        setLoading(true);
        const data = await fetchMeters();
        setMeters(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching meters:", err);
        setError("Failed to fetch meters. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadMeters();
  }, []);

  const openUsageModal = (meter: Meter) => {
    if (!user) {
      alert("You must be logged in to add usage.");
      return;
    }
    setSelectedMeter(meter);
    setReadingValue("");
    setReadingDate(new Date().toISOString().split("T")[0]);
    setShowUsageModal(true);
  };

  const closeUsageModal = () => {
    setShowUsageModal(false);
    setSelectedMeter(null);
  };

  const submitUsageForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedMeter) return;

    // Construct the usage data object
    const usageData = {
      //meterId: selectedMeter.meterid, // Automatically pass meterId
      readingValue,
      readingDate,
      user: {
        id: user?.id, // Automatically pass user_id
      },
    };

    try {
      await addWaterUsage(selectedMeter.meterId, usageData);
      alert("Usage data submitted successfully!");
      closeUsageModal();
    } catch (error) {
      console.error("Error submitting usage data:", error);
      alert("Failed to submit usage data.");
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-center text-red-500 font-bold">
          Error: User not logged in. Please log in to manage water meters.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-center text-white">Loading meters...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-center text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-900 via-blue-800 to-blue-600 p-10 relative overflow-hidden">
      <div className="w-full max-w-4xl rounded-3xl bg-blue-900/40 backdrop-blur-xl p-10 shadow-2xl border border-blue-400/20 relative z-10">
        {/* Explanatory Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-green-300 drop-shadow-lg tracking-wide">
            Manage Your Water Meters
          </h1>
          <p className="mt-4 text-lg text-white">
            This page allows you to view and manage all your water meters. Each meter card displays its installation date, last reading date, and current status.
          </p>
        </div>

        {/* Meter Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {meters.length > 0 ? (
            meters.map((meter) => (
              <motion.div 
                key={meter.id} 
                whileHover={{ y: -5 }}
                className="rounded-2xl bg-blue-900/40 backdrop-blur-xl p-6 shadow-lg border border-blue-400/20 text-white"
              >
                <p>Installation Date: {meter.installationDate}</p>
                <p>Last Reading Date: {meter.lastReadingDate}</p>
                <p>Status: {meter.status}</p>
                <div className="mt-4 flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openUsageModal(meter)}
                    className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 shadow"
                  >
                    Add Usage
                  </motion.button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-2 text-center text-white">
              No water meters found. Add your first meter to get started.
            </div>
          )}
        </div>
      </div>

      {/* Add Usage Modal */}
      {showUsageModal && selectedMeter && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-3xl bg-blue-900/40 backdrop-blur-xl p-6 shadow-2xl border border-blue-400/20"
          >
            <h2 className="text-2xl font-bold text-green-300 mb-4 drop-shadow-lg">
              Add Water Usage
            </h2>
            <form onSubmit={submitUsageForm} className="space-y-4">
              <div>
                <label className="block text-white font-semibold">Reading Value (cubic meters) *</label>
                <input
                  type="number"
                  placeholder="Enter reading value"
                  value={readingValue}
                  onChange={(e) => setReadingValue(e.target.value)}
                  className="w-full px-4 py-2 rounded bg-gray-800 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-semibold">Reading Date *</label>
                <input
                  type="date"
                  value={readingDate}
                  onChange={(e) => setReadingDate(e.target.value)}
                  className="w-full px-4 py-2 rounded bg-gray-800 text-white"
                  required
                />
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={closeUsageModal}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="bg-green-600 px-4 py-2 text-white rounded"
                >
                  Submit Usage
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}