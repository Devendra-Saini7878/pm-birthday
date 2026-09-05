"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { CheckCircle2, XCircle, Info } from "lucide-react";

const ToastContext = createContext();

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-20 right-4 z-[9999] flex flex-col gap-3 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`toast-enter pointer-events-auto px-5 py-3 rounded-xl shadow-2xl font-semibold text-sm flex items-center gap-2 max-w-sm ${
              t.type === "success" ? "bg-green-600 text-white" : t.type === "error" ? "bg-red-600 text-white" : "bg-bjp-saffron text-white"
            }`}
          >
            {t.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : t.type === "error" ? <XCircle className="w-4 h-4" /> : <Info className="w-4 h-4" />} 
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
