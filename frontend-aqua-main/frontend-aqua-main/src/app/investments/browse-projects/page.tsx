
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchProjects } from "@/lib/api";
import { submitInvestment } from "@/lib/api";
// Project Type
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

const categories = ["All", "Water Conservation", "Irrigation", "Renewable Energy", "Sustainable Agriculture"];
const sortOptions = ["Newest", "Highest ROI", "Most Funded"];

export default function BrowseProjects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSort, setSelectedSort] = useState("Newest");
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Investment Form State
  const [investmentFormOpen, setInvestmentFormOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [buyRate, setBuyRate] = useState(0);
  const [units, setUnits] = useState(0);
  const [investmentDate, setInvestmentDate] = useState("");
  const [status, setStatus] = useState("PENDING");

  // Calculate Total Amount
  const totalAmount = buyRate * units;

  // Fetch projects from backend
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

  // Filtering and sorting logic
  const filterProjects = () => {
    let filtered = projects;
    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.projectType === selectedCategory);
    }

    if (selectedSort === "Highest ROI") {
      filtered.sort((a, b) => b.riskLevel.localeCompare(a.riskLevel)); // Adjust sorting logic if needed
    } else if (selectedSort === "Most Funded") {
      filtered.sort((a, b) => b.currAmount / b.targetAmount - a.currAmount / a.targetAmount);
    }

    setFilteredProjects([...filtered]);
  };

  const openInvestmentForm = (project: Project) => {
    setSelectedProject(project);
    setUserName("");
    setEmail("");
    setBuyRate(project.currRate);
    //setBuyRate(0);
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
  
    if (!selectedProject) {
      console.error("No project selected for investment.");
      return;
    }
    // Check if the total amount exceeds the target amount
  const projectedAmount = selectedProject.currAmount + totalAmount;
  if (projectedAmount > selectedProject.targetAmount) {
    alert(
      `Investment exceeds the target amount! Current funding: $${selectedProject.currAmount.toLocaleString()}, Target: $${selectedProject.targetAmount.toLocaleString()}, Your investment: $${totalAmount.toLocaleString()}`
    );
    return; // Prevent submission
  }
    const formattedDate = new Date(investmentDate).toISOString(); // Convert to ISO format
    const investmentData = {
      user: {
        email,
        userName,
      },
      buyRate,
      units,
      totalAmount,
      investmentDate: formattedDate,
      status,
    };
  
    try {
      // Call the API function to submit the investment
      const response = await submitInvestment(selectedProject.projectId, investmentData);
      console.log("Investment submitted successfully:", response);

    // Optionally, show a success message or reset the form
    alert("Investment submitted successfully!");
    closeInvestmentForm();
  } catch (error) {
    console.error("Error submitting investment:", error);
    alert("Failed to submit investment. Please try again.");
  }
};
  // const submitInvestment = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const formData = {
  //     projectId: selectedProject?.projectId,
  //     userName,
  //     email,
  //     buyRate,
  //     units,
  //     totalAmount,
  //     investmentDate,
  //     status,
  //   };
  //   console.log("Investment submitted:", formData);
  //   closeInvestmentForm();
  // };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-900 via-blue-800 to-blue-600 p-10 relative overflow-hidden">
      <div className="w-full max-w-7xl rounded-3xl bg-blue-900/40 backdrop-blur-xl p-10 shadow-2xl border border-blue-400/20 relative z-10">
        <div className="grid grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          <div className="col-span-1 bg-blue-800/50 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-blue-400/20 text-white">
            <h2 className="font-bold text-lg mb-4">Filters</h2>
            <label className="block mt-2">Category</label>
            <select
              className="w-full p-2 bg-blue-800/50 text-white border border-green-500/40 rounded focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>

            <label className="block mt-4">Sort By</label>
            <select
              className="w-full p-2 bg-blue-800/50 text-white border border-green-500/40 rounded focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
              onChange={(e) => setSelectedSort(e.target.value)}
            >
              {sortOptions.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>

            <button
              className="mt-6 w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 shadow"
              onClick={filterProjects}
            >
              Apply Filters
            </button>
          </div>

          {/* Projects List */}
          <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <p className="text-white text-lg">Loading projects...</p>
            ) : error ? (
              <p className="text-red-500 text-lg">{error}</p>
            ) : (
              filteredProjects.map((project) => (
                <div
                  key={project.projectId}
                  className="rounded-2xl bg-blue-900/40 backdrop-blur-xl p-6 shadow-lg border border-blue-400/20 text-white hover:shadow-2xl transition-all"
                >
                  <h2 className="text-lg font-bold text-green-300 drop-shadow-lg">{project.projectName}</h2>
                  <p className="mt-1">{project.projectType}</p>
                  <p className="mt-1">Risk Level: {project.riskLevel}</p>
                  <p className="mt-1">Location: {project.location}</p>
                  <p className="mt-1">Target Amount: ${project.targetAmount.toLocaleString()}</p>
                  <p className="mt-1">Current Amount: ${project.currAmount.toLocaleString()}</p>
                  <p className="mt-1">Buy Rate: ${project.currRate.toLocaleString()}</p> 
                  <div className="mt-3 w-full bg-blue-800/30 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(project.currAmount / project.targetAmount) * 100}%` }}
                    ></div>
                  </div>
                  <p className="mt-2">Funding Progress: {((project.currAmount / project.targetAmount) * 100).toFixed(2)}%</p>
                  <div className="mt-4 flex justify-between">
                    <Link href={`/projects/${project.projectId}`} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                      Learn More
                    </Link>
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                      onClick={() => openInvestmentForm(project)}
                    >
                      Start Investing
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Investment Form Modal */}
      {investmentFormOpen && selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-20">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
            <h2 className="text-2xl font-bold mb-4">Invest in {selectedProject.projectName}</h2>
            <form onSubmit={submitInvestmentForm}>
              <div className="mb-4">
                <label className="block mb-1">User Name:</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">User Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Buy Rate:</label>
                <input
                  type="number"
                  value={buyRate}
                  readOnly
                  // onChange={(e) => setBuyRate(Number(e.target.value))}
                  // required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Units:</label>
                <input
                  type="number"
                  value={units}
                  onChange={(e) => setUnits(Number(e.target.value))}
                  required
                  className="w-full p-2 border rounded"
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
              <div className="mb-4">
                <label className="block mb-1">Investment Date:</label>
                <input
                  type="date"
                  value={investmentDate}
                  onChange={(e) => setInvestmentDate(e.target.value)}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Status:</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                  className="w-full p-2 border rounded"
                >
                  <option value="PENDING">Pending</option>
                  <option value="APPROVED">Approved</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeInvestmentForm}
                  className="px-4 py-2 border rounded hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                  Invest
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}





// export default function BrowseProjects() {
 
  
 

//   const openInvestmentForm = (project: Project) => {
//     setSelectedProject(project);
//     // Reset the form fields
//     setUserName("");
//     setEmail("");
//     setBuyRate(0);
//     setUnits(0);
//     setInvestmentDate("");
//     setStatus("PENDING");
//     setInvestmentFormOpen(true);
//   };

//   const closeInvestmentForm = () => {
//     setInvestmentFormOpen(false);
//     setSelectedProject(null);
//   };

//   const submitInvestment = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     // Here you can process the investment submission.
//     // For now, we'll log the values.
//     const formData = {
//       projectId: selectedProject?.id,
//       userName,
//       email,
//       buyRate,
//       units,
//       totalAmount,
//       investmentDate,
//       status,
//     };
//     console.log("Investment submitted:", formData);
//     // Close modal after submission
//     closeInvestmentForm();
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-900 via-blue-800 to-blue-600 p-10 relative overflow-hidden">
//       <div className="w-full max-w-7xl rounded-3xl bg-blue-900/40 backdrop-blur-xl p-10 shadow-2xl border border-blue-400/20 relative z-10">
//         <div className="grid grid-cols-4 gap-6">
//           {/* Sidebar Filters */}
//           <div className="col-span-1 bg-blue-800/50 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-blue-400/20 text-white">
//             <h2 className="font-bold text-lg mb-4">Filters</h2>
//             <label className="block mt-2">Category</label>
//             <select
//               className="w-full p-2 bg-blue-800/50 text-white border border-green-500/40 rounded focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
//               onChange={(e) => setSelectedCategory(e.target.value)}
//             >
//               {categories.map((cat) => (
//                 <option key={cat}>{cat}</option>
//               ))}
//             </select>
            
//             <label className="block mt-4">Sort By</label>
//             <select
//               className="w-full p-2 bg-blue-800/50 text-white border border-green-500/40 rounded focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
//               onChange={(e) => setSelectedSort(e.target.value)}
//             >
//               {sortOptions.map((opt) => (
//                 <option key={opt}>{opt}</option>
//               ))}
//             </select>

//             <button
//               className="mt-6 w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 shadow"
//               onClick={filterProjects}
//             >
//               Apply Filters
//             </button>
//           </div>

//           {/* Projects List */}
//           <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredProjects.map((project) => (
//               <div key={project.id} className="rounded-2xl bg-blue-900/40 backdrop-blur-xl p-6 shadow-lg border border-blue-400/20 text-white hover:shadow-2xl transition-all">
//                 <h2 className="text-lg font-bold text-green-300 drop-shadow-lg">{project.name}</h2>
//                 <p className="mt-1">{project.category}</p>
//                 <p className="mt-1">Investment: ${project.investmentRequired}</p>
//                 <p className="mt-1 text-green-400 font-semibold">ROI: {project.roi}%</p>
//                 <p className="mt-1">Duration: {project.duration}</p>
//                 <p className="mt-1">Location: {project.location}</p>
//                 <div className="mt-3 w-full bg-blue-800/30 rounded-full h-2">
//                   <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${project.fundingProgress}%` }}></div>
//                 </div>
//                 <p className="mt-2">Funding Progress: {project.fundingProgress}%</p>
//                 <div className="mt-4 flex justify-between">
//                   <Link href={`/projects/${project.id}`} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
//                     Learn More
//                   </Link>
//                   <button
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                     onClick={() => openInvestmentForm(project)}
//                   >
//                     Start Investing
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Investment Form Modal */}
//       {investmentFormOpen && selectedProject && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-20">
//           <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
//             <h2 className="text-2xl font-bold mb-4">Invest in {selectedProject.name}</h2>
//             <form onSubmit={submitInvestment}>
//               <input type="hidden" id="projectId" name="projectId" value={selectedProject.id} />
//               <div className="mb-4">
//                 <label className="block mb-1">User Name:</label>
//                 <input
//                   type="text"
//                   id="userName"
//                   value={userName}
//                   onChange={(e) => setUserName(e.target.value)}
//                   required
//                   className="w-full p-2 border rounded"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-1">User Email:</label>
//                 <input
//                   type="email"
//                   id="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   className="w-full p-2 border rounded"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-1">Buy Rate:</label>
//                 <input
//                   type="number"
//                   id="buyRate"
//                   value={buyRate}
//                   onChange={(e) => setBuyRate(Number(e.target.value))}
//                   required
//                   className="w-full p-2 border rounded"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-1">Units:</label>
//                 <input
//                   type="number"
//                   id="units"
//                   value={units}
//                   onChange={(e) => setUnits(Number(e.target.value))}
//                   required
//                   className="w-full p-2 border rounded"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-1">Total Amount:</label>
//                 <input
//                   type="number"
//                   id="totalAmount"
//                   value={totalAmount}
//                   readOnly
//                   className="w-full p-2 border rounded bg-gray-100"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-1">Investment Date:</label>
//                 <input
//                   type="date"
//                   id="investmentDate"
//                   value={investmentDate}
//                   onChange={(e) => setInvestmentDate(e.target.value)}
//                   required
//                   className="w-full p-2 border rounded"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-1">Status:</label>
//                 <select
//                   id="status"
//                   value={status}
//                   onChange={(e) => setStatus(e.target.value)}
//                   required
//                   className="w-full p-2 border rounded"
//                 >
//                   <option value="PENDING">Pending</option>
//                   <option value="APPROVED">Approved</option>
//                   <option value="REJECTED">Rejected</option>
//                 </select>
//               </div>
//               <div className="flex justify-end space-x-4">
//                 <button
//                   type="button"
//                   onClick={closeInvestmentForm}
//                   className="px-4 py-2 border rounded hover:bg-gray-200"
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
//                   Invest
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
