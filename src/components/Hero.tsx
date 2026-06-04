import { motion } from 'motion/react';
import { ArrowRight, MapPin, Store, Percent } from 'lucide-react';
import { storeInfo } from '../data';

export default function Hero() {
  return (
    <section id="home" className="relative bg-white pt-24 pb-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#0d9488 2px, transparent 2px)', backgroundSize: '32px 32px' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 border border-brand-100 text-brand-700 font-medium text-sm mb-6">
              <Store size={16} />
              <span>Your Trusted Neighborhood Pharmacy</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-tight mb-6">
              Quality medicines & expert care for your <span className="text-brand-600 relative inline-block">health<svg className="absolute w-full h-3 -bottom-1 text-brand-200 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></svg></span>.
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-6 leading-relaxed max-w-xl">
              We provide a wide range of prescription medicines, healthcare products, and lab tests at affordable prices right here in Kanpur Nagar.
              <br className="hidden md:block"/>
              <span className="text-brand-600 font-medium italic mt-2 inline-block">"Please give an opportunity to serve you once."</span>
              <br />
              <span className="text-slate-800 font-bold mt-4 inline-block bg-brand-50 px-3 py-1 rounded-md border border-brand-100">Please note: In-store pickup only. No home delivery.</span>
            </p>

            {/* Discount Banner */}
            <div className="bg-brand-50 border border-brand-200 rounded-2xl p-4 flex items-center gap-4 mb-8 shadow-sm shadow-brand-100/50 max-w-lg">
              <div className="bg-white p-3 rounded-xl text-brand-600 shadow-sm border border-brand-50">
                <Percent size={24} />
              </div>
              <div>
                <h3 className="text-brand-800 font-bold leading-tight">Special In-Store Discounts!</h3>
                <p className="text-brand-700/80 text-sm font-medium">Avail flat 5%, 10%, and up to 15% OFF on medicines and healthcare products.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a href="#services" className="inline-flex justify-center items-center gap-2 bg-brand-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-brand-700 transition-all shadow-lg shadow-brand-200 hover:-translate-y-0.5">
                Explore Services
                <ArrowRight size={18} />
              </a>
              <a href="#contact" className="inline-flex justify-center items-center gap-2 bg-white text-slate-700 border-2 border-slate-200 px-8 py-4 rounded-xl font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all">
                <MapPin size={18} className="text-brand-600" />
                Find Our Store
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 text-sm text-slate-500 border-t border-slate-100 pt-8">
              <div className="flex flex-col">
                <span className="font-bold text-slate-800 text-base mb-1">12 Hours</span>
                <span>Open Daily</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-slate-800 text-base mb-1">Expert Care</span>
                <span>Certified Pharmacist</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-slate-800 text-base mb-1">Genuine</span>
                <span>100% Authentic</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative lg:ml-auto w-full max-w-[500px] mx-auto"
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-8 border-white relative z-10 bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=800"
                alt="Pharmacy Counter"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent p-6 pt-16">
                <div className="text-white">
                  <p className="font-bold text-xl">{storeInfo.name}</p>
                  <p className="text-sm opacity-90">{storeInfo.address.split(',')[0]}, {storeInfo.address.split(',')[3]}</p>
                </div>
              </div>
            </div>
            
            {/* Decorative blobs */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-brand-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 z-0"></div>
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 z-0"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
