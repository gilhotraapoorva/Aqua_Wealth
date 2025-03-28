

"use client";

import { Metadata } from "next";
import { PlusCircle, Search } from "lucide-react";
import "../../styles/globals.css";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Sidebar } from "@/components/sidebar";
import { personalizedInvestments } from "@/data/WaterInvestmentAlbum";
import { useRouter } from "next/navigation";  // <-- New import
import ChatbotWidget from "@/components/ChatbotWidget";
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
  const router = useRouter();  // <-- Get router instance

  // Use the service categories data in place of featured investments
  const serviceCategories: InvestmentItem[] = [
    {
      // Smart Water Insurance flip card
      name: "Smart Water Insurance",
      description: "Protect your crops from climate risks.",
      // backTitle: "Insurance",
      // backDescription: "Manage your insurance options",
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
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-white/70" />
            <input
              type="text"
              placeholder="Search investments, projects..."
              className="pl-10 pr-4 py-2 bg-white/20 text-white rounded-full border border-white/30 focus:ring-2 focus:ring-[#00C6FF] outline-none"
            />
          </div>
          {/* <Button className="bg-[#00C6FF] hover:bg-[#0072FF] transition-all shadow-lg shadow-cyan-500/50">
            Start Investing
          </Button> */}
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
              {/* Tabs Navigation */}
              <div className="flex items-center justify-between">
                <TabsList className="glassmorphic px-6 py-2 rounded-lg">
                  <TabsTrigger value="investments">Home</TabsTrigger>
                  {/* <TabsTrigger value="market-insights">Market Insights</TabsTrigger> */}
                  {/* <TabsTrigger value="live-prices" disabled>
                    Live Prices
                  </TabsTrigger> */}
                </TabsList>
                {/* <Button className="bg-[#00C6FF] hover:bg-[#0072FF] transition-all shadow-lg shadow-cyan-500/50">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Investment
                </Button> */}
              </div>

              {/* Investment Plans */}
              <TabsContent value="investments" className="border-none p-0 outline-none">
                {/* Replace Featured Investments with service categories */}
                <Section
                  title="Featured Investments"
                  description="Explore top-performing investment opportunities."
                  data={serviceCategories}
                />
                <Section
                  title="Personalized For You"
                  description="Tailored investment options based on your preferences."
                  data={personalizedInvestments}
                />
              </TabsContent>

              {/* Other Tabs (Market Insights, Live Prices, etc.) */}
              {/* <TabsContent value="market-insights">
                <p>Market Insights content goes here.</p>
              </TabsContent> */}
               <ChatbotWidget />
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------
   Reusable Section Component
   ---------------------------------------
   Renders a titled section containing 
   multiple flip-cards.
*/
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
   ---------------------------------------
   Individual card that flips when clicked.
*/
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
