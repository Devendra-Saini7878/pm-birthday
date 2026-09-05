"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle, ClipboardList } from "lucide-react";
import { useState, useEffect } from "react";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const SCHEMES_DATA = [
  {
    id: 1,
    name: "PM-KISAN Samman Nidhi",
    year: "2019",
    ministry: "Ministry of Agriculture",
    description: "Direct income support of ₹6,000 per year to all landholding farmer families across the country.",
    eligibility: ["Must be a landholding farmer family", "Cultivable land in their name", "Not holding any institutional land"],
    benefits: ["₹6,000 per year", "Transferred in 3 equal installments", "Direct Benefit Transfer (DBT)"],
    beneficiaries: "11.8+ Crore"
  },
  {
    id: 2,
    name: "Ayushman Bharat (PM-JAY)",
    year: "2018",
    ministry: "Ministry of Health and Family Welfare",
    description: "World's largest health insurance scheme providing a health cover of ₹5 lakh per family per year.",
    eligibility: ["Identified based on SECC 2011 data", "Vulnerable and poor families", "No cap on family size or age"],
    benefits: ["₹5 Lakh health cover", "Cashless access to healthcare", "Covers pre and post-hospitalization"],
    beneficiaries: "34.7+ Crore"
  },
  {
    id: 3,
    name: "PM Awas Yojana",
    year: "2015",
    ministry: "Ministry of Housing and Urban Affairs",
    description: "Housing for All initiative providing affordable housing to urban and rural poor.",
    eligibility: ["Must not own a pucca house", "EWS/LIG/MIG categories", "Female co-ownership mandatory"],
    benefits: ["Subsidized interest rates", "Financial assistance for construction", "Basic amenities included"],
    beneficiaries: "4+ Crore Houses"
  },
  {
    id: 4,
    name: "PM Ujjwala Yojana",
    year: "2016",
    ministry: "Ministry of Petroleum and Natural Gas",
    description: "Providing clean cooking fuel (LPG) to women of BPL families to replace traditional firewood.",
    eligibility: ["Adult woman belonging to BPL family", "No existing LPG connection", "Listed in SECC 2011"],
    benefits: ["Free LPG connection", "Financial support of ₹1600", "First refill and stove free"],
    beneficiaries: "10.3+ Crore"
  },
  {
    id: 5,
    name: "Jal Jeevan Mission",
    year: "2019",
    ministry: "Ministry of Jal Shakti",
    description: "Ensuring safe and adequate drinking water through individual household tap connections to all rural households.",
    eligibility: ["All rural households", "Schools and Anganwadi centres", "Gram Panchayat institutions"],
    benefits: ["Functional tap connection", "55 litres per capita per day", "Improved health and hygiene"],
    beneficiaries: "14.5+ Crore Taps"
  },
  {
    id: 6,
    name: "PM SVANidhi",
    year: "2020",
    ministry: "Ministry of Housing and Urban Affairs",
    description: "Special micro-credit facility for street vendors to resume their livelihoods post-COVID-19.",
    eligibility: ["Street vendors vending in urban areas", "Possess Certificate of Vending", "Identified in ULB surveys"],
    benefits: ["Working capital up to ₹10,000", "7% interest subsidy", "Cashback on digital transactions"],
    beneficiaries: "60+ Lakh"
  }
];

export default function SchemesPage() {
  const schemes = SCHEMES_DATA;

  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="bg-gradient-to-br from-bjp-dark-blue to-slate-900 text-white py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl mx-auto px-4 relative z-10 flex flex-col items-center">
          <motion.div variants={fadeUp} className="mb-4 text-white"><ClipboardList className="w-16 h-16" /></motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-black mb-4">Government Welfare Schemes</motion.h1>
          <motion.p variants={fadeUp} className="text-lg text-blue-200 max-w-2xl mx-auto">Explore the full range of welfare programmes available at Seva Pakhwada camps. Every scheme, every detail, in one place.</motion.p>
        </motion.div>
      </section>

      {/* Scheme Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-8">
            {schemes.map((scheme, i) => (
              <motion.div key={scheme.id} variants={fadeUp} className="card-gov overflow-hidden border-l-4 border-l-bjp-saffron">
                <div className="p-8 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h2 className="text-2xl font-black text-bjp-dark-text">{scheme.name}</h2>
                        <span className="bg-bjp-saffron/10 text-bjp-saffron px-3 py-1 rounded-full text-xs font-bold">Since {scheme.year}</span>
                      </div>
                      <p className="text-bjp-dark-blue font-semibold text-sm mb-4">{scheme.ministry}</p>
                      <p className="text-slate-600 text-lg leading-relaxed mb-6">{scheme.description}</p>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-bold text-bjp-dark-text mb-3 text-sm uppercase tracking-wider">Eligibility Criteria</h4>
                          <ul className="space-y-2">
                            {scheme.eligibility?.map((e, j) => (
                              <li key={j} className="flex items-start gap-2 text-slate-600"><CheckCircle className="w-4 h-4 text-bjp-green mt-1 flex-shrink-0" />{e}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-bold text-bjp-dark-text mb-3 text-sm uppercase tracking-wider">Key Benefits</h4>
                          <ul className="space-y-2">
                            {scheme.benefits?.map((b, j) => (
                              <li key={j} className="flex items-start gap-2 text-slate-600"><CheckCircle className="w-4 h-4 text-bjp-saffron mt-1 flex-shrink-0" />{b}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-3 flex-shrink-0">
                      <div className="bg-bjp-saffron/10 rounded-2xl p-5 text-center">
                        <p className="text-xs font-bold text-bjp-saffron uppercase">Beneficiaries</p>
                        <p className="text-2xl font-black text-bjp-dark-text">{scheme.beneficiaries}</p>
                      </div>
                      <Link href="/register" className="btn-saffron text-sm py-2 px-5">Register <ArrowRight className="w-4 h-4" /></Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-bjp-light-bg">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.h2 variants={fadeUp} className="text-3xl font-black text-bjp-dark-text">Scheme Comparison</motion.h2>
            <motion.p variants={fadeUp} className="text-slate-500 mt-2">Side-by-side overview of all available welfare programmes.</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="card-gov overflow-hidden overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-bjp-dark-blue text-white text-sm uppercase tracking-wider">
                  <th className="p-4 font-semibold">Scheme</th>
                  <th className="p-4 font-semibold">Ministry</th>
                  <th className="p-4 font-semibold">Year</th>
                  <th className="p-4 font-semibold">Beneficiaries</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {schemes.map((s) => (
                  <tr key={s.id} className="hover:bg-orange-50 transition-colors">
                    <td className="p-4 font-bold text-bjp-dark-text">{s.name}</td>
                    <td className="p-4 text-slate-600">{s.ministry}</td>
                    <td className="p-4"><span className="bg-bjp-saffron/10 text-bjp-saffron px-2 py-1 rounded-full text-xs font-bold">{s.year}</span></td>
                    <td className="p-4 font-bold text-bjp-green">{s.beneficiaries}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
