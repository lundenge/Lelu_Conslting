'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface ContactRequest {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  response?: string;
  createdAt: string;
}

export default function AdminMessages() {
  const router = useRouter();
  const [messages, setMessages] = useState<ContactRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<ContactRequest | null>(null);
  const [responseText, setResponseText] = useState('');
  const [responding, setResponding] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, [router]);

  const fetchMessages = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/contact-requests', {
        credentials: 'include',
      });

      if (!res.ok) {
        router.push('/admin/login');
        return;
      }

      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRespond = async () => {
    if (!selectedMessage || !responseText.trim()) return;

    setResponding(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/contact-requests/${selectedMessage._id}/respond`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ response: responseText }),
        }
      );

      if (res.ok) {
        await fetchMessages();
        setSelectedMessage(null);
        setResponseText('');
      }
    } catch (error) {
      console.error('Failed to respond:', error);
    } finally {
      setResponding(false);
    }
  };

  const filtered = messages.filter((m) => !filter || m.status === filter);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/admin/dashboard" className="text-2xl font-bold gradient-text">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold">Contact Messages</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Filter</label>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                >
                  <option value="">All</option>
                  <option value="new">New</option>
                  <option value="viewed">Viewed</option>
                  <option value="responded">Responded</option>
                </select>
              </div>

              {loading ? (
                <p className="text-center text-gray-600">Loading...</p>
              ) : filtered.length === 0 ? (
                <p className="text-center text-gray-600">No messages</p>
              ) : (
                <div className="space-y-2">
                  {filtered.map((msg) => (
                    <button
                      key={msg._id}
                      onClick={() => setSelectedMessage(msg)}
                      className={`w-full text-left p-3 rounded-lg border-l-4 transition-colors ${
                        selectedMessage?._id === msg._id
                          ? 'bg-blue-50 border-l-blue-600'
                          : 'bg-gray-50 border-l-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      <div className="font-semibold text-sm">{msg.name}</div>
                      <div className="text-xs text-gray-600 truncate">{msg.subject}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        <span
                          className={`inline-block px-2 py-1 rounded text-white ${
                            msg.status === 'new'
                              ? 'bg-red-600'
                              : msg.status === 'responded'
                                ? 'bg-green-600'
                                : 'bg-yellow-600'
                          }`}
                        >
                          {msg.status}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">{selectedMessage.subject}</h2>

                <div className="mb-4 pb-4 border-b">
                  <p className="text-gray-600">
                    <strong>From:</strong> {selectedMessage.name} ({selectedMessage.email})
                  </p>
                  <p className="text-gray-600">
                    <strong>Date:</strong> {new Date(selectedMessage.createdAt).toLocaleString()}
                  </p>
                  <p className="text-gray-600">
                    <strong>Status:</strong>{' '}
                    <span className="inline-block px-2 py-1 rounded text-white bg-blue-600 text-sm">
                      {selectedMessage.status}
                    </span>
                  </p>
                </div>

                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-800">{selectedMessage.message}</p>
                </div>

                {selectedMessage.response && (
                  <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-600 rounded-lg">
                    <p className="font-semibold text-green-800 mb-2">Your Response:</p>
                    <p className="text-gray-800">{selectedMessage.response}</p>
                  </div>
                )}

                {selectedMessage.status !== 'responded' && (
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Your Response</label>
                    <textarea
                      value={responseText}
                      onChange={(e) => setResponseText(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 h-32"
                      placeholder="Type your response here..."
                      disabled={responding}
                    />
                    <button
                      onClick={handleRespond}
                      disabled={responding || !responseText.trim()}
                      className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                    >
                      {responding ? 'Sending...' : 'Send Response'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-600">
                <p>Select a message to view details</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
