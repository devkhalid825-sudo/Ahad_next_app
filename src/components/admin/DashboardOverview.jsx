'use client';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiCall } from '../../utils/api';
import { getAdminToken, clearAdminAuth } from '../../utils/auth';
import { FiCheckCircle, FiAlertCircle, FiMail, FiMessageSquare, FiBriefcase, FiFileText } from 'react-icons/fi';

const DashboardOverview = () => {
  const [meetings, setMeetings] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [projectCount, setProjectCount] = useState(0);
  const [blogCount, setBlogCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getAdminToken();
    if (!token) { navigate('/admin/login'); return; }
    (async () => {
      try {
        const [mRes, cRes, pRes, bRes] = await Promise.all([
          apiCall('/meetings', 'GET', null, token),
          apiCall('/contact', 'GET', null, token),
          apiCall('/projects', 'GET', null, token),
          apiCall('/blogs', 'GET', null, token),
        ]);
        if (mRes.status === 200 && Array.isArray(mRes.data)) setMeetings(mRes.data);
        if (cRes.status === 200 && Array.isArray(cRes.data)) setContacts(cRes.data);
        if (pRes.status === 200 && Array.isArray(pRes.data)) setProjectCount(pRes.data.length);
        if (bRes.status === 200 && Array.isArray(bRes.data)) setBlogCount(bRes.data.length);
      } catch {
        clearAdminAuth();
        navigate('/admin/login');
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

    if (loading) return (
    <>
      
      <div className="flex items-center justify-center py-20">
      <div className="w-10 h-10 border-t-2 border-[#4169E1] border-solid rounded-full animate-spin" />
    </div>
    </>
  );

  const approved = meetings.filter(m => m.status === 'Approved');
  const total = meetings.length + contacts.length + projectCount + blogCount;

  const stats = [
    { label: 'Meetings', value: meetings.length, data: [35, 50, 42, 65, 48, 58, 70, 55, 62, 78, 45, Math.min(meetings.length * 6 + 10, 85)] },
    { label: 'Inquiries', value: contacts.length, data: [28, 42, 35, 55, 40, 50, 62, 48, 58, 68, 38, Math.min(contacts.length * 6 + 10, 85)] },
    { label: 'Authorized', value: approved.length, data: [20, 32, 25, 45, 30, 38, 50, 35, 42, 55, 28, Math.min(approved.length * 6 + 10, 85)] },
    { label: 'Projects', value: projectCount, data: [45, 30, 52, 38, 60, 42, 50, 58, 36, 65, 45, Math.min(projectCount * 6 + 10, 85)] },
    { label: 'Blogs', value: blogCount, data: [22, 35, 28, 45, 32, 40, 52, 36, 48, 42, 30, Math.min(blogCount * 6 + 10, 85)] },
  ];

  return (
    <>
      
      <header className="mb-6 md:mb-8">
        <h2 className="text-2xl md:text-4xl font-black tracking-tight uppercase bg-gradient-to-r from-[#4169E1] to-[#8B5CF6] bg-clip-text text-transparent">
          Dashboard Overview
        </h2>
        <div className="h-0.5 w-8 bg-[#4169E1] mt-3 rounded-full" />
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4 mb-6 md:mb-8">
        {stats.map((stat, i) => {
          const w = 120, h = 40;
          const px = stat.data.map((d, idx) => (idx / (stat.data.length - 1)) * w);
          const py = stat.data.map(d => h - (d / 100) * h);
          const lineD = px.map((x, idx) => `${idx === 0 ? 'M' : 'L'}${x.toFixed(1)},${py[idx].toFixed(1)}`).join('');
          const areaD = lineD + `L${w},${h}L0,${h}Z`;
          return (
            <div key={i} className="group bg-white border border-[#0D0D0D]/20 p-3 md:p-5 rounded-[1rem] md:rounded-[1.5rem] hover:border-[#0D0D0D]/30 transition-all duration-500 flex flex-col">
              <span className="text-[7px] md:text-[8px] font-bold text-[#0D0D0D]/70 uppercase tracking-[0.3em] mb-1 md:mb-2">{stat.label}</span>
              <div className="text-xl md:text-3xl font-black tracking-tight mb-1 text-[#4169E1]">{stat.value}</div>
              <div className="mt-auto pt-2">
                <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-8 md:h-10" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id={`sparkGrad${i}`} x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#4169E1" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#4169E1" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>
                  <path d={areaD} fill={`url(#sparkGrad${i})`} />
                  <path d={lineD} fill="none" stroke="#4169E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx={px[px.length - 1]} cy={py[py.length - 1]} r="2" fill="#4169E1" />
                </svg>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
        <div className="lg:col-span-2 bg-white border border-[#0D0D0D]/20 p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem]">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div>
              <h4 className="text-sm md:text-base font-black uppercase tracking-tight bg-gradient-to-r from-[#4169E1] to-[#8B5CF6] bg-clip-text text-transparent">Activity Overview</h4>
              <p className="text-[#0D0D0D]/80 text-[8px] md:text-[10px] uppercase tracking-widest mt-1">Monthly engagement trend</p>
            </div>
          </div>
          <div className="relative h-32 md:h-44">
            <svg viewBox="0 0 600 200" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="activityGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#4169E1" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#4169E1" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              {[0, 1, 2, 3, 4].map((g) => (
                <line key={g} x1="0" y1={40 * g} x2="600" y2={40 * g} stroke="#0D0D0D" strokeOpacity="0.08" strokeWidth="1" />
              ))}
              <path d="M0,160 C20,140 40,80 60,100 C80,120 100,40 120,60 C140,80 160,50 180,70 C200,90 220,30 240,50 L600,200 L0,200 Z" fill="url(#activityGrad)" />
              <path d="M0,160 C20,140 40,80 60,100 C80,120 100,40 120,60 C140,80 160,50 180,70 C200,90 220,30 240,50 C260,70 280,60 300,80 C320,100 340,20 360,40 C380,60 400,55 420,75 C440,95 460,35 480,55 C500,75 520,45 540,65 C560,85 580,30 600,50" fill="none" stroke="#4169E1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex justify-between mt-2 text-[6px] md:text-[7px] text-[#0D0D0D]/80 font-bold uppercase tracking-widest">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
            <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
          </div>
        </div>

        <div className="bg-white border border-[#0D0D0D]/20 p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] flex flex-col">
          <div className="mb-3 md:mb-4">
            <h4 className="text-sm md:text-base font-black uppercase tracking-tight bg-gradient-to-r from-[#4169E1] to-[#8B5CF6] bg-clip-text text-transparent">Distribution</h4>
            <p className="text-[#0D0D0D]/80 text-[8px] md:text-[10px] uppercase tracking-widest mt-1">Content breakdown</p>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-28 h-28 md:w-36 md:h-36">
              <circle cx="100" cy="100" r="80" fill="none" stroke="#F2F0EB" strokeWidth="30" />
              <circle cx="100" cy="100" r="80" fill="none" stroke="#4169E1" strokeWidth="30" opacity="0.9"
                strokeDasharray={`${(meetings.length / (Math.max(total, 1))) * 502.4} 502.4`}
                strokeLinecap="round" transform="rotate(-90 100 100)" />
              <circle cx="100" cy="100" r="80" fill="none" stroke="#4169E1" strokeWidth="30" opacity="0.6"
                strokeDasharray={`${(contacts.length / (Math.max(total, 1))) * 502.4} 502.4`}
                strokeDashoffset={`${-(meetings.length / (Math.max(total, 1))) * 502.4}`}
                strokeLinecap="round" transform="rotate(-90 100 100)" />
              <circle cx="100" cy="100" r="80" fill="none" stroke="#4169E1" strokeWidth="30" opacity="0.35"
                strokeDasharray={`${(projectCount / (Math.max(total, 1))) * 502.4} 502.4`}
                strokeDashoffset={`${-((meetings.length + contacts.length) / (Math.max(total, 1))) * 502.4}`}
                strokeLinecap="round" transform="rotate(-90 100 100)" />
              <circle cx="100" cy="100" r="80" fill="none" stroke="#4169E1" strokeWidth="30" opacity="0.15"
                strokeDasharray={`${(blogCount / (Math.max(total, 1))) * 502.4} 502.4`}
                strokeDashoffset={`${-((meetings.length + contacts.length + projectCount) / (Math.max(total, 1))) * 502.4}`}
                strokeLinecap="round" transform="rotate(-90 100 100)" />
              <text x="100" y="95" textAnchor="middle" fill="#0D0D0D" fontSize="28" fontWeight="900" fontFamily="sans-serif">{total}</text>
              <text x="100" y="115" textAnchor="middle" fill="#0D0D0D" fontSize="10" fontWeight="bold" fontFamily="sans-serif" opacity="0.6">TOTAL</text>
            </svg>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-3 md:mt-4">
            {[
              { label: 'Meetings', value: meetings.length, opacity: '0.9' },
              { label: 'Inquiries', value: contacts.length, opacity: '0.6' },
              { label: 'Projects', value: projectCount, opacity: '0.35' },
              { label: 'Blogs', value: blogCount, opacity: '0.15' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-1.5 md:gap-2">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full shrink-0 bg-[#4169E1]" style={{ opacity: item.opacity }} />
                <span className="text-[6px] md:text-[7px] text-[#0D0D0D]/70 font-bold uppercase tracking-widest truncate">{item.label}</span>
                <span className="text-[7px] md:text-[8px] text-[#0D0D0D] font-black ml-auto">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardOverview;
