import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryBySlug, courseCategories } from "../../data/courseData";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

interface PageProps {
  params: Promise<{ category: string }>;
}

export default async function CoursesPage({ params }: PageProps) {
  const resolvedParams = await params;
  const category = getCategoryBySlug(resolvedParams.category);

  if (!category) {
    notFound();
  }

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
                <i className={`${category.icon} text-3xl text-white`}></i>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">{category.name}</h1>
                <p className="text-white/80 mt-1">{category.courses.length} courses available</p>
              </div>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            Choose a Course
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.courses.map((course) => (
              <Link
                key={course.slug}
                href={`/colleges/${course.slug}`}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition card-hover group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 group-hover:text-[#2A8EA0] transition">
                      {course.name}
                    </h3>
                    <p className="text-gray-500 mt-2 text-sm">
                      Click to view colleges offering this course
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl feature-icon flex items-center justify-center group-hover:bg-[#2A8EA0] transition">
                    <i className={`${category.icon} text-[#2A8EA0] group-hover:text-white transition`}></i>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-[#2A8EA0] font-medium">
                  <span>View Colleges</span>
                  <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Browse Other Categories */}
        <div className="max-w-7xl mx-auto px-4 py-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Browse Other Categories</h3>
          <div className="flex flex-wrap gap-3">
            {courseCategories
              .filter(cat => cat.slug !== category.slug)
              .slice(0, 6)
              .map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/courses/${cat.slug}`}
                  className="px-4 py-2 bg-white rounded-full text-gray-700 hover:bg-purple-100 hover:text-purple-700 transition shadow-sm"
                >
                  <i className={`${cat.icon} mr-2`}></i>
                  {cat.name}
                </Link>
              ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// Generate static params for all categories
export async function generateStaticParams() {
  return courseCategories.map((category) => ({
    category: category.slug,
  }));
}
