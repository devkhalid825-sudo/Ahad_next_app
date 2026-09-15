'use client';

import React, { useState, useRef } from 'react';
import { SiCalendly } from '@/components/ui/Icons';
import { apiCall } from '@/utils/api';

const PILLARS = [
  { id: 'configurators', label: 'Interactive 3D Web & Product Configurators' },
  { id: 'archviz', label: 'Real-Time ArchViz & Spatial VR/AR' },
  { id: 'commercial', label: 'Cinematic 3D Product & Commercial Visuals' },
];

const Contact = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [selectedPillars, setSelectedPillars] = useState([]);

  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_company: '',
    message: '',
  });

  const togglePillar = (id) => {
    setSelectedPillars((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'user_name':
        if (!value || value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'user_email':
        if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
        return '';
      case 'message':
        if (!value || value.trim().length < 10) return 'Message must be at least 10 characters';
        return '';
      default:
        return '';
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const validateForm = () => {
    const newErrors = {};
    const fieldsToValidate = ['user_name', 'user_email', 'message'];
    fieldsToValidate.forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    const allTouched = {};
    Object.keys(formData).forEach((key) => {
      allTouched[key] = true;
    });
    setTouched(allTouched);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setTouched({});

    if (!validateForm()) return;

    const pillarsJoined = selectedPillars
      .map((id) => PILLARS.find((p) => p.id === id)?.label)
      .filter(Boolean)
      .join(', ');

    const payload = {
      ...formData,
      interest: pillarsJoined,
    };

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const { data, status } = await apiCall('/contact/contact', 'POST', payload);

      if (status === 200) {
        setSubmitStatus('success');
        setFormData({
          user_name: '',
          user_email: '',
          user_company: '',
          message: '',
        });
        setSelectedPillars([]);
        setErrors({});
        setTouched({});
      } else {
        console.error('Backend Error:', data?.message || data?.error);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Network Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setSubmitStatus(null);
  };

  return (
    <section id="contact" className="py-10 md:py-16 bg-black text-white overflow-hidden">
      <div className="mx-auto px-4 sm:px-6 md:px-16 max-w-8xl">
        <h2 className="text-2xl md:text-4xl lg:text-[44px] font-medium mb-6 md:mb-10 tracking-tight leading-[1.1] text-center sm:text-left">
          Contact Us
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">
          <div className="flex flex-col justify-center items-center text-center lg:items-start lg:text-left h-full pt-2 lg:pt-0 pb-6 xl:pb-0 xl:pl-12">
            <h3 className="text-2xl lg:text-4xl xl:text-5xl md:font-medium font-light leading-[1.2] tracking-tight">
              Let’s build something remarkable.
            </h3>
            <h3 className="mt-3 sm:mt-4 text-xs sm:text-sm lg:text-2xl xl:text-3xl font-light leading-relaxed tracking-tight text-zinc-300 max-w-lg">
              Share your project details and we’ll craft an experience your audience will remember.
            </h3>
          </div>

          <div className="bg-[#0c0c0c] rounded-2xl sm:rounded-[2rem] md:rounded-[3rem] p-4 sm:p-8 md:p-12 py-6 md:py-10 relative border border-white/10 w-full shadow-2xl">
            <form ref={form} onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-300">
                  What are you exploring? <span className="text-[#4169E1]">(select all that apply)</span>
                </label>
                <div className="space-y-2">
                  {PILLARS.map((pillar) => {
                    const isSelected = selectedPillars.includes(pillar.id);
                    return (
                      <button
                        key={pillar.id}
                        type="button"
                        onClick={() => togglePillar(pillar.id)}
                        aria-pressed={isSelected}
                        className={`w-full flex items-center gap-3 text-left rounded-xl p-3.5 transition-all duration-300 border ${
                          isSelected
                            ? 'bg-[#4169E1]/[0.08] border-[#4169E1]/50'
                            : 'bg-white/[0.03] border-white/[0.08] hover:border-white/20'
                        }`}
                      >
                        <span
                          className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
                            isSelected ? 'bg-[#4169E1] border-[#4169E1]' : 'border-gray-500'
                          }`}
                        >
                          {isSelected && (
                            <svg className="w-2.5 h-2.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </span>
                        <span className="block text-sm font-medium leading-snug text-gray-200">{pillar.label}</span>
                      </button>
                    );
                  })}
                </div>
                {errors.pillars && <p className="text-red-400 text-xs mt-1">{errors.pillars}</p>}
              </div>

              <div className="grid grid-cols-2 md:gap-x-10 md:gap-y-6 gap-x-5 gap-y-4">
                <div className="space-y-2">
                  <label htmlFor="user_name" className="text-sm font-medium text-gray-300">
                    Full Name
                  </label>
                  <input
                    id="user_name"
                    type="text"
                    name="user_name"
                    required
                    value={formData.user_name}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full bg-white/10 border rounded-lg px-4 py-3 focus:border-[#4169E1] outline-none transition-colors text-sm md:text-base placeholder:text-gray-400 ${
                      errors.user_name && touched.user_name ? 'border-red-500' : 'border-white/30'
                    }`}
                    placeholder="Enter your name"
                  />
                  {errors.user_name && touched.user_name && (
                    <p className="text-red-400 text-xs mt-1">{errors.user_name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="user_email" className="text-sm font-medium text-gray-300">
                    Work Email
                  </label>
                  <input
                    id="user_email"
                    type="email"
                    name="user_email"
                    required
                    value={formData.user_email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full bg-white/15 border rounded-lg px-4 py-3 focus:border-[#4169E1] outline-none transition-colors text-sm md:text-base ${
                      errors.user_email && touched.user_email ? 'border-red-500' : 'border-white/40'
                    }`}
                  />
                  {errors.user_email && touched.user_email && (
                    <p className="text-red-400 text-xs mt-1">{errors.user_email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="user_company" className="text-sm font-medium text-gray-300">
                    Company Name
                  </label>
                  <input
                    id="user_company"
                    type="text"
                    name="user_company"
                    value={formData.user_company}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full bg-white/15 border rounded-lg px-4 py-3 focus:border-[#4169E1] outline-none transition-colors text-sm md:text-base ${
                      errors.user_company && touched.user_company ? 'border-red-500' : 'border-white/40'
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-2 md:pb-4 pb-4">
                <label htmlFor="message" className="text-sm font-medium text-gray-300">
                  Project Brief
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full bg-white/10 border rounded-lg py-3 px-4 focus:border-[#4169E1] outline-none transition-colors text-sm md:text-base resize-none ${
                    errors.message && touched.message ? 'border-red-500' : 'border-white/30'
                  }`}
                  placeholder="What are you building? Product type, platforms, timeline — a rough paragraph is enough."
                ></textarea>
                {errors.message && touched.message && (
                  <p className="text-red-400 text-xs mt-1">{errors.message}</p>
                )}
              </div>

              <div className="space-y-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-[#4169E1] hover:bg-[#8ab4ff] text-black md:font-bold py-3.5 md:py-4 rounded-full text-sm md:text-base transition-all transform active:scale-[0.98] ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
                </button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-center text-gray-400 text-sm mb-6">Prefer to talk it through?</p>

              <div className="grid grid-cols-1 gap-4">
                <a
                  href="https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-4 bg-[#4169E1]/5 hover:bg-[#4169E1]/15 text-[#4169E1] border border-[#4169E1]/20 py-4 md:py-5 px-5 md:px-8 rounded-2xl transition-all duration-300 group"
                >
                  <SiCalendly className="w-6 h-6 md:w-7 md:h-7 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-left">
                    <p className="text-[11px] text-[#4169E1]/70 font-semibold tracking-wider uppercase">Direct Booking</p>
                    <p className="text-base font-bold text-white">Schedule an Intro Call</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {submitStatus && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#111111] border border-white/10 rounded-[2rem] p-8 md:p-12 max-w-lg w-full text-center shadow-2xl">
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
                  submitStatus === 'success' ? 'bg-[#4169E1]/20 text-[#4169E1]' : 'bg-red-400/20 text-red-400'
                }`}
              >
                {submitStatus === 'success' ? (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>

              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                {submitStatus === 'success' ? 'Success!' : 'Oops!'}
              </h3>

              <p className="text-gray-400 mb-8 text-sm md:text-base leading-relaxed">
                {submitStatus === 'success'
                  ? 'Your inquiry has been sent successfully. Our lead 3D engineer will reply within 1 business day.'
                  : 'We encountered an issue submitting your form. Please try again or use the chat button below.'}
              </p>

              <button
                onClick={closeModal}
                className="w-full bg-[#4169E1] text-black font-bold py-4 rounded-full transition-transform active:scale-95 hover:bg-[#8ab4ff]"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Contact;