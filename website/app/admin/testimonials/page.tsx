'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  image: string;
  status: string;
  createdAt: string;
}

export default function AdminTestimonials() {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    quote: '',
    image: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, [router]);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/testimonials', {
        credentials: 'include',
      });

      if (!res.ok) {
        router.push('/admin/login');
        return;
      }

      const data = await res.json();
      setTestimonials(data);
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('http://localhost:5000/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        await fetchTestimonials();
        setFormData({ name: '', role: '', company: '', quote: '', image: '' });
        setShowForm(false);
      }
    } catch (error) {
      console.error('Failed to create testimonial:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/testimonials/${id}/approve`, {
        method: 'PUT',
        credentials: 'include',
      });

      if (res.ok) {
        await fetchTestimonials();
      }
    } catch (error) {
      console.error('Failed to approve:', error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/testimonials/${id}/reject`, {
        method: 'PUT',
        credentials: 'include',
      });

      if (res.ok) {
        await fetchTestimonials();
      }
    } catch (error) {
      console.error('Failed to reject:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/testimonials/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (res.ok) {
        await fetchTestimonials();
      }
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  const filtered = testimonials.filter((t) => !filter || t.status === filter);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/admin/dashboard" className="text-2xl font-bold gradient-text">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold">Testimonials</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-between">
          <div className="flex-1 mr-4">
            <label className="block text-gray-700 font-semibold mb-2">Filter by Status</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full md:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            >
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors h-fit"
          >
            {showForm ? 'Cancel' : '+ Add Testimonial'}
          </button>
        </div>

        {/* Add Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Add New Testimonial</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  required
                />
                <input
                  type="text"
                  placeholder="Role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  required
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  required
                />
                <input
                  type="url"
                  placeholder="Image URL"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  required
                />
              </div>
              <textarea
                placeholder="Quote"
                value={formData.quote}
                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 mt-4 h-24"
                required
              />
              <button
                type="submit"
                disabled={submitting}
                className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
              >
                {submitting ? 'Adding...' : 'Add Testimonial'}
              </button>
            </form>
          </div>
        )}

        {/* Testimonials Grid */}
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-600">No testimonials found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((testimonial) => (
              <div key={testimonial._id} className="bg-white rounded-lg shadow-md p-6">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={64}
                  height={64}
                  className="rounded-full object-cover mb-4 border-2 border-blue-600"
                />
                <h3 className="text-xl font-bold">{testimonial.name}</h3>
                <p className="text-blue-600 font-semibold">{testimonial.role}</p>
                <p className="text-gray-600 text-sm mb-4">{testimonial.company}</p>
                <p className="text-gray-700 italic mb-4">&quot;{testimonial.quote}&quot;</p>

                <div className="flex gap-2 flex-wrap">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      testimonial.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : testimonial.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {testimonial.status}
                  </span>
                </div>

                {testimonial.status === 'pending' && (
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleApprove(testimonial._id)}
                      className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(testimonial._id)}
                      className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                    >
                      Reject
                    </button>
                  </div>
                )}

                <button
                  onClick={() => handleDelete(testimonial._id)}
                  className="w-full mt-2 bg-gray-300 text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-400 transition-colors text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
