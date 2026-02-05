"use client";

export default function Footer() {
  const openLeadForm = () => {
    window.dispatchEvent(new Event('openLeadForm'));
  };

  return (
    <footer id="contact" className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
                <i className="fas fa-graduation-cap text-white"></i>
              </div>
              <span className="text-xl font-bold">We For Uni </span>
            </div>
            <p className="text-gray-400 text-sm">Your trusted partner in finding the perfect college for your future.</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#top-colleges" className="hover:text-white transition">Colleges</a></li>
              <li><a href="#courses" className="hover:text-white transition">Courses</a></li>
              <li><a href="#features" className="hover:text-white transition">Features</a></li>
              <li><a href="#home" className="hover:text-white transition">Home</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><button onClick={openLeadForm} className="hover:text-white transition">Blog</button></li>
              <li><button onClick={openLeadForm} className="hover:text-white transition">News</button></li>
              <li><button onClick={openLeadForm} className="hover:text-white transition">Study Abroad</button></li>
              <li><button onClick={openLeadForm} className="hover:text-white transition">Scholarships</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4 mb-4">
              <button onClick={openLeadForm} className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition">
                <i className="fab fa-facebook-f"></i>
              </button>
              <button onClick={openLeadForm} className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition">
                <i className="fab fa-twitter"></i>
              </button>
              <button onClick={openLeadForm} className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition">
                <i className="fab fa-instagram"></i>
              </button>
            </div>
            <p className="text-gray-400 text-sm">Contact@weforuni.com</p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2026 We For Uni. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
