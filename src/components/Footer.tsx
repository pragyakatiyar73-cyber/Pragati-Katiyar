import { MapPin, Phone, Mail, Clock, ShieldAlert } from 'lucide-react';
import { storeInfo } from '../data';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">{storeInfo.name}</h3>
            <p className="text-slate-400 max-w-md mb-8 leading-relaxed">
              Your trusted neighborhood pharmacy committed to providing authentic medicines, health supplements, and expert advice. Walk-in today for all your medical needs.
            </p>
            <div className="inline-flex items-start gap-3 bg-brand-950/40 p-4 rounded-2xl border border-brand-900/50">
              <ShieldAlert size={20} className="text-brand-400 mt-0.5 flex-shrink-0" />
              <div>
                <span className="block text-white font-medium mb-1 line-clamp-1">Important Notice</span>
                <span className="text-brand-300/80 text-sm">We currently do not offer home delivery. All orders are for in-store pickup only.</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <MapPin size={20} className="text-brand-500 mt-0.5 flex-shrink-0" />
                <span className="leading-snug">{storeInfo.address}</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone size={20} className="text-brand-500 flex-shrink-0" />
                <span className="leading-snug">{storeInfo.phone}</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail size={20} className="text-brand-500 flex-shrink-0" />
                <span className="leading-snug">{storeInfo.email}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6">Business Hours</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <Clock size={20} className="text-brand-500 mt-1 flex-shrink-0" />
                <div>
                  <span className="block mb-2 text-slate-300">Monday - Sunday</span>
                  <span className="text-white font-semibold bg-brand-500/20 px-3 py-1.5 rounded-lg border border-brand-500/30">
                    {storeInfo.hours}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} {storeInfo.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <p className="text-sm text-slate-500">
              Owned & Operated by <span className="text-slate-300 font-medium">{storeInfo.owner}</span>
            </p>
            <a href="#admin" className="text-sm font-medium text-slate-500 hover:text-brand-400 transition-colors">
              Owner Login
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
