'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  FiMail, FiCheckCircle, FiLogOut, FiMenu, FiX,
  FiEdit3, FiBriefcase, FiPhone, FiSettings, FiCommand,
  FiMessageSquare, FiFileText, FiGrid, FiUser
} from 'react-icons/fi';
import logoRaw from '../assets/images/logo.webp';
import { getImgSrc } from '../utils/api';
import { getAdminToken, clearAdminAuth } from '../utils/auth';
const logo = getImgSrc(logoRaw);

const navItems = [
  { to: '/admin/dashboard', label: 'Overview', icon: FiGrid, end: true },
  { divider: 'Communication' },
  { to: '/admin/dashboard/meetings', label: 'Meetings', icon: FiMail },
  { to: '/admin/dashboard/inquiries', label: 'Inquiries', icon: FiMessageSquare },
  { to: '/admin/dashboard/authorized', label: 'Authorized', icon: FiCheckCircle },
  { divider: 'Content' },
  { to: '/admin/dashboard/blogs', label: 'Blogs', icon: FiEdit3 },
  { to: '/admin/dashboard/projects', label: 'Projects', icon: FiBriefcase },
  { to: '/admin/dashboard/case-studies', label: 'Case Studies', icon: FiFileText },
  { to: '/admin/dashboard/reviews', label: 'Reviews', icon: FiPhone },
  { to: '/admin/dashboard/social', label: 'Social Media', icon: FiEdit3 },
  { divider: 'System' },
  { to: '/admin/dashboard/settings', label: 'Settings', icon: FiSettings },
];

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = getAdminToken();
    if (!token) router.push('/admin/login');
  }, [router]);

  const handleLogout = () => {
    clearAdminAuth();
    router.push('/admin/login');
  };

  const closeMobile = () => setSidebarOpen(false);

  const getLinkClass = (isActive) =>
    `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-[10px] uppercase tracking-[0.2em] ${
      isActive
        ? 'bg-[#4169E1] text-white font-bold shadow-lg'
        : 'text-[#0D0D0D]/80 hover:text-[#0D0D0D] hover:bg-[#0D0D0D]/10'
    }`;

  return (
    <div className="min-h-screen bg-white flex text-[#0D0D0D] font-sans relative overflow-x-hidden">

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-20 bg-white/95 backdrop-blur-xl border-b border-[#0D0D0D]/10 flex items-center justify-between px-6 z-50">
        <img src={logo} alt="Logo" className="h-8 object-contain brightness-0" />
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-3 bg-[#0D0D0D]/10 rounded-xl text-[#4169E1]"
        >
          {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-[#0D0D0D]/100 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeMobile}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        w-72 bg-white border-r border-[#0D0D0D]/10 flex flex-col fixed h-full z-50 transition-all duration-700 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 mb-2">
          <img src={logo} alt="Elipse Studio" className="h-8 md:h-9 object-contain brightness-0" />
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item, i) => {
            if (item.divider) {
              return (
                <p key={i} className="text-[10px] font-bold text-[#0D0D0D]/80 uppercase tracking-[0.4em] px-4 mb-3 mt-4 first:mt-0">
                  {item.divider}
                </p>
              );
            }
            const Icon = item.icon;
            const isActive = item.end ? pathname === item.to : pathname?.startsWith(item.to);
            return (
              <Link
                key={item.to}
                href={item.to}
                onClick={closeMobile}
                className={getLinkClass(isActive)}
              >
                <Icon className="text-base" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-[#0D0D0D]/20">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500/60 hover:text-red-500 hover:bg-red-500/5 rounded-xl transition-all text-[8px] uppercase font-black tracking-[0.3em]"
          >
            <FiLogOut className="text-base" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-72 p-4 md:p-8 xl:p-10 mt-20 lg:mt-0 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
