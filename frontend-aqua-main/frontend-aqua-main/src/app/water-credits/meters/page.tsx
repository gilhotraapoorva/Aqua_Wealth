
// "use client";
// import { useState, useEffect } from "react";
// import { fetchMeters, addWaterMeter, deleteWaterMeter } from "@/lib/api"; // Import API functions

// export default function MetersPage() {
//   const [meters, setMeters] = useState([]);
//   const [showAddMeterModal, setShowAddMeterModal] = useState(false);
//   const [newMeter, setNewMeter] = useState({
//     meterNumber: "",
//     installationDate: "",
//     lastReadingDate: "", // ✅ Last Reading Date is back!
//     status: "ACTIVE",
//     user: {
//       name: "",
//       email: "",
//       governmentId: "",
//     },
//   });

//   // Fetch meters on load
//   useEffect(() => {
//     const loadMeters = async () => {
//       try {
//         const data = await fetchMeters();
//         setMeters(data);
//       } catch (error) {
//         console.error("Error fetching meters:", error);
//       }
//     };
//     loadMeters();
//   }, []);

//   // Handle adding a new meter
//   const handleAddMeter = async () => {
//     if (!newMeter.meterNumber || !newMeter.installationDate || !newMeter.user.name || !newMeter.user.email || !newMeter.user.governmentId) {
//       alert("Please fill out all fields.");
//       return;
//     }

//     // ✅ Ensure lastReadingDate matches installationDate initially
//     const meterData = {
//       ...newMeter,
//       lastReadingDate: newMeter.installationDate,
//     };

//     try {
//       await addWaterMeter(meterData);
//       setMeters([...meters, meterData]); // Update UI
//       setShowAddMeterModal(false);
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-900 via-blue-800 to-blue-600 p-10 relative overflow-hidden">
//       <div className="w-full max-w-4xl rounded-3xl bg-blue-900/40 backdrop-blur-xl p-10 shadow-2xl border border-blue-400/20 relative z-10">
//         {/* Explanatory Header */}
//         <div className="mb-8 text-center">
//           <h1 className="text-4xl font-extrabold text-green-300 drop-shadow-lg tracking-wide">
//             Manage Your Water Meters
//           </h1>
//           <p className="mt-4 text-lg text-white">
//             This page allows you to view and manage all your water meters. Each meter card displays its number, installation date, last reading date, and current status.
//           </p>
//         </div>

//         {/* Meter Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {meters.map((meter) => (
//             <div key={meter.meterNumber} className="rounded-2xl bg-blue-900/40 backdrop-blur-xl p-6 shadow-lg border border-blue-400/20 text-white">
//               <h2 className="text-xl font-bold text-green-300 drop-shadow-lg">{meter.meterNumber}</h2>
//               <p>Installation Date: {meter.installationDate}</p>
//               <p>Last Reading Date: {meter.lastReadingDate}</p> {/* ✅ Last Reading Date displayed */}
//               <p>Status: {meter.status}</p>
//               <div className="mt-4 flex space-x-3">
//                 <button
//                   onClick={() => deleteWaterMeter(meter.meterNumber)}
//                   className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 shadow"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Add New Meter Button */}
//         <div className="mt-8 flex justify-center">
//           <button onClick={() => setShowAddMeterModal(true)} className="rounded-full bg-green-600 px-6 py-3 text-white shadow-lg hover:bg-green-700">
//             Add New Meter
//           </button>
//         </div>
//       </div>

//       {/* Add New Meter Modal */}
//       {showAddMeterModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50">
//           <div className="w-full max-w-md rounded-3xl bg-blue-900/40 backdrop-blur-xl p-6 shadow-2xl border border-blue-400/20">
//             <h2 className="text-2xl font-bold text-green-300 mb-4 drop-shadow-lg">
//               Add New Meter
//             </h2>
//             <div className="space-y-4">
//               <label className="block text-white font-semibold">Meter Number</label>
//               <input
//                 type="text"
//                 placeholder="Enter meter number"
//                 value={newMeter.meterNumber}
//                 onChange={(e) => setNewMeter({ ...newMeter, meterNumber: e.target.value })}
//                 className="w-full px-4 py-2 rounded bg-gray-800 text-white"
//               />

//               <label className="block text-white font-semibold">Installation Date</label>
//               <input
//                 type="date"
//                 value={newMeter.installationDate}
//                 onChange={(e) => setNewMeter({ 
//                   ...newMeter, 
//                   installationDate: e.target.value, 
//                   lastReadingDate: e.target.value // ✅ Last Reading Date automatically set
//                 })}
//                 className="w-full px-4 py-2 rounded bg-gray-800 text-white"
//               />

//               <label className="block text-white font-semibold">Last Reading Date</label>
//               <input
//                 type="date"
//                 value={newMeter.lastReadingDate}
//                 onChange={(e) => setNewMeter({ ...newMeter, lastReadingDate: e.target.value })}
//                 className="w-full px-4 py-2 rounded bg-gray-800 text-white"
//               />

//               <label className="block text-white font-semibold">Name</label>
//               <input
//                 type="text"
//                 placeholder="Enter full name"
//                 value={newMeter.user.name}
//                 onChange={(e) => setNewMeter({ ...newMeter, user: { ...newMeter.user, name: e.target.value } })}
//                 className="w-full px-4 py-2 rounded bg-gray-800 text-white"
//               />

