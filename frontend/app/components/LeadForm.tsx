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
    email: "",
    phone: "",
    course: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
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
    const newErrors = { name: "", email: "", phone: "", course: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
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
            setFormData({ name: "", email: "", phone: "", course: "" });
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
        href="https://wa.me/919995013250"
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
            <div className="gradient-bg rounded-t-2xl p-4 relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-white/80 hover:text-white transition-colors"
                aria-label="Close"
              >
                <i className="fas fa-times text-lg"></i>
              </button>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <i className="fas fa-graduation-cap text-white text-xl"></i>
                </div>
                <h2 className="text-xl font-bold text-white">Get Free Counselling</h2>
                <p className="text-purple-100 text-sm mt-1">Fill in your details for expert guidance</p>
              </div>
            </div>

            {/* Form Body */}
            <div className="p-4">
              {isSubmitted ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i className="fas fa-check text-green-500 text-3xl"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Thank You!</h3>
                  <p className="text-gray-600 text-sm mt-1">Our counsellor will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <i className="fas fa-user absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className={`w-full pl-10 pr-3 py-2.5 text-sm border ${
                          errors.name ? "border-red-500" : "border-gray-200"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                      />
                    </div>
                    {errors.name && <p className="text-red-500 text-xs mt-0.5">{errors.name}</p>}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <i className="fas fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className={`w-full pl-10 pr-3 py-2.5 text-sm border ${
                          errors.email ? "border-red-500" : "border-gray-200"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-0.5">{errors.email}</p>}
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label htmlFor="phone" className="block text-xs font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <i className="fas fa-phone absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        maxLength={10}
                        className={`w-full pl-10 pr-3 py-2.5 text-sm border ${
                          errors.phone ? "border-red-500" : "border-gray-200"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-0.5">{errors.phone}</p>}
                  </div>

                  {/* Course Field */}
                  <div>
                    <label htmlFor="course" className="block text-xs font-medium text-gray-700 mb-1">
                      Course Interested In <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <i className="fas fa-book absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                      <select
                        id="course"
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-8 py-2.5 text-sm border ${
                          errors.course ? "border-red-500" : "border-gray-200"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none transition-all`}
                      >
                        <option value="">Select a course</option>
                        <optgroup label="Core Medical Degrees">
                          <option value="MBBS">MBBS</option>
                          <option value="BDS">BDS (Dental)</option>
                          <option value="BAMS">BAMS (Ayurveda)</option>
                          <option value="BHMS">BHMS (Homeopathy)</option>
                          <option value="BUMS">BUMS (Unani)</option>
                          <option value="BVSc">BVSc & AH (Veterinary)</option>
                        </optgroup>
                        <optgroup label="Nursing">
                          <option value="B.Sc Nursing">B.Sc Nursing</option>
                          <option value="GNM">GNM Nursing</option>
                          <option value="ANM">ANM (Auxiliary Nursing)</option>
                          <option value="M.Sc Nursing">M.Sc Nursing</option>
                        </optgroup>
                        <optgroup label="Pharmacy">
                          <option value="B.Pharm">B.Pharm</option>
                          <option value="D.Pharm">D.Pharm</option>
                          <option value="M.Pharm">M.Pharm</option>
                          <option value="Pharm.D">Pharm.D</option>
                        </optgroup>
                        <optgroup label="Therapy & Rehabilitation">
                          <option value="BPT">BPT (Physiotherapy)</option>
                          <option value="MPT">MPT (Master of Physiotherapy)</option>
                          <option value="BOT">BOT (Occupational Therapy)</option>
                          <option value="MOT">MOT (Occupational Therapy)</option>
                          <option value="BASLP">BASLP (Speech & Audiology)</option>
                        </optgroup>
                        <optgroup label="Medical Lab & Diagnostics">
                          <option value="B.Sc MLT">B.Sc MLT (Lab Technology)</option>
                          <option value="DMLT">DMLT (Diploma in MLT)</option>
                          <option value="B.Sc Radiology">B.Sc Radiology</option>
                          <option value="B.Sc Medical Imaging">B.Sc Medical Imaging</option>
                        </optgroup>
                        <optgroup label="Cardiovascular & Critical Care">
                          <option value="B.Sc CVT">B.Sc Cardiovascular Technology</option>
                          <option value="B.Sc Perfusion">B.Sc Perfusion Technology</option>
                          <option value="B.Sc Dialysis">B.Sc Dialysis Technology</option>
                          <option value="B.Sc Respiratory">B.Sc Respiratory Therapy</option>
                        </optgroup>
                        <optgroup label="Specialized Technology">
                          <option value="B.Sc OTT">B.Sc Operation Theatre Tech</option>
                          <option value="B.Sc NEP">B.Sc Neuro Electro Physiology</option>
                          <option value="B.Sc Nuclear Medicine">B.Sc Nuclear Medicine</option>
                          <option value="B.Sc Radiotherapy">B.Sc Radiotherapy Technology</option>
                        </optgroup>
                        <optgroup label="Public Health & Management">
                          <option value="MPH">MPH (Public Health)</option>
                          <option value="MHA">MHA (Hospital Administration)</option>
                          <option value="MBA Hospital Admin">MBA Hospital Administration</option>
                          <option value="Health Informatics">Health Informatics</option>
                          <option value="Medical Coding">Medical Coding</option>
                        </optgroup>
                        <optgroup label="Research & Forensic">
                          <option value="Clinical Research">Clinical Research</option>
                          <option value="Forensic Science">Forensic Science</option>
                          <option value="Biomedical Engineering">Biomedical Engineering</option>
                        </optgroup>
                        <optgroup label="Optometry & Vision">
                          <option value="B.Optom">B.Optom</option>
                          <option value="M.Optom">M.Optom</option>
                        </optgroup>
                        <optgroup label="Certificate Courses">
                          <option value="CNA">CNA (Certified Nursing Assistant)</option>
                          <option value="Phlebotomy">Phlebotomy Technician</option>
                          <option value="ECG Technician">ECG Technician</option>
                          <option value="EMT">EMT (Emergency Medical Tech)</option>
                        </optgroup>
                        <optgroup label="PG Specializations">
                          <option value="MD">MD (Doctor of Medicine)</option>
                          <option value="MS">MS (Master of Surgery)</option>
                          <option value="MDS">MDS (Dental Surgery)</option>
                          <option value="M.Ch">M.Ch (Super Specialization)</option>
                        </optgroup>
                      </select>
                      <i className="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none"></i>
                    </div>
                    {errors.course && <p className="text-red-500 text-xs mt-0.5">{errors.course}</p>}
                  </div>

                  {/* Error Message */}
                  {submitError && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg text-xs mt-2">
                      <i className="fas fa-exclamation-circle mr-1"></i>
                      {submitError}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full gradient-bg text-white py-3 rounded-lg font-semibold text-sm hover:shadow-lg transition-all mt-3 ${
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

                  <p className="text-center text-xs text-gray-500 mt-2">
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
