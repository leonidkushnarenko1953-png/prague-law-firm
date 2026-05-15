"use client";

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#0F172A] text-white" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <span className="font-['Playfair_Display'] text-2xl font-bold text-white">
                Kušnarenková<span className="text-[#C5A059]">&</span>partneři
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Advokátní kancelář s více než 20letou zkušeností v Praze.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-['Playfair_Display'] text-lg font-semibold mb-6 text-[#C5A059]">
              {t('nav.services')}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/services" className="text-gray-400 hover:text-[#C5A059] transition-colors text-sm">
                  {t('services.corporate.title')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-[#C5A059] transition-colors text-sm">
                  {t('services.immigration.title')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-[#C5A059] transition-colors text-sm">
                  {t('services.family.title')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-[#C5A059] transition-colors text-sm">
                  {t('services.civil.title')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-['Playfair_Display'] text-lg font-semibold mb-6 text-[#C5A059]">
              {t('contact.title')}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">{t('contact.addressText')}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#C5A059] shrink-0" />
                <span className="text-gray-400 text-sm">+420 123 456 789</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#C5A059] shrink-0" />
                <span className="text-gray-400 text-sm">info@kushnarenko.cz</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#C5A059] shrink-0" />
                <span className="text-gray-400 text-sm">{t('contact.hoursText')}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h4 className="font-['Playfair_Display'] text-lg font-semibold mb-6 text-[#C5A059]">
              {t('nav.booking')}
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              {t('booking.subtitle')}
            </p>
            <Link
              href="/booking"
              className="inline-block bg-[#C5A059] text-white px-6 py-3 rounded-sm text-sm uppercase tracking-widest font-semibold hover:bg-[#D4AF37] transition-colors"
              data-testid="footer-booking-btn"
            >
              {t('hero.cta')}
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Kušnarenková & partneři. {t('footer.rights')}
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-gray-500 hover:text-[#C5A059] text-sm transition-colors">
                {t('footer.privacy')}
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-[#C5A059] text-sm transition-colors">
                {t('footer.terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
