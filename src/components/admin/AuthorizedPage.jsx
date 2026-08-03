'use client';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiCall } from '../../utils/api';
import {
  FiCheckCircle, FiMail, FiCalendar, FiClock, FiTrash2, FiAlertCircle
} from 'react-icons/fi';

const AuthorizedPage = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) { navigate('/admin/login'); return; }
    try {
      const res = await apiCall('/meetings', 'GET', null, token);
      if (res.status === 200) setMeetings(res.data.filter(m => m.status === 'Approved'));
    } catch {
      localStorage.removeItem('adminToken');
      navigate('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this authorized meeting?')) return;
    const token = localStorage.getItem('adminToken');
    const { status } = await apiCall(`/meetings/${id}`, 'DELETE', null, token);
    if (status === 200) {
      setMeetings(prev => prev.filter(m => m.id !== id));
      setSuccessMsg('Deleted');
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
        <h2 className="text-2xl md:text-4xl font-black tracking-tight uppercase bg-gradient-to-r from-[#4169E1] to-[#8B5CF6] bg-clip-text text-transparent">Authorized</h2>
        <div className="h-0.5 w-8 bg-[#4169E1] mt-3 rounded-full" />
        <p className="text-[#0D0D0D]/70 text-[11px] md:text-sm mt-3 font-light max-w-md leading-relaxed">
          Archive of all authorized and completed meeting nodes.
        </p>
      </header>

      <div className="space-y-4">
        {meetings.length === 0 ? (
          <div className="bg-white border border-[#0D0D0D]/20 border-dashed rounded-[2rem] md:rounded-[3rem] p-16 md:p-32 text-center">
            <FiCheckCircle className="text-3xl md:text-4xl text-[#0D0D0D]/40 mx-auto mb-4" />
            <p className="text-[#0D0D0D]/50 text-[9px] font-bold tracking-[0.4em] uppercase">No Authorized Meetings</p>
          </div>
        ) : (
          meetings.map((meeting) => (
            <div
              key={meeting.id}
              className="bg-white border border-[#0D0D0D]/20 p-5 md:p-6 rounded-[1rem] md:rounded-[1.5rem] hover:border-[#0D0D0D]/20 transition-all duration-700 flex flex-col lg:flex-row items-center justify-between gap-4 md:gap-6 group"
            >
              <div className="flex items-center gap-6 flex-1 w-full">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#4169E1]/10 rounded-xl flex items-center justify-center text-lg md:text-xl text-[#4169E1]">
                  <FiCheckCircle />
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
              <div className="flex items-center gap-3">
                <div className="bg-[#4169E1]/10 border border-[#4169E1]/20 text-[#4169E1] font-black px-6 py-3 rounded-xl text-[8px] uppercase tracking-[0.4em] flex items-center gap-2">
                  <FiCheckCircle className="text-base animate-pulse" /> Authorized
                </div>
                <button
                  onClick={() => handleDelete(meeting.id)}
                  className="p-3 bg-red-500/5 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                >
                  <FiTrash2 className="text-base" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default AuthorizedPage;
