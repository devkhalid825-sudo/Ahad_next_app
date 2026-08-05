'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiCall } from '../utils/api';
import { setAdminToken, setAdminUser } from '../utils/auth';
import { FiLock, FiMail, FiEye, FiEyeOff, FiLogIn } from 'react-icons/fi';
import logoRaw from '../assets/images/logo.webp';
import { getImgSrc } from '../utils/api';
const logo = getImgSrc(logoRaw);

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { data, status } = await apiCall('/auth/login', 'POST', { email, password });

    if (status === 200 && data?.token) {
      setAdminToken(data.token);
      setAdminUser(data);
      router.push('/admin/dashboard');
    } else {
      setError(data?.message || 'Login failed');
    }
    setLoading(false);
  };

    return (
    <>
      
      <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[420px]">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <img src={logo} alt="Elipse Studio" className="h-10 object-contain brightness-0 mx-auto mb-6" />
          <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase bg-gradient-to-r from-[#4169E1] to-[#8B5CF6] bg-clip-text text-transparent">
            Admin Login
          </h2>
          <div className="h-0.5 w-8 bg-[#4169E1] mx-auto mt-3 rounded-full" />
          <p className="text-[#0D0D0D]/60 text-xs md:text-sm mt-3 font-light">
            Sign in to manage your dashboard
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-[#0D0D0D]/20 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 shadow-sm">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-[10px] uppercase font-black tracking-widest flex items-center gap-3">
              <FiLock className="shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
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
                  placeholder="info@elipsestudio.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#0D0D0D]/70 text-[8px] uppercase tracking-widest mb-2 font-bold">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0D0D0D]/40 text-base" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="w-full bg-[#0D0D0D]/10 border border-[#0D0D0D]/20 rounded-xl pl-11 pr-12 py-3.5 text-[#0D0D0D] text-sm focus:border-[#4169E1] outline-none transition-all placeholder:text-[#0D0D0D]/30"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0D0D0D]/40 hover:text-[#4169E1] transition-all"
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
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
                  Signing In...
                </>
              ) : (
                <>
                  <FiLogIn />
                  Sign In
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-[9px] text-[#0D0D0D]/40 uppercase tracking-[0.3em] font-bold">
          Elipse Studio &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
    </>
  );
};

export default AdminLogin;
