"use client";
import { motion } from "framer-motion";
import { Play, Image as ImageIcon } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const gradients = [
  "from-bjp-saffron to-orange-400", "from-bjp-dark-blue to-blue-500", "from-bjp-green to-emerald-400",
  "from-purple-500 to-pink-400", "from-yellow-500 to-amber-400", "from-rose-500 to-red-400",
  "from-indigo-500 to-violet-400", "from-teal-500 to-cyan-400", "from-bjp-saffron to-rose-400",
  "from-bjp-dark-blue to-indigo-400", "from-bjp-green to-teal-400", "from-amber-500 to-orange-400",
];

export default function GalleryPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="bg-gradient-to-br from-bjp-saffron to-bjp-deep-saffron text-white py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl mx-auto px-4 relative z-10 flex flex-col items-center">
          <motion.div variants={fadeUp} className="mb-4 text-white"><ImageIcon className="w-16 h-16" /></motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-black mb-4">Camp Gallery</motion.h1>
          <motion.p variants={fadeUp} className="text-lg text-orange-100 max-w-2xl mx-auto">A glimpse into the Sewa Setu camps across India — the energy, the people, and the impact.</motion.p>
        </motion.div>
      </section>

      {/* Photo Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-orange-50 text-bjp-saffron px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider mb-4">Photos</motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl font-black text-bjp-dark-text">Camp Moments</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
            {Array.from({ length: 12 }, (_, i) => {
              const heights = ["h-64", "h-80", "h-48", "h-72", "h-56", "h-80", "h-64", "h-48", "h-72", "h-56", "h-80", "h-64"];
              return (
                <motion.div key={i} variants={fadeUp} className="break-inside-avoid">
                  <div className={`bg-gradient-to-br ${gradients[i]} ${heights[i]} rounded-2xl flex flex-col items-center justify-center text-white/80 relative overflow-hidden group cursor-pointer`}>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                    <ImageIcon className="w-12 h-12 mb-2 relative z-10" />
                    <p className="font-bold text-sm relative z-10">Camp Photo {i + 1}</p>
                    <p className="text-xs text-white/60 relative z-10">Replace with actual image</p>
                  </div>
                  <p className="text-sm text-slate-500 mt-2 font-semibold text-center">
                    {["Lucknow Camp Registration", "Ahmedabad Mega Drive", "Mumbai Health Camp", "Bhopal Citizens Queue", "Patna Youth Registration", "Gujarat Scheme Awareness", "UP Rural Outreach", "Maharashtra Women's Camp", "MP Farmer Registration", "Bihar Education Drive", "Digital India Kiosk", "Seva Pakhwada Inauguration"][i]}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-bjp-light-bg">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-orange-50 text-bjp-saffron px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider mb-4">Videos</motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl font-black text-bjp-dark-text">Watch the Impact</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Seva Pakhwada Official Launch", desc: "PM Modi inaugurates the nationwide camp drive." },
              { title: "Citizens Share Their Experience", desc: "Hear from the beneficiaries of the camp registration." },
              { title: "Behind the Scenes", desc: "How camps were set up across the 5 pilot states." },
            ].map((video, i) => (
              <motion.div key={i} variants={fadeUp} className="card-gov overflow-hidden group cursor-pointer">
                <div className="aspect-video bg-gradient-to-br from-bjp-dark-blue to-slate-800 flex items-center justify-center relative">
                  <div className="w-16 h-16 bg-bjp-saffron rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 text-white ml-1" />
                  </div>
                  <p className="absolute bottom-3 left-3 text-white/60 text-xs">Video Placeholder</p>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-bjp-dark-text">{video.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">{video.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
