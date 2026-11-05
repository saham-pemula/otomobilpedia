import { Car, ComparisonVerdictItem } from '../types/car';

export interface SpecRow {
  key: string;
  label: string;
  group: string;
  unit?: string;
  getValue: (car: Car) => string | number | boolean;
  formatValue?: (val: any, car: Car) => string;
  getWinner?: (cars: Car[]) => string | null; // car.id of winner
  higherIsBetter?: boolean;
}

export function generateVerdict(cars: Car[]): ComparisonVerdictItem[] {
  if (cars.length < 2) return [];

  const verdicts: ComparisonVerdictItem[] = [];

  // 1. Kategori Keluarga
  const familyWinner = [...cars].sort((a, b) => {
    const scoreA = (a.specs.seatingCapacity * 3) + (a.specs.bootCapacityLiters / 50) + (a.scores.comfort * 2);
    const scoreB = (b.specs.seatingCapacity * 3) + (b.specs.bootCapacityLiters / 50) + (b.scores.comfort * 2);
    return scoreB - scoreA;
  })[0];

  verdicts.push({
    winnerCarId: familyWinner.id,
    winnerTitle: `${familyWinner.brand} ${familyWinner.model}`,
    category: 'Keluarga',
    explanation: `${familyWinner.brand} ${familyWinner.model} menawarkan ruang kabin terluas dengan kapasitas ${familyWinner.specs.seatingCapacity} penumpang, bagasi lapang ${familyWinner.specs.bootCapacityLiters} liter, serta bantingan suspensi yang paling nyaman untuk seluruh anggota keluarga.`,
    keyAdvantage: `Kapasitas ${familyWinner.specs.seatingCapacity} Seater & Bagasi ${familyWinner.specs.bootCapacityLiters}L`
  });

  // 2. Kategori Perkotaan Harian (Lincah & Parkir Mudah)
  const cityWinner = [...cars].sort((a, b) => {
    // Smaller turning radius, shorter length, and high city efficiency is better
    const scoreA = (10 - a.specs.turningRadiusM) * 3 + (5500 - a.specs.lengthMm) / 200 + (a.fuelType.includes('Listrik') ? 15 : a.specs.fuelEfficiencyCityKmL);
    const scoreB = (10 - b.specs.turningRadiusM) * 3 + (5500 - b.specs.lengthMm) / 200 + (b.fuelType.includes('Listrik') ? 15 : b.specs.fuelEfficiencyCityKmL);
    return scoreB - scoreA;
  })[0];

  verdicts.push({
    winnerCarId: cityWinner.id,
    winnerTitle: `${cityWinner.brand} ${cityWinner.model}`,
    category: 'Perkotaan Harian',
    explanation: `${cityWinner.brand} ${cityWinner.model} sangat ramah komuter perkotaan berkat radius putar ringkas ${cityWinner.specs.turningRadiusM} meter, dimensi lincah bermanuver di jalan padat atau parkir mall sempit, dan konsumsi energi yang sangat hemat.`,
    keyAdvantage: `Radius Putar ${cityWinner.specs.turningRadiusM}m & Efisiensi Urban Tinggi`
  });

  // 3. Kategori Performa & Tanjakan
  const performanceWinner = [...cars].sort((a, b) => {
    const scoreA = a.specs.maxTorqueNm + a.specs.maxPowerHp * 1.5 - a.specs.acceleration0to100 * 15;
    const scoreB = b.specs.maxTorqueNm + b.specs.maxPowerHp * 1.5 - b.specs.acceleration0to100 * 15;
    return scoreB - scoreA;
  })[0];

  verdicts.push({
    winnerCarId: performanceWinner.id,
    winnerTitle: `${performanceWinner.brand} ${performanceWinner.model}`,
    category: 'Performa & Tanjakan',
    explanation: `${performanceWinner.brand} ${performanceWinner.model} merajai performa dengan output daya ${performanceWinner.specs.maxPowerHp} HP dan torsi dahsyat ${performanceWinner.specs.maxTorqueNm} Nm, mencatat akselerasi 0-100 km/h tercepat dalam ${performanceWinner.specs.acceleration0to100} detik.`,
    keyAdvantage: `Tenaga ${performanceWinner.specs.maxPowerHp} HP & Torsi ${performanceWinner.specs.maxTorqueNm} Nm`
  });

  // 4. Kategori Value for Money & Biaya Kepemilikan Rendah
  const vfmWinner = [...cars].sort((a, b) => {
    const scoreA = (a.scores.valueForMoney * 2) - (a.priceOTRMinRp / 150000000) - (a.specs.pkbYearlyEstRp / 5000000);
    const scoreB = (b.scores.valueForMoney * 2) - (b.priceOTRMinRp / 150000000) - (b.specs.pkbYearlyEstRp / 5000000);
    return scoreB - scoreA;
  })[0];

  verdicts.push({
    winnerCarId: vfmWinner.id,
    winnerTitle: `${vfmWinner.brand} ${vfmWinner.model}`,
    category: 'Value for Money',
    explanation: `${vfmWinner.brand} ${vfmWinner.model} memberikan nilai investasi terbaik dengan harga perolehan yang rasional (${vfmWinner.priceFormatted}), estimasi pajak tahunan PKB bersahabat, serta efisiensi operasional hemat jangka panjang.`,
    keyAdvantage: `Harga ${vfmWinner.priceFormatted} & Biaya Operasional Paling Rendah`
  });

  return verdicts;
}

