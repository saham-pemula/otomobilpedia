export interface FaqItem {
  question: string;
  answer: string;
}

export const AUTOMOTIVE_FAQS: FaqItem[] = [
  {
    question: 'Bagaimana cara menentukan mobil A dengan mobil B bagus yang mana di Otomobilpedia.net?',
    answer: 'Otomobilpedia.net membandingkan mobil secara objektif berdasarkan data teknis terverifikasi (spesifikasi mesin, konsumsi bahan bakar uji nyata, dimensi kabin, ground clearance, fitur keselamatan aktif ADAS, dan estimasi biaya kepemilikan/PKB). Sistem rekomendasi kami secara otomatis menganalisis pemenang di berbagai skenario penggunaan: untuk keluarga, perkotaan macet, medan tanjakan luar kota, maupun nilai keekonomian (value for money).'
  },
  {
    question: 'Apakah Otomobilpedia.net bisa membandingkan lebih dari 2 mobil sekaligus?',
    answer: 'Ya! Otomobilpedia.net memiliki sistem perbandingan multi-mobil canggih yang mendukung perbandingan 2, 3, hingga 4 mobil sekaligus dalam satu layar berdampingan. Anda juga dapat mengaktifkan filter "Hanya Tampilkan Perbedaan" untuk langsung melihat perbandingan spesifikasi yang berbeda tanpa terdistraksi data yang sama.'
  },
  {
    question: 'Mana yang lebih bagus: Toyota Kijang Innova Zenix Hybrid atau Mitsubishi Pajero Sport?',
    answer: 'Jika prioritas Anda adalah kenyamanan keluarga, keempukan suspensi jalan raya tol, serta efisiensi BBM super irit (bisa tembus 21 km/L), maka Toyota Innova Zenix Hybrid adalah pemenang telak. Namun jika Anda sering melintasi jalan rusak parah, daerah rawan banjir, tanjakan pegunungan berat, atau menyukai SUV sasis tangga berwibawa dengan torsi diesel 430 Nm, maka Mitsubishi Pajero Sport Dakar adalah pilihan yang tepat.'
  },
  {
    question: 'Apakah mobil listrik (EV) lebih hemat daripada mobil hybrid di Indonesia?',
    answer: 'Dari segi biaya energi harian, mobil listrik (EV) membutuhkan biaya sekitar Rp 250 - Rp 350 per kilometer (tarif SPKLU/listrik rumah), sedangkan mobil hybrid sekitar Rp 650 - Rp 850 per kilometer. Mobil listrik juga bebas ganjil-genap dan bebas PKB tahunan di beberapa daerah. Namun, mobil hybrid unggul dalam fleksibilitas karena tidak memerlukan waktu pengisian baterai dan dapat mengisi bensin di SPBU mana pun di seluruh pelosok Indonesia.'
  },
  {
    question: 'Bagaimana akurasi data harga dan spesifikasi di Otomobilpedia.net?',
    answer: 'Seluruh data di Otomobilpedia.net dirangkum dan diperbarui secara berkala dari lembar spesifikasi resmi agen pemegang merek (APM), brosur teknis pabrikan, serta daftar harga On-The-Road (OTR) Jakarta dan kota-kota besar di Indonesia.'
  }
];
