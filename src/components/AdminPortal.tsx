import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { ShieldCheck, Calendar, Clock, CheckCircle, Trash2, Plus, X, LogOut, Loader2, User, Package, DownloadCloud } from 'lucide-react';
import { seedMedicinesToFirestore } from '../lib/importMedicines';

export default function AdminPortal() {
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: 'kumarshivamkatiyar6@gmail.com', password: '' });
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [inquiries, setInquiries] = useState<any[]>([]);
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [medicines, setMedicines] = useState<any[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [activeTab, setActiveTab] = useState<'bookings' | 'feedback' | 'inventory'>('bookings');

  // New Booking & Medicine State
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddMedModal, setShowAddMedModal] = useState(false);
  const [newBooking, setNewBooking] = useState({ name: '', phone: '', email: '', issue: '', status: 'pending' });
  const [newMedicine, setNewMedicine] = useState({ name: '', description: '', price: '', category: '', inStock: true });

  const [isImporting, setIsImporting] = useState(false);

  // Check if already logged in as admin
  useEffect(() => {
    const checkAdmin = () => {
      const user = auth.currentUser;
      if (user?.email === 'kumarshivamkatiyar6@gmail.com') {
        setIsAdminAuth(true);
        fetchData();
      }
    };
    checkAdmin();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user?.email === 'kumarshivamkatiyar6@gmail.com') {
        setIsAdminAuth(true);
        fetchData();
      } else {
        setIsAdminAuth(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    if (loginForm.email !== 'kumarshivamkatiyar6@gmail.com' || loginForm.password !== '872671') {
      setLoginError('Invalid admin credentials.');
      setIsLoggingIn(false);
      return;
    }

    try {
      try {
        await signInWithEmailAndPassword(auth, loginForm.email, loginForm.password);
      } catch (err: any) {
        if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
          // Create the admin user if it doesn't exist
          await createUserWithEmailAndPassword(auth, loginForm.email, loginForm.password);
        } else {
          throw err;
        }
      }
      setIsAdminAuth(true);
      fetchData();
    } catch (error: any) {
      console.error(error);
      // Fallback local auth if firebase fails
      setIsAdminAuth(true);
      fetchData();
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setIsAdminAuth(false);
    window.location.hash = '';
  };

  const fetchData = async () => {
    setIsLoadingData(true);
    try {
      const qInquiries = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
      const snapshotInquiries = await getDocs(qInquiries);
      const dataInquiries = snapshotInquiries.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setInquiries(dataInquiries);

      const qFeedback = query(collection(db, 'feedback'), orderBy('createdAt', 'desc'));
      const snapshotFeedback = await getDocs(qFeedback);
      const dataFeedback = snapshotFeedback.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFeedbacks(dataFeedback);

      const qMedicines = query(collection(db, 'medicines'), orderBy('name', 'asc'));
      const snapshotMedicines = await getDocs(qMedicines);
      const dataMedicines = snapshotMedicines.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMedicines(dataMedicines);
    } catch (error: any) {
      console.error("Error fetching data", error);
      if (error?.message && error.message.includes('permissions')) {
        alert("Missing Permissions: Please allow read/write in your Firestore Security Rules to load bookings.");
      }
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    try {
      await deleteDoc(doc(db, 'inquiries', id));
      setInquiries(inquiries.filter(inq => inq.id !== id));
    } catch (error) {
      console.error("Error deleting", error);
      if (error && typeof error === 'object' && 'message' in error && (error.message as string).includes('permissions')) {
        alert("Permission denied! Please update your Firestore Security Rules to allow read/write in your Firebase Console.");
      } else {
        alert("Failed to delete.");
      }
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    try {
      await updateDoc(doc(db, 'inquiries', id), { status: newStatus });
      setInquiries(inquiries.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq));
    } catch (error) {
      console.error("Error updating", error);
      if (error && typeof error === 'object' && 'message' in error && (error.message as string).includes('permissions')) {
        alert("Permission denied! Please update your Firestore Security Rules to allow read/write in your Firebase Console.");
      } else {
        alert("Failed to update status.");
      }
    }
  };

  const handleAddBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'inquiries'), {
        ...newBooking,
        adminAdded: true,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      setShowAddModal(false);
      setNewBooking({ name: '', phone: '', email: '', issue: '', status: 'pending' });
      fetchData(); // refresh list
    } catch (error) {
      console.error("Error adding booking", error);
      if (error && typeof error === 'object' && 'message' in error && (error.message as string).includes('permissions')) {
        alert("Permission denied! Please update your Firestore Security Rules to allow read/write in your Firebase Console.");
      } else {
        alert("Failed to add booking.");
      }
    }
  };

  const handleAddMedicine = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'medicines'), {
        ...newMedicine,
        name: newMedicine.name.trim(),
        price: Number(newMedicine.price) || 0,
        createdAt: serverTimestamp()
      });
      setShowAddMedModal(false);
      setNewMedicine({ name: '', description: '', price: '', category: '', inStock: true });
      fetchData(); // refresh list
    } catch (error: any) {
      console.error("Error adding medicine", error);
      if (error?.message && error.message.includes('permissions')) {
        alert("Permission denied! Please update your Firestore Security Rules to allow read/write in your Firebase Console.");
      } else {
        alert("Failed to add medicine.");
      }
    }
  };

  const handleImport = async () => {
    if (!window.confirm("Are you sure you want to import the default list of medicines? This will add missing medicines.")) return;
    setIsImporting(true);
    try {
      const count = await seedMedicinesToFirestore();
      alert(`Successfully imported ${count} new medicines!`);
      fetchData();
    } catch (error: any) {
      console.error("Error importing medicines:", error);
      alert(`Failed to import medicines: ${error.message}`);
    } finally {
      setIsImporting(false);
    }
  };

  const handleToggleStock = async (id: string, currentStock: boolean) => {
    try {
      const docRef = doc(db, 'medicines', id);
      await updateDoc(docRef, { inStock: !currentStock });
      setMedicines(medicines.map(med => med.id === id ? { ...med, inStock: !currentStock } : med));
    } catch (error: any) {
      console.error("Error updating stock", error);
      if (error?.message && error.message.includes('permissions')) {
        alert("Permission denied! Please update your Firestore Security Rules.");
      } else {
        alert("Failed to update stock status.");
      }
    }
  };

  const handleDeleteMedicine = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this medicine?")) return;
    try {
      await deleteDoc(doc(db, 'medicines', id));
      setMedicines(medicines.filter(med => med.id !== id));
    } catch (error: any) {
      console.error("Error deleting medicine", error);
      if (error?.message && error.message.includes('permissions')) {
        alert("Permission denied!");
      } else {
        alert("Failed to delete medicine.");
      }
    }
  };

  if (!isAdminAuth) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-brand-600"></div>
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-brand-100">
              <ShieldCheck size={32} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Portal</h1>
            <p className="text-slate-500 text-sm mt-1">Sign in with owner credentials</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-medium border border-red-100 text-center">
                {loginError}
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Admin Email</label>
              <input
                type="email"
                value={loginForm.email}
                onChange={e => setLoginForm({...loginForm, email: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium text-slate-900"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={e => setLoginForm({...loginForm, password: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium text-slate-900"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg mt-4"
            >
              {isLoggingIn ? <Loader2 size={18} className="animate-spin" /> : 'Access Dashboard'}
            </button>
          </form>
          
          <button onClick={() => window.location.hash = ''} className="w-full mt-4 text-center text-slate-500 hover:text-brand-600 text-sm font-medium">
            &larr; Back to Website
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pt-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full mx-auto relative z-10 pb-20">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="text-brand-600" />
              Owner Dashboard
            </h1>
            <p className="text-slate-500 text-sm">Manage appointments and inquiries</p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm"
            >
              <Plus size={16} />
              New Booking
            </button>
            <button 
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-2 border border-slate-200"
            >
              <LogOut size={16} />
              Exit
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500 mb-1">Total Bookings</p>
              <h3 className="text-3xl font-bold text-slate-900">{inquiries.length}</h3>
            </div>
            <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center border border-brand-100">
              <Calendar size={24} />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500 mb-1">Pending Inquiries</p>
              <h3 className="text-3xl font-bold text-yellow-600">{inquiries.filter(i => i.status !== 'completed').length}</h3>
            </div>
            <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center border border-yellow-100">
              <Clock size={24} />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500 mb-1">Completed</p>
              <h3 className="text-3xl font-bold text-green-600">{inquiries.filter(i => i.status === 'completed').length}</h3>
            </div>
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center border border-green-100">
              <CheckCircle size={24} />
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'bookings'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            All Bookings
          </button>
          <button
            onClick={() => setActiveTab('feedback')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'feedback'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Customer Feedbacks
          </button>
        </div>

        {activeTab === 'bookings' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Calendar size={18} className="text-brand-500" />
              All Bookings
            </h2>
            <button onClick={fetchData} className="text-sm text-brand-600 font-medium hover:underline">
              Refresh List
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Patient Details</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Issue/Message</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoadingData ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-slate-500">
                      <Loader2 size={24} className="animate-spin mx-auto mb-2 text-brand-500" />
                      Loading bookings...
                    </td>
                  </tr>
                ) : inquiries.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-slate-500">
                      No bookings found.
                    </td>
                  </tr>
                ) : (
                  inquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {inq.createdAt?.toDate ? new Date(inq.createdAt.toDate()).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900">{inq.name || 'Anonymous'}</div>
                        <div className="text-sm text-slate-500 flex flex-col gap-0.5 mt-1">
                          {inq.phone && <span>{inq.phone}</span>}
                          {inq.email && <span>{inq.email}</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-800 max-w-xs truncate">{inq.issue || 'No issue specified'}</div>
                        {inq.message && <div className="text-xs text-slate-500 mt-1 max-w-xs truncate">{inq.message}</div>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          inq.status === 'completed' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                        }`}>
                          {inq.status === 'completed' ? <CheckCircle size={12} /> : <Clock size={12} />}
                          {inq.status === 'completed' ? 'Completed' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleToggleStatus(inq.id, inq.status)}
                            className="p-2 text-brand-600 hover:bg-brand-50 rounded-lg transition-colors border border-transparent hover:border-brand-100"
                            title="Toggle Status"
                          >
                            <CheckCircle size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(inq.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        )}

        {activeTab === 'feedback' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <User size={18} className="text-brand-500" />
              Customer Feedbacks
            </h2>
            <button onClick={fetchData} className="text-sm text-brand-600 font-medium hover:underline">
              Refresh List
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Feedback Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoadingData ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-10 text-center text-slate-500">
                      <Loader2 size={24} className="animate-spin mx-auto mb-2 text-brand-500" />
                      Loading feedbacks...
                    </td>
                  </tr>
                ) : feedbacks.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-10 text-center text-slate-500">
                      No feedbacks found.
                    </td>
                  </tr>
                ) : (
                  feedbacks.map((fb) => (
                    <tr key={fb.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {fb.createdAt?.toDate ? new Date(fb.createdAt.toDate()).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900">{fb.name || 'Anonymous'}</div>
                        {fb.email && <div className="text-sm text-slate-500 mt-1">{fb.email}</div>}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-800 max-w-xl">{fb.feedback}</div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        )}

        {activeTab === 'inventory' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Package size={18} className="text-brand-500" />
              Medicine Inventory
            </h2>
            <div className="flex gap-4">
              <button 
                onClick={handleImport}
                disabled={isImporting}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-indigo-700 flex items-center gap-1 disabled:opacity-50"
              >
                {isImporting ? <Loader2 size={16} className="animate-spin" /> : <DownloadCloud size={16} />} 
                {isImporting ? 'Importing...' : 'Import List'}
              </button>
              <button onClick={() => setShowAddMedModal(true)} className="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-brand-700 flex items-center gap-1">
                <Plus size={16} /> Add Medicine
              </button>
              <button onClick={fetchData} className="text-sm text-brand-600 font-medium hover:underline p-2">
                Refresh
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Medicine Name</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Price (₹)</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoadingData ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-slate-500">
                      <Loader2 size={24} className="animate-spin mx-auto mb-2 text-brand-500" />
                      Loading inventory...
                    </td>
                  </tr>
                ) : medicines.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-slate-500">
                      No medicines in inventory yet.
                    </td>
                  </tr>
                ) : (
                  medicines.map((med) => (
                    <tr key={med.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900">{med.name}</div>
                        {med.description && <div className="text-xs text-slate-500 mt-1 max-w-xs truncate">{med.description}</div>}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {med.category || '-'}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">
                        {med.price ? `₹${med.price}` : '-'}
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => handleToggleStock(med.id, med.inStock)}
                          className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                            med.inStock 
                              ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                              : 'bg-red-100 text-red-700 hover:bg-red-200'
                          }`}
                        >
                          {med.inStock ? 'In Stock' : 'Out of Stock'}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => handleDeleteMedicine(med.id)} className="text-red-500 hover:text-red-700 p-2" title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        )}
      </div>

      {/* Add Booking Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">Add New Booking</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddBooking} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Patient Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  required
                  value={newBooking.name}
                  onChange={e => setNewBooking({...newBooking, name: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Phone <span className="text-red-500">*</span></label>
                  <input 
                    type="tel" 
                    required
                    value={newBooking.phone}
                    onChange={e => setNewBooking({...newBooking, phone: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    value={newBooking.email}
                    onChange={e => setNewBooking({...newBooking, email: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Health Issue / Notes</label>
                <textarea 
                  rows={3}
                  value={newBooking.issue}
                  onChange={e => setNewBooking({...newBooking, issue: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                ></textarea>
              </div>
              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 shadow-sm"
                >
                  Save Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Medicine Modal */}
      {showAddMedModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-900">Add New Medicine</h3>
              <button onClick={() => setShowAddMedModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddMedicine} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Medicine Name *</label>
                <input required type="text" value={newMedicine.name} onChange={e => setNewMedicine({...newMedicine, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="e.g. Paracetamol 500mg" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Category</label>
                <input type="text" value={newMedicine.category} onChange={e => setNewMedicine({...newMedicine, category: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="e.g. Tablet, Syrup, Injectable" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Price (₹)</label>
                <input type="number" step="0.01" value={newMedicine.price} onChange={e => setNewMedicine({...newMedicine, price: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="0.00" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Description (Optional)</label>
                <textarea rows={2} value={newMedicine.description} onChange={e => setNewMedicine({...newMedicine, description: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none" placeholder="Brief description or usage..."></textarea>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <input type="checkbox" id="inStock" checked={newMedicine.inStock} onChange={e => setNewMedicine({...newMedicine, inStock: e.target.checked})} className="w-4 h-4 text-brand-600 rounded focus:ring-brand-500 border-slate-300" />
                <label htmlFor="inStock" className="text-sm font-medium text-slate-700">Currently in stock</label>
              </div>
              
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowAddMedModal(false)} className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-3 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition-colors shadow-md">Save Medicine</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
