import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Mail, Phone, Linkedin } from 'lucide-react';

const TeamPage = () => {
  const { t } = useLanguage();

  const team = [
    {
      key: 'member1',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1000&fit=crop',
      email: 'kushnarenko@kushnarenko.cz',
      phone: '+420 123 456 781',
      specializations: ['Obchodní právo', 'Imigrační právo', 'M&A']
    },
    {
      key: 'member2',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&h=1000&fit=crop',
      email: 'novak@kushnarenko.cz',
      phone: '+420 123 456 782',
      specializations: ['Firemní právo', 'Fúze & akvizice', 'Due diligence']
    },
    {
      key: 'member3',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&h=1000&fit=crop',
      email: 'sokolova@kushnarenko.cz',
      phone: '+420 123 456 783',
      specializations: ['Občanské právo', 'Rodinné právo', 'Dědictví']
    },
    {
      key: 'member4',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop',
      email: 'cerny@kushnarenko.cz',
      phone: '+420 123 456 784',
      specializations: ['Trestní právo', 'Pracovní spory', 'Obhajoba']
    }
  ];

  return (
    <div className="min-h-screen pt-20" data-testid="team-page">
      {/* Hero */}
      <section className="py-20 md:py-32 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[#C5A059] text-sm uppercase tracking-widest font-semibold mb-4">
              {t('nav.team')}
            </p>
            <h1 className="font-['Playfair_Display'] text-4xl md:text-6xl font-bold text-[#0F172A] mb-6">
              {t('team.title')}
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              {t('team.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div 
                key={member.key}
                className="group"
                data-testid={`team-member-${index}`}
              >
                {/* Image */}
                <div className="relative overflow-hidden mb-6">
                  <img
                    src={member.image}
                    alt={t(`team.${member.key}.name`)}
                    className="w-full h-[400px] object-cover team-image"
                  />
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-[#0F172A]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
                    <a 
                      href={`mailto:${member.email}`}
                      className="w-12 h-12 bg-[#C5A059] flex items-center justify-center hover:bg-[#D4AF37] transition-colors"
                    >
                      <Mail className="w-5 h-5 text-white" />
                    </a>
                    <a 
                      href={`tel:${member.phone}`}
                      className="w-12 h-12 bg-[#C5A059] flex items-center justify-center hover:bg-[#D4AF37] transition-colors"
                    >
                      <Phone className="w-5 h-5 text-white" />
                    </a>
                  </div>
                </div>

                {/* Info */}
                <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#0F172A] mb-1">
                  {t(`team.${member.key}.name`)}
                </h3>
                <p className="text-[#C5A059] text-sm font-medium mb-3">
                  {t(`team.${member.key}.role`)}
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  {t(`team.${member.key}.bio`)}
                </p>

                {/* Specializations */}
                <div className="flex flex-wrap gap-2">
                  {member.specializations.map((spec, i) => (
                    <span 
                      key={i}
                      className="text-xs bg-[#FDFBF7] text-[#0F172A] px-3 py-1 border border-black/5"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-32 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#C5A059] text-sm uppercase tracking-widest font-semibold mb-4">
                Proč my
              </p>
              <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-semibold text-[#0F172A] mb-6">
                Zkušený tým na vaší straně
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Náš tým tvoří zkušení advokáti a právníci s mnohaletou praxí v různých oblastech práva. 
                Každý člen týmu přináší jedinečné znalosti a zkušenosti.
              </p>
              <ul className="space-y-4">
                {[
                  'Více než 100 let kombinovaných zkušeností',
                  'Absolventi předních právnických fakult',
                  'Mezinárodní praxe a jazykové znalosti',
                  'Pravidelné vzdělávání a certifikace'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#C5A059]" />
                    <span className="text-[#0F172A]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0F172A] p-8 text-center">
                <p className="font-['Playfair_Display'] text-4xl font-bold text-[#C5A059] mb-2">4</p>
                <p className="text-white text-sm">Advokáti</p>
              </div>
              <div className="bg-white p-8 text-center border border-black/5">
                <p className="font-['Playfair_Display'] text-4xl font-bold text-[#0F172A] mb-2">6</p>
                <p className="text-gray-600 text-sm">Oblastí práva</p>
              </div>
              <div className="bg-white p-8 text-center border border-black/5">
                <p className="font-['Playfair_Display'] text-4xl font-bold text-[#0F172A] mb-2">3</p>
                <p className="text-gray-600 text-sm">Jazyky</p>
              </div>
              <div className="bg-[#C5A059] p-8 text-center">
                <p className="font-['Playfair_Display'] text-4xl font-bold text-white mb-2">100+</p>
                <p className="text-white text-sm">Let zkušeností</p>
              </div>
            </div>
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
          <Link to="/booking">
            <Button 
              className="bg-[#C5A059] text-white hover:bg-[#D4AF37] rounded-sm px-8 py-6 text-sm uppercase tracking-widest font-semibold"
              data-testid="team-booking-btn"
            >
              {t('hero.cta')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;
