"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
const API = `${BACKEND_URL}/api`;

const BlogDetailPage = () => {
  const { id } = useParams();
  const { t, language } = useLanguage();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${API}/blog/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchPost();
  }, [id]);

  const getLocalizedField = (post, field) => {
    return post?.[`${field}_${language}`] || post?.[`${field}_en`];
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'cs' ? 'cs-CZ' : language === 'ru' ? 'ru-RU' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-40 flex justify-center">
        <div className="w-8 h-8 border-4 border-[#C5A059] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-40 text-center">
        <h1 className="text-2xl font-bold">Post not found</h1>
        <Link href="/blog" className="text-[#C5A059] mt-4 inline-block">
          Back to blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-gray-500 hover:text-[#C5A059] mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>{t('blog.archive')}</span>
          </Link>

          <div className="mb-10">
            <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-[#0F172A] mb-6">
              {getLocalizedField(post, 'title')}
            </h1>

            <div className="flex items-center gap-6 text-gray-500">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(post.created_at)}
              </span>
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </span>
            </div>
          </div>

          <div className="aspect-video mb-12 overflow-hidden">
            <img
              src={post.image_url || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200'}
              alt={getLocalizedField(post, 'title')}
              className="w-full h-full object-cover"
            />
          </div>

          <div
            className="prose prose-lg max-w-none prose-headings:font-['Playfair_Display'] prose-headings:text-[#0F172A] prose-p:text-gray-600"
            dangerouslySetInnerHTML={{ __html: getLocalizedField(post, 'content') }}
          />

          <div className="mt-12 pt-8 border-t border-gray-100">
            <div className="flex flex-wrap gap-2">
              {post.tags?.map((tag, i) => (
                <span
                  key={i}
                  className="bg-[#FDFBF7] text-gray-600 px-4 py-1 text-sm border border-black/5"
                >
                  <Tag className="w-3 h-3 inline mr-2" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetailPage;
