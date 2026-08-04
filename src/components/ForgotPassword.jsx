'use client';

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiCall } from '../utils/api';
import { FiMail, FiKey, FiArrowLeft, FiSend } from 'react-icons/fi';
import logoRaw from '../assets/images/logo.webp';
import { getImgSrc } from '../utils/api';
const logo = getImgSrc(logoRaw);

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    const { data, status } = await apiCall('/auth/send-otp', 'POST', { email });

    if (status === 200) {
      setMessage('OTP sent! Please check your email.');
      setStep(2);
    } else {
      setError(data.message || 'Failed to send OTP.');
    }
    setLoading(false);
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { data, status } = await apiCall('/auth/verify-otp', 'POST', { identifier: email, otp });

    if (status === 200) {
      navigate(`/reset-password/${data.token}`);
    } else {
      setError(data.message || 'Invalid OTP.');
    }
    setLoading(false);
  };

    return (
    <>
      
      <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[420px]">
        <div className="text-center mb-8">
          <img src={logo} alt="Elipse Studio" className="h-10 object-contain brightness-0 mx-auto mb-6" />
          <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase bg-gradient-to-r from-[#4169E1] to-[#8B5CF6] bg-clip-text text-transparent">
            {step === 1 ? 'Forgot Password' : 'Verify OTP'}
          </h2>
          <div className="h-0.5 w-8 bg-[#4169E1] mx-auto mt-3 rounded-full" />
          <p className="text-[#0D0D0D]/60 text-xs md:text-sm mt-3 font-light">
            {step === 1
              ? "Enter your registered email to receive a verification code."
              : `Enter the 6-digit code sent to ${email}`
            }
          </p>
        </div>

        <div className="bg-white border border-[#0D0D0D]/20 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 shadow-sm">
          {message && (
            <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-xl mb-6 text-[10px] uppercase font-black tracking-widest flex items-center gap-3">
              <FiKey className="shrink-0" />
              {message}
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-[10px] uppercase font-black tracking-widest flex items-center gap-3">
              <FiMail className="shrink-0" />
              {error}
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleRequestOTP} className="space-y-5">
              <div>
                <label className="block text-[#0D0D0D]/70 text-[8px] uppercase tracking-widest mb-2 font-bold">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0D0D0D]/40 text-base" />
                  <input
                    type="email"
                    required
                    className="w-full bg-[#0D0D0D]/10 border border-[#0D0D0D]/20 rounded-xl pl-11 pr-4 py-3.5 text-[#0D0D0D] text-sm focus:border-[#4169E1] outline-none transition-all placeholder:text-[#0D0D0D]/30"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@elipsestudio.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#4169E1] text-white font-black py-4 rounded-xl hover:bg-[#0D0D0D] transition-all transform active:scale-95 disabled:opacity-50 text-[9px] uppercase tracking-[0.3em] flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend />
                    Send OTP
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-5">
              <div>
                <label className="block text-[#0D0D0D]/70 text-[8px] uppercase tracking-widest mb-2 font-bold">
                  6-Digit OTP
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  className="w-full bg-[#0D0D0D]/10 border border-[#0D0D0D]/20 rounded-xl px-4 py-3.5 text-[#0D0D0D] text-center text-2xl tracking-[0.5em] focus:border-[#4169E1] outline-none transition-all font-mono placeholder:text-[#0D0D0D]/30"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="000000"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#4169E1] text-white font-black py-4 rounded-xl hover:bg-[#0D0D0D] transition-all transform active:scale-95 disabled:opacity-50 text-[9px] uppercase tracking-[0.3em] flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <FiKey />
                    Verify & Continue
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-[#0D0D0D]/50 text-[10px] font-bold uppercase tracking-widest hover:text-[#4169E1] transition-colors mt-2"
              >
                Try another email
              </button>
            </form>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link to="/admin/login" className="text-[10px] font-bold uppercase tracking-widest text-[#4169E1] hover:text-[#0D0D0D] transition-colors inline-flex items-center gap-2">
            <FiArrowLeft /> Back to Login
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default ForgotPassword;
