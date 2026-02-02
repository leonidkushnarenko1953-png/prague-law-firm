import { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  cs: {
    nav: {
      home: 'Úvod',
      about: 'O nás',
      services: 'Služby',
      team: 'Tým',
      blog: 'Publikace',
      contact: 'Kontakt',
      booking: 'Konzultace'
    },
    hero: {
      title: 'Kušnarenko',
      titleHighlight: '& partneři',
      subtitle: 'Váš osobní advokát v Praze. Člen České a Ukrajinské advokátní komory s více než 20letou praxí v oblasti obchodního, imigračního a trestního práva.',
      cta: 'Objednat konzultaci',
      secondary: 'Naše služby'
    },
    features: {
      experience: {
        title: 'Velké zkušenosti',
        desc: 'Maximálně využíváme nabyté advokátní zkušenosti. Hlavní cíl - úspěch, vítězství v případu.'
      },
      services: {
        title: 'Široký rozsah služeb',
        desc: 'Nabízíme takový objem služeb, jehož součásti jsou ověřeny v praxi.'
      },
      professionalism: {
        title: 'Vysoká profesionalita',
        desc: 'Snažíme se maximálně přilákat k řešení úkolů experty vysoké úrovně.'
      }
    },
    services: {
      title: 'Poskytujeme služby',
      subtitle: 'Komplexní právní služby pro jednotlivce i firmy',
      courts: {
        title: 'České soudnictví',
        desc: 'Zastupování v soudních řízeních, odvolání, kasace.'
      },
      civil: {
        title: 'Občanské právo',
        desc: 'Občanskoprávní spory, náhrada škody, smluvní vztahy.'
      },
      housing: {
        title: 'Nemovitosti a bytové právo',
        desc: 'Koupě a prodej nemovitostí, nájemní vztahy, SVJ.'
      },
      business: {
        title: 'Obchodní advokát',
        desc: 'Zakládání společností, fúze, akvizice, obchodní spory.'
      },
      criminal: {
        title: 'Trestní advokát',
        desc: 'Obhajoba v trestních řízeních, zastupování na policii.'
      },
      immigration: {
        title: 'Imigrační právo',
        desc: 'Víza, pobytová povolení, odvolání proti zamítnutí, občanství.'
      },
      other: {
        title: 'Další oblasti práva',
        desc: 'Odblokování bankovních účtů, rodinné právo a další.'
      }
    },
    about: {
      title: 'Vítáme vás',
      subtitle: 'Děkujeme za zájem o naši práci!',
      text1: 'Advokát - Magistr práva Leonid Kušnarenko – Mgr. Leonid Kushnarenko (Kušnarenko): Člen České a Ukrajinské advokátní komory.',
      text2: 'Úspěšně hájíme práva a svobody právnických i fyzických osob. Kolosální a často unikátní zkušenosti, jakož i vysoká kvalifikace našich pracovníků nám umožňují dosahovat výsledků, které maximálně odpovídají zájmům klienta.',
      experience: 'Let zkušeností',
      clients: 'Spokojených klientů',
      cases: 'Vyřešených případů',
      languages: 'Jazyků'
    },
    trends: {
      title: 'Hlavní směry činnosti',
      subtitle: 'Tendence posledních let',
      item1: 'Účast v soudech (složité trestní případy), zastupování klientů na policii',
      item2: 'Odvolací činnost při řešení problémů s odmítnutím, prodloužením pobytu a občanství',
      item3: 'Řešení problémů v bankách, odblokování bankovních účtů'
    },
    team: {
      title: 'Náš tým',
      subtitle: 'Zkušení právníci připraveni vám pomoci',
      member1: {
        name: 'Mgr. Leonid Kušnarenko',
        role: 'Zakladatel a vedoucí partner',
        bio: 'Člen České a Ukrajinské advokátní komory. Více než 20 let praxe.'
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
        send: 'Odeslat zprávu',
        need: 'Potřebuji'
      },
      needs: {
        court: 'Účast v soudním jednání',
        legal: 'Právní pomoc v případu',
        consultation: 'Advokátská konzultace',
        pretrial: 'Mimosoudní řízení'
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
      title: 'Publikace',
      subtitle: 'Právní novinky a články',
      readMore: 'Číst více',
      noArticles: 'Zatím nejsou žádné články.',
      archive: 'Archiv publikací'
    },
    footer: {
      rights: 'Všechna práva vyhrazena.',
      privacy: 'Ochrana soukromí',
      terms: 'Obchodní podmínky',
      chamber: 'Člen České advokátní komory'
    }
  },
  ru: {
    nav: {
      home: 'Главная',
      about: 'О нас',
      services: 'Услуги',
      team: 'Команда',
      blog: 'Публикации',
      contact: 'Контакты',
      booking: 'Консультация'
    },
    hero: {
      title: 'Кушнаренко',
      titleHighlight: '& партнёры',
      subtitle: 'Ваш личный адвокат в Праге. Член Чешской и Украинской палаты адвокатов с более чем 20-летним опытом в области корпоративного, иммиграционного и уголовного права.',
      cta: 'Записаться на консультацию',
      secondary: 'Наши услуги'
    },
    features: {
      experience: {
        title: 'Большой опыт работы',
        desc: 'Мы максимально используем накопленный адвокатский опыт. Главная цель - успех, выигрыш дела.'
      },
      services: {
        title: 'Широкий спектр услуг',
        desc: 'Мы предлагаем такой объем услуг, составляющие компоненты которых апробированы на практике.'
      },
      professionalism: {
        title: 'Высокий профессионализм',
        desc: 'Мы стремимся максимально привлекать для решения поставленных задач экспертов высокого уровня.'
      }
    },
    services: {
      title: 'Мы предоставляем услуги',
      subtitle: 'Комплексные юридические услуги для физических и юридических лиц',
      courts: {
        title: 'Чешское судопроизводство',
        desc: 'Представительство в судебных процессах, апелляции, кассации.'
      },
      civil: {
        title: 'Гражданские дела',
        desc: 'Гражданско-правовые споры, возмещение ущерба, договорные отношения.'
      },
      housing: {
        title: 'Недвижимость и жилищное право',
        desc: 'Купля-продажа недвижимости, арендные отношения, ТСЖ.'
      },
      business: {
        title: 'Бизнес адвокат',
        desc: 'Регистрация компаний, слияния, поглощения, коммерческие споры.'
      },
      criminal: {
        title: 'Уголовный адвокат',
        desc: 'Защита в уголовных делах, представительство в полиции.'
      },
      immigration: {
        title: 'Иммиграционное право',
        desc: 'Визы, ВНЖ, обжалование отказов, гражданство.'
      },
      other: {
        title: 'Другие отрасли права',
        desc: 'Разблокировка банковских счетов, семейное право и другое.'
      }
    },
    about: {
      title: 'Мы рады видеть вас',
      subtitle: 'Благодарим за интерес к нашей работе!',
      text1: 'Адвокат - Магистр права Леонид Кушнаренко – Mgr. Leonid Kushnarenko (Kušnarenko): Член Чешской и Украинской палаты адвокатов.',
      text2: 'Мы успешно защищаем права и свободы юридических и физических лиц. Колоссальный и зачастую уникальный опыт, а также высокая квалификация наших сотрудников позволяют нам достигать результата, в максимальной степени отвечающего интересам клиента.',
      experience: 'Лет опыта',
      clients: 'Довольных клиентов',
      cases: 'Решённых дел',
      languages: 'Языков'
    },
    trends: {
      title: 'Основная направленность деятельности',
      subtitle: 'Тенденции последних лет',
      item1: 'Участие в судах (сложные уголовные дела), представление интересов клиентов в полиции',
      item2: 'Апелляционная деятельность по решению проблем с отказами в получении, продлении ВНЖ и гражданства',
      item3: 'Разрешение проблем в банках, разблокирование банковских счетов'
    },
    team: {
      title: 'Наша команда',
      subtitle: 'Опытные юристы готовы вам помочь',
      member1: {
        name: 'Mgr. Леонид Кушнаренко',
        role: 'Основатель и управляющий партнёр',
        bio: 'Член Чешской и Украинской палаты адвокатов. Более 20 лет практики.'
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
        send: 'Отправить сообщение',
        need: 'Мне необходимо'
      },
      needs: {
        court: 'Участие в судебном заседании',
        legal: 'Правовая помощь в деле',
        consultation: 'Адвокатская консультация',
        pretrial: 'Досудебное разбирательство'
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
      title: 'Публикации',
      subtitle: 'Юридические новости и статьи',
      readMore: 'Читать далее',
      noArticles: 'Статей пока нет.',
      archive: 'Архив публикаций'
    },
    footer: {
      rights: 'Все права защищены.',
      privacy: 'Политика конфиденциальности',
      terms: 'Условия использования',
      chamber: 'Член Чешской палаты адвокатов'
    }
  },
  uk: {
    nav: {
      home: 'Головна',
      about: 'Про нас',
      services: 'Послуги',
      team: 'Команда',
      blog: 'Публікації',
      contact: 'Контакти',
      booking: 'Консультація'
    },
    hero: {
      title: 'Кушнаренко',
      titleHighlight: '& партнери',
      subtitle: 'Ваш особистий адвокат у Празі. Член Чеської та Української палати адвокатів з понад 20-річним досвідом у галузі корпоративного, імміграційного та кримінального права.',
      cta: 'Записатися на консультацію',
      secondary: 'Наші послуги'
    },
    features: {
      experience: {
        title: 'Великий досвід роботи',
        desc: 'Ми максимально використовуємо накопичений адвокатський досвід. Головна мета - успіх, виграш справи.'
      },
      services: {
        title: 'Широкий спектр послуг',
        desc: 'Ми пропонуємо такий обсяг послуг, складові компоненти яких апробовані на практиці.'
      },
      professionalism: {
        title: 'Високий професіоналізм',
        desc: 'Ми прагнемо максимально залучати для вирішення поставлених завдань експертів високого рівня.'
      }
    },
    services: {
      title: 'Ми надаємо послуги',
      subtitle: 'Комплексні юридичні послуги для фізичних та юридичних осіб',
      courts: {
        title: 'Чеське судочинство',
        desc: 'Представництво в судових процесах, апеляції, касації.'
      },
      civil: {
        title: 'Цивільні справи',
        desc: 'Цивільно-правові спори, відшкодування збитків, договірні відносини.'
      },
      housing: {
        title: 'Нерухомість та житлове право',
        desc: 'Купівля-продаж нерухомості, орендні відносини, ОСББ.'
      },
      business: {
        title: 'Бізнес адвокат',
        desc: 'Реєстрація компаній, злиття, поглинання, комерційні спори.'
      },
      criminal: {
        title: 'Кримінальний адвокат',
        desc: 'Захист у кримінальних справах, представництво в поліції.'
      },
      immigration: {
        title: 'Імміграційне право',
        desc: 'Візи, ПМП, оскарження відмов, громадянство.'
      },
      other: {
        title: 'Інші галузі права',
        desc: 'Розблокування банківських рахунків, сімейне право та інше.'
      }
    },
    about: {
      title: 'Ми раді вас бачити',
      subtitle: 'Дякуємо за інтерес до нашої роботи!',
      text1: 'Адвокат - Магістр права Леонід Кушнаренко – Mgr. Leonid Kushnarenko (Kušnarenko): Член Чеської та Української палати адвокатів.',
      text2: 'Ми успішно захищаємо права і свободи юридичних та фізичних осіб. Колосальний і часто унікальний досвід, а також висока кваліфікація наших співробітників дозволяють нам досягати результату, який максимально відповідає інтересам клієнта.',
      experience: 'Років досвіду',
      clients: 'Задоволених клієнтів',
      cases: 'Вирішених справ',
      languages: 'Мов'
    },
    trends: {
      title: 'Основна спрямованість діяльності',
      subtitle: 'Тенденції останніх років',
      item1: 'Участь у судах (складні кримінальні справи), представлення інтересів клієнтів у поліції',
      item2: 'Апеляційна діяльність щодо вирішення проблем з відмовами в отриманні, продовженні ПМП та громадянства',
      item3: 'Вирішення проблем у банках, розблокування банківських рахунків'
    },
    team: {
      title: 'Наша команда',
      subtitle: 'Досвідчені юристи готові вам допомогти',
      member1: {
        name: 'Mgr. Леонід Кушнаренко',
        role: 'Засновник та керуючий партнер',
        bio: 'Член Чеської та Української палати адвокатів. Понад 20 років практики.'
      },
      member2: {
        name: 'Mgr. Павел Новак',
        role: 'Партнер',
        bio: 'Експерт з корпоративного права та M&A.'
      },
      member3: {
        name: 'Mgr. Олена Соколова',
        role: 'Асоційований партнер',
        bio: 'Спеціалізація: цивільне та сімейне право.'
      },
      member4: {
        name: 'JUDr. Мартін Черни',
        role: 'Адвокат',
        bio: 'Експерт з кримінального права та трудових спорів.'
      }
    },
    contact: {
      title: 'Контакти',
      subtitle: 'Ми тут для вас',
      address: 'Адреса',
      addressText: 'Вацлавська площа 1, 110 00 Прага 1',
      phone: 'Телефон',
      email: 'Ел. пошта',
      hours: 'Години роботи',
      hoursText: 'Пн-Пт: 9:00 - 18:00',
      form: {
        name: "Ім'я",
        email: 'Ел. пошта',
        phone: 'Телефон',
        subject: 'Тема',
        message: 'Повідомлення',
        send: 'Надіслати повідомлення',
        need: 'Мені потрібно'
      },
      needs: {
        court: 'Участь у судовому засіданні',
        legal: 'Правова допомога у справі',
        consultation: 'Адвокатська консультація',
        pretrial: 'Досудове провадження'
      }
    },
    booking: {
      title: 'Записатися на консультацію',
      subtitle: 'Оберіть зручний час',
      step1: 'Особисті дані',
      step2: 'Послуга',
      step3: 'Дата та час',
      step4: 'Підтвердження',
      name: "Ім'я та прізвище",
      email: 'Ел. пошта',
      phone: 'Телефон',
      service: 'Оберіть послугу',
      date: 'Оберіть дату',
      time: 'Оберіть час',
      message: 'Опис вашої справи (необов\'язково)',
      submit: 'Підтвердити запис',
      success: 'Вашу заявку успішно надіслано. Ми зв\'яжемося з вами.',
      next: 'Далі',
      back: 'Назад'
    },
    blog: {
      title: 'Публікації',
      subtitle: 'Юридичні новини та статті',
      readMore: 'Читати далі',
      noArticles: 'Статей поки немає.',
      archive: 'Архів публікацій'
    },
    footer: {
      rights: 'Усі права захищені.',
      privacy: 'Політика конфіденційності',
      terms: 'Умови використання',
      chamber: 'Член Чеської палати адвокатів'
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      team: 'Team',
      blog: 'Publications',
      contact: 'Contact',
      booking: 'Consultation'
    },
    hero: {
      title: 'Kushnarenko',
      titleHighlight: '& Partners',
      subtitle: 'Your personal lawyer in Prague. Member of Czech and Ukrainian Bar Associations with over 20 years of experience in corporate, immigration, and criminal law.',
      cta: 'Book a Consultation',
      secondary: 'Our Services'
    },
    features: {
      experience: {
        title: 'Extensive Experience',
        desc: 'We maximize the use of accumulated legal experience. Main goal - success, winning the case.'
      },
      services: {
        title: 'Wide Range of Services',
        desc: 'We offer a volume of services whose components have been tested in practice.'
      },
      professionalism: {
        title: 'High Professionalism',
        desc: 'We strive to attract high-level experts to solve the tasks at hand.'
      }
    },
    services: {
      title: 'We Provide Services',
      subtitle: 'Comprehensive legal services for individuals and businesses',
      courts: {
        title: 'Czech Court Proceedings',
        desc: 'Representation in court proceedings, appeals, cassations.'
      },
      civil: {
        title: 'Civil Cases',
        desc: 'Civil disputes, compensation for damages, contractual relations.'
      },
      housing: {
        title: 'Real Estate & Housing Law',
        desc: 'Purchase and sale of real estate, rental relations, HOA.'
      },
      business: {
        title: 'Business Lawyer',
        desc: 'Company registration, mergers, acquisitions, commercial disputes.'
      },
      criminal: {
        title: 'Criminal Lawyer',
        desc: 'Defense in criminal cases, representation with police.'
      },
      immigration: {
        title: 'Immigration Law',
        desc: 'Visas, residence permits, appeal rejections, citizenship.'
      },
      other: {
        title: 'Other Areas of Law',
        desc: 'Bank account unblocking, family law, and more.'
      }
    },
    about: {
      title: 'Welcome',
      subtitle: 'Thank you for your interest in our work!',
      text1: 'Attorney - Master of Law Leonid Kushnarenko – Mgr. Leonid Kushnarenko (Kušnarenko): Member of Czech and Ukrainian Bar Associations.',
      text2: 'We successfully protect the rights and freedoms of legal entities and individuals. Our colossal and often unique experience, as well as the high qualifications of our staff, allow us to achieve results that best meet the interests of the client.',
      experience: 'Years of Experience',
      clients: 'Satisfied Clients',
      cases: 'Resolved Cases',
      languages: 'Languages'
    },
    trends: {
      title: 'Main Focus of Activity',
      subtitle: 'Trends in Recent Years',
      item1: 'Participation in courts (complex criminal cases), representing clients with police',
      item2: 'Appeal activities to resolve problems with refusals in obtaining, extending residence permits and citizenship',
      item3: 'Resolving problems in banks, unblocking bank accounts'
    },
    team: {
      title: 'Our Team',
      subtitle: 'Experienced lawyers ready to help you',
      member1: {
        name: 'Mgr. Leonid Kushnarenko',
        role: 'Founder & Managing Partner',
        bio: 'Member of Czech and Ukrainian Bar Associations. Over 20 years of practice.'
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
        send: 'Send Message',
        need: 'I need'
      },
      needs: {
        court: 'Participation in court hearing',
        legal: 'Legal assistance in case',
        consultation: 'Attorney consultation',
        pretrial: 'Pre-trial proceedings'
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
      title: 'Publications',
      subtitle: 'Legal news and articles',
      readMore: 'Read More',
      noArticles: 'No articles yet.',
      archive: 'Publications Archive'
    },
    footer: {
      rights: 'All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      chamber: 'Member of Czech Bar Association'
    }
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('language') || 'ru';
    }
    return 'ru';
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
