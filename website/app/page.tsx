'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20 md:py-32">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Transform Your Business with
                <span className="block gradient-text"> AI &amp; Technology Solutions</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Lelu-Consulting delivers innovative software engineering, artificial intelligence, and data analytics solutions tailored to your business needs. Drive digital transformation and unlock data-driven insights.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <Link href="/services" className="btn-primary text-center">
                Explore Our Services
              </Link>
              <Link href="/contact" className="btn-outline text-center">
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Core Services</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive technology solutions designed to solve real-world business challenges
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Software Engineering',
                description: 'Custom web, mobile, and enterprise applications built with modern technologies.',
                icon: '💻',
              },
              {
                title: 'AI & Machine Learning',
                description: 'Predictive analytics, recommendation systems, and intelligent automation.',
                icon: '🤖',
              },
              {
                title: 'Data Analytics',
                description: 'Transform raw data into actionable business intelligence and insights.',
                icon: '📊',
              },
              {
                title: 'Cloud Solutions',
                description: 'Cloud migration, DevOps, and scalable infrastructure on Azure & AWS.',
                icon: '☁️',
              },
            ].map((service, index) => (
              <div
                key={index}
                className="p-8 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services" className="btn-secondary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-4xl font-bold mb-16 text-center">Why Choose Lelu-Consulting?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Expert Team',
                description: 'Software engineers, AI specialists, and data analysts with 7+ years experience',
              },
              {
                title: 'Custom Solutions',
                description: 'Tailored technology solutions designed specifically for your business',
              },
              {
                title: 'End-to-End Support',
                description: 'From strategy and consulting to implementation and ongoing support',
              },
              {
                title: 'Proven Results',
                description: 'Delivering scalable, secure, and cost-effective technology solutions',
              },
              {
                title: 'Innovation Focus',
                description: 'Cutting-edge technologies including AI, ML, and cloud platforms',
              },
              {
                title: 'Global Reach',
                description: 'Serving businesses locally in Australia and expanding internationally',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3 text-blue-600">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Opportunities */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container-custom">
          <h2 className="text-4xl font-bold mb-16 text-center">Explore Business Opportunities</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Smart Business Dashboard',
                description: 'Real-time reporting powered by AI and machine learning analytics',
              },
              {
                title: 'Sales Prediction Platform',
                description: 'Forecast future revenue and trends using advanced analytics',
              },
              {
                title: 'AI Chatbot Solution',
                description: 'Automate customer support 24/7 with intelligent conversational AI',
              },
              {
                title: 'Inventory Forecasting',
                description: 'Reduce stock shortages using predictive analytics',
              },
              {
                title: 'Fraud Detection System',
                description: 'Identify suspicious financial transactions in real-time',
              },
              {
                title: 'HR Analytics Platform',
                description: 'Predict employee turnover and optimize recruitment',
              },
            ].map((opportunity, index) => (
              <div
                key={index}
                className="p-8 border-2 border-gray-200 rounded-lg hover:border-blue-600 transition-colors"
              >
                <h3 className="text-xl font-bold mb-3">{opportunity.title}</h3>
                <p className="text-gray-600 mb-4">{opportunity.description}</p>
                <Link href="/contact" className="text-blue-600 font-semibold hover:text-blue-700">
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-blue-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Let&apos;s discuss how Lelu-Consulting can help you leverage technology for growth and innovation
          </p>
          <Link href="/contact" className="btn-secondary inline-block">
            Start Your Project Today
          </Link>
        </div>
      </section>
    </div>
  );
}
