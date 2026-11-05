import React, { useState } from 'react';
import { AUTOMOTIVE_FAQS } from '../data/faqs';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section aria-labelledby="faq-title" className="my-16 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          Tanya Jawab Seputar Perbandingan Mobil
        </div>
        <h2 id="faq-title" className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
          Pertanyaan yang Sering Diajukan (FAQ)
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          Semua hal yang perlu Anda ketahui mengenai cara membandingkan mobil, data spesifikasi, dan menentukan pilihan terbaik di Otomobilpedia.net.
        </p>
      </div>

      <div className="space-y-3">
        {AUTOMOTIVE_FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className="font-heading font-bold text-sm sm:text-base text-white">
                  {faq.question}
                </span>
                <span className="p-1 rounded-lg bg-slate-800 text-slate-400 shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/50">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
