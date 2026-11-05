import React, { useState } from 'react';
import { CARS_DATABASE, BODY_TYPES } from '../data/cars';
import { COMPARISON_PRESETS } from '../data/presets';
import { CarCard } from '../components/CarCard';
import { SmartCarAdvisor } from '../components/SmartCarAdvisor';
import { FaqSection } from '../components/FaqSection';
import { useRouter } from '../utils/router';
import { 
  Scale, 
  Search, 
  Sparkles, 
  Trophy, 
  TrendingUp, 
  ChevronRight, 
  ShieldCheck, 
  Fuel, 
  Gauge, 
  Users, 
  Zap,
  ArrowRight
} from 'lucide-react';

interface HomeViewProps {
  onStartComparison: (carIds: string[]) => void;
  compareCarIds: string[];
  onToggleCompare: (carId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onStartComparison,
  compareCarIds,
  onToggleCompare
}) => {
  const { navigate } = useRouter();

  // Quick compare launch state
  const [quickCar1, setQuickCar1] = useState(CARS_DATABASE[0].id); // Innova Zenix
  const [quickCar2, setQuickCar2] = useState(CARS_DATABASE[1].id); // Pajero Sport
  const [selectedBodyFilter, setSelectedBodyFilter] = useState('ALL');

  const handleLaunchQuickCompare = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickCar1 && quickCar2) {
      const car1 = CARS_DATABASE.find(c => c.id === quickCar1);
      const car2 = CARS_DATABASE.find(c => c.id === quickCar2);
      if (car1 && car2) {
        navigate(`/bandingkan/${car1.slug}-vs-${car2.slug}`);
      }
    }
  };

  const filteredPopularCars = selectedBodyFilter === 'ALL'
    ? CARS_DATABASE.slice(0, 8)
    : CARS_DATABASE.filter(c => c.bodyType === selectedBodyFilter).slice(0, 8);

  return (
    <div className="space-y-16 sm:space-y-24">
      
      {/* Hero Section */}
      <section className="relative pt-6 sm:pt-12 pb-12 sm:pb-16 overflow-hidden">
        
        {/* Ambient Gradient Background */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="w-[600px] h-[350px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="w-[400px] h-[250px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center px-4">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span>Website Perbandingan Mobil No. 1 di Indonesia & Dunia</span>
          </div>

          {/* Main H1 Headline with exact Focus Keyword */}
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.15] mb-6">
            Website Perbandingan Mobil Terlengkap: Temukan <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">Mobil A vs Mobil B Bagus yang Mana</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Platform agregator otomotif independen untuk membandingkan spesifikasi teknis, harga OTR resmi, konsumsi BBM, tenaga mesin, dan fitur keselamatan ADAS secara side-by-side dengan data valid dan objektif.
          </p>

          {/* Interactive Fast Comparison Launch Box */}
          <div className="max-w-3xl mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Scale className="w-4 h-4" />
                Mulai Komparasi Instan Antara 2 Mobil
              </span>
              <a href="/bandingkan" className="text-xs text-slate-400 hover:text-amber-400 font-medium">
                Komparasi Lanjutan (Hingga 4 Mobil) →
              </a>
            </div>

            <form onSubmit={handleLaunchQuickCompare} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              
              {/* Mobil 1 */}
              <div className="sm:col-span-5">
                <label className="text-[11px] font-bold text-slate-400 block mb-1 text-left">
                  PILIH MOBIL A
                </label>
                <select
                  value={quickCar1}
                  onChange={(e) => setQuickCar1(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm font-semibold focus:outline-none focus:border-amber-500"
                  aria-label="Pilih Mobil Pertama"
                >
                  {CARS_DATABASE.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.brand} {c.model} ({c.variant})
                    </option>
                  ))}
                </select>
              </div>

              {/* VS Badge */}
              <div className="sm:col-span-2 flex justify-center py-1 sm:py-0">
                <div className="w-9 h-9 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shadow-lg shadow-amber-500/20">
                  VS
                </div>
              </div>

              {/* Mobil 2 */}
              <div className="sm:col-span-5">
                <label className="text-[11px] font-bold text-slate-400 block mb-1 text-left">
                  PILIH MOBIL B
                </label>
                <select
                  value={quickCar2}
                  onChange={(e) => setQuickCar2(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm font-semibold focus:outline-none focus:border-amber-500"
                  aria-label="Pilih Mobil Kedua"
                >
                  {CARS_DATABASE.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.brand} {c.model} ({c.variant})
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit CTA Button */}
              <div className="sm:col-span-12 mt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all transform active:scale-[0.99]"
                >
                  <Scale className="w-5 h-5 stroke-[2.5]" />
                  Bandingkan Sekarang & Lihat Hasil Bagus Mana
                </button>
              </div>

            </form>

            {/* Quick Popular Comparison Presets Chips */}
            <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center flex-wrap gap-2 text-xs">
              <span className="text-slate-500 font-medium">Preset Populer:</span>
              {COMPARISON_PRESETS.slice(0, 3).map(preset => (
                <a
                  key={preset.id}
                  href={`/bandingkan/${preset.slug}`}
                  className="px-2.5 py-1 rounded-lg bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                >
                  {preset.title.split(' vs ')[0].replace('Toyota ', '')} vs {preset.title.split(' vs ')[1]?.replace('Mitsubishi ', '')}
                </a>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* Category Pills Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-bold text-lg sm:text-xl text-white">
            Eksplorasi Berdasarkan Kategori Bodi & Bahan Bakar
          </h2>
          <a href="/katalog" className="text-xs text-amber-400 hover:underline">
            Semua ({CARS_DATABASE.length} Mobil) →
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {[
            { label: 'MPV Keluarga', slug: 'mpv', count: '7-Seater', color: 'from-amber-500/20 to-amber-600/5' },
            { label: 'SUV Tangguh', slug: 'suv', count: 'High Ground Clearance', color: 'from-blue-500/20 to-blue-600/5' },
            { label: 'Mobil Listrik (EV)', slug: 'ev', count: 'Zero Emission', color: 'from-emerald-500/20 to-emerald-600/5' },
            { label: 'Hybrid Hemat', slug: 'hybrid', count: 'Super Irit', color: 'from-cyan-500/20 to-cyan-600/5' },
            { label: 'Sedan Mewah', slug: 'sedan', count: 'Performa Presisi', color: 'from-purple-500/20 to-purple-600/5' },
            { label: 'City Car Lincah', slug: 'hatchback', count: 'Parkir Mudah', color: 'from-pink-500/20 to-pink-600/5' },
            { label: 'LCGC Ekonomis', slug: 'lcgc', count: 'Biaya Terjangkau', color: 'from-yellow-500/20 to-yellow-600/5' },
          ].map((cat) => (
            <a
              key={cat.slug}
              href={`/kategori/${cat.slug}`}
              className={`p-4 rounded-2xl bg-gradient-to-b ${cat.color} border border-slate-800 hover:border-slate-700 transition-all hover:-translate-y-1 block group`}
            >
              <h3 className="font-bold text-sm text-white group-hover:text-amber-400 transition-colors">
                {cat.label}
              </h3>
              <span className="text-[11px] text-slate-400 block mt-1">
                {cat.count}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Trending Comparisons Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <TrendingUp className="w-4 h-4" />
              Duel Otomotif Terpanas
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mt-1">
              Perbandingan Mobil Paling Banyak Dibaca Minggu Ini
            </h2>
          </div>
          <a
            href="/bandingkan"
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 self-start sm:self-auto"
          >
            Bandingkan Mobil Lainnya <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMPARISON_PRESETS.map((preset) => {
            const comparedCars = preset.carIds.map(id => CARS_DATABASE.find(c => c.id === id)).filter(Boolean);

            return (
              <a
                key={preset.id}
                href={`/bandingkan/${preset.slug}`}
                className="bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-5 flex flex-col justify-between transition-all group hover:shadow-xl hover:shadow-amber-500/5"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {preset.category}
                    </span>
                    {preset.trendingBadge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                        {preset.trendingBadge}
                      </span>
                    )}
                  </div>

                  {/* Compared cars preview photos */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {comparedCars.slice(0, 2).map((car, idx) => (
                      <div key={car!.id} className="relative aspect-video rounded-lg overflow-hidden bg-slate-950 border border-slate-800">
                        <img
                          src={car!.imageUrl}
                          alt={car!.model}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/cars/toyota-innova-zenix-hybrid.webp';
                          }}
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-950/80 text-white">
                          {car!.brand} {car!.model}
                        </span>
                      </div>
                    ))}
                  </div>

                  <h3 className="font-heading font-extrabold text-base sm:text-lg text-white group-hover:text-amber-400 transition-colors leading-snug">
                    {preset.title}
                  </h3>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {preset.shortVerdict}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">
                    {preset.viewsCount.toLocaleString()} Kali Dibandingkan
                  </span>
                  <span className="font-bold text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Bagus Mana? <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* Smart Car Advisor Wizard */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SmartCarAdvisor onStartComparison={onStartComparison} />
      </section>

      {/* Popular Cars Showcase Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              Mobil Pilihan Terbaik di Indonesia
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Pilih mobil untuk langsung dimasukkan ke dalam perbandingan
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-2 sm:pb-0">
            {BODY_TYPES.slice(0, 5).map((type) => (
              <button
                key={type.value}
                onClick={() => setSelectedBodyFilter(type.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedBodyFilter === type.value
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPopularCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              isComparing={compareCarIds.includes(car.id)}
              onToggleCompare={onToggleCompare}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="/katalog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-white font-semibold text-sm transition-all"
          >
            Lihat Semua Koleksi Mobil di Katalog Lengkap ({CARS_DATABASE.length} Mobil) →
          </a>
        </div>
      </section>

      {/* SEO Rich Educational Article */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <article className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6 text-slate-300 text-sm leading-relaxed">
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
            Panduan Cara Membandingkan Mobil Secara Objektif: Memilih Mobil Idaman yang Tepat
          </h2>

          <p>
            Membeli mobil adalah salah satu keputusan finansial terbesar dalam hidup keluarga. Di pasar otomotif Indonesia yang terus berkembang pesat dengan hadirnya ratusan pilihan mobil bensin konvensional (ICE), mobil hybrid hemat energi, hingga gelombang mobil listrik murni (EV), menentukan <strong>"mobil A dengan mobil B bagus yang mana"</strong> membutuhkan data perbandingan yang valid dan tidak bias.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h4 className="font-bold text-white text-sm mb-1">1. Efisiensi vs Biaya Perolehan</h4>
              <p className="text-xs text-slate-400">
                Hitung Total Cost of Ownership (TCO). Mobil hybrid atau EV mungkin memiliki harga awal lebih tinggi, tetapi hemat jutaan rupiah per bulan dalam biaya bensin dan pajak tahunan.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h4 className="font-bold text-white text-sm mb-1">2. Dimensi & Ground Clearance</h4>
              <p className="text-xs text-slate-400">
                Untuk kondisi jalanan Indonesia dengan polisi tidur tinggi dan potensi genangan air, perhatikan ground clearance minimum (ideal di atas 180 mm) dan radius putar saat parkir.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h4 className="font-bold text-white text-sm mb-1">3. Fitur ADAS & Keselamatan</h4>
              <p className="text-xs text-slate-400">
                Pastikan mobil incaran telah dilengkapi fitur keselamatan aktif mutakhir seperti Adaptive Cruise Control, Autonomous Emergency Braking, dan minimal 6 kantung udara (airbags).
              </p>
            </div>
          </div>

          <p>
            Di <strong>Otomobilpedia.net</strong>, kami menyediakan sistem komparasi hingga 4 mobil sekaligus dengan kalkulasi skor otomatis. Seluruh lembar spesifikasi dikurasi secara ketat langsung dari lembar spesifikasi pabrikan dan uji jalan nyata, memastikan setiap rekomendasi yang Anda dapatkan adalah keputusan yang cerdas dan terpercaya.
          </p>
        </article>
      </section>

      {/* FAQ Section */}
      <FaqSection />

    </div>
  );
};
