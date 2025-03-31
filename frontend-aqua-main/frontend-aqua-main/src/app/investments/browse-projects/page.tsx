
// // "use client";

// // import { useState, useEffect } from "react";
// // import Link from "next/link";
// // import { fetchProjects } from "@/lib/api";
// // import { submitInvestment } from "@/lib/api";
// // // Project Type
// // type Project = {
// //   projectId: number;
// //   projectName: string;
// //   projectType: string;
// //   riskLevel: string;
// //   location: string;
// //   targetAmount: number;
// //   currAmount: number;
// //   currRate: number;
// // };

// // const categories = ["All", "Water Conservation", "Irrigation", "Renewable Energy", "Sustainable Agriculture"];
// // const sortOptions = ["Newest", "Highest ROI", "Most Funded"];

// // export default function BrowseProjects() {
// //   const [selectedCategory, setSelectedCategory] = useState("All");
// //   const [selectedSort, setSelectedSort] = useState("Newest");
// //   const [projects, setProjects] = useState<Project[]>([]);
// //   const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);

// //   // Investment Form State
// //   const [investmentFormOpen, setInvestmentFormOpen] = useState(false);
// //   const [selectedProject, setSelectedProject] = useState<Project | null>(null);
// //   const [userName, setUserName] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [buyRate, setBuyRate] = useState(0);
// //   const [units, setUnits] = useState(0);
// //   const [investmentDate, setInvestmentDate] = useState("");
// //   const [status, setStatus] = useState("PENDING");

// //   // Calculate Total Amount
// //   const totalAmount = buyRate * units;

// //   // Fetch projects from backend
// //   useEffect(() => {
// //     const loadProjects = async () => {
// //       try {
// //         setLoading(true);
// //         const data = await fetchProjects();
// //         setProjects(data);
// //         setFilteredProjects(data);
// //       } catch (err) {
// //         setError("Failed to fetch projects. Please try again.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     loadProjects();
// //   }, []);

// //   // Filtering and sorting logic
// //   const filterProjects = () => {
// //     let filtered = projects;
// //     if (selectedCategory !== "All") {
// //       filtered = filtered.filter((p) => p.projectType === selectedCategory);
// //     }

// //     if (selectedSort === "Highest ROI") {
// //       filtered.sort((a, b) => b.riskLevel.localeCompare(a.riskLevel)); // Adjust sorting logic if needed
// //     } else if (selectedSort === "Most Funded") {
// //       filtered.sort((a, b) => b.currAmount / b.targetAmount - a.currAmount / a.targetAmount);
// //     }

// //     setFilteredProjects([...filtered]);
// //   };

// //   const openInvestmentForm = (project: Project) => {
// //     setSelectedProject(project);
// //     setUserName("");
// //     setEmail("");
// //     setBuyRate(project.currRate);
// //     //setBuyRate(0);
// //     setUnits(0);
// //     setInvestmentDate("");
// //     setStatus("PENDING");
// //     setInvestmentFormOpen(true);
// //   };

// //   const closeInvestmentForm = () => {
// //     setInvestmentFormOpen(false);
// //     setSelectedProject(null);
// //   };
// //   const submitInvestmentForm = async (e: React.FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();
  
// //     if (!selectedProject) {
// //       console.error("No project selected for investment.");
// //       return;
// //     }
// //     // Check if the total amount exceeds the target amount
// //   const projectedAmount = selectedProject.currAmount + totalAmount;
// //   if (projectedAmount > selectedProject.targetAmount) {
// //     alert(
// //       `Investment exceeds the target amount! Current funding: $${selectedProject.currAmount.toLocaleString()}, Target: $${selectedProject.targetAmount.toLocaleString()}, Your investment: $${totalAmount.toLocaleString()}`
// //     );
// //     return; // Prevent submission
// //   }
// //     const formattedDate = new Date(investmentDate).toISOString(); // Convert to ISO format
// //     const investmentData = {
// //       user: {
// //         email,
// //         userName,
// //       },
// //       buyRate,
// //       units,
// //       totalAmount,
// //       investmentDate: formattedDate,
// //       status,
// //     };
  
