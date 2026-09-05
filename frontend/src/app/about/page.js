"use client";
import { motion } from "framer-motion";
import { Users, Target, Shield, Heart, Building, Landmark, Stethoscope, Tractor, Flower2, Image as ImageIcon } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

function CountUp({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const step = Math.ceil(target / 50);
        const interval = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(interval); }
          else setCount(start);
        }, 25);
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const timeline = [
  { year: "2014", title: "A New Era Begins", desc: "BJP comes to power with a historic mandate under PM Narendra Modi, promising 'Sabka Saath, Sabka Vikas'." },
  { year: "2015", title: "Jan Dhan Yojana", desc: "48 crore+ zero-balance bank accounts opened, bringing banking to every unbanked household in India." },
  { year: "2018", title: "Ayushman Bharat Launched", desc: "World's largest health insurance scheme launched, providing ₹5 lakh coverage to 50 crore+ beneficiaries." },
  { year: "2024", title: "PM Kisan Milestone", desc: "PM Kisan Samman Nidhi reaches 10 crore farmer families with direct ₹6,000/year income support." },
  { year: "2026", title: "Seva Pakhwada Drive", desc: "Massive nationwide camp drive launched across 5 pilot states to achieve 100% saturation of all welfare schemes." },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full">
      {/* ═══ 1. HERO ═══ */}
      <section className="bg-gradient-to-br from-bjp-dark-blue to-slate-900 text-white py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl mx-auto px-4 relative z-10 flex flex-col items-center">
          <motion.div variants={fadeUp} className="mb-4 text-bjp-saffron"><Flower2 className="w-16 h-16" /></motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-black mb-4">About This National Initiative</motion.h1>
          <motion.p variants={fadeUp} className="text-lg text-blue-200 max-w-2xl mx-auto">Understanding the vision, mission, and the massive scale of the Seva Pakhwada camp drive for PM Modi's birthday celebration.</motion.p>
        </motion.div>
      </section>

      {/* ═══ 2. VISION & MISSION ═══ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 gap-12">
            <motion.div variants={fadeUp} className="card-gov p-8 border-l-4 border-l-bjp-saffron">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center"><Target className="w-6 h-6 text-bjp-saffron" /></div>
                <h2 className="text-2xl font-black text-bjp-dark-text">Our Vision</h2>
              </div>
              <p className="text-slate-600 text-lg leading-relaxed mb-4">To create a Digital India where every citizen, regardless of location or literacy, has seamless access to the full spectrum of government welfare programmes.</p>
              <p className="text-slate-600 text-lg leading-relaxed">Our vision is to achieve <strong>100% scheme saturation</strong> — ensuring that no eligible citizen is left behind. Through technology-driven camps with QR-based registration, we bridge the last-mile gap between governance and the people.</p>
            </motion.div>
            <motion.div variants={fadeUp} className="card-gov p-8 border-l-4 border-l-bjp-green">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center"><Heart className="w-6 h-6 text-bjp-green" /></div>
                <h2 className="text-2xl font-black text-bjp-dark-text">Our Mission</h2>
              </div>
              <p className="text-slate-600 text-lg leading-relaxed mb-4">The Seva Pakhwada (Service Fortnight) is a two-week intensive campaign starting September 17, 2026 — PM Narendra Modi's birthday — running through October 2.</p>
              <p className="text-slate-600 text-lg leading-relaxed">Our mission: set up <strong>10,000+ physical camps</strong> across 5 pilot states, deploy trained volunteers, and register <strong>1 crore+ citizens</strong> for welfare schemes in just 15 days.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ 3. TIMELINE ═══ */}
      <section className="py-20 bg-bjp-light-bg">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-orange-50 text-bjp-saffron px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider mb-4">The Journey</motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-bjp-dark-text">Milestones of Transformation</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-bjp-saffron to-bjp-green rounded-full md:-translate-x-1/2"></div>
            {timeline.map((item, i) => (
              <motion.div key={i} variants={fadeUp} className={`relative flex items-start gap-6 mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="hidden md:block flex-1"></div>
                <div className="absolute left-8 md:left-1/2 w-8 h-8 bg-bjp-saffron rounded-full border-4 border-white shadow-lg z-10 -translate-x-1/2 flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <div className="flex-1 ml-14 md:ml-0 card-gov p-6">
                  <div className="text-bjp-saffron font-black text-sm mb-1">{item.year}</div>
                  <h3 className="text-xl font-bold text-bjp-dark-text mb-2">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ 4. LEADERSHIP TEAM ═══ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-orange-50 text-bjp-saffron px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider mb-4">Our Team</motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-bjp-dark-text">Leadership & Administration</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { name: "Narendra Modi", role: "Hon'ble Prime Minister", desc: "Visionary leader behind the Seva Pakhwada initiative.", img: "/960px-Prime_Minister_of_India_Narendra_Modi.jpg" },
              { name: "Amit Shah", role: "Home Minister", desc: "Overseeing nationwide camp security and coordination.", img: "/Amit-Shah-PNG-HD-Transparen.png" },
              { name: "J.P. Nadda", role: "BJP National President", desc: "Driving party-level mobilization across all states.", img: "/jp nadda.jfif" },
              { name: "Yogi Adityanath", role: "Chief Minister, UP", desc: "Leading the state-level execution in Uttar Pradesh.", img: "/yogi aditya nath.jfif" },
              { name: "District Collector", role: "District Administration", desc: "Managing camp operations in every district." },
              { name: "Camp Coordinator", role: "Ground Level Officer", desc: "Direct citizen interaction and registration assistance." },
            ].map((leader, i) => (
              <motion.div key={i} variants={fadeUp} className="card-gov overflow-hidden text-center">
                <div className="aspect-[4/3] bg-gradient-to-b from-slate-100 to-slate-200 flex flex-col items-center justify-center text-slate-400 relative overflow-hidden">
                  {leader.img ? (
                    <img src={leader.img} alt={leader.name} className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <>
                      <ImageIcon className="w-12 h-12 mb-2" />
                      <p className="text-xs font-semibold">Replace with photo</p>
                    </>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-bjp-saffron via-white to-bjp-green z-10"></div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-bjp-dark-text text-lg">{leader.name}</h3>
                  <p className="text-bjp-saffron text-sm font-semibold">{leader.role}</p>
                  <p className="text-slate-500 text-sm mt-2">{leader.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ 5. STATISTICS DASHBOARD ═══ */}
      <section className="py-20 bg-bjp-dark-blue text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black">Impact in Numbers</motion.h2>
            <motion.p variants={fadeUp} className="text-blue-200 mt-3">Live statistics from the Seva Pakhwada drive across all participating states.</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: 10000, label: "Active Camps", suffix: "+" },
              { num: 5200000, label: "Citizens Registered", suffix: "+" },
              { num: 5, label: "States Covered", suffix: "" },
              { num: 6, label: "Schemes Available", suffix: "" },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
                <h3 className="text-3xl md:text-4xl font-black text-bjp-saffron"><CountUp target={stat.num} suffix={stat.suffix} /></h3>
                <p className="text-blue-200 font-semibold mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ 6. PARTNERS & MINISTRIES ═══ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-orange-50 text-bjp-saffron px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider mb-4">Partners</motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-bjp-dark-text">Participating Ministries</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Ministry of Health & Family Welfare", icon: Stethoscope },
              { name: "Ministry of Rural Development", icon: Building },
              { name: "Ministry of Agriculture", icon: Tractor },
              { name: "Ministry of Finance", icon: Landmark },
            ].map((m, i) => (
              <motion.div key={i} variants={fadeUp} className="card-gov p-6 text-center flex flex-col items-center gap-3 border-t-4 border-t-bjp-saffron">
                <m.icon className="w-10 h-10 text-bjp-dark-blue" />
                <p className="font-bold text-sm text-bjp-dark-text">{m.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
