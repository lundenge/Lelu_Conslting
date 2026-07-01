'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const [adminEmail, setAdminEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCustomers: 0,
    newMessages: 0,
    pendingTestimonials: 0,
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/auth/me', {
          credentials: 'include',
        });

        if (!res.ok) {
          router.push('/admin/login');
          return;
        }

        const email = localStorage.getItem('adminEmail');
        setAdminEmail(email || 'Admin');

        // Fetch stats
        await Promise.all([
          fetch('http://localhost:5000/api/customers', { credentials: 'include' }),
          fetch('http://localhost:5000/api/contact-requests?status=new', { credentials: 'include' }),
          fetch('http://localhost:5000/api/testimonials?status=pending', { credentials: 'include' }),
        ]).then(async ([custRes, msgRes, testRes]) => {
          const customers = await custRes.json();
          const messages = await msgRes.json();
          const testimonials = await testRes.json();

          setStats({
            totalCustomers: customers.length,
            newMessages: messages.length,
            pendingTestimonials: testimonials.length,
          });
        });
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await fetch('http://localhost:5000/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    localStorage.removeItem('adminEmail');
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold gradient-text">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">{adminEmail}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm font-semibold uppercase">Total Customers</h3>
            <p className="text-4xl font-bold text-blue-600 mt-2">{stats.totalCustomers}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm font-semibold uppercase">New Messages</h3>
            <p className="text-4xl font-bold text-red-600 mt-2">{stats.newMessages}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm font-semibold uppercase">Pending Testimonials</h3>
            <p className="text-4xl font-bold text-yellow-600 mt-2">{stats.pendingTestimonials}</p>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            href="/admin/customers"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow hover:border-blue-600 border-2 border-transparent"
          >
            <h2 className="text-2xl font-bold text-blue-600 mb-2">👥 Customers</h2>
            <p className="text-gray-600">Manage customer database and track leads</p>
          </Link>

          <Link
            href="/admin/messages"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow hover:border-red-600 border-2 border-transparent"
          >
            <h2 className="text-2xl font-bold text-red-600 mb-2">💬 Messages</h2>
            <p className="text-gray-600">View and respond to contact requests</p>
          </Link>

          <Link
            href="/admin/testimonials"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow hover:border-yellow-600 border-2 border-transparent"
          >
            <h2 className="text-2xl font-bold text-yellow-600 mb-2">⭐ Testimonials</h2>
            <p className="text-gray-600">Approve and manage customer testimonials</p>
          </Link>

          <Link
            href="/"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow hover:border-green-600 border-2 border-transparent"
          >
            <h2 className="text-2xl font-bold text-green-600 mb-2">🌐 View Site</h2>
            <p className="text-gray-600">Go back to main website</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