// //     try {
// //       // Call the API function to submit the investment
// //       const response = await submitInvestment(selectedProject.projectId, investmentData);
// //       console.log("Investment submitted successfully:", response);

// //     // Optionally, show a success message or reset the form
// //     alert("Investment submitted successfully!");
// //     closeInvestmentForm();
// //   } catch (error) {
// //     console.error("Error submitting investment:", error);
// //     alert("Failed to submit investment. Please try again.");
// //   }
// // };
// //   // const submitInvestment = (e: React.FormEvent<HTMLFormElement>) => {
// //   //   e.preventDefault();
// //   //   const formData = {
// //   //     projectId: selectedProject?.projectId,
// //   //     userName,
// //   //     email,
// //   //     buyRate,
// //   //     units,
// //   //     totalAmount,
// //   //     investmentDate,
// //   //     status,
// //   //   };
// //   //   console.log("Investment submitted:", formData);
// //   //   closeInvestmentForm();
// //   // };

// //   return (
// //     <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-900 via-blue-800 to-blue-600 p-10 relative overflow-hidden">
// //       <div className="w-full max-w-7xl rounded-3xl bg-blue-900/40 backdrop-blur-xl p-10 shadow-2xl border border-blue-400/20 relative z-10">
// //         <div className="grid grid-cols-4 gap-6">
// //           {/* Sidebar Filters */}
// //           <div className="col-span-1 bg-blue-800/50 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-blue-400/20 text-white">
// //             <h2 className="font-bold text-lg mb-4">Filters</h2>
// //             <label className="block mt-2">Category</label>
// //             <select
// //               className="w-full p-2 bg-blue-800/50 text-white border border-green-500/40 rounded focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
// //               onChange={(e) => setSelectedCategory(e.target.value)}
// //             >
// //               {categories.map((cat) => (
// //                 <option key={cat}>{cat}</option>
// //               ))}
// //             </select>

// //             <label className="block mt-4">Sort By</label>
// //             <select
// //               className="w-full p-2 bg-blue-800/50 text-white border border-green-500/40 rounded focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
// //               onChange={(e) => setSelectedSort(e.target.value)}
// //             >
// //               {sortOptions.map((opt) => (
// //                 <option key={opt}>{opt}</option>
// //               ))}
// //             </select>

// //             <button
// //               className="mt-6 w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 shadow"
// //               onClick={filterProjects}
// //             >
// //               Apply Filters
// //             </button>
// //           </div>

