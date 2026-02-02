import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Calendar } from '../components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { CheckCircle, User, Briefcase, Calendar as CalendarIcon, Check } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { format } from 'date-fns';
import { cs, ru, enUS } from 'date-fns/locale';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const BookingPage = () => {
  const { t, language } = useLanguage();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    preferred_date: null,
    preferred_time: '',
    message: ''
  });

  const locales = { cs, ru, en: enUS };

  const services = [
    { value: 'courts', label: t('services.courts.title') },
    { value: 'civil', label: t('services.civil.title') },
    { value: 'housing', label: t('services.housing.title') },
    { value: 'business', label: t('services.business.title') },
    { value: 'criminal', label: t('services.criminal.title') },
    { value: 'immigration', label: t('services.immigration.title') },
    { value: 'other', label: t('services.other.title') }
  ];

  useEffect(() => {
    if (formData.preferred_date) {
      fetchAvailableSlots();
    }
  }, [formData.preferred_date]);

  const fetchAvailableSlots = async () => {
    if (!formData.preferred_date) return;
    
    try {
      const dateStr = format(formData.preferred_date, 'yyyy-MM-dd');
      const response = await axios.get(`${API}/available-slots?date=${dateStr}`);
      setAvailableSlots(response.data.available_slots);
    } catch (error) {
      console.error('Error fetching slots:', error);
      setAvailableSlots([
        "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
        "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
      ]);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await axios.post(`${API}/consultations`, {
        ...formData,
        preferred_date: format(formData.preferred_date, 'yyyy-MM-dd'),
        language
      });
      setSuccess(true);
      toast.success(t('booking.success'));
    } catch (error) {
      toast.error('Error creating booking');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.name && formData.email && formData.phone;
      case 2:
        return formData.service;
      case 3:
        return formData.preferred_date && formData.preferred_time;
      default:
        return true;
    }
  };

  const steps = [
    { num: 1, label: t('booking.step1'), icon: User },
    { num: 2, label: t('booking.step2'), icon: Briefcase },
    { num: 3, label: t('booking.step3'), icon: CalendarIcon },
    { num: 4, label: t('booking.step4'), icon: Check }
  ];

  if (success) {
    return (
      <div className="min-h-screen pt-20 bg-[#FDFBF7]" data-testid="booking-success">
        <div className="max-w-2xl mx-auto px-4 py-32 text-center">
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-8" />
          <h1 className="font-['Playfair_Display'] text-4xl font-bold text-[#0F172A] mb-4">
            {t('booking.success')}
          </h1>
          <p className="text-gray-600 mb-8">
            {language === 'cs' && 'Budeme vás kontaktovat co nejdříve.'}
            {language === 'ru' && 'Мы свяжемся с вами в ближайшее время.'}
            {language === 'en' && 'We will contact you as soon as possible.'}
          </p>
          <Button
            onClick={() => window.location.href = '/'}
            className="bg-[#0F172A] text-white hover:bg-[#1E293B] rounded-sm px-8 py-6 text-sm uppercase tracking-widest font-semibold"
          >
            {t('nav.home')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20" data-testid="booking-page">
      {/* Hero */}
      <section className="py-16 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[#C5A059] text-sm uppercase tracking-widest font-semibold mb-4">
              {t('nav.booking')}
            </p>
            <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
              {t('booking.title')}
            </h1>
            <p className="text-gray-600 text-lg">
              {t('booking.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Steps */}
          <div className="flex justify-between mb-12">
            {steps.map((s, index) => {
              const Icon = s.icon;
              const isActive = step === s.num;
              const isCompleted = step > s.num;

              return (
                <div key={s.num} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div 
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
                        isCompleted 
                          ? 'bg-green-500 text-white' 
                          : isActive 
                            ? 'bg-[#C5A059] text-white' 
                            : 'bg-gray-100 text-gray-400'
                      }`}
                      data-testid={`step-indicator-${s.num}`}
                    >
                      {isCompleted ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <span className={`mt-2 text-xs font-medium hidden sm:block ${
                      isActive ? 'text-[#0F172A]' : 'text-gray-400'
                    }`}>
                      {s.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 sm:w-24 h-0.5 mx-2 ${
                      step > s.num ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Form Steps */}
          <div className="bg-[#FDFBF7] p-8 md:p-12">
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <div className="space-y-6" data-testid="step-1-form">
                <h2 className="font-['Playfair_Display'] text-2xl font-semibold text-[#0F172A] mb-6">
                  {t('booking.step1')}
                </h2>
                
                <div>
                  <Label htmlFor="name" className="text-[#0F172A] font-medium">
                    {t('booking.name')} *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-2 bg-white border-gray-200 focus:border-[#0F172A] rounded-sm h-12"
                    data-testid="booking-name"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-[#0F172A] font-medium">
                    {t('booking.email')} *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-2 bg-white border-gray-200 focus:border-[#0F172A] rounded-sm h-12"
                    data-testid="booking-email"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-[#0F172A] font-medium">
                    {t('booking.phone')} *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="mt-2 bg-white border-gray-200 focus:border-[#0F172A] rounded-sm h-12"
                    data-testid="booking-phone"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Service Selection */}
            {step === 2 && (
              <div className="space-y-6" data-testid="step-2-form">
                <h2 className="font-['Playfair_Display'] text-2xl font-semibold text-[#0F172A] mb-6">
                  {t('booking.step2')}
                </h2>

                <div>
                  <Label className="text-[#0F172A] font-medium mb-4 block">
                    {t('booking.service')} *
                  </Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {services.map((service) => (
                      <button
                        key={service.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, service: service.value })}
                        className={`p-4 text-left border-2 transition-all duration-300 ${
                          formData.service === service.value
                            ? 'border-[#C5A059] bg-[#C5A059]/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        data-testid={`service-option-${service.value}`}
                      >
                        <span className={`font-medium ${
                          formData.service === service.value ? 'text-[#C5A059]' : 'text-[#0F172A]'
                        }`}>
                          {service.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Date & Time */}
            {step === 3 && (
              <div className="space-y-6" data-testid="step-3-form">
                <h2 className="font-['Playfair_Display'] text-2xl font-semibold text-[#0F172A] mb-6">
                  {t('booking.step3')}
                </h2>

                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <Label className="text-[#0F172A] font-medium mb-4 block">
                      {t('booking.date')} *
                    </Label>
                    <div className="bg-white p-4 border border-gray-200">
                      <Calendar
                        mode="single"
                        selected={formData.preferred_date}
                        onSelect={(date) => setFormData({ ...formData, preferred_date: date, preferred_time: '' })}
                        locale={locales[language] || locales.en}
                        disabled={(date) => {
                          const day = date.getDay();
                          return day === 0 || day === 6 || date < new Date();
                        }}
                        className="rounded-sm"
                        data-testid="booking-calendar"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-[#0F172A] font-medium mb-4 block">
                      {t('booking.time')} *
                    </Label>
                    {formData.preferred_date ? (
                      <div className="grid grid-cols-3 gap-2" data-testid="time-slots">
                        {availableSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setFormData({ ...formData, preferred_time: slot })}
                            className={`py-3 px-2 text-sm font-medium border transition-all duration-300 ${
                              formData.preferred_time === slot
                                ? 'border-[#C5A059] bg-[#C5A059] text-white'
                                : 'border-gray-200 text-[#0F172A] hover:border-[#C5A059]'
                            }`}
                            data-testid={`time-slot-${slot}`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">
                        {language === 'cs' && 'Nejprve vyberte datum'}
                        {language === 'ru' && 'Сначала выберите дату'}
                        {language === 'en' && 'Please select a date first'}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="text-[#0F172A] font-medium">
                    {t('booking.message')}
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="mt-2 bg-white border-gray-200 focus:border-[#0F172A] rounded-sm resize-none"
                    data-testid="booking-message"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <div className="space-y-6" data-testid="step-4-form">
                <h2 className="font-['Playfair_Display'] text-2xl font-semibold text-[#0F172A] mb-6">
                  {t('booking.step4')}
                </h2>

                <div className="bg-white p-6 border border-gray-200 space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-500">{t('booking.name')}</span>
                    <span className="font-medium text-[#0F172A]">{formData.name}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-500">{t('booking.email')}</span>
                    <span className="font-medium text-[#0F172A]">{formData.email}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-500">{t('booking.phone')}</span>
                    <span className="font-medium text-[#0F172A]">{formData.phone}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-500">{t('booking.service')}</span>
                    <span className="font-medium text-[#0F172A]">
                      {services.find(s => s.value === formData.service)?.label}
                    </span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-500">{t('booking.date')}</span>
                    <span className="font-medium text-[#0F172A]">
                      {formData.preferred_date && format(formData.preferred_date, 'dd.MM.yyyy')}
                    </span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-gray-500">{t('booking.time')}</span>
                    <span className="font-medium text-[#0F172A]">{formData.preferred_time}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  className="border-[#0F172A] text-[#0F172A] hover:bg-[#0F172A] hover:text-white rounded-sm px-8 py-6 text-sm uppercase tracking-widest font-semibold"
                  data-testid="booking-back-btn"
                >
                  {t('booking.back')}
                </Button>
              )}

              {step < 4 ? (
                <Button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                  className="ml-auto bg-[#0F172A] text-white hover:bg-[#1E293B] rounded-sm px-8 py-6 text-sm uppercase tracking-widest font-semibold disabled:opacity-50"
                  data-testid="booking-next-btn"
                >
                  {t('booking.next')}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="ml-auto bg-[#C5A059] text-white hover:bg-[#D4AF37] rounded-sm px-8 py-6 text-sm uppercase tracking-widest font-semibold"
                  data-testid="booking-submit-btn"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Loading...
                    </span>
                  ) : (
                    t('booking.submit')
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookingPage;
