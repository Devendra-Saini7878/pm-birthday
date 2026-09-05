"use client";
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", toggle);
    return () => window.removeEventListener("scroll", toggle);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fade-in-up fixed bottom-6 right-6 z-50 w-12 h-12 bg-bjp-saffron text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
