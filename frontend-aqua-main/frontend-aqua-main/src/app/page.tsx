import { Metadata } from "next";
import { PlusCircle, Search } from "lucide-react";
import "../../styles/globals.css";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Menu } from "../components/menu";
import { Sidebar } from "../components/sidebar";
import { featuredInvestments, personalizedInvestments } from "../data/WaterInvestmentAlbum";

export const metadata: Metadata = {
  title: "AquaWealth Investment Dashboard",
  description: "Invest smartly with AquaWealth",
};

export default function InvestmentDashboard() {
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
          <Button className="bg-[#00C6FF] hover:bg-[#0072FF] transition-all shadow-lg shadow-cyan-500/50">
            Start Investing
          </Button>
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
              {/* Tab Navigation */}
              <div className="flex items-center justify-between">
                <TabsList className="glassmorphic px-6 py-2 rounded-lg">
                  <TabsTrigger value="investments">Investment Plans</TabsTrigger>
                  <TabsTrigger value="market-insights">Market Insights</TabsTrigger>
                  <TabsTrigger value="live-prices" disabled>
                    Live Prices
                  </TabsTrigger>
                </TabsList>
                <Button className="bg-[#00C6FF] hover:bg-[#0072FF] transition-all shadow-lg shadow-cyan-500/50">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Investment
                </Button>
              </div>

              {/* Investment Plans */}
              <TabsContent value="investments" className="border-none p-0 outline-none">
                <Section title="Featured Investments" description="Explore top-performing investment opportunities." data={featuredInvestments} />
                <Section title="Personalized For You" description="Tailored investment options based on your preferences." data={personalizedInvestments} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Reusable Section Component */
interface SectionProps {
  title: string;
  description: string;
  data: any[];
}

function Section({ title, description, data }: SectionProps) {
  if (!data || data.length === 0) return null;

  return (
    <section className="bg-white/10 p-6 rounded-2xl backdrop-blur-lg shadow-lg">
      <h2 className="text-3xl font-bold text-[#00C6FF] drop-shadow-lg">{title}</h2>
      <p className="text-sm text-white/70">{description}</p>
      <Separator className="my-4 border-white/20" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.map((investment, index) => (
          <div key={investment.name || index} className="bg-gradient-to-r from-[#021B79] to-[#0575E6] p-6 rounded-xl shadow-lg transform transition-all hover:scale-105 hover:shadow-cyan-500/50">
            <h3 className="text-xl font-semibold text-white drop-shadow-lg">{investment.name}</h3>
            <p className="text-sm text-white/80 mt-2">{investment.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}