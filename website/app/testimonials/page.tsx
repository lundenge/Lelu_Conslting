'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Testimonial {
  _id?: string;
  name: string;
  role: string;
  company: string;
  image?: string;
  quote: string;
  status?: string;
  createdAt?: string;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const defaultTestimonials: Testimonial[] = [
    {
      name: 'Sarah M.',
      role: 'Operations Director',
      company: 'BrightPath Logistics',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
      quote:
        'Lelu-Consulting transformed our reporting process with a custom dashboard and AI-powered forecasting. The results were visible in the first month.',
    },
    {
      name: 'Daniel K.',
      role: 'Founder',
      company: 'Northstar Retail',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      quote:
        'Their team understood our business goals immediately and built a solution that scaled with our growth. Communication was excellent throughout the project.',
    },
    {
      name: 'Mina A.',
      role: 'HR Lead',
      company: 'NovaCare Health',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      quote:
        'We needed automation and insight from our data, and they delivered both. The implementation was smooth, practical, and highly professional.',
    },
  ];

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/testimonials', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          const approved = Array.isArray(data) 
            ? data.filter((t: Testimonial) => t.status === 'approved' || t.status === 'pending')
            : [];
          setTestimonials(approved.length > 0 ? approved : defaultTestimonials);
        } else {
          setTestimonials(defaultTestimonials);
        }
      } catch (err) {
        console.error('Failed to fetch testimonials:', err);
        setTestimonials(defaultTestimonials);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 md:py-24">
        <div className="container-custom">
          <h1 className="text-5xl font-bold mb-4">Testimonials</h1>
          <p className="text-xl text-gray-300">
            Hear from clients who trusted us to build smarter, more efficient solutions.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-white">
        <div className="container-custom">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {testimonials.map((item, index) => (
                <div key={item._id || index} className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={56}
                        height={56}
                        className="rounded-full object-cover border-2 border-blue-600"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                        {item.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                      <p className="text-blue-600 font-semibold text-sm">{item.role}</p>
                      <p className="text-gray-500 text-sm">{item.company}</p>
                    </div>
                  </div>
                  <div className="text-blue-600 text-3xl font-serif mb-3 leading-none">&rdquo;</div>
                  <p className="text-gray-700 text-base leading-relaxed italic">{item.quote}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">Let&apos;s build something great together</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Whether you need a custom platform, AI solution, or data-driven automation, we are ready to help.
          </p>
          <Link href="/contact" className="btn-primary inline-block">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
