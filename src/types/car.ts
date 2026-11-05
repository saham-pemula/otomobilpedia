export type BodyType = 'MPV' | 'SUV' | 'Sedan' | 'Hatchback' | 'EV' | 'Hybrid' | 'LCGC';

export type FuelType = 'Bensin' | 'Diesel' | 'Hybrid' | 'Listrik (EV)';

export type TransmissionType = 'CVT' | 'Otomatis (AT)' | 'Manual (MT)' | 'Dual Clutch (DCT)' | 'Single Speed EV';

export type DriveTrain = 'FWD' | 'RWD' | 'AWD' | '4WD';

export interface CarSpecs {
  // Mesin & Performa
  engineCode: string;
  engineType: string;
  capacityCc: number; // 0 for EV
  maxPowerHp: number; // HP/PS
  maxPowerRpm: number;
  maxTorqueNm: number;
  maxTorqueRpm: number;
  driveTrain: DriveTrain;
  transmission: TransmissionType;
  acceleration0to100: number; // detik
  topSpeedKmH: number;

  // Dimensi & Kapasitas
  lengthMm: number;
  widthMm: number;
  heightMm: number;
  wheelbaseMm: number;
  groundClearanceMm: number;
  turningRadiusM: number;
  seatingCapacity: number;
  bootCapacityLiters: number;
  curbWeightKg: number;
  fuelTankLiters: number; // 0 for EV

  // Efisiensi & Baterai
  fuelEfficiencyCityKmL: number; // km/liter
  fuelEfficiencyHighwayKmL: number; // km/liter
  batteryCapacityKwh?: number;
  evRangeKm?: number; // Jarak tempuh km (WLTP/NEDC)
  chargingTimeFastMin?: number; // 10-80% DC
  emissionStandard: string;

  // Keselamatan & ADAS
  airbagCount: number;
  absEbdBa: boolean;
  escVsc: boolean;
  hillStartAssist: boolean;
  adasSystemName: string; // misal: Toyota Safety Sense 3.0, Honda Sensing, Hyundai Smartsense
  hasAdaptiveCruise: boolean;
  hasLaneKeepAssist: boolean;
  hasAutoBrakingAEB: boolean;
  hasBlindSpotMonitor: boolean;
  hasCamera360: boolean;
  ncapRatingStars: number;

  // Kenyamanan & Hiburan
  headUnitSizeInches: number;
  hasAppleCarPlayAndroidAuto: boolean;
  audioSystemBrand: string;
  speakerCount: number;
  airConditioning: string;
  seatMaterial: string;
  hasVentilatedSeats: boolean;
  hasSunroofPanoramic: boolean;
  hasWirelessCharger: boolean;
  hasPowerTailgate: boolean;

  // Biaya Kepemilikan & Garansi
  pkbYearlyEstRp: number; // Pajak tahunan estimasi (IDR)
  warrantyYears: number;
  warrantyKm: number;
  batteryWarrantyYears?: number;
  freeServiceYears: number;
}

export interface Car {
  id: string;
  slug: string;
  brand: string;
  model: string;
  variant: string;
  year: number;
  bodyType: BodyType;
  fuelType: FuelType;
  priceOTRMinRp: number;
  priceOTRMaxRp: number;
  priceFormatted: string;
  imageUrl: string;
  galleryImages: string[];
  tagline: string;
  description: string;
  pros: string[];
  cons: string[];
  scores: {
    performance: number; // 1-10
    comfort: number;     // 1-10
    efficiency: number;  // 1-10
    valueForMoney: number; // 1-10
    safety: number;      // 1-10
    overall: number;     // 1-10
  };
  bestFor: string;
  specs: CarSpecs;
}

export interface ComparisonPreset {
  id: string;
  slug: string;
  carIds: string[];
  title: string;
  shortVerdict: string;
  category: string;
  viewsCount: number;
  trendingBadge?: string;
}

export interface ComparisonVerdictItem {
  winnerCarId: string;
  winnerTitle: string;
  category: 'Keluarga' | 'Perkotaan Harian' | 'Performa & Tanjakan' | 'Value for Money' | 'Jarak Jauh / Mudik';
  explanation: string;
  keyAdvantage: string;
}

export interface FilterState {
  searchQuery: string;
  brand: string;
  bodyType: string;
  fuelType: string;
  priceMaxRp: number;
  sortBy: 'popular' | 'priceAsc' | 'priceDesc' | 'powerDesc' | 'efficiencyDesc' | 'scoreDesc';
}
