"use client";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Flower2 } from "lucide-react";
import { ToastProvider } from "@/components/ToastProvider";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Schemes", href: "/schemes" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Sewa Setu — Seva Pakhwada | PM Modi Birthday Special</title>
        <meta name="description" content="Official Government Camp Data Collection Portal for Seva Pakhwada — a special initiative on PM Modi's birthday." />
      </head>
      <body className={`${inter.className} bg-bjp-light-bg text-bjp-dark-text antialiased min-h-screen flex flex-col`}>
        <ToastProvider>
          <Header />
          <main className="flex-grow w-full">{children}</main>
          <Footer />
          <ScrollToTop />
        </ToastProvider>
      </body>
    </html>
  );
}

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-white border-b-4 border-bjp-saffron shadow-md sticky top-0 z-50">
      {/* Tricolor strip */}
      <div className="flex h-1">
        <div className="flex-1 bg-bjp-saffron"></div>
        <div className="flex-1 bg-white"></div>
        <div className="flex-1 bg-bjp-green"></div>
      </div>

      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-4 md:px-8">
        <Link href="/admin/dashboard" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <div className="w-12 h-12 bg-gradient-to-br from-bjp-saffron to-bjp-deep-saffron text-white rounded-full flex items-center justify-center font-bold text-2xl shadow-lg">
            <Flower2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-extrabold text-lg md:text-xl text-bjp-dark-blue leading-tight tracking-tight">Sewa Setu Admin</h1>
            <p className="text-[10px] font-bold text-bjp-saffron uppercase tracking-[0.2em]">Bhartiya Janata Party</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-bjp-saffron rounded-lg hover:bg-orange-50 transition-colors">
              {link.name}
            </Link>
          ))}
          <Link href="/register" className="ml-3 bg-bjp-saffron hover:bg-bjp-deep-saffron text-white font-bold py-2.5 px-6 rounded-full shadow-md transition-all hover:scale-105 text-sm">
            Register Now
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-bjp-dark-blue">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-orange-100 shadow-xl">
          <nav className="flex flex-col p-4 gap-1">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} onClick={() => setMobileOpen(false)} className="px-4 py-3 text-sm font-semibold text-slate-700 hover:text-bjp-saffron hover:bg-orange-50 rounded-lg transition-colors">
                {link.name}
              </Link>
            ))}
            <Link href="/register" onClick={() => setMobileOpen(false)} className="mt-2 bg-bjp-saffron text-white font-bold py-3 px-6 rounded-full text-center shadow-md">
              Register Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-bjp-dark-blue text-white border-t-4 border-bjp-saffron mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-bjp-saffron"><path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V12m0 0a4.5 4.5 0 1 0 4.5 4.5M12 12a4.5 4.5 0 1 1-4.5 4.5m4.5-4.5V22"></path></svg>
            <div>
              <h3 className="font-extrabold text-lg">Sewa Setu</h3>
              <p className="text-xs text-blue-300 font-bold uppercase tracking-widest">Seva Pakhwada</p>
            </div>
          </div>
          <p className="text-sm text-blue-200 leading-relaxed">A national initiative to bring government scheme benefits directly to every citizen's doorstep across the 5-state pilot.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-bjp-saffron mb-4 uppercase text-sm tracking-wider">Quick Links</h4>
          <ul className="space-y-2 text-sm text-blue-200">
            <li><Link href="/register" className="hover:text-white transition-colors">Register for Schemes</Link></li>
            <li><Link href="/schemes" className="hover:text-white transition-colors">View All Schemes</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">About the Initiative</Link></li>
            <li><Link href="/gallery" className="hover:text-white transition-colors">Camp Gallery</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold text-bjp-saffron mb-4 uppercase text-sm tracking-wider">Helpdesk</h4>
          <ul className="space-y-3 text-sm text-blue-200">
            <li className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg> Toll-Free: 1800-111-222</li>
            <li className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg> support@sevusetu.in</li>
            <li className="flex items-start gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg> <div>New Delhi, India<br/>110001</div></li>
          </ul>
        </div>

        {/* Admin */}
        <div>
          <h4 className="font-bold text-bjp-saffron mb-4 uppercase text-sm tracking-wider">Officials</h4>
          <ul className="space-y-2 text-sm text-blue-200">
            <li><Link href="/admin/login" className="hover:text-white transition-colors">Admin Portal Login</Link></li>
            <li>Version 2.0 (Seva Pakhwada)</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-blue-900 text-center py-5 text-xs text-blue-400">
        <p>© 2026 Government of India • Developed for Seva Pakhwada (September 17 – October 2) • <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block"><path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V12m0 0a4.5 4.5 0 1 0 4.5 4.5M12 12a4.5 4.5 0 1 1-4.5 4.5m4.5-4.5V22"></path></svg> Bhartiya Janata Party</p>
      </div>
    </footer>
  );
}
