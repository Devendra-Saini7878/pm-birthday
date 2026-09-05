"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";
import { CheckCircle, AlertCircle, Loader2, Lock, Flower2 } from "lucide-react";
import { useToast } from "@/components/ToastProvider";

const PILOT_STATES = ["Gujarat", "Uttarakhand", "Rajasthan", "Uttar Pradesh", "Punjab"];
const SCHEMES = ["PM-KISAN Samman Nidhi", "Ayushman Bharat (PM-JAY)", "PM Awas Yojana", "PM Ujjwala Yojana", "Jal Jeevan Mission", "Swachh Bharat Mission", "PM SVANidhi"];
const INCOME_VARIANTS = ["Below ₹1 Lakh", "₹1-3 Lakhs", "Above ₹3 Lakhs"];

function RegisterFormInner() {
  const searchParams = useSearchParams();
  const toast = useToast();
  const [status, setStatus] = useState("idle");
  const [regId, setRegId] = useState("");
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    name: "", fatherName: "", dob: "", gender: "", mobileNumber: "", aadhaarNumber: "",
    address: "", cityVillage: "", state: searchParams.get("state") || "", district: "", pinCode: "",
    incomeVariant: "", campId: searchParams.get("campId") || "", schemes: [],
  });

  const set = (key, val) => { setForm(prev => ({ ...prev, [key]: val })); setErrors(prev => ({ ...prev, [key]: "" })); };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.gender) e.gender = "Please select gender";
    if (!form.mobileNumber.match(/^[0-9]{10}$/)) e.mobileNumber = "Enter valid 10-digit number";
    if (form.aadhaarNumber && !form.aadhaarNumber.match(/^[0-9]{12}$/)) e.aadhaarNumber = "Enter valid 12-digit Aadhaar";
    if (!form.state) e.state = "Select a state";
    if (!form.cityVillage.trim()) e.cityVillage = "City/Village is required";
    if (!form.address.trim()) e.address = "Address is required";
    if (form.pinCode && !form.pinCode.match(/^[0-9]{6}$/)) e.pinCode = "Enter valid 6-digit pin code";
    if (!form.incomeVariant) e.incomeVariant = "Select income variant";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) { toast.addToast("Please fix the errors below", "error"); return; }
    setStatus("loading");
    try {
      const payload = {
        ...form,
        qrCodeId: `QR-${Date.now()}`,
        campId: form.campId || "WALK-IN",
        schemes: form.schemes.join(", "),
      };
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/citizens`, payload);
      setRegId(res.data.qrCodeId);
      setStatus("success");
      toast.addToast("Registration successful!", "success");
    } catch {
      setStatus("error");
      toast.addToast("Registration failed. Please try again.", "error");
    }
  };

  if (status === "success") {
    return (
      <div className="max-w-2xl mx-auto mt-12 mb-20 p-10 card-gov text-center border-t-8 border-t-bjp-green">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><CheckCircle className="text-bjp-green w-24 h-24 mx-auto mb-6" /></motion.div>
        <h2 className="text-3xl font-black text-bjp-dark-text mb-4">Registration Successful!</h2>
        <p className="text-slate-600 mb-2 text-lg">Thank you for registering at the Government Camp.</p>
        <p className="text-bjp-saffron font-bold text-lg mb-8">Your Registration ID: <span className="font-mono bg-orange-50 px-3 py-1 rounded-lg">{regId}</span></p>
        <button onClick={() => { setStatus("idle"); setForm({ name:"",fatherName:"",dob:"",gender:"",mobileNumber:"",aadhaarNumber:"",address:"",cityVillage:"",state:"",district:"",pinCode:"",incomeVariant:"",campId:"",schemes:[] }); }} className="btn-saffron inline-flex w-auto px-8">Register Another Citizen</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 mb-20 px-4">
      <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} className="card-gov overflow-hidden">
        <div className="bg-gradient-to-r from-bjp-saffron to-bjp-deep-saffron p-8 md:p-10 text-white text-center">
          <div className="flex justify-center mb-4"><Flower2 className="w-12 h-12" /></div>
          <h1 className="text-3xl md:text-4xl font-black mb-2">Citizen Registration Form</h1>
          <p className="text-orange-100 text-lg">Fill your details to avail government scheme benefits at Seva Pakhwada.</p>
          {form.campId && <p className="mt-3 bg-white/20 inline-block px-4 py-1 rounded-full text-sm font-bold">Camp: {form.campId}</p>}
        </div>

        <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-6">
          {status === "error" && (
            <div className="bg-red-50 text-red-700 p-4 rounded-xl flex items-center gap-3 border border-red-200"><AlertCircle className="w-5 h-5" /><p>An error occurred. Please try again.</p></div>
          )}

          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label-gov">Full Name *</label>
              <input type="text" className={`input-gov ${errors.name ? "ring-2 ring-red-400":""}`} placeholder="Enter full name" value={form.name} onChange={e=>set("name",e.target.value)} />
              {errors.name && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.name}</p>}
            </div>
            <div>
              <label className="label-gov">Father/Husband Name</label>
              <input type="text" className="input-gov" placeholder="Father or husband name" value={form.fatherName} onChange={e=>set("fatherName",e.target.value)} />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label-gov">Date of Birth</label>
              <input type="date" className="input-gov" value={form.dob} onChange={e=>set("dob",e.target.value)} />
            </div>
            <div>
              <label className="label-gov">Gender *</label>
              <div className="flex gap-3 mt-1">
                {["Male","Female","Other"].map(g=>(
                  <label key={g} className={`flex-1 flex items-center justify-center gap-2 cursor-pointer border-2 px-3 py-3 rounded-xl font-semibold transition-all text-sm ${form.gender===g?"border-bjp-saffron bg-orange-50 text-bjp-saffron":"border-slate-200 hover:border-orange-200"}`}>
                    <input type="radio" name="gender" value={g} checked={form.gender===g} onChange={e=>set("gender",e.target.value)} className="sr-only" />{g}
                  </label>
                ))}
              </div>
              {errors.gender && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.gender}</p>}
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label-gov">Mobile Number *</label>
              <div className="flex">
                <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-orange-200 bg-orange-50 text-bjp-saffron font-bold text-sm">+91</span>
                <input type="tel" className={`input-gov rounded-l-none ${errors.mobileNumber?"ring-2 ring-red-400":""}`} placeholder="10-digit number" maxLength={10} value={form.mobileNumber} onChange={e=>set("mobileNumber",e.target.value.replace(/\D/g,""))} />
              </div>
              {errors.mobileNumber && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.mobileNumber}</p>}
            </div>
            <div>
              <label className="label-gov">Aadhaar Number</label>
              <input type="text" className={`input-gov font-mono tracking-wider ${errors.aadhaarNumber?"ring-2 ring-red-400":""}`} placeholder="XXXX XXXX XXXX" maxLength={12} value={form.aadhaarNumber} onChange={e=>set("aadhaarNumber",e.target.value.replace(/\D/g,""))} />
              {errors.aadhaarNumber && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.aadhaarNumber}</p>}
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="label-gov">Full Address *</label>
            <textarea rows={3} className={`input-gov resize-none ${errors.address?"ring-2 ring-red-400":""}`} placeholder="House No, Street" value={form.address} onChange={e=>set("address",e.target.value)} />
            {errors.address && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.address}</p>}
          </div>

          {/* Location Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label-gov">State *</label>
              <select className={`input-gov bg-white ${errors.state?"ring-2 ring-red-400":""}`} value={form.state} onChange={e=>set("state",e.target.value)}>
                <option value="">Select Pilot State</option>
                {PILOT_STATES.map(s=><option key={s} value={s}>{s}</option>)}
              </select>
              {errors.state && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.state}</p>}
            </div>
            <div>
              <label className="label-gov">District</label>
              <input type="text" className="input-gov" placeholder="District" value={form.district} onChange={e=>set("district",e.target.value)} />
            </div>
          </div>

          {/* Location Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
              <label className="label-gov">City/Village *</label>
              <input type="text" className={`input-gov ${errors.cityVillage?"ring-2 ring-red-400":""}`} placeholder="City or Village name" value={form.cityVillage} onChange={e=>set("cityVillage",e.target.value)} />
              {errors.cityVillage && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.cityVillage}</p>}
            </div>
            <div>
              <label className="label-gov">Pin Code</label>
              <input type="text" className={`input-gov ${errors.pinCode?"ring-2 ring-red-400":""}`} placeholder="6-digit" maxLength={6} value={form.pinCode} onChange={e=>set("pinCode",e.target.value.replace(/\D/g,""))} />
              {errors.pinCode && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.pinCode}</p>}
            </div>
          </div>

          {/* Income Variant */}
          <div>
            <label className="label-gov">Income Variant *</label>
             <select className={`input-gov bg-white ${errors.incomeVariant?"ring-2 ring-red-400":""}`} value={form.incomeVariant} onChange={e=>set("incomeVariant",e.target.value)}>
                <option value="">Select Income Range</option>
                {INCOME_VARIANTS.map(s=><option key={s} value={s}>{s}</option>)}
              </select>
              {errors.incomeVariant && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.incomeVariant}</p>}
          </div>

          {/* Schemes */}
          <div>
            <label className="label-gov mb-3 block">Government Schemes You Are Enrolled In</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SCHEMES.map(scheme=>(
                <label key={scheme} className={`flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${form.schemes.includes(scheme)?"border-bjp-saffron bg-orange-50":"border-slate-200 hover:border-orange-200"}`}>
                  <input type="checkbox" className="mt-1 w-5 h-5 accent-bjp-saffron rounded" checked={form.schemes.includes(scheme)} onChange={()=>setForm(p=>({ ...p, schemes: p.schemes.includes(scheme)?p.schemes.filter(s=>s!==scheme):[...p.schemes,scheme] }))} />
                  <span className="font-semibold text-slate-700">{scheme}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-6 border-t border-slate-200">
            <button type="submit" disabled={status==="loading"} className="btn-saffron w-full py-4 text-lg">
              {status==="loading" ? <><Loader2 className="animate-spin"/> Submitting securely...</> : "Submit Registration"}
            </button>
            <p className="text-center text-xs text-slate-500 mt-4 flex items-center justify-center gap-1"><Lock className="w-3 h-3"/>Your data is securely encrypted and stored on Government of India servers.</p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default function RegisterPage() {
  return <Suspense fallback={<div className="text-center py-20">Loading...</div>}><RegisterFormInner /></Suspense>;
}
