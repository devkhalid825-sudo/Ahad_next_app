'use client';

import React, { useState } from 'react';
import { apiCall } from '../../utils/api';
import {
  FiLock, FiEye, FiEyeOff, FiCheckCircle, FiAlertCircle
} from 'react-icons/fi';

const SettingsPage = () => {
  const [showPassword, setShowPassword] = useState({ current: false, new: false, confirm: false });
  const [actionLoading, setActionLoading] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [error, setError] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    const currentPassword = e.target.currentPassword.value;
    const newPassword = e.target.newPassword.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    setActionLoading('password');
    const token = localStorage.getItem('adminToken');
    const { status } = await apiCall('/auth/change-password', 'PUT', { currentPassword, newPassword }, token);

    if (status === 200) {
      setSuccessMsg('Password Updated Successfully');
      e.target.reset();
      setTimeout(() => setSuccessMsg(''), 3000);
    } else {
      setError('Failed to change password');
    }
    setActionLoading(null);
  };

    return (
      <>
        
      {successMsg && (
        <div className="fixed top-24 right-6 left-6 md:left-auto md:top-8 md:right-8 z-[60] bg-[#4169E1] text-white px-6 py-4 rounded-2xl shadow-lg font-bold flex items-center justify-center md:justify-start gap-3 text-[10px] uppercase tracking-widest">
          <FiCheckCircle size={18} /> {successMsg}
        </div>
      )}

      <header className="mb-6 md:mb-8">
        <h2 className="text-2xl md:text-4xl font-black tracking-tight uppercase bg-gradient-to-r from-[#4169E1] to-[#8B5CF6] bg-clip-text text-transparent">Settings</h2>
        <div className="h-0.5 w-8 bg-[#4169E1] mt-3 rounded-full" />
        <p className="text-[#0D0D0D]/70 text-[11px] md:text-sm mt-3 font-light max-w-md leading-relaxed">
          Update your security credentials.
        </p>
      </header>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-6 rounded-2xl mb-8 flex items-center gap-4">
          <FiAlertCircle className="text-lg" />
          <span className="text-[10px] uppercase font-black tracking-widest">{error}</span>
        </div>
      )}

      <div className="bg-white border border-[#0D0D0D]/20 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] max-w-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#0D0D0D]/10 rounded-xl flex items-center justify-center text-[#4169E1]">
            <FiLock className="text-lg" />
          </div>
          <div>
            <h3 className="text-lg font-black uppercase tracking-tight text-[#0D0D0D]">Security Settings</h3>
            <p className="text-[#0D0D0D]/70 text-[8px] uppercase tracking-widest">Update your administrative password</p>
          </div>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-4">
          {[
            { key: 'current', label: 'Current Password', name: 'currentPassword' },
            { key: 'new', label: 'New Password', name: 'newPassword', min: 6 },
            { key: 'confirm', label: 'Confirm New Password', name: 'confirmPassword' },
          ].map((field) => (
            <div key={field.key}>
              <label className="block text-[#0D0D0D]/70 text-[8px] uppercase tracking-widest mb-2">{field.label}</label>
              <div className="relative">
                <input
                  type={showPassword[field.key] ? 'text' : 'password'}
                  name={field.name}
                  required
                  minLength={field.min}
                  className="w-full bg-[#0D0D0D]/10 border border-[#0D0D0D]/20 rounded-xl px-4 py-3 pr-12 text-[#0D0D0D] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#0D0D0D]/40"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPassword(s => ({ ...s, [field.key]: !s[field.key] }))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0D0D0D]/80 hover:text-[#4169E1] transition-all"
                >
                  {showPassword[field.key] ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>
          ))}

          <button
            type="submit"
            disabled={actionLoading === 'password'}
            className="w-full bg-[#4169E1] text-white font-black py-4 rounded-xl hover:bg-[#0D0D0D] transition-all transform active:scale-95 disabled:opacity-50 text-[9px] uppercase tracking-[0.3em]"
          >
            {actionLoading === 'password' ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </>
  );
};

export default SettingsPage;
