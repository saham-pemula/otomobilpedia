import React, { useState } from 'react';
import { CARS_DATABASE } from '../data/cars';
import { formatRupiah } from '../utils/seo';
import { Calculator, DollarSign, Calendar, Shield, Fuel, FileText } from 'lucide-react';

interface LoanCalculatorProps {
  initialCarId?: string;
}

export const LoanCalculator: React.FC<LoanCalculatorProps> = ({ initialCarId }) => {
  const [selectedCarId, setSelectedCarId] = useState(initialCarId || CARS_DATABASE[0].id);
  const selectedCar = CARS_DATABASE.find(c => c.id === selectedCarId) || CARS_DATABASE[0];

  const [priceOverride, setPriceOverride] = useState<number>(selectedCar.priceOTRMinRp);
  const [dpPercent, setDpPercent] = useState<number>(25); // 25% DP
  const [tenorYears, setTenorYears] = useState<number>(3); // 3 tahun (36 bulan)
  const [interestRatePerYear, setInterestRatePerYear] = useState<number>(6.5); // 6.5% flat

  // Handle car change
  const handleCarChange = (carId: string) => {
    setSelectedCarId(carId);
    const car = CARS_DATABASE.find(c => c.id === carId);
    if (car) {
      setPriceOverride(car.priceOTRMinRp);
    }
  };

  React.useEffect(() => {
    if (initialCarId) {
      setSelectedCarId(initialCarId);
      const car = CARS_DATABASE.find(c => c.id === initialCarId);
      if (car) {
        setPriceOverride(car.priceOTRMinRp);
      }
    }
  }, [initialCarId]);

  // Calculations
  const carPrice = priceOverride;
  const dpAmount = (carPrice * dpPercent) / 100;
  const loanPrincipal = carPrice - dpAmount;
  const totalMonths = tenorYears * 12;
  const totalInterest = (loanPrincipal * (interestRatePerYear / 100)) * tenorYears;
  const totalLoanRepayment = loanPrincipal + totalInterest;
  const monthlyInstallment = Math.round(totalLoanRepayment / totalMonths);

  // First Payment (TDP = DP + Asuransi Est 2.5% + Admin Rp 3.5jt + Angsuran Pertama jika ADDM)
  const insuranceEst = Math.round(carPrice * 0.025);
  const adminFee = 3500000;
  const totalDownPaymentEst = Math.round(dpAmount + insuranceEst + adminFee + monthlyInstallment);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-800">
        <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
            Kalkulator Simulasi Kredit & Biaya Kepemilikan (TCO)
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Hitung estimasi Down Payment (DP), angsuran per bulan, dan pajak tahunan PKB
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Form Inputs (Col 7) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Pilih Mobil */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Pilih Mobil yang Ingin Dihitung
            </label>
            <select
              value={selectedCarId}
              onChange={(e) => handleCarChange(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
            >
              {CARS_DATABASE.map(c => (
                <option key={c.id} value={c.id}>
                  {c.brand} {c.model} - {c.variant} ({c.priceFormatted})
                </option>
              ))}
            </select>
          </div>

          {/* Harga OTR */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Harga On The Road (OTR)
              </label>
              <span className="text-xs text-amber-400 font-bold">
                {formatRupiah(carPrice)}
              </span>
            </div>
            <input
              type="number"
              value={priceOverride}
              onChange={(e) => setPriceOverride(Number(e.target.value))}
              step={5000000}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Uang Muka (DP) */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Uang Muka / Down Payment (DP)
              </label>
              <span className="text-xs font-semibold text-slate-200">
                {dpPercent}% ({formatRupiah(dpAmount)})
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2 mb-2">
              {[20, 25, 30, 40].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setDpPercent(pct)}
                  className={`py-2 rounded-lg text-xs font-bold transition-colors ${
                    dpPercent === pct
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>

          {/* Jangka Waktu / Tenor */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Jangka Waktu Kredit (Tenor)
              </label>
              <span className="text-xs font-semibold text-slate-200">
                {tenorYears} Tahun ({totalMonths} Bulan)
              </span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => setTenorYears(yr)}
                  className={`py-2 rounded-lg text-xs font-bold transition-colors ${
                    tenorYears === yr
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {yr} Thn
                </button>
              ))}
            </div>
          </div>

          {/* Bunga Flat */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Suku Bunga Estimasi per Tahun (Flat)
              </label>
              <span className="text-xs text-amber-400 font-bold">
                {interestRatePerYear}% / tahun
              </span>
            </div>
            <input
              type="range"
              min="4.0"
              max="10.0"
              step="0.25"
              value={interestRatePerYear}
              onChange={(e) => setInterestRatePerYear(parseFloat(e.target.value))}
              className="w-full accent-amber-500 bg-slate-800 cursor-pointer h-2 rounded-lg"
            />
          </div>

        </div>

        {/* Results Box (Col 5) */}
        <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Hasil Simulasi Angsuran
            </span>

            {/* Monthly Installment Headline */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 mb-6">
              <span className="text-xs text-amber-300 block font-medium">Cicilan Bulanan:</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 mt-1">
                {formatRupiah(monthlyInstallment)}
                <span className="text-xs text-slate-400 font-normal"> / bulan</span>
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                Untuk tenor {tenorYears} tahun ({totalMonths} kali angsuran)
              </span>
            </div>

            {/* Breakdown list */}
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Total Uang Muka Murni (DP):</span>
                <span className="font-semibold text-white">{formatRupiah(dpAmount)}</span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Pokok Hutang Pinjaman:</span>
                <span className="font-semibold text-white">{formatRupiah(loanPrincipal)}</span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Total Pembayaran Pertama (TDP Est):</span>
                <span className="font-semibold text-amber-300" title="Termasuk DP, asuransi, biaya admin & angsuran 1">
                  {formatRupiah(totalDownPaymentEst)}
                </span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Pajak Tahunan (PKB Est):</span>
                <span className="font-semibold text-emerald-400">
                  {selectedCar.specs.pkbYearlyEstRp === 0 ? 'Rp 0 (Bebas PKB Listrik)' : `${formatRupiah(selectedCar.specs.pkbYearlyEstRp)} / thn`}
                </span>
              </div>

              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Garansi Pabrikan:</span>
                <span className="font-semibold text-white">{selectedCar.specs.warrantyYears} Tahun</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-500 leading-relaxed">
            *Catatan: Simulasi ini merupakan estimasi indikatif. Nilai sesungguhnya bergantung pada suku bunga leasing, paket asuransi All-Risk/Kombinasi, dan kebijakan diskon dealer setempat.
          </div>
        </div>

      </div>
    </div>
  );
};
