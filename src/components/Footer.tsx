import React from 'react';
import { COMPARISON_PRESETS } from '../data/presets';
import { 
  Car, 
  ShieldCheck, 
  Scale, 
  Zap, 
  CheckCircle, 
  Heart,
  Globe2,
  ChevronRight
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 mt-20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-slate-800">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Komparasi Multi-Mobil</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Bandingkan hingga 4 mobil sekaligus dalam satu layar berdampingan secara presisi dan objektif.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">100% Data Spesifikasi Valid</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Data spesifikasi teknis resmi dari APM, konsumsi BBM uji nyata, dan harga OTR terverifikasi.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Verdict Rekomendasi Cerdas</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Sistem analisis langsung menentukan mobil A vs mobil B bagus yang mana untuk kebutuhan Anda.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Indonesia & Pasar Global</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Basis data mobil terlengkap mulai dari LCGC, MPV keluarga, SUV tangguh, hingga Super EV.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12 border-b border-slate-800">
          
          {/* Brand & Mission Statement */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-black shadow-md shadow-amber-500/20">
                <Car className="w-6 h-6 stroke-[2.5]" />
              </div>
              <span className="font-heading font-extrabold text-2xl tracking-tight text-white">
                Mobil<span className="text-amber-400">pedia</span>
                <span className="text-xs ml-1 text-slate-400 font-normal">.net</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              <strong className="text-slate-200">Otomobilpedia.net</strong> adalah <strong className="text-slate-200">website perbandingan mobil</strong> nomor satu di Indonesia dan dunia. Platform independen tempat semua orang membandingkan antara merk mobil yang ada di seluruh dunia untuk menemukan secara pasti <em>mobil A dengan mobil B bagus yang mana</em>.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Independen, Objektif, Tanpa Bias Sponsor</span>
            </div>
          </div>

          {/* Navigasi Utama */}
          <div>
            <h5 className="font-semibold text-white text-sm mb-4 tracking-wide uppercase">Navigasi Utama</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-amber-400 transition-colors">Beranda Otomobilpedia</a>
              </li>
              <li>
                <a href="/bandingkan" className="hover:text-amber-400 transition-colors font-medium text-amber-300">
                  Alat Bandingkan Mobil
                </a>
              </li>
              <li>
                <a href="/katalog" className="hover:text-amber-400 transition-colors">Katalog Semua Mobil</a>
              </li>
              <li>
                <a href="/kalkulator-kredit" className="hover:text-amber-400 transition-colors">Simulasi Kredit & DP</a>
              </li>
              <li>
                <a href="/panduan-beli" className="hover:text-amber-400 transition-colors">Panduan Memilih Mobil</a>
              </li>
            </ul>
          </div>

          {/* Kategori Kendaraan */}
          <div>
            <h5 className="font-semibold text-white text-sm mb-4 tracking-wide uppercase">Kategori Mobil</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/kategori/suv" className="hover:text-amber-400 transition-colors">SUV & Crossover Tangguh</a>
              </li>
              <li>
                <a href="/kategori/mpv" className="hover:text-amber-400 transition-colors">MPV Keluarga Indonesia</a>
              </li>
              <li>
                <a href="/kategori/ev" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Mobil Listrik (EV)
                </a>
              </li>
              <li>
                <a href="/kategori/hybrid" className="hover:text-cyan-400 transition-colors">Mobil Hybrid Super Irit</a>
              </li>
              <li>
                <a href="/kategori/sedan" className="hover:text-amber-400 transition-colors">Sedan Sport & Eksekutif</a>
              </li>
              <li>
                <a href="/kategori/lcgc" className="hover:text-amber-400 transition-colors">LCGC & City Car Hemat</a>
              </li>
            </ul>
          </div>

          {/* Informasi & Kebijakan (Tentang, Kontak, Sitemap, Disclaimer, Privacy Policy) */}
          <div>
            <h5 className="font-semibold text-white text-sm mb-4 tracking-wide uppercase">Tentang & Bantuan</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/tentang-kami" className="hover:text-amber-400 transition-colors font-medium text-slate-200">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="/kontak" className="hover:text-amber-400 transition-colors">
                  Kontak & Redaksi
                </a>
              </li>
              <li>
                <a href="/sitemap" className="hover:text-amber-400 transition-colors">
                  Peta Situs (Sitemap)
                </a>
              </li>
              <li>
                <a href="/disclaimer" className="hover:text-amber-400 transition-colors">
                  Disclaimer
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="hover:text-amber-400 transition-colors">
                  Kebijakan Privasi
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Popular Comparisons SEO Links */}
        <div className="py-8 border-b border-slate-800">
          <h5 className="font-semibold text-white text-xs tracking-wider uppercase mb-3">
            Perbandingan Mobil Paling Sering Dicari di Indonesia
          </h5>
          <div className="flex flex-wrap gap-2 text-xs">
            {COMPARISON_PRESETS.map((preset) => (
              <a
                key={preset.id}
                href={`/bandingkan/${preset.slug}`}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white transition-colors"
              >
                <span>{preset.title}</span>
                <ChevronRight className="w-3 h-3 text-slate-500" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Disclaimer & Legal Nav Links */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p>
              © {new Date().getFullYear()} <strong className="text-slate-400">Otomobilpedia.net</strong>. Seluruh hak cipta dilindungi.
            </p>
            <div className="flex items-center gap-3 text-slate-400">
              <a href="/tentang-kami" className="hover:text-amber-400 transition-colors">Tentang Kami</a>
              <span>•</span>
              <a href="/kontak" className="hover:text-amber-400 transition-colors">Kontak</a>
              <span>•</span>
              <a href="/sitemap" className="hover:text-amber-400 transition-colors">Sitemap</a>
              <span>•</span>
              <a href="/disclaimer" className="hover:text-amber-400 transition-colors">Disclaimer</a>
              <span>•</span>
              <a href="/privacy-policy" className="hover:text-amber-400 transition-colors">Privacy Policy</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span>Domain: <strong>otomobilpedia.net</strong></span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Dibuat dengan presisi otomotif <Heart className="w-3 h-3 text-red-500 inline fill-red-500" /> untuk konsumen Indonesia
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
