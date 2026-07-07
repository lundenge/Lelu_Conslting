'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/contact-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit form');
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: '',
        });
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
      console.error('Form submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 md:py-24">
        <div className="container-custom">
          <h1 className="text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-xl text-gray-300">
            We&apos;re here to help. Let&apos;s discuss your technology needs.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Contact Information</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold mb-2 text-blue-600">Email</h3>
                  <a href="mailto:hello@leluconsulting.com" className="text-gray-700 hover:text-blue-600">
                    contact@leluconsulting.net
                  </a>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-2 text-blue-600">Phone</h3>
                  <a href="tel:+61412345678" className="text-gray-700 hover:text-blue-600">
                    +61 (0)472753020
                  </a>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-2 text-blue-600">Location</h3>
                  <p className="text-gray-700">
                    Australia
                    <br />
                    Expanding to Africa &amp; Global Markets
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-4 text-blue-600">Follow Us</h3>
                  <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700">
                      f
                    </a>
                    <a href="#" className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700">
                      in
                    </a>
                    <a href="#" className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700">
                      tw
                    </a>
                    <a href="#" className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700">
                      gh
                    </a>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <p className="text-gray-800 font-semibold mb-2">Quick Response Time</p>
                  <p className="text-gray-700 text-sm">
                    We typically respond to inquiries within 24 hours during business days.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-8">Send us a Message</h2>

              {submitted ? (
                <div className="bg-green-50 border-2 border-green-600 p-8 rounded-lg text-center">
                  <div className="text-5xl mb-4">✓</div>
                  <h3 className="text-2xl font-bold text-green-800 mb-2">Message Sent!</h3>
                  <p className="text-green-700">
                    Thank you for reaching out. We&apos;ll be in touch shortly to discuss your project.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-50 border-2 border-red-600 p-4 rounded-lg">
                      <p className="text-red-700 font-semibold">{error}</p>
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block font-semibold mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block font-semibold mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block font-semibold mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                        placeholder="+61 (0)472753020"
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="block font-semibold mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                        placeholder="Your company"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="block font-semibold mb-2">
                      Service of Interest *
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    >
                      <option value="">Select a service</option>
                      <option value="software-engineering">Software Engineering</option>
                      <option value="ai-ml">AI & Machine Learning</option>
                      <option value="data-analytics">Data Analytics</option>
                      <option value="business-automation">Business Process Automation</option>
                      <option value="ai-consulting">AI Consulting</option>
                      <option value="cloud-solutions">Cloud Solutions</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block font-semibold mb-2">
                      Tell us about your project *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                      placeholder="Describe your project, goals, and any specific requirements..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>

                  <p className="text-gray-600 text-sm">
                    * Required fields. We respect your privacy and will never share your information.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: 'How long does a typical project take?',
                answer: 'Project timelines vary based on complexity. A consultation typically takes 1-2 weeks, while larger projects can range from 2-6 months or more.',
              },
              {
                question: 'What industries do you specialize in?',
                answer: 'We serve diverse industries including healthcare, finance, agriculture, education, manufacturing, logistics, retail, and government sectors.',
              },
              {
                question: 'Do you offer ongoing support after project completion?',
                answer: 'Yes, we provide maintenance contracts, technical support, and continuous optimization services to ensure your solutions perform optimally.',
              },
              {
                question: 'Can you work with existing technology stacks?',
                answer: 'Absolutely! We can integrate with your existing systems and help modernize your technology infrastructure.',
              },
              {
                question: 'How do you ensure data security and compliance?',
                answer: 'We follow industry best practices, implement security standards, and ensure compliance with relevant regulations (GDPR, HIPAA, etc.).',
              },
              {
                question: 'What is your pricing model?',
                answer: 'We offer flexible pricing including project-based, time-based, and subscription models. Contact us for a customized quote.',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-3 text-blue-600">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-blue-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">Let&apos;s Start Your Digital Transformation</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Fill out the form above or call us directly to schedule a free consultation about your project.
          </p>
        </div>
      </section>
    </div>
  );
}
