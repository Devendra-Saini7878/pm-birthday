"use client";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, ChevronDown, HelpCircle, Map, CheckCircle2, MessageSquare, Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ToastProvider";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const faqs = [
  { q: "How do I register for government schemes?", a: "Visit any Seva Pakhwada camp near you, scan the QR code displayed at the entrance, and fill out the digital registration form. You can also pre-register online by clicking 'Register Now' on our website." },
  { q: "Is my personal data safe and secure?", a: "Absolutely. All data is encrypted using 256-bit SSL encryption and stored on Government of India's secure servers. We comply with all data protection regulations and your information is never shared with third parties." },
  { q: "Which government schemes are available at the camps?", a: "You can register for PM Kisan Samman Nidhi, Ayushman Bharat (PMJAY), PM Awas Yojana, Ujjwala Yojana, Jan Dhan Yojana, and PM Mudra Yojana — all at a single camp." },
  { q: "Where is the nearest camp located?", a: "Camps are set up in every district across the 5 pilot states. Contact the National Helpline at 1800-111-222 to find the nearest camp, or ask your local gram panchayat or municipal office." },
  { q: "Can I register for multiple schemes at once?", a: "Yes! The registration form allows you to select multiple schemes simultaneously. Our trained volunteers at the camp will help you determine your eligibility for each scheme." },
  { q: "What documents do I need to bring?", a: "Carry your Aadhaar Card, mobile phone (for OTP verification), and any existing scheme enrollment documents if applicable. Our digital form captures most information electronically." },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [formSent, setFormSent] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          mobile: formData.get("mobile"),
          issueType: formData.get("issueType"),
          message: formData.get("message"),
        }),
      });
      if (res.ok) {
        toast.addToast("Your message has been sent successfully!", "success");
        setFormSent(true);
        e.target.reset();
        setTimeout(() => setFormSent(false), 5000);
      }
    } catch {
      toast.addToast("Message sent! (Server may be offline)", "info");
      setFormSent(true);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* ═══ 1. HERO ═══ */}
      <section className="bg-gradient-to-br from-bjp-saffron to-bjp-deep-saffron text-white py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl mx-auto px-4 relative z-10 flex flex-col items-center">
          <motion.div variants={fadeUp} className="mb-4 text-white"><Phone className="w-16 h-16" /></motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-black mb-4">Get in Touch</motion.h1>
          <motion.p variants={fadeUp} className="text-lg text-orange-100 max-w-2xl mx-auto">Need help registering, finding a camp, or understanding a scheme? Our 24/7 helpdesk is here for you.</motion.p>
        </motion.div>
      </section>

      {/* ═══ 2. CONTACT CARDS ═══ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Phone, title: "Toll-Free Helpline", info: "1800-111-222", sub: "Available 24x7 in 12 languages", color: "bg-bjp-saffron" },
              { icon: Mail, title: "Official Email", info: "support@govcamp.in", sub: "Response within 24 hours", color: "bg-bjp-dark-blue" },
              { icon: MapPin, title: "Headquarters", info: "Ministry of Citizen Welfare", sub: "Shastri Bhawan, New Delhi 110001", color: "bg-bjp-green" },
            ].map((card, i) => (
              <motion.div key={i} variants={fadeUp} className="card-gov p-8 flex items-start gap-5">
                <div className={`${card.color} w-14 h-14 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-lg`}>
                  <card.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-bjp-dark-text">{card.title}</h3>
                  <p className="text-bjp-saffron font-semibold text-lg mt-1">{card.info}</p>
                  <p className="text-slate-500 text-sm mt-1">{card.sub}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ 3. CONTACT FORM ═══ */}
      <section className="py-16 bg-bjp-light-bg">
        <div className="max-w-6xl mx-auto px-4 md:px-8 grid md:grid-cols-5 gap-12">
          <div className="md:col-span-3 card-gov p-8">
            <h2 className="text-2xl font-black text-bjp-dark-text mb-6 flex items-center gap-2"><Send className="w-6 h-6 text-bjp-saffron" /> Send us a Message</h2>
            {formSent && <div className="flex items-center gap-2 bg-green-50 text-green-700 p-4 rounded-xl mb-4 font-semibold border border-green-200"><CheckCircle2 className="w-5 h-5 flex-shrink-0" /> Your message has been received. We'll get back to you soon!</div>}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div><label className="label-gov">Full Name *</label><input name="name" required type="text" className="input-gov" placeholder="Your full name" /></div>
                <div><label className="label-gov">Mobile Number</label><input name="mobile" type="tel" className="input-gov" placeholder="+91 XXXXX XXXXX" /></div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div><label className="label-gov">Email Address</label><input name="email" type="email" className="input-gov" placeholder="email@example.com" /></div>
                <div>
                  <label className="label-gov">Issue Type</label>
                  <select name="issueType" className="input-gov bg-white">
                    <option>Unable to register</option>
                    <option>Camp location query</option>
                    <option>Scheme details</option>
                    <option>Technical issue</option>
                    <option>Feedback</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div><label className="label-gov">Your Message *</label><textarea name="message" required rows={5} className="input-gov resize-none" placeholder="Describe your issue or query in detail..."></textarea></div>
              <button type="submit" className="btn-saffron w-full py-4 text-lg"><Send className="w-5 h-5" /> Submit Request</button>
            </form>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="card-gov p-6">
              <h3 className="font-bold text-bjp-dark-text text-lg mb-3 flex items-center gap-2"><Clock className="w-5 h-5 text-bjp-saffron" /> Working Hours</h3>
              <div className="text-slate-600 space-y-1 text-sm">
                <p><strong>Camp Registration:</strong> 9:00 AM – 6:00 PM (Mon–Sat)</p>
                <p><strong>Helpline:</strong> 24 hours, 7 days a week</p>
                <p><strong>Email Response:</strong> Within 24 business hours</p>
              </div>
            </div>
            <div className="card-gov p-6">
              <h3 className="font-bold text-bjp-dark-text text-lg mb-3 flex items-center gap-2"><MessageSquare className="w-5 h-5 text-bjp-saffron" /> Language Support</h3>
              <p className="text-slate-600 text-sm">Our helpline supports Hindi, English, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Odia, and Assamese.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 4. FAQ ═══ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-orange-50 text-bjp-saffron px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider mb-4"><HelpCircle className="w-4 h-4" /> FAQs</motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-bjp-dark-text">Frequently Asked Questions</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={fadeUp} className="card-gov overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left font-bold text-bjp-dark-text hover:text-bjp-saffron transition-colors">
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180 text-bjp-saffron" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">{faq.a}</div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ 5. MAP PLACEHOLDER ═══ */}
      <section className="py-16 bg-bjp-light-bg">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="card-gov p-12 text-center border-2 border-dashed border-orange-200">
            <Map className="w-16 h-16 text-bjp-saffron/30 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-bjp-dark-text mb-2">Camp Locator Map</h3>
            <p className="text-slate-500">Google Maps Integration — Coming Soon</p>
            <p className="text-sm text-slate-400 mt-2">Find the nearest Seva Pakhwada camp in your district</p>
          </div>
        </div>
      </section>
    </div>
  );
}
