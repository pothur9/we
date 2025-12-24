"use client";

import { useState, useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000";

export default function LeadForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    course: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    course: "",
  });

  // Auto-open form after 60 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 60000); // 60 seconds

    return () => clearTimeout(timer);
  }, []);

  // Listen for custom event to open form from other components
  useEffect(() => {
    const handleOpenForm = () => setIsOpen(true);
    window.addEventListener('openLeadForm', handleOpenForm);
    return () => window.removeEventListener('openLeadForm', handleOpenForm);
  }, []);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", phone: "", course: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^[6-9][0-9]{9}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit Indian mobile number";
      isValid = false;
    }

    if (!formData.course) {
      newErrors.course = "Please select a course";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    
    if (validateForm()) {
      setIsLoading(true);
      
      try {
        const response = await fetch(`${API_URL}/api/leads`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (data.success) {
          setIsSubmitted(true);
          
          // Reset form after 3 seconds and close
          setTimeout(() => {
            setIsSubmitted(false);
            setIsOpen(false);
            setFormData({ name: "", phone: "", course: "" });
          }, 3000);
        } else {
          setSubmitError(data.message || "Failed to submit. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting lead:", error);
        setSubmitError("Network error. Please check your connection and try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Only allow digits for phone field
    if (name === "phone") {
      const numericValue = value.replace(/[^0-9]/g, "");
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <>
      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/917892343128"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-6 z-50 w-14 h-14 bg-green-500 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 hover:bg-green-600 transition-all duration-300"
        aria-label="Chat on WhatsApp"
      >
        <i className="fab fa-whatsapp text-white text-3xl"></i>
      </a>

      {/* Lead Form Floating Icon Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 gradient-bg rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 animate-pulse-glow"
        aria-label="Open Lead Form"
      >
        <i className="fas fa-graduation-cap text-white text-2xl"></i>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          {/* Modal */}
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform animate-modal-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="gradient-bg rounded-t-2xl p-6 relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                aria-label="Close"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-graduation-cap text-white text-3xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-white">Get Free Counselling</h2>
                <p className="text-purple-100 mt-2">Fill in your details and we&apos;ll help you find the perfect course</p>
              </div>
            </div>

            {/* Form Body */}
            <div className="p-6">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-check text-green-500 text-4xl"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Thank You!</h3>
                  <p className="text-gray-600 mt-2">Our counsellor will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className={`w-full pl-12 pr-4 py-3 border ${
                          errors.name ? "border-red-500" : "border-gray-200"
                        } rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                      />
                    </div>
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <i className="fas fa-phone absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        maxLength={10}
                        className={`w-full pl-12 pr-4 py-3 border ${
                          errors.phone ? "border-red-500" : "border-gray-200"
                        } rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>

                  {/* Course Field */}
                  <div>
                    <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
                      Course Interested In <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <i className="fas fa-book absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                      <select
                        id="course"
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-4 py-3 border ${
                          errors.course ? "border-red-500" : "border-gray-200"
                        } rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none transition-all`}
                      >
                        <option value="">Select a course</option>
                        <option value="ENGINEERING">Engineering</option>
                        <option value="MBA">MBA</option>
                        <option value="MCA">MCA</option>
                        <option value="B.Sc Nursing">B.Sc Nursing</option>
                        <option value="General Nursing">General Nursing</option>
                        <option value="BCA">BCA</option>
                        <option value="BBA">BBA</option>
                        <option value="B.Com">B.Com</option>
                        <option value="BSc">BSc</option>
                        <option value="M.Tech">M.Tech</option>
                        <option value="B.Pharm">B.Pharm</option>
                        <option value="B.Optom">B.Optom</option>
                        <option value="BASLP">BASLP</option>
                        <option value="BPT">BPT</option>
                        <option value="BOT">BOT</option>
                        <option value="Pharm D">Pharm D</option>
                        <option value="MD">MD</option>
                        <option value="MS">MS</option>
                        <option value="MDS">MDS</option>
                        <option value="M.Phil">M.Phil</option>
                        <option value="M.Sc">M.Sc</option>
                        <option value="MOT">MOT</option>
                        <option value="M.Pharm">M.Pharm</option>
                        <option value="MPT">MPT</option>
                        <option value="Post Basic Diploma">Post Basic Diploma</option>
                        <option value="Post Graduate Diploma">Post Graduate Diploma</option>
                        <option value="M.Ch">M.Ch</option>
                        <option value="BA">BA</option>
                        <option value="M.Com">M.Com</option>
                        <option value="MSW">MSW</option>
                        <option value="BA LLB">BA LLB</option>
                        <option value="BHM">BHM</option>
                        <option value="GNM">GNM</option>
                      </select>
                      <i className="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                    </div>
                    {errors.course && <p className="text-red-500 text-sm mt-1">{errors.course}</p>}
                  </div>

                  {/* Error Message */}
                  {submitError && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm mt-4">
                      <i className="fas fa-exclamation-circle mr-2"></i>
                      {submitError}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full gradient-bg text-white py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all transform hover:scale-[1.02] mt-6 ${
                      isLoading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Get Free Counselling <i className="fas fa-arrow-right ml-2"></i>
                      </>
                    )}
                  </button>

                  <p className="text-center text-sm text-gray-500 mt-4">
                    <i className="fas fa-lock mr-1"></i> Your information is 100% secure
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
