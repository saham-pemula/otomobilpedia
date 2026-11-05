import React, { useEffect } from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { updatePageMeta } from '../utils/seo';
import { BookOpen, CheckCircle, Scale, ShieldCheck, Zap, AlertTriangle, ArrowRight } from 'lucide-react';

export const GuideView: React.FC = () => {
  useEffect(() => {
    updatePageMeta(
      'Panduan Lengkap Memilih & Membandingkan Mobil – Otomobilpedia.net',
      'Panduan komprehensif cara memilih mobil baru, checklist test drive di dealer, perbedaan mesin Hybrid vs EV vs ICE, serta tips negosiasi harga di Indonesia.',
      '/panduan-beli'
    );
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
      
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Panduan Memilih Mobil', url: '/panduan-beli' }
        ]}
      />

      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          Panduan Otomotif Otomobilpedia
        </span>
        <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-white">
          Panduan Utama: Cara Memilih & Menentukan Mobil Terbaik untuk Kebutuhan Anda
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
          Jangan sampai salah membeli mobil yang tidak sesuai dengan kebutuhan nyata keluarga. Ikuti panduan praktis dan checklist objektif dari para ahli otomotif Otomobilpedia.net berikut ini.
        </p>
      </div>

      <div className="space-y-8 text-sm text-slate-300 leading-relaxed">
        
        {/* Section 1 */}
        <section className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="font-heading font-bold text-xl text-white flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 text-xs flex items-center justify-center font-bold">1</span>
            Pilih Jenis Mesin: Bensin, Diesel, Hybrid, atau Listrik (EV)?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <strong className="text-amber-400 block text-sm mb-1">Mobil Bensin (ICE):</strong>
              Harga pembelian awal paling terjangkau, jaringan bengkel tersebar hingga ke pelosok desa, tetapi biaya operasional BBM fluktuatif mengikuti harga minyak dunia.
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <strong className="text-amber-400 block text-sm mb-1">Mobil Diesel Turbo:</strong>
              Torsi raksasa di putaran rendah (sangat kuat di tanjakan terjal dan muatan berat), tangguh untuk jarak jauh, namun butuh bahan bakar solar berkualitas (Pertamina Dex / sejenis).
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <strong className="text-cyan-400 block text-sm mb-1">Mobil Hybrid (HEV):</strong>
              Sangat irit bahan bakar di kemacetan stop-and-go perkotaan (tembus 20-30 km/L) tanpa perlu mengisi daya colokan listrik. Pilihan terbaik untuk masa transisi energi di Indonesia.
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <strong className="text-emerald-400 block text-sm mb-1">Mobil Listrik (EV):</strong>
              Biaya energi per kilometer paling murah (Rp 250 - Rp 350 / km), bebas aturan ganjil-genap Jakarta, pajak PKB tahunan Rp 0 di beberapa daerah, akselerasi instan tanpa getaran.
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="font-heading font-bold text-xl text-white flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 text-xs flex items-center justify-center font-bold">2</span>
            Checklist Wajib Saat Melakukan Test Drive di Dealer
          </h2>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Uji Peredaman Suara (NVH):</strong> Bawa mobil ke kecepatan 60-80 km/jam dan rasakan apakah suara gesekan ban atau hembusan angin dari luar masuk ke kabin secara berlebihan.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Keempukan Suspensi di Jalan Rusak:</strong> Ajak mobil melewati speed bump (polisi tidur) atau jalan paving keriting untuk merasakan apakah bantingannya empuk atau memantul keras.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Duduk di Baris Ketiga:</strong> Duduklah sendiri di kursi baris belakang paling ujung selama 5 menit. Pastikan ruang lutut, ruang kepala, dan ventilasi hembusan AC memadai untuk penumpang dewasa.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Coba U-Turn & Parkir:</strong> Perhatikan radius putar kemudi saat berputar balik untuk memastikan mobil tidak merepotkan saat bermanuver di jalan perumahan sempit.</span>
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="font-heading font-bold text-xl text-white flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 text-xs flex items-center justify-center font-bold">3</span>
            Gunakan Alat Perbandingan Otomobilpedia Sebelum Memutuskan
          </h2>
          <p>
            Sebelum Anda menandatangani Surat Pemesanan Kendaraan (SPK), selalu bandingkan kandidat mobil Anda secara langsung menggunakan alat komparasi Otomobilpedia.net. Anda dapat melihat langsung perbandingan fitur keselamatan ADAS, kapasitas bagasi, dan biaya pajak tahunan.
          </p>
          <div className="pt-2">
            <a
              href="/bandingkan"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-colors"
            >
              <Scale className="w-4 h-4" />
              Mulai Bandingkan Mobil Sekarang →
            </a>
          </div>
        </section>

      </div>
    </div>
  );
};
