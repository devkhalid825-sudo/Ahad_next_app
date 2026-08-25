'use client';

import React, { useState, useRef } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { SiCalendly } from 'react-icons/si';
import { apiCall } from '@/utils/api';

const Contact = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const [formData, setFormData] = useState({
    interest: 'Discussing a Production',
    user_name: '',
    user_company: '',
    user_email: '',
    user_phone: '',
    user_source: '',
    message: '',
  });

  const validateField = (name, value) => {
    switch (name) {
      case 'user_name':
        if (!value || value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'user_email':
        if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
        return '';
      case 'user_phone':
        if (!value || !/^\+?[\d\s\-()]{7,15}$/.test(value)) return 'Please enter a valid phone number';
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
    const fieldsToValidate = ['user_name', 'user_email', 'user_phone', 'message'];
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
    let { name, value } = e.target;
    if (name === 'user_phone') {
      value = value.replace(/\D/g, '');
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleInterestSelect = (interest) => {
    setFormData((prev) => ({ ...prev, interest }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setTouched({});

    if (!validateForm()) return;

    const payload = { ...formData };

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const { data, status } = await apiCall('/contact/contact', 'POST', payload);

      if (status === 200) {
        setSubmitStatus('success');
        setFormData({
          interest: 'Discussing a Production',
          user_name: '',
          user_company: '',
          user_email: '',
          user_phone: '',
          user_source: '',
          message: '',
        });
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
      <div className="mx-auto px-6 md:px-16 max-w-8xl">
        <h2 className="text-2xl md:text-4xl lg:text-[44px] font-medium mb-6 md:mb-10 tracking-tight leading-[1.1]">
          Contact Us
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">
          <div className="flex flex-col justify-center items-center lg:items-start h-full pt-4 lg:pt-0 pb-8 xl:pb-0 xl:pl-12">
            <h3 className="text-2xl lg:text-4xl xl:text-5xl md:font-medium font-light leading-[1.2] tracking-tight text-left">
              Let’s build something remarkable.
            </h3>
            <h3 className="mt-4 text-sm lg:text-2xl xl:text-3xl font-light leading-relaxed tracking-tight text-left text-gray-300">
              Share your project details and we’ll craft an experience your audience will remember.
            </h3>
          </div>

          <div className="bg-[#0c0c0c] rounded-[2rem] md:rounded-[3rem] p-5 md:p-12 py-8 md:py-10 relative border border-white/10 w-full">
            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
              <input type="hidden" name="interest" value={formData.interest} />

              <div className="space-y-6">
                <p className="text-white text-base md:text-lg lg:text-xl font-medium">I'm interested in...</p>
                <div className="space-y-3 md:space-y-4">
                  <button
                    type="button"
                    onClick={() => handleInterestSelect('Discussing a Production')}
                    className={`w-full px-5 py-3 md:px-6 md:py-3 rounded-full border md:text-sm text-[13px] transition-all ${
                      formData.interest === 'Discussing a Production'
                        ? 'bg-white text-black border-white'
                        : 'border-white/20 hover:bg-white/10'
                    }`}
                  >
                    Discussing a Production
                  </button>
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <button
                      type="button"
                      onClick={() => handleInterestSelect('Get a Quote')}
                      className={`px-5 py-3 md:px-6 md:py-3 rounded-full border md:text-sm text-[13px] transition-all ${
                        formData.interest === 'Get a Quote'
                          ? 'bg-white text-black border-white'
                          : 'border-white/20 hover:bg-white/10'
                      }`}
                    >
                      Get a Quote
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInterestSelect('Other')}
                      className={`px-5 py-3 md:px-6 md:py-3 rounded-full border md:text-sm text-[13px] transition-all ${
                        formData.interest === 'Other'
                          ? 'bg-white text-black border-white'
                          : 'border-white/20 hover:bg-white/10'
                      }`}
                    >
                      Other
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:gap-x-10 md:gap-y-6 gap-x-5 gap-y-4 pt-4">
                <div className="space-y-2">
                  <label htmlFor="user_name" className="text-sm font-medium text-gray-300">
                    Name
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
                  <label htmlFor="user_company" className="text-sm font-medium text-gray-300">
                    Company
                  </label>
                  <input
                    id="user_company"
                    type="text"
                    name="user_company"
                    value={formData.user_company}
                    onChange={handleInputChange}
                    className="w-full bg-white/15 border border-white/40 rounded-lg px-4 py-3 focus:border-[#4169E1] outline-none transition-colors text-sm md:text-base"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="user_email" className="text-sm font-medium text-gray-300">
                    Email
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
                  <label htmlFor="user_phone" className="text-sm font-medium text-gray-300">
                    Phone Number
                  </label>
                  <input
                    id="user_phone"
                    type="tel"
                    name="user_phone"
                    value={formData.user_phone}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full bg-white/15 border rounded-lg px-4 py-3 focus:border-[#4169E1] outline-none transition-colors text-sm md:text-base ${
                      errors.user_phone && touched.user_phone ? 'border-red-500' : 'border-white/40'
                    }`}
                  />
                  {errors.user_phone && touched.user_phone && (
                    <p className="text-red-400 text-xs mt-1">{errors.user_phone}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="user_source" className="text-sm font-medium text-gray-300">
                  How did you hear about us?
                </label>
                <div className="relative border-b border-gray-500/80">
                  <select
                    id="user_source"
                    name="user_source"
                    value={formData.user_source}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/30 rounded-lg py-3 px-4 focus:border-[#4169E1] outline-none transition-colors text-sm md:text-base appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-black">
                      Select an option
                    </option>
                    <option value="social" className="bg-black">
                      Social Media
                    </option>
                    <option value="referral" className="bg-black">
                      Referral
                    </option>
                    <option value="other" className="bg-black">
                      Other
                    </option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 md:pb-12 pb-4">
                <label htmlFor="message" className="text-sm font-medium text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="2"
                  value={formData.message}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full bg-white/10 border rounded-lg py-3 px-4 focus:border-[#4169E1] outline-none transition-colors text-sm md:text-base resize-none ${
                    errors.message && touched.message ? 'border-red-500' : 'border-white/30'
                  }`}
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
                  {isSubmitting ? 'Sending...' : 'Submit'}
                </button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-center text-gray-400 text-sm mb-6">Or reach out directly for a quicker response</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href="https://wa.me/923471245257"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-4 bg-[#25D366]/5 hover:bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/20 py-4 md:py-5 px-5 md:px-8 rounded-2xl transition-all duration-300 group"
                >
                  <FaWhatsapp className="w-6 h-6 md:w-7 md:h-7 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-left">
                    <p className="text-[11px] text-[#25D366]/70 font-semibold tracking-wider uppercase">Quick Chat</p>
                    <p className="text-base font-bold text-white">Message on WhatsApp</p>
                  </div>
                </a>

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
                  ? 'Your inquiry has been sent successfully. We will reach out to you within 24 hours.'
                  : 'We encountered an issue submitting your form. Please try again or reach out to us via WhatsApp.'}
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
