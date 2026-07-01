'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container-custom flex justify-between items-center py-4">
        <Link href="/" className="text-2xl font-bold gradient-text">
          Lelu<span className="text-blue-600">.</span>Consulting
        </Link>
        
        <button 
          className="hidden max-md:block"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <ul className={`hidden max-md:absolute max-md:top-full max-md:left-0 max-md:w-full max-md:bg-white max-md:flex-col max-md:p-4 max-md:gap-4 ${isOpen ? 'max-md:flex' : ''} md:flex gap-8`}>
          <li><Link href="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
          <li><Link href="/about" className="hover:text-blue-600 transition-colors">About</Link></li>
          <li><Link href="/services" className="hover:text-blue-600 transition-colors">Services</Link></li>
          <li><Link href="/portfolio" className="hover:text-blue-600 transition-colors">Portfolio</Link></li>
          <li><Link href="/testimonials" className="hover:text-blue-600 transition-colors">Testimonials</Link></li>
          <li><Link href="/contact" className="btn-primary inline-block">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}
