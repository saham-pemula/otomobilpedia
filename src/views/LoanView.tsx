import React, { useEffect } from 'react';
import { LoanCalculator } from '../components/LoanCalculator';
import { Breadcrumb } from '../components/Breadcrumb';
import { updatePageMeta } from '../utils/seo';
import { HelpCircle, CheckCircle, ShieldAlert } from 'lucide-react';

export const LoanView: React.FC = () => {
  useEffect(() => {
    updatePageMeta(
      'Kalkulator Simulasi Kredit Mobil & Estimasi Pajak PKB Tahunan',
      'Hitung simulasi kredit mobil baru, uang muka (DP), angsuran per bulan, serta estimasi pajak tahunan PKB dan biaya kepemilikan di Otomobilpedia.net.',
      '/kalkulator-kredit'
    );
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
      
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Simulasi Kredit Mobil', url: '/kalkulator-kredit' }
        ]}
      />

      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8">
        <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-white">
          Simulasi Kredit Mobil & Estimasi Biaya Kepemilikan (TCO)
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-3xl leading-relaxed">
          Gunakan kalkulator finansial interaktif Otomobilpedia.net untuk menghitung besaran Down Payment (DP), angsuran cicilan bulanan sesuai tenor, suku bunga leasing, serta kewajiban Pajak Kendaraan Bermotor (PKB) tahunan sebelum Anda mengambil keputusan membeli mobil.
        </p>
      </div>

      {/* Calculator */}
      <LoanCalculator />

      {/* Educational Tips on Car Loans in Indonesia */}
      <section className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <h2 className="font-heading font-bold text-xl text-white">
          Panduan Finansial: Tips Mengambil Kredit Mobil yang Bijak di Indonesia
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h3 className="font-bold text-amber-400 text-sm flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" /> Rasio Angsuran Maksimal 30%
            </h3>
            <p className="text-slate-400">
              Pastikan total cicilan bulanan kendaraan Anda tidak melebihi 30% dari total pendapatan bersih bulanan keluarga agar arus kas bulanan tetap sehat dan aman dari risiko gagal bayar.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h3 className="font-bold text-amber-400 text-sm flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" /> Pahami ADDM vs ADDB
            </h3>
            <p className="text-slate-400">
              <strong>ADDM (Angsuran Dibayar Di Muka):</strong> Pembayaran angsuran pertama sudah termasuk dalam Total DP pertama saat serah terima. <br />
              <strong>ADDB (Angsuran Dibayar Di Belakang):</strong> Angsuran pertama baru mulai dibayarkan pada bulan berikutnya.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h3 className="font-bold text-amber-400 text-sm flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" /> Asuransi All Risk vs Kombinasi
            </h3>
            <p className="text-slate-400">
              Untuk mobil baru bernilai di atas 300 juta, sangat disarankan menggunakan asuransi All-Risk minimal untuk tahun ke-1 dan ke-2 guna melindungi investasi Anda dari lecet, tabrakan, dan bencana alam.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
