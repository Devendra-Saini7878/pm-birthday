"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Users, MapPin, QrCode, CheckCircle2, Quote, Tent, FileCheck, Flower2, Image as ImageIcon, Map, ClipboardList, Wheat, Hospital, Home, Flame, Landmark, Briefcase, Megaphone, Phone } from "lucide-react";
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
        const step = Math.ceil(target / 60);
        const interval = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(interval); }
          else setCount(start);
        }, 20);
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function HomePage() {
  const [heroImage, setHeroImage] = useState("/960px-Prime_Minister_of_India_Narendra_Modi.jpg");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/settings`)
      .then(res => res.json())
      .then(data => {
        if (data.heroImageUrl) {
          setHeroImage(data.heroImageUrl);
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="flex flex-col w-full">

      {/* ═══ 1. HERO ═══ */}
      <section className="relative bg-gradient-to-br from-bjp-saffron via-[#E65C00] to-[#CC4400] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-28 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="flex-1 space-y-6">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full font-bold text-sm tracking-wide border border-white/30">
              <Flower2 className="w-4 h-4" /> Sewa Setu Pilot • September 17, 2026
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-black leading-[1.1]">
              Empowering Every<br/>Indian Citizen.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-orange-100 max-w-xl leading-relaxed">
              On the occasion of PM Narendra Modi's birthday, the Government is launching a nationwide drive across <strong>5 pilot states</strong> to ensure 100% saturation of welfare schemes for every family.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-4">
              <Link href="/register" className="bg-white text-bjp-saffron font-bold py-4 px-8 rounded-full shadow-xl hover:scale-105 transition-transform flex items-center gap-2 text-lg">
                Register Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/schemes" className="border-2 border-white text-white font-bold py-4 px-8 rounded-full hover:bg-white/10 transition-colors flex items-center gap-2 text-lg backdrop-blur-sm">
                View Schemes
              </Link>
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="flex-1 relative w-full max-w-md">
            {heroImage ? (
              <img src={heroImage} alt="PM Modi" className="w-full aspect-[4/5] object-cover rounded-3xl border-4 border-white/20 shadow-2xl" />
            ) : (
              <div className="aspect-[4/5] bg-white/10 backdrop-blur-sm rounded-3xl border-4 border-white/20 overflow-hidden flex flex-col items-center justify-center text-white/70 p-8 text-center">
                <ImageIcon className="w-16 h-16 mb-4 text-white" />
                <p className="font-bold text-xl text-white">PM Narendra Modi</p>
                <p className="text-sm mt-2 text-white/60">Configure image in Admin Settings</p>
              </div>
            )}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="absolute -bottom-5 -left-5 bg-white p-4 rounded-2xl shadow-2xl flex items-center gap-4">
              <div className="w-14 h-14 bg-bjp-green rounded-full flex items-center justify-center text-white font-black text-xl">5</div>
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase">Active In</p>
                <p className="text-bjp-dark-text font-extrabold text-lg">Pilot States</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="absolute -top-4 -right-4 bg-bjp-gold text-white p-3 rounded-xl shadow-xl text-sm font-bold flex items-center gap-2">
              1,674+ Blocks <Tent className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ 2. ANNOUNCEMENT BANNER ═══ */}
      <div className="bg-bjp-dark-blue text-white py-3 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-sm font-semibold">
          <span className="flex items-center gap-2"><Flower2 className="w-4 h-4" /> Special Drive for Seva Pakhwada: September 17 – October 2, 2026</span>
          <span>•</span>
          <span className="flex items-center gap-2"><Megaphone className="w-4 h-4" /> Register at your nearest camp for PM-KISAN, Ayushman Bharat, PMAY & more</span>
          <span>•</span>
          <span className="flex items-center gap-2"><Phone className="w-4 h-4" /> National Helpline: 1800-111-222 (Toll Free)</span>
          <span>•</span>
          <span className="flex items-center gap-2"><Flower2 className="w-4 h-4" /> Special Drive for Seva Pakhwada: September 17 – October 2, 2026</span>
          <span>•</span>
          <span className="flex items-center gap-2"><Megaphone className="w-4 h-4" /> Register at your nearest camp for PM-KISAN, Ayushman Bharat, PMAY & more</span>
        </div>
        <style jsx>{`
          @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .animate-marquee { animation: marquee 30s linear infinite; display: inline-flex; }
        `}</style>
      </div>

      {/* ═══ 3. ABOUT THE INITIATIVE ═══ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-orange-50 text-bjp-saffron px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider">
                <Flower2 className="w-3 h-3" /> About the Initiative
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-bjp-dark-text">Building a New India,<br/>One Citizen at a Time</h2>
              <p className="text-slate-600 text-lg leading-relaxed">Under the visionary leadership of PM Narendra Modi, the Sewa Setu initiative aims to bridge the gap between government welfare schemes and the citizens who need them most.</p>
              <p className="text-slate-600 text-lg leading-relaxed">Through physical camps spread across 5 pilot states (Gujarat, Uttarakhand, Rajasthan, Uttar Pradesh, Punjab), trained volunteers help citizens register for schemes like PM-KISAN, Ayushman Bharat, PMAY, and many more — <em>all in one place</em>.</p>
            </motion.div>
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-5">
              {[
                { num: 10000000, suffix: "+", label: "Citizens Targeted", icon: Users },
                { num: 5, suffix: "", label: "Pilot States", icon: Map },
                { num: 7, suffix: "", label: "Major Schemes", icon: ClipboardList },
                { num: 1674, suffix: "+", label: "Blocks & Talukas", icon: Tent },
              ].map((stat, i) => (
                <div key={i} className="card-gov p-6 text-center border-t-4 border-t-bjp-saffron">
                  <div className="mb-3 flex justify-center text-bjp-saffron"><stat.icon className="w-8 h-8" /></div>
                  <h3 className="text-2xl md:text-3xl font-black text-bjp-dark-text"><CountUp target={stat.num} suffix={stat.suffix} /></h3>
                  <p className="text-sm font-semibold text-slate-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ 4. GOVERNMENT SCHEMES ═══ */}
      <section className="py-20 bg-bjp-light-bg">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-orange-50 text-bjp-saffron px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider mb-4">Modiji ka ATM</motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-bjp-dark-text">Schemes That Empower</motion.h2>
            <motion.p variants={fadeUp} className="text-slate-500 mt-3 max-w-2xl mx-auto">Register for these life-changing government welfare programmes at any Sewa Setu camp near you.</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "PM-KISAN Samman Nidhi", desc: "Direct cash transfer of ₹6,000 per year to all farmer families.", icon: Wheat, color: "from-green-500 to-green-700" },
              { name: "Ayushman Bharat (PM-JAY)", desc: "₹5 lakh health insurance coverage for poor & vulnerable families.", icon: Hospital, color: "from-blue-500 to-blue-700" },
              { name: "PM Awas Yojana", desc: "Highly visible physical asset — houses for lower-income households.", icon: Home, color: "from-yellow-500 to-orange-600" },
              { name: "PM Ujjwala Yojana", desc: "Free LPG connections for women of poor households for clean cooking.", icon: Flame, color: "from-red-500 to-red-700" },
              { name: "Jal Jeevan Mission", desc: "Water infrastructure and women-centric welfare for rural households.", icon: Landmark, color: "from-indigo-500 to-indigo-700" },
              { name: "PM SVANidhi", desc: "Urban poor credit & digital payments support for street vendors.", icon: Briefcase, color: "from-purple-500 to-purple-700" },
            ].map((scheme, i) => (
              <motion.div key={i} variants={fadeUp} className="card-gov overflow-hidden group">
                <div className={`bg-gradient-to-r ${scheme.color} p-5 text-white flex items-center gap-3`}>
                  <scheme.icon className="w-8 h-8" />
                  <h3 className="font-bold text-lg">{scheme.name}</h3>
                </div>
                <div className="p-6">
                  <p className="text-slate-600 leading-relaxed mb-4">{scheme.desc}</p>
                  <Link href="/schemes" className="text-bjp-saffron font-bold text-sm hover:underline flex items-center gap-1">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ 5. HOW IT WORKS ═══ */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 md:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-orange-50 text-bjp-saffron px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider mb-4">Simple Process</motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-bjp-dark-text mb-16">How It Works</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-24 left-1/6 right-1/6 h-1 bg-gradient-to-r from-bjp-saffron via-bjp-gold to-bjp-green rounded-full"></div>
            {[
              { step: "01", title: "Visit a Camp Near You", desc: "Locate a government camp in your block/taluka during the Seva Pakhwada drive.", icon: Tent, color: "bg-bjp-saffron" },
              { step: "02", title: "Scan the QR Code", desc: "Use your smartphone to scan the official QR code displayed at the camp. It opens the registration form.", icon: QrCode, color: "bg-bjp-dark-blue" },
              { step: "03", title: "Fill the Form & Get Enrolled", desc: "Enter your details, select the schemes you qualify for, and submit. Your application is instantly processed.", icon: FileCheck, color: "bg-bjp-green" },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="card-gov p-8 text-center relative z-10">
                <div className={`w-20 h-20 ${item.color} text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  <item.icon className="w-10 h-10" />
                </div>
                <div className="text-bjp-saffron font-black text-sm mb-2">STEP {item.step}</div>
                <h3 className="text-xl font-bold text-bjp-dark-text mb-3">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ 6. LEADERSHIP ═══ */}
      <section className="py-20 bg-bjp-light-bg">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-orange-50 text-bjp-saffron px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider mb-4">Leadership</motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-bjp-dark-text">Visionary Leadership</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Narendra Modi", role: "Prime Minister of India", img: "/960px-Prime_Minister_of_India_Narendra_Modi.jpg" },
              { name: "Amit Shah", role: "Minister of Home Affairs", img: "/Amit-Shah-PNG-HD-Transparen.png" },
              { name: "J.P. Nadda", role: "BJP National President", img: "/jp nadda.jfif" },
              { name: "Yogi Adityanath", role: "Chief Minister, UP", img: "/yogi aditya nath.jfif" },
            ].map((leader, i) => (
              <motion.div key={i} variants={fadeUp} className="card-gov overflow-hidden text-center group">
                <div className="aspect-square bg-gradient-to-b from-slate-100 to-slate-200 flex flex-col items-center justify-center relative overflow-hidden">
                  <img src={leader.img} alt={leader.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-bjp-saffron via-white to-bjp-green"></div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-bjp-dark-text">{leader.name}</h3>
                  <p className="text-sm text-slate-500">{leader.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ 7. TESTIMONIALS ═══ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-orange-50 text-bjp-saffron px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider mb-4">Citizen Voices</motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-bjp-dark-text">What Citizens Are Saying</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Ramesh Kumar", location: "Lucknow, UP", quote: "I registered for PM-KISAN and Ayushman Bharat in just 5 minutes at the camp. The process was incredibly smooth. My family now has health insurance for the first time!" },
              { name: "Sunita Devi", location: "Ahmedabad, GJ", quote: "Thanks to Ujjwala Yojana, I received a free LPG connection at the camp itself. No more cooking on chulha! The volunteers were very helpful and explained everything." },
              { name: "Harpreet Singh", location: "Ludhiana, PB", quote: "The PM SVANidhi loan helped me expand my street vending business. I got the working capital without any collateral. The camp system made the entire application process fast." },
            ].map((t, i) => (
              <motion.div key={i} variants={fadeUp} className="card-gov p-8 relative">
                <Quote className="w-10 h-10 text-bjp-saffron/20 absolute top-4 right-4" />
                <p className="text-slate-600 leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                  <div className="w-12 h-12 bg-bjp-saffron/10 rounded-full flex items-center justify-center text-bjp-saffron font-bold text-lg">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-bjp-dark-text">{t.name}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1"><MapPin className="w-3 h-3" />{t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ 8. FINAL CTA ═══ */}
      <section className="py-24 bg-gradient-to-r from-bjp-saffron to-bjp-deep-saffron text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div variants={fadeUp} className="mb-6 flex justify-center text-white"><Flower2 className="w-16 h-16" /></motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-black mb-6">Don't Miss This Opportunity</motion.h2>
          <motion.p variants={fadeUp} className="text-xl text-orange-100 mb-10 max-w-2xl mx-auto">Visit your nearest Sewa Setu camp or pre-register online to skip the queue. Seva Pakhwada runs from September 17 to October 2, 2026.</motion.p>
          <motion.div variants={fadeUp}>
            <Link href="/register" className="inline-flex items-center gap-2 bg-white text-bjp-saffron font-bold py-4 px-10 rounded-full shadow-2xl hover:scale-105 transition-transform text-lg">
              Start Registration <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
