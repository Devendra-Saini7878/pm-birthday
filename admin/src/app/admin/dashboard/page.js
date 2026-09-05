"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Users, User, Download, Search, RefreshCw, Loader2, Edit, Trash2, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ToastProvider";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [citizens, setCitizens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Edit Citizen State
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentCitizen, setCurrentCitizen] = useState(null);
  
  // Filters
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  
  const toast = useToast();

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const headers = { Authorization: `Bearer ${token}` };
      
      const [statsRes, citRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/analytics`, { headers }),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/citizens?page=${page}&search=${search}&state=${stateFilter}&gender=${genderFilter}`, { headers })
      ]);
      
      setStats(statsRes.data);
      setCitizens(citRes.data.citizens);
      setTotalPages(citRes.data.totalPages);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(() => fetchData(), 500);
    return () => clearTimeout(timer);
  }, [page, search, stateFilter, genderFilter]);

  const handleExport = () => {
    const token = localStorage.getItem("adminToken");
    window.open(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/citizens/export?token=${token}&search=${search}&state=${stateFilter}&gender=${genderFilter}`);
  };

  const openEditModal = (citizen) => {
    setCurrentCitizen({ ...citizen });
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setCurrentCitizen(null);
  };

  const handleEditChange = (e) => {
    setCurrentCitizen({ ...currentCitizen, [e.target.name]: e.target.value });
  };

  const handleUpdateCitizen = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/citizens/${currentCitizen.id}`, currentCitizen, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.addToast("Citizen updated successfully", "success");
      closeEditModal();
      fetchData();
    } catch (error) {
      toast.addToast("Failed to update citizen", "error");
    }
  };

  const handleDeleteCitizen = async (id) => {
    if (!window.confirm("Are you sure you want to delete this citizen registration?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/citizens/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.addToast("Citizen deleted successfully", "success");
      fetchData();
    } catch (error) {
      toast.addToast("Failed to delete citizen", "error");
    }
  };

  if (!stats) return <div className="flex justify-center items-center h-64"><Loader2 className="w-10 h-10 animate-spin text-bjp-saffron" /></div>;

  return (
    <div className="space-y-8 relative">
      <div>
        <h1 className="text-3xl font-black text-bjp-dark-text">Overview Dashboard</h1>
        <p className="text-slate-500 font-medium">Real-time statistics for Seva Pakhwada registrations.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card-gov p-6 border-l-4 border-l-bjp-dark-blue">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center"><Users className="text-bjp-dark-blue" /></div>
            <div>
              <p className="text-sm font-bold text-slate-500">Total Registered</p>
              <h3 className="text-2xl font-black text-bjp-dark-text">{stats.total}</h3>
            </div>
          </div>
        </div>
        <div className="card-gov p-6 border-l-4 border-l-bjp-saffron">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center"><User className="text-bjp-saffron" /></div>
            <div>
              <p className="text-sm font-bold text-slate-500">Male Citizens</p>
              <h3 className="text-2xl font-black text-bjp-dark-text">{stats.byGender.find(g=>g.gender==='Male')?._count?.gender || 0}</h3>
            </div>
          </div>
        </div>
        <div className="card-gov p-6 border-l-4 border-l-bjp-green">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center"><User className="text-bjp-green" /></div>
            <div>
              <p className="text-sm font-bold text-slate-500">Female Citizens</p>
              <h3 className="text-2xl font-black text-bjp-dark-text">{stats.byGender.find(g=>g.gender==='Female')?._count?.gender || 0}</h3>
            </div>
          </div>
        </div>
        <div className="card-gov p-6 border-l-4 border-l-bjp-gold">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center"><RefreshCw className="text-bjp-gold" /></div>
            <div>
              <p className="text-sm font-bold text-slate-500">Today's Registrations</p>
              <h3 className="text-2xl font-black text-bjp-dark-text">{stats.todayCount}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Export */}
      <div className="card-gov p-5 flex flex-col md:flex-row gap-4 items-center justify-between bg-white border-t-2 border-t-bjp-saffron">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-3 text-slate-400" />
            <input type="text" placeholder="Search by name, phone, QR..." className="input-gov pl-10 py-2.5 w-full md:w-64" value={search} onChange={e=>setSearch(e.target.value)} />
          </div>
          <select className="input-gov py-2.5 bg-white w-full md:w-40" value={stateFilter} onChange={e=>setStateFilter(e.target.value)}>
            <option value="">All States</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Punjab">Punjab</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="Bihar">Bihar</option>
          </select>
          <select className="input-gov py-2.5 bg-white w-full md:w-32" value={genderFilter} onChange={e=>setGenderFilter(e.target.value)}>
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <button onClick={()=>{setSearch("");setStateFilter("");setGenderFilter("");}} className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-lg font-bold text-sm transition-colors">Reset</button>
        </div>
        <button onClick={handleExport} className="btn-saffron py-2.5 text-sm whitespace-nowrap"><Download className="w-4 h-4"/> Export CSV</button>
      </div>

      {/* Data Table */}
      <div className="card-gov overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bjp-dark-blue text-white text-xs uppercase tracking-wider">
                <th className="p-4 font-bold">QR ID</th>
                <th className="p-4 font-bold">Citizen Name</th>
                <th className="p-4 font-bold">Mobile</th>
                <th className="p-4 font-bold">State / District</th>
                <th className="p-4 font-bold">Camp ID</th>
                <th className="p-4 font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan="6" className="p-10 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-bjp-saffron"/></td></tr>
              ) : citizens.length === 0 ? (
                <tr><td colSpan="6" className="p-10 text-center text-slate-500 font-bold">No records found matching filters.</td></tr>
              ) : (
                citizens.map((c) => (
                  <tr key={c.id} className="hover:bg-orange-50 transition-colors text-sm">
                    <td className="p-4 font-mono font-bold text-slate-500">{c.qrCodeId}</td>
                    <td className="p-4 font-bold text-bjp-dark-text">{c.name} <span className="block text-xs font-normal text-slate-500">{c.gender}</span></td>
                    <td className="p-4 text-slate-600">{c.mobileNumber}</td>
                    <td className="p-4 text-slate-600">{c.state} <span className="block text-xs text-slate-400">{c.district}</span></td>
                    <td className="p-4"><span className="bg-blue-50 text-bjp-dark-blue px-2 py-1 rounded font-bold text-xs">{c.campId}</span></td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => openEditModal(c)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteCitizen(c.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
          <span className="text-sm font-semibold text-slate-500">Page {page} of {totalPages || 1}</span>
          <div className="flex gap-2">
            <button disabled={page<=1} onClick={()=>setPage(p=>p-1)} className="px-4 py-2 border border-slate-200 rounded-lg bg-white disabled:opacity-50 font-bold text-sm text-bjp-dark-text hover:bg-slate-50">Previous</button>
            <button disabled={page>=totalPages} onClick={()=>setPage(p=>p+1)} className="px-4 py-2 border border-slate-200 rounded-lg bg-white disabled:opacity-50 font-bold text-sm text-bjp-dark-text hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>

      {/* Edit Citizen Modal */}
      {showEditModal && currentCitizen && (
        <div className="fixed inset-0 bg-bjp-dark-blue/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="bg-bjp-saffron text-white p-5 flex justify-between items-center">
              <h2 className="text-xl font-bold flex items-center gap-2"><User className="w-5 h-5"/> Edit Citizen Details</h2>
              <button onClick={closeEditModal} className="text-white hover:text-orange-200"><XCircle className="w-5 h-5"/></button>
            </div>
            <form onSubmit={handleUpdateCitizen} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="label-gov">Name *</label><input required type="text" className="input-gov" name="name" value={currentCitizen.name} onChange={handleEditChange} /></div>
                <div><label className="label-gov">Mobile *</label><input required type="tel" className="input-gov" name="mobileNumber" value={currentCitizen.mobileNumber} onChange={handleEditChange} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="label-gov">Father's Name</label><input type="text" className="input-gov" name="fatherName" value={currentCitizen.fatherName || ''} onChange={handleEditChange} /></div>
                <div><label className="label-gov">Aadhaar</label><input type="text" className="input-gov" name="aadhaarNumber" value={currentCitizen.aadhaarNumber || ''} onChange={handleEditChange} /></div>
              </div>
              <div><label className="label-gov">Address</label><input type="text" className="input-gov" name="address" value={currentCitizen.address} onChange={handleEditChange} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="label-gov">State *</label><input required type="text" className="input-gov" name="state" value={currentCitizen.state} onChange={handleEditChange} /></div>
                <div><label className="label-gov">District *</label><input required type="text" className="input-gov" name="district" value={currentCitizen.district} onChange={handleEditChange} /></div>
              </div>
              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={closeEditModal} className="btn-outline flex-1">Cancel</button>
                <button type="submit" className="btn-saffron flex-1">Save Changes</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
