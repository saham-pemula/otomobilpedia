import React, { useEffect } from 'react';
import { CARS_DATABASE } from '../data/cars';
import { CarCard } from '../components/CarCard';
import { Breadcrumb } from '../components/Breadcrumb';
import { updatePageMeta } from '../utils/seo';
import { useRouter } from '../utils/router';
import { Scale, Sparkles, ShieldCheck } from 'lucide-react';

interface CategoryViewProps {
  compareCarIds: string[];
  onToggleCompare: (carId: string) => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({
  compareCarIds,
  onToggleCompare
}) => {
  const { route } = useRouter();
  const categorySlug = (route.params.categorySlug || 'suv').toLowerCase();

  // Category dictionary
  const categoryData: Record<string, {
    title: string;
    bodyTypeMatch?: string;
    fuelMatch?: string;
    description: string;
    tips: string;
  }> = {
    suv: {
      title: 'Koleksi Mobil SUV & Crossover Tangguh Terbaik di Indonesia',
      bodyTypeMatch: 'SUV',
      description: 'Temukan dan bandingkan spesifikasi mobil SUV ladder frame dan compact crossover dengan ground clearance tinggi, siap melibas segala medan jalanan dan banjir di Indonesia.',
      tips: 'Perhatikan ground clearance (minimal 190 mm untuk rasa aman di genangan air) dan sistem penggerak roda (RWD atau AWD untuk jalanan tanjakan terjal).'
    },
    mpv: {
      title: 'Daftar Mobil MPV Keluarga 7-Seater Paling Nyaman & Irit',
      bodyTypeMatch: 'MPV',
      description: 'Bandingkan MPV keluarga idaman dari Low MPV ekonomis hingga Medium dan Luxury MPV dengan kabin lapang 7 penumpang, captain seat, dan fleksibilitas bagasi.',
      tips: 'Uji fleksibilitas pelipatan jok baris ke-3, ketersediaan double blower AC di plafon, dan keempukan suspensi belakang saat diisi muatan penuh.'
    },
    ev: {
      title: 'Mobil Listrik Murni (EV) Terbaru – Jarak Tempuh, Baterai & Harga OTR',
      fuelMatch: 'Listrik (EV)',
      description: 'Komparasi mobil listrik murni (Battery Electric Vehicle) di Indonesia. Cek kapasitas baterai kWh, jarak tempuh hingga 500+ km, kecepatan DC fast charging, dan keuntungan bebas ganjil-genap.',
      tips: 'Perhatikan tipe soket charging (CCS2 adalah standar di SPKLU Indonesia), garansi baterai pabrikan (minimal 8 tahun), dan fitur Vehicle-to-Load (V2L).'
    },
    hybrid: {
      title: 'Mobil Hybrid (HEV) Paling Irit BBM di Indonesia',
      fuelMatch: 'Hybrid',
      description: 'Bandingkan mobil hybrid perpaduan mesin bensin efisien dan motor listrik mandiri. Tembus konsumsi BBM 20 hingga 30 km/liter tanpa perlu repot mengisi daya colokan listrik.',
      tips: 'Mobil hybrid adalah jembatan ideal menuju era elektrifikasi: Anda tetap mengisi bensin biasa di SPBU namun menikmati kesenyapan motor listrik dan konsumsi bahan bakar 50% lebih hemat.'
    },
    sedan: {
      title: 'Mobil Sedan Sport & Eksekutif Mewah – Presisi Handling & Kenyamanan',
      bodyTypeMatch: 'Sedan',
      description: 'Bandingkan sedan sport kompak dan eksekutif mewah dengan akselerasi instan, distribusi bobot aerodinamis, dan kenyamanan suspensi kelas atas.',
      tips: 'Sedan menawarkan pusat gravitasi rendah sehingga menghasilkan kestabilan berkendara di kecepatan tinggi yang tidak dapat disaingi oleh bodi SUV.'
    },
    lcgc: {
      title: 'Mobil LCGC & City Car Paling Hemat Biaya di Indonesia',
      bodyTypeMatch: 'LCGC',
      description: 'Kompilasi mobil Low Cost Green Car (LCGC) dengan harga terjangkau di bawah 200 juta rupiah, pajak tahunan PKB murah meriah, dan konsumsi bensin hingga 20 km/liter.',
      tips: 'Sangat cocok sebagai mobil pertama keluarga muda atau operasional harian karena biaya perawatan dan harga onderdil yang paling murah di Indonesia.'
    }
  };

  const currentCategory = categoryData[categorySlug] || categoryData.suv;

  // Filter cars matching category
  const cars = CARS_DATABASE.filter((car) => {
    if (currentCategory.fuelMatch) {
      return car.fuelType.includes(currentCategory.fuelMatch);
    }
    if (currentCategory.bodyTypeMatch) {
      return car.bodyType === currentCategory.bodyTypeMatch;
    }
    return true;
  });

  useEffect(() => {
    updatePageMeta(
      currentCategory.title,
      currentCategory.description,
      `/kategori/${categorySlug}`
    );
  }, [categorySlug]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Kategori', url: '/katalog' },
          { label: currentCategory.title.split('–')[0].split('Paling')[0].trim(), url: `/kategori/${categorySlug}` }
        ]}
      />

      {/* Header */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-sm">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          Kategori Spesifik
        </span>
        <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-white">
          {currentCategory.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
          {currentCategory.description}
        </p>

        {/* Tip Box */}
        <div className="mt-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 leading-relaxed">
          <strong className="text-amber-400">Tips Memilih: </strong>
          {currentCategory.tips}
        </div>
      </div>

      {/* Cars Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-bold text-lg text-white">
            Daftar Mobil ({cars.length} Pilihan)
          </h2>
          <span className="text-xs text-slate-400">
            Klik "Bandingkan" untuk membandingkan spesifikasi berdampingan
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              isComparing={compareCarIds.includes(car.id)}
              onToggleCompare={onToggleCompare}
            />
          ))}
        </div>
      </div>

    </div>
  );
};
