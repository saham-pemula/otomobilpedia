import React, { useState } from 'react';
import { Car } from '../types/car';
import { CARS_DATABASE, BRANDS_LIST, BODY_TYPES } from '../data/cars';
import { Search, X, Check, Plus, Sparkles } from 'lucide-react';

interface ComparePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCar: (carId: string) => void;
  currentlySelectedIds: string[];
  slotNumber: number;
}

export const ComparePickerModal: React.FC<ComparePickerModalProps> = ({
  isOpen,
  onClose,
  onSelectCar,
  currentlySelectedIds,
  slotNumber
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('Semua Merk');
  const [selectedBodyType, setSelectedBodyType] = useState('ALL');

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredCars = CARS_DATABASE.filter((car) => {
    const matchesSearch =
      searchTerm.trim() === '' ||
      car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.variant.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBrand = selectedBrand === 'Semua Merk' || car.brand === selectedBrand;
    const matchesBody = selectedBodyType === 'ALL' || car.bodyType === selectedBodyType;

    return matchesSearch && matchesBrand && matchesBody;
  });

  return (
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
    >
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-lg sm:text-xl text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 text-xs flex items-center justify-center font-bold">
                {slotNumber}
              </span>
              Pilih Mobil untuk Slot {slotNumber}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Pilih mobil dari database untuk dibandingkan berdampingan
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/40 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Ketik nama mobil (misal: Innova Zenix, Pajero, Seal, Brio, Xpander)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              autoFocus
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 focus:outline-none focus:border-amber-500"
            >
              {BRANDS_LIST.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>

            <div className="flex flex-wrap gap-1">
              {BODY_TYPES.slice(0, 5).map((bt) => (
                <button
                  key={bt.value}
                  onClick={() => setSelectedBodyType(bt.value)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    selectedBodyType === bt.value
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {bt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cars List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredCars.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <p>Tidak ada mobil yang sesuai dengan pencarian.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedBrand('Semua Merk');
                  setSelectedBodyType('ALL');
                }}
                className="mt-2 text-xs text-amber-400 hover:underline"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            filteredCars.map((car) => {
              const isAlreadyInSlot = currentlySelectedIds.includes(car.id);
              return (
                <div
                  key={car.id}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                    isAlreadyInSlot
                      ? 'bg-slate-950/60 border-slate-800 opacity-60'
                      : 'bg-slate-900/60 hover:bg-slate-800/90 border-slate-800/80 hover:border-amber-500/50 cursor-pointer'
                  }`}
                  onClick={() => {
                    if (!isAlreadyInSlot) {
                      onSelectCar(car.id);
                      onClose();
                    }
                  }}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={car.imageUrl}
                      alt={`${car.brand} ${car.model}`}
                      className="w-16 h-12 object-cover rounded-lg border border-slate-800 shrink-0"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/cars/toyota-innova-zenix-hybrid.webp';
                      }}
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white text-sm">
                          {car.brand} {car.model}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider bg-slate-800 text-slate-300">
                          {car.fuelType}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {car.variant} • {car.specs.seatingCapacity} Seater
                      </div>
                      <div className="text-xs font-bold text-amber-400 mt-1">
                        {car.priceFormatted}
                      </div>
                    </div>
                  </div>

                  <div>
                    {isAlreadyInSlot ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs bg-slate-800 text-slate-400">
                        <Check className="w-3.5 h-3.5" /> Terpilih
                      </span>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectCar(car.id);
                          onClose();
                        }}
                        className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors flex items-center gap-1 shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[3]" /> Pilih
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>Menampilkan {filteredCars.length} dari {CARS_DATABASE.length} mobil</span>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white"
          >
            Batal
          </button>
        </div>

      </div>
    </div>
  );
};
