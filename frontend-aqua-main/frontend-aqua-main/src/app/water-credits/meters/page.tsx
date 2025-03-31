
"use client";
import { useState, useEffect } from "react";
import { fetchMeters, addWaterUsage } from "@/lib/api";
import { useUser } from "@/Context/UserContext"; 
import { motion } from "framer-motion";
import { addWaterMeter} from "@/lib/api";

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
  const [meterFormOpen, setMeterFormOpen] = useState(false);
  const [newMeter, setNewMeter] = useState({
    meterNumber: "",
    installationDate: "",
    status: "ACTIVE",
    user: {
      name: user?.name || "",
      email: user?.email || "",
      governmentId: user?.governmentId || "",
    },
  });

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

  // Meter form handlers
  const openMeterForm = () => {
    setNewMeter({
      meterNumber: "",
      installationDate: "",
      status: "ACTIVE",
      user: {
        name: user?.name || "",
        email: user?.email || "",
        governmentId: user?.governmentId || "",
      },
    });
    setMeterFormOpen(true);
  };

  const closeMeterForm = () => {
    setMeterFormOpen(false);
  };

  const submitMeterForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!newMeter.meterNumber || !newMeter.installationDate) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      const addedMeter = await addWaterMeter({
        ...newMeter,
        lastReadingDate: newMeter.installationDate,
      });
      setMeters([...meters, addedMeter]);
      closeMeterForm();
    } catch (error) {
      console.error("Error adding meter:", error);
      alert(error instanceof Error ? error.message : "Failed to add meter");
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
                key={meter.meterId} 
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

        {/* Add Meter Button */}
        <div className="mt-8 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openMeterForm}
            className="rounded-full bg-green-600 px-6 py-3 text-white shadow-lg hover:bg-green-700"
          >
            Add New Meter
          </motion.button>
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

      {/* Add Meter Modal */}
      {meterFormOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-20 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-3xl bg-blue-900/40 backdrop-blur-xl p-8 shadow-2xl border border-blue-400/20 relative z-30"
          >
            <h2 className="text-2xl font-bold text-green-300 mb-6">Add New Water Meter</h2>
            
            <form onSubmit={submitMeterForm} className="space-y-4">
              <div>
                <label className="block mb-2 text-green-200 font-semibold">Meter Number</label>
                <input
                  type="text"
                  value={newMeter.meterNumber}
                  onChange={(e) => setNewMeter({ ...newMeter, meterNumber: e.target.value })}
                  required
                  className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
                />
              </div>
              
              <div>
                <label className="block mb-2 text-green-200 font-semibold">Installation Date</label>
                <input
                  type="date"
                  value={newMeter.installationDate}
                  onChange={(e) => setNewMeter({ 
                    ...newMeter, 
                    installationDate: e.target.value
                  })}
                  required
                  className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
                />
              </div>

              <div>
                <label className="block mb-2 text-green-200 font-semibold">Status</label>
                <select
                  value={newMeter.status}
                  onChange={(e) => setNewMeter({ ...newMeter, status: e.target.value })}
                  className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                  <option value="MAINTENANCE">Maintenance</option>
                </select>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={closeMeterForm}
                  className="px-6 py-2 rounded-xl text-white font-semibold shadow-md bg-red-600 hover:bg-red-700"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(144, 238, 144, 0.8)" }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-6 py-2 rounded-xl text-white font-semibold shadow-md bg-green-600 hover:bg-green-700"
                >
                  Add Meter
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}