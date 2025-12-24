export default function Features() {
  const features = [
    {
      icon: "fa-university",
      title: "50K+ Colleges",
      description: "Comprehensive database of colleges across India"
    },
    {
      icon: "fa-chart-line",
      title: "Live Rankings",
      description: "Updated rankings based on multiple parameters"
    },
    {
      icon: "fa-comments",
      title: "Expert Counseling",
      description: "Free guidance from education experts"
    },
    {
      icon: "fa-file-alt",
      title: "Easy Applications",
      description: "Apply to multiple colleges with one form"
    }
  ];

  return (
    <section id="features" className="py-20 px-4 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose We For Uni?</h2>
          <p className="text-xl text-gray-600">Your complete guide to higher education</p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center card-hover bg-white p-6 rounded-2xl border border-gray-100">
              <div className="feature-icon w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4">
                <i className={`fas ${feature.icon} text-purple-600 text-3xl`}></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
