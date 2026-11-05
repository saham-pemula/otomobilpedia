import React from 'react';
import { Car } from '../types/car';
import { generateVerdict } from '../utils/comparator';
import { 
  Trophy, 
  Users, 
  Compass, 
  Gauge, 
  Coins, 
  Check, 
  X, 
  Sparkles,
  HelpCircle,
  ThumbsUp
} from 'lucide-react';

interface ComparisonVerdictProps {
  cars: Car[];
}

export const ComparisonVerdict: React.FC<ComparisonVerdictProps> = ({ cars }) => {
  if (cars.length < 2) return null;

  const verdicts = generateVerdict(cars);
  const carNames = cars.map(c => `${c.brand} ${c.model}`).join(' vs ');

  return (
    <section aria-labelledby="verdict-heading" className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 mt-10 shadow-xl overflow-hidden relative">
      
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Kesimpulan Objektif & Panduan Memilih
            </div>
            <h2 id="verdict-heading" className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              Bagus Mana: {carNames}?
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Hasil analisis independen Otomobilpedia.net membedah keunggulan spesifik masing-masing mobil untuk menentukan pilihan paling tepat sesuai profil penggunaan Anda.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Berdasarkan:</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700">
              {cars.length} Mobil Terverifikasi
            </span>
          </div>
        </div>

        {/* Verdict Cards by Use Case */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 my-8">
          {verdicts.map((v, idx) => {
            const iconMap = {
              'Keluarga': Users,
              'Perkotaan Harian': Compass,
              'Performa & Tanjakan': Gauge,
              'Value for Money': Coins,
              'Jarak Jauh / Mudik': Trophy
            };
            const Icon = iconMap[v.category] || Trophy;

            return (
              <div 
                key={idx}
                className="bg-slate-950/70 border border-slate-800/90 hover:border-amber-500/40 rounded-2xl p-5 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 text-slate-300 text-xs font-bold border border-slate-800">
                      <Icon className="w-3.5 h-3.5 text-amber-400" />
                      Kategori {v.category}
                    </span>
                    <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                      <Trophy className="w-3.5 h-3.5" /> Pemenang
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-white mb-2">
                    Pilih <span className="text-amber-400">{v.winnerTitle}</span>
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {v.explanation}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-900 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Kunci Keunggulan:</span>
                  <span className="font-semibold text-amber-300 text-right truncate max-w-[200px]">
                    {v.keyAdvantage}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Side-by-side Pros & Cons Summary */}
        <div className="pt-6 border-t border-slate-800">
          <h3 className="font-heading font-bold text-lg text-white mb-4 flex items-center gap-2">
            <ThumbsUp className="w-5 h-5 text-amber-400" />
            Ringkasan Kelebihan & Kekurangan Nyata
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <div key={car.id} className="bg-slate-950/50 rounded-2xl p-5 border border-slate-800">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-800">
                  <img
                    src={car.imageUrl}
                    alt={car.model}
                    className="w-12 h-9 object-cover rounded-md border border-slate-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/cars/toyota-innova-zenix-hybrid.webp';
                    }}
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-white">{car.brand} {car.model}</h4>
                    <span className="text-xs text-amber-400 font-semibold">{car.priceFormatted}</span>
                  </div>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <span className="font-bold text-emerald-400 block mb-2 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 stroke-[3]" /> Kelebihan Utama:
                    </span>
                    <ul className="space-y-1.5 text-slate-300">
                      {car.pros.map((pro, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-1.5">
                          <span className="text-emerald-400 mt-0.5">•</span>
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-slate-900">
                    <span className="font-bold text-rose-400 block mb-2 flex items-center gap-1">
                      <X className="w-3.5 h-3.5 stroke-[3]" /> Hal yang Perlu Diperhatikan:
                    </span>
                    <ul className="space-y-1.5 text-slate-400">
                      {car.cons.map((con, cIdx) => (
                        <li key={cIdx} className="flex items-start gap-1.5">
                          <span className="text-rose-400 mt-0.5">•</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rekomendasi Akhir */}
        <div className="mt-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-slate-300">
            <strong className="text-white font-semibold">Tips Bijak Otomobilpedia.net: </strong>
            Tidak ada mobil yang 100% sempurna untuk segala kondisi. Jika Anda sering bepergian dengan seluruh keluarga besar dan mengutamakan keempukan jalanan antar kota, utamakan mobil dengan kapasitas kabin dan suspensi terbaik. Namun jika mobilitas 90% di kemacetan kota metropolitan, efisiensi bahan bakar / mobil listrik dan kemudahan parkir jauh lebih menguntungkan finansial Anda dalam 5 tahun ke depan.
          </div>
        </div>

      </div>
    </section>
  );
};
