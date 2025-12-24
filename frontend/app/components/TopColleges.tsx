"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface College {
  _id: string;
  name: string;
  location: string;
  city: string;
  rating: number;
  image: string;
}

const API_URL = "http://localhost:9000/api/colleges";

// Color variations for cards
const cardColors = [
  { gradient: "from-blue-400 to-blue-600", iconColor: "text-blue-600" },
  { gradient: "from-green-400 to-green-600", iconColor: "text-green-600" },
  { gradient: "from-red-400 to-red-600", iconColor: "text-red-600" },
  { gradient: "from-purple-400 to-purple-600", iconColor: "text-purple-600" },
  { gradient: "from-orange-400 to-orange-600", iconColor: "text-orange-600" },
  { gradient: "from-teal-400 to-teal-600", iconColor: "text-teal-600" },
];

export default function TopColleges() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await fetch(`${API_URL}?limit=6`);
        const data = await response.json();
        if (data.success) {
          setColleges(data.data);
        }
      } catch (error) {
        console.error("Error fetching colleges:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  return (
    <section id="colleges" className="py-20 px-4 bg-gray-50 scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Top Colleges</h2>
            <p className="text-xl text-gray-600">Explore the best institutions in Karnataka</p>
          </div>
          <Link 
            href="/search"
            className="text-purple-600 font-semibold hover:text-purple-700 flex items-center"
          >
            View All <i className="fas fa-arrow-right ml-2"></i>
          </Link>
        </div>
        
        {loading ? (
          <div className="text-center py-16">
            <i className="fas fa-spinner fa-spin text-4xl text-[#2A8EA0] mb-4"></i>
            <p className="text-gray-600">Loading colleges...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {colleges.slice(0, 6).map((college, index) => {
              const colors = cardColors[index % cardColors.length];
              return (
                <div key={college._id} className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover">
                  <div className={`relative h-48 bg-gradient-to-br ${colors.gradient}`}>
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                        <i className="fas fa-star text-yellow-400"></i> {college.rating}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-lg">
                        <i className={`fas fa-university ${colors.iconColor} text-2xl`}></i>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 line-clamp-1">{college.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 flex items-center gap-2">
                      <i className="fas fa-map-marker-alt text-[#2A8EA0]"></i>
                      {college.location}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full">
                        {college.city}
                      </span>
                      <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                        Top Rated
                      </span>
                    </div>
                    <Link 
                      href={`/search?q=${encodeURIComponent(college.name)}`}
                      className="w-full gradient-bg text-white py-3 rounded-xl font-semibold hover:shadow-lg transition block text-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {/* Mobile View All Button */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/search"
            className="inline-flex items-center gradient-bg text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition"
          >
            View All Colleges <i className="fas fa-arrow-right ml-2"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
