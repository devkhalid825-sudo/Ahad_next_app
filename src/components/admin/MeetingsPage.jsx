'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiCall } from '../../utils/api';
import { getAdminToken, clearAdminAuth } from '../../utils/auth';
import {
  FiMail, FiCalendar, FiClock, FiChevronRight, FiTrash2, FiCheckCircle, FiAlertCircle
} from 'react-icons/fi';

const MeetingsPage = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const fetchData = async () => {
    const token = getAdminToken();
    if (!token) { router.push('/admin/login'); return; }
    try {
      const res = await apiCall('/meetings', 'GET', null, token);
      if (res.status === 200 && Array.isArray(res.data)) setMeetings(res.data);
      else throw new Error('Unauthorized');
    } catch {
      clearAdminAuth();
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [router]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this meeting request?')) return;
    const token = getAdminToken();
    const { status } = await apiCall(`/meetings/${id}`, 'DELETE', null, token);
    if (status === 200) {
      setMeetings(prev => prev.filter(m => m.id !== id));
      setSuccessMsg('Request Deleted');
      setTimeout(() => setSuccessMsg(''), 2000);
    }
  };

    if (loading) return (
    <>
      
      <div className="flex items-center justify-center py-20">
      <div className="w-10 h-10 border-t-2 border-[#4169E1] border-solid rounded-full animate-spin" />
    </div>
    </>
  );

  return (
    <>
      
      {successMsg && (
        <div className="fixed top-24 right-6 left-6 md:left-auto md:top-8 md:right-8 z-[60] bg-[#4169E1] text-white px-6 py-4 rounded-2xl shadow-lg font-bold flex items-center justify-center md:justify-start gap-3 text-[10px] uppercase tracking-widest">
          <FiCheckCircle size={18} /> {successMsg}
        </div>
      )}

      <header className="mb-6 md:mb-8">
        <h2 className="text-2xl md:text-4xl font-black tracking-tight uppercase bg-gradient-to-r from-[#4169E1] to-[#8B5CF6] bg-clip-text text-transparent">Meeting Inbox</h2>
        <div className="h-0.5 w-8 bg-[#4169E1] mt-3 rounded-full" />
        <p className="text-[#0D0D0D]/70 text-[11px] md:text-sm mt-3 font-light max-w-md leading-relaxed">
          Review and authorize incoming meeting requests from the contact form.
        </p>
      </header>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-6 rounded-2xl mb-8 flex items-center gap-4 animate-pulse">
          <FiAlertCircle className="text-lg" />
          <span className="text-[10px] uppercase font-black tracking-widest">{error}</span>
        </div>
      )}

      <div className="space-y-4">
        {meetings.length === 0 ? (
          <div className="bg-white border border-[#0D0D0D]/20 border-dashed rounded-[2rem] md:rounded-[3rem] p-16 md:p-32 text-center">
            <FiMail className="text-3xl md:text-4xl text-[#0D0D0D]/40 mx-auto mb-4" />
            <p className="text-[#0D0D0D]/50 text-[9px] font-bold tracking-[0.4em] uppercase">No Meeting Requests</p>
          </div>
        ) : (
          meetings.map((meeting) => (
            <div
              key={meeting.id}
              className="bg-white border border-[#0D0D0D]/20 p-5 md:p-6 rounded-[1rem] md:rounded-[1.5rem] hover:border-[#0D0D0D]/20 transition-all duration-700 flex flex-col lg:flex-row items-center justify-between gap-4 md:gap-6 group"
            >
              <div className="flex items-center gap-6 flex-1 w-full">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#0D0D0D]/10 rounded-xl flex items-center justify-center text-lg md:text-xl text-[#0D0D0D]/80 group-hover:text-[#4169E1] transition-all duration-500">
                  <FiMail />
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap gap-2 md:gap-3 text-[6px] md:text-[7px] text-[#0D0D0D]/80 font-bold uppercase tracking-[0.2em]">
                    <span><FiCalendar className="inline mr-1" /> {meeting.date || 'Auto-Sync'}</span>
                    <span><FiClock className="inline mr-1" /> {meeting.time || 'Pending'}</span>
                  </div>
                  <h4 className="text-base md:text-lg font-black tracking-tight text-[#0D0D0D] break-all md:break-normal">
                    {meeting.email}
                  </h4>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                {meeting.status !== 'Approved' ? (
                  <>
                    <div className="w-full sm:w-auto bg-[#4169E1]/10 border border-[#4169E1]/20 text-[#4169E1] font-black px-6 py-3 rounded-xl text-[8px] uppercase tracking-[0.4em] flex items-center justify-center gap-2">
                      <FiCheckCircle className="text-base" /> Approved
                    </div>
                    <button
                      onClick={() => handleDelete(meeting.id)}
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
                      onClick={() => handleDelete(meeting.id)}
                      className="w-full sm:w-auto p-3 bg-red-500/5 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all duration-500 flex items-center justify-center"
                    >
                      <FiTrash2 className="text-base" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default MeetingsPage;
