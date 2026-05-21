import { useState, useMemo } from "react";
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpDown,
  Filter as FilterIcon,
  Eye,
  X,
  FileText,
  User,
  MapPin,
  Calendar,
  Building,
  Layers,
  IndianRupee,
  Activity,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";

function PropertyTable({ properties, selectedCity }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' | 'desc'
  const [selectedProperty, setSelectedProperty] = useState(null);

  const itemsPerPage = 8;

  // Reset pagination when selection or filter changes
  useMemo(() => {
    setCurrentPage(1);
  }, [selectedCity, searchTerm, statusFilter, typeFilter]);

  // Handle columns sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Extract unique property types in current selection
  const propertyTypes = useMemo(() => {
    return [...new Set(properties.map(item => item.property_type))].sort();
  }, [properties]);

  // Apply filters, search, and sorting
  const processedProperties = useMemo(() => {
    let result = [...properties];

    // 1. Apply search term (Owner Name, Address, ID)
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          item.owner_name.toLowerCase().includes(term) ||
          item.address.toLowerCase().includes(term) ||
          item.property_id.toLowerCase().includes(term)
      );
    }

    // 2. Apply status filter
    if (statusFilter !== "All") {
      result = result.filter((item) => item.status === statusFilter);
    }

    // 3. Apply type filter
    if (typeFilter !== "All") {
      result = result.filter((item) => item.property_type === typeFilter);
    }

    // 4. Apply sorting
    if (sortField) {
      result.sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];

        // Handle string type sorting (like dates or name strings)
        if (typeof valA === "string") {
          return sortOrder === "asc"
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        }

        // Handle numbers
        return sortOrder === "asc" ? valA - valB : valB - valA;
      });
    }

    return result;
  }, [properties, searchTerm, statusFilter, typeFilter, sortField, sortOrder]);

  // Pagination bounds
  const totalPages = Math.ceil(processedProperties.length / itemsPerPage);
  const paginatedProperties = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return processedProperties.slice(start, start + itemsPerPage);
  }, [processedProperties, currentPage]);

  // Render visual status pill
  const renderStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-extrabold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            <CheckCircle className="w-3 h-3" /> Approved
          </span>
        );
      case "Rejected":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-extrabold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20">
            <XCircle className="w-3 h-3" /> Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-extrabold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20 animate-pulse">
            <AlertCircle className="w-3 h-3" /> Pending
          </span>
        );
    }
  };

  // Sort Indicator Icon
  const SortIcon = ({ field }) => {
    if (sortField !== field) return <ArrowUpDown className="w-3.5 h-3.5 opacity-30 group-hover:opacity-60 transition-opacity ml-1.5" />;
    return (
      <span className="ml-1.5 text-blue-400 font-extrabold">
        {sortOrder === "asc" ? "▲" : "▼"}
      </span>
    );
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/5 relative">
      
      {/* Table Title and Filters Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5 border-b border-white/5 pb-5 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" /> Property Registry Explorer
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Displaying registered property records of independent tenant: <span className="text-blue-400 font-bold">{selectedCity === "All" ? "All Cities" : selectedCity}</span>. Click on any record to view deep structural credentials.
          </p>
        </div>

        {/* Inputs and Dropdowns bar */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Search box */}
          <div className="relative w-full sm:w-60">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search Owner, ID, Address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0d1527] border border-white/10 focus:border-blue-500 text-slate-200 placeholder-slate-500 px-9 py-2 rounded-xl text-xs outline-none transition-all"
            />
          </div>

          {/* Status filter dropdown */}
          <div className="relative w-full sm:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-36 bg-[#0d1527] border border-white/10 focus:border-blue-500 text-slate-300 px-4 py-2 rounded-xl text-xs font-semibold outline-none appearance-none cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Type filter dropdown */}
          <div className="relative w-full sm:w-auto">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full sm:w-44 bg-[#0d1527] border border-white/10 focus:border-blue-500 text-slate-300 px-4 py-2 rounded-xl text-xs font-semibold outline-none appearance-none cursor-pointer"
            >
              <option value="All">All Property Types</option>
              {propertyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Main Responsive Table */}
      <div className="overflow-x-auto rounded-xl border border-white/5 bg-slate-900/10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950/45 border-b border-white/5 text-slate-400 text-[11px] uppercase tracking-wider font-extrabold">
              <th className="py-4 px-4 font-bold text-slate-300">Property ID</th>
              {selectedCity === "All" && <th className="py-4 px-4 font-bold text-slate-300">City</th>}
              <th className="py-4 px-4 font-bold text-slate-300">Owner Name</th>
              <th className="py-4 px-4 font-bold text-slate-300">Type</th>
              <th className="py-4 px-4 font-bold text-slate-300">Ward</th>
              <th 
                className="py-4 px-4 font-bold text-slate-300 cursor-pointer hover:text-white group select-none"
                onClick={() => handleSort("area_sqft")}
              >
                <div className="flex items-center">
                  Area <SortIcon field="area_sqft" />
                </div>
              </th>
              <th 
                className="py-4 px-4 font-bold text-slate-300 cursor-pointer hover:text-white group select-none"
                onClick={() => handleSort("annual_tax_inr")}
              >
                <div className="flex items-center">
                  Annual Tax <SortIcon field="annual_tax_inr" />
                </div>
              </th>
              <th 
                className="py-4 px-4 font-bold text-slate-300 cursor-pointer hover:text-white group select-none"
                onClick={() => handleSort("collection_inr")}
              >
                <div className="flex items-center">
                  Collected <SortIcon field="collection_inr" />
                </div>
              </th>
              <th className="py-4 px-4 font-bold text-slate-300">Status</th>
              <th className="py-4 px-4 text-center font-bold text-slate-300">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-xs text-slate-300 font-medium">
            {paginatedProperties.length > 0 ? (
              paginatedProperties.map((property) => (
                <tr 
                  key={property.property_id}
                  className="hover:bg-white/5 transition-all duration-150 group cursor-pointer"
                  onClick={() => setSelectedProperty(property)}
                >
                  <td className="py-3.5 px-4 font-bold text-white group-hover:text-blue-400 transition-colors">
                    {property.property_id}
                  </td>
                  {selectedCity === "All" && (
                    <td className="py-3.5 px-4">
                      <span className="bg-slate-800/40 border border-white/5 px-2 py-0.5 rounded text-[11px] font-semibold text-slate-300">
                        {property.tenant}
                      </span>
                    </td>
                  )}
                  <td className="py-3.5 px-4 font-semibold text-slate-200">
                    {property.owner_name}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">{property.property_type}</td>
                  <td className="py-3.5 px-4">{property.ward}</td>
                  <td className="py-3.5 px-4 font-semibold">{property.area_sqft.toLocaleString()} <span className="text-[10px] text-slate-500 font-normal">sqft</span></td>
                  <td className="py-3.5 px-4 font-bold">₹{property.annual_tax_inr.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-200">
                    {property.collection_inr > 0 ? `₹${property.collection_inr.toLocaleString("en-IN", { maximumFractionDigits: 2 })}` : <span className="text-slate-500">—</span>}
                  </td>
                  <td className="py-3.5 px-4">{renderStatusBadge(property.status)}</td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProperty(property);
                      }}
                      className="p-1.5 bg-slate-800 hover:bg-blue-600 border border-white/5 hover:border-blue-500 text-slate-400 hover:text-white rounded-lg transition-all"
                      title="View Details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td 
                  colSpan={selectedCity === "All" ? 10 : 9} 
                  className="py-12 text-center text-slate-500 text-sm font-semibold"
                >
                  No matching property records found. Try adjusting your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table Pagination footer */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-5 pt-4 border-t border-white/5 text-xs text-slate-400">
          <span>
            Showing <span className="text-white font-bold">{Math.min(processedProperties.length, (currentPage - 1) * itemsPerPage + 1)}</span> to{" "}
            <span className="text-white font-bold">{Math.min(processedProperties.length, currentPage * itemsPerPage)}</span> of{" "}
            <span className="text-white font-bold">{processedProperties.length}</span> properties
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-900 border border-white/5 text-slate-300 disabled:text-slate-600 rounded-lg transition-all disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                // Render limited pages to prevent overflow
                if (totalPages > 5 && Math.abs(currentPage - pageNumber) > 1 && pageNumber !== 1 && pageNumber !== totalPages) {
                  if (pageNumber === 2 || pageNumber === totalPages - 1) {
                    return <span key={pageNumber} className="px-1 text-slate-600">...</span>;
                  }
                  return null;
                }
                return (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`w-8 h-8 rounded-lg font-bold transition-all text-xs border ${
                      currentPage === pageNumber
                        ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/10"
                        : "bg-slate-800 border-white/5 hover:border-white/10 text-slate-300 hover:text-white"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-900 border border-white/5 text-slate-300 disabled:text-slate-600 rounded-lg transition-all disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Deep property Details Overlay Drawer Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-lg rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="p-5 bg-slate-950/40 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">UPYOG Property Credentials</h3>
                  <p className="text-[10px] text-slate-400">Official Tenant-Based Audit File</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedProperty(null)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              
              {/* ID Badge Row */}
              <div className="flex justify-between items-center bg-slate-950/30 p-4 rounded-xl border border-white/5">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Property Unique ID</span>
                  <p className="text-md font-bold text-white tracking-wide mt-0.5">{selectedProperty.property_id}</p>
                </div>
                <div>
                  {renderStatusBadge(selectedProperty.status)}
                </div>
              </div>

              {/* Grid properties */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                
                <div className="bg-slate-900/30 p-3 rounded-lg border border-white/5 flex items-center gap-3">
                  <div className="p-2 rounded bg-blue-500/10 text-blue-400"><User className="w-4 h-4" /></div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold block">OWNER NAME</span>
                    <span className="font-semibold text-slate-200 mt-0.5 block">{selectedProperty.owner_name}</span>
                  </div>
                </div>

                <div className="bg-slate-900/30 p-3 rounded-lg border border-white/5 flex items-center gap-3">
                  <div className="p-2 rounded bg-indigo-500/10 text-indigo-400"><MapPin className="w-4 h-4" /></div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold block">WARD / TENANT</span>
                    <span className="font-semibold text-slate-200 mt-0.5 block">{selectedProperty.tenant} • {selectedProperty.ward}</span>
                  </div>
                </div>

                <div className="bg-slate-900/30 p-3 rounded-lg border border-white/5 flex items-center gap-3">
                  <div className="p-2 rounded bg-purple-500/10 text-purple-400"><Activity className="w-4 h-4" /></div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold block">PROPERTY TYPE</span>
                    <span className="font-semibold text-slate-200 mt-0.5 block">{selectedProperty.property_type}</span>
                  </div>
                </div>

                <div className="bg-slate-900/30 p-3 rounded-lg border border-white/5 flex items-center gap-3">
                  <div className="p-2 rounded bg-violet-500/10 text-violet-400"><Layers className="w-4 h-4" /></div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold block">HEIGHT PROFILE</span>
                    <span className="font-semibold text-slate-200 mt-0.5 block">{selectedProperty.floor_count} Floor(s) • {selectedProperty.area_sqft.toLocaleString()} sqft</span>
                  </div>
                </div>

              </div>

              {/* Street Address */}
              <div className="bg-slate-900/30 p-3.5 rounded-lg border border-white/5 text-xs">
                <span className="text-[10px] text-slate-500 font-bold block">REGISTRATION ADDRESS</span>
                <span className="font-semibold text-slate-200 mt-1 block leading-relaxed">{selectedProperty.address}</span>
              </div>

              {/* Tax collection card details */}
              <div className="bg-slate-950/40 p-4 rounded-xl border border-white/5 flex justify-between items-center text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Tax Ledger Liability</span>
                  <span className="text-lg font-bold text-white block mt-0.5">₹{selectedProperty.annual_tax_inr.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
                </div>
                <div className="h-8 w-[1px] bg-white/10" />
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Tax Collected Amount</span>
                  <span className={`text-lg font-bold block mt-0.5 ${selectedProperty.collection_inr > 0 ? "text-emerald-400" : "text-rose-400"}`}>
                    ₹{selectedProperty.collection_inr.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Registration and QR Mock Footer */}
              <div className="flex items-center justify-between border-t border-white/5 pt-4 text-[10px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>REGISTRATION DATE: **{selectedProperty.registration_date}**</span>
                </div>
                <span className="font-bold tracking-wider text-blue-500/80">UPYOG MULTI-TENANT VERIFIED</span>
              </div>

            </div>

            {/* Close Button Footer */}
            <div className="px-5 py-4 bg-slate-950/40 border-t border-white/5 flex justify-end">
              <button
                onClick={() => setSelectedProperty(null)}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-600/10"
              >
                Close Audit File
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default PropertyTable;
