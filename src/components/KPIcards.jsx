import { 
  Layers, 
  CheckCircle2, 
  XCircle, 
  IndianRupee 
} from "lucide-react";

function KPIcards({ filteredData }) {
  const totalProperties = filteredData.length;

  const approved = filteredData.filter(
    (item) => item.status === "Approved"
  ).length;

  const rejected = filteredData.filter(
    (item) => item.status === "Rejected"
  ).length;

  const totalCollection = filteredData.reduce(
    (sum, item) => sum + item.collection_inr,
    0
  );

  const cards = [
    {
      title: "Total Properties Registered",
      value: totalProperties.toLocaleString("en-IN"),
      icon: Layers,
      colorClass: "glass-card-blue text-blue-400 bg-blue-500/10",
      glowColor: "group-hover:shadow-blue-500/10",
      description: "Aggregated registered records",
    },
    {
      title: "Total Properties Approved",
      value: approved.toLocaleString("en-IN"),
      icon: CheckCircle2,
      colorClass: "glass-card-green text-emerald-400 bg-emerald-500/10",
      glowColor: "group-hover:shadow-emerald-500/10",
      description: "Approved & collection-ready",
    },
    {
      title: "Total Properties Rejected",
      value: rejected.toLocaleString("en-IN"),
      icon: XCircle,
      colorClass: "glass-card-red text-rose-400 bg-rose-500/10",
      glowColor: "group-hover:shadow-rose-500/10",
      description: "Rejected application records",
    },
    {
      title: "Total Collection (Rs.)",
      value: `₹${totalCollection.toLocaleString("en-IN", {
        maximumFractionDigits: 2,
      })}`,
      icon: IndianRupee,
      colorClass: "glass-card-purple text-violet-400 bg-violet-500/10",
      glowColor: "group-hover:shadow-violet-500/10",
      description: "Sum of actual property collections",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const IconComponent = card.icon;
        return (
          <div
            key={index}
            className={`glass-panel-interactive ${card.colorClass} group p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-slate-400 text-xs uppercase tracking-wider font-bold">
                  {card.title}
                </h3>
                <p className="text-3xl font-extrabold text-white mt-2 tracking-tight">
                  {card.value}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 group-hover:scale-110 transition-transform duration-300">
                <IconComponent className="w-6 h-6" />
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium">
                {card.description}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70 group-hover:animate-ping" />
            </div>

            {/* Glowing card overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-300 bg-gradient-to-tr from-transparent via-current to-white/10" />
          </div>
        );
      })}
    </div>
  );
}

export default KPIcards;