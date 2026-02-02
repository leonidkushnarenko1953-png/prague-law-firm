import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/button';
import { 
  Scale, 
  Building2, 
  Home, 
  Briefcase, 
  Shield, 
  Globe,
  FileText,
  ArrowRight,
  Award,
  CheckCircle,
  Zap,
  Target,
  Users
} from 'lucide-react';

const HomePage = () => {
  const { t } = useLanguage();

  const features = [
    { 
      icon: Zap, 
      title: t('features.experience.title'), 
      desc: t('features.experience.desc') 
    },
    { 
      icon: Target, 
      title: t('features.services.title'), 
      desc: t('features.services.desc') 
    },
    { 
      icon: Users, 
      title: t('features.professionalism.title'), 
      desc: t('features.professionalism.desc') 
    },
  ];

  const services = [
    { icon: Scale, key: 'courts' },
    { icon: FileText, key: 'civil' },
    { icon: Home, key: 'housing' },
    { icon: Briefcase, key: 'business' },
    { icon: Shield, key: 'criminal' },
    { icon: Globe, key: 'immigration' },
    { icon: Building2, key: 'other' },
  ];

  const stats = [
    { value: '20+', label: t('about.experience') },
    { value: '1000+', label: t('about.clients') },
    { value: '2000+', label: t('about.cases') },
    { value: '4', label: t('about.languages') },
  ];

  const trends = [
    t('trends.item1'),
    t('trends.item2'),
    t('trends.item3')
  ];

  return (
    <div className="min-h-screen" data-testid="home-page">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center"
        data-testid="hero-section"
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1756903585336-8b0ffb270e6d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzB8MHwxfHNlYXJjaHwxfHxwcmFndWUlMjBhcmNoaXRlY3R1cmUlMjBoaXN0b3JpYyUyMGJ1aWxkaW5nfGVufDB8fHx8MTc3MDAyMDExMXww&ixlib=rb-4.1.0&q=85')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/80 to-[#0F172A]/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-3xl">
            <p className="text-[#C5A059] text-sm uppercase tracking-widest font-semibold mb-4 animate-fade-in-up">
              Advokátní kancelář v Praze
            </p>
            <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl font-bold text-white leading-tight mb-6 animate-fade-in-up animation-delay-200">
              {t('hero.title')}
              <span className="text-[#C5A059]"> {t('hero.titleHighlight')}</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-10 max-w-2xl animate-fade-in-up animation-delay-400">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-600">
              <Link to="/booking">
                <Button 
                  className="bg-[#C5A059] text-white hover:bg-[#D4AF37] rounded-sm px-8 py-6 text-sm uppercase tracking-widest font-semibold shadow-lg"
                  data-testid="hero-cta-btn"
                >
                  {t('hero.cta')}
                </Button>
              </Link>
              <Link to="/services">
                <Button 
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0F172A] rounded-sm px-8 py-6 text-sm uppercase tracking-widest font-semibold"
                  data-testid="hero-services-btn"
                >
                  {t('hero.secondary')}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white border-b border-black/5" data-testid="features-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index} 
                  className="flex items-start gap-4 p-6"
                  data-testid={`feature-${index}`}
                >
                  <div className="w-12 h-12 bg-[#C5A059]/10 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-[#C5A059]" />
                  </div>
                  <div>
                    <h3 className="font-['Playfair_Display'] text-lg font-semibold text-[#0F172A] mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-32 bg-[#FDFBF7]" data-testid="services-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-semibold text-[#0F172A] mb-6">
              {t('services.title')}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.key}
                  to="/services"
                  className="bg-white p-8 border border-black/5 hover:border-[#C5A059]/30 transition-all duration-500 group relative overflow-hidden hover-lift"
                  data-testid={`service-card-${service.key}`}
                >
                  <div className="w-14 h-14 bg-[#FDFBF7] flex items-center justify-center mb-6 group-hover:bg-[#C5A059]/10 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-[#C5A059]" />
                  </div>
                  <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#0F172A] mb-3">
                    {t(`services.${service.key}.title`)}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {t(`services.${service.key}.desc`)}
                  </p>
                  <span className="inline-flex items-center text-[#C5A059] text-sm font-semibold group-hover:gap-2 transition-all duration-300">
                    <span>{t('blog.readMore')}</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                  
                  {/* Gold accent on hover */}
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C5A059] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20 md:py-32 bg-white" data-testid="about-preview-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1505624198937-c704aff72608?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBvZmZpY2UlMjBtZWV0aW5nJTIwcm9vbXxlbnwwfHx8fDE3NzAwMjAxNDR8MA&ixlib=rb-4.1.0&q=85"
                alt="Office"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-8 -right-8 bg-[#C5A059] text-white p-8 hidden md:block">
                <p className="font-['Playfair_Display'] text-4xl font-bold">20+</p>
                <p className="text-sm uppercase tracking-wider mt-1">{t('about.experience')}</p>
              </div>
            </div>

            <div>
              <p className="text-[#C5A059] text-sm uppercase tracking-widest font-semibold mb-4">
                {t('nav.about')}
              </p>
              <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-semibold text-[#0F172A] mb-6">
                {t('about.title')}
              </h2>
              <p className="text-[#0F172A] text-xl font-medium mb-4">
                {t('about.subtitle')}
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t('about.text1')}
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                {t('about.text2')}
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#C5A059]" />
                  <span className="text-[#0F172A] font-medium">{t('footer.chamber')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#C5A059]" />
                  <span className="text-[#0F172A] font-medium">Член Української палати адвокатів</span>
                </div>
              </div>

              <Link to="/about">
                <Button 
                  className="bg-[#0F172A] text-white hover:bg-[#1E293B] rounded-sm px-8 py-6 text-sm uppercase tracking-widest font-semibold"
                  data-testid="about-btn"
                >
                  {t('blog.readMore')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#0F172A] py-16" data-testid="stats-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center"
                data-testid={`stat-${index}`}
              >
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

      {/* Trends Section */}
      <section className="py-20 md:py-32 bg-[#FDFBF7]" data-testid="trends-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#C5A059] text-sm uppercase tracking-widest font-semibold mb-4">
              {t('trends.subtitle')}
            </p>
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-semibold text-[#0F172A]">
              {t('trends.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trends.map((trend, index) => (
              <div 
                key={index}
                className="bg-white p-8 border-l-2 border-[#C5A059]"
                data-testid={`trend-${index}`}
              >
                <div className="w-12 h-12 bg-[#C5A059]/10 flex items-center justify-center mb-4">
                  <span className="font-['Playfair_Display'] text-xl font-bold text-[#C5A059]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <p className="text-[#0F172A] leading-relaxed">
                  {trend}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-20 md:py-32 bg-[#0F172A] relative overflow-hidden"
        data-testid="cta-section"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#C5A059] rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C5A059] rounded-full filter blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Award className="w-16 h-16 text-[#C5A059] mx-auto mb-8" />
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-semibold text-white mb-6">
            {t('booking.title')}
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            {t('booking.subtitle')}
          </p>
          <Link to="/booking">
            <Button 
              className="bg-[#C5A059] text-white hover:bg-[#D4AF37] rounded-sm px-10 py-7 text-sm uppercase tracking-widest font-semibold shadow-lg"
              data-testid="cta-booking-btn"
            >
              {t('hero.cta')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
