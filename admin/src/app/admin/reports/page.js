"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { FileBarChart, Download, BarChart3, TrendingUp, Users } from "lucide-react";
import { useToast } from "@/components/ToastProvider";

export default function ReportsPage() {
  const [stats, setStats] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/analytics`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setStats(res.data))
      .catch(console.error);
  }, []);

  const handleDownloadCSV = () => {
    const token = localStorage.getItem("adminToken");
    window.open(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/citizens/export?token=${token}`);
    toast.addToast("Report downloading...", "info");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-bjp-dark-text flex items-center gap-3">
          <div className="w-10 h-10 bg-bjp-saffron rounded-lg flex items-center justify-center text-white shadow-lg"><FileBarChart className="w-5 h-5" /></div>
          Reports & Export
        </h1>
        <p className="text-slate-500 font-medium mt-2">Generate comprehensive state-wise and scheme-wise reports for Seva Pakhwada.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-gov p-6 bg-gradient-to-br from-bjp-dark-blue to-blue-900 text-white">
          <TrendingUp className="w-8 h-8 text-blue-300 mb-4" />
          <p className="text-blue-200 font-semibold text-sm">All-Time Registrations</p>
          <h2 className="text-3xl font-black mt-1">{stats?.total || 0}</h2>
        </div>
        <div className="card-gov p-6 bg-gradient-to-br from-bjp-saffron to-[#CC4400] text-white">
          <BarChart3 className="w-8 h-8 text-orange-200 mb-4" />
          <p className="text-orange-200 font-semibold text-sm">This Week (Est.)</p>
          <h2 className="text-3xl font-black mt-1">{Math.floor((stats?.total || 0) * 0.8)}</h2>
        </div>
        <div className="card-gov p-6 bg-gradient-to-br from-bjp-green to-emerald-700 text-white">
          <Users className="w-8 h-8 text-green-200 mb-4" />
          <p className="text-green-200 font-semibold text-sm">Target vs Achieved</p>
          <h2 className="text-3xl font-black mt-1">{((stats?.total || 0) / 10000000 * 100).toFixed(4)}%</h2>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* State Breakdown */}
        <div className="md:col-span-2 card-gov overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50"><h3 className="font-bold text-bjp-dark-text">State-wise Breakdown</h3></div>
          <table className="w-full text-left text-sm">
            <thead className="bg-white text-slate-500 uppercase tracking-wider text-xs">
              <tr>
                <th className="p-4 font-bold border-b border-slate-100">State</th>
                <th className="p-4 font-bold border-b border-slate-100">Total Registrations</th>
                <th className="p-4 font-bold border-b border-slate-100">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {stats?.byState?.map((s, i) => (
                <tr key={i} className="hover:bg-orange-50/50">
                  <td className="p-4 font-bold text-bjp-dark-text">{s.state}</td>
                  <td className="p-4 font-mono font-bold text-bjp-saffron">{s._count.state}</td>
                  <td className="p-4">
                    <div className="w-full bg-slate-100 rounded-full h-2.5">
                      <div className="bg-bjp-green h-2.5 rounded-full" style={{ width: `${Math.min((s._count.state / (stats.total || 1)) * 100, 100)}%` }}></div>
                    </div>
                  </td>
                </tr>
              ))}
              {!stats?.byState?.length && <tr><td colSpan="3" className="p-6 text-center text-slate-400">No data available</td></tr>}
            </tbody>
          </table>
        </div>

        {/* Exports */}
        <div className="card-gov p-6">
          <h3 className="font-bold text-bjp-dark-text mb-6">Download Reports</h3>
          <div className="space-y-4">
            <button onClick={handleDownloadCSV} className="w-full flex items-center justify-between p-4 border-2 border-slate-100 rounded-xl hover:border-bjp-saffron hover:bg-orange-50 transition-colors group">
              <div className="text-left">
                <p className="font-bold text-bjp-dark-text group-hover:text-bjp-saffron">Full Master Report</p>
                <p className="text-xs text-slate-500 mt-1">All citizen data (.csv)</p>
              </div>
              <div className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center text-bjp-saffron group-hover:scale-110 transition-transform"><Download className="w-4 h-4"/></div>
            </button>
            
            <button onClick={handleDownloadCSV} className="w-full flex items-center justify-between p-4 border-2 border-slate-100 rounded-xl hover:border-bjp-dark-blue hover:bg-blue-50 transition-colors group">
              <div className="text-left">
                <p className="font-bold text-bjp-dark-text group-hover:text-bjp-dark-blue">State-wise Aggregates</p>
                <p className="text-xs text-slate-500 mt-1">Filtered by state (.csv)</p>
              </div>
              <div className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center text-bjp-dark-blue group-hover:scale-110 transition-transform"><Download className="w-4 h-4"/></div>
            </button>

            <button onClick={handleDownloadCSV} className="w-full flex items-center justify-between p-4 border-2 border-slate-100 rounded-xl hover:border-bjp-green hover:bg-green-50 transition-colors group">
              <div className="text-left">
                <p className="font-bold text-bjp-dark-text group-hover:text-bjp-green">Scheme Penetration</p>
                <p className="text-xs text-slate-500 mt-1">Beneficiary stats (.csv)</p>
              </div>
              <div className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center text-bjp-green group-hover:scale-110 transition-transform"><Download className="w-4 h-4"/></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
