# PRD: Kushnarenko & Partners Law Firm Website

## Original Problem Statement
Сайт для адвокатской компании "Кушнаренко и партнеры" в Праге с:
- Страницами: Главная, О нас, Услуги, Команда, Контакты, Блог
- Форма онлайн-записи на консультацию с календарём
- 3 языка: чешский, русский, английский
- Интеграция с Google Maps

## Architecture
- **Frontend**: React 19 + Tailwind CSS + shadcn/ui
- **Backend**: FastAPI with MongoDB
- **Database**: MongoDB (collections: consultations, contact_messages, blog_posts)

## User Personas
1. **Business Clients** - Need corporate legal services
2. **Expats/Immigrants** - Need immigration law help
3. **Russian-speaking community** - Need services in Russian
4. **Local Czech clients** - Standard legal needs

## Core Requirements (Static)
- Professional law firm design ("Old Money Tech" aesthetic)
- Trilingual support (CS/RU/EN)
- Online consultation booking with calendar
- Contact form with Google Maps
- Blog with multilingual content
- Responsive design

## What's Been Implemented (June 2, 2025)
- [x] Full website with 7 pages (Home, About, Services, Team, Blog, Contact, Booking)
- [x] Trilingual language system with localStorage persistence
- [x] Multi-step booking form with calendar integration
- [x] Contact form with API submission
- [x] Blog with seeded sample posts
- [x] Google Maps embed
- [x] Professional design with Playfair Display + Manrope fonts
- [x] Mobile responsive navigation
- [x] Backend APIs: consultations, contacts, blog, available-slots

## API Endpoints
- `POST /api/consultations` - Create consultation booking
- `GET /api/consultations` - List all consultations
- `POST /api/contacts` - Submit contact form
- `GET /api/blog` - Get blog posts
- `POST /api/seed-blog` - Seed sample blog posts
- `GET /api/available-slots?date=YYYY-MM-DD` - Get available time slots

## Prioritized Backlog
### P0 (Next)
- Admin dashboard for managing consultations
- Email notifications for new bookings

### P1
- Full blog post page with content rendering
- SEO optimization (meta tags, sitemap)
- Cookie consent banner

### P2
- Newsletter subscription functionality
- Testimonials section
- Case studies

## Next Tasks
1. Add admin authentication
2. Create admin panel for consultation management
3. Implement email notifications (SendGrid integration)
4. Add full blog post detail page

## Update (June 2, 2025 - v2)
### Changes based on advokat-cz.info reference:
- [x] Added **Ukrainian language** (4 languages total: CS, RU, UK, EN)
- [x] Updated services to match reference:
  - Чешское судопроизводство
  - Гражданские дела
  - Недвижимость и жилищное право
  - Бизнес адвокат
  - Уголовный адвокат
  - Иммиграционное право
  - Другие отрасли права
- [x] Added Features section (Experience, Wide Range, Professionalism)
- [x] Added Trends section highlighting main focus areas
- [x] Updated hero text to include Czech & Ukrainian Bar membership
- [x] Default language changed to Russian

### Services Mapping (from advokat-cz.info):
| Reference | Our Implementation |
|-----------|-------------------|
| Чешское судопроизводство | courts |
| Адвокат по гражданским делам | civil |
| Недвижимость и жилищное право | housing |
| Бизнес адвокат | business |
| Уголовный адвокат | criminal |
| Адвокат по иммиграционному праву | immigration |
| Другие отрасли права | other |
