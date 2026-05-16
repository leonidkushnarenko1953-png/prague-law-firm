"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
const API = `${BACKEND_URL}/api`;

const BlogPage = () => {
  const { t, language } = useLanguage();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // First seed the blog if empty
        await axios.post(`${API}/seed-blog`);
        // Then fetch posts
        const response = await axios.get(`${API}/blog`);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const getLocalizedField = (post, field) => {
    return post[`${field}_${language}`] || post[`${field}_en`];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'cs' ? 'cs-CZ' : language === 'ru' ? 'ru-RU' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const categoryLabels = {
    immigration: { cs: 'Imigrační právo', ru: 'Иммиграционное право', en: 'Immigration Law' },
    corporate: { cs: 'Obchodní právo', ru: 'Корпоративное право', en: 'Corporate Law' },
    civil: { cs: 'Občanské právo', ru: 'Гражданское право', en: 'Civil Law' },
    family: { cs: 'Rodinné právo', ru: 'Семейное право', en: 'Family Law' },
    criminal: { cs: 'Trestní právo', ru: 'Уголовное право', en: 'Criminal Law' }
  };

  return (
    <div className="min-h-screen pt-20" data-testid="blog-page">
      {/* Hero */}
      <section className="py-20 md:py-32 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[#C5A059] text-sm uppercase tracking-widest font-semibold mb-4">
              {t('nav.blog')}
            </p>
            <h1 className="font-['Playfair_Display'] text-4xl md:text-6xl font-bold text-[#0F172A] mb-6">
              {t('blog.title')}
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              {t('blog.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-48 mb-6" />
                  <div className="bg-gray-200 h-6 w-3/4 mb-4" />
                  <div className="bg-gray-200 h-4 mb-2" />
                  <div className="bg-gray-200 h-4 w-2/3" />
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">{t('blog.noArticles')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <article
                  key={post.id}
                  className="group bg-[#FDFBF7] border border-black/5 hover:border-[#C5A059]/30 transition-all duration-500 hover-lift"
                  data-testid={`blog-post-${index}`}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image_url || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800'}
                      alt={getLocalizedField(post, 'title')}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#0F172A] text-white text-xs px-3 py-1 uppercase tracking-wider">
                        {categoryLabels[post.category]?.[language] || post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(post.created_at)}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#0F172A] mb-3 line-clamp-2">
                      {getLocalizedField(post, 'title')}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {getLocalizedField(post, 'excerpt')}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags?.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs text-gray-500 flex items-center gap-1"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Read More */}
                    <Link
                      href={`/blog/${post.id}`}
                      className="inline-flex items-center text-[#C5A059] text-sm font-semibold group-hover:gap-2 transition-all duration-300"
                    >
                      <span>{t('blog.readMore')}</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-[#0F172A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-semibold text-white mb-6">
            Zůstaňте informováni
          </h2>
          <p className="text-gray-400 mb-8">
            Odebírejte náš newsletter and získejte nejnovější právní novinky.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Váš e-mail"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-sm focus:outline-none focus:border-[#C5A059]"
              data-testid="newsletter-email"
            />
            <Button
              className="bg-[#C5A059] text-white hover:bg-[#D4AF37] rounded-sm px-6 py-3 text-sm uppercase tracking-widest font-semibold"
              data-testid="newsletter-submit"
            >
              Odebírat
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
