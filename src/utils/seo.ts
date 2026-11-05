import { Car } from '../types/car';
import { FaqItem } from '../data/faqs';

export const BASE_URL = 'https://otomobilpedia.net';

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('id-ID').format(num);
}

export function updatePageMeta(title: string, description: string, canonicalPath: string = '/') {
  // Update document title
  document.title = `${title} | Otomobilpedia.net`;

  // Update meta description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', description);

  // Update canonical URL
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  const cleanPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
  canonical.setAttribute('href', `${BASE_URL}${cleanPath}`);

  // Update OpenGraph
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', `${title} | Otomobilpedia.net`);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', description);

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', `${BASE_URL}${cleanPath}`);

  // Update Twitter
  const twTitle = document.querySelector('meta[name="twitter:title"]');
  if (twTitle) twTitle.setAttribute('content', `${title} | Otomobilpedia.net`);

  const twDesc = document.querySelector('meta[name="twitter:description"]');
  if (twDesc) twDesc.setAttribute('content', description);
}

export function injectJsonLd(id: string, data: object) {
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

export function removeJsonLd(id: string) {
  const script = document.getElementById(id);
  if (script) {
    script.remove();
  }
}

export function buildCarProductSchema(car: Car) {
  return {
    '@context': 'https://schema.org/',
    '@type': 'Car',
    'name': `${car.brand} ${car.model} ${car.variant}`,
    'image': [car.imageUrl, ...(car.galleryImages || [])],
    'description': car.description,
    'brand': {
      '@type': 'Brand',
      'name': car.brand
    },
    'model': car.model,
    'vehicleModelDate': car.year.toString(),
    'bodyType': car.bodyType,
    'fuelType': car.fuelType,
    'vehicleTransmission': car.specs.transmission,
    'driveWheelConfiguration': car.specs.driveTrain,
    'numberOfDoors': 5,
    'seatingCapacity': car.specs.seatingCapacity,
    'vehicleEngine': {
      '@type': 'EngineSpecification',
      'name': car.specs.engineCode,
      'engineDisplacement': {
        '@type': 'QuantitativeValue',
        'value': car.specs.capacityCc,
        'unitCode': 'CMQ'
      },
      'enginePower': {
        '@type': 'QuantitativeValue',
        'value': car.specs.maxPowerHp,
        'unitText': 'HP'
      }
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': car.scores.overall.toFixed(1),
      'bestRating': '10',
      'worstRating': '1',
      'ratingCount': '248'
    },
    'offers': {
      '@type': 'AggregateOffer',
      'priceCurrency': 'IDR',
      'lowPrice': car.priceOTRMinRp,
      'highPrice': car.priceOTRMaxRp,
      'offerCount': '1',
      'priceValidUntil': '2026-12-31',
      'availability': 'https://schema.org/InStock',
      'itemCondition': 'https://schema.org/NewCondition'
    }
  };
}

export function buildComparisonSchema(cars: Car[], pageUrl: string) {
  const carNames = cars.map(c => `${c.brand} ${c.model}`).join(' vs ');
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemPage',
    'url': `${BASE_URL}${pageUrl}`,
    'name': `Perbandingan Lengkap ${carNames} - Spesifikasi, Harga & Ulasan`,
    'description': `Analisis perbandingan mendalam antara ${carNames}. Temukan kelebihan, kekurangan, konsumsi BBM, dan mana yang lebih bagus untuk Anda.`,
    'mainEntity': {
      '@type': 'ItemList',
      'name': `Komparasi Mobil: ${carNames}`,
      'itemListElement': cars.map((car, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'item': {
          '@type': 'Car',
          'name': `${car.brand} ${car.model} ${car.variant}`,
          'brand': car.brand,
          'image': car.imageUrl,
          'offers': {
            '@type': 'Offer',
            'price': car.priceOTRMinRp,
            'priceCurrency': 'IDR'
          }
        }
      }))
    }
  };
}

export function buildFaqSchema(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };
}

export function buildBreadcrumbsSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': `${BASE_URL}${item.url}`
    }))
  };
}
