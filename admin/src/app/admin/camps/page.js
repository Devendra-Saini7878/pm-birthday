"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Tent, Plus, MapPin, Phone, Loader2, CheckCircle, Edit, Trash2, XCircle } from "lucide-react";
import { useToast } from "@/components/ToastProvider";
import { motion } from "framer-motion";

export default function CampsPage() {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCampId, setCurrentCampId] = useState(null);
  const toast = useToast();

  const initialFormState = { campId: "", campName: "", state: "", district: "", coordinatorName: "", coordinatorMobile: "" };
  const [form, setForm] = useState(initialFormState);

  const fetchCamps = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/camps`, { headers: { Authorization: `Bearer ${token}` } });
      setCamps(res.data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => { fetchCamps(); }, []);

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem("adminToken");
      const newStatus = currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/camps/${id}`, { status: newStatus }, { headers: { Authorization: `Bearer ${token}` } });
      fetchCamps();
      toast.addToast(`Camp status updated to ${newStatus}`, "success");
    } catch {
      toast.addToast("Failed to update status", "error");
    }
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      if (isEditing) {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/camps/${currentCampId}`, form, { headers: { Authorization: `Bearer ${token}` } });
        toast.addToast("Camp updated successfully", "success");
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/camps`, form, { headers: { Authorization: `Bearer ${token}` } });
        toast.addToast("New camp added successfully", "success");
      }
      closeModal();
      fetchCamps();
    } catch (error) {
      toast.addToast(error.response?.data?.error || "Failed to save camp", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this camp?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/camps/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      toast.addToast("Camp deleted successfully", "success");
      fetchCamps();
    } catch {
      toast.addToast("Failed to delete camp", "error");
    }
  };

  const openEditModal = (camp) => {
    setForm(camp);
    setCurrentCampId(camp.id);
    setIsEditing(true);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setCurrentCampId(null);
    setForm(initialFormState);
  };

  return (
    <div className="space-y-8 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-bjp-dark-text flex items-center gap-3">
            <div className="w-10 h-10 bg-bjp-saffron rounded-lg flex items-center justify-center text-white shadow-lg"><Tent className="w-5 h-5" /></div>
            Camp Management
          </h1>
          <p className="text-slate-500 font-medium mt-2">Manage physical camp locations and coordinators across India.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-saffron py-3 px-6 text-sm"><Plus className="w-4 h-4" /> Add New Camp</button>
      </div>

      <div className="card-gov overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bjp-dark-blue text-white text-xs uppercase tracking-wider">
                <th className="p-4 font-bold">Camp ID & Name</th>
                <th className="p-4 font-bold">Location</th>
                <th className="p-4 font-bold">Coordinator</th>
                <th className="p-4 font-bold">Registrations</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan="6" className="p-10 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-bjp-saffron"/></td></tr>
              ) : camps.length === 0 ? (
                <tr><td colSpan="6" className="p-10 text-center text-slate-500 font-bold">No camps found.</td></tr>
              ) : (
                camps.map((c) => (
                  <tr key={c.id} className="hover:bg-orange-50 transition-colors text-sm">
                    <td className="p-4">
                      <p className="font-bold text-bjp-dark-text">{c.campName}</p>
                      <p className="font-mono text-xs text-slate-500">{c.campId}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-slate-700 flex items-center gap-1"><MapPin className="w-3 h-3 text-bjp-saffron"/> {c.district}</p>
                      <p className="text-xs text-slate-500 ml-4">{c.state}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-slate-700">{c.coordinatorName || "N/A"}</p>
                      {c.coordinatorMobile && <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"><Phone className="w-3 h-3"/> {c.coordinatorMobile}</p>}
                    </td>
                    <td className="p-4">
                      <span className="bg-orange-100 text-bjp-saffron font-black px-3 py-1 rounded-full text-xs">{c.registrations}</span>
                    </td>
                    <td className="p-4">
                      <button 
                        onClick={() => handleToggleStatus(c.id, c.status)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${c.status === "ACTIVE" ? 'bg-bjp-saffron' : 'bg-slate-300'}`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${c.status === "ACTIVE" ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                      <span className={`block mt-1 text-[10px] font-bold ${c.status==="ACTIVE"?"text-green-600":"text-slate-500"}`}>{c.status}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => openEditModal(c)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(c.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
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
      </div>

      {/* Add/Edit Camp Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-bjp-dark-blue/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="bg-bjp-saffron text-white p-5 flex justify-between items-center">
              <h2 className="text-xl font-bold flex items-center gap-2"><Tent className="w-5 h-5"/> {isEditing ? "Edit Camp" : "Add New Camp"}</h2>
              <button onClick={closeModal} className="text-white hover:text-orange-200"><XCircle className="w-5 h-5"/></button>
            </div>
            <form onSubmit={handleCreateOrUpdate} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="label-gov">Camp ID *</label><input required disabled={isEditing} type="text" className={`input-gov uppercase ${isEditing ? 'bg-slate-100' : ''}`} placeholder="e.g. DL-01" value={form.campId} onChange={e=>setForm(p=>({...p, campId:e.target.value.toUpperCase()}))} /></div>
                <div><label className="label-gov">Camp Name *</label><input required type="text" className="input-gov" placeholder="Camp Name" value={form.campName} onChange={e=>setForm(p=>({...p, campName:e.target.value}))} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label-gov">State *</label>
                  <select required className="input-gov bg-white" value={form.state} onChange={e=>setForm(p=>({...p, state:e.target.value}))}>
                    <option value="">Select</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Delhi">Delhi</option>
                  </select>
                </div>
                <div><label className="label-gov">District</label><input type="text" className="input-gov" value={form.district} onChange={e=>setForm(p=>({...p, district:e.target.value}))} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 mt-2">
                <div><label className="label-gov">Coordinator Name</label><input type="text" className="input-gov" value={form.coordinatorName} onChange={e=>setForm(p=>({...p, coordinatorName:e.target.value}))} /></div>
                <div><label className="label-gov">Mobile</label><input type="tel" className="input-gov" value={form.coordinatorMobile} onChange={e=>setForm(p=>({...p, coordinatorMobile:e.target.value}))} /></div>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={closeModal} className="btn-outline flex-1">Cancel</button>
                <button type="submit" className="btn-saffron flex-1">{isEditing ? "Save Changes" : "Create Camp"}</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
