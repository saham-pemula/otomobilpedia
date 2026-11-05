import React, { useState } from 'react';
import { CARS_DATABASE } from '../data/cars';
import { Car } from '../types/car';
import { useRouter } from '../utils/router';
import { Sparkles, ArrowRight, CheckCircle2, RotateCcw, Scale } from 'lucide-react';

interface SmartCarAdvisorProps {
  onStartComparison: (carIds: string[]) => void;
}

export const SmartCarAdvisor: React.FC<SmartCarAdvisorProps> = ({ onStartComparison }) => {
  const { navigate } = useRouter();

  const [budget, setBudget] = useState<string>('MID'); // 'LOW' (<300jt), 'MID' (300-600jt), 'HIGH' (600-900jt), 'PREMIUM' (>900jt)
  const [priority, setPriority] = useState<string>('FAMILY'); // 'FAMILY', 'CITY', 'TOUGH', 'SPEED'
  const [fuelPref, setFuelPref] = useState<string>('ANY'); // 'ANY', 'EV', 'HYBRID', 'ICE'

  // Filter recommendations
  const matches = CARS_DATABASE.filter((car) => {
    // Budget filter
    let matchBudget = true;
    if (budget === 'LOW') matchBudget = car.priceOTRMinRp <= 300000000;
    else if (budget === 'MID') matchBudget = car.priceOTRMinRp > 270000000 && car.priceOTRMinRp <= 650000000;
    else if (budget === 'HIGH') matchBudget = car.priceOTRMinRp > 500000000 && car.priceOTRMinRp <= 950000000;
    else if (budget === 'PREMIUM') matchBudget = car.priceOTRMinRp > 900000000;

    // Fuel filter
    let matchFuel = true;
    if (fuelPref === 'EV') matchFuel = car.fuelType.includes('Listrik');
    else if (fuelPref === 'HYBRID') matchFuel = car.fuelType === 'Hybrid';
    else if (fuelPref === 'ICE') matchFuel = car.fuelType === 'Bensin' || car.fuelType === 'Diesel';

    // Priority filter
    let matchPriority = true;
    if (priority === 'FAMILY') matchPriority = car.specs.seatingCapacity >= 7;
    else if (priority === 'CITY') matchPriority = car.specs.turningRadiusM <= 5.3;
    else if (priority === 'TOUGH') matchPriority = car.specs.groundClearanceMm >= 195;
    else if (priority === 'SPEED') matchPriority = car.specs.acceleration0to100 <= 9.0;

    return matchBudget && matchFuel && matchPriority;
  });

  // Fallback to top cars if no strict match
  const topRecommendations: Car[] = matches.length >= 2 
    ? matches.slice(0, 3) 
    : CARS_DATABASE.slice(0, 3);

  const handleCompareAll = () => {
    const ids = topRecommendations.map(c => c.id);
    onStartComparison(ids);
  };

  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/20 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Asisten Cerdas Otomobilpedia
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
            Bingung Memilih? Temukan Mobil yang Tepat untuk Anda
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Jawab 3 pertanyaan singkat di bawah ini untuk melihat perbandingan mobil terbaik sesuai kriteria Anda
          </p>
        </div>

        <button
          onClick={() => {
            setBudget('MID');
            setPriority('FAMILY');
            setFuelPref('ANY');
          }}
          className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1 self-start md:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Pilihan
        </button>
      </div>

      {/* 3 Step Questionnaire */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Step 1: Budget */}
        <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-2">
            1. Perkiraan Anggaran (Budget)
          </span>
          <div className="space-y-1.5">
            {[
              { id: 'LOW', label: 'Di Bawah 300 Juta (Ekonomis)' },
              { id: 'MID', label: '300 - 650 Juta (Populer / Menengah)' },
              { id: 'HIGH', label: '650 - 950 Juta (Flagship / Semi-Mewah)' },
              { id: 'PREMIUM', label: 'Di Atas 950 Juta (Premium Luxury)' }
            ].map(b => (
              <button
                key={b.id}
                onClick={() => setBudget(b.id)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                  budget === b.id
                    ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                    : 'text-slate-300 hover:bg-slate-900 border border-transparent'
                }`}
              >
                <span>{b.label}</span>
                {budget === b.id && <CheckCircle2 className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" />}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Kebutuhan Utama */}
        <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-2">
            2. Prioritas Kebutuhan
          </span>
          <div className="space-y-1.5">
            {[
              { id: 'FAMILY', label: 'Keluarga Besar (7-Seater Luas)' },
              { id: 'CITY', label: 'Harian Perkotaan (Lincah & Hemat)' },
              { id: 'TOUGH', label: 'Tangguh Medan Rusak & Banjir' },
              { id: 'SPEED', label: 'Kesenangan Mengemudi & Kencang' }
            ].map(p => (
              <button
                key={p.id}
                onClick={() => setPriority(p.id)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                  priority === p.id
                    ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                    : 'text-slate-300 hover:bg-slate-900 border border-transparent'
                }`}
              >
                <span>{p.label}</span>
                {priority === p.id && <CheckCircle2 className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" />}
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Tipe Penggerak / Energi */}
        <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-2">
            3. Jenis Mesin / Bahan Bakar
          </span>
          <div className="space-y-1.5">
            {[
              { id: 'ANY', label: 'Bebas / Rekomendasi Terbaik' },
              { id: 'EV', label: 'Mobil Listrik Murni (EV)' },
              { id: 'HYBRID', label: 'Mobil Hybrid (Bensin + Motor)' },
              { id: 'ICE', label: 'Mesin Bensin / Diesel Konvensional' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFuelPref(f.id)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                  fuelPref === f.id
                    ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                    : 'text-slate-300 hover:bg-slate-900 border border-transparent'
                }`}
              >
                <span>{f.label}</span>
                {fuelPref === f.id && <CheckCircle2 className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" />}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Recommendation Results Box */}
      <div className="pt-6 border-t border-slate-800/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="font-heading font-bold text-lg text-white">
              Rekomendasi Mobil Terbaik untuk Kriteria Anda ({topRecommendations.length} Mobil)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Mobil-mobil berikut memiliki skor kecocokan tertinggi dengan kebutuhan Anda
            </p>
          </div>

          {topRecommendations.length >= 2 && (
            <button
              onClick={handleCompareAll}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all self-start sm:self-auto"
            >
              <Scale className="w-4 h-4 stroke-[2.5]" />
              Bandingkan {topRecommendations.length} Mobil Ini Langsung →
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topRecommendations.map((car) => (
            <div
              key={car.id}
              className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between hover:border-amber-500/50 transition-colors"
            >
              <div>
                <img
                  src={car.imageUrl}
                  alt={car.model}
                  className="w-full aspect-video object-cover rounded-xl mb-3 border border-slate-800"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/cars/toyota-innova-zenix-hybrid.webp';
                  }}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  {car.brand}
                </span>
                <h4 className="font-heading font-bold text-base text-white">
                  {car.model}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                  {car.tagline}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 block">Harga OTR</span>
                  <span className="text-xs font-bold text-white">{car.priceFormatted}</span>
                </div>
                <a
                  href={`/mobil/${car.slug}`}
                  className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                >
                  Detail <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
