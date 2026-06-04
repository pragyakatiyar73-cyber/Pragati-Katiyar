import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Menu, X, PlusSquare, LogIn, LogOut, Search } from 'lucide-react';
import { storeInfo } from '../data';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth);
  };

  const links = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Categories', href: '#categories' },
    { name: 'About Owner', href: '#about' },
    { name: 'Consult', href: '#consult' },
    { name: 'Feedback', href: '#feedback' },
  ];

  return (
    <header className="sticky top-0 z-50">
      {/* Announcement Bar */}
      <div className="bg-brand-600 text-brand-50 text-center py-2 px-4 text-xs sm:text-sm font-semibold tracking-wide">
        🎉 Special In-Store Offers: Enjoy flat 5%, 10%, and 15% discounts on medicines and health products!
      </div>
      <nav className="bg-white border-b border-slate-200 shadow-sm relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-brand-600 text-white p-2 rounded-lg">
              <PlusSquare size={28} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl leading-tight text-slate-900">Katiyar</span>
              <span className="text-xs font-bold text-brand-600 leading-tight tracking-wider uppercase">Medical Store</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-semibold text-slate-600 hover:text-brand-600 transition-colors">
                {link.name}
              </a>
            ))}
            <div className="h-6 w-px bg-slate-200"></div>
            <a href="#search" className="flex items-center gap-1.5 text-brand-600 bg-brand-50 hover:bg-brand-100 px-4 py-2 rounded-full text-sm font-semibold transition-colors border border-brand-100">
              <Search size={16} />
              <span>Search Medicines</span>
            </a>
            {!user ? (
              <a href="#auth" className="flex items-center gap-1.5 text-brand-600 bg-brand-50 hover:bg-brand-100 px-4 py-2 rounded-full text-sm font-semibold transition-colors border border-brand-100">
                <LogIn size={16} />
                <span>Sign In</span>
              </a>
            ) : (
              <div className="flex items-center gap-4">
                <a href="#my-bookings" className="text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors">
                  My Bookings
                </a>
                <button onClick={handleSignOut} className="flex items-center gap-1.5 text-red-600 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-full text-sm font-semibold transition-colors border border-red-100">
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
            <a href="#contact" className="ml-1 flex items-center gap-2 bg-brand-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-700 transition-colors shadow-sm shadow-brand-200">
              <Phone size={16} />
              <span>Contact Us</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 hover:text-brand-600 bg-slate-50 p-2 rounded-lg">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 flex flex-col gap-2 shadow-xl">
              {links.map((link) => (
                <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl text-base font-medium text-slate-700 hover:text-brand-600 hover:bg-brand-50 transition-colors">
                  {link.name}
                </a>
              ))}
              <div className="h-px w-full bg-slate-100 my-1"></div>
              <a href="#search" onClick={() => setIsOpen(false)} className="mt-2 flex w-full justify-center items-center gap-2 bg-brand-50 text-brand-600 border border-brand-100 px-5 py-3.5 rounded-xl font-medium shadow-sm">
                <Search size={18} />
                <span>Search Medicines</span>
              </a>
              {!user ? (
                <a href="#auth" onClick={() => setIsOpen(false)} className="mt-2 flex w-full justify-center items-center gap-2 bg-brand-50 text-brand-600 border border-brand-100 px-5 py-3.5 rounded-xl font-medium shadow-sm">
                  <LogIn size={18} />
                  <span>Sign In / Sign Up</span>
                </a>
              ) : (
                <>
                  <a href="#my-bookings" onClick={() => setIsOpen(false)} className="mt-2 text-center block px-4 py-3 rounded-xl text-base font-medium text-brand-600 hover:bg-brand-50 transition-colors">
                    My Bookings
                  </a>
                  <button onClick={() => { handleSignOut(); setIsOpen(false); }} className="mt-2 flex w-full justify-center items-center gap-2 bg-red-50 text-red-600 border border-red-100 px-5 py-3.5 rounded-xl font-medium shadow-sm">
                    <LogOut size={18} />
                    <span>Sign Out</span>
                  </button>
                </>
              )}
              <a href="#contact" onClick={() => setIsOpen(false)} className="mt-2 flex w-full justify-center items-center gap-2 bg-brand-600 text-white px-5 py-3.5 rounded-xl font-medium shadow-sm">
                <Phone size={18} />
                <span>Call {storeInfo.phone}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </nav>
    </header>
  );
}
