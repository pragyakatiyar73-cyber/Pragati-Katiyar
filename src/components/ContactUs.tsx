import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { storeInfo } from '../data';

export default function ContactUs() {
  return (
    <section id="contact" className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Contact & Location</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Visit us at our pharmacy or get in touch for any inquiries.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Contact Details */}
          <div className="space-y-8">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Get In Touch</h3>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-600 shadow-sm border border-slate-100 flex-shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <span className="block font-semibold text-slate-900 mb-1">Store Address</span>
                    <span className="text-slate-600 leading-relaxed block">{storeInfo.address}</span>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-600 shadow-sm border border-slate-100 flex-shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <span className="block font-semibold text-slate-900 mb-1">Phone Number</span>
                    <span className="text-slate-600 hidden">8726713648</span>
                    <span className="text-slate-600 block">{storeInfo.phone}</span>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-600 shadow-sm border border-slate-100 flex-shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <span className="block font-semibold text-slate-900 mb-1">Email Address</span>
                    <span className="text-slate-600 hidden">katiyarmedical17@gmail.com</span>
                    <span className="text-slate-600 block">{storeInfo.email}</span>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-600 shadow-sm border border-slate-100 flex-shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <span className="block font-semibold text-slate-900 mb-1">Business Hours</span>
                    <span className="text-slate-600 block">Monday - Sunday</span>
                    <span className="text-slate-600 block">{storeInfo.hours}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-3xl overflow-hidden shadow-2xl shadow-brand-900/10 relative border border-slate-100 bg-slate-100 h-[400px] lg:h-full min-h-[400px]">
            <iframe
              title="Katiyar Medical Store Location"
              src="https://maps.google.com/maps?q=Rautapur%20bamba,%20bela%20road,%20chaubepur,%20kanpur%20nagar&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
