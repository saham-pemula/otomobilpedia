import React, { useEffect, useState } from 'react';
import { CARS_DATABASE } from '../data/cars';
import { Car } from '../types/car';
import { Breadcrumb } from '../components/Breadcrumb';
import { LoanCalculator } from '../components/LoanCalculator';
import { updatePageMeta, buildCarProductSchema, injectJsonLd, formatRupiah } from '../utils/seo';
import { useRouter } from '../utils/router';
import { 
  Scale, 
  Gauge, 
  Fuel, 
  Users, 
  ShieldCheck, 
  Check, 
  X, 
  Sparkles, 
  Calendar,
  Share2,
  ExternalLink,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

interface CarDetailViewProps {
  onToggleCompare: (carId: string) => void;
  isComparing: boolean;
}

export const CarDetailView: React.FC<CarDetailViewProps> = ({
  onToggleCompare,
  isComparing
}) => {
  const { route, navigate } = useRouter();
  const slug = route.params.carSlug;
  const car = CARS_DATABASE.find(c => c.slug === slug || c.id === slug) || CARS_DATABASE[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  // Competitor cars (same bodyType or similar price)
  const competitors = CARS_DATABASE.filter(c => 
    c.id !== car.id && (c.bodyType === car.bodyType || Math.abs(c.priceOTRMinRp - car.priceOTRMinRp) < 200000000)
  ).slice(0, 3);

  // Sync SEO metadata and Product Car Schema
  useEffect(() => {
    const title = `${car.brand} ${car.model} ${car.variant} (${car.year}) – Spesifikasi Lengkap & Harga`;
    const desc = `Cek spesifikasi lengkap, harga OTR, konsumsi BBM, tenaga mesin ${car.specs.maxPowerHp} HP, dan fitur keselamatan ${car.brand} ${car.model} di Otomobilpedia.net.`;
    const canonical = `/mobil/${car.slug}`;

    updatePageMeta(title, desc, canonical);

    // Inject Product Schema
    const schema = buildCarProductSchema(car);
    injectJsonLd('car-product-jsonld', schema);
  }, [car]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    });
  };

  const images = [car.imageUrl, ...(car.galleryImages || [])];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
      
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Katalog Mobil', url: '/katalog' },
          { label: car.brand, url: `/katalog?brand=${encodeURIComponent(car.brand)}` },
          { label: `${car.model} ${car.variant}`, url: `/mobil/${car.slug}` }
        ]}
      />

      {/* Main Top Header Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Gallery (Col 7) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
            <img
              src={images[activeImageIndex]}
              alt={`${car.brand} ${car.model} ${car.variant}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/cars/toyota-innova-zenix-hybrid.webp';
              }}
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-slate-950/80 backdrop-blur-md text-amber-400 border border-slate-800">
                {car.bodyType}
              </span>
              <span className="px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-slate-950/80 backdrop-blur-md text-emerald-400 border border-slate-800">
                {car.fuelType}
              </span>
            </div>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIndex === idx ? 'border-amber-500 scale-105' : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Details Box (Col 5) */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                {car.brand} Indonesia
              </span>
              <button
                onClick={handleShare}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                title="Salin Link Halaman"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'Tersalin!' : 'Bagikan'}</span>
              </button>
            </div>

            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white leading-tight">
              {car.brand} {car.model}
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              {car.variant} • Tahun {car.year}
            </p>

            {/* Price OTR */}
            <div className="my-5 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <span className="text-xs text-slate-400 block font-medium">Harga Resmi On The Road (OTR) Jakarta:</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 mt-1">
                {car.priceFormatted}
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                *Pajak Tahunan (PKB Est): {car.specs.pkbYearlyEstRp === 0 ? 'Rp 0 (Bebas PKB)' : formatRupiah(car.specs.pkbYearlyEstRp)}
              </span>
            </div>

            {/* Tagline */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 italic">
              "{car.tagline}"
            </p>

            {/* Key Specs Matrix */}
            <div className="grid grid-cols-2 gap-3 text-xs mb-6">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="text-slate-500 block">Tenaga Mesin</span>
                <span className="font-bold text-white text-sm mt-0.5 block">{car.specs.maxPowerHp} HP / PS</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="text-slate-500 block">Torsi Maksimum</span>
                <span className="font-bold text-white text-sm mt-0.5 block">{car.specs.maxTorqueNm} Nm</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="text-slate-500 block">Kapasitas Kursi</span>
                <span className="font-bold text-white text-sm mt-0.5 block">{car.specs.seatingCapacity} Penumpang</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="text-slate-500 block">Konsumsi / Range</span>
                <span className="font-bold text-white text-sm mt-0.5 block">
                  {car.specs.evRangeKm ? `${car.specs.evRangeKm} km (EV)` : `${car.specs.fuelEfficiencyCityKmL} km/L`}
                </span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="space-y-2 pt-4 border-t border-slate-800">
            <button
              onClick={() => onToggleCompare(car.id)}
              className={`w-full py-3.5 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                isComparing
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
              }`}
            >
              <Scale className="w-4 h-4" />
              {isComparing ? 'Mobil Ini Ada di Slot Perbandingan' : '+ Tambahkan ke Perbandingan'}
            </button>

            <a
              href={`/bandingkan/${car.slug}-vs-${competitors[0]?.slug || CARS_DATABASE[1].slug}`}
              className="w-full py-3 px-4 rounded-xl text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Bandingkan Langsung dengan {competitors[0]?.model || 'Rival'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>

      {/* Description Overview */}
      <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <h2 className="font-heading font-bold text-xl sm:text-2xl text-white">
          Ulasan & Profil {car.brand} {car.model}
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          {car.description}
        </p>
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm text-amber-200">
          <strong>Cocok untuk: </strong> {car.bestFor}
        </div>
      </section>

      {/* Pros & Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6">
          <h3 className="font-heading font-bold text-lg text-emerald-400 mb-4 flex items-center gap-2">
            <Check className="w-5 h-5 stroke-[3]" /> Kelebihan Utama (Pros)
          </h3>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
            {car.pros.map((pro, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6">
          <h3 className="font-heading font-bold text-lg text-rose-400 mb-4 flex items-center gap-2">
            <X className="w-5 h-5 stroke-[3]" /> Kekurangan yang Perlu Diperhatikan (Cons)
          </h3>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
            {car.cons.map((con, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Full Technical Specifications Sheet */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8">
        <h2 className="font-heading font-bold text-xl sm:text-2xl text-white mb-6">
          Lembar Spesifikasi Teknis Lengkap
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm">
          
          {/* Mesin & Performa */}
          <div className="space-y-3">
            <h3 className="font-bold text-amber-400 uppercase tracking-wider text-xs pb-2 border-b border-slate-800">
              Mesin & Performa
            </h3>
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Tipe Mesin:</span>
              <span className="font-semibold text-white text-right">{car.specs.engineType}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Kode Mesin:</span>
              <span className="font-semibold text-white">{car.specs.engineCode}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Kapasitas Silinder:</span>
              <span className="font-semibold text-white">{car.specs.capacityCc > 0 ? `${car.specs.capacityCc} cc` : 'Motor Listrik (EV)'}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Tenaga Maksimum:</span>
              <span className="font-semibold text-white">{car.specs.maxPowerHp} HP @ {car.specs.maxPowerRpm} rpm</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Torsi Maksimum:</span>
              <span className="font-semibold text-white">{car.specs.maxTorqueNm} Nm @ {car.specs.maxTorqueRpm} rpm</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Transmisi:</span>
              <span className="font-semibold text-white">{car.specs.transmission}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Sistem Penggerak:</span>
              <span className="font-semibold text-white">{car.specs.driveTrain}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Akselerasi 0 - 100 km/h:</span>
              <span className="font-semibold text-amber-400">{car.specs.acceleration0to100} detik</span>
            </div>
          </div>

          {/* Dimensi & Kapasitas */}
          <div className="space-y-3">
            <h3 className="font-bold text-amber-400 uppercase tracking-wider text-xs pb-2 border-b border-slate-800">
              Dimensi & Kapasitas
            </h3>
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Panjang x Lebar x Tinggi:</span>
              <span className="font-semibold text-white">{car.specs.lengthMm} x {car.specs.widthMm} x {car.specs.heightMm} mm</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Jarak Sumbu Roda (Wheelbase):</span>
              <span className="font-semibold text-white">{car.specs.wheelbaseMm} mm</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Ground Clearance:</span>
              <span className="font-semibold text-white">{car.specs.groundClearanceMm} mm</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Radius Putar Minimum:</span>
              <span className="font-semibold text-white">{car.specs.turningRadiusM} meter</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Kapasitas Tempat Duduk:</span>
              <span className="font-semibold text-white">{car.specs.seatingCapacity} Penumpang</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Kapasitas Bagasi:</span>
              <span className="font-semibold text-white">{car.specs.bootCapacityLiters} Liter</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Bobot Kosong (Curb Weight):</span>
              <span className="font-semibold text-white">{car.specs.curbWeightKg} kg</span>
            </div>
          </div>

          {/* Keselamatan & ADAS */}
          <div className="space-y-3">
            <h3 className="font-bold text-amber-400 uppercase tracking-wider text-xs pb-2 border-b border-slate-800">
              Keselamatan Aktif & ADAS
            </h3>
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Sistem ADAS:</span>
              <span className="font-semibold text-white">{car.specs.adasSystemName}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Jumlah Kantung Udara:</span>
              <span className="font-semibold text-white">{car.specs.airbagCount} Airbags</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Adaptive Cruise Control:</span>
              <span className="font-semibold text-white">{car.specs.hasAdaptiveCruise ? 'Tersedia' : 'Tidak Ada'}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Pengereman Otomatis (AEB):</span>
              <span className="font-semibold text-white">{car.specs.hasAutoBrakingAEB ? 'Tersedia' : 'Tidak Ada'}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Kamera Parkir:</span>
              <span className="font-semibold text-white">{car.specs.hasCamera360 ? 'Kamera 360 Derajat' : 'Kamera Mundur'}</span>
            </div>
          </div>

          {/* Garansi & Purna Jual */}
          <div className="space-y-3">
            <h3 className="font-bold text-amber-400 uppercase tracking-wider text-xs pb-2 border-b border-slate-800">
              Pajak & Garansi Purna Jual
            </h3>
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Estimasi Pajak PKB Tahunan:</span>
              <span className="font-semibold text-emerald-400">
                {car.specs.pkbYearlyEstRp === 0 ? 'Rp 0 (Bebas PKB Listrik DKI)' : formatRupiah(car.specs.pkbYearlyEstRp)}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Garansi Kendaraan:</span>
              <span className="font-semibold text-white">{car.specs.warrantyYears} Tahun / {car.specs.warrantyKm.toLocaleString()} km</span>
            </div>
            {car.specs.batteryWarrantyYears && (
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Garansi Baterai / Motor:</span>
                <span className="font-semibold text-cyan-400">
                  {car.specs.batteryWarrantyYears === 99 ? 'Seumur Hidup (Lifetime)' : `${car.specs.batteryWarrantyYears} Tahun`}
                </span>
              </div>
            )}
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Gratis Biaya Jasa Servis:</span>
              <span className="font-semibold text-white">{car.specs.freeServiceYears} Tahun</span>
            </div>
          </div>

        </div>
      </section>

      {/* Direct Competitors Compare Cards */}
      <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8">
        <h2 className="font-heading font-bold text-xl sm:text-2xl text-white mb-2">
          Bandingkan {car.model} dengan Rival Terdekatnya
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mb-6">
          Paling sering dikomparasikan konsumen untuk menentukan mana yang lebih bagus
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {competitors.map((comp) => (
            <div key={comp.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <img
                  src={comp.imageUrl}
                  alt={comp.model}
                  className="w-full aspect-video object-cover rounded-xl mb-3 border border-slate-800"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/cars/toyota-innova-zenix-hybrid.webp';
                  }}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <h4 className="font-bold text-white text-sm">{comp.brand} {comp.model}</h4>
                <span className="text-xs text-amber-400 font-semibold">{comp.priceFormatted}</span>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{comp.tagline}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-900">
                <a
                  href={`/bandingkan/${car.slug}-vs-${comp.slug}`}
                  className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Scale className="w-3.5 h-3.5" />
                  Bandingkan Side-by-Side →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dedicated Loan & Ownership Calculator */}
      <section>
        <LoanCalculator initialCarId={car.id} />
      </section>

    </div>
  );
};
