
"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/Context/UserContext"; 
import { motion } from "framer-motion";
import { fetchProjects, submitInvestment } from "@/lib/api";

type Project = {
  projectId: number;
  projectName: string;
  projectType: string;
  riskLevel: string;
  location: string;
  targetAmount: number;
  currAmount: number;
  currRate: number;
};

export default function BrowseProjects() {
  const { user } = useUser(); // Get user details from context
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Investment Form State
  const [investmentFormOpen, setInvestmentFormOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [buyRate, setBuyRate] = useState(0);
  const [units, setUnits] = useState(0);
  const [investmentDate, setInvestmentDate] = useState("");
  const [status, setStatus] = useState("PENDING");

  // Calculate Total Amount
  const totalAmount = buyRate * units;

  // Fetch projects
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchProjects();
        setProjects(data);
        setFilteredProjects(data);
      } catch (err) {
        setError("Failed to fetch projects. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const openInvestmentForm = (project: Project) => {
    if (!user) {
      alert("You must be logged in to invest.");
      return;
    }
    setSelectedProject(project);
    setBuyRate(project.currRate);
    setUnits(0);
    setInvestmentDate("");
    setStatus("PENDING");
    setInvestmentFormOpen(true);
  };

  const closeInvestmentForm = () => {
    setInvestmentFormOpen(false);
    setSelectedProject(null);
  };

  const submitInvestmentForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!selectedProject) return;
    
    const projectedAmount = selectedProject.currAmount + totalAmount;
    if (projectedAmount > selectedProject.targetAmount) {
      alert(`Investment exceeds the target amount!`);
      return;
    }
    
    const formattedDate = new Date(investmentDate).toISOString();
    const investmentData = {
      user: {
        name: user?.name, // Auto-filled from user context
        email: user?.email, // Auto-filled from user context
      },
      buyRate,
      units,
      totalAmount,
      investmentDate: formattedDate,
      status,
    };
  
    try {
      await submitInvestment(selectedProject.projectId, investmentData);
      alert("Investment submitted successfully!");
      closeInvestmentForm();
    } catch (error) {
      alert("Failed to submit investment.");
    }
  };

  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-green-900 via-blue-800 to-blue-600">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-green-300">Browse Investment Projects</h1>

        {/* Projects List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {loading ? (
            <p className="text-white text-lg col-span-3 text-center">Loading projects...</p>
          ) : error ? (
            <p className="text-red-400 text-lg col-span-3 text-center">{error}</p>
          ) : (
            filteredProjects.map((project) => (
              <motion.div
                key={project.projectId}
                whileHover={{ y: -5 }}
                className="p-6 bg-blue-900/40 rounded-2xl shadow-lg border border-blue-400/20 text-white"
              >
                <h2 className="text-xl font-bold text-green-300">{project.projectName}</h2>
                <p className="text-green-200">{project.projectType}</p>
                <p>Risk Level: <span className="font-semibold">{project.riskLevel}</span></p>
                <p>Location: {project.location}</p>
                <p>Target: <span className="font-semibold">${project.targetAmount.toLocaleString()}</span></p>
                <p>Current: <span className="font-semibold">${project.currAmount.toLocaleString()}</span></p>
                <p>Rate: <span className="font-semibold">${project.currRate.toLocaleString()}</span></p>

                <div className="mt-4 flex justify-between">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => openInvestmentForm(project)}
                    className="px-4 py-2 text-white font-semibold bg-green-600 hover:bg-green-700 rounded-xl"
                  >
                    Invest
                  </motion.button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>

      {/* Investment Form Modal */}
      {investmentFormOpen && selectedProject && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-20 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-md p-8 bg-blue-900/40 rounded-3xl shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-green-300 mb-6">
              Invest in {selectedProject.projectName}
            </h2>
            
            <form onSubmit={submitInvestmentForm} className="space-y-4">
              <div>
                <label className="block text-green-200">User Name</label>
                <input
                  type="text"
                  value={user?.name || ""}
                  readOnly
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl"
                />
              </div>
              
              <div>
                <label className="block text-green-200">User Email</label>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-green-200">Buy Rate</label>
                <input
                  type="number"
                  value={buyRate}
                  readOnly
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl"
                />
              </div>
                   
              <div>
                <label className="block mb-2 text-green-200 font-semibold">Units</label>
               <input
                  type="number"
                  value={units}
                  onChange={(e) => setUnits(Number(e.target.value))}
                  required
                  className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
                />
              </div>
                  <div className="mb-4">
                 <label className="block mb-1">Total Amount:</label>
                 <input
                  type="number"
                  value={totalAmount}
                  readOnly
                  className="w-full p-2 border rounded bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-green-200">Investment Date</label>
                <input
                  type="date"
                  value={investmentDate}
                  onChange={(e) => setInvestmentDate(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-blue-800/50 text-white rounded-xl"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <motion.button
                  type="button"
                  onClick={closeInvestmentForm}
                  className="px-6 py-2 bg-red-600 text-white rounded-xl"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-xl"
                >
                  Confirm Investment
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
