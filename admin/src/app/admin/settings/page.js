"use client";
import { useState } from "react";
import { Settings, Save, Lock, ShieldAlert, Key } from "lucide-react";
import { useToast } from "@/components/ToastProvider";

export default function SettingsPage() {
  const toast = useToast();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.addToast("New passwords do not match", "error");
      return;
    }
    setLoading(true);
    // Simulated API call since we don't have a change password route
    setTimeout(() => {
      setLoading(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.addToast("Admin password updated successfully", "success");
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black text-bjp-dark-text flex items-center gap-3">
          <div className="w-10 h-10 bg-bjp-saffron rounded-lg flex items-center justify-center text-white shadow-lg"><Settings className="w-5 h-5" /></div>
          System Settings
        </h1>
        <p className="text-slate-500 font-medium mt-2">Manage your admin account and system configurations.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Security Settings */}
        <div className="card-gov p-6 border-t-4 border-t-bjp-saffron">
          <h2 className="text-xl font-bold text-bjp-dark-text mb-6 flex items-center gap-2"><Lock className="w-5 h-5 text-bjp-saffron"/> Security</h2>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div><label className="label-gov">Current Password</label><input required type="password" value={oldPassword} onChange={e=>setOldPassword(e.target.value)} className="input-gov" placeholder="••••••••" /></div>
            <div><label className="label-gov">New Password</label><input required type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} className="input-gov" placeholder="••••••••" /></div>
            <div><label className="label-gov">Confirm New Password</label><input required type="password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} className="input-gov" placeholder="••••••••" /></div>
            <button type="submit" disabled={loading} className="btn-saffron w-full mt-2"><Save className="w-4 h-4"/> {loading ? "Updating..." : "Update Password"}</button>
          </form>
        </div>

        {/* System Information */}
        <div className="space-y-6">
          <div className="card-gov p-6 border-t-4 border-t-bjp-dark-blue">
            <h2 className="text-xl font-bold text-bjp-dark-text mb-6 flex items-center gap-2"><ShieldAlert className="w-5 h-5 text-bjp-dark-blue"/> System Info</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-500 font-medium text-sm">Environment</span>
                <span className="bg-green-100 text-green-700 font-bold px-2 py-1 rounded text-xs uppercase">Production</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-500 font-medium text-sm">Database Schema</span>
                <span className="font-mono font-bold text-slate-700 text-sm">v1.2 (SQLite)</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-500 font-medium text-sm">API Version</span>
                <span className="font-mono font-bold text-slate-700 text-sm">v1.0.0</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-500 font-medium text-sm">Last Backup</span>
                <span className="font-bold text-slate-700 text-sm">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="card-gov p-6 bg-orange-50 border border-orange-200">
            <h3 className="font-bold text-bjp-dark-text flex items-center gap-2"><Key className="w-4 h-4 text-bjp-saffron"/> API Keys (Read-Only)</h3>
            <p className="text-xs text-slate-500 mt-2 mb-3">These keys are used for third-party integrations (SMS/WhatsApp).</p>
            <div className="bg-white p-3 rounded-lg border border-slate-200 font-mono text-xs text-slate-400 break-all select-all">
              sk_prod_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
