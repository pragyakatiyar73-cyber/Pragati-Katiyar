import { motion } from 'motion/react';
import { categories, healthConcerns, storeInfo } from '../data';
import { GraduationCap, Award, ShieldCheck } from 'lucide-react';

export function Categories() {
  return (
    <section id="categories" className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Shop by Category</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">Find the right products for your specific health needs.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                className="group bg-slate-50 border border-slate-100 rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:border-brand-200 hover:bg-brand-50 hover:shadow-lg hover:shadow-brand-100/40"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-brand-600 group-hover:shadow-sm transition-all mb-5 shadow-sm border border-slate-100">
                  <Icon size={28} strokeWidth={2} />
                </div>
                <h3 className="font-semibold text-slate-900 group-hover:text-brand-700 transition-colors">{cat.name}</h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function HealthConcerns() {
  return (
    <section id="health-concerns" className="py-24 bg-slate-800 text-white border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold mb-4">Health Concerns & Lab Tests</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">Visual guide to common health issues we cater to with specialized medicines and complete sample testing.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {healthConcerns.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="rounded-3xl overflow-hidden bg-slate-900 shadow-xl group border border-slate-700 relative"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent flex items-end p-8">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:-translate-y-1 transition-transform">{item.name}</h3>
                    <p className="text-sm text-brand-300 font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">View medicines & tests</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StoreVideoPromo() {
  return (
    <section id="promo-video" className="py-24 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">A Legacy of Trust & Care</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">Serving the local community of Chaubepur with dedication for over two years.</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
             <h3 className="text-2xl font-bold text-slate-900 mb-4">
               Katiyar Medical Store<br/>
               <span className="text-brand-600">आपकी सेहत, हमारी जिम्मेदारी</span>
             </h3>
             <p className="text-slate-600 mb-6 leading-relaxed">
               For over two years, Katiyar Medical Store at Rautapur Bamba, Bela Road, Chaubepur has been serving the community selflessly. Every customer here is treated like family. We are not just a medical store, but a trusted companion for your entire family's health.
             </p>
             <p className="text-slate-600 mb-6 leading-relaxed">
               All types of generic and branded medicines are available with full quality guarantee, along with special discounts from <strong>5% to 10%</strong> on every medicine. 
             </p>
             <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-100">
                <p className="font-bold text-brand-800 text-lg">
                  हमारा वादा है: सही दवा, सही सलाह, और बचत भी बेमिसाल!
                </p>
             </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border-8 border-white group">
              <video 
                className="w-full h-full object-cover" 
                controls 
                src="/promo-video.mp4"
                title="Store Promo Video"
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <p className="text-sm text-slate-500 mt-4 text-center">
              * Video placeholder. Add <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">promo-video.mp4</code> to your public folder.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

import ownerPhoto from '../assets/images/shivam_katiyar_pharmacy_1780477486293.png';

export function AboutOwner() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 text-brand-700 font-medium text-sm mb-6">
              <ShieldCheck size={18} />
              <span>Licensed Professional</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Meet the Owner</h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Founded and operated by <strong className="text-slate-900">{storeInfo.owner}</strong>, {storeInfo.name} is dedicated to providing authentic medicines, expert health guidance, and trusted care to the local community of Chaubepur. Please give an opportunity to serve you once.
            </p>

            <div className="space-y-8">
              <div className="flex gap-5">
                <div className="w-14 h-14 bg-slate-50 flex-shrink-0 rounded-2xl flex items-center justify-center text-brand-600 border border-slate-100">
                  <GraduationCap size={28} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 leading-tight mb-1">Educational Background</h4>
                  <p className="text-slate-600">Graduated in <span className="font-medium text-slate-800">{storeInfo.degree}</span>, ensuring professional knowledge of pharmaceuticals and medicinal interactions.</p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="w-14 h-14 bg-slate-50 flex-shrink-0 rounded-2xl flex items-center justify-center text-brand-600 border border-slate-100">
                  <Award size={28} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 leading-tight mb-1">Trusted Quality</h4>
                  <p className="text-slate-600">Committed to strictly dispensing genuine, safely stored medicines from verified distributors only.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative max-w-md mx-auto">
              <div className="aspect-[4/5] bg-slate-100 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white relative z-10">
                <img
                  src={ownerPhoto}
                  alt="Pharmacist"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Floating Tag */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="absolute bottom-10 -left-6 lg:-left-12 bg-white p-6 rounded-3xl shadow-xl border border-slate-100 z-20 flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-brand-50 rounded-full flex items-center justify-center text-brand-600">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p className="font-bold text-lg text-slate-900 leading-tight">{storeInfo.owner}</p>
                  <p className="text-brand-600 font-semibold text-sm">{storeInfo.degree}</p>
                </div>
              </motion.div>
              
              {/* Background accent */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-50 rounded-[3rem] -z-10 rotate-6"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
