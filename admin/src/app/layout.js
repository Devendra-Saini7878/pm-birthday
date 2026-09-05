import { Inter } from "next/font/google";
import { ToastProvider } from "@/components/ToastProvider";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sewa Setu Admin — Seva Pakhwada",
  description: "Admin Portal for Government Camp Data Collection",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${inter.className} bg-bjp-light-bg text-bjp-dark-text antialiased min-h-screen`}>
        <ToastProvider>
          {children}
          <ScrollToTop />
        </ToastProvider>
      </body>
    </html>
  );
}
