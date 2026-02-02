import { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  cs: {
    nav: {
      home: 'Úvod',
      about: 'O nás',
      services: 'Služby',
      team: 'Tým',
      blog: 'Blog',
      contact: 'Kontakt',
      booking: 'Konzultace'
    },
    hero: {
      title: 'Kušnarenková',
      titleHighlight: '& partneři',
      subtitle: 'Advokátní kancelář v Praze s více než 20letou zkušeností v oblasti obchodního, imigračního a občanského práva.',
      cta: 'Objednat konzultaci',
      secondary: 'Naše služby'
    },
    services: {
      title: 'Naše služby',
      subtitle: 'Poskytujeme komplexní právní služby pro jednotlivce i firmy',
      corporate: {
        title: 'Obchodní právo',
        desc: 'Zakládání společností, fúze a akvizice, smluvní právo, obchodní spory.'
      },
      immigration: {
        title: 'Imigrační právo',
        desc: 'Pracovní povolení, trvalý pobyt, občanství, zastupování před cizineckou policií.'
      },
      family: {
        title: 'Rodinné právo',
        desc: 'Rozvody, výživné, péče o děti, majetkové vypořádání.'
      },
      criminal: {
        title: 'Trestní právo',
        desc: 'Obhajoba v trestních řízeních, zastupování poškozených.'
      },
      civil: {
        title: 'Občanské právo',
        desc: 'Nemovitosti, dědictví, náhrada škody, smluvní vztahy.'
      },
      labor: {
        title: 'Pracovní právo',
        desc: 'Pracovní smlouvy, ukončení pracovního poměru, pracovní spory.'
      }
    },
    about: {
      title: 'O naší kanceláři',
      subtitle: 'Profesionalita. Důvěra. Výsledky.',
      text1: 'Advokátní kancelář Kušnarenková & partneři byla založena v roce 2003 v Praze. Od té doby jsme úspěšně zastupovali stovky klientů z celého světa.',
      text2: 'Naším cílem je poskytovat právní služby nejvyšší kvality s důrazem na individuální přístup ke každému klientovi.',
      experience: 'Let zkušeností',
      clients: 'Spokojených klientů',
      cases: 'Vyřešených případů',
      languages: 'Jazyků'
    },
    team: {
      title: 'Náš tým',
      subtitle: 'Zkušení právníci připraveni vám pomoci',
      member1: {
        name: 'JUDr. Anna Kušnarenková',
        role: 'Zakladatelka a vedoucí partner',
        bio: 'Specializace na obchodní a imigrační právo. Více než 25 let praxe.'
      },
      member2: {
        name: 'Mgr. Pavel Novák',
        role: 'Partner',
        bio: 'Expert na firemní právo a fúze & akvizice.'
      },
      member3: {
        name: 'Mgr. Elena Sokolova',
        role: 'Asociovaný partner',
        bio: 'Specializace na občanské a rodinné právo.'
      },
      member4: {
        name: 'JUDr. Martin Černý',
        role: 'Advokát',
        bio: 'Expert na trestní právo a pracovní spory.'
      }
    },
    contact: {
      title: 'Kontakt',
      subtitle: 'Jsme tu pro vás',
      address: 'Adresa',
      addressText: 'Václavské náměstí 1, 110 00 Praha 1',
      phone: 'Telefon',
      email: 'E-mail',
      hours: 'Úřední hodiny',
      hoursText: 'Po-Pá: 9:00 - 18:00',
      form: {
        name: 'Jméno',
        email: 'E-mail',
        phone: 'Telefon',
        subject: 'Předmět',
        message: 'Zpráva',
        send: 'Odeslat zprávu'
      }
    },
    booking: {
      title: 'Objednat konzultaci',
      subtitle: 'Vyberte si vhodný termín',
      step1: 'Osobní údaje',
      step2: 'Služba',
      step3: 'Termín',
      step4: 'Potvrzení',
      name: 'Jméno a příjmení',
      email: 'E-mail',
      phone: 'Telefon',
      service: 'Vyberte službu',
      date: 'Vyberte datum',
      time: 'Vyberte čas',
      message: 'Popis vašeho případu (volitelné)',
      submit: 'Potvrdit rezervaci',
      success: 'Vaše rezervace byla úspěšně odeslána. Budeme vás kontaktovat.',
      next: 'Další',
      back: 'Zpět'
    },
    blog: {
      title: 'Blog',
      subtitle: 'Právní novinky a články',
      readMore: 'Číst více',
      noArticles: 'Zatím nejsou žádné články.'
    },
    footer: {
      rights: 'Všechna práva vyhrazena.',
      privacy: 'Ochrana soukromí',
      terms: 'Obchodní podmínky'
    }
  },
  ru: {
    nav: {
      home: 'Главная',
      about: 'О нас',
      services: 'Услуги',
      team: 'Команда',
      blog: 'Блог',
      contact: 'Контакты',
      booking: 'Консультация'
    },
    hero: {
      title: 'Кушнаренко',
      titleHighlight: '& партнёры',
      subtitle: 'Адвокатская контора в Праге с более чем 20-летним опытом в области корпоративного, иммиграционного и гражданского права.',
      cta: 'Записаться на консультацию',
      secondary: 'Наши услуги'
    },
    services: {
      title: 'Наши услуги',
      subtitle: 'Комплексные юридические услуги для физических и юридических лиц',
      corporate: {
        title: 'Корпоративное право',
        desc: 'Регистрация компаний, слияния и поглощения, договорное право, коммерческие споры.'
      },
      immigration: {
        title: 'Иммиграционное право',
        desc: 'Разрешения на работу, ПМЖ, гражданство, представительство в полиции по делам иностранцев.'
      },
      family: {
        title: 'Семейное право',
        desc: 'Разводы, алименты, опека над детьми, раздел имущества.'
      },
      criminal: {
        title: 'Уголовное право',
        desc: 'Защита в уголовных делах, представление интересов потерпевших.'
      },
      civil: {
        title: 'Гражданское право',
        desc: 'Недвижимость, наследство, возмещение ущерба, договорные отношения.'
      },
      labor: {
        title: 'Трудовое право',
        desc: 'Трудовые договоры, увольнения, трудовые споры.'
      }
    },
    about: {
      title: 'О нашей фирме',
      subtitle: 'Профессионализм. Доверие. Результаты.',
      text1: 'Адвокатская контора «Кушнаренко и партнёры» была основана в 2003 году в Праге. С тех пор мы успешно представляли сотни клиентов со всего мира.',
      text2: 'Наша цель — предоставлять юридические услуги высочайшего качества с индивидуальным подходом к каждому клиенту.',
      experience: 'Лет опыта',
      clients: 'Довольных клиентов',
      cases: 'Решённых дел',
      languages: 'Языков'
    },
    team: {
      title: 'Наша команда',
      subtitle: 'Опытные юристы готовы вам помочь',
      member1: {
        name: 'JUDr. Анна Кушнаренко',
        role: 'Основатель и управляющий партнёр',
        bio: 'Специализация: корпоративное и иммиграционное право. Более 25 лет практики.'
      },
      member2: {
        name: 'Mgr. Павел Новак',
        role: 'Партнёр',
        bio: 'Эксперт по корпоративному праву и M&A.'
      },
      member3: {
        name: 'Mgr. Елена Соколова',
        role: 'Ассоциированный партнёр',
        bio: 'Специализация: гражданское и семейное право.'
      },
      member4: {
        name: 'JUDr. Мартин Черны',
        role: 'Адвокат',
        bio: 'Эксперт по уголовному праву и трудовым спорам.'
      }
    },
    contact: {
      title: 'Контакты',
      subtitle: 'Мы здесь для вас',
      address: 'Адрес',
      addressText: 'Вацлавская площадь 1, 110 00 Прага 1',
      phone: 'Телефон',
      email: 'Эл. почта',
      hours: 'Часы работы',
      hoursText: 'Пн-Пт: 9:00 - 18:00',
      form: {
        name: 'Имя',
        email: 'Эл. почта',
        phone: 'Телефон',
        subject: 'Тема',
        message: 'Сообщение',
        send: 'Отправить сообщение'
      }
    },
    booking: {
      title: 'Записаться на консультацию',
      subtitle: 'Выберите удобное время',
      step1: 'Личные данные',
      step2: 'Услуга',
      step3: 'Дата и время',
      step4: 'Подтверждение',
      name: 'Имя и фамилия',
      email: 'Эл. почта',
      phone: 'Телефон',
      service: 'Выберите услугу',
      date: 'Выберите дату',
      time: 'Выберите время',
      message: 'Описание вашего дела (необязательно)',
      submit: 'Подтвердить запись',
      success: 'Ваша заявка успешно отправлена. Мы свяжемся с вами.',
      next: 'Далее',
      back: 'Назад'
    },
    blog: {
      title: 'Блог',
      subtitle: 'Юридические новости и статьи',
      readMore: 'Читать далее',
      noArticles: 'Статей пока нет.'
    },
    footer: {
      rights: 'Все права защищены.',
      privacy: 'Политика конфиденциальности',
      terms: 'Условия использования'
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      team: 'Team',
      blog: 'Blog',
      contact: 'Contact',
      booking: 'Consultation'
    },
    hero: {
      title: 'Kushnarenko',
      titleHighlight: '& Partners',
      subtitle: 'A law firm in Prague with over 20 years of experience in corporate, immigration, and civil law.',
      cta: 'Book a Consultation',
      secondary: 'Our Services'
    },
    services: {
      title: 'Our Services',
      subtitle: 'Comprehensive legal services for individuals and businesses',
      corporate: {
        title: 'Corporate Law',
        desc: 'Company formation, mergers & acquisitions, contract law, commercial disputes.'
      },
      immigration: {
        title: 'Immigration Law',
        desc: 'Work permits, permanent residence, citizenship, representation before foreign police.'
      },
      family: {
        title: 'Family Law',
        desc: 'Divorces, alimony, child custody, property settlement.'
      },
      criminal: {
        title: 'Criminal Law',
        desc: 'Criminal defense, victim representation.'
      },
      civil: {
        title: 'Civil Law',
        desc: 'Real estate, inheritance, damage compensation, contractual relationships.'
      },
      labor: {
        title: 'Labor Law',
        desc: 'Employment contracts, terminations, labor disputes.'
      }
    },
    about: {
      title: 'About Our Firm',
      subtitle: 'Professionalism. Trust. Results.',
      text1: 'Kushnarenko & Partners law firm was founded in 2003 in Prague. Since then, we have successfully represented hundreds of clients from around the world.',
      text2: 'Our goal is to provide the highest quality legal services with an individual approach to each client.',
      experience: 'Years of Experience',
      clients: 'Satisfied Clients',
      cases: 'Resolved Cases',
      languages: 'Languages'
    },
    team: {
      title: 'Our Team',
      subtitle: 'Experienced lawyers ready to help you',
      member1: {
        name: 'JUDr. Anna Kushnarenko',
        role: 'Founder & Managing Partner',
        bio: 'Specializing in corporate and immigration law. Over 25 years of practice.'
      },
      member2: {
        name: 'Mgr. Pavel Novák',
        role: 'Partner',
        bio: 'Expert in corporate law and M&A.'
      },
      member3: {
        name: 'Mgr. Elena Sokolova',
        role: 'Associate Partner',
        bio: 'Specializing in civil and family law.'
      },
      member4: {
        name: 'JUDr. Martin Černý',
        role: 'Attorney',
        bio: 'Expert in criminal law and labor disputes.'
      }
    },
    contact: {
      title: 'Contact',
      subtitle: 'We are here for you',
      address: 'Address',
      addressText: 'Wenceslas Square 1, 110 00 Prague 1',
      phone: 'Phone',
      email: 'Email',
      hours: 'Office Hours',
      hoursText: 'Mon-Fri: 9:00 AM - 6:00 PM',
      form: {
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        subject: 'Subject',
        message: 'Message',
        send: 'Send Message'
      }
    },
    booking: {
      title: 'Book a Consultation',
      subtitle: 'Choose a convenient time',
      step1: 'Personal Info',
      step2: 'Service',
      step3: 'Date & Time',
      step4: 'Confirmation',
      name: 'Full Name',
      email: 'Email',
      phone: 'Phone',
      service: 'Select Service',
      date: 'Select Date',
      time: 'Select Time',
      message: 'Describe your case (optional)',
      submit: 'Confirm Booking',
      success: 'Your booking has been successfully submitted. We will contact you soon.',
      next: 'Next',
      back: 'Back'
    },
    blog: {
      title: 'Blog',
      subtitle: 'Legal news and articles',
      readMore: 'Read More',
      noArticles: 'No articles yet.'
    },
    footer: {
      rights: 'All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service'
    }
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('language') || 'cs';
    }
    return 'cs';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