// //           {/* Projects List */}
// //           <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //             {loading ? (
// //               <p className="text-white text-lg">Loading projects...</p>
// //             ) : error ? (
// //               <p className="text-red-500 text-lg">{error}</p>
// //             ) : (
// //               filteredProjects.map((project) => (
// //                 <div
// //                   key={project.projectId}
// //                   className="rounded-2xl bg-blue-900/40 backdrop-blur-xl p-6 shadow-lg border border-blue-400/20 text-white hover:shadow-2xl transition-all"
// //                 >
// //                   <h2 className="text-lg font-bold text-green-300 drop-shadow-lg">{project.projectName}</h2>
// //                   <p className="mt-1">{project.projectType}</p>
// //                   <p className="mt-1">Risk Level: {project.riskLevel}</p>
// //                   <p className="mt-1">Location: {project.location}</p>
// //                   <p className="mt-1">Target Amount: ${project.targetAmount.toLocaleString()}</p>
// //                   <p className="mt-1">Current Amount: ${project.currAmount.toLocaleString()}</p>
// //                   <p className="mt-1">Buy Rate: ${project.currRate.toLocaleString()}</p> 
// //                   <div className="mt-3 w-full bg-blue-800/30 rounded-full h-2">
// //                     <div
// //                       className="bg-blue-500 h-2 rounded-full"
// //                       style={{ width: `${(project.currAmount / project.targetAmount) * 100}%` }}
// //                     ></div>
// //                   </div>
// //                   <p className="mt-2">Funding Progress: {((project.currAmount / project.targetAmount) * 100).toFixed(2)}%</p>
// //                   <div className="mt-4 flex justify-between">
// //                     <Link href={`/projects/${project.projectId}`} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
// //                       Learn More
// //                     </Link>
// //                     <button
// //                       className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
// //                       onClick={() => openInvestmentForm(project)}
// //                     >
// //                       Start Investing
// //                     </button>
// //                   </div>
// //                 </div>
// //               ))
// //             )}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Investment Form Modal */}
// //       {investmentFormOpen && selectedProject && (
// //         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-20">
// //           <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
// //             <h2 className="text-2xl font-bold mb-4">Invest in {selectedProject.projectName}</h2>
// //             <form onSubmit={submitInvestmentForm}>
// //               <div className="mb-4">
// //                 <label className="block mb-1">User Name:</label>
// //                 <input
// //                   type="text"
// //                   value={userName}
// //                   onChange={(e) => setUserName(e.target.value)}
// //                   required
// //                   className="w-full p-2 border rounded"
// //                 />
// //               </div>
// //               <div className="mb-4">
// //                 <label className="block mb-1">User Email:</label>
// //                 <input
// //                   type="email"
// //                   value={email}
// //                   onChange={(e) => setEmail(e.target.value)}
// //                   required
// //                   className="w-full p-2 border rounded"
// //                 />
// //               </div>
// //               <div className="mb-4">
// //                 <label className="block mb-1">Buy Rate:</label>
// //                 <input
// //                   type="number"
// //                   value={buyRate}
// //                   readOnly
// //                   // onChange={(e) => setBuyRate(Number(e.target.value))}
// //                   // required
// //                   className="w-full p-2 border rounded"
// //                 />
// //               </div>
// //               <div className="mb-4">
// //                 <label className="block mb-1">Units:</label>
// //                 <input
// //                   type="number"
// //                   value={units}
// //                   onChange={(e) => setUnits(Number(e.target.value))}
// //                   required
// //                   className="w-full p-2 border rounded"
// //                 />
// //               </div>
// //               <div className="mb-4">
// //                 <label className="block mb-1">Total Amount:</label>
// //                 <input
// //                   type="number"
// //                   value={totalAmount}
// //                   readOnly
// //                   className="w-full p-2 border rounded bg-gray-100"
// //                 />
// //               </div>
// //               <div className="mb-4">
// //                 <label className="block mb-1">Investment Date:</label>
// //                 <input
// //                   type="date"
// //                   value={investmentDate}
// //                   onChange={(e) => setInvestmentDate(e.target.value)}
// //                   required
// //                   className="w-full p-2 border rounded"
// //                 />
// //               </div>
// //               <div className="mb-4">
// //                 <label className="block mb-1">Status:</label>
// //                 <select
// //                   value={status}
// //                   onChange={(e) => setStatus(e.target.value)}
// //                   required
// //                   className="w-full p-2 border rounded"
// //                 >
// //                   <option value="PENDING">Pending</option>
// //                   <option value="APPROVED">Approved</option>
// //                   <option value="REJECTED">Rejected</option>
// //                 </select>
// //               </div>
// //               <div className="flex justify-end space-x-4">
// //                 <button
// //                   type="button"
// //                   onClick={closeInvestmentForm}
// //                   className="px-4 py-2 border rounded hover:bg-gray-200"
// //                 >
// //                   Cancel
// //                 </button>
// //                 <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
// //                   Invest
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }




// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { fetchProjects } from "@/lib/api";
// import { submitInvestment } from "@/lib/api";
// import { useUser } from "@/Context/UserContext"; 
// type Project = {
//   projectId: number;
//   projectName: string;
//   projectType: string;
//   riskLevel: string;
//   location: string;
//   targetAmount: number;
//   currAmount: number;
//   currRate: number;
// };

// const categories = ["All", "Water Conservation", "Irrigation", "Renewable Energy", "Sustainable Agriculture"];
// const sortOptions = ["Newest", "Highest ROI", "Most Funded"];

// export default function BrowseProjects() {
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [selectedSort, setSelectedSort] = useState("Newest");
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Investment Form State
//   const [investmentFormOpen, setInvestmentFormOpen] = useState(false);
//   const [selectedProject, setSelectedProject] = useState<Project | null>(null);
//   const [userName, setUserName] = useState("");
//   const [email, setEmail] = useState("");
//   const [buyRate, setBuyRate] = useState(0);
//   const [units, setUnits] = useState(0);
//   const [investmentDate, setInvestmentDate] = useState("");
//   const [status, setStatus] = useState("PENDING");

