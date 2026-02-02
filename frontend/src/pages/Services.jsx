import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { 
  Building2, 
  Globe, 
  Users, 
  Scale, 
  Briefcase, 
  FileText,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const ServicesPage = () => {
  const { t } = useLanguage();

  const services = [
    { 
      icon: Building2, 
      key: 'corporate',
      details: [
        'Zakládání společností (s.r.o., a.s.)',
        'Fúze a akvizice',
        'Smluvní právo',
        'Obchodní spory',
        'Due diligence'
      ]
    },
    { 
      icon: Globe, 
      key: 'immigration',
      details: [
        'Pracovní povolení',
        'Trvalý pobyt',
        'Občanství ČR',
        'Zaměstnanecké karty',
        'Zastupování před OAMP'
      ]
    },
    { 
      icon: Users, 
      key: 'family',
      details: [
        'Rozvody',
        'Výživné',
        'Péče o děti',
        'Majetkové vypořádání',
        'Předmanželské smlouvy'
      ]
    },
    { 
      icon: Scale, 
      key: 'criminal',
      details: [
        'Obhajoba v trestních řízeních',
        'Zastupování poškozených',
        'Hospodářské trestné činy',
        'Přípravné řízení',
        'Odvolací řízení'
      ]
    },
    { 
      icon: FileText, 
      key: 'civil',
      details: [
        'Nemovitosti',
        'Dědické řízení',
        'Náhrada škody',
        'Smluvní vztahy',
        'Vymáhání pohledávek'
      ]
    },
    { 
      icon: Briefcase, 
      key: 'labor',
      details: [
        'Pracovní smlouvy',
        'Ukončení pracovního poměru',
        'Pracovní spory',
        'Kolektivní vyjednávání',
        'Outplacement'
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-20" data-testid="services-page">
      {/* Hero */}
      <section className="py-20 md:py-32 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[#C5A059] text-sm uppercase tracking-widest font-semibold mb-4">
              {t('nav.services')}
            </p>
            <h1 className="font-['Playfair_Display'] text-4xl md:text-6xl font-bold text-[#0F172A] mb-6">
              {t('services.title')}
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              {t('services.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.key}
                  className="bg-[#FDFBF7] p-10 border-l-2 border-[#C5A059] hover:shadow-lg transition-all duration-500"
                  data-testid={`service-detail-${service.key}`}
                >
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-white flex items-center justify-center shrink-0">
                      <Icon className="w-8 h-8 text-[#C5A059]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-['Playfair_Display'] text-2xl font-semibold text-[#0F172A] mb-3">
                        {t(`services.${service.key}.title`)}
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {t(`services.${service.key}.desc`)}
                      </p>
                      <ul className="space-y-3">
                        {service.details.map((detail, i) => (
                          <li key={i} className="flex items-center gap-3">
                            <CheckCircle className="w-4 h-4 text-[#C5A059] shrink-0" />
                            <span className="text-gray-700 text-sm">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-32 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#C5A059] text-sm uppercase tracking-widest font-semibold mb-4">
              Jak pracujeme
            </p>
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-semibold text-[#0F172A]">
              Náš proces
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { num: '01', title: 'Konzultace', desc: 'Úvodní schůzka a analýza vašeho případu.' },
              { num: '02', title: 'Strategie', desc: 'Návrh optimálního řešení a strategie.' },
              { num: '03', title: 'Realizace', desc: 'Profesionální zastupování a realizace.' },
              { num: '04', title: 'Výsledek', desc: 'Dosažení cílů a uzavření případu.' }
            ].map((step, index) => (
              <div key={index} className="text-center" data-testid={`process-step-${index}`}>
                <span className="font-['Playfair_Display'] text-5xl font-bold text-[#C5A059]/30">
                  {step.num}
                </span>
                <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#0F172A] mt-4 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0F172A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-semibold text-white mb-6">
            Potřebujete právní pomoc?
          </h2>
          <p className="text-gray-400 mb-8">
            Kontaktujte nás pro nezávaznou konzultaci.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking">
              <Button 
                className="bg-[#C5A059] text-white hover:bg-[#D4AF37] rounded-sm px-8 py-6 text-sm uppercase tracking-widest font-semibold"
                data-testid="services-booking-btn"
              >
                {t('hero.cta')}
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#0F172A] rounded-sm px-8 py-6 text-sm uppercase tracking-widest font-semibold"
                data-testid="services-contact-btn"
              >
                {t('nav.contact')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
