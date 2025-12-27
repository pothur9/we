"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import LeadForm from "../components/LeadForm";
import { courseCategories, cities, getCategoryBySlug } from "../data/courseData";

interface College {
  _id: string;
  name: string;
  location: string;
  city: string;
  rating: number;
  image: string;
}

interface ApiResponse {
  success: boolean;
  data: College[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const city = searchParams.get("city") || "";
  const categorySlug = searchParams.get("category") || "";
  
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [searchInput, setSearchInput] = useState(query);
  
  const category = categorySlug ? getCategoryBySlug(categorySlug) : null;
  
  // Fetch colleges from API
  useEffect(() => {
    const fetchColleges = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (query) params.set("q", query);
        if (city) params.set("city", city);
        if (categorySlug) params.set("category", categorySlug);
        
        const response = await fetch(`${API_URL}/api/colleges?${params.toString()}`);
        const data: ApiResponse = await response.json();
        
        if (data.success) {
          setColleges(data.data);
          setTotal(data.pagination.total);
        }
      } catch (error) {
        console.error("Error fetching colleges:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchColleges();
  }, [query, city, categorySlug]);

  // Update search input when URL changes
  useEffect(() => {
    setSearchInput(query);
  }, [query]);
  
  // Handle search submit
  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchInput.trim()) params.set("q", searchInput.trim());
    if (city) params.set("city", city);
    if (categorySlug) params.set("category", categorySlug);
    router.push(`/search?${params.toString()}`);
  };
  
  // Build title
  let pageTitle = "All Colleges";
  if (category && city) {
    pageTitle = `${category.name} Colleges in ${city}`;
  } else if (category) {
    pageTitle = `${category.name} Colleges`;
  } else if (city) {
    pageTitle = `Colleges in ${city}`;
  } else if (query) {
    pageTitle = `Search results for "${query}"`;
  }

  const openLeadForm = () => {
    window.dispatchEvent(new Event('openLeadForm'));
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50 pt-24 pb-16">
        {/* Hero Section */}
        <div className="gradient-bg py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <Link 
              href="/" 
              className="inline-flex items-center text-white/80 hover:text-white mb-4 transition"
            >
              <i className="fas fa-arrow-left mr-2"></i> Back to Home
            </Link>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <i className={`${category?.icon || 'fas fa-university'} text-3xl text-white`}></i>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">{pageTitle}</h1>
                <p className="text-white/80 mt-1">{total} colleges found</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-7xl mx-auto px-4 -mt-6">
          <div className="bg-white rounded-xl shadow-xl p-4">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Search for colleges..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button
                onClick={handleSearch}
                className="gradient-bg text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition flex items-center gap-2"
              >
                <i className="fas fa-search"></i>
                <span className="hidden sm:inline">Search</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-white rounded-xl shadow-lg p-4 flex flex-wrap gap-4 items-center">
            <span className="text-gray-600 font-medium">Filters:</span>
            {city && (
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                <i className="fas fa-map-marker-alt"></i> {city}
                <Link href={`/search?${category ? `category=${categorySlug}` : ''}${query ? `&q=${query}` : ''}`} className="hover:text-purple-900">
                  <i className="fas fa-times"></i>
                </Link>
              </span>
            )}
            {category && (
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                <i className={category.icon}></i> {category.name}
                <Link href={`/search?${city ? `city=${city}` : ''}${query ? `&q=${query}` : ''}`} className="hover:text-blue-900">
                  <i className="fas fa-times"></i>
                </Link>
              </span>
            )}
            {query && (
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                <i className="fas fa-search"></i> &quot;{query}&quot;
                <Link href={`/search?${city ? `city=${city}` : ''}${category ? `&category=${categorySlug}` : ''}`} className="hover:text-green-900">
                  <i className="fas fa-times"></i>
                </Link>
              </span>
            )}
            {!city && !category && !query && (
              <span className="text-gray-500 text-sm">No filters applied</span>
            )}
          </div>
        </div>

        {/* Colleges Grid */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          {loading ? (
            <div className="text-center py-16">
              <i className="fas fa-spinner fa-spin text-4xl text-[#2A8EA0] mb-4"></i>
              <p className="text-gray-600">Loading colleges...</p>
            </div>
          ) : colleges.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {colleges.map((college) => (
                <div
                  key={college._id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition card-hover"
                >
                  {/* College Image */}
                  <div className="h-48 relative overflow-hidden">
                    <img 
                      src={college.image} 
                      alt={college.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                      <i className="fas fa-star text-yellow-400"></i>
                      <span className="font-semibold text-gray-800">{college.rating}</span>
                    </div>
                  </div>
                  
                  {/* College Info */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                      {college.name}
                    </h3>
                    <p className="text-gray-500 flex items-center gap-2 mb-4">
                      <i className="fas fa-map-marker-alt text-[#2A8EA0]"></i>
                      {college.location}
                    </p>
                    
                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                      <div className="flex gap-2">
                        {category && (
                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                            {category.name}
                          </span>
                        )}
                      </div>
                      <button 
                        onClick={openLeadForm}
                        className="gradient-bg text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition text-sm"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-university text-4xl text-gray-400"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Colleges Found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Try adjusting your filters or search for a different term.
              </p>
              <Link 
                href="/"
                className="inline-flex items-center mt-6 text-[#2A8EA0] font-medium hover:underline"
              >
                <i className="fas fa-arrow-left mr-2"></i> Back to Home
              </Link>
            </div>
          )}
        </div>

        {/* Browse Categories */}
        <div className="max-w-7xl mx-auto px-4 py-8 border-t border-gray-200 mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Browse by Category</h3>
          <div className="flex flex-wrap gap-3">
            {courseCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/search?category=${cat.slug}${city ? `&city=${city}` : ''}`}
                className={`px-4 py-2 rounded-full transition shadow-sm ${
                  cat.slug === categorySlug 
                    ? 'bg-[#2A8EA0] text-white' 
                    : 'bg-white text-gray-700 hover:bg-purple-100 hover:text-purple-700'
                }`}
              >
                <i className={`${cat.icon} mr-2`}></i>
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Browse Cities */}
        <div className="max-w-7xl mx-auto px-4 py-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Browse by City</h3>
          <div className="flex flex-wrap gap-3">
            {cities.slice(0, 15).map((c) => (
              <Link
                key={c}
                href={`/search?city=${c}${category ? `&category=${categorySlug}` : ''}`}
                className={`px-4 py-2 rounded-full transition shadow-sm ${
                  c === city 
                    ? 'bg-[#2A8EA0] text-white' 
                    : 'bg-white text-gray-700 hover:bg-purple-100 hover:text-purple-700'
                }`}
              >
                <i className="fas fa-map-marker-alt mr-2"></i>
                {c}
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <LeadForm />
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-[#2A8EA0] mb-4"></i>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
