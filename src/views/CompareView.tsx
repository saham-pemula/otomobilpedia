import React, { useState, useEffect } from 'react';
import { CARS_DATABASE } from '../data/cars';
import { COMPARISON_PRESETS } from '../data/presets';
import { Car } from '../types/car';
import { Breadcrumb } from '../components/Breadcrumb';
import { ComparisonMatrix } from '../components/ComparisonMatrix';
import { ComparisonVerdict } from '../components/ComparisonVerdict';
import { ComparePickerModal } from '../components/ComparePickerModal';
import { LoanCalculator } from '../components/LoanCalculator';
import { updatePageMeta, buildComparisonSchema, injectJsonLd } from '../utils/seo';
import { useRouter } from '../utils/router';
import { Scale, Plus, Sparkles, ChevronRight, Share2, AlertCircle } from 'lucide-react';

interface CompareViewProps {
  compareCarIds: string[];
  setCompareCarIds: React.Dispatch<React.SetStateAction<string[]>>;
}

export const CompareView: React.FC<CompareViewProps> = ({
  compareCarIds,
  setCompareCarIds
}) => {
  const { route, navigate } = useRouter();
  const [pickerModalOpen, setPickerModalOpen] = useState(false);
  const [activeSlotNumber, setActiveSlotNumber] = useState(1);
  const [copied, setCopied] = useState(false);

  // Parse cars from route parameter if present, e.g. /bandingkan/slug1-vs-slug2-vs-slug3
  useEffect(() => {
    if (route.params.comparisonSlug) {
      const slugs = route.params.comparisonSlug.split('-vs-');
      const matchedCars = slugs
        .map(slug => CARS_DATABASE.find(c => c.slug === slug || c.id === slug))
        .filter(Boolean) as Car[];

      if (matchedCars.length >= 2) {
        setCompareCarIds(matchedCars.map(c => c.id));
      }
    }
  }, [route.params.comparisonSlug]);

  // Ensure at least 2 cars exist
  const activeCars: Car[] = compareCarIds
    .map(id => CARS_DATABASE.find(c => c.id === id))
    .filter(Boolean) as Car[];

  // If fewer than 2 cars in state, fallback to first 2 popular cars
  const displayedCars = activeCars.length >= 2
    ? activeCars
    : [CARS_DATABASE[0], CARS_DATABASE[1]];

  const carNamesTitle = displayedCars.map(c => `${c.brand} ${c.model}`).join(' vs ');
  const carVariantsTitle = displayedCars.map(c => `${c.brand} ${c.model} (${c.variant})`).join(' vs ');

  // Sync SEO Title & Schema
  useEffect(() => {
    const pageTitle = `Perbandingan ${carNamesTitle} – Spesifikasi, Harga & Bagus Mana`;
    const pageDesc = `Komparasi lengkap ${carVariantsTitle}. Bandingkan konsumsi BBM, performa mesin, dimensi, fitur keselamatan ADAS, dan tentukan pilihan terbaik di Otomobilpedia.net.`;
    const canonicalPath = `/bandingkan/${displayedCars.map(c => c.slug).join('-vs-')}`;

    updatePageMeta(pageTitle, pageDesc, canonicalPath);

    // Inject structured comparison Schema
    const schema = buildComparisonSchema(displayedCars, canonicalPath);
    injectJsonLd('comparison-jsonld', schema);
  }, [displayedCars]);

  const handleOpenSlotPicker = (slotIdx: number) => {
    setActiveSlotNumber(slotIdx);
    setPickerModalOpen(true);
  };

  const handleSelectCarForSlot = (newCarId: string) => {
    setCompareCarIds(prev => {
      let updated = [...prev];
      if (activeSlotNumber <= updated.length) {
        // Replace existing slot
        updated[activeSlotNumber - 1] = newCarId;
      } else {
        // Add new slot
        updated.push(newCarId);
      }
      // Update clean URL to reflect changes
      const updatedCars = updated.map(id => CARS_DATABASE.find(c => c.id === id)).filter(Boolean) as Car[];
      const newSlug = updatedCars.map(c => c.slug).join('-vs-');
      navigate(`/bandingkan/${newSlug}`, true);
      return updated;
    });
  };

  const handleRemoveCar = (carIdToRemove: string) => {
    if (displayedCars.length <= 2) return; // Keep at least 2 cars
    setCompareCarIds(prev => {
      const updated = prev.filter(id => id !== carIdToRemove);
      const updatedCars = updated.map(id => CARS_DATABASE.find(c => c.id === id)).filter(Boolean) as Car[];
      const newSlug = updatedCars.map(c => c.slug).join('-vs-');
      navigate(`/bandingkan/${newSlug}`, true);
      return updated;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Bandingkan Mobil', url: '/bandingkan' },
          { label: carNamesTitle, url: `/bandingkan/${displayedCars.map(c => c.slug).join('-vs-')}` }
        ]}
      />

      {/* Main Page Header */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Scale className="w-3.5 h-3.5" />
              Alat Perbandingan Multi-Mobil Terlengkap
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-white">
              Perbandingan: {carNamesTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
              Membandingkan spesifikasi lengkap, akselerasi, efisiensi bahan bakar, ground clearance, fitur keselamatan ADAS, dan estimasi pajak tahunan antara {displayedCars.length} mobil secara objektif.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href).then(() => {
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2500);
                });
              }}
              className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all flex items-center gap-1.5 border border-slate-700 cursor-pointer"
              title="Salin Link Hasil Komparasi Ini"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Link Tersalin!' : 'Bagikan'}</span>
            </button>

            {displayedCars.length < 4 && (
              <button
                onClick={() => handleOpenSlotPicker(displayedCars.length + 1)}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>+ Tambah Mobil (Hingga 4)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Matrix */}
      <ComparisonMatrix
        cars={displayedCars}
        onAddSlotClick={handleOpenSlotPicker}
        onRemoveCar={handleRemoveCar}
        maxCars={4}
      />

      {/* "Bagus Mana?" Objective Verdict Engine */}
      <ComparisonVerdict cars={displayedCars} />

      {/* Loan & Ownership Calculator for the compared cars */}
      <section className="mt-12">
        <LoanCalculator initialCarId={displayedCars[0].id} />
      </section>

      {/* Popular Alternative Comparisons */}
      <section className="pt-8 border-t border-slate-800">
        <h3 className="font-heading font-bold text-lg text-white mb-4">
          Perbandingan Mobil Populer Lainnya
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {COMPARISON_PRESETS.filter(p => p.slug !== route.params.comparisonSlug).slice(0, 3).map(preset => (
            <a
              key={preset.id}
              href={`/bandingkan/${preset.slug}`}
              className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-colors flex items-center justify-between group"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  {preset.category}
                </span>
                <h4 className="font-heading font-bold text-sm text-white group-hover:text-amber-400 transition-colors">
                  {preset.title}
                </h4>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
            </a>
          ))}
        </div>
      </section>

      {/* Modal Picker for adding/swapping cars */}
      <ComparePickerModal
        isOpen={pickerModalOpen}
        onClose={() => setPickerModalOpen(false)}
        onSelectCar={handleSelectCarForSlot}
        currentlySelectedIds={displayedCars.map(c => c.id)}
        slotNumber={activeSlotNumber}
      />

    </div>
  );
};
