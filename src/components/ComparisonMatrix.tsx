import React, { useState } from 'react';
import { Car } from '../types/car';
import { COMPARISON_SPEC_ROWS, SpecRow } from '../utils/comparator';
import { useRouter } from '../utils/router';
import { 
  Plus, 
  Trash2, 
  Share2, 
  Printer, 
  Check, 
  Trophy, 
  SlidersHorizontal, 
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface ComparisonMatrixProps {
  cars: Car[];
  onAddSlotClick: (slotIndex: number) => void;
  onRemoveCar: (carId: string) => void;
  maxCars?: number;
}

export const ComparisonMatrix: React.FC<ComparisonMatrixProps> = ({
  cars,
  onAddSlotClick,
  onRemoveCar,
  maxCars = 4
}) => {
  const { navigate } = useRouter();
  const [onlyDifferences, setOnlyDifferences] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  // Group specs by group title
  const groups: Record<string, SpecRow[]> = {};
  COMPARISON_SPEC_ROWS.forEach(row => {
    if (!groups[row.group]) groups[row.group] = [];
    groups[row.group].push(row);
  });

  const toggleGroup = (groupName: string) => {
    setCollapsedGroups(prev => ({ ...prev, [groupName]: !prev[groupName] }));
  };

  const handleShare = () => {
    const slug = cars.map(c => c.slug).join('-vs-');
    const shareUrl = `${window.location.origin}/bandingkan/${slug}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  // Determine if a spec row differs between cars
  const doesRowDiffer = (row: SpecRow) => {
    if (cars.length < 2) return true;
    const values = cars.map(c => String(row.getValue(c)).toLowerCase().trim());
    return new Set(values).size > 1;
  };

  return (
    <div className="w-full">
      
      {/* Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        
        {/* Toggle differences */}
        <div className="flex items-center gap-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={onlyDifferences}
              onChange={(e) => setOnlyDifferences(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
            <span className="ml-3 text-xs sm:text-sm font-medium text-slate-300">
              Hanya Tampilkan Perbedaan
            </span>
          </label>
        </div>

        {/* Action Buttons: Share & Print */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors border border-slate-700"
            title="Salin tautan perbandingan ini"
          >
            {copiedLink ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Tersalin!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-amber-400" />
                <span>Bagikan Hasil</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors border border-slate-700"
            title="Cetak lembar spesifikasi perbandingan"
          >
            <Printer className="w-4 h-4 text-slate-400" />
            <span className="hidden sm:inline">Cetak PDF</span>
          </button>
        </div>

      </div>

      {/* Comparison Table / Grid Container */}
      <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl">
        <table className="w-full text-left border-collapse min-w-[700px]">
          
          {/* Header Row with Cars */}
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/90">
              <th className="p-4 sm:p-6 w-1/4 min-w-[200px] text-xs font-bold text-slate-400 uppercase tracking-wider align-bottom">
                <span className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-amber-400" />
                  Spesifikasi Teknis
                </span>
              </th>

              {cars.map((car, idx) => (
                <th key={car.id} className="p-4 sm:p-6 w-1/4 min-w-[220px] align-top">
                  <div className="relative group">
                    
                    {/* Remove button */}
                    {cars.length > 1 && (
                      <button
                        onClick={() => onRemoveCar(car.id)}
                        className="absolute -top-2 -right-2 p-1.5 rounded-full bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white transition-colors z-10 shadow-md border border-slate-700"
                        title="Hapus mobil dari perbandingan"
                        aria-label={`Hapus ${car.model}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {/* Car Image with badge */}
                    <div className="relative aspect-video rounded-xl overflow-hidden mb-3 border border-slate-800 bg-slate-900">
                      <img
                        src={car.imageUrl}
                        alt={`${car.brand} ${car.model}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/cars/toyota-innova-zenix-hybrid.webp';
                        }}
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-950/80 backdrop-blur-sm text-amber-400 border border-slate-800">
                        Slot {idx + 1}
                      </span>
                    </div>

                    {/* Brand & Model Link */}
                    <a
                      href={`/mobil/${car.slug}`}
                      className="font-heading font-extrabold text-base sm:text-lg text-white hover:text-amber-400 transition-colors block leading-snug"
                    >
                      {car.brand} {car.model}
                    </a>
                    <div className="text-xs text-slate-400 truncate mb-1">
                      {car.variant}
                    </div>

                    {/* Price */}
                    <div className="text-sm sm:text-base font-extrabold text-amber-400">
                      {car.priceFormatted}
                    </div>

                    {/* Score pill */}
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
                        ★ {car.scores.overall}/10
                      </span>
                      <a
                        href={`/mobil/${car.slug}`}
                        className="text-[11px] text-slate-400 hover:text-amber-400 inline-flex items-center gap-0.5"
                      >
                        Spesifikasi <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                  </div>
                </th>
              ))}

              {/* Slot Placeholder if < maxCars */}
              {cars.length < maxCars && (
                <th className="p-4 sm:p-6 w-1/4 min-w-[200px] align-top">
                  <div
                    onClick={() => onAddSlotClick(cars.length + 1)}
                    className="aspect-video rounded-xl border-2 border-dashed border-slate-800 hover:border-amber-500/60 bg-slate-900/40 hover:bg-slate-900/80 flex flex-col items-center justify-center cursor-pointer p-4 transition-all text-center group"
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-800 group-hover:bg-amber-500 text-slate-400 group-hover:text-slate-950 flex items-center justify-center transition-colors mb-2">
                      <Plus className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <span className="text-xs font-bold text-slate-300 group-hover:text-amber-400">
                      + Tambah Mobil Ke-{cars.length + 1}
                    </span>
                    <span className="text-[11px] text-slate-500 mt-1">
                      Bisa bandingkan hingga 4 mobil
                    </span>
                  </div>
                </th>
              )}

            </tr>
          </thead>

          {/* Table Body by Spec Groups */}
          <tbody>
            {Object.entries(groups).map(([groupName, specRows]) => {
              const isCollapsed = collapsedGroups[groupName];
              
              // Filter rows if onlyDifferences is active
              const displayedRows = onlyDifferences
                ? specRows.filter(doesRowDiffer)
                : specRows;

              if (displayedRows.length === 0) return null;

              return (
                <React.Fragment key={groupName}>
                  
                  {/* Group Header Row */}
                  <tr 
                    onClick={() => toggleGroup(groupName)}
                    className="bg-slate-900/70 border-y border-slate-800/80 cursor-pointer hover:bg-slate-900 transition-colors"
                  >
                    <td
                      colSpan={cars.length + (cars.length < maxCars ? 2 : 1)}
                      className="py-3 px-4 sm:px-6 font-heading font-bold text-xs sm:text-sm text-amber-400 uppercase tracking-wider"
                    >
                      <div className="flex items-center justify-between">
                        <span>{groupName}</span>
                        {isCollapsed ? (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </td>
                  </tr>

                  {/* Spec Rows */}
                  {!isCollapsed &&
                    displayedRows.map((row) => {
                      const winnerCarId = row.getWinner ? row.getWinner(cars) : null;

                      return (
                        <tr
                          key={row.key}
                          className="border-b border-slate-800/60 hover:bg-slate-900/30 transition-colors"
                        >
                          {/* Label Column */}
                          <td className="py-3.5 px-4 sm:px-6 text-xs sm:text-sm font-medium text-slate-300 bg-slate-950/80">
                            {row.label}
                          </td>

                          {/* Value for each car */}
                          {cars.map((car) => {
                            const rawVal = row.getValue(car);
                            const displayVal = row.formatValue
                              ? row.formatValue(rawVal, car)
                              : String(rawVal);
                            const isWinner = winnerCarId === car.id;

                            return (
                              <td
                                key={car.id}
                                className={`py-3.5 px-4 sm:px-6 text-xs sm:text-sm transition-colors ${
                                  isWinner
                                    ? 'bg-amber-500/5 text-amber-200 font-semibold'
                                    : 'text-slate-300'
                                }`}
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <span>{displayVal}</span>
                                  {isWinner && (
                                    <span
                                      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40 shrink-0"
                                      title="Spesifikasi terbaik di antara mobil yang dibandingkan"
                                    >
                                      <Trophy className="w-3 h-3 text-amber-400" />
                                      Unggul
                                    </span>
                                  )}
                                </div>
                              </td>
                            );
                          })}

                          {/* Empty cell if fewer than maxCars */}
                          {cars.length < maxCars && (
                            <td className="py-3.5 px-4 sm:px-6 text-slate-700 text-xs">
                              —
                            </td>
                          )}
                        </tr>
                      );
                    })}
                </React.Fragment>
              );
            })}
          </tbody>

        </table>
      </div>

    </div>
  );
};