//               <label className="block text-white font-semibold">Email</label>
//               <input
//                 type="email"
//                 placeholder="Enter email"
//                 value={newMeter.user.email}
//                 onChange={(e) => setNewMeter({ ...newMeter, user: { ...newMeter.user, email: e.target.value } })}
//                 className="w-full px-4 py-2 rounded bg-gray-800 text-white"
//               />

//               <label className="block text-white font-semibold">Government ID</label>
//               <input
//                 type="text"
//                 placeholder="Enter government ID"
//                 value={newMeter.user.governmentId}
//                 onChange={(e) => setNewMeter({ ...newMeter, user: { ...newMeter.user, governmentId: e.target.value } })}
//                 className="w-full px-4 py-2 rounded bg-gray-800 text-white"
//               />

//               <label className="block text-white font-semibold">Meter Status</label>
//               <select
//                 value={newMeter.status}
//                 onChange={(e) => setNewMeter({ ...newMeter, status: e.target.value })}
//                 className="w-full px-4 py-2 rounded bg-gray-800 text-white"
//               >
//                 <option value="ACTIVE">ACTIVE</option>
//                 <option value="INACTIVE">INACTIVE</option>
//                 <option value="MAINTENANCE">MAINTENANCE</option>
//               </select>
//             </div>

//             <div className="mt-6 flex justify-end space-x-4">
//               <button onClick={() => setShowAddMeterModal(false)} className="bg-gray-300 px-4 py-2 rounded">
//                 Cancel
//               </button>
//               <button onClick={handleAddMeter} className="bg-green-600 px-4 py-2 text-white rounded">
//                 Add Meter
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";
import { useState, useEffect } from "react";
import { fetchMeters, addWaterMeter, deleteWaterMeter, addWaterUsage } from "@/lib/api"; // ✅ Import API functions

export default function MetersPage() {
  const [meters, setMeters] = useState([]);
  const [showAddMeterModal, setShowAddMeterModal] = useState(false);
  const [showUsageModal, setShowUsageModal] = useState(false);
  const [selectedMeter, setSelectedMeter] = useState(null);
  const [newUsage, setNewUsage] = useState({
    readingValue: "",
    readingDate: "",
  });

  // Fetch meters on load
  useEffect(() => {
    const loadMeters = async () => {
      try {
        const data = await fetchMeters();
        setMeters(data);
      } catch (error) {
        console.error("Error fetching meters:", error);
      }
    };
    loadMeters();
  }, []);

  // Handle adding new usage
  const handleAddUsage = async () => {
    if (!newUsage.readingValue || !newUsage.readingDate) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      await addWaterUsage(selectedMeter, newUsage);
      setShowUsageModal(false);
      alert("Water usage added successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-900 via-blue-800 to-blue-600 p-10 relative overflow-hidden">
      <div className="w-full max-w-4xl rounded-3xl bg-blue-900/40 backdrop-blur-xl p-10 shadow-2xl border border-blue-400/20 relative z-10">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-green-300 drop-shadow-lg tracking-wide">
            Manage Your Water Meters
          </h1>
        </div>

        {/* Meter Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {meters.map((meter) => (
            <div key={meter.meterNumber} className="rounded-2xl bg-blue-900/40 backdrop-blur-xl p-6 shadow-lg border border-blue-400/20 text-white">
              <h2 className="text-xl font-bold text-green-300 drop-shadow-lg">{meter.meterNumber}</h2>
              <p>Installation Date: {meter.installationDate}</p>
              <p>Last Reading Date: {meter.lastReadingDate}</p>
              <p>Status: {meter.status}</p>
              <div className="mt-4 flex space-x-3">
                <button
                  onClick={() => {
                    setSelectedMeter(meter.meterNumber);
                    setShowUsageModal(true);
                  }}
                  className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 shadow"
                >
                  Add Usage
                </button>
                <button
                  onClick={() => deleteWaterMeter(meter.meterNumber)}
                  className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 shadow"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Usage Modal */}
      {showUsageModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50">
          <div className="w-full max-w-md rounded-3xl bg-blue-900/40 backdrop-blur-xl p-6 shadow-2xl border border-blue-400/20">
            <h2 className="text-2xl font-bold text-green-300 mb-4 drop-shadow-lg">Add Water Usage</h2>
            <div className="space-y-4">
              <label className="block text-white font-semibold">Reading Value</label>
              <input
                type="text"
                placeholder="Enter reading value"
                value={newUsage.readingValue}
                onChange={(e) => setNewUsage({ ...newUsage, readingValue: e.target.value })}
                className="w-full px-4 py-2 rounded bg-gray-800 text-white"
              />

              <label className="block text-white font-semibold">Reading Date</label>
              <input
                type="date"
                value={newUsage.readingDate}
                onChange={(e) => setNewUsage({ ...newUsage, readingDate: e.target.value })}
                className="w-full px-4 py-2 rounded bg-gray-800 text-white"
              />
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button onClick={() => setShowUsageModal(false)} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
              <button onClick={handleAddUsage} className="bg-green-600 px-4 py-2 text-white rounded">Add Usage</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

