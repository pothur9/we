"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { courseCategories, cities } from "../data/courseData";

export default function Hero() {
  const router = useRouter();
  const [collegeName, setCollegeName] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  
  const cityDropdownRef = useRef<HTMLDivElement>(null);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target as Node)) {
        setCityDropdownOpen(false);
      }
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setCategoryDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (collegeName) params.set("q", collegeName);
    if (selectedCity) params.set("city", selectedCity);
    if (selectedCategory) params.set("category", selectedCategory);
    router.push(`/search?${params.toString()}`);
  };

  const handleQuickCategoryClick = (categorySlug: string) => {
    router.push(`/search?category=${categorySlug}`);
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setCityDropdownOpen(false);
  };

  const handleCategorySelect = (slug: string) => {
    setSelectedCategory(slug);
    setCategoryDropdownOpen(false);
  };

  const getCategoryName = () => {
    const cat = courseCategories.find(c => c.slug === selectedCategory);
    return cat ? cat.name : "Select Course Category";
  };

  return (
    <section id="home" className="pt-32 pb-20 px-4 gradient-bg relative overflow-hidden scroll-mt-16">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full -ml-48 -mb-48"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-float">
            Find Your Dream College
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Explore 50,000+ colleges, compare courses, and make informed decisions about your future
          </p>
        </div>
        
        {/* Search Box */}
        <div className="max-w-4xl mx-auto search-box rounded-2xl p-8 pb-12 shadow-2xl">
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {/* College Name Search */}
            <div className="relative">
              <i className="fas fa-search absolute left-4 top-4 text-gray-400"></i>
              <input 
                type="text" 
                placeholder="Search colleges..." 
                className="w-full h-12 pl-12 pr-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
              />
            </div>
            
            {/* City Custom Dropdown */}
            <div className="relative" ref={cityDropdownRef}>
              <button
                type="button"
                onClick={() => {
                  setCityDropdownOpen(!cityDropdownOpen);
                  setCategoryDropdownOpen(false);
                }}
                className="w-full h-12 pl-12 pr-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-left flex items-center"
              >
                <i className="fas fa-map-marker-alt absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <span className={`truncate ${selectedCity ? "text-gray-800" : "text-gray-400"}`}>
                  {selectedCity || "Select City"}
                </span>
                <i className={`fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-transform ${cityDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>
              
              {/* Dropdown List - Opens Downward */}
              {cityDropdownOpen && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto">
                  <div
                    onClick={() => handleCitySelect("")}
                    className="px-4 py-3 hover:bg-purple-50 cursor-pointer border-b border-gray-100 text-gray-400"
                  >
                    Select City
                  </div>
                  {cities.map((city) => (
                    <div
                      key={city}
                      onClick={() => handleCitySelect(city)}
                      className={`px-4 py-3 hover:bg-purple-50 cursor-pointer ${selectedCity === city ? 'bg-purple-100 text-purple-700 font-medium' : 'text-gray-700'}`}
                    >
                      {city}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Course Category Custom Dropdown */}
            <div className="relative" ref={categoryDropdownRef}>
              <button
                type="button"
                onClick={() => {
                  setCategoryDropdownOpen(!categoryDropdownOpen);
                  setCityDropdownOpen(false);
                }}
                className="w-full h-12 pl-12 pr-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-left flex items-center"
              >
                <i className="fas fa-book absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <span className={`truncate ${selectedCategory ? "text-gray-800" : "text-gray-400"}`}>
                  {getCategoryName()}
                </span>
                <i className={`fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-transform ${categoryDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>
              
              {/* Dropdown List - Opens Downward */}
              {categoryDropdownOpen && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto">
                  <div
                    onClick={() => handleCategorySelect("")}
                    className="px-4 py-3 hover:bg-purple-50 cursor-pointer border-b border-gray-100 text-gray-400"
                  >
                    Select Course Category
                  </div>
                  {courseCategories.map((category) => (
                    <div
                      key={category.slug}
                      onClick={() => handleCategorySelect(category.slug)}
                      className={`px-4 py-3 hover:bg-purple-50 cursor-pointer flex items-center gap-3 ${selectedCategory === category.slug ? 'bg-purple-100 text-purple-700 font-medium' : 'text-gray-700'}`}
                    >
                      <i className={`${category.icon} text-sm w-5`}></i>
                      {category.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <button 
            onClick={handleSearch}
            className="w-full gradient-bg text-white py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition"
          >
            Search Colleges <i className="fas fa-arrow-right ml-2"></i>
          </button>
          
          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <span className="text-sm text-gray-600">Popular:</span>
            {courseCategories.slice(0, 4).map((category) => (
              <button 
                key={category.slug}
                onClick={() => handleQuickCategoryClick(category.slug)}
                className="text-sm bg-purple-100 text-purple-700 px-4 py-1 rounded-full hover:bg-purple-200 transition"
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
