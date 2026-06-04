import { motion } from 'motion/react';
import { services } from '../data';

export default function Services() {
  return (
    <section id="services" className="py-24 bg-slate-50 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Core Services</h2>
          <p className="text-slate-600 text-lg">
            We provide a comprehensive range of healthcare services and authentic medicines to support your well-being.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 transition-all hover:shadow-xl hover:shadow-brand-100/50"
              >
                <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 mb-6">
                  <Icon size={28} strokeWidth={2.2} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
