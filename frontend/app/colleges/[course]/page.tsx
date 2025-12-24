import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourseBySlug, getAllCourses } from "../../data/courseData";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

interface PageProps {
  params: Promise<{ course: string }>;
}

interface College {
  _id: string;
  name: string;
  location: string;
  city: string;
  rating: number;
  image: string;
  fees?: string;
}

async function getCollegesFromAPI(category: string): Promise<College[]> {
  try {
    const response = await fetch(`http://localhost:9000/api/colleges?category=${category}&limit=50`, {
      cache: 'no-store'
    });
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching colleges:', error);
    return [];
  }
}

export default async function CollegesPage({ params }: PageProps) {
  const resolvedParams = await params;
  const courseInfo = getCourseBySlug(resolvedParams.course);

  if (!courseInfo) {
    notFound();
  }

  const { course, category } = courseInfo;
  const colleges = await getCollegesFromAPI(category.slug);

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50 pt-24 pb-16">
        {/* Hero Section */}
        <div className="gradient-bg py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <Link 
              href={`/courses/${category.slug}`}
              className="inline-flex items-center text-white/80 hover:text-white mb-4 transition"
            >
              <i className="fas fa-arrow-left mr-2"></i> Back to {category.name}
            </Link>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <i className={`${category.icon} text-3xl text-white`}></i>
              </div>
              <div>
                <p className="text-white/70 text-sm">{category.name}</p>
                <h1 className="text-3xl md:text-4xl font-bold text-white">{course.name}</h1>
                <p className="text-white/80 mt-1">{colleges.length} colleges found</p>
              </div>
            </div>
          </div>
        </div>

        {/* Colleges Grid */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            Top Colleges for {course.name}
          </h2>
          
          {colleges.length > 0 ? (
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
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {college.name}
                    </h3>
                    <p className="text-gray-500 flex items-center gap-2 mb-4">
                      <i className="fas fa-map-marker-alt text-[#2A8EA0]"></i>
                      {college.location}
                    </p>
                    
                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                      <div>
                        <p className="text-xs text-gray-500 uppercase">Fees</p>
                        <p className="font-semibold text-gray-800">{college.fees || 'Contact for fees'}</p>
                      </div>
                      <button className="gradient-bg text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition">
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
                We&apos;re currently updating our database. Please check back later for colleges offering {course.name}.
              </p>
              <Link 
                href={`/courses/${category.slug}`}
                className="inline-flex items-center mt-6 text-[#2A8EA0] font-medium hover:underline"
              >
                <i className="fas fa-arrow-left mr-2"></i> Browse other courses
              </Link>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-gradient-to-r from-[#2A8EA0] to-[#010066] rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">Need Help Choosing?</h3>
            <p className="text-white/80 mb-6 max-w-lg mx-auto">
              Get personalized college recommendations based on your preferences and budget.
            </p>
            <Link 
              href="/#home"
              className="inline-block bg-white text-[#2A8EA0] px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition"
            >
              Get Free Counseling
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// Generate static params for all courses
export async function generateStaticParams() {
  return getAllCourses().map(({ course }) => ({
    course: course.slug,
  }));
}
