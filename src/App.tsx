/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import { Categories, HealthConcerns, AboutOwner, StoreVideoPromo } from './components/StoreSections';
import Consultation from './components/Consultation';
import Feedback from './components/Feedback';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import AdminPortal from './components/AdminPortal';
import Auth from './components/Auth';
import MyBookings from './components/MyBookings';
import MedicineSearch from './components/MedicineSearch';

export default function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (currentHash === '#admin') {
    return <AdminPortal />;
  }

  if (currentHash === '#auth') {
    return <Auth />;
  }

  if (currentHash === '#my-bookings') {
    return <MyBookings />;
  }

  if (currentHash === '#search') {
    return (
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-brand-200 selection:text-brand-900 overflow-hidden">
        <Navbar />
        <MedicineSearch />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-brand-200 selection:text-brand-900 overflow-hidden">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Categories />
        <HealthConcerns />
        <AboutOwner />
        <StoreVideoPromo />
        <Consultation />
        <Feedback />
        <ContactUs />
      </main>
      <Footer />
    </div>
  );
}
