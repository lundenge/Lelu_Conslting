const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const DATA_FILE = path.join(__dirname, 'data.json');

function ensureDefaultData() {
  const defaultPassword = process.env.ADMIN_PASSWORD || 'admin123456';
  const hashedPassword = bcrypt.hashSync(defaultPassword, 10);

  return {
    admins: [
      {
        id: 'admin-1',
        email: process.env.ADMIN_EMAIL || 'admin@lelu-consulting.com',
        password: hashedPassword,
        name: 'Admin User',
        role: 'admin',
        isActive: true,
      },
    ],
    customers: [],
    testimonials: [],
    contactRequests: [],
  };
}

function readStore() {
  if (!fs.existsSync(DATA_FILE)) {
    const initialData = ensureDefaultData();
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
    return initialData;
  }

  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    const parsed = JSON.parse(raw);

    if (!parsed.admins) parsed.admins = [];
    if (!parsed.customers) parsed.customers = [];
    if (!parsed.testimonials) parsed.testimonials = [];
    if (!parsed.contactRequests) parsed.contactRequests = [];

    if (parsed.admins.length === 0) {
      const defaultAdmin = ensureDefaultData().admins[0];
      parsed.admins.push(defaultAdmin);
      writeStore(parsed);
    }

    return parsed;
  } catch (error) {
    const fallback = ensureDefaultData();
    fs.writeFileSync(DATA_FILE, JSON.stringify(fallback, null, 2));
    return fallback;
  }
}

function writeStore(store) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2));
}

function getStore() {
  return readStore();
}

function saveStore(store) {
  writeStore(store);
  return store;
}

function getAdminByEmail(email) {
  const store = getStore();
  return store.admins.find((admin) => admin.email === email && admin.isActive);
}

function getAdminById(id) {
  const store = getStore();
  return store.admins.find((admin) => admin.id === id);
}

function listCustomers(status, search) {
  const store = getStore();
  let results = [...store.customers];

  if (status) results = results.filter((customer) => customer.status === status);
  if (search) {
    const query = search.toLowerCase();
    results = results.filter(
      (customer) =>
        customer.name?.toLowerCase().includes(query) ||
        customer.email?.toLowerCase().includes(query) ||
        customer.company?.toLowerCase().includes(query)
    );
  }

  return results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function getCustomerById(id) {
  const store = getStore();
  return store.customers.find((customer) => customer.id === id);
}

function createCustomer(data) {
  const store = getStore();
  const customer = {
    id: crypto.randomUUID(),
    ...data,
    status: data.status || 'new',
    sourceChannel: data.sourceChannel || 'contact-form',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  store.customers.unshift(customer);
  saveStore(store);
  return customer;
}

function updateCustomer(id, data) {
  const store = getStore();
  const index = store.customers.findIndex((customer) => customer.id === id);
  if (index === -1) return null;
  store.customers[index] = {
    ...store.customers[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  saveStore(store);
  return store.customers[index];
}

function deleteCustomer(id) {
  const store = getStore();
  const index = store.customers.findIndex((customer) => customer.id === id);
  if (index === -1) return null;
  const [deleted] = store.customers.splice(index, 1);
  saveStore(store);
  return deleted;
}

function listTestimonials(status) {
  const store = getStore();
  let results = [...store.testimonials];
  if (status) results = results.filter((testimonial) => testimonial.status === status);
  return results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function createTestimonial(data) {
  const store = getStore();
  const testimonial = {
    id: crypto.randomUUID(),
    ...data,
    status: data.status || 'pending',
    rating: data.rating || 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  store.testimonials.unshift(testimonial);
  saveStore(store);
  return testimonial;
}

function updateTestimonial(id, data) {
  const store = getStore();
  const index = store.testimonials.findIndex((testimonial) => testimonial.id === id);
  if (index === -1) return null;
  store.testimonials[index] = {
    ...store.testimonials[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  saveStore(store);
  return store.testimonials[index];
}

function deleteTestimonial(id) {
  const store = getStore();
  const index = store.testimonials.findIndex((testimonial) => testimonial.id === id);
  if (index === -1) return null;
  const [deleted] = store.testimonials.splice(index, 1);
  saveStore(store);
  return deleted;
}

function listContactRequests(status) {
  const store = getStore();
  let results = [...store.contactRequests];
  if (status) results = results.filter((request) => request.status === status);
  return results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function getContactRequestById(id) {
  const store = getStore();
  return store.contactRequests.find((request) => request.id === id);
}

function createContactRequest(data) {
  const store = getStore();
  const request = {
    id: crypto.randomUUID(),
    ...data,
    status: data.status || 'new',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  store.contactRequests.unshift(request);
  saveStore(store);
  return request;
}

function updateContactRequest(id, data) {
  const store = getStore();
  const index = store.contactRequests.findIndex((request) => request.id === id);
  if (index === -1) return null;
  store.contactRequests[index] = {
    ...store.contactRequests[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  saveStore(store);
  return store.contactRequests[index];
}

module.exports = {
  getStore,
  getAdminByEmail,
  getAdminById,
  listCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  listTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  listContactRequests,
  getContactRequestById,
  createContactRequest,
  updateContactRequest,
};
