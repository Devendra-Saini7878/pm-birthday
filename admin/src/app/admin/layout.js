"use client";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, QrCode, Settings, LogOut, Tent, FileBarChart } from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (pathname !== "/admin/login" && !localStorage.getItem("adminToken")) {
      router.push("/admin/login");
    }
  }, [pathname, router]);

  if (pathname === "/admin/login" || !mounted) {
    return <>{children}</>;
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminRole");
    router.push("/admin/login");
  };

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "QR Generator", href: "/admin/qr", icon: QrCode },
    { name: "Camp Management", href: "/admin/camps", icon: Tent },
    { name: "Reports & Export", href: "/admin/reports", icon: FileBarChart },
    { name: "System Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-bjp-light-bg">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-bjp-dark-blue text-white flex-shrink-0 border-r-4 border-bjp-saffron shadow-2xl flex flex-col z-20">
        <div className="p-6 border-b border-white/10">
          <h2 className="font-black text-xl flex items-center gap-3"><span className="text-2xl">🪷</span> Admin Portal</h2>
          <p className="text-xs text-blue-300 mt-1 uppercase tracking-widest font-bold">Seva Pakhwada 2026</p>
        </div>
        <nav className="flex flex-row md:flex-col gap-2 p-4 overflow-x-auto md:overflow-visible flex-grow">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all whitespace-nowrap ${
                  isActive ? "bg-bjp-saffron text-white shadow-lg" : "text-blue-100 hover:bg-white/10 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 mt-auto border-t border-white/10 hidden md:block">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 text-blue-200 rounded-xl hover:bg-red-500 hover:border-red-500 hover:text-white font-bold transition-all">
            <LogOut className="w-4 h-4" /> Secure Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
