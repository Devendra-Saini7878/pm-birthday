"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";
import { Shield, Loader2, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`, { email, password });
      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("adminRole", res.data.role);
      router.push("/admin/dashboard");
    } catch {
      setError("Invalid credentials. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-bjp-light-bg">
      <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} className="card-gov p-10 w-full max-w-md border-t-4 border-t-bjp-saffron">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-bjp-saffron to-bjp-deep-saffron text-white rounded-full flex items-center justify-center mb-4 shadow-xl">
            <Shield className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-bjp-dark-text">Admin Portal</h2>
          <p className="text-slate-500 text-sm mt-1">Authorized Government Officials Only</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl border border-red-200 font-semibold">
              ❌ {error}
            </div>
          )}
          <div>
            <label className="label-gov">Official Email ID</label>
            <input
              type="email"
              required
              className="input-gov"
              placeholder="e.g. superadmin@gov.in"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="label-gov">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                className="input-gov pr-12"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-bjp-saffron transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn-saffron w-full py-4">
            {loading ? <Loader2 className="animate-spin w-5 h-5 mx-auto" /> : "Secure Login"}
          </button>
        </form>
        <p className="text-center text-xs text-slate-400 mt-6">🔒 Protected by 256-bit SSL encryption</p>
      </motion.div>
    </div>
  );
}
