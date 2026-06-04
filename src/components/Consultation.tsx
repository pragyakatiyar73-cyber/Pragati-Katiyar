import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, Stethoscope, AlertCircle, LogIn } from 'lucide-react';
import { motion } from 'motion/react';
import { storeInfo } from '../data';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export default function Consultation() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    issue: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (!user) throw new Error("Must be logged in to book an appointment.");
      await addDoc(collection(db, 'inquiries'), {
        ...formData,
        userId: user.uid,
        userEmail: user.email,
        createdAt: serverTimestamp()
      });
      setIsSubmitted(true);
      setFormData({ name: '', phone: '', email: '', issue: '', message: '' });
      
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error: any) {
      console.error("Error adding document: ", error);
      if (error.message && error.message.includes("permissions")) {
        alert("Missing Permissions: Please update your Firestore Database Security Rules in the Firebase Console.");
      } else {
        alert("Failed to submit inquiry. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="consult" className="py-24 bg-brand-900 border-t border-brand-800 text-white relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-brand-800 mix-blend-screen opacity-50 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-brand-700 mix-blend-screen opacity-50 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-800 border border-brand-700 text-brand-100 font-medium text-sm mb-6">
              <Stethoscope size={18} />
              <span>Fundamental Health Consult</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Consult with <span className="text-brand-300">{storeInfo.owner}</span>
            </h2>
            
            <p className="text-lg text-brand-100/90 mb-8 leading-relaxed max-w-xl">
              Experiencing a fundamental health issue? Fill out the inquiry form below to request a consultation. Our certified pharmacist will review your symptoms and advise on suitable over-the-counter remedies or direct you to further medical care.
            </p>
            
            <ul className="space-y-4 mb-10 max-w-lg">
              {['Fever, Cough, and Cold Guidance', 'Digestive and Stomach Issues', 'Skin Care & Basic Allergies', 'General Weakness and Supplements'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-brand-50 bg-brand-800/40 p-3 rounded-xl border border-brand-700/50">
                  <CheckCircle2 size={20} className="text-brand-400 flex-shrink-0" />
                  <span className="font-medium text-sm md:text-base">{item}</span>
                </li>
              ))}
            </ul>

            <div className="border-l-4 border-brand-500 pl-5 opacity-90 max-w-lg">
              <p className="text-sm font-medium text-brand-200">Important Medical Disclaimer</p>
              <p className="text-sm text-brand-300 mt-1">This service is strictly for fundamental, day-to-day health issues. For severe pains, prolonged symptoms, or emergencies, please visit an accredited hospital immediately.</p>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl text-slate-900 mx-auto w-full max-w-lg relative z-20">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Inquiry Form</h3>
            <p className="text-slate-500 text-sm mb-8">Send us your details and we will call you back shortly.</p>

            {!user ? (
              <div className="flex flex-col items-center justify-center py-8 text-center bg-brand-50 rounded-2xl border border-brand-100 px-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-brand-600 mb-4 shadow-sm border border-brand-100">
                  <AlertCircle size={32} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Sign In Required</h4>
                <p className="text-slate-600 text-sm mb-6">
                  Please sign in to your account to book an appointment and request guidance.
                </p>
                <a href="#auth" className="inline-flex items-center gap-2 bg-brand-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-700 transition-all shadow-md shadow-brand-200 text-sm">
                  <LogIn size={18} />
                  Sign In / Sign Up
                </a>
              </div>
            ) : isSubmitted ? (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="flex flex-col items-center justify-center py-12 text-center"
               >
                 <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-sm border border-green-100">
                   <CheckCircle2 size={40} />
                 </div>
                 <h4 className="text-2xl font-bold text-slate-900 mb-3">Request Sent!</h4>
                 <p className="text-slate-600 leading-relaxed">
                   Thank you for reaching out. <strong>{storeInfo.owner}</strong> will review your inquiry and get back to you at your provided number soon.
                 </p>
               </motion.div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-medium text-slate-900 placeholder:text-slate-400 placeholder:font-normal" placeholder="Enter your name" />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-medium text-slate-900 placeholder:text-slate-400 placeholder:font-normal" placeholder="+91 XXXXXXXXXX" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-medium text-slate-900 placeholder:text-slate-400 placeholder:font-normal" placeholder="Enter your email" />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                    Primary Issue <span className="text-red-500">*</span>
                  </label>
                  <select required name="issue" value={formData.issue} onChange={handleChange} className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-medium text-slate-900">
                    <option value="" disabled>Select an issue...</option>
                    <option value="fever">Fever, Cough & Cold</option>
                    <option value="digestion">Digestion & Stomach Upset</option>
                    <option value="skin">Skin Allergies / First Aid</option>
                    <option value="pain">Body & Joint Pain</option>
                    <option value="other">Other General Inquiry</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Symptoms / Message</label>
                  <textarea required name="message" value={formData.message} onChange={handleChange} rows={3} className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-medium text-slate-900 placeholder:text-slate-400 placeholder:font-normal resize-none" placeholder="Briefly describe what you're experiencing..."></textarea>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-brand-500/25 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Send size={18} />
                      Submit Inquiry
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
