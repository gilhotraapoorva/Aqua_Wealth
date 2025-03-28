
"use client";

import { Metadata } from "next";
import { PlusCircle, Search, LogIn } from "lucide-react";
import "../../styles/globals.css";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Sidebar } from "@/components/sidebar";
import { personalizedInvestments } from "@/data/WaterInvestmentAlbum";
import { useRouter } from "next/navigation";
import ChatbotWidget from "@/components/ChatbotWidget";
import LoginForm from "@/components/LoginForm";
import { useUser } from "@/Context/UserContext"; // Import UserContext

// Extend the interface to include back face properties
interface InvestmentItem {
  name: string;
  description: string;
  backTitle?: string;
  backDescription?: string;
  actions?: {
    label: string;
    onClick: () => void;
  }[];
}

export default function InvestmentDashboard() {
  const router = useRouter();
  const { user, setUser } = useUser(); // Access global user context
  const [showLogin, setShowLogin] = useState(false);

  const serviceCategories: InvestmentItem[] = [
    {
      name: "Smart Water Insurance",
      description: "Protect your crops from climate risks.",
      actions: [
        { label: "Apply for Insurance", onClick: () => router.push("/apply-for-insurance/form") },
        { label: "Claims & Verification", onClick: () => router.push("/claims") },
      ],
    },
    {
      name: "Investments",
      description: "Explore and manage your investments",
      actions: [
        { label: "Browse Projects", onClick: () => router.push("/investments/browse-projects") },
        { label: "Risk Filter", onClick: () => router.push("/investments/risk-filter") },
        { label: "My Investments", onClick: () => router.push("/investments/my-investments") },
      ],
    },
    {
      name: "Micro-Loans",
      description: "Manage your micro-loans easily",
      actions: [
        { label: "Apply for Loan", onClick: () => router.push("/micro-loans/apply") },
        { label: "Loan Status", onClick: () => router.push("/micro-loans/status") },
        { label: "Repayment History", onClick: () => router.push("/micro-loans/repayment") },
      ],
    },
    {
      name: "Water Credits",
      description: "Utilize your water credits",
      actions: [
        { label: "Usage Insights", onClick: () => router.push("/water-credits") },
        { label: "Redeem Credits", onClick: () => router.push("/water-credits/redeem") },
      ],
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0a2540] to-[#0c3b5e] text-white">
      {/* Navbar */}
      <div className="flex items-center justify-between px-6 py-4 bg-white/10 backdrop-blur-lg shadow-lg rounded-b-lg">
        <h1 className="text-2xl font-bold text-[#00C6FF] drop-shadow-lg">AquaWealth</h1>
        <div className="flex items-center space-x-4">
          {/* <div className="relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-white/70" />
            <input
              type="text"
              placeholder="Search investments, projects..."
              className="pl-10 pr-4 py-2 bg-white/20 text-white rounded-full border border-white/30 focus:ring-2 focus:ring-[#00C6FF] outline-none"
            />
          </div> */}
          {!user && (
            <Button
              onClick={() => setShowLogin(true)}
              className="bg-[#00C6FF] hover:bg-[#0072FF] transition-all shadow-lg shadow-cyan-500/50 flex items-center"
            >
              <LogIn className="h-5 w-5 mr-2" />
              Login/Register
            </Button>
          )}
          {user && (
            <Button
              onClick={() => {
                setUser(null); // Clear user data
                localStorage.removeItem("loggedIn"); // Clear persistent login state
                localStorage.removeItem("user"); // Clear user data from localStorage
              }}
              className="bg-red-500 hover:bg-red-600 transition-all shadow-lg shadow-red-500/50 flex items-center"
            >
              Logout
            </Button>
          )}
        </div>
      </div>

      <div className="border-t border-white/10 relative z-10 mt-4">
        <div className="grid lg:grid-cols-5">
          {/* Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className="col-span-3 lg:col-span-4 lg:border-l border-white/10 p-6 lg:p-12">
            <Tabs defaultValue="investments" className="space-y-6">
              <div className="flex items-center justify-between">
                {/* <TabsList className="glassmorphic px-6 py-2 rounded-lg">
                  <TabsTrigger value="investments">Home</TabsTrigger>
                </TabsList> */}
              </div>

              <TabsContent value="investments" className="border-none p-0 outline-none">
                <Section title="Featured Investments" description="Explore top-performing investment opportunities." data={serviceCategories} />
                {/* <Section title="Personalized For You" description="Tailored investment options based on your preferences." data={personalizedInvestments} /> */}
              </TabsContent>

              <ChatbotWidget />
            </Tabs>
          </div>
        </div>
      </div>
      {showLogin && <LoginForm open={showLogin} onClose={setShowLogin} />}
    </div>
  );
}

/* ---------------------------------------
   Reusable Section Component
--------------------------------------- */

interface SectionProps {
  title: string;
  description: string;
  data: InvestmentItem[];
}

function Section({ title, description, data }: SectionProps) {
  if (!data || data.length === 0) return null;

  return (
    <section className="bg-white/10 p-6 rounded-2xl backdrop-blur-lg shadow-lg">
      <h2 className="text-3xl font-bold text-[#00C6FF] drop-shadow-lg">{title}</h2>
      <p className="text-sm text-white/70">{description}</p>
      <Separator className="my-4 border-white/20" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <FlippableCard key={index} investment={item} />
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------
   FlippableCard Subcomponent
--------------------------------------- */

function FlippableCard({ investment }: { investment: InvestmentItem }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative group perspective w-full h-48 cursor-pointer"
      onClick={() => setFlipped((prev) => !prev)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front Face */}
        <div
          className="absolute w-full h-full bg-gradient-to-r from-[#021B79] to-[#0575E6] 
                     rounded-xl p-6 backface-hidden flex flex-col justify-center"
        >
          <h3 className="text-xl font-semibold text-white drop-shadow-lg">
            {investment.name}
          </h3>
          <p className="text-sm text-white/80 mt-2">{investment.description}</p>
        </div>

        {/* Back Face */}
        <div
          className="absolute w-full h-full bg-gradient-to-r from-[#0575E6] to-[#021B79] 
                     rounded-xl p-6 backface-hidden rotate-y-180 flex flex-col items-center justify-center space-y-4"
        >
          {investment.backTitle && investment.backDescription && (
            <div className="mb-4 text-center">
              <h4 className="text-lg font-semibold">{investment.backTitle}</h4>
              <p className="text-sm">{investment.backDescription}</p>
            </div>
          )}
          {investment.actions && investment.actions.length > 0 ? (
            investment.actions.map((action, idx) => (
              <Button
                key={idx}
                variant="secondary"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent flipping back on button click
                  action.onClick();
                }}
              >
                {action.label}
              </Button>
            ))
          ) : (
            <p className="text-white">No actions available</p>
          )}
        </div>
      </div>
    </div>
  );
}



