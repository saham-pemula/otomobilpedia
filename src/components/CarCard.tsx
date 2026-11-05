import React from 'react';
import { Car } from '../types/car';
import { 
  Scale, 
  Fuel, 
  Gauge, 
  Users, 
  Check, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface CarCardProps {
  car: Car;
  isComparing?: boolean;
  onToggleCompare?: (carId: string) => void;
}

export const CarCard: React.FC<CarCardProps> = ({
  car,
  isComparing = false,
  onToggleCompare
}) => {
  const getFuelBadgeColor = (fuelType: string) => {
    switch (fuelType) {
      case 'Listrik (EV)':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Hybrid':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'Diesel':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <article className="group bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-xl hover:shadow-amber-500/5 flex flex-col justify-between">
      
      {/* Top Image & Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
        <img
          src={car.imageUrl}
          alt={`Foto ${car.brand} ${car.model} ${car.variant}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          width="400"
          height="250"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/cars/toyota-innova-zenix-hybrid.webp';
          }}
        />

        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border backdrop-blur-sm ${getFuelBadgeColor(car.fuelType)}`}>
            {car.fuelType}
          </span>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-950/80 backdrop-blur-sm text-slate-300 border border-slate-800">
            {car.bodyType}
          </span>
        </div>

        <div className="absolute top-2.5 right-2.5 z-10">
          <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-amber-500 text-slate-950 shadow-md">
            ★ {car.scores.overall}/10
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Model */}
          <div className="mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              {car.brand}
            </span>
            <h3 className="font-heading font-extrabold text-base sm:text-lg text-white leading-tight group-hover:text-amber-400 transition-colors">
              <a href={`/mobil/${car.slug}`}>
                {car.model}
              </a>
            </h3>
            <p className="text-xs text-slate-400 truncate mt-0.5">
              {car.variant} • {car.year}
            </p>
          </div>

          {/* Price OTR */}
          <div className="mt-2.5 mb-3">
            <span className="text-[11px] text-slate-500 block">Harga OTR Jakarta</span>
            <span className="text-base sm:text-lg font-extrabold text-white">
              {car.priceFormatted}
            </span>
          </div>

          {/* Key Specs Pills */}
          <div className="grid grid-cols-3 gap-1.5 py-2.5 border-y border-slate-800/80 text-[11px] text-slate-300">
            <div className="flex items-center gap-1">
              <Gauge className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="truncate">{car.specs.maxPowerHp} HP</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>{car.specs.seatingCapacity} Kursi</span>
            </div>
            <div className="flex items-center gap-1">
              <Fuel className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="truncate">
                {car.specs.evRangeKm ? `${car.specs.evRangeKm} km` : `${car.specs.fuelEfficiencyCityKmL} km/L`}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 pt-1 flex items-center gap-2">
          {onToggleCompare && (
            <button
              onClick={() => onToggleCompare(car.id)}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                isComparing
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/80 hover:border-slate-600'
              }`}
              title={isComparing ? 'Hapus dari komparasi' : 'Tambahkan ke perbandingan'}
            >
              {isComparing ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Terpilih</span>
                </>
              ) : (
                <>
                  <Scale className="w-3.5 h-3.5 text-amber-400" />
                  <span>Bandingkan</span>
                </>
              )}
            </button>
          )}

          <a
            href={`/mobil/${car.slug}`}
            className="py-2 px-3 rounded-xl text-xs font-semibold bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 flex items-center gap-1 transition-colors"
          >
            <span>Detail</span>
            <ArrowRight className="w-3 h-3 text-slate-500" />
          </a>
        </div>

      </div>

    </article>
  );
};
