import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { Calendar, Clock, CheckCircle, ArrowLeft, Pill } from 'lucide-react';

export default function MyBookings() {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchMyBookings(currentUser.uid);
      } else {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchMyBookings = async (userId: string) => {
    setIsLoading(true);
    try {
      const q = query(
        collection(db, 'inquiries'),
        where('userId', '==', userId)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Sort in JS instead of Firebase index to avoid requiring composite indexes immediately
      data.sort((a: any, b: any) => {
        const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
        const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
        return timeB - timeA;
      });

      setBookings(data);
    } catch (error) {
      console.error("Error fetching my bookings", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user && !isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Please sign in to view your bookings</h2>
        <a href="#auth" className="bg-brand-600 text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-brand-700">
          Sign In
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        <a href="#" className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-600 font-medium transition-colors mb-8">
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </a>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">My Bookings</h1>
            <p className="text-slate-500 mt-1">View the status of your consultations and inquiries.</p>
          </div>
          <button 
            onClick={() => fetchMyBookings(user!.uid)}
            className="text-brand-600 font-semibold hover:underline text-sm"
          >
            Refresh Data
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-slate-200 border-t-brand-600 rounded-full animate-spin"></div>
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center shadow-lg border border-slate-100 flex flex-col items-center">
            <div className="w-20 h-20 bg-slate-50 text-brand-300 rounded-full flex items-center justify-center mb-6">
              <Calendar size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No Bookings Yet</h3>
            <p className="text-slate-500 mb-8 max-w-md">You haven't requested any health consultations or appointments with us yet.</p>
            <a href="#consult" className="bg-brand-600 text-white px-8 py-3.5 rounded-xl font-bold shadow-md hover:bg-brand-700">
              Book a Consultation
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row gap-6 justify-between hover:shadow-md transition-shadow">
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 text-brand-600 p-2 rounded-lg">
                      <Pill size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 capitalize">
                      {booking.issue === 'fever' ? 'Fever, Cough & Cold' : 
                       booking.issue === 'digestion' ? 'Digestion & Stomach Upset' :
                       booking.issue === 'skin' ? 'Skin Allergies / First Aid' :
                       booking.issue === 'pain' ? 'Body & Joint Pain' :
                       booking.issue === 'other' ? 'Other General Inquiry' :
                       booking.issue || 'Consultation'}
                    </h3>
                  </div>
                  
                  {booking.message && (
                    <p className="text-slate-600 text-sm mt-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                      "{booking.message}"
                    </p>
                  )}
                  
                  <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1.5 font-medium text-slate-700">
                      <Calendar size={16} className="text-slate-400" />
                      {booking.createdAt?.toDate ? new Date(booking.createdAt.toDate()).toLocaleDateString() : 'Recent'}
                    </span>
                    <span className="flex items-center gap-1.5 font-medium text-slate-700">
                      <Clock size={16} className="text-slate-400" />
                      {booking.createdAt?.toDate ? new Date(booking.createdAt.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                    </span>
                  </div>
                </div>

                <div className="md:w-48 flex flex-col items-start md:items-end md:justify-center md:border-l border-slate-100 md:pl-6 pt-4 md:pt-0 mt-4 md:mt-0 border-t md:border-t-0">
                  <div className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 ${
                    booking.status === 'completed' 
                      ? 'bg-green-100 text-green-700 border border-green-200' 
                      : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                  }`}>
                    {booking.status === 'completed' ? <CheckCircle size={16} /> : <Clock size={16} />}
                    {booking.status === 'completed' ? 'Completed' : 'Pending'}
                  </div>
                  {booking.status !== 'completed' && (
                    <p className="text-xs text-center text-slate-500 mt-3 font-medium">
                      Store staff will contact you shortly.
                    </p>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
