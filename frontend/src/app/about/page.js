"use client";

import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Award, Users, Briefcase, Globe, CheckCircle } from 'lucide-react';

const AboutPage = () => {
  const { t } = useLanguage();

  const values = [
    {
      icon: Award,
      title: 'Profesionalita',
      desc: 'Nejvyšší standardy právních služeb a etiky.'
    },
    {
      icon: Users,
      title: 'Individuální přístup',
      desc: 'Každý klient je pro nás jedinečný.'
    },
    {
      icon: Briefcase,
      title: 'Zkušenosti',
      desc: 'Více než 20 let praxe v oboru.'
    },
    {
      icon: Globe,
      title: 'Mezinárodní dosah',
      desc: 'Klienti z celého světa, služby ve 3 jazycích.'
    }
  ];

  const timeline = [
    { year: '2003', event: 'Založení kanceláře v Praze' },
    { year: '2008', event: 'Rozšíření o imigrační právo' },
    { year: '2012', event: 'Otevření pobočky na Václavském náměstí' },
    { year: '2018', event: 'Překročení hranice 500 klientů' },
    { year: '2023', event: '20 let úspěšné praxe' }
  ];

  return (
    <div className="min-h-screen pt-20" data-testid="about-page">
      {/* Hero */}
      <section className="py-20 md:py-32 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#C5A059] text-sm uppercase tracking-widest font-semibold mb-4">
                {t('nav.about')}
              </p>
              <h1 className="font-['Playfair_Display'] text-4xl md:text-6xl font-bold text-[#0F172A] mb-6">
                {t('about.title')}
              </h1>
              <p className="text-[#0F172A] text-xl font-medium mb-4">
                {t('about.subtitle')}
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                {t('about.text1')}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {t('about.text2')}
              </p>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1505624198937-c704aff72608?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBvZmZpY2UlMjBtZWV0aW5nJTIwcm9vbXxlbnwwfHx8fDE3NzAwMjAxNDR8MA&ixlib=rb-4.1.0&q=85"
                alt="Office"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-8 -left-8 bg-[#0F172A] text-white p-8">
                <p className="font-['Playfair_Display'] text-4xl font-bold text-[#C5A059]">20+</p>
                <p className="text-sm uppercase tracking-wider mt-1">{t('about.experience')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '20+', label: t('about.experience') },
              { value: '500+', label: t('about.clients') },
              { value: '1000+', label: t('about.cases') },
              { value: '3', label: t('about.languages') }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-[#C5A059] mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-400 text-sm uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#C5A059] text-sm uppercase tracking-widest font-semibold mb-4">
              Naše hodnoty
            </p>
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-semibold text-[#0F172A]">
              Na čem stavíme
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="text-center p-8 border border-black/5 hover:border-[#C5A059]/30 transition-all duration-500 hover-lift"
                  data-testid={`value-card-${index}`}
                >
                  <div className="w-16 h-16 bg-[#FDFBF7] flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-[#C5A059]" />
                  </div>
                  <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#0F172A] mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {value.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-32 bg-[#FDFBF7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#C5A059] text-sm uppercase tracking-widest font-semibold mb-4">
              Naše historie
            </p>
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-semibold text-[#0F172A]">
              Milníky
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#C5A059]/30" />

            {timeline.map((item, index) => (
              <div
                key={index}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-[#C5A059] rounded-full transform -translate-x-1/2" />

                {/* Content */}
                <div className={`ml-20 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'
                }`}>
                  <span className="text-[#C5A059] font-['Playfair_Display'] text-2xl font-bold">
                    {item.year}
                  </span>
                  <p className="text-[#0F172A] font-medium mt-2">
                    {item.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0F172A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-semibold text-white mb-6">
            {t('booking.title')}
          </h2>
          <p className="text-gray-400 mb-8">
            {t('booking.subtitle')}
          </p>
          <Link href="/booking">
            <Button
              className="bg-[#C5A059] text-white hover:bg-[#D4AF37] rounded-sm px-8 py-6 text-sm uppercase tracking-widest font-semibold"
              data-testid="about-cta-btn"
            >
              {t('hero.cta')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