//   // Calculate Total Amount
//   const totalAmount = buyRate * units;

//   // Fetch projects from backend
//   useEffect(() => {
//     const loadProjects = async () => {
//       try {
//         setLoading(true);
//         const data = await fetchProjects();
//         setProjects(data);
//         setFilteredProjects(data);
//       } catch (err) {
//         setError("Failed to fetch projects. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProjects();
//   }, []);

//   // Filtering and sorting logic
//   const filterProjects = () => {
//     let filtered = projects;
//     if (selectedCategory !== "All") {
//       filtered = filtered.filter((p) => p.projectType === selectedCategory);
//     }

//     if (selectedSort === "Highest ROI") {
//       filtered.sort((a, b) => b.riskLevel.localeCompare(a.riskLevel));
//     } else if (selectedSort === "Most Funded") {
//       filtered.sort((a, b) => b.currAmount / b.targetAmount - a.currAmount / a.targetAmount);
//     }

//     setFilteredProjects([...filtered]);
//   };

//   const openInvestmentForm = (project: Project) => {
//     setSelectedProject(project);
//     setUserName("");
//     setEmail("");
//     setBuyRate(project.currRate);
//     setUnits(0);
//     setInvestmentDate("");
//     setStatus("PENDING");
//     setInvestmentFormOpen(true);
//   };

//   const closeInvestmentForm = () => {
//     setInvestmentFormOpen(false);
//     setSelectedProject(null);
//   };

//   const submitInvestmentForm = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
  
//     if (!selectedProject) {
//       console.error("No project selected for investment.");
//       return;
//     }
    
//     const projectedAmount = selectedProject.currAmount + totalAmount;
//     if (projectedAmount > selectedProject.targetAmount) {
//       alert(
//         `Investment exceeds the target amount! Current funding: $${selectedProject.currAmount.toLocaleString()}, Target: $${selectedProject.targetAmount.toLocaleString()}, Your investment: $${totalAmount.toLocaleString()}`
//       );
//       return;
//     }
    
//     const formattedDate = new Date(investmentDate).toISOString();
//     const investmentData = {
//       user: {
//         email,
//         userName,
//       },
//       buyRate,
//       units,
//       totalAmount,
//       investmentDate: formattedDate,
//       status,
//     };
  
//     try {
//       const response = await submitInvestment(selectedProject.projectId, investmentData);
//       alert("Investment submitted successfully!");
//       closeInvestmentForm();
//     } catch (error) {
//       console.error("Error submitting investment:", error);
//       alert("Failed to submit investment. Please try again.");
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-900 via-blue-800 to-blue-600 p-10 relative overflow-hidden">
//       <div className="absolute inset-0 bg-[url('/water-texture.png')] bg-cover bg-center opacity-30"></div>
      
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-7xl rounded-3xl bg-blue-900/40 backdrop-blur-xl p-10 shadow-2xl border border-blue-400/20 relative z-10"
//       >
//         <h1 className="text-4xl font-extrabold text-green-300 text-center mb-8 drop-shadow-lg tracking-wide">Browse Investment Projects</h1>
        
//         <div className="grid grid-cols-4 gap-6">

//           {/* Projects List */}
//           <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {loading ? (
//               <p className="text-white text-lg col-span-3 text-center">Loading projects...</p>
//             ) : error ? (
//               <p className="text-red-400 text-lg col-span-3 text-center">{error}</p>
//             ) : (
//               filteredProjects.map((project) => (
//                 <motion.div
//                   key={project.projectId}
//                   whileHover={{ y: -5, boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.2)" }}
//                   className="rounded-2xl bg-blue-900/40 backdrop-blur-xl p-6 shadow-lg border border-blue-400/20 text-white"
//                 >
//                   <h2 className="text-xl font-bold text-green-300 drop-shadow-lg mb-2">{project.projectName}</h2>
//                   <p className="text-green-200 mb-1">{project.projectType}</p>
//                   <p className="mb-1">Risk Level: <span className="font-semibold">{project.riskLevel}</span></p>
//                   <p className="mb-1">Location: {project.location}</p>
//                   <p className="mb-1">Target: <span className="font-semibold">${project.targetAmount.toLocaleString()}</span></p>
//                   <p className="mb-1">Current: <span className="font-semibold">${project.currAmount.toLocaleString()}</span></p>
//                   <p className="mb-3">Rate: <span className="font-semibold">${project.currRate.toLocaleString()}</span></p>
                  