export const COMPARISON_SPEC_ROWS: SpecRow[] = [
  // --- HARGA & SEGMEN ---
  {
    key: 'price',
    label: 'Harga OTR (Jakarta)',
    group: 'Harga & Segmen',
    getValue: (car) => car.priceOTRMinRp,
    formatValue: (_, car) => car.priceFormatted,
    getWinner: (cars) => {
      const minPrice = Math.min(...cars.map(c => c.priceOTRMinRp));
      return cars.find(c => c.priceOTRMinRp === minPrice)?.id || null;
    }
  },
  {
    key: 'bodyType',
    label: 'Tipe Bodi',
    group: 'Harga & Segmen',
    getValue: (car) => car.bodyType
  },
  {
    key: 'fuelType',
    label: 'Tipe Bahan Bakar / Penggerak',
    group: 'Harga & Segmen',
    getValue: (car) => car.fuelType
  },

  // --- PERFORMA & MESIN ---
  {
    key: 'maxPowerHp',
    label: 'Tenaga Maksimum',
    group: 'Mesin & Performa',
    unit: 'HP / PS',
    getValue: (car) => car.specs.maxPowerHp,
    formatValue: (val, car) => `${val} HP @ ${car.specs.maxPowerRpm > 0 ? car.specs.maxPowerRpm + ' rpm' : 'Electric Motor'}`,
    getWinner: (cars) => {
      const maxPower = Math.max(...cars.map(c => c.specs.maxPowerHp));
      return cars.find(c => c.specs.maxPowerHp === maxPower)?.id || null;
    }
  },
  {
    key: 'maxTorqueNm',
    label: 'Torsi Maksimum',
    group: 'Mesin & Performa',
    unit: 'Nm',
    getValue: (car) => car.specs.maxTorqueNm,
    formatValue: (val, car) => `${val} Nm @ ${car.specs.maxTorqueRpm > 0 ? car.specs.maxTorqueRpm + ' rpm' : 'Instant Torque'}`,
    getWinner: (cars) => {
      const maxTorque = Math.max(...cars.map(c => c.specs.maxTorqueNm));
      return cars.find(c => c.specs.maxTorqueNm === maxTorque)?.id || null;
    }
  },
  {
    key: 'acceleration0to100',
    label: 'Akselerasi 0 - 100 km/h',
    group: 'Mesin & Performa',
    unit: 'detik',
    getValue: (car) => car.specs.acceleration0to100,
    formatValue: (val) => `${val} detik`,
    getWinner: (cars) => {
      const fastest = Math.min(...cars.map(c => c.specs.acceleration0to100));
      return cars.find(c => c.specs.acceleration0to100 === fastest)?.id || null;
    }
  },
  {
    key: 'engineCode',
    label: 'Kode & Tipe Mesin',
    group: 'Mesin & Performa',
    getValue: (car) => car.specs.engineCode
  },
  {
    key: 'capacityCc',
    label: 'Kapasitas Mesin',
    group: 'Mesin & Performa',
    unit: 'cc',
    getValue: (car) => car.specs.capacityCc > 0 ? `${car.specs.capacityCc} cc` : 'Motor Listrik (EV)',
  },
  {
    key: 'transmission',
    label: 'Transmisi',
    group: 'Mesin & Performa',
    getValue: (car) => car.specs.transmission
  },
  {
    key: 'driveTrain',
    label: 'Sistem Penggerak Roda',
    group: 'Mesin & Performa',
    getValue: (car) => car.specs.driveTrain
  },

  // --- EFISIENSI & KONSUMSI ---
  {
    key: 'efficiency',
    label: 'Konsumsi BBM / Jarak Tempuh EV',
    group: 'Konsumsi BBM & Jangkauan',
    getValue: (car) => {
      if (car.specs.evRangeKm) return `Jangkauan Listrik: ${car.specs.evRangeKm} km (Baterai ${car.specs.batteryCapacityKwh} kWh)`;
      return `Dalam Kota: ${car.specs.fuelEfficiencyCityKmL} km/L | Tol: ${car.specs.fuelEfficiencyHighwayKmL} km/L`;
    },
    getWinner: (cars) => {
      // If there are EVs, compare range; if ICE/Hybrid compare km/L
      const hasOnlyEV = cars.every(c => c.specs.evRangeKm);
      if (hasOnlyEV) {
        const maxRange = Math.max(...cars.map(c => c.specs.evRangeKm || 0));
        return cars.find(c => c.specs.evRangeKm === maxRange)?.id || null;
      }
      const hasOnlyFuel = cars.every(c => !c.specs.evRangeKm);
      if (hasOnlyFuel) {
        const maxKmL = Math.max(...cars.map(c => c.specs.fuelEfficiencyCityKmL));
        return cars.find(c => c.specs.fuelEfficiencyCityKmL === maxKmL)?.id || null;
      }
      return null;
    }
  },
  {
    key: 'fuelTankLiters',
    label: 'Kapasitas Tangki BBM / Baterai',
    group: 'Konsumsi BBM & Jangkauan',
    getValue: (car) => {
      if (car.specs.batteryCapacityKwh) return `${car.specs.batteryCapacityKwh} kWh Lithium`;
      return `${car.specs.fuelTankLiters} Liter`;
    }
  },

  // --- DIMENSI & KEPRAKTISAN ---
  {
    key: 'seatingCapacity',
    label: 'Kapasitas Tempat Duduk',
    group: 'Dimensi & Kabin',
    unit: 'Penumpang',
    getValue: (car) => car.specs.seatingCapacity,
    formatValue: (val) => `${val} Penumpang`,
    getWinner: (cars) => {
      const maxSeats = Math.max(...cars.map(c => c.specs.seatingCapacity));
      return cars.find(c => c.specs.seatingCapacity === maxSeats)?.id || null;
    }
  },
  {
    key: 'dimensions',
    label: 'Dimensi (P x L x T)',
    group: 'Dimensi & Kabin',
    getValue: (car) => `${car.specs.lengthMm} x ${car.specs.widthMm} x ${car.specs.heightMm} mm`
  },
  {
    key: 'groundClearanceMm',
    label: 'Ground Clearance (Jarak ke Tanah)',
    group: 'Dimensi & Kabin',
    unit: 'mm',
    getValue: (car) => car.specs.groundClearanceMm,
    formatValue: (val) => `${val} mm`,
    getWinner: (cars) => {
      const maxGc = Math.max(...cars.map(c => c.specs.groundClearanceMm));
      return cars.find(c => c.specs.groundClearanceMm === maxGc)?.id || null;
    }
  },
  {
    key: 'bootCapacityLiters',
    label: 'Kapasitas Bagasi',
    group: 'Dimensi & Kabin',
    unit: 'Liter',
    getValue: (car) => car.specs.bootCapacityLiters,
    formatValue: (val) => `${val} Liter`,
    getWinner: (cars) => {
      const maxBoot = Math.max(...cars.map(c => c.specs.bootCapacityLiters));
      return cars.find(c => c.specs.bootCapacityLiters === maxBoot)?.id || null;
    }
  },
  {
    key: 'turningRadiusM',
    label: 'Radius Putar Minimum',
    group: 'Dimensi & Kabin',
    unit: 'Meter',
    getValue: (car) => car.specs.turningRadiusM,
    formatValue: (val) => `${val} meter`,
    getWinner: (cars) => {
      const minRadius = Math.min(...cars.map(c => c.specs.turningRadiusM));
      return cars.find(c => c.specs.turningRadiusM === minRadius)?.id || null;
    }
  },

  // --- KESELAMATAN & ADAS ---
  {
    key: 'airbagCount',
    label: 'Jumlah Kantung Udara (Airbags)',
    group: 'Keselamatan & ADAS',
    unit: 'Airbags',
    getValue: (car) => car.specs.airbagCount,
    formatValue: (val) => `${val} Airbags`,
    getWinner: (cars) => {
      const maxAirbags = Math.max(...cars.map(c => c.specs.airbagCount));
      return cars.find(c => c.specs.airbagCount === maxAirbags)?.id || null;
    }
  },
  {
    key: 'adasSystemName',
    label: 'Sistem Keselamatan Aktif (ADAS)',
    group: 'Keselamatan & ADAS',
    getValue: (car) => car.specs.adasSystemName
  },
  {
    key: 'hasAdaptiveCruise',
    label: 'Adaptive Cruise Control (ACC)',
    group: 'Keselamatan & ADAS',
    getValue: (car) => car.specs.hasAdaptiveCruise ? 'Ya, Tersedia' : 'Tidak Ada'
  },
  {
    key: 'hasAutoBrakingAEB',
    label: 'Pengereman Otomatis (AEB)',
    group: 'Keselamatan & ADAS',
    getValue: (car) => car.specs.hasAutoBrakingAEB ? 'Ya, Tersedia' : 'Tidak Ada'
  },
  {
    key: 'hasCamera360',
    label: 'Kamera Parkir 360 Derajat',
    group: 'Keselamatan & ADAS',
    getValue: (car) => car.specs.hasCamera360 ? 'Kamera 360 Surround View' : 'Kamera Mundur Standar'
  },
  {
    key: 'ncapRatingStars',
    label: 'Uji Tabrak NCAP Rating',
    group: 'Keselamatan & ADAS',
    getValue: (car) => `${car.specs.ncapRatingStars} Bintang (5 Bintang Maks)`,
    getWinner: (cars) => {
      const maxStar = Math.max(...cars.map(c => c.specs.ncapRatingStars));
      return cars.find(c => c.specs.ncapRatingStars === maxStar)?.id || null;
    }
  },

  // --- KENYAMANAN & INTERIOR ---
  {
    key: 'headUnitSizeInches',
    label: 'Layar Head Unit Infotainment',
    group: 'Interior & Kenyamanan',
    getValue: (car) => `${car.specs.headUnitSizeInches} Inci dengan ${car.specs.hasAppleCarPlayAndroidAuto ? 'CarPlay & Android Auto' : 'Bluetooth'}`,
    getWinner: (cars) => {
      const maxScreen = Math.max(...cars.map(c => c.specs.headUnitSizeInches));
      return cars.find(c => c.specs.headUnitSizeInches === maxScreen)?.id || null;
    }
  },
  {
    key: 'audioSystemBrand',
    label: 'Sistem Audio Speaker',
    group: 'Interior & Kenyamanan',
    getValue: (car) => `${car.specs.audioSystemBrand} (${car.specs.speakerCount} Speakers)`
  },
  {
    key: 'hasVentilatedSeats',
    label: 'Jok Berventilasi Pendingin (Cooling)',
    group: 'Interior & Kenyamanan',
    getValue: (car) => car.specs.hasVentilatedSeats ? 'Ya (Sangat Nyaman di Iklim Panas)' : 'Tidak Ada'
  },
  {
    key: 'hasSunroofPanoramic',
    label: 'Panoramic Sunroof / Moonroof',
    group: 'Interior & Kenyamanan',
    getValue: (car) => car.specs.hasSunroofPanoramic ? 'Ya, Panoramic Roof' : 'Tidak Ada'
  },

  // --- BIAYA KEPEMILIKAN & GARANSI ---
  {
    key: 'pkbYearlyEstRp',
    label: 'Estimasi Pajak Tahunan (PKB)',
    group: 'Biaya Kepemilikan & Garansi',
    getValue: (car) => car.specs.pkbYearlyEstRp,
    formatValue: (val) => val === 0 ? 'Rp 0 (Bebas PKB Listrik Jakarta)' : `± ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val)} / tahun`,
    getWinner: (cars) => {
      const minPkb = Math.min(...cars.map(c => c.specs.pkbYearlyEstRp));
      return cars.find(c => c.specs.pkbYearlyEstRp === minPkb)?.id || null;
    }
  },
  {
    key: 'warrantyYears',
    label: 'Garansi Kendaraan & Baterai',
    group: 'Biaya Kepemilikan & Garansi',
    getValue: (car) => {
      if (car.specs.batteryWarrantyYears) {
        return `${car.specs.warrantyYears} Thn / ${car.specs.warrantyKm.toLocaleString()} km (Baterai: ${car.specs.batteryWarrantyYears === 99 ? 'Seumur Hidup' : car.specs.batteryWarrantyYears + ' Thn'})`;
      }
      return `${car.specs.warrantyYears} Tahun / ${car.specs.warrantyKm.toLocaleString()} km`;
    }
  }
];
