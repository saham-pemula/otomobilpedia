import React, { useState, useEffect } from 'react';
import { CARS_DATABASE, BRANDS_LIST, BODY_TYPES } from '../data/cars';
import { CarCard } from '../components/CarCard';
import { Breadcrumb } from '../components/Breadcrumb';
import { updatePageMeta } from '../utils/seo';
import { useRouter } from '../utils/router';
import { Search, SlidersHorizontal, RotateCcw, Filter, Check } from 'lucide-react';

interface CatalogViewProps {
  compareCarIds: string[];
  onToggleCompare: (carId: string) => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  compareCarIds,
  onToggleCompare
}) => {
  const { route } = useRouter();

  // Parse query params if any
  const urlParams = new URLSearchParams(route.search);
  const initialBrand = urlParams.get('brand') || 'Semua Merk';
  const initialQuery = urlParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [selectedBodyType, setSelectedBodyType] = useState('ALL');
  const [selectedFuelType, setSelectedFuelType] = useState('ALL');
  const [maxPrice, setMaxPrice] = useState<number>(2000000000); // 2 Miliar max
  const [sortBy, setSortBy] = useState<'popular' | 'priceAsc' | 'priceDesc' | 'powerDesc' | 'scoreDesc'>('popular');
  const [visibleCount, setVisibleCount] = useState<number>(24);

  useEffect(() => {
    updatePageMeta(
      'Katalog Spesifikasi & Harga Mobil Terbaru di Indonesia',
      'Cari dan temukan database ribuan spesifikasi mobil resmi di Indonesia. Filter berdasarkan merk, tipe bodi SUV/MPV/EV/Sedan, harga OTR, dan tenaga mesin di Otomobilpedia.net.',
      '/katalog'
    );
  }, []);

  // Reset pagination on filter or sort change
  useEffect(() => {
    setVisibleCount(24);
  }, [searchQuery, selectedBrand, selectedBodyType, selectedFuelType, maxPrice, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedBrand('Semua Merk');
    setSelectedBodyType('ALL');
    setSelectedFuelType('ALL');
    setMaxPrice(2000000000);
    setSortBy('popular');
    setVisibleCount(24);
  };

  // Filter cars
  let filtered = CARS_DATABASE.filter((car) => {
    const matchSearch =
      searchQuery.trim() === '' ||
      car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.variant.toLowerCase().includes(searchQuery.toLowerCase());

    const matchBrand = selectedBrand === 'Semua Merk' || car.brand === selectedBrand;
    const matchBody = selectedBodyType === 'ALL' || car.bodyType === selectedBodyType;
    const matchFuel =
      selectedFuelType === 'ALL' ||
      (selectedFuelType === 'EV' && car.fuelType.includes('Listrik')) ||
      (selectedFuelType === 'Hybrid' && car.fuelType === 'Hybrid') ||
      (selectedFuelType === 'Bensin' && car.fuelType === 'Bensin') ||
      (selectedFuelType === 'Diesel' && car.fuelType === 'Diesel');

    const matchPrice = maxPrice >= 2000000000 || car.priceOTRMinRp <= maxPrice;

    return matchSearch && matchBrand && matchBody && matchFuel && matchPrice;
  });

  // Sort cars
  if (sortBy === 'priceAsc') {
    filtered.sort((a, b) => a.priceOTRMinRp - b.priceOTRMinRp);
  } else if (sortBy === 'priceDesc') {
    filtered.sort((a, b) => b.priceOTRMinRp - a.priceOTRMinRp);
  } else if (sortBy === 'powerDesc') {
    filtered.sort((a, b) => b.specs.maxPowerHp - a.specs.maxPowerHp);
  } else if (sortBy === 'scoreDesc') {
    filtered.sort((a, b) => b.scores.overall - a.scores.overall);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Katalog Semua Mobil', url: '/katalog' }
        ]}
      />

      {/* Header */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8">
        <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-white">
          Katalog Lengkap Spesifikasi & Harga Mobil
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
          Eksplorasi database mobil resmi di Indonesia dengan spesifikasi terverifikasi, fitur keselamatan aktif ADAS, estimasi pajak PKB, dan bandingkan langsung berdampingan.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sidebar Filter Panel (Col 3) */}
        <aside className="lg:col-span-3 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="font-heading font-bold text-sm text-white flex items-center gap-2">
              <Filter className="w-4 h-4 text-amber-400" /> Filter Pencarian
            </span>
            <button
              onClick={resetFilters}
              className="text-[11px] text-slate-400 hover:text-amber-400 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Search Box */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
              Cari Nama Model
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Innova, Pajero, Seal..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Merk Mobil */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
              Pilih Merk (Brand)
            </label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
            >
              {BRANDS_LIST.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Tipe Bodi */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
              Tipe Bodi
            </label>
            <div className="space-y-1">
              {BODY_TYPES.map((bt) => (
                <button
                  key={bt.value}
                  onClick={() => setSelectedBodyType(bt.value)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                    selectedBodyType === bt.value
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span>{bt.label}</span>
                  {selectedBodyType === bt.value && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Jenis Bahan Bakar */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
              Bahan Bakar & Penggerak
            </label>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {[
                { label: 'Semua', val: 'ALL' },
                { label: 'Listrik (EV)', val: 'EV' },
                { label: 'Hybrid', val: 'Hybrid' },
                { label: 'Bensin', val: 'Bensin' },
                { label: 'Diesel', val: 'Diesel' }
              ].map((f) => (
                <button
                  key={f.val}
                  onClick={() => setSelectedFuelType(f.val)}
                  className={`p-2 rounded-lg text-xs font-semibold text-center transition-colors ${
                    selectedFuelType === f.val
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Batas Harga Maksimum */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Maksimal Harga OTR
              </label>
              <span className="text-xs text-amber-400 font-bold">
                {maxPrice >= 2000000000 ? 'Tanpa Batas' : `≤ Rp ${Math.round(maxPrice / 1000000)} Juta`}
              </span>
            </div>
            <input
              type="range"
              min={200000000}
              max={2000000000}
              step={50000000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
          </div>

        </aside>

        {/* Cars Grid & Sorting (Col 9) */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* Top Sort & Count Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs font-medium text-slate-300">
              Menampilkan <strong className="text-white font-bold">{filtered.length}</strong> mobil yang sesuai
            </span>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Urutkan:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="popular">Paling Populer</option>
                <option value="priceAsc">Harga Terendah → Tertinggi</option>
                <option value="priceDesc">Harga Tertinggi → Terendah</option>
                <option value="powerDesc">Tenaga Mesin Terbesar (HP)</option>
                <option value="scoreDesc">Skor Rating Tertinggi</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
              <p className="text-base font-semibold text-slate-300">Tidak ada mobil yang memenuhi kriteria filter.</p>
              <p className="text-xs text-slate-500 mt-1">Coba sesuaikan kata kunci atau tingkatkan batas harga maksimum.</p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold"
              >
                Reset Semua Filter
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.slice(0, visibleCount).map((car) => (
                  <CarCard
                    key={car.id}
                    car={car}
                    isComparing={compareCarIds.includes(car.id)}
                    onToggleCompare={onToggleCompare}
                  />
                ))}
              </div>

              {filtered.length > visibleCount && (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6 border-t border-slate-800">
                  <button
                    onClick={() => setVisibleCount((prev) => Math.min(prev + 24, filtered.length))}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                  >
                    Muat 24 Mobil Lagi ({filtered.length - visibleCount} tersisa)
                  </button>
                  <button
                    onClick={() => setVisibleCount(filtered.length)}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Tampilkan Semua ({filtered.length} Mobil)
                  </button>
                </div>
              )}
            </div>
          )}

        </main>

      </div>
    </div>
  );
};
