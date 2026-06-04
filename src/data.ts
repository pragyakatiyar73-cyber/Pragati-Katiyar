import { Pill, Activity, Syringe, TestTube, Leaf, Droplet, Heart, Apple, Coffee, Store, Sun } from 'lucide-react';

export const storeInfo = {
  name: "Katiyar Medical Store",
  address: "Rautapur Bamba, Bela Road, Chaubepur, Kanpur Nagar",
  phone: "8726713648",
  email: "katiyarmedical17@gmail.com",
  hours: "10:00 AM - 8:00 PM (10 Hours)",
  owner: "Shivam Katiyar",
  degree: "B.Pharm (Pharmacist)"
};

export const services = [
  { id: 1, title: 'Prescription Medicines', icon: Pill, description: 'Authentic prescription medications filled by certified pharmacists.' },
  { id: 2, title: 'Over-the-Counter', icon: Activity, description: 'Common medicines for quick relief from minor ailments.' },
  { id: 3, title: 'Health Supplements', icon: Heart, description: 'Vitamins and dietary supplements for everyday wellness.' },
  { id: 4, title: 'Diabetes Care', icon: Syringe, description: 'Insulin, blood sugar monitors, and specialized care products.' },
  { id: 5, title: 'Lab Tests', icon: TestTube, description: 'Sample collection and diagnostic health testing services.' },
  { id: 6, title: 'In-Store Pickup', icon: Store, description: 'Order by phone and pick up directly at the store. (No home delivery available)' }
];

export const categories = [
  { name: 'Vitamin Store', icon: Heart },
  { name: 'Health Store', icon: Activity },
  { name: 'Summer Store', icon: Sun },
  { name: 'Homeopathy Care', icon: Droplet },
  { name: 'Ayurvedic Care', icon: Leaf },
  { name: 'Glucon-D & Energy', icon: Coffee },
  { name: 'Personal Care', icon: Heart },
  { name: 'Healthy Food & Drinks', icon: Apple }
];

export const healthConcerns = [
  { name: 'Fever & Cold', image: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&q=80&w=400&h=300' },
  { name: 'Skin Care', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=400&h=300' },
  { name: 'Bone & Joint', image: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=400&h=300' },
  { name: 'Heart Health', image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=400&h=300' },
  { name: 'Stomach Care', image: 'https://images.unsplash.com/photo-1576602976047-174e508eb6d4?auto=format&fit=crop&q=80&w=400&h=300' },
  { name: 'Diabetes Management', image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&q=80&w=400&h=300' },
];
