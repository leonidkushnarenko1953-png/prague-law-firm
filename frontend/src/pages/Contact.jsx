import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ContactPage = () => {
  const { t, language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API}/contacts`, {
        ...formData,
        language
      });
      setSuccess(true);
      toast.success(t('booking.success'));
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Error sending message');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: t('contact.address'),
      value: t('contact.addressText')
    },
    {
      icon: Phone,
      label: t('contact.phone'),
      value: '+420 123 456 789'
    },
    {
      icon: Mail,
      label: t('contact.email'),
      value: 'info@kushnarenko.cz'
    },
    {
      icon: Clock,
      label: t('contact.hours'),
      value: t('contact.hoursText')
    }
  ];

  return (
    <div className="min-h-screen pt-20" data-testid="contact-page">
      {/* Hero */}
      <section className="py-20 md:py-32 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[#C5A059] text-sm uppercase tracking-widest font-semibold mb-4">
              {t('nav.contact')}
            </p>
            <h1 className="font-['Playfair_Display'] text-4xl md:text-6xl font-bold text-[#0F172A] mb-6">
              {t('contact.title')}
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              {t('contact.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info & Map */}
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div 
                      key={index}
                      className="p-6 bg-[#FDFBF7] border-l-2 border-[#C5A059]"
                      data-testid={`contact-info-${index}`}
                    >
                      <Icon className="w-6 h-6 text-[#C5A059] mb-3" />
                      <p className="text-sm text-gray-500 mb-1">{info.label}</p>
                      <p className="text-[#0F172A] font-medium">{info.value}</p>
                    </div>
                  );
                })}
              </div>

              {/* Google Maps */}
              <div className="h-[400px] bg-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2560.0176787481994!2d14.423559376941726!3d50.08178851467366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b94e8f2a4d3b7%3A0x400af0f6615a7d0!2sWenceslas%20Square%2C%20Prague%201%2C%20Czechia!5e0!3m2!1sen!2sus!4v1699000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                  data-testid="google-map"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-[#FDFBF7] p-8 md:p-12">
                <h2 className="font-['Playfair_Display'] text-2xl font-semibold text-[#0F172A] mb-8">
                  {t('contact.form.send')}
                </h2>

                {success ? (
                  <div className="text-center py-12" data-testid="contact-success">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <p className="text-[#0F172A] text-lg font-medium">
                      {t('booking.success')}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-[#0F172A] font-medium">
                          {t('contact.form.name')} *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="mt-2 bg-white border-gray-200 focus:border-[#0F172A] rounded-sm h-12"
                          data-testid="contact-name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-[#0F172A] font-medium">
                          {t('contact.form.email')} *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="mt-2 bg-white border-gray-200 focus:border-[#0F172A] rounded-sm h-12"
                          data-testid="contact-email"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="phone" className="text-[#0F172A] font-medium">
                          {t('contact.form.phone')}
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="mt-2 bg-white border-gray-200 focus:border-[#0F172A] rounded-sm h-12"
                          data-testid="contact-phone"
                        />
                      </div>
                      <div>
                        <Label htmlFor="subject" className="text-[#0F172A] font-medium">
                          {t('contact.form.subject')} *
                        </Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="mt-2 bg-white border-gray-200 focus:border-[#0F172A] rounded-sm h-12"
                          data-testid="contact-subject"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-[#0F172A] font-medium">
                        {t('contact.form.message')} *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="mt-2 bg-white border-gray-200 focus:border-[#0F172A] rounded-sm resize-none"
                        data-testid="contact-message"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#0F172A] text-white hover:bg-[#1E293B] rounded-sm px-8 py-6 text-sm uppercase tracking-widest font-semibold"
                      data-testid="contact-submit"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Loading...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <Send className="w-4 h-4" />
                          {t('contact.form.send')}
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
