import React, { useState, useEffect } from 'react';
import { CARS_DATABASE, BRANDS_LIST, BODY_TYPES } from '../data/cars';
import { COMPARISON_PRESETS } from '../data/presets';
import { Breadcrumb } from '../components/Breadcrumb';
import { updatePageMeta } from '../utils/seo';
import { 
  ShieldCheck, 
  FileText, 
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  CheckCircle2, 
  Info, 
  HelpCircle,
  Car,
  Compass,
  Building,
  Scale
} from 'lucide-react';

interface LegalInfoViewProps {
  pageType: 'sitemap' | 'disclaimer' | 'privacy-policy' | 'kontak' | 'tentang-kami';
}

export const LegalInfoView: React.FC<LegalInfoViewProps> = ({ pageType }) => {
  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactTopic, setContactTopic] = useState('Koreksi Data Spesifikasi');
  const [contactMessage, setContactMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    switch (pageType) {
      case 'sitemap':
        updatePageMeta(
          'Peta Situs (HTML Sitemap) Lengkap – Otomobilpedia.net',
          'Daftar lengkap seluruh halaman navigasi, kategori mobil, ulasan spesifikasi, dan perbandingan mobil di Otomobilpedia.net.',
          '/sitemap'
        );
        break;
      case 'disclaimer':
        updatePageMeta(
          'Disclaimer & Batasan Tanggung Jawab – Otomobilpedia.net',
          'Pernyataan penafian resmi mengenai akurasi data teknis, harga OTR, dan simulasi kredit kendaraan di Otomobilpedia.net.',
          '/disclaimer'
        );
        break;
      case 'privacy-policy':
        updatePageMeta(
          'Kebijakan Privasi (Privacy Policy) – Otomobilpedia.net',
          'Kebijakan privasi Otomobilpedia.net dalam menjaga keamanan data pengunjung, cookies, dan transparansi informasi otomotif.',
          '/privacy-policy'
        );
        break;
      case 'kontak':
        updatePageMeta(
          'Hubungi Kami & Layanan Kerjasama – Otomobilpedia.net',
          'Kontak resmi tim redaksi otomotif Otomobilpedia.net untuk saran, koreksi data spesifikasi mobil, kemitraan, dan konsultasi media.',
          '/kontak'
        );
        break;
      case 'tentang-kami':
        updatePageMeta(
          'Tentang Kami – Platform Agregator Perbandingan Mobil No. 1',
          'Mengenal visi, metodologi pengujian, dan tim analis otomotif di balik Otomobilpedia.net sebagai platform komparasi independen terpercaya.',
          '/tentang-kami'
        );
        break;
    }
  }, [pageType]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          {
            label: pageType === 'sitemap' ? 'Peta Situs (Sitemap)' :
                   pageType === 'disclaimer' ? 'Disclaimer' :
                   pageType === 'privacy-policy' ? 'Kebijakan Privasi' :
                   pageType === 'kontak' ? 'Kontak Kami' : 'Tentang Kami',
            url: `/${pageType}`
          }
        ]}
      />

      {/* ================= SITEMAP ================= */}
      {pageType === 'sitemap' && (
        <article className="space-y-8">
          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Compass className="w-3.5 h-3.5" /> Indeks Navigasi Website
            </span>
            <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-white">
              Peta Situs Resmi (HTML Sitemap) Otomobilpedia.net
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Daftar seluruh direktori halaman yang tersedia untuk memudahkan pengunjung dan bot mesin pencari Google menjelajahi ribuan database spesifikasi, komparasi mobil, dan panduan otomotif.
            </p>
          </div>

          {/* Navigasi Utama */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="font-heading font-bold text-lg text-amber-400 flex items-center gap-2">
              <Car className="w-5 h-5 text-amber-400" /> Halaman Utama & Alat
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs sm:text-sm">
              <a href="/" className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500 text-slate-200 hover:text-white transition-colors block">
                <strong>Beranda (Home)</strong>
                <span className="text-slate-500 block text-xs mt-0.5">Halaman utama agregator otomobilpedia.net</span>
              </a>
              <a href="/bandingkan" className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500 text-slate-200 hover:text-white transition-colors block">
                <strong>Alat Bandingkan Mobil</strong>
                <span className="text-slate-500 block text-xs mt-0.5">Komparasi hingga 4 mobil sekaligus</span>
              </a>
              <a href="/katalog" className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500 text-slate-200 hover:text-white transition-colors block">
                <strong>Katalog Semua Mobil</strong>
                <span className="text-slate-500 block text-xs mt-0.5">Eksplorasi ribuan spesifikasi teknis</span>
              </a>
              <a href="/kalkulator-kredit" className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500 text-slate-200 hover:text-white transition-colors block">
                <strong>Simulasi Kredit & PKB</strong>
                <span className="text-slate-500 block text-xs mt-0.5">Hitung DP, cicilan, dan pajak tahunan</span>
              </a>
              <a href="/panduan-beli" className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500 text-slate-200 hover:text-white transition-colors block">
                <strong>Panduan Memilih Mobil</strong>
                <span className="text-slate-500 block text-xs mt-0.5">Tips test drive dan komparasi</span>
              </a>
            </div>
          </div>

          {/* Kategori Kendaraan */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="font-heading font-bold text-lg text-amber-400">
              Kategori & Tipe Bodi Mobil
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
              <a href="/kategori/suv" className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:text-amber-400 transition-colors">
                SUV & Crossover Tangguh
              </a>
              <a href="/kategori/mpv" className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:text-amber-400 transition-colors">
                MPV Keluarga 7-Seater
              </a>
              <a href="/kategori/ev" className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:text-emerald-400 transition-colors">
                Mobil Listrik (EV)
              </a>
              <a href="/kategori/hybrid" className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:text-cyan-400 transition-colors">
                Mobil Hybrid Super Irit
              </a>
              <a href="/kategori/sedan" className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:text-amber-400 transition-colors">
                Sedan Mewah & Sport
              </a>
              <a href="/kategori/lcgc" className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:text-amber-400 transition-colors">
                LCGC & City Car Hemat
              </a>
            </div>
          </div>

          {/* Direktori Semua Mobil */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="font-heading font-bold text-lg text-amber-400">
              Direktori Seluruh Mobil Terdaftar ({CARS_DATABASE.length} Model Valid)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs">
              {CARS_DATABASE.map(c => (
                <a
                  key={c.id}
                  href={`/mobil/${c.slug}`}
                  className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-amber-400 flex items-center justify-between transition-colors"
                >
                  <span className="truncate">{c.brand} {c.model} ({c.variant})</span>
                  <span className="text-[10px] text-slate-500 shrink-0 ml-1">{c.year}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Preset Perbandingan */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="font-heading font-bold text-lg text-amber-400">
              Halaman Komparasi Paling Dicari
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              {COMPARISON_PRESETS.map(preset => (
                <a
                  key={preset.id}
                  href={`/bandingkan/${preset.slug}`}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 text-slate-300 hover:text-white transition-colors block"
                >
                  <strong className="text-white block">{preset.title}</strong>
                  <span className="text-slate-500 text-xs mt-0.5 line-clamp-1">{preset.shortVerdict}</span>
                </a>
              ))}
            </div>
          </div>
        </article>
      )}

      {/* ================= DISCLAIMER ================= */}
      {pageType === 'disclaimer' && (
        <article className="space-y-6 text-sm text-slate-300 leading-relaxed">
          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" /> Batasan Tanggung Jawab Resmi
            </span>
            <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-white">
              Disclaimer & Ketentuan Penggunaan Data
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Terakhir diperbarui: 3 November 2026 • Otomobilpedia.net
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5">
            <section className="space-y-2">
              <h2 className="font-heading font-bold text-base sm:text-lg text-white">
                1. Sifat Informasi dan Data Spesifikasi
              </h2>
              <p>
                Seluruh data teknis, spesifikasi mesin, dimensi kendaraan, angka akselerasi, uji efisiensi bahan bakar, kapasitas baterai, dan fitur keselamatan yang tercantum di <strong>Otomobilpedia.net</strong> dikumpulkan dari lembar spesifikasi resmi Agen Pemegang Merek (APM), brosur resmi pabrikan, uji jalan independen, serta sumber data terpercaya.
              </p>
              <p>
                Meskipun kami melakukan verifikasi berlapis secara berkala, pabrikan kendaraan berhak mengubah spesifikasi, fitur, dan varian sewaktu-waktu tanpa pemberitahuan sebelumnya. Pengguna disarankan untuk melakukan konfirmasi ulang ke dealer resmi terdekat sebelum melakukan transaksi pembelian.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading font-bold text-base sm:text-lg text-white">
                2. Estimasi Harga On-The-Road (OTR) dan Pajak PKB
              </h2>
              <p>
                Harga yang ditampilkan di Otomobilpedia.net adalah patokan harga On-The-Road (OTR) untuk wilayah DKI Jakarta dan sekitarnya pada saat data diperbarui. Harga di luar wilayah Jabodetabek dapat berbeda karena faktor bea balik nama kendaraan bermotor (BBNKB), biaya logistik distribusi daerah, serta promosi dealer setempat.
              </p>
              <p>
                Nilai Pajak Kendaraan Bermotor (PKB) tahunan dan simulasi cicilan kredit bersifat indikatif / estimasi simulasi semata. Perhitungan sesungguhnya ditentukan oleh nilai NJKB dinas pendapatan daerah dan suku bunga lembaga pembiayaan (leasing / bank) yang Anda gunakan.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading font-bold text-base sm:text-lg text-white">
                3. Independensi Ulasan dan Verdict "Bagus Mana"
              </h2>
              <p>
                Hasil perbandingan dan rekomendasi pada fitur <em>"Bagus Mana?"</em> disusun secara objektif berdasarkan komputasi metrik performa, kapasitas, efisiensi, dan nilai keekonomian. Otomobilpedia.net tidak berafiliasi secara eksklusif dengan salah satu merk otomotif tertentu dan tidak menerima imbalan finansial untuk memenangkan salah satu model kendaraan secara sepihak.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading font-bold text-base sm:text-lg text-white">
                4. Hak Cipta dan Merk Dagang
              </h2>
              <p>
                Nama merk dagang, logo, emblem, dan foto kendaraan yang digunakan adalah milik sah masing-masing pabrikan otomotif dan dilindungi undang-undang hak cipta. Penggunaannya di situs ini bertujuan semata-mata untuk identifikasi produk, edukasi konsumen, dan analisis perbandingan yang adil.
              </p>
            </section>
          </div>
        </article>
      )}

      {/* ================= PRIVACY POLICY ================= */}
      {pageType === 'privacy-policy' && (
        <article className="space-y-6 text-sm text-slate-300 leading-relaxed">
          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <FileText className="w-3.5 h-3.5" /> Perlindungan Data Pribadi
            </span>
            <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-white">
              Kebijakan Privasi (Privacy Policy)
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Berlaku di domain resmi: otomobilpedia.net • Terakhir diperbarui: 3 November 2026
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5">
            <section className="space-y-2">
              <h2 className="font-heading font-bold text-base sm:text-lg text-white">
                1. Komitmen Privasi Tanpa Sistem Login Wajib
              </h2>
              <p>
                Otomobilpedia.net menganut prinsip keterbukaan informasi. Kami <strong>tidak mewajibkan login atau registrasi akun</strong> bagi siapapun untuk mengakses seluruh katalog, lembar spesifikasi, maupun alat perbandingan multi-mobil. Anda dapat menjelajahi seluruh konten secara anonim dan bebas biaya.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading font-bold text-base sm:text-lg text-white">
                2. Penggunaan Cookies dan Penyimpanan Lokal (Local Storage)
              </h2>
              <p>
                Kami menggunakan penyimpanan lokal browser (Local Storage) dan cookies teknis murni untuk mengingat pilihan kendaraan yang sedang Anda bandingkan di slot tray, preferensi filter pencarian, dan pengaturan tampilan. Data ini tersimpan di perangkat Anda dan tidak dikirimkan ke pihak ketiga manapun.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading font-bold text-base sm:text-lg text-white">
                3. Data Analitik Standar Mesin Pencari
              </h2>
              <p>
                Seperti halnya website modern berstandar Google Search, server kami mencatat log kunjungan teknis anonim seperti jenis perangkat, peramban (browser), halaman yang diakses, dan durasi kunjungan guna memantau performa Core Web Vitals (LCP, CLS, FID) serta kecepatan server.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading font-bold text-base sm:text-lg text-white">
                4. Keamanan Kontak dan Kerahasiaan Pesan
              </h2>
              <p>
                Jika Anda menghubungi kami melalui formulir kontak atau email untuk koreksi data mobil, alamat email dan pesan Anda hanya digunakan untuk korespondensi tanggapan. Kami tidak pernah menjual, menyewakan, atau menyalahgunakan data kontak pengguna kepada pengiklan pihak ketiga atau perusahaan telemarketing.
              </p>
            </section>
          </div>
        </article>
      )}

      {/* ================= TENTANG KAMI ================= */}
      {pageType === 'tentang-kami' && (
        <article className="space-y-6 text-sm text-slate-300 leading-relaxed">
          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Building className="w-3.5 h-3.5" /> Profil Redaksi & Metodologi
            </span>
            <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-white">
              Tentang Otomobilpedia.net
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Membangun platform agregator perbandingan mobil paling objektif, presisi, dan terlengkap di Indonesia & dunia.
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="space-y-3">
              <h2 className="font-heading font-bold text-xl text-white">
                Misi Kami: Menjawab "Bagus Mana" dengan Data Valid
              </h2>
              <p>
                Didirikan oleh para analis otomotif dan rekayasawan sistem piranti lunak, <strong>Otomobilpedia.net</strong> lahir dari keresahan konsumen saat ingin membeli mobil baru. Seringkali informasi otomotif di internet terpecah-pecah, penuh istilah promosi penjualan yang bias, atau perbandingan mobil yang tidak seimbang.
              </p>
              <p>
                Otomobilpedia.net hadir sebagai platform agregator independen tempat semua orang dapat membandingkan antara merk mobil di Indonesia dan seluruh dunia berdampingan secara adil: dari segi tenaga mesin, konsumsi bahan bakar uji nyata, dimensi kabin sesungguhnya, fitur keselamatan aktif ADAS, hingga beban pajak tahunan PKB.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-amber-400 text-sm block mb-1">Ribuan Data Terverifikasi</span>
                <p className="text-xs text-slate-400">
                  Data spesifikasi teknis dikurasi langsung dari lembar spesifikasi APM resmi dan pengujian berkala.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-amber-400 text-sm block mb-1">Komparasi Hingga 4 Mobil</span>
                <p className="text-xs text-slate-400">
                  Satu-satunya sistem agregator yang memungkinkan perbandingan 2, 3, hingga 4 mobil sekaligus dalam 1 layar.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-amber-400 text-sm block mb-1">100% Bebas Biaya</span>
                <p className="text-xs text-slate-400">
                  Semua pengunjung dapat langsung mengakses seluruh fitur perbandingan tanpa perlu mendaftar atau login.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <h3 className="font-heading font-bold text-base text-white mb-2">
                Prinsip Redaksi Otomobilpedia.net
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Objektivitas Tertinggi:</strong> Kami tidak mengubah data teknis demi menguntungkan pihak pabrikan tertentu.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Fokus Kebutuhan Nyata:</strong> Rekomendasi dibagi spesifik untuk kebutuhan keluarga, komuter kota, performa luar kota, dan efisiensi biaya.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Responsif dan Cepat:</strong> Dirancang dengan performa Core Web Vitals sempurna agar dapat dibuka seketika bahkan dengan jaringan internet terbatas.</span>
                </li>
              </ul>
            </div>
          </div>
        </article>
      )}

      {/* ================= KONTAK ================= */}
      {pageType === 'kontak' && (
        <article className="space-y-8">
          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Mail className="w-3.5 h-3.5" /> Layanan Bantuan & Redaksi
            </span>
            <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-white">
              Hubungi Kami (Kontak Redaksi)
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Punya masukan koreksi spesifikasi mobil, saran perbandingan baru, atau pertanyaan kerjasama media? Tim redaksi Otomobilpedia.net siap mendengar dari Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Info Cards (Col 5) */}
            <div className="md:col-span-5 space-y-4">
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h2 className="font-heading font-bold text-base text-white">
                  Informasi Kontak Resmi
                </h2>

                <div className="space-y-3.5 text-xs sm:text-sm">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-slate-500 block text-xs">Email Redaksi & Koreksi Data:</span>
                      <strong className="text-white">redaksi@otomobilpedia.net</strong>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                      <Building className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-slate-500 block text-xs">Kerjasama & Kemitraan:</span>
                      <strong className="text-white">partner@otomobilpedia.net</strong>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-slate-500 block text-xs">Kantor Operasional Data:</span>
                      <span className="text-slate-300">Gedung Pusat Otomotif Indonesia, Jakarta Selatan 12940</span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 leading-relaxed">
                  <Info className="w-4 h-4 text-amber-400 inline mr-1.5" />
                  Seluruh pesan yang masuk akan ditinjau oleh tim data otomotif kami dalam 1 x 24 jam hari kerja.
                </div>
              </div>
            </div>

            {/* Form Input (Col 7) */}
            <div className="md:col-span-7 bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8">
              {submitted ? (
                <div className="text-center py-10 space-y-3 animate-in fade-in duration-200">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-white">
                    Pesan Berhasil Terkirim!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                    Terima kasih telah menghubungi Otomobilpedia.net. Tim redaksi kami telah menerima pesan Anda dan akan segera menindaklanjuti.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setContactMessage('');
                    }}
                    className="mt-4 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
                  >
                    Kirim Pesan Lainnya
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <h2 className="font-heading font-bold text-lg text-white mb-2">
                    Kirimkan Pesan atau Koreksi Data
                  </h2>

                  <div>
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">
                      Nama Lengkap Anda
                    </label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Contoh: Budi Santoso"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">
                      Alamat Email
                    </label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="nama@email.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">
                      Topik Pesan
                    </label>
                    <select
                      value={contactTopic}
                      onChange={(e) => setContactTopic(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
                    >
                      <option value="Koreksi Data Spesifikasi">Koreksi Data Spesifikasi Mobil</option>
                      <option value="Request Perbandingan Baru">Request Tambah Mobil / Perbandingan Baru</option>
                      <option value="Kerjasama Media">Kerjasama Media / Kemitraan</option>
                      <option value="Saran & Masukan">Saran & Masukan untuk Otomobilpedia</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">
                      Detail Pesan
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Tuliskan pesan Anda secara jelas..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-md"
                  >
                    <Send className="w-4 h-4" /> Kirim Pesan Sekarang
                  </button>
                </form>
              )}
            </div>

          </div>
        </article>
      )}

    </div>
  );
};
