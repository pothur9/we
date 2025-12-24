"use client";

export default function CTA() {
  const openLeadForm = () => {
    window.dispatchEvent(new Event('openLeadForm'));
  };

  return (
    <section className="py-20 px-4 gradient-bg relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full"></div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Start Your Journey?
        </h2>
        <p className="text-xl text-purple-100 mb-8">
          Get personalized college recommendations based on your preferences
        </p>
        <button 
          onClick={openLeadForm}
          className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition"
        >
          Get Free Counseling <i className="fas fa-arrow-right ml-2"></i>
        </button>
      </div>
    </section>
  );
}
