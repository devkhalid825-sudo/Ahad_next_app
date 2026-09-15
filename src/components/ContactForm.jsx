'use client';

import { useState } from 'react';
import { FaPaperPlane, FaCheck } from '@/components/ui/Icons';
import { apiCall } from '../utils/api';

const PILLARS = [
  { id: 'configurators', label: 'Interactive 3D Web & Product Configurators', note: 'WebGL / Three.js / PlayCanvas' },
  { id: 'archviz', label: 'Real-Time ArchViz & Spatial VR/AR', note: 'Unreal Engine 5' },
  { id: 'commercial', label: 'Cinematic 3D Product & Commercial Visuals', note: 'High-End CGI' },
];

const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const [selectedPillars, setSelectedPillars] = useState([]);
    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        user_company: '',
        message: ''
    });

    const togglePillar = (id) => {
        setSelectedPillars((prev) =>
            prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
        );
    };

    const validateField = (name, value) => {
        switch (name) {
            case 'user_email':
                if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid work email';
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
        const fieldsToValidate = ['user_email'];
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
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (touched[name]) {
            setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
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
                    message: ''
                });
                setSelectedPillars([]);
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

    const inputClass = (name) =>
        `w-full bg-white/[0.06] border rounded-xl py-3 px-3.5 sm:py-3.5 sm:px-4 focus:border-[#4169E1] outline-none transition-colors text-xs sm:text-sm md:text-base placeholder:text-gray-500 ${
            errors[name] && touched[name] ? 'border-red-500/70' : 'border-white/[0.08]'
        }`;

    const [activeTab, setActiveTab] = useState('form'); // 'form' | 'calendly'

    return (
        <div className="bg-[#0c0c0c] rounded-2xl sm:rounded-[2rem] md:rounded-[3rem] p-4 sm:p-7 md:p-10 lg:p-12 relative border border-white/10 w-full shadow-2xl">
            {/* Mode Switcher Tabs */}
            <div className="flex p-1 sm:p-1.5 bg-white/[0.04] border border-white/10 rounded-xl sm:rounded-2xl mb-6 sm:mb-8 gap-1 sm:gap-1.5">
                <button
                    type="button"
                    onClick={() => setActiveTab('form')}
                    className={`flex-1 py-2.5 sm:py-3 px-2 sm:px-4 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer ${
                        activeTab === 'form'
                            ? 'bg-[#4169E1] text-white shadow-lg shadow-[#4169E1]/30'
                            : 'text-gray-400 hover:text-white hover:bg-white/[0.02]'
                    }`}
                >
                    <FaPaperPlane className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                    <span className="truncate">Send Project Brief</span>
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab('calendly')}
                    className={`flex-1 py-2.5 sm:py-3 px-2 sm:px-4 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer ${
                        activeTab === 'calendly'
                            ? 'bg-[#4169E1] text-white shadow-lg shadow-[#4169E1]/30'
                            : 'text-gray-400 hover:text-white hover:bg-white/[0.02]'
                    }`}
                >
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="truncate">Book 15-Min Call</span>
                </button>
            </div>

            {activeTab === 'form' ? (
                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-7">
                    {/* 3 Enterprise Pillars */}
                    <div className="space-y-2.5 sm:space-y-3">
                        <label className="text-xs sm:text-sm font-medium text-gray-300">
                            What are you exploring? <span className="text-[#4169E1] font-semibold">(select all that apply)</span>
                        </label>
                        <div className="space-y-2 sm:space-y-2.5">
                            {PILLARS.map((pillar) => {
                                const isSelected = selectedPillars.includes(pillar.id);
                                return (
                                    <button
                                        key={pillar.id}
                                        type="button"
                                        onClick={() => togglePillar(pillar.id)}
                                        aria-pressed={isSelected}
                                        className={`w-full flex items-start gap-2.5 sm:gap-3.5 text-left rounded-xl p-3 sm:p-4 transition-all duration-300 border cursor-pointer ${
                                            isSelected
                                                ? 'bg-[#4169E1]/10 border-[#4169E1] shadow-[0_0_20px_rgba(65,105,225,0.12)]'
                                                : 'bg-white/[0.03] border-white/[0.08] hover:border-white/20'
                                        }`}
                                    >
                                        <span
                                            className={`mt-0.5 w-4 h-4 sm:w-5 sm:h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
                                                isSelected
                                                    ? 'bg-[#4169E1] border-[#4169E1]'
                                                    : 'border-gray-500'
                                            }`}
                                        >
                                            {isSelected && <FaCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />}
                                        </span>
                                        <span>
                                            <span className={`block text-xs sm:text-sm font-semibold leading-snug ${isSelected ? 'text-white' : 'text-gray-200'}`}>
                                                {pillar.label}
                                            </span>
                                            <span className="block text-[10px] sm:text-xs text-gray-400 mt-0.5">{pillar.note}</span>
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                        {errors.pillars && (
                            <p className="text-red-400 text-xs mt-1">{errors.pillars}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:gap-x-6 gap-y-4 sm:gap-y-5">
                        <div className="space-y-1.5 sm:space-y-2">
                            <label htmlFor="user_name" className="text-xs sm:text-sm font-medium text-gray-300">Full Name</label>
                            <input
                                id="user_name"
                                type="text"
                                name="user_name"
                                value={formData.user_name}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                className={inputClass('user_name')}
                                placeholder="James Whitfield"
                            />
                            {errors.user_name && touched.user_name && (
                                <p className="text-red-400 text-xs mt-1">{errors.user_name}</p>
                            )}
                        </div>

                        <div className="space-y-1.5 sm:space-y-2">
                            <label htmlFor="user_email" className="text-xs sm:text-sm font-medium text-gray-300">Work Email</label>
                            <input
                                id="user_email"
                                type="email"
                                name="user_email"
                                value={formData.user_email}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                className={inputClass('user_email')}
                                placeholder="james@yourbrand.com"
                            />
                            {errors.user_email && touched.user_email && (
                                <p className="text-red-400 text-xs mt-1">{errors.user_email}</p>
                            )}
                        </div>

                        <div className="space-y-1.5 sm:space-y-2 sm:col-span-2">
                            <label htmlFor="user_company" className="text-xs sm:text-sm font-medium text-gray-300">Company Name</label>
                            <input
                                id="user_company"
                                type="text"
                                name="user_company"
                                value={formData.user_company}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                className={inputClass('user_company')}
                                placeholder="Acme Corp"
                            />
                        </div>

                        <div className="space-y-1.5 sm:space-y-2 sm:col-span-2">
                            <label htmlFor="message" className="text-xs sm:text-sm font-medium text-gray-300">Project Brief</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                value={formData.message}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                placeholder="What are you building? Share the product type, target platforms (web / VR / AR), timeline, and the outcome you want — even a rough paragraph is enough."
                                className={`${inputClass('message')} resize-none`}
                            ></textarea>
                            {errors.message && touched.message && (
                                <p className="text-red-400 text-xs mt-1">{errors.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-3 sm:space-y-4 pt-1">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full flex items-center justify-center gap-2 text-center bg-[#4169E1] hover:bg-[#3558c8] text-white font-bold py-3.5 sm:py-4 px-4 sm:px-6 rounded-full text-xs sm:text-sm md:text-base transition-all shadow-lg shadow-[#4169E1]/30 hover:shadow-[#4169E1]/50 cursor-pointer transform active:scale-[0.98] ${
                                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            {isSubmitting ? 'Sending...' : (<><FaPaperPlane className="flex-shrink-0 text-xs sm:text-sm" /> Submit Inquiry &amp; Get Personal 3D Teardown</>)}
                        </button>
                        <p className="text-center text-gray-400 text-[10px] sm:text-xs leading-relaxed">
                            <FaCheck className="inline -mt-0.5 text-emerald-400" /> Enterprise security &nbsp;·&nbsp;
                            <FaCheck className="inline -mt-0.5 text-emerald-400" /> NDA on request &nbsp;·&nbsp;
                            <FaCheck className="inline -mt-0.5 text-emerald-400" /> No sales pressure
                        </p>
                    </div>

                    {/* Quick switch to Calendly prompt */}
                    <div className="pt-4 sm:pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
                        <div>
                            <p className="text-xs sm:text-sm font-semibold text-white">Prefer talking directly?</p>
                            <p className="text-[11px] sm:text-xs text-gray-400">Skip the form and pick a 15-minute slot on our calendar.</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setActiveTab('calendly')}
                            className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#4169E1]/40 bg-[#4169E1]/10 hover:bg-[#4169E1]/20 text-[#4169E1] text-[11px] sm:text-xs font-semibold transition-all shrink-0 cursor-pointer flex items-center gap-1.5"
                        >
                            <span>Book Direct Call</span>
                            <span>→</span>
                        </button>
                    </div>
                </form>
            ) : (
                /* Calendly Tab View */
                <div className="space-y-4 sm:space-y-6">
                    <div className="bg-white/[0.03] border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-5 flex items-center justify-between gap-3 sm:gap-4">
                        <div className="flex items-center gap-2.5 sm:gap-3.5">
                            <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#4169E1]/15 text-[#4169E1] flex items-center justify-center shrink-0">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </span>
                            <div className="text-left">
                                <h3 className="text-xs sm:text-base font-bold text-white">15-Min Technical Scoping Call</h3>
                                <p className="text-[10px] sm:text-xs text-gray-400">Directly with Bilal Lania · Lead 3D Pipeline Engineer</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-[#0c0c0c] min-h-[580px] sm:min-h-[660px]">
                        <iframe
                            src="https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting?hide_gdpr_banner=1&background_color=0c0c0c&text_color=ffffff&primary_color=4169e1"
                            title="Schedule a 15-minute technical scoping call"
                            width="100%"
                            height="660"
                            frameBorder="0"
                            scrolling="no"
                            className="w-full min-h-[580px] sm:min-h-[660px]"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 text-center sm:text-left pt-1 sm:pt-2">
                        <button
                            type="button"
                            onClick={() => setActiveTab('form')}
                            className="text-[11px] sm:text-xs text-gray-400 hover:text-white transition-colors cursor-pointer"
                        >
                            ← Back to Project Brief Form
                        </button>
                        <a
                            href="https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] sm:text-xs text-[#4169E1] hover:underline"
                        >
                            Open directly in Calendly ↗
                        </a>
                    </div>
                </div>
            )}

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
                            {submitStatus === 'success' ? 'Inquiry Received!' : 'Oops!'}
                        </h3>

                        <p className="text-gray-400 mb-8 text-sm md:text-base leading-relaxed">
                            {submitStatus === 'success'
                                ? "Thanks for reaching out — our lead 3D engineer will review your brief and reply within 1 business day."
                                : "We encountered an issue submitting your form. Please try again or use the chat button below."}
                        </p>

                        <button
                            onClick={closeModal}
                            className="w-full bg-[#4169E1] hover:bg-[#3558c8] text-white font-bold py-4 rounded-full transition-transform active:scale-95 cursor-pointer shadow-lg shadow-[#4169E1]/30"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactForm;