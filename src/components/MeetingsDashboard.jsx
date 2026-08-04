'use client';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiCall } from '../utils/api';
import {
  FiUsers, FiCheckCircle, FiLogOut, FiMail,
  FiCalendar, FiClock, FiAlertCircle, FiTrendingUp,
  FiActivity, FiCommand, FiTrash2, FiChevronRight,
  FiMessageSquare, FiBriefcase, FiPhone, FiGlobe, FiSettings, FiLock,
  FiMenu, FiX, FiEdit3, FiEye, FiEyeOff, FiFolder, FiFileText
} from 'react-icons/fi';
import BlogDashboard from './BlogDashboard';
import ProjectDashboard from './ProjectDashboard';
import CaseStudyDashboard from './CaseStudyDashboard';
import ReviewDashboard from './ReviewDashboard';
import SocialMediaDashboard from './SocialMediaDashboard';
import logoRaw from '../assets/images/logo.webp';
import { getImgSrc } from '../utils/api';
const logo = getImgSrc(logoRaw);

const MeetingsDashboard = () => {
  const [meetings, setMeetings] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('requests'); // 'requests', 'contacts', 'approved'
  const [actionLoading, setActionLoading] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showPassword, setShowPassword] = useState({ current: false, new: false, confirm: false });
  const [seeding, setSeeding] = useState(false);
  const [projectCount, setProjectCount] = useState(0);
  const [blogCount, setBlogCount] = useState(0);
  const navigate = useNavigate();

  const fetchData = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    setLoading(true);
    try {
      const [meetingsRes, contactsRes, projectsRes, blogsRes] = await Promise.all([
        apiCall('/meetings', 'GET', null, token),
        apiCall('/contact', 'GET', null, token),
        apiCall('/projects', 'GET', null, token),
        apiCall('/blogs', 'GET', null, token)
      ]);

      if (meetingsRes.status === 200) {
        setMeetings(meetingsRes.data);
      }
      if (contactsRes.status === 200) {
        setContacts(contactsRes.data);
      }
      if (projectsRes.status === 200) {
        setProjectCount(projectsRes.data.length);
      }
      if (blogsRes.status === 200) {
        setBlogCount(blogsRes.data.length);
      }

      if (meetingsRes.status !== 200 && contactsRes.status !== 200) {
        throw new Error('Unauthorized');
      }
    } catch (err) {
      setError('System out of sync. Re-logging...');
      localStorage.removeItem('adminToken');
      navigate('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

  const handleApprove = async (id) => {
    setActionLoading(id);
    const token = localStorage.getItem('adminToken');
    const { status } = await apiCall(`/meetings/${id}`, 'PUT', { status: 'Approved' }, token);

    if (status === 200) {
      setMeetings(prev => prev.map(m => m.id === id ? { ...m, status: 'Approved' } : m));
      setSuccessMsg('Node Authorized');
      setTimeout(() => {
        setSuccessMsg('');
        setActionLoading(null);
      }, 2000);
    } else {
      setError('Authorization failed');
      setActionLoading(null);
    }
  };

  const handleDeleteMeeting = async (id) => {
    if (!window.confirm('Are you sure you want to delete this meeting request?')) return;

    const token = localStorage.getItem('adminToken');
    const { status } = await apiCall(`/meetings/${id}`, 'DELETE', null, token);

    if (status === 200) {
      setMeetings(prev => prev.filter(m => m.id !== id));
      setSuccessMsg('Request Deleted');
      setTimeout(() => setSuccessMsg(''), 2000);
    } else {
      setError('Delete operation failed');
    }
  };

  const handleDeleteContact = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;

    const token = localStorage.getItem('adminToken');
    const { status } = await apiCall(`/contact/${id}`, 'DELETE', null, token);

    if (status === 200) {
      setContacts(prev => prev.filter(c => c.id !== id));
      setSuccessMsg('Inquiry Deleted');
      setTimeout(() => setSuccessMsg(''), 2000);
    } else {
      setError('Delete operation failed');
    }
  };

  const pendingMeetings = meetings.filter(m => m.status !== 'Approved');
  const approvedMeetings = meetings.filter(m => m.status === 'Approved');

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const currentPassword = e.target.currentPassword.value;
    const newPassword = e.target.newPassword.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    setActionLoading('password');
    const token = localStorage.getItem('adminToken');
    const { data, status } = await apiCall('/auth/change-password', 'PUT', { currentPassword, newPassword }, token);

    if (status === 200) {
      setSuccessMsg('Password Updated Successfully');
      e.target.reset();
      setTimeout(() => setSuccessMsg(''), 3000);
    } else {
      setError(data.message || 'Failed to change password');
    }
    setActionLoading(null);
  };

  const handleSeedStatic = async () => {
    if (!window.confirm('This will import all existing static projects, blogs, and reviews into the database. Continue?')) return;
    setSeeding(true);
    setError('');
    const token = localStorage.getItem('adminToken');
    const { data, status } = await apiCall('/seed/static', 'POST', null, token);
    if (status === 200) {
      setSuccessMsg(data.message || 'Static data imported successfully!');
      fetchData();
    } else {
      setError(data.message || 'Seed failed');
    }
    setSeeding(false);
    setTimeout(() => { setSuccessMsg(''); setError(''); }, 4000);
  };

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-10 h-10 border-t-2 border-[#4169E1] border-solid rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex text-[#0D0D0D] font-sans relative overflow-x-hidden">

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-20 bg-white/95 backdrop-blur-xl border-b border-[#0D0D0D]/10 flex items-center justify-between px-6 z-50">
        <img src={logo} alt="Logo" className="h-8 object-contain brightness-0" />
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-3 bg-[#0D0D0D]/10 rounded-xl text-[#4169E1] hover:bg-[#0D0D0D]/10 transition-all"
        >
          {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-[#0D0D0D]/100 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className={`
        w-72 bg-white border-r border-[#0D0D0D]/10 flex flex-col fixed h-full z-50 transition-all duration-700 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 mb-2">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Elipse Studio"
              className="h-8 md:h-9 object-contain brightness-0"
            />
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <p className="text-[10px] font-bold text-[#0D0D0D]/80 uppercase tracking-[0.4em] px-4 mb-3">Communication</p>

          <button
            onClick={() => { setActiveTab('requests'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === 'requests' ? 'bg-[#4169E1] text-white font-bold shadow-lg' : 'text-[#0D0D0D]/80 hover:text-[#0D0D0D] hover:bg-[#0D0D0D]/10'}`}
          >
            <FiMail className="text-base" />
            <span className="text-[10px] uppercase tracking-[0.2em]">Meetings</span>
            {pendingMeetings.length > 0 && (
              <span className={`ml-auto px-1.5 py-0.5 rounded text-[8px] ${activeTab === 'requests' ? 'bg-white/20 text-white font-black' : 'bg-[#4169E1]/10 text-[#4169E1]'}`}>
                {pendingMeetings.length}
              </span>
            )}
          </button>

          <button
            onClick={() => { setActiveTab('contacts'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === 'contacts' ? 'bg-[#4169E1] text-white font-bold shadow-lg' : 'text-[#0D0D0D]/80 hover:text-[#0D0D0D] hover:bg-[#0D0D0D]/10'}`}
          >
            <FiMessageSquare className="text-base" />
            <span className="text-[10px] uppercase tracking-[0.2em]">Inquiries</span>
            {contacts.length > 0 && (
              <span className={`ml-auto px-1.5 py-0.5 rounded text-[8px] ${activeTab === 'contacts' ? 'bg-white/20 text-white font-black' : 'bg-[#4169E1]/10 text-[#4169E1]'}`}>
                {contacts.length}
              </span>
            )}
          </button>

          <button
            onClick={() => { setActiveTab('approved'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === 'approved' ? 'bg-[#4169E1] text-white font-bold shadow-lg' : 'text-[#0D0D0D]/80 hover:text-[#0D0D0D] hover:bg-[#0D0D0D]/10'}`}
          >
            <FiCheckCircle className="text-base" />
            <span className="text-[10px] uppercase tracking-[0.2em]">Authorized</span>
            {approvedMeetings.length > 0 && (
              <span className={`ml-auto px-1.5 py-0.5 rounded text-[8px] ${activeTab === 'approved' ? 'bg-white/20 text-white font-black' : 'bg-[#4169E1]/10 text-[#4169E1]'}`}>
                {approvedMeetings.length}
              </span>
            )}
          </button>

          <button
            onClick={() => { setActiveTab('blogs'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-500 group ${activeTab === 'blogs' ? 'bg-[#4169E1] text-white font-bold shadow-lg' : 'text-[#0D0D0D]/80 hover:text-[#0D0D0D] hover:bg-[#0D0D0D]/10'}`}
          >
            <FiEdit3 className="text-base" />
            <span className="text-[10px] uppercase tracking-[0.2em]">Blogs</span>
          </button>

          <button
            onClick={() => { setActiveTab('projects'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-500 group ${activeTab === 'projects' ? 'bg-[#4169E1] text-white font-bold shadow-lg' : 'text-[#0D0D0D]/80 hover:text-[#0D0D0D] hover:bg-[#0D0D0D]/10'}`}
          >
            <FiBriefcase className="text-base" />
            <span className="text-[10px] uppercase tracking-[0.2em]">Projects</span>
          </button>

          <button
            onClick={() => { setActiveTab('case-studies'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-500 group ${activeTab === 'case-studies' ? 'bg-[#4169E1] text-white font-bold shadow-lg' : 'text-[#0D0D0D]/80 hover:text-[#0D0D0D] hover:bg-[#0D0D0D]/10'}`}
          >
            <FiFileText className="text-base" />
            <span className="text-[10px] uppercase tracking-[0.2em]">Case Studies</span>
          </button>

          <button
            onClick={() => { setActiveTab('reviews'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-500 group ${activeTab === 'reviews' ? 'bg-[#4169E1] text-white font-bold shadow-lg' : 'text-[#0D0D0D]/80 hover:text-[#0D0D0D] hover:bg-[#0D0D0D]/10'}`}
          >
            <FiMessageSquare className="text-base" />
            <span className="text-[10px] uppercase tracking-[0.2em]">Reviews</span>
          </button>

          <button
            onClick={() => { setActiveTab('social'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-500 group ${activeTab === 'social' ? 'bg-[#4169E1] text-white font-bold shadow-lg' : 'text-[#0D0D0D]/80 hover:text-[#0D0D0D] hover:bg-[#0D0D0D]/10'}`}
          >
            <FiEdit3 className="text-base" />
            <span className="text-[10px] uppercase tracking-[0.2em]">Social Media</span>
          </button>

          <button
            onClick={() => { setActiveTab('settings'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-500 group ${activeTab === 'settings' ? 'bg-[#4169E1] text-white font-bold shadow-lg' : 'text-[#0D0D0D]/80 hover:text-[#0D0D0D] hover:bg-[#0D0D0D]/10'}`}
          >
            <FiSettings className={`text-base transition-transform duration-500 ${activeTab === 'settings' ? '' : 'group-hover:rotate-90'}`} />
            <span className="text-[10px] uppercase tracking-[0.2em]">Settings</span>
          </button>

          <div className="pt-4 mt-4 border-t border-[#0D0D0D]/20">
            <button
              onClick={handleSeedStatic}
              disabled={seeding}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-[#0D0D0D]/80 hover:text-[#4169E1] hover:bg-[#0D0D0D]/10 disabled:opacity-30"
            >
              <FiCommand className="text-base" />
              <span className="text-[10px] uppercase tracking-[0.2em]">{seeding ? 'Importing...' : 'Import Static Data'}</span>
            </button>
          </div>
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
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-72 p-4 md:p-8 xl:p-10 mt-20 lg:mt-0 overflow-y-auto">

        {/* Success Alert */}
        {successMsg && (
          <div className="fixed top-24 right-6 left-6 md:left-auto md:top-8 md:right-8 z-[60] bg-[#4169E1] text-white px-6 py-4 rounded-2xl shadow-lg font-bold flex items-center justify-center md:justify-start gap-3 animate-in fade-in slide-in-from-top-10 md:slide-in-from-right-10 duration-500 text-[10px] uppercase tracking-widest">
            <FiCheckCircle size={18} /> {successMsg}
          </div>
        )}

        {/* Stats Summary with SVG Mini Sparklines */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4 mb-6 md:mb-8">
          {[
            { label: 'Meetings', value: meetings.length, data: [35, 50, 42, 65, 48, 58, 70, 55, 62, 78, 45, Math.min(meetings.length * 6 + 10, 85)] },
            { label: 'Inquiries', value: contacts.length, data: [28, 42, 35, 55, 40, 50, 62, 48, 58, 68, 38, Math.min(contacts.length * 6 + 10, 85)] },
            { label: 'Authorized', value: approvedMeetings.length, data: [20, 32, 25, 45, 30, 38, 50, 35, 42, 55, 28, Math.min(approvedMeetings.length * 6 + 10, 85)] },
            { label: 'Projects', value: projectCount, data: [45, 30, 52, 38, 60, 42, 50, 58, 36, 65, 45, Math.min(projectCount * 6 + 10, 85)] },
            { label: 'Blogs', value: blogCount, data: [22, 35, 28, 45, 32, 40, 52, 36, 48, 42, 30, Math.min(blogCount * 6 + 10, 85)] },
          ].map((stat, i) => {
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

        {/* Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          {/* Activity Bar Chart */}
          <div className="lg:col-span-2 bg-white border border-[#0D0D0D]/20 p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem]">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div>
                <h4 className="text-sm md:text-base font-black uppercase tracking-tight bg-gradient-to-r from-[#4169E1] to-[#8B5CF6] bg-clip-text text-transparent">Activity Overview</h4>
                <p className="text-[#0D0D0D]/80 text-[8px] md:text-[10px] uppercase tracking-widest mt-1">Monthly engagement trend</p>
              </div>
              <span className="flex items-center gap-1.5 text-[#4169E1]"><span className="w-2 h-2 rounded-full bg-[#4169E1]"></span> Activity</span>
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
                {[0, 60, 120, 180, 240, 300, 360, 420, 480, 540, 580, 600].map((cx, ci) => {
                  const cyVals = [160, 140, 80, 100, 40, 60, 50, 30, 20, 40, 55, 30, 50];
                  return <circle key={ci} cx={cx} cy={cyVals[ci] || 50} r="3" fill="#4169E1" stroke="#F2F0EB" strokeWidth="1.5" />;
                })}
              </svg>
            </div>
            <div className="flex justify-between mt-2 text-[6px] md:text-[7px] text-[#0D0D0D]/80 font-bold uppercase tracking-widest">
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
              <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
            </div>
          </div>

          {/* Distribution Donut */}
          <div className="bg-white border border-[#0D0D0D]/20 p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] flex flex-col">
            <div className="mb-3 md:mb-4">
              <h4 className="text-sm md:text-base font-black uppercase tracking-tight bg-gradient-to-r from-[#4169E1] to-[#8B5CF6] bg-clip-text text-transparent">Distribution</h4>
              <p className="text-[#0D0D0D]/80 text-[8px] md:text-[10px] uppercase tracking-widest mt-1">Content breakdown</p>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-28 h-28 md:w-36 md:h-36">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#F2F0EB" strokeWidth="30" />
                <circle cx="100" cy="100" r="80" fill="none" stroke="#4169E1" strokeWidth="30" opacity="0.9"
                  strokeDasharray={`${(meetings.length / (Math.max(meetings.length + contacts.length + projectCount + blogCount, 1))) * 502.4} 502.4`}
                  strokeLinecap="round" transform="rotate(-90 100 100)" />
                <circle cx="100" cy="100" r="80" fill="none" stroke="#4169E1" strokeWidth="30" opacity="0.6"
                  strokeDasharray={`${(contacts.length / (Math.max(meetings.length + contacts.length + projectCount + blogCount, 1))) * 502.4} 502.4`}
                  strokeDashoffset={`${-(meetings.length / (Math.max(meetings.length + contacts.length + projectCount + blogCount, 1))) * 502.4}`}
                  strokeLinecap="round" transform="rotate(-90 100 100)" />
                <circle cx="100" cy="100" r="80" fill="none" stroke="#4169E1" strokeWidth="30" opacity="0.35"
                  strokeDasharray={`${(projectCount / (Math.max(meetings.length + contacts.length + projectCount + blogCount, 1))) * 502.4} 502.4`}
                  strokeDashoffset={`${-((meetings.length + contacts.length) / (Math.max(meetings.length + contacts.length + projectCount + blogCount, 1))) * 502.4}`}
                  strokeLinecap="round" transform="rotate(-90 100 100)" />
                <circle cx="100" cy="100" r="80" fill="none" stroke="#4169E1" strokeWidth="30" opacity="0.15"
                  strokeDasharray={`${(blogCount / (Math.max(meetings.length + contacts.length + projectCount + blogCount, 1))) * 502.4} 502.4`}
                  strokeDashoffset={`${-((meetings.length + contacts.length + projectCount) / (Math.max(meetings.length + contacts.length + projectCount + blogCount, 1))) * 502.4}`}
                  strokeLinecap="round" transform="rotate(-90 100 100)" />
                <text x="100" y="95" textAnchor="middle" fill="#0D0D0D" fontSize="28" fontWeight="900" fontFamily="sans-serif">
                  {meetings.length + contacts.length + projectCount + blogCount}
                </text>
                <text x="100" y="115" textAnchor="middle" fill="#0D0D0D" fontSize="10" fontWeight="bold" fontFamily="sans-serif" opacity="0.6">
                  TOTAL
                </text>
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
                  <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full shrink-0 bg-[#4169E1]" style={{ opacity: item.opacity }}></span>
                  <span className="text-[6px] md:text-[7px] text-[#0D0D0D]/70 font-bold uppercase tracking-widest truncate">{item.label}</span>
                  <span className="text-[7px] md:text-[8px] text-[#0D0D0D] font-black ml-auto">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <header className="mb-6 md:mb-8 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl md:text-4xl font-black tracking-tight uppercase bg-gradient-to-r from-[#4169E1] to-[#8B5CF6] bg-clip-text text-transparent">
                {activeTab === 'approved' ? 'Archives' : activeTab === 'contacts' ? 'Contact Inquiries' : activeTab === 'blogs' ? 'Blog Management' : activeTab === 'projects' ? 'Project Management' : activeTab === 'case-studies' ? 'Case Study Management' : activeTab === 'reviews' ? 'Review Management' : activeTab === 'social' ? 'Social Media' : 'Meeting Inbox'}
              </h2>
              <div className="h-0.5 w-8 bg-[#4169E1] mt-3 rounded-full" />
              <p className="text-[#0D0D0D]/70 text-[11px] md:text-sm mt-3 font-light max-w-md leading-relaxed">
                {activeTab === 'requests' ? 'Review and authorize incoming meeting requests from the contact form.' :
                  activeTab === 'approved' ? 'Archive of all authorized and completed meeting nodes.' :
                    activeTab === 'contacts' ? 'Incoming inquiries from the contact page.' :
                      activeTab === 'blogs' ? 'Create, edit, and manage blog content with SEO controls.' :
                        activeTab === 'projects' ? 'Manage portfolio projects and drag to reorder.' :
                          activeTab === 'case-studies' ? 'Manage case studies with banners and SEO.' :
                            activeTab === 'reviews' ? 'Manage client reviews and testimonials.' :
                              activeTab === 'social' ? 'Manage social media video links.' :
                                'Update your security credentials.'}
              </p>
            </div>
          </div>
        </header>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-6 rounded-2xl mb-8 flex items-center gap-4 animate-pulse">
            <FiAlertCircle className="text-lg" />
            <span className="text-[10px] uppercase font-black tracking-widest">{error}</span>
          </div>
        )}

        {/* List Content */}
        <div className="space-y-4">

          {/* MEETINGS TAB */}
          {(activeTab === 'requests' || activeTab === 'approved') && (
            (activeTab === 'requests' ? pendingMeetings : approvedMeetings).length === 0 ? (
              <div className="bg-white border border-[#0D0D0D]/20 border-dashed rounded-[2rem] md:rounded-[3rem] p-16 md:p-32 text-center">
                <FiMail className="text-3xl md:text-4xl text-[#0D0D0D]/40 mx-auto mb-4" />
                <p className="text-[#0D0D0D]/50 text-[9px] font-bold tracking-[0.4em] uppercase">No Dynamic Data</p>
              </div>
            ) : (
              (activeTab === 'requests' ? pendingMeetings : approvedMeetings).map((meeting) => (
                <div
                  key={meeting.id}
                  className="bg-white border border-[#0D0D0D]/20 p-5 md:p-6 rounded-[1rem] md:rounded-[1.5rem] hover:border-[#0D0D0D]/20 transition-all duration-700 flex flex-col lg:flex-row items-center justify-between gap-4 md:gap-6 group animate-in fade-in slide-in-from-bottom-5"
                >
                  <div className="flex items-center gap-6 flex-1 w-full relative">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-[#0D0D0D]/10 rounded-xl flex items-center justify-center text-lg md:text-xl text-[#0D0D0D]/80 group-hover:text-[#4169E1] transition-all duration-500">
                      <FiMail />
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap gap-2 md:gap-3 text-[6px] md:text-[7px] text-[#0D0D0D]/80 font-bold uppercase tracking-[0.2em]">
                        <span><FiCalendar className="inline mr-1" /> {meeting.date || 'Auto-Sync'}</span>
                        <span><FiClock className="inline mr-1" /> {meeting.time || 'Pending'}</span>
                      </div>
                      <h4 className="text-base md:text-lg font-black tracking-tight text-[#0D0D0D] transition-all break-all md:break-normal">
                        {meeting.email}
                      </h4>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                    {meeting.status !== 'Approved' ? (
                      <>
                        <button
                          onClick={() => handleApprove(meeting.id)}
                          disabled={actionLoading === meeting.id}
                          className="w-full sm:w-auto bg-[#0D0D0D] text-white font-black px-6 py-3 rounded-xl hover:bg-[#4169E1] transition-all duration-500 text-[8px] uppercase tracking-[0.2em] disabled:opacity-30 flex items-center justify-center gap-2 group/btn"
                        >
                          {actionLoading === meeting.id ? 'Working...' : 'Approve'}
                          <FiChevronRight className="group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                        <button
                          onClick={() => handleDeleteMeeting(meeting.id)}
                          className="w-full sm:w-auto p-3 bg-red-500/5 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all duration-500 flex items-center justify-center"
                        >
                          <FiTrash2 className="text-base" />
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="w-full sm:w-auto bg-[#4169E1]/10 border border-[#4169E1]/20 text-[#4169E1] font-black px-6 py-3 rounded-xl text-[8px] uppercase tracking-[0.4em] flex items-center justify-center gap-2">
                          <FiCheckCircle className="text-base animate-pulse" /> Authorized
                        </div>
                        <button
                          onClick={() => handleDeleteMeeting(meeting.id)}
                          className="w-full sm:w-auto p-3 bg-red-500/5 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all duration-500 flex items-center justify-center"
                        >
                          <FiTrash2 className="text-base" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            )
          )}

          {/* CONTACTS TAB */}
          {activeTab === 'contacts' && (
            contacts.length === 0 ? (
              <div className="bg-white border border-[#0D0D0D]/20 border-dashed rounded-[2rem] md:rounded-[3rem] p-16 md:p-32 text-center">
                <FiMessageSquare className="text-3xl md:text-4xl text-[#0D0D0D]/40 mx-auto mb-4" />
                <p className="text-[#0D0D0D]/50 text-[9px] font-bold tracking-[0.4em] uppercase">No Inquiries Yet</p>
              </div>
            ) : (
              contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="bg-white border border-[#0D0D0D]/20 p-5 md:p-6 rounded-[1rem] md:rounded-[1.5rem] hover:border-[#0D0D0D]/20 transition-all duration-700 animate-in fade-in slide-in-from-bottom-5 group"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-[#0D0D0D]/10 rounded-xl flex items-center justify-center text-lg md:text-xl text-[#4169E1]">
                          <FiMessageSquare />
                        </div>
                        <div className="flex-1 min-w-0 group-hover:pl-1 transition-all duration-700">
                          <h4 className="text-base md:text-xl font-black tracking-tight text-[#0D0D0D] mb-1 truncate">
                            {contact.user_name}
                          </h4>
                          <div className="flex flex-wrap gap-2 md:gap-3 text-[7px] md:text-[8px] text-[#0D0D0D]/70 font-bold uppercase tracking-[0.2em]">
                            <span className="flex items-center gap-1.5 truncate max-w-full group-hover:text-[#4169E1] transition-colors"><FiMail className="shrink-0" /> {contact.user_email}</span>
                            {contact.user_phone && <span className="flex items-center gap-1.5"><FiPhone className="shrink-0" /> {contact.user_phone}</span>}
                            {contact.user_company && <span className="flex items-center gap-1.5"><FiBriefcase className="shrink-0" /> {contact.user_company}</span>}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 md:gap-2 ml-auto sm:ml-0">
                        <span className="px-2.5 md:px-3 py-1 md:py-1.5 bg-[#0D0D0D]/10 border border-[#0D0D0D]/20 rounded-full text-[7px] md:text-[8px] font-bold uppercase tracking-widest text-[#0D0D0D]/70 whitespace-nowrap">
                          {contact.interest}
                        </span>
                        <button
                          onClick={() => handleDeleteContact(contact.id)}
                          className="p-2.5 md:p-3 bg-red-500/5 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                        >
                          <FiTrash2 className="text-sm md:text-base" />
                        </button>
                      </div>
                    </div>

                    <div className="bg-[#0D0D0D]/10 border border-[#0D0D0D]/20 p-4 md:p-6 rounded-[0.75rem] md:rounded-[1rem] group-hover:bg-[#0D0D0D]/[0.07] transition-colors duration-700">
                      <p className="text-[#0D0D0D]/80 text-xs md:text-sm leading-relaxed font-light">
                        {contact.message}
                      </p>
                    </div>

                    <div className="flex flex-col sm:justify-between sm:flex-row sm:items-center gap-2 text-[8px] text-[#0D0D0D]/80 font-bold uppercase tracking-[0.3em]">
                      <span className="flex items-center gap-2"><FiGlobe /> Source: {contact.user_source || 'Direct'}</span>
                      <span>Received: {new Date(contact.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))
            )
          )}

          {/* BLOGS TAB */}
          {activeTab === 'blogs' && (
            <div className="animate-in fade-in slide-in-from-bottom-5">
              <BlogDashboard />
            </div>
          )}

          {/* PROJECTS TAB */}
          {activeTab === 'projects' && (
            <div className="animate-in fade-in slide-in-from-bottom-5">
              <ProjectDashboard />
            </div>
          )}

          {/* CASE STUDIES TAB */}
          {activeTab === 'case-studies' && (
            <div className="animate-in fade-in slide-in-from-bottom-5">
              <CaseStudyDashboard />
            </div>
          )}

          {/* REVIEWS TAB */}
          {activeTab === 'reviews' && (
            <div className="animate-in fade-in slide-in-from-bottom-5">
              <ReviewDashboard />
            </div>
          )}

          {/* SOCIAL MEDIA TAB */}
          {activeTab === 'social' && (
            <div className="animate-in fade-in slide-in-from-bottom-5">
              <SocialMediaDashboard />
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="bg-white border border-[#0D0D0D]/20 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] animate-in fade-in slide-in-from-bottom-5 max-w-xl">
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
          )}

        </div>
      </div>
    </div>
  );
};

export default MeetingsDashboard;

