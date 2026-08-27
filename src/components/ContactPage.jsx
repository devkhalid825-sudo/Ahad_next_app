'use client';

import React, { useEffect, useState, useRef } from 'react';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import CaseStudies from './features/CaseStudies';
import News from './features/News';
import SocialMediaSection from './features/SocialMediaSection';
import Industries from './features/Industries';
import Process from './Process';
import { FaWhatsapp } from 'react-icons/fa';
import { SiCalendly } from 'react-icons/si';

import { apiCall, getImgSrc } from '../utils/api';
import { motion } from 'framer-motion';

import buildingImgRaw from '../assets/images/Background-Image.webp';
const buildingImg = getImgSrc(buildingImgRaw);

const ContactPage = () => {
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
        message: ''
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
        setTouched(prev => ({ ...prev, [name]: true }));
        setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    };

    const validateForm = () => {
        const newErrors = {};
        const fieldsToValidate = ['user_name', 'user_email', 'user_phone', 'message'];
        fieldsToValidate.forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });
        setErrors(newErrors);
        const allTouched = {};
        Object.keys(formData).forEach(key => { allTouched[key] = true; });
        setTouched(allTouched);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        if (name === 'user_phone') {
            value = value.replace(/\D/g, '');
        }
        setFormData(prev => ({ ...prev, [name]: value }));
        if (touched[name]) {
            setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
        }
    };

    const handleInterestSelect = (interest) => {
        setFormData(prev => ({ ...prev, interest }));
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
                    message: ''
                });
                setErrors({});
                setTouched({});

                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    'event': 'form_submission',
                    'form_type': 'contact_page'
                });
            } else {
                console.error('Backend Error:', data.error);
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
        <>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-black text-white min-h-screen"
        >
            <Header />

            {/* SECTION 1: CONNECT WITH US */}
            <section className="pt-32 md:pt-40 pb-24 px-6 md:px-16 max-w-[1750px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-16 xl:gap-24 items-start">
                    {/* Left side text */}
                    <div className="flex flex-col justify-center items-center lg:items-start h-full pt-8 lg:pt-0 pb-12 xl:pb-0 xl:pl-12">
                        <h1 className="text-[#4169E1] text-4xl md:text-[56px] font-bold tracking-tight leading-[1.1] mb-10">
                            Connect with Us
                        </h1>
                        <p className="text-gray-200 text-lg md:text-[21px] font-light leading-relaxed max-w-lg text-left">
                            We would love to hear from you. Share your production needs with us, or drop a note to say hello.
                            Whether you are envisioning something bold or seeking inspiration for AR, VR, AI, or innovative
                            interactive experiences, our team of experts can support you every step of the way.
                        </p>
                    </div>

                    {/* Right side form card */}
                    <div className="bg-[#0c0c0c] rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 py-10 relative border border-white/10 w-full">

                        <form ref={form} onSubmit={handleSubmit} className="space-y-10">
                            {/* Hidden field for interest */}
                            <input type="hidden" name="interest" value={formData.interest} />

                            <div className="space-y-4">
                                <p className="text-white text-lg font-medium">I&apos;m interested in...</p>
                                <div className="space-y-3 md:space-y-4">
                                    <button
                                        type="button"
                                        onClick={() => handleInterestSelect('Discussing a Production')}
                                        className={`w-full px-5 py-3 md:px-6 md:py-3 rounded-full border md:text-sm text-[13px] transition-all ${formData.interest === 'Discussing a Production' ? 'bg-white text-black border-white' : 'border-white/20 hover:bg-white/10'}`}
                                    >
                                        Discussing a Production
                                    </button>
                                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                                        <button
                                            type="button"
                                            onClick={() => handleInterestSelect('Joining the Team')}
                                            className={`px-1 py-3 md:px-6 md:py-3 rounded-full border md:text-sm text-[13px] transition-all ${formData.interest === 'Joining the Team' ? 'bg-white text-black border-white' : 'border-white/20 hover:bg-white/10'}`}
                                        >
                                            Joining the Team
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleInterestSelect('Other')}
                                            className={`px-5 py-3 md:px-6 md:py-3 rounded-full border md:text-sm text-[13px] transition-all ${formData.interest === 'Other' ? 'bg-white text-black border-white' : 'border-white/20 hover:bg-white/10'}`}
                                        >
                                            Other
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:gap-x-12 md:gap-y-10 gap-x-6 gap-y-5 pt-4">

                                <div className="space-y-2">
                                    <label htmlFor="user_name" className="text-sm font-medium text-gray-300">Name</label>
                                    <input
                                        id="user_name"
                                        type="text"
                                        name="user_name"
                                        required
                                        value={formData.user_name}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        className={`w-full bg-white/10 border rounded-lg py-3 px-4 focus:border-[#4169E1] outline-none transition-colors text-sm md:text-base placeholder:text-gray-400 ${errors.user_name && touched.user_name ? 'border-red-500' : 'border-white/30'}`}
                                        placeholder="Enter your name"
                                    />
                                    {errors.user_name && touched.user_name && (
                                        <p className="text-red-400 text-xs mt-1">{errors.user_name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="user_company" className="text-sm font-medium text-gray-300">Company</label>
                                    <input
                                        id="user_company"
                                        type="text"
                                        name="user_company"
                                        value={formData.user_company}
                                        onChange={handleInputChange}
                                        className="w-full bg-white/15 border border-white/40 rounded-lg py-3 px-4 focus:border-[#4169E1] outline-none transition-colors text-sm md:text-base"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="user_email" className="text-sm font-medium text-gray-300">Email</label>
                                    <input
                                        id="user_email"
                                        type="email"
                                        name="user_email"
                                        required
                                        value={formData.user_email}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        className={`w-full bg-white/15 border rounded-lg px-4 py-3 focus:border-[#4169E1] outline-none transition-colors text-sm md:text-base ${errors.user_email && touched.user_email ? 'border-red-500' : 'border-white/40'}`}
                                    />
                                    {errors.user_email && touched.user_email && (
                                        <p className="text-red-400 text-xs mt-1">{errors.user_email}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="user_phone" className="text-sm font-medium text-gray-300">Phone Number</label>
                                    <input
                                        id="user_phone"
                                        type="tel"
                                        name="user_phone"
                                        value={formData.user_phone}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        className={`w-full bg-white/15 border rounded-lg px-4 py-3 focus:border-[#4169E1] outline-none transition-colors text-sm md:text-base ${errors.user_phone && touched.user_phone ? 'border-red-500' : 'border-white/40'}`}
                                    />
                                    {errors.user_phone && touched.user_phone && (
                                        <p className="text-red-400 text-xs mt-1">{errors.user_phone}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="user_source" className="text-sm font-medium text-gray-300">How did you hear about us?</label>
                                <div className="relative border-b border-gray-500/80">
                                    <select
                                        id="user_source"
                                        name="user_source"
                                        value={formData.user_source}
                                        onChange={handleInputChange}
                                        className="w-full bg-white/10 border border-white/30 rounded-lg py-3 px-4 focus:border-[#4169E1] outline-none transition-colors text-sm md:text-base appearance-none cursor-pointer"
                                    >
                                        <option value="" className="bg-black">Select an option</option>
                                        <option value="social" className="bg-black">Social Media</option>
                                        <option value="referral" className="bg-black">Referral</option>
                                        <option value="other" className="bg-black">Other</option>
                                    </select>
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 md:pb-12 pb-4">
                                <label htmlFor="message" className="text-sm font-medium text-gray-300">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="1"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    className={`w-full bg-white/10 border rounded-lg py-3 px-4 focus:border-[#4169E1] outline-none transition-colors text-sm md:text-base resize-none ${errors.message && touched.message ? 'border-red-500' : 'border-white/30'}`}
                                ></textarea>
                                {errors.message && touched.message && (
                                    <p className="text-red-400 text-xs mt-1">{errors.message}</p>
                                )}
                            </div>

                            <div className="space-y-4">

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full bg-[#4169E1] hover:bg-[#8ab4ff] text-black md:font-bold py-4 rounded-full text-sm md:text-base transition-all transform active:scale-[0.98] ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {isSubmitting ? 'Sending...' : 'Submit'}
                                </button>
                            </div>
                        </form>

                        {/* Submission Popup Modal */}
                        {submitStatus && (
                            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
                                <div className="bg-[#0c0c0c] border border-white/10 rounded-[2rem] p-8 md:p-12 max-w-lg w-full text-center shadow-2xl transform animate-in zoom-in-95 duration-300">
                                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${submitStatus === 'success' ? 'bg-[#4169E1]/20 text-[#4169E1]' : 'bg-red-400/20 text-red-400'}`}>
                                        {submitStatus === 'success' ? (
                                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                        ) : (
                                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                                        )}
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                                        {submitStatus === 'success' ? 'Success!' : 'Oops!'}
                                    </h3>

                                    <p className="text-gray-400 mb-8 text-sm md:text-base leading-relaxed">
                                        {submitStatus === 'success'
                                            ? "Your inquiry has been sent successfully. We will reach out to you within 24 hours."
                                            : "We encountered an issue submitting your form. Please try again or reach out to us via WhatsApp."}
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

                        {/* Direct Contact Options for Mobile / Low-Effort */}
                        <div className="mt-12 pt-8 border-t border-white/10">
                            <p className="text-center text-gray-400 text-sm mb-6">Or reach out directly for a quicker response</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* WhatsApp Link */}
                                <a
                                    href="https://wa.me/923471245257"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-el-track="whatsapp-contact-page"
                                    className="flex items-center justify-center gap-4 bg-[#25D366]/5 hover:bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/20 py-5 px-8 rounded-2xl transition-all duration-300 group hover:shadow-[0_0_20px_rgba(37,211,102,0.15)]"
                                >
                                    <FaWhatsapp className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
                                    <div className="text-left">
                                        <p className="text-[11px] text-[#25D366]/70 font-semibold tracking-wider uppercase">Quick Chat</p>
                                        <p className="text-base font-bold text-white">Message on WhatsApp</p>
                                    </div>
                                </a>

                                {/* Calendly Link */}
                                <a
                                    href="https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-el-track="schedule-intro-call-contact-page"
                                    className="flex items-center justify-center gap-4 bg-[#4169E1]/5 hover:bg-[#4169E1]/15 text-[#4169E1] border border-[#4169E1]/20 py-5 px-8 rounded-2xl transition-all duration-300 group hover:shadow-[0_0_20px_rgba(65,105,225,0.1)]"
                                >
                                    <SiCalendly className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
                                    <div className="text-left">
                                        <p className="text-[11px] text-[#4169E1]/70 font-semibold tracking-wider uppercase">Direct Booking</p>
                                        <p className="text-base font-bold text-white">Schedule an Intro Call</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2: LOCATION & ABOUT */}
            <section className="py-24 bg-black">
                <div className="max-w-[1750px] mx-auto px-6 text-center mb-24">
                    <h2 className="text-4xl md:text-[64px] font-medium tracking-tight leading-[1.05]">
                        All Over the World.<br />
                        Wherever the Work Takes Us.
                    </h2>
                </div>

                <div className="max-w-[1750px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Image with Watermark */}
                    <div className="relative overflow-hidden aspect-[4/3] shadow-2xl">
                        <img
                            src={buildingImg}
                            alt="Elipse Studio"
                            width="800"
                            height="600"
                            className="w-full h-full object-cover brightness-[0.7]"
                        />
                        <div className="absolute top-8 left-8 md:top-12 md:left-12">
                            <span className="text-yellow-400 text-3xl md:text-5xl font-black italic tracking-tighter drop-shadow-lg">
                                ELIPSE STUDIO
                            </span>
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="space-y-8 text-gray-300 text-base md:text-[18px] leading-relaxed">
                        <p>
                            We are a creatively led technology company specializing in XR, 3D visualization, and immersive digital experiences.
                            Founded in 2021, we partner with brands to bring bold ideas to life through emerging technology.
                        </p>
                        <p>
                            Our team of accomplished artists and thoughtful engineers leverage emerging technologies and proven processes
                            to produce innovative and creative solutions for today&apos;s digitally connected brands and consumers.
                        </p>
                        <p>
                            We are based across the US, UK, and South Asia, with our team spread around the globe. Throughout our history, we&apos;ve
                            maintained a unique vision to inspire, engage, and entertain by bringing our imagination to life.
                        </p>
                        <p className="text-white italic font-bold">Let us inspire you.</p>
                    </div>
                </div>
            </section>

            <Footer />
        </motion.div>
    

    </>

    );
};

export default ContactPage;
