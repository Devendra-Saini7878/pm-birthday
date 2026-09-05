"use client";
import { useState, useRef, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { QrCode, Download, Printer, RefreshCw, Flower2 } from "lucide-react";
import { useToast } from "@/components/ToastProvider";

export default function QRGeneratorPage() {
  const [campId, setCampId] = useState("");
  const [state, setState] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [history, setHistory] = useState([]);
  const qrRef = useRef(null);
  const toast = useToast();

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!campId || !state) return;
    
    const url = `${window.location.origin}/register?campId=${encodeURIComponent(campId)}&state=${encodeURIComponent(state)}`;
    setGeneratedUrl(url);
    
    setHistory(prev => [{ campId, state, url, time: new Date().toLocaleTimeString() }, ...prev]);
    toast.addToast("QR Code generated successfully", "success");
  };

  const downloadQR = () => {
    const svg = qrRef.current.querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `SevaPakhwada-Camp-${campId}.png`;
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black text-bjp-dark-text flex items-center gap-3">
          <div className="w-10 h-10 bg-bjp-saffron rounded-lg flex items-center justify-center text-white shadow-lg"><QrCode className="w-6 h-6" /></div>
          QR Code Generator
        </h1>
        <p className="text-slate-500 font-medium mt-2">Generate officially branded QR codes for physical camp locations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form */}
        <div className="card-gov p-6 border-t-4 border-t-bjp-dark-blue">
          <h2 className="text-xl font-bold text-bjp-dark-text mb-6">Camp Details</h2>
          <form onSubmit={handleGenerate} className="space-y-5">
            <div>
              <label className="label-gov">Select State</label>
              <select required className="input-gov" value={state} onChange={e => setState(e.target.value)}>
                <option value="">Select State</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Bihar">Bihar</option>
              </select>
            </div>
            <div>
              <label className="label-gov">Camp ID / Code</label>
              <input required type="text" className="input-gov" placeholder="e.g. UP-LKO-01" value={campId} onChange={e => setCampId(e.target.value.toUpperCase())} />
            </div>
            <button type="submit" className="btn-saffron w-full mt-4">
              <RefreshCw className="w-4 h-4" /> Generate Official QR
            </button>
          </form>
        </div>

        {/* Preview */}
        <div className="card-gov p-6 flex flex-col items-center justify-center min-h-[400px]">
          {generatedUrl ? (
            <div className="text-center w-full">
              <div className="bg-white p-8 rounded-3xl border-4 border-bjp-saffron inline-block mb-6 relative shadow-xl" ref={qrRef}>
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white px-2">
                   <div className="w-12 h-12 bg-gradient-to-br from-bjp-saffron to-bjp-deep-saffron text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg border-2 border-white"><Flower2 className="w-6 h-6" /></div>
                </div>
                <h3 className="font-black text-xl mb-4 text-bjp-dark-blue uppercase tracking-widest mt-2">Scan to Register</h3>
                <div className="bg-white p-2">
                  <QRCodeSVG value={generatedUrl} size={220} level={"H"} includeMargin={false} fgColor={"#003366"} />
                </div>
                <div className="mt-5 border-t-2 border-slate-100 pt-3">
                  <p className="font-bold text-sm text-bjp-dark-text uppercase tracking-wider">Seva Pakhwada Camp</p>
                  <p className="font-mono text-xs font-bold text-bjp-saffron mt-1">ID: {campId}</p>
                </div>
              </div>
              
              <div className="flex gap-3 justify-center w-full max-w-sm mx-auto">
                <button onClick={downloadQR} className="flex-1 btn-outline"><Download className="w-4 h-4" /> PNG</button>
                <button onClick={() => window.print()} className="flex-1 btn-saffron"><Printer className="w-4 h-4" /> Print</button>
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-400">
              <div className="w-24 h-24 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-slate-300">
                <QrCode className="w-10 h-10 text-slate-300" />
              </div>
              <p className="font-semibold">Enter camp details to generate<br/>a printable QR code.</p>
            </div>
          )}
        </div>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="card-gov overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50"><h3 className="font-bold text-bjp-dark-text">Session Generation History</h3></div>
          <table className="w-full text-left text-sm">
            <thead className="bg-white">
              <tr className="text-slate-500 uppercase tracking-wider text-xs">
                <th className="p-4 font-bold border-b border-slate-100">Time</th>
                <th className="p-4 font-bold border-b border-slate-100">Camp ID</th>
                <th className="p-4 font-bold border-b border-slate-100">State</th>
                <th className="p-4 font-bold border-b border-slate-100">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {history.map((h, i) => (
                <tr key={i} className="hover:bg-orange-50/50">
                  <td className="p-4 font-mono text-slate-500">{h.time}</td>
                  <td className="p-4 font-bold text-bjp-dark-text">{h.campId}</td>
                  <td className="p-4 text-slate-600">{h.state}</td>
                  <td className="p-4"><button onClick={()=>setGeneratedUrl(h.url)} className="text-bjp-saffron font-bold text-xs hover:underline">View QR</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
