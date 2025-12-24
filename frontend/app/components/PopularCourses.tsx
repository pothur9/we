import Link from "next/link";
import { courseCategories } from "../data/courseData";

// Color mappings for each category
const categoryColors: { [key: string]: { bg: string; iconColor: string } } = {
  "mba": { bg: "from-blue-50 to-blue-100", iconColor: "text-blue-600" },
  "engineering": { bg: "from-indigo-50 to-indigo-100", iconColor: "text-indigo-600" },
  "medical": { bg: "from-red-50 to-red-100", iconColor: "text-red-600" },
  "design": { bg: "from-yellow-50 to-yellow-100", iconColor: "text-yellow-600" },
  "law": { bg: "from-purple-50 to-purple-100", iconColor: "text-purple-600" },
  "hospitality-travel": { bg: "from-orange-50 to-orange-100", iconColor: "text-orange-600" },
  "mass-communication-media": { bg: "from-pink-50 to-pink-100", iconColor: "text-pink-600" },
  "business-management": { bg: "from-green-50 to-green-100", iconColor: "text-green-600" },
  "it-software": { bg: "from-cyan-50 to-cyan-100", iconColor: "text-cyan-600" },
  "humanities-social-science": { bg: "from-rose-50 to-rose-100", iconColor: "text-rose-600" },
  "arts": { bg: "from-fuchsia-50 to-fuchsia-100", iconColor: "text-fuchsia-600" },
  "science": { bg: "from-teal-50 to-teal-100", iconColor: "text-teal-600" },
  "architecture-planning": { bg: "from-slate-50 to-slate-100", iconColor: "text-slate-600" },
  "accounting-commerce": { bg: "from-emerald-50 to-emerald-100", iconColor: "text-emerald-600" },
  "teaching-education": { bg: "from-amber-50 to-amber-100", iconColor: "text-amber-600" },
  "nursing": { bg: "from-sky-50 to-sky-100", iconColor: "text-sky-600" },
};

export default function PopularCourses() {
  return (
    <section id="courses" className="py-20 px-4 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Courses</h2>
          <p className="text-xl text-gray-600">Explore courses across various streams</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {courseCategories.map((category) => {
            const colors = categoryColors[category.slug] || { bg: "from-gray-50 to-gray-100", iconColor: "text-gray-600" };
            return (
              <Link 
                key={category.slug}
                href={`/search?category=${category.slug}`}
                className={`bg-gradient-to-br ${colors.bg} p-6 rounded-2xl card-hover text-center cursor-pointer block transition-transform hover:scale-105`}
              >
                <i className={`${category.icon} text-4xl ${colors.iconColor} mb-4`}></i>
                <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.courses.length} Courses</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
