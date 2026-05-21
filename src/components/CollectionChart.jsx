import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { BarChart3, PieChart as PieIcon, Coins, TrendingUp } from "lucide-react";

function CollectionChart({ data }) {
  const [activeTab, setActiveTab] = useState("statuses"); // 'statuses' | 'revenue' | 'share'

  // Pre-calculate all chart data from raw data
  const { statusData, revenueData, shareData } = useMemo(() => {
    const citiesMap = {};

    // Initialize map with all 10 cities
    const targetCities = [
      "Delhi", "Mumbai", "Pune", "Bengaluru", "Chennai", 
      "Hyderabad", "Ahmedabad", "Kolkata", "Jaipur", "Lucknow"
    ];

    targetCities.forEach(city => {
      citiesMap[city] = {
        city,
        Approved: 0,
        Pending: 0,
        Rejected: 0,
        collection: 0,
        properties: 0
      };
    });

    data.forEach((item) => {
      const city = item.tenant;
      if (citiesMap[city]) {
        citiesMap[city].properties += 1;
        citiesMap[city].collection += item.collection_inr;
        
        if (item.status === "Approved") {
          citiesMap[city].Approved += 1;
        } else if (item.status === "Pending") {
          citiesMap[city].Pending += 1;
        } else if (item.status === "Rejected") {
          citiesMap[city].Rejected += 1;
        }
      }
    });

    const list = Object.values(citiesMap);

    return {
      statusData: list,
      revenueData: list.map(item => ({
        city: item.city,
        collection: parseFloat(item.collection.toFixed(2))
      })).sort((a, b) => b.collection - a.collection), // Sort by revenue descending
      shareData: list.map(item => ({
        name: item.city,
        value: item.properties
      }))
    };
  }, [data]);

  // Color Palette for Pie Slices
  const COLORS = [
    "#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#ec4899", 
    "#14b8a6", "#ef4444", "#f97316", "#06b6d4", "#a855f7"
  ];

  // Custom Tooltip component for better visual integration
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0f172a]/95 border border-white/10 p-3 rounded-xl shadow-2xl backdrop-blur-md">
          <p className="text-xs text-slate-400 font-bold mb-1.5 uppercase tracking-wider">{label}</p>
          <div className="flex flex-col gap-1">
            {payload.map((pld, index) => (
              <div key={index} className="flex items-center gap-4 text-xs justify-between">
                <span className="flex items-center gap-1.5 font-medium" style={{ color: pld.color || pld.fill }}>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: pld.color || pld.fill }} />
                  {pld.name}:
                </span>
                <span className="font-extrabold text-white">
                  {pld.name.includes("Collection") || pld.name === "collection"
                    ? `₹${pld.value.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`
                    : pld.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom Pie Chart Tooltip
  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0];
      return (
        <div className="bg-[#0f172a]/95 border border-white/10 p-3 rounded-xl shadow-2xl backdrop-blur-md">
          <p className="text-xs text-slate-400 font-bold mb-1 uppercase tracking-wider">{dataPoint.name}</p>
          <div className="flex items-center gap-4 text-xs justify-between mt-1">
            <span className="text-blue-400 font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              Properties:
            </span>
            <span className="font-extrabold text-white">{dataPoint.value}</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">
            Share: {((dataPoint.value / 1000) * 100).toFixed(1)}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col flex-grow">
      
      {/* Charts Header with Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-5 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-400" /> Inter-Tenant Comparison Insights
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Analyze registrations, statuses, and collection statistics across all 10 cities.
          </p>
        </div>
        
        {/* elegant tab switcher buttons */}
        <div className="flex bg-slate-900/60 p-1.5 rounded-xl border border-white/5 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab("statuses")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "statuses"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" /> Statuses
          </button>
          <button
            onClick={() => setActiveTab("revenue")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "revenue"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Coins className="w-3.5 h-3.5" /> Collection
          </button>
          <button
            onClick={() => setActiveTab("share")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "share"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <PieIcon className="w-3.5 h-3.5" /> Share
          </button>
        </div>
      </div>

      {/* Main Chart Viewer */}
      <div className="flex-1 w-full min-h-[360px] flex items-center justify-center">
        {activeTab === "statuses" && (
          <ResponsiveContainer width="100%" height={380}>
            <BarChart data={statusData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" vertical={false} />
              <XAxis 
                dataKey="city" 
                stroke="#64748b" 
                fontSize={11} 
                fontWeight={600} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis 
                stroke="#64748b" 
                fontSize={11} 
                fontWeight={600} 
                tickLine={false} 
                axisLine={false} 
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.02)" }} />
              <Legend 
                verticalAlign="top" 
                height={36} 
                iconType="circle" 
                iconSize={8}
                wrapperStyle={{ fontSize: 12, fontWeight: 600, color: "#94a3b8" }} 
              />
              <Bar dataKey="Approved" fill="#10b981" radius={[4, 4, 0, 0]} name="Approved" barSize={12} />
              <Bar dataKey="Pending" fill="#f97316" radius={[4, 4, 0, 0]} name="Pending" barSize={12} />
              <Bar dataKey="Rejected" fill="#ef4444" radius={[4, 4, 0, 0]} name="Rejected" barSize={12} />
            </BarChart>
          </ResponsiveContainer>
        )}

        {activeTab === "revenue" && (
          <ResponsiveContainer width="100%" height={380}>
            <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.85} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" vertical={false} />
              <XAxis 
                dataKey="city" 
                stroke="#64748b" 
                fontSize={11} 
                fontWeight={600} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis 
                stroke="#64748b" 
                fontSize={11} 
                fontWeight={600} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(val) => `₹${(val / 100000).toFixed(1)}L`} 
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.02)" }} />
              <Legend 
                verticalAlign="top" 
                height={36} 
                iconType="circle" 
                iconSize={8}
                wrapperStyle={{ fontSize: 12, fontWeight: 600, color: "#94a3b8" }} 
              />
              <Bar 
                dataKey="collection" 
                fill="url(#revenueGlow)" 
                stroke="#3b82f6" 
                strokeWidth={1.5}
                radius={[6, 6, 0, 0]} 
                name="Total Collection (INR)" 
                barSize={24} 
              />
            </BarChart>
          </ResponsiveContainer>
        )}

        {activeTab === "share" && (
          <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8 py-4">
            <div className="w-full md:w-1/2 h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip content={<CustomPieTooltip />} />
                  <Pie
                    data={shareData}
                    cx="50%"
                    cy="50%"
                    innerRadius={75}
                    outerRadius={105}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {shareData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full md:w-1/2 grid grid-cols-2 gap-3 max-w-sm">
              {shareData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <span 
                    className="w-3 h-3 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }} 
                  />
                  <span className="text-xs text-slate-300 font-semibold">{entry.name}</span>
                  <span className="text-[10px] text-slate-500 font-medium">({entry.value})</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Footer Info Text */}
      <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-slate-500 flex justify-between items-center">
        <span>* Data represents all 10 tenants (1,000 properties total)</span>
        <span className="text-blue-500/70 font-semibold tracking-wide">UPYOG ANALYTICS HUB</span>
      </div>
    </div>
  );
}

export default CollectionChart;