// const LoginForm = ({ open, onClose }: LoginFormProps) => {
//   const { setUser } = useUser(); // Use context to store user details
//   const [governmentId, setGovernmentId] = useState("");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [userExists, setUserExists] = useState(true);

//   const checkUserExists = async () => {
//     try {
//       const response = await fetch(`http://localhost:8080/users/${governmentId}`);
//       if (response.ok) {
//         const userData = await response.json();
//         setUserExists(true);
//         setName(userData.name);
//         setEmail(userData.email);
//         return true; // User exists
//       } else {
//         setUserExists(false);
//         return false; // User does not exist
//       }
//     } catch (error) {
//       console.error("Error checking user:", error);
//       setUserExists(false);
//       return false; // Assume user does not exist on error
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     const userExists = await checkUserExists();

//     if (userExists) {
//       // User exists, proceed with login
//       const user = { name, email, governmentId };
//       setUser(user); // Store user data globally
//       localStorage.setItem("loggedIn", "true"); // Persist login state
//       localStorage.setItem("user", JSON.stringify(user)); // Persist user data
//       onClose(false);
//     } else {
//       // User does not exist, prompt to register
//       alert("User does not exist. Please register first.");
//       setUserExists(false); // Switch to registration mode
//     }

//     setIsLoading(false);
//   };

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-[#0a2540] to-[#0c3b5e] text-white border-white/20">
//         <DialogHeader>
//           <DialogTitle className="text-2xl font-bold text-[#00C6FF]">
//             {userExists ? "Login to AquaWealth" : "Register for AquaWealth"}
//           </DialogTitle>
//           <DialogDescription className="text-white/70">
//             {userExists ? "Enter your credentials to access your account" : "Fill in your details to create an account"}
//           </DialogDescription>
//         </DialogHeader>
//         <form onSubmit={handleSubmit}>
//           <div className="grid gap-4 py-4">
//             <div className="grid gap-2">
//               <Label htmlFor="governmentId" className="text-white">Government ID</Label>
//               <Input
//                 id="governmentId"
//                 type="text"
//                 value={governmentId}
//                 onChange={(e) => setGovernmentId(e.target.value)}
//                 className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
//                 placeholder="Enter your Government ID"
//                 required
//               />
//             </div>

//             {!userExists && ( // Show Name field only during registration
//               <div className="grid gap-2">
//                 <Label htmlFor="name" className="text-white">Full Name</Label>
//                 <Input
//                   id="name"
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
//                   placeholder="Your Full Name"
//                   required
//                 />
//               </div>
//             )}

//             <div className="grid gap-2">
//               <Label htmlFor="email" className="text-white">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
//                 placeholder="you@example.com"
//                 required
//               />
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="password" className="text-white">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
//                 required
//               />
//             </div>
//           </div>

//           <div className="flex justify-between">
//             {userExists && (
//               <Button type="button" variant="link" className="text-[#00C6FF] px-0">
//                 Forgot password?
//               </Button>
//             )}
//             <Button type="submit" className="bg-[#00C6FF] hover:bg-[#0072FF] transition-all shadow-lg shadow-cyan-500/50" disabled={isLoading}>
//               {isLoading ? "Processing..." : userExists ? "Login" : "Register"}
//             </Button>
//           </div>

//           {userExists ? (
//             <div className="text-center mt-4">
//               <p className="text-white/70">Don't have an account?</p>
//               <Button onClick={() => setUserExists(false)} className="bg-[#00C6FF] hover:bg-[#0072FF]">
//                 Register
//               </Button>
//             </div>
//           ) : (
//             <div className="text-center mt-4">
//               <p className="text-white/70">Already have an account?</p>
//               <Button onClick={() => setUserExists(true)} className="bg-[#00C6FF] hover:bg-[#0072FF]">
//                 Login
//               </Button>
//             </div>
//           )}
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default LoginForm;

