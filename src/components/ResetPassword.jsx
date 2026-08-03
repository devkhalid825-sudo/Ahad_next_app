'use client';

import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { apiCall } from '../utils/api';
import { FiLock, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import logoRaw from '../assets/images/logo.webp';
import { getImgSrc } from '../utils/api';
const logo = getImgSrc(logoRaw);

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({ new: false, confirm: false });

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError('Passwords do not match.');
    }

    setLoading(true);
    setError('');

    const { data, status } = await apiCall('/auth/reset-password', 'POST', { token, password });

    if (status === 200) {
      setMessage('Password reset successful! Redirecting to login...');
      setTimeout(() => navigate('/admin/login'), 3000);
    } else {
      setError(data.message || 'Failed to reset password.');
    }
    setLoading(false);
  };

  const toggleShow = (field) => setShowPassword(s => ({ ...s, [field]: !s[field] }));

    return (
    <>
      
      <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[420px]">
        <div className="text-center mb-8">
          <img src={logo} alt="Elipse Studio" className="h-10 object-contain brightness-0 mx-auto mb-6" />
          <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase bg-gradient-to-r from-[#4169E1] to-[#8B5CF6] bg-clip-text text-transparent">
            Reset Password
          </h2>
          <div className="h-0.5 w-8 bg-[#4169E1] mx-auto mt-3 rounded-full" />
          <p className="text-[#0D0D0D]/60 text-xs md:text-sm mt-3 font-light">
            Set your new password below
          </p>
        </div>

        <div className="bg-white border border-[#0D0D0D]/20 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 shadow-sm">
          {message && (
            <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-xl mb-6 text-[10px] uppercase font-black tracking-widest flex items-center gap-3">
              <FiCheckCircle className="shrink-0" />
              {message}
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-[10px] uppercase font-black tracking-widest flex items-center gap-3">
              <FiLock className="shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[#0D0D0D]/70 text-[8px] uppercase tracking-widest mb-2 font-bold">
                New Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0D0D0D]/40 text-base" />
                <input
                  type={showPassword.new ? 'text' : 'password'}
                  required
                  minLength={6}
                  className="w-full bg-[#0D0D0D]/10 border border-[#0D0D0D]/20 rounded-xl pl-11 pr-12 py-3.5 text-[#0D0D0D] text-sm focus:border-[#4169E1] outline-none transition-all placeholder:text-[#0D0D0D]/30"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => toggleShow('new')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0D0D0D]/40 hover:text-[#4169E1] transition-all"
                >
                  {showPassword.new ? <FiLock size={16} /> : <FiLock size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[#0D0D0D]/70 text-[8px] uppercase tracking-widest mb-2 font-bold">
                Confirm New Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0D0D0D]/40 text-base" />
                <input
                  type={showPassword.confirm ? 'text' : 'password'}
                  required
                  className="w-full bg-[#0D0D0D]/10 border border-[#0D0D0D]/20 rounded-xl pl-11 pr-12 py-3.5 text-[#0D0D0D] text-sm focus:border-[#4169E1] outline-none transition-all placeholder:text-[#0D0D0D]/30"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => toggleShow('confirm')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0D0D0D]/40 hover:text-[#4169E1] transition-all"
                >
                  {showPassword.confirm ? <FiLock size={16} /> : <FiLock size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !!message}
              className="w-full bg-[#4169E1] text-white font-black py-4 rounded-xl hover:bg-[#0D0D0D] transition-all transform active:scale-95 disabled:opacity-50 text-[9px] uppercase tracking-[0.3em] flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Resetting...
                </>
              ) : (
                <>
                  <FiCheckCircle />
                  Reset Password
                </>
              )}
            </button>
          </form>
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

export default ResetPassword;
