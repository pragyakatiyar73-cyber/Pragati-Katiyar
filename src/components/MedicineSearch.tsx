import React, { useState } from 'react';
import { Search, Package, AlertCircle, Loader2 } from 'lucide-react';
import { inventoryMedicines } from '../data';

export default function MedicineSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [medicines, setMedicines] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    setHasSearched(true);
    
    setTimeout(() => {
      const filtered = inventoryMedicines.filter(med => 
        med.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (med.category && med.category.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      
      setMedicines(filtered);
      setIsLoading(false);
    }, 500); // simulate network request for smooth UX
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Search Medicines</h1>
          <p className="text-slate-600">Check availability of medicines at Katiyar Medical Store.</p>
        </div>

        <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 mb-8">
          <form onSubmit={handleSearch} className="flex items-center">
            <div className="pl-4 pr-2 text-slate-400">
              <Search size={20} />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by medicine name..."
              className="flex-1 w-full bg-transparent border-none focus:ring-0 text-slate-800 placeholder-slate-400 py-3 px-2 outline-none"
            />
            <button
              type="submit"
              disabled={isLoading || !searchTerm.trim()}
              className="bg-brand-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : null}
              Search
            </button>
          </form>
        </div>

        {hasSearched && !isLoading && (
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-slate-800">
              Search Results
            </h2>
            <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              {medicines.length} found
            </span>
          </div>
        )}

        <div className="space-y-4">
          {isLoading && !hasSearched && (
            <div className="text-center py-12">
              <Loader2 size={32} className="animate-spin mx-auto text-brand-600 mb-4" />
              <p className="text-slate-500">Searching inventory...</p>
            </div>
          )}

          {!isLoading && hasSearched && (
            medicines.length > 0 ? (
              medicines.map((med) => (
                <div key={med.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-start gap-4">
                  <div className="bg-brand-50 p-3 rounded-lg text-brand-600 shrink-0">
                    <Package size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-bold text-slate-900">{med.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        med.inStock 
                          ? 'bg-green-100 text-green-700 border border-green-200' 
                          : 'bg-red-100 text-red-700 border border-red-200'
                      }`}>
                        {med.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                    {med.description && (
                      <p className="text-slate-600 text-sm mt-1">{med.description}</p>
                    )}
                    {(med.price || med.category) && (
                      <div className="mt-3 flex flex-wrap gap-3">
                        {med.price && (
                          <span className="inline-block bg-slate-50 text-slate-700 text-sm px-2 py-1 rounded border border-slate-100 font-medium">
                            ₹{med.price}
                          </span>
                        )}
                        {med.category && (
                          <span className="inline-block bg-slate-50 text-slate-700 text-sm px-2 py-1 rounded border border-slate-100">
                            {med.category}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-200 text-center flex flex-col items-center">
                <div className="bg-slate-50 p-4 rounded-full text-slate-400 mb-4">
                  <AlertCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No medicines found</h3>
                <p className="text-slate-500 max-w-sm mb-6">
                  We couldn't find any medicine matching "{searchTerm}". Please try a different name or spelling.
                </p>
                <p className="text-sm text-slate-400">
                  You can also book a general consultation if you need help finding a substitute.
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
