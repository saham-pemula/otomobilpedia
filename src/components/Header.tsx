import React, { useState } from 'react';
import { CARS_DATABASE } from '../data/cars';
import { useRouter } from '../utils/router';
import { 
  Car, 
  Scale, 
  Search, 
  Menu, 
  X, 
  Calculator, 
  BookOpen, 
  Sparkles, 
  ChevronRight,
  Globe
} from 'lucide-react';

interface HeaderProps {
  compareCarIds: string[];
}

export const Header: React.FC<HeaderProps> = ({ compareCarIds }) => {
  const { route, navigate } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLang, setCurrentLang] = useState<'ID' | 'EN'>('ID');

  const searchResults = searchQuery.trim().length > 1
    ? CARS_DATABASE.filter(car => 
        car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.variant.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.bodyType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.fuelType.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6)
    : [];

  const handleSelectCar = (carSlug: string) => {
    setSearchOpen(false);
    setSearchQuery('');
    navigate(`/mobil/${carSlug}`);
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !searchOpen && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <a 
              href="/" 
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-lg p-1"
              aria-label="Otomobilpedia.net Beranda"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-200">
                <Car className="w-6 h-6 text-slate-950 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight text-white flex items-center">
                  Mobil<span className="text-amber-400">pedia</span>
                  <span className="text-xs ml-1 text-slate-400 font-normal">.net</span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-wide uppercase hidden sm:block">
                  Pusat Komparasi Mobil No. 1
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <a 
              href="/bandingkan" 
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                route.path.startsWith('/bandingkan') 
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Scale className="w-4 h-4 text-amber-400" />
              Bandingkan Mobil
              {compareCarIds.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-amber-500 text-slate-950 font-bold rounded-full">
                  {compareCarIds.length}
                </span>
              )}
            </a>

            <a 
              href="/katalog" 
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                route.path === '/katalog' ? 'text-amber-400 bg-slate-900' : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              Katalog Lengkap
            </a>

            <a 
              href="/kategori/suv" 
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
            >
              SUV
            </a>

            <a 
              href="/kategori/mpv" 
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
            >
              MPV
            </a>

            <a 
              href="/kategori/ev" 
              className="px-3 py-2 rounded-lg text-sm font-medium text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/30 transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Mobil Listrik (EV)
            </a>

            <a 
              href="/kalkulator-kredit" 
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                route.path === '/kalkulator-kredit' ? 'text-amber-400 bg-slate-900' : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Calculator className="w-4 h-4 text-slate-400" />
              Simulasi Kredit
            </a>
          </nav>

          {/* Quick Search & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 text-xs sm:text-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label="Cari mobil berdasarkan merk atau tipe"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span className="hidden sm:inline">Cari mobil (cth: Innova, Seal)...</span>
              <span className="sm:hidden">Cari</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-slate-800 rounded border border-slate-700 text-slate-400">
                /
              </kbd>
            </button>

            {/* Language Selector Indicator */}
            <button
              onClick={() => setCurrentLang(currentLang === 'ID' ? 'EN' : 'ID')}
              className="p-2 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-slate-700 transition-colors flex items-center gap-1"
              title="Ganti Bahasa (Indonesia / English)"
              aria-label="Ganti Bahasa"
            >
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span>{currentLang}</span>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <a
            href="/bandingkan"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 font-semibold"
          >
            <span className="flex items-center gap-2">
              <Scale className="w-5 h-5" />
              Bandingkan Mobil Langsung
            </span>
            {compareCarIds.length > 0 && (
              <span className="px-2 py-0.5 text-xs bg-amber-500 text-slate-950 font-bold rounded-full">
                {compareCarIds.length} Mobil
              </span>
            )}
          </a>

          <a
            href="/katalog"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between p-2.5 rounded-lg text-slate-200 hover:bg-slate-900"
          >
            <span>Katalog Semua Mobil</span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </a>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
            <a
              href="/kategori/suv"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg text-slate-300 hover:bg-slate-900 text-sm font-medium"
            >
              SUV & Crossover
            </a>
            <a
              href="/kategori/mpv"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg text-slate-300 hover:bg-slate-900 text-sm font-medium"
            >
              MPV Keluarga
            </a>
            <a
              href="/kategori/ev"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg text-emerald-400 hover:bg-emerald-950/30 text-sm font-medium"
            >
              Mobil Listrik (EV)
            </a>
            <a
              href="/kategori/hybrid"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg text-cyan-400 hover:bg-cyan-950/30 text-sm font-medium"
            >
              Mobil Hybrid
            </a>
          </div>

          <div className="pt-2 border-t border-slate-800/80 space-y-1">
            <a
              href="/kalkulator-kredit"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-lg text-slate-300 hover:bg-slate-900 text-sm"
            >
              <Calculator className="w-4 h-4 text-slate-400" />
              Simulasi Kredit & Pajak PKB
            </a>
            <a
              href="/panduan-beli"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-lg text-slate-300 hover:bg-slate-900 text-sm"
            >
              <BookOpen className="w-4 h-4 text-slate-400" />
              Panduan Memilih Mobil
            </a>
          </div>
        </div>
      )}

      {/* Global Quick Search Modal */}
      {searchOpen && (
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget) setSearchOpen(false);
          }}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
        >
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-slate-800 flex items-center gap-3">
              <Search className="w-5 h-5 text-amber-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari merk, model, tipe mobil (contoh: Pajero, Zenix, Seal, Brio)..."
                className="w-full bg-transparent text-white placeholder-slate-500 focus:outline-none text-base sm:text-lg"
                autoFocus
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto p-3">
              {searchQuery.trim().length > 0 && searchResults.length === 0 ? (
                <div className="text-center py-8 text-slate-400">
                  <p>Tidak ditemukan mobil yang cocok dengan "{searchQuery}"</p>
                  <p className="text-xs text-slate-500 mt-1">Coba kata kunci lain seperti Toyota, Honda, SUV, atau Listrik</p>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-1">
                  <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Hasil Pencarian Mobil ({searchResults.length})
                  </div>
                  {searchResults.map((car) => (
                    <button
                      key={car.id}
                      onClick={() => handleSelectCar(car.slug)}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/80 transition-colors text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={car.imageUrl}
                          alt={car.model}
                          className="w-14 h-10 object-cover rounded-lg border border-slate-800"
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/cars/toyota-innova-zenix-hybrid.webp';
                          }}
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="font-semibold text-white group-hover:text-amber-400 transition-colors">
                            {car.brand} {car.model}
                          </div>
                          <div className="text-xs text-slate-400">
                            {car.variant} • {car.bodyType} • {car.fuelType}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-amber-400">
                          {car.priceFormatted}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {car.scores.overall}/10 Skor
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Pencarian Populer di Indonesia
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Toyota Innova Zenix', 'Mitsubishi Pajero Sport', 'BYD Seal', 'Honda Brio', 'Hyundai Ioniq 5', 'Toyota Avanza'].map((term) => (
                      <button
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-xs text-slate-300 hover:text-white transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-3 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span>Tekan <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300">ESC</kbd> untuk menutup</span>
              <a href="/katalog" onClick={() => setSearchOpen(false)} className="text-amber-400 hover:underline">
                Buka Katalog Lengkap →
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
