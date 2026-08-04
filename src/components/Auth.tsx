import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { LogIn, ArrowLeft, CheckCircle2, ShieldCheck, UserPlus } from 'lucide-react';
import { motion } from 'motion/react';

export default function Auth() {
const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (isSignUp && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        if (auth.currentUser) {
          await updateProfile(auth.currentUser, { displayName: formData.name });
        }
      } else {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
      }
      setIsSuccess(true);
      setTimeout(() => {
         window.location.hash = ''; // go back to home
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pt-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto relative z-10">
        
        <button onClick={() => window.location.hash = ''} className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-600 font-medium transition-colors mb-8">
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </button>

        <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100 mb-10">
          
          <div className="text-center mb-8">
            <div className={`w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center text-brand-600 mx-auto mb-4 border border-brand-100`}>
              {isSignUp ? <UserPlus size={32} /> : <LogIn size={32} />}
            </div>
            <h1 className="text-2xl font-bold text-slate-900">{isSignUp ? 'Create an Account' : 'Sign In'}</h1>
            <p className="text-slate-500 mt-2 text-sm">
              {isSignUp ? 'Sign up to book appointments and track inquiries.' : 'Welcome back! Sign in to book appointments.'}
            </p>
          </div>

          {isSuccess ? (
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="flex flex-col items-center justify-center py-6 text-center"
             >
               <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-sm border border-green-100">
                 <CheckCircle2 size={40} />
               </div>
               <h4 className="text-2xl font-bold text-slate-900 mb-3">
                 {isSignUp ? 'Account Created!' : 'Sign In Successful!'}
               </h4>
               <p className="text-slate-600 leading-relaxed max-w-sm">
                 Redirecting you to the home page...
               </p>
             </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100">
                  {error}
                </div>
              )}

              {isSignUp && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-medium text-slate-900 placeholder:text-slate-400"
                    placeholder="John Doe"
                    required={isSignUp}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-medium text-slate-900 placeholder:text-slate-400"
                  placeholder="name@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1">Password</label>
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-medium text-slate-900 placeholder:text-slate-400"
                  placeholder="••••••••"
                  required
                />
              </div>

              {isSignUp && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1">Confirm Password</label>
                  <input 
                    type="password" 
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-medium text-slate-900 placeholder:text-slate-400"
                    placeholder="••••••••"
                    required={isSignUp}
                  />
                </div>
              )}

              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-brand-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <ShieldCheck size={18} />
                      <span className="tracking-wide">{isSignUp ? 'Create Account' : 'Sign In'}</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

          {!isSuccess && (
            <div className="mt-6 text-center text-sm font-medium text-slate-600">
              {isSignUp ? "Already have an account? " : "Don't have an account? "}
              <button 
                type="button"
                onClick={() => setIsSignUp(!isSignUp)} 
                className="text-brand-600 hover:text-brand-700 font-bold hover:underline"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
