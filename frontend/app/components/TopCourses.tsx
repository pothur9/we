"use client";

import { courseCategories } from "../data/courseData";

// Medical category slugs to highlight
const medicalSlugs = ["medical", "nursing", "pharmacy", "physiotherapy", "allied-health"];

// Color mappings for all categories
const categoryColors: { [key: string]: { bg: string; iconColor: string; border: string } } = {
  // Medical categories - more vibrant colors
  "medical": { bg: "from-red-200 to-red-300", iconColor: "text-red-700", border: "border-red-400" },
  "nursing": { bg: "from-pink-200 to-pink-300", iconColor: "text-pink-700", border: "border-pink-400" },
  "pharmacy": { bg: "from-purple-200 to-purple-300", iconColor: "text-purple-700", border: "border-purple-400" },
  "physiotherapy": { bg: "from-teal-200 to-teal-300", iconColor: "text-teal-700", border: "border-teal-400" },
  "allied-health": { bg: "from-cyan-200 to-cyan-300", iconColor: "text-cyan-700", border: "border-cyan-400" },
  
  // Other categories - lighter colors
  "mba": { bg: "from-blue-50 to-blue-100", iconColor: "text-blue-600", border: "border-blue-200" },
  "engineering": { bg: "from-indigo-50 to-indigo-100", iconColor: "text-indigo-600", border: "border-indigo-200" },
  "design": { bg: "from-yellow-50 to-yellow-100", iconColor: "text-yellow-600", border: "border-yellow-200" },
  "law": { bg: "from-violet-50 to-violet-100", iconColor: "text-violet-600", border: "border-violet-200" },
  "hospitality-travel": { bg: "from-orange-50 to-orange-100", iconColor: "text-orange-600", border: "border-orange-200" },
  "mass-communication-media": { bg: "from-rose-50 to-rose-100", iconColor: "text-rose-600", border: "border-rose-200" },
  "business-management": { bg: "from-green-50 to-green-100", iconColor: "text-green-600", border: "border-green-200" },
  "it-software": { bg: "from-sky-50 to-sky-100", iconColor: "text-sky-600", border: "border-sky-200" },
  "humanities-social-science": { bg: "from-amber-50 to-amber-100", iconColor: "text-amber-600", border: "border-amber-200" },
  "arts": { bg: "from-fuchsia-50 to-fuchsia-100", iconColor: "text-fuchsia-600", border: "border-fuchsia-200" },
  "science": { bg: "from-emerald-50 to-emerald-100", iconColor: "text-emerald-600", border: "border-emerald-200" },
  "architecture-planning": { bg: "from-slate-50 to-slate-100", iconColor: "text-slate-600", border: "border-slate-200" },
  "accounting-commerce": { bg: "from-lime-50 to-lime-100", iconColor: "text-lime-600", border: "border-lime-200" },
  "teaching-education": { bg: "from-amber-50 to-amber-100", iconColor: "text-amber-600", border: "border-amber-200" },
};

export default function TopCourses() {
  const openLeadForm = () => {
    window.dispatchEvent(new Event('openLeadForm'));
  };

  // Separate medical and other courses
  const medicalCourses = courseCategories.filter(cat => medicalSlugs.includes(cat.slug));
  const otherCourses = courseCategories.filter(cat => !medicalSlugs.includes(cat.slug));

  return (
    <section id="courses" className="py-20 px-4 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">All Course Categories</h2>
          <p className="text-xl text-gray-600">Explore comprehensive courses across all streams</p>
        </div>

        {/* Medical & Healthcare Courses - Highlighted Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <i className="fas fa-heartbeat text-red-600"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Medical & Healthcare</h3>
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">Featured</span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {medicalCourses.map((category) => {
              const colors = categoryColors[category.slug] || { 
                bg: "from-red-100 to-red-200", 
                iconColor: "text-red-600",
                border: "border-red-300"
              };
              
              return (
                <button 
                  key={category.slug}
                  onClick={openLeadForm}
                  className={`relative bg-gradient-to-br ${colors.bg} p-5 rounded-xl text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 ${colors.border} group`}
                >
                  {/* Medical Badge */}
                  <div className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                    <i className="fas fa-star text-white text-xs"></i>
                  </div>
                  
                  <div className={`w-14 h-14 mx-auto mb-3 bg-white rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow`}>
                    <i className={`${category.icon} text-2xl ${colors.iconColor}`}></i>
                  </div>
                  <h3 className="font-bold text-sm mb-1">{category.name}</h3>
                  <p className="text-xs text-gray-600">{category.courses.length} Courses</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-6 text-gray-500 font-medium">Other Courses</span>
          </div>
        </div>

        {/* Other Courses Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {otherCourses.map((category) => {
            const colors = categoryColors[category.slug] || { 
              bg: "from-gray-50 to-gray-100", 
              iconColor: "text-gray-600",
              border: "border-gray-200"
            };
            
            return (
              <button 
                key={category.slug}
                onClick={openLeadForm}
                className={`relative bg-gradient-to-br ${colors.bg} p-4 rounded-xl text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg border ${colors.border} group`}
              >
                <div className={`w-12 h-12 mx-auto mb-3 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow`}>
                  <i className={`${category.icon} text-xl ${colors.iconColor}`}></i>
                </div>
                <h3 className="font-semibold text-sm mb-1 line-clamp-2">{category.name}</h3>
                <p className="text-xs text-gray-500">{category.courses.length} Courses</p>
              </button>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="mt-12 text-center">
          <button
            onClick={openLeadForm}
            className="inline-flex items-center gradient-bg text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition"
          >
            <i className="fas fa-graduation-cap mr-2"></i>
            Get Free Counselling <i className="fas fa-arrow-right ml-2"></i>
          </button>
        </div>
      </div>
    </section>
  );
}
