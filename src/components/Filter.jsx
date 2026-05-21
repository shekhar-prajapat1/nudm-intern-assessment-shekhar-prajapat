import { MapPin } from "lucide-react";

function Filter({ cities, selectedCity, setSelectedCity }) {
  return (
    <div className="relative flex items-center w-full sm:w-auto">
      <div className="absolute left-3.5 pointer-events-none text-blue-400">
        <MapPin className="w-5 h-5" />
      </div>
      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        className="w-full sm:w-56 pl-11 pr-10 py-3 bg-[#0d1527] border border-white/10 hover:border-blue-500/50 focus:border-blue-500 rounded-xl text-slate-200 text-sm font-semibold shadow-lg shadow-black/30 appearance-none focus:outline-none transition-all cursor-pointer"
      >
        <option value="All" className="bg-[#0b0f19] text-slate-200 font-semibold">
          All Tenants (Cities)
        </option>
        {cities.map((city) => (
          <option key={city} value={city} className="bg-[#0b0f19] text-slate-200">
            {city}
          </option>
        ))}
      </select>
      <div className="absolute right-3.5 pointer-events-none flex items-center text-slate-400">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}

export default Filter;