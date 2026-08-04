import { HeartPulse, FileText, Phone, MapPin, Pill, Activity, Stethoscope, Baby, Smile, Heart, User, Clock } from 'lucide-react';

export const storeInfo = {
  name: "Katiyar Medical Store",
  owner: "Shivam Katiyar",
  address: "Near S.P Office, Kutchery Road, Kannauj (U.P) - 209725",
  phone: "+91-8726715454",
  email: "kumarshivamkatiyar6@gmail.com",
  timings: "9:00 AM to 10:00 PM (Everyday)",
  hours: "9:00 AM to 10:00 PM (Everyday)",
  about: "Katiyar Medical Store is a trusted pharmacy in Kannauj, providing authentic medicines, healthcare products, and consultation bookings. Led by Shivam Katiyar, we prioritize your health with quick service and reliable guidance.",
  degree: "D.Pharma, B.Pharma"
};

export const services = [
  { id: 1, title: 'Authentic Medicines', description: '100% genuine prescribed and OTC medicines.', icon: Pill },
  { id: 2, title: 'Doctor Consultations', description: 'Book appointments with top doctors easily.', icon: Stethoscope },
  { id: 3, title: 'Health Supplements', description: 'Vitamins, proteins, and daily health supplements.', icon: Activity },
];

export const categories = [
  { name: 'Tablets & Capsules', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80', icon: Pill },
  { name: 'Syrups & Liquids', image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&q=80', icon: Activity },
  { name: 'Creams & Ointments', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80', icon: FileText },
  { name: 'Baby Care', image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400&q=80', icon: Baby }
];

export const healthConcerns = [
  { name: 'Diabetes Care', icon: HeartPulse, color: 'bg-red-50 text-red-600', image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&q=80' },
  { name: 'Cardiac Care', icon: Heart, color: 'bg-rose-50 text-rose-600', image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&q=80' },
  { name: 'Stomach Care', icon: Activity, color: 'bg-orange-50 text-orange-600', image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&q=80' },
  { name: 'Bone & Joint', icon: User, color: 'bg-blue-50 text-blue-600', image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&q=80' },
  { name: 'Baby Care', icon: Baby, color: 'bg-purple-50 text-purple-600', image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400&q=80' },
  { name: 'Skin Care', icon: Smile, color: 'bg-pink-50 text-pink-600', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80' },
];
