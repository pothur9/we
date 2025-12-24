"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openLeadForm = () => {
    window.dispatchEvent(new Event('openLeadForm'));
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { href: "#colleges", label: "Colleges" },
    { href: "#courses", label: "Courses" },
    { href: "#features", label: "Features" },
    { href: "/search", label: "All Colleges" },
  ];

  return (
    <nav className="fixed w-full top-0 z-50 nav-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <img 
              src="/logo.png" 
              alt="We For Uni Logo" 
              className="w-18 h-18 object-contain"
            />
            <span className="text-2xl font-bold gradient-text">We For Uni</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.href}
                href={link.href} 
                className="text-gray-700 hover:text-[#2A8EA0] font-medium transition"
              >
                {link.label}
              </a>
            ))}
          </div>
          
          {/* Desktop CTA & Mobile Hamburger */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={openLeadForm}
              className="hidden sm:block gradient-bg text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition"
            >
              Get Started
            </button>
            
            {/* Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <i className="fas fa-times text-2xl text-gray-700"></i>
              ) : (
                <i className="fas fa-bars text-2xl text-gray-700"></i>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 px-4 text-gray-700 hover:bg-purple-50 hover:text-[#2A8EA0] rounded-lg font-medium transition"
              >
                {link.label}
              </a>
            ))}
            
            {/* Mobile CTA Button */}
            <button 
              onClick={openLeadForm}
              className="w-full gradient-bg text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition mt-4"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
