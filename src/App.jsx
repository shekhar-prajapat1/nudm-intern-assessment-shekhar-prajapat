import { useState, useMemo, useEffect } from "react";
import data from "./data/properties.json";

import Filter from "./components/Filter";
import KPIcards from "./components/KPIcards";
import CollectionChart from "./components/CollectionChart";
import Chatbot from "./components/Chatbot";
import PropertyTable from "./components/PropertyTable";

import { 
  Building2, 
  MapPin, 
  TrendingUp, 
  Layers, 
  Percent, 
  IndianRupee,
  Activity,
  Sparkles,
  Info
} from "lucide-react";

function App() {
  const [selectedCity, setSelectedCity] = useState("All");
  const [currentTime, setCurrentTime] = useState(new Date());

  // Keep a running clock for aesthetic premium feel
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const cities = useMemo(() => {
    return [...new Set(data.map((item) => item.tenant))].sort();
  }, []);

  const filteredData = useMemo(() => {
    return selectedCity === "All"
      ? data
      : data.filter((item) => item.tenant === selectedCity);
  }, [selectedCity]);

  // Precompute advanced stats for selected city / context
  const cityMetrics = useMemo(() => {
    const total = filteredData.length;
    if (total === 0) return null;

    let totalAnnualTax = 0;
    let totalCollection = 0;
    let totalArea = 0;
    let totalFloors = 0;
    
    filteredData.forEach((item) => {
      totalAnnualTax += item.annual_tax_inr;
      totalCollection += item.collection_inr;
      totalArea += item.area_sqft;
      totalFloors += item.floor_count;
    });

    const outstandingTax = totalAnnualTax - totalCollection;
    const efficiency = totalAnnualTax > 0 ? (totalCollection / totalAnnualTax) * 100 : 0;
    const avgArea = totalArea / total;
    const avgFloors = totalFloors / total;

    return {
      outstandingTax,
      efficiency,
      avgArea,
      avgFloors,
      totalAnnualTax
    };
  }, [filteredData]);

  return (
    <div className="bg-[#080c14] text-[#e2e8f0] min-h-screen font-sans selection:bg-blue-600 selection:text-white pb-20">
      
      {/* Dynamic Grid Background Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* Decorative Glow Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8">
        
        {/* Modern Header Component */}
        <header className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/5 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-extrabold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                  UPYOG Platform
                </span>
                <span className="text-xs uppercase tracking-wider font-extrabold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Multi-Tenant
                </span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent mt-1">
                Property Tax Analytics Console
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 md:self-end">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs text-slate-400 font-medium">System Local Time</span>
              <span className="text-sm font-semibold text-slate-200 tracking-wide mt-0.5">
                {currentTime.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}{" "}
                — {currentTime.toLocaleTimeString("en-US", { hour12: true })}
              </span>
            </div>
            <div className="h-10 w-[1px] bg-white/10 hidden sm:block mx-2" />
            <div className="flex items-center gap-2 bg-slate-800/40 border border-white/5 px-3 py-1.5 rounded-xl text-xs font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 glow-active animate-pulse" />
              <span>10 Cities Active</span>
            </div>
          </div>
        </header>

        {/* Filters and Control Area */}
        <section className="glass-panel p-6 rounded-2xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-white/5">
          <div className="flex flex-col gap-1 max-w-md">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-400" /> Tenant Operations Filter
            </h2>
            <p className="text-sm text-slate-400">
              Select an Indian city acting as an independent tenant. All metrics, KPIs, and records update live.
            </p>
          </div>
          <div className="flex items-center gap-4 self-start md:self-auto w-full md:w-auto">
            <Filter
              cities={cities}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
            />
          </div>
        </section>

        {/* Main Stats KPIs Grid */}
        <section className="mb-8">
          <KPIcards filteredData={filteredData} />
        </section>

        {/* Selected City Insights Panel */}
        {cityMetrics && (
          <section className="glass-panel p-6 rounded-2xl mb-8 border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Activity className="w-40 h-40 text-blue-500" />
            </div>
            
            <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-3">
              <Info className="w-5 h-5 text-indigo-400" />
              <h3 className="text-md font-bold text-white tracking-wide">
                Deep Insights — {selectedCity === "All" ? "All Tenant Aggregates" : `${selectedCity} Tenant Profile`}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="flex flex-col gap-1 bg-slate-900/30 p-4 rounded-xl border border-white/5">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1">
                  <Percent className="w-3.5 h-3.5 text-emerald-400" /> Collection Efficiency
                </span>
                <span className="text-2xl font-bold text-emerald-400 mt-1">
                  {cityMetrics.efficiency.toFixed(2)}%
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Percentage of annual property tax collected successfully
                </p>
              </div>

              <div className="flex flex-col gap-1 bg-slate-900/30 p-4 rounded-xl border border-white/5">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1">
                  <IndianRupee className="w-3.5 h-3.5 text-rose-400" /> Outstanding Arrears
                </span>
                <span className="text-2xl font-bold text-rose-400 mt-1">
                  ₹{cityMetrics.outstandingTax.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Outstanding balance representing pending & rejected properties
                </p>
              </div>

              <div className="flex flex-col gap-1 bg-slate-900/30 p-4 rounded-xl border border-white/5">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-blue-400" /> Average Built Area
                </span>
                <span className="text-2xl font-bold text-blue-400 mt-1">
                  {cityMetrics.avgArea.toFixed(0)} <span className="text-sm font-normal text-slate-400">sqft</span>
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Average structural square footage across registrations
                </p>
              </div>

              <div className="flex flex-col gap-1 bg-slate-900/30 p-4 rounded-xl border border-white/5">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-indigo-400" /> Average Floors
                </span>
                <span className="text-2xl font-bold text-indigo-400 mt-1">
                  {cityMetrics.avgFloors.toFixed(1)} <span className="text-sm font-normal text-slate-400">floors</span>
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Average structural height of registered properties
                </p>
              </div>

            </div>
          </section>
        )}

        {/* Charts and AI Chatbox row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          
          {/* Main Visualizations Column */}
          <div className="lg:col-span-2 flex flex-col">
            <CollectionChart data={data} />
          </div>

          {/* AI Chatbot Assistant Column */}
          <div className="lg:col-span-1 flex flex-col">
            <Chatbot data={data} selectedCity={selectedCity} />
          </div>

        </div>

        {/* Granular Property Data Explorer */}
        <section className="mb-8">
          <PropertyTable properties={filteredData} selectedCity={selectedCity} />
        </section>

      </div>
    </div>
  );
}

export default App;