import React, { useState, useEffect } from 'react';
import { RouterProvider, useRouter } from './utils/router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { CompareView } from './views/CompareView';
import { CarDetailView } from './views/CarDetailView';
import { CatalogView } from './views/CatalogView';
import { CategoryView } from './views/CategoryView';
import { LoanView } from './views/LoanView';
import { GuideView } from './views/GuideView';
import { LegalInfoView } from './views/LegalInfoView';
import { CARS_DATABASE } from './data/cars';
import { updatePageMeta, injectJsonLd } from './utils/seo';
import { Scale, X, ArrowRight } from 'lucide-react';

const AppContent: React.FC = () => {
  const { route, navigate } = useRouter();

  // Selected car IDs for comparison
  const [compareCarIds, setCompareCarIds] = useState<string[]>([
    'toyota-innova-zenix-hybrid',
    'mitsubishi-pajero-sport-dakar'
  ]);

  // Toggle compare car helper
  const handleToggleCompare = (carId: string) => {
    setCompareCarIds(prev => {
      if (prev.includes(carId)) {
        return prev.filter(id => id !== carId);
      }
      if (prev.length >= 4) {
        // limit to 4
        return [...prev.slice(1), carId];
      }
      return [...prev, carId];
    });
  };

  const handleStartComparison = (carIds: string[]) => {
    setCompareCarIds(carIds);
    const cars = carIds.map(id => CARS_DATABASE.find(c => c.id === id)).filter(Boolean);
    const slug = cars.map(c => c!.slug).join('-vs-');
    navigate(`/bandingkan/${slug}`);
  };

  // Default SEO meta setup for homepage
  useEffect(() => {
    if (route.path === '/') {
      updatePageMeta(
        'Otomobilpedia.net – Website Perbandingan Mobil Terbaik & Terlengkap',
        'Website perbandingan mobil nomor satu di Indonesia & dunia. Bandingkan spesifikasi lengkap, harga OTR resmi, konsumsi BBM, performa mesin, dan tentukan mobil A vs mobil B bagus yang mana.',
        '/'
      );
    }
  }, [route.path]);

  // Route selector
  const renderCurrentView = () => {
    const { path } = route;

    if (path.startsWith('/bandingkan')) {
      return (
        <CompareView
          compareCarIds={compareCarIds}
          setCompareCarIds={setCompareCarIds}
        />
      );
    }

    if (path.startsWith('/mobil/')) {
      return (
        <CarDetailView
          onToggleCompare={handleToggleCompare}
          isComparing={compareCarIds.includes(route.params.carSlug || '')}
        />
      );
    }

    if (path.startsWith('/kategori/')) {
      return (
        <CategoryView
          compareCarIds={compareCarIds}
          onToggleCompare={handleToggleCompare}
        />
      );
    }

    if (path === '/katalog') {
      return (
        <CatalogView
          compareCarIds={compareCarIds}
          onToggleCompare={handleToggleCompare}
        />
      );
    }

    if (path === '/kalkulator-kredit') {
      return <LoanView />;
    }

    if (path === '/panduan-beli') {
      return <GuideView />;
    }

    if (path === '/sitemap') {
      return <LegalInfoView pageType="sitemap" />;
    }

    if (path === '/disclaimer') {
      return <LegalInfoView pageType="disclaimer" />;
    }

    if (path === '/privacy-policy') {
      return <LegalInfoView pageType="privacy-policy" />;
    }

    if (path === '/kontak') {
      return <LegalInfoView pageType="kontak" />;
    }

    if (path === '/tentang-kami') {
      return <LegalInfoView pageType="tentang-kami" />;
    }

    // Default Home
    return (
      <HomeView
        onStartComparison={handleStartComparison}
        compareCarIds={compareCarIds}
        onToggleCompare={handleToggleCompare}
      />
    );
  };

  const isComparePage = route.path.startsWith('/bandingkan');

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      
      {/* Sticky Header */}
      <Header compareCarIds={compareCarIds} />

      {/* Main Dynamic View */}
      <main className="flex-1 w-full">
        {renderCurrentView()}
      </main>

      {/* Floating Compare Tray (When browsing other pages and 2+ cars are selected) */}
      {!isComparePage && compareCarIds.length >= 2 && (
        <aside 
          aria-label="Panel komparasi mengambang"
          className="fixed bottom-5 right-5 z-40 max-w-sm w-full bg-slate-900/95 border border-amber-500/40 rounded-2xl p-4 shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-5 duration-200"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
              <Scale className="w-4 h-4" />
              Siap Dibandingkan ({compareCarIds.length} Mobil)
            </span>
            <button
              onClick={() => setCompareCarIds([])}
              className="p-1 text-slate-400 hover:text-white rounded-lg"
              title="Kosongkan slot komparasi"
              aria-label="Kosongkan slot komparasi"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-1">
            {compareCarIds.map(id => {
              const car = CARS_DATABASE.find(c => c.id === id);
              if (!car) return null;
              return (
                <div key={car.id} className="relative group shrink-0">
                  <img
                    src={car.imageUrl}
                    alt={car.model}
                    className="w-12 h-9 object-cover rounded-md border border-slate-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/cars/toyota-innova-zenix-hybrid.webp';
                    }}
                    referrerPolicy="no-referrer"
                  />
                  <button
                    onClick={() => handleToggleCompare(car.id)}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 rounded-full text-[10px] text-white flex items-center justify-center font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label={`Hapus ${car.model}`}
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => {
              const cars = compareCarIds.map(id => CARS_DATABASE.find(c => c.id === id)).filter(Boolean);
              const slug = cars.map(c => c!.slug).join('-vs-');
              navigate(`/bandingkan/${slug}`);
            }}
            className="w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 transition-colors"
          >
            <span>Bandingkan Sekarang</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </aside>
      )}

      {/* Professional Footer */}
      <Footer />

    </div>
  );
};

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}
