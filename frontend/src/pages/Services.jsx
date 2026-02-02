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
  CheckCircle
} from 'lucide-react';

const ServicesPage = () => {
  const { t } = useLanguage();

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
            {/* Corporate Law */}
            <ServiceCard 
              icon={Building2} 
              titleKey="corporate"
              details={['Zakládání společností (s.r.o., a.s.)', 'Fúze a akvizice', 'Smluvní právo', 'Obchodní spory', 'Due diligence']}
              t={t}
            />
            
            {/* Immigration Law */}
            <ServiceCard 
              icon={Globe} 
              titleKey="immigration"
              details={['Pracovní povolení', 'Trvalý pobyt', 'Občanství ČR', 'Zaměstnanecké karty', 'Zastupování před OAMP']}
              t={t}
            />
            
            {/* Family Law */}
            <ServiceCard 
              icon={Users} 
              titleKey="family"
              details={['Rozvody', 'Výživné', 'Péče o děti', 'Majetkové vypořádání', 'Předmanželské smlouvy']}
              t={t}
            />
            
            {/* Criminal Law */}
            <ServiceCard 
              icon={Scale} 
              titleKey="criminal"
              details={['Obhajoba v trestních řízeních', 'Zastupování poškozených', 'Hospodářské trestné činy', 'Přípravné řízení', 'Odvolací řízení']}
              t={t}
            />
            
            {/* Civil Law */}
            <ServiceCard 
              icon={FileText} 
              titleKey="civil"
              details={['Nemovitosti', 'Dědické řízení', 'Náhrada škody', 'Smluvní vztahy', 'Vymáhání pohledávek']}
              t={t}
            />
            
            {/* Labor Law */}
            <ServiceCard 
              icon={Briefcase} 
              titleKey="labor"
              details={['Pracovní smlouvy', 'Ukončení pracovního poměru', 'Pracovní spory', 'Kolektivní vyjednávání', 'Outplacement']}
              t={t}
            />
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
            <ProcessStep num="01" title="Konzultace" desc="Úvodní schůzka a analýza vašeho případu." />
            <ProcessStep num="02" title="Strategie" desc="Návrh optimálního řešení a strategie." />
            <ProcessStep num="03" title="Realizace" desc="Profesionální zastupování a realizace." />
            <ProcessStep num="04" title="Výsledek" desc="Dosažení cílů a uzavření případu." />
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

const ServiceCard = ({ icon: Icon, titleKey, details, t }) => (
  <div
    className="bg-[#FDFBF7] p-10 border-l-2 border-[#C5A059] hover:shadow-lg transition-shadow duration-500"
    data-testid={`service-detail-${titleKey}`}
  >
    <div className="flex items-start gap-6">
      <div className="w-16 h-16 bg-white flex items-center justify-center shrink-0">
        <Icon className="w-8 h-8 text-[#C5A059]" />
      </div>
      <div className="flex-1">
        <h3 className="font-['Playfair_Display'] text-2xl font-semibold text-[#0F172A] mb-3">
          {t(`services.${titleKey}.title`)}
        </h3>
        <p className="text-gray-600 mb-6">
          {t(`services.${titleKey}.desc`)}
        </p>
        <ul className="space-y-3">
          {details.map((detail, i) => (
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

const ProcessStep = ({ num, title, desc }) => (
  <div className="text-center" data-testid={`process-step-${num}`}>
    <span className="font-['Playfair_Display'] text-5xl font-bold text-[#C5A059]/30">
      {num}
    </span>
    <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#0F172A] mt-4 mb-3">
      {title}
    </h3>
    <p className="text-gray-600 text-sm">
      {desc}
    </p>
  </div>
);

export default ServicesPage;
