import React, { useState } from 'react';
import { Send, CheckCircle2, MessageSquareHeart } from 'lucide-react';
import { motion } from 'motion/react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function Feedback() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await addDoc(collection(db, 'feedback'), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setIsSubmitted(true);
      setFormData({ name: '', email: '', feedback: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error: any) {
      console.error("Error submitting feedback: ", error);
      if (error.message && error.message.includes("permissions")) {
        alert("Missing Permissions: Please update your Firestore Database Security Rules in the Firebase Console.");
      } else {
        alert("Failed to submit feedback. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="feedback" className="py-24 bg-white border-t border-slate-100 relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-50 text-brand-600 mb-6 border border-brand-100 shadow-sm">
            <MessageSquareHeart size={32} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">We Value Your Feedback</h2>
          <p className="text-slate-600 text-lg">
            Help us improve our services. Please share your experience with Katiyar Medical Store.
          </p>
        </div>

        <div className="bg-slate-50 rounded-[2rem] p-8 md:p-10 shadow-sm border border-slate-200">
          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-8 text-center"
            >
              <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-sm border border-green-100">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Thank you!</h4>
              <p className="text-slate-600">Your feedback has been submitted successfully.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                    Your Name
                  </label>
                  <input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-medium text-slate-900 placeholder:text-slate-400 placeholder:font-normal" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-medium text-slate-900 placeholder:text-slate-400 placeholder:font-normal" placeholder="your@email.com" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                  Your Feedback <span className="text-red-500">*</span>
                </label>
                <textarea required name="feedback" value={formData.feedback} onChange={handleChange} rows={4} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-medium text-slate-900 placeholder:text-slate-400 placeholder:font-normal resize-none" placeholder="Tell us about your experience or how we can improve..."></textarea>
              </div>

              <div className="flex justify-end">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="inline-flex flex-1 md:flex-none items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-brand-500/25 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Send size={18} />
                      Submit Feedback
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