//                   <div className="w-full bg-blue-800/30 rounded-full h-2 mb-1">
//                     <div
//                       className="bg-blue-500 h-2 rounded-full"
//                       style={{ width: `${(project.currAmount / project.targetAmount) * 100}%` }}
//                     ></div>
//                   </div>
//                   <p className="text-sm text-green-200 mb-4">Funding: {((project.currAmount / project.targetAmount) * 100).toFixed(2)}%</p>
                  
//                   <div className="flex justify-between">
                   
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => openInvestmentForm(project)}
//                       className="rounded-xl px-4 py-2 text-white font-semibold shadow-md bg-green-600 hover:bg-green-700"
//                     >
//                       Invest
//                     </motion.button>
//                   </div>
//                 </motion.div>
//               ))
//             )}
//           </div>
//         </div>
//       </motion.div>

//       {/* Investment Form Modal */}
//       {investmentFormOpen && selectedProject && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-20 backdrop-blur-sm">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="w-full max-w-md rounded-3xl bg-blue-900/40 backdrop-blur-xl p-8 shadow-2xl border border-blue-400/20 relative z-30"
//           >
//             <h2 className="text-2xl font-bold text-green-300 mb-6">Invest in {selectedProject.projectName}</h2>
            
//             <form onSubmit={submitInvestmentForm} className="space-y-4">
//               <div>
//                 <label className="block mb-2 text-green-200 font-semibold">User Name</label>
//                 <input
//                   type="text"
//                   value={userName}
//                   onChange={(e) => setUserName(e.target.value)}
//                   required
//                   className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
//                 />
//               </div>
              
//               <div>
//                 <label className="block mb-2 text-green-200 font-semibold">User Email</label>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
//                 />
//               </div>
              
//               <div>
//                 <label className="block mb-2 text-green-200 font-semibold">Buy Rate</label>
//                 <input
//                   type="number"
//                   value={buyRate}
//                   readOnly
//                   className="w-full rounded-xl bg-gray-700 text-white px-4 py-3 border border-green-500/40 focus:outline-none shadow-md"
//                 />
//               </div>
              
//               <div>
//                 <label className="block mb-2 text-green-200 font-semibold">Units</label>
//                 <input
//                   type="number"
//                   value={units}
//                   onChange={(e) => setUnits(Number(e.target.value))}
//                   required
//                   className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
//                 />
//               </div>
              
//               <div>
//                 <label className="block mb-2 text-green-200 font-semibold">Total Amount</label>
//                 <input
//                   type="number"
//                   value={totalAmount}
//                   readOnly
//                   className="w-full rounded-xl bg-gray-700 text-white px-4 py-3 border border-green-500/40 focus:outline-none shadow-md"
//                 />
//               </div>
              
//               <div>
//                 <label className="block mb-2 text-green-200 font-semibold">Investment Date</label>
//                 <input
//                   type="date"
//                   value={investmentDate}
//                   onChange={(e) => setInvestmentDate(e.target.value)}
//                   required
//                   className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
//                 />
//               </div>
              
//               <div>
//                 <label className="block mb-2 text-green-200 font-semibold">Status</label>
//                 <select
//                   value={status}
//                   onChange={(e) => setStatus(e.target.value)}
//                   required
//                   className="w-full rounded-xl bg-blue-800/50 text-white px-4 py-3 border border-green-500/40 focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
//                 >
//                   <option value="PENDING">Pending</option>
//                   <option value="APPROVED">Approved</option>
//                   <option value="REJECTED">Rejected</option>
//                 </select>
//               </div>
              
//               <div className="flex justify-end space-x-4 pt-4">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   type="button"
//                   onClick={closeInvestmentForm}
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
//                   Confirm Investment
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
