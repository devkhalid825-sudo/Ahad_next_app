'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiCall } from '../../utils/api';
import { getAdminToken, clearAdminAuth } from '../../utils/auth';
import {
  FiMessageSquare, FiMail, FiPhone, FiBriefcase, FiGlobe, FiTrash2, FiCheckCircle
} from 'react-icons/fi';

const InquiriesPage = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState('');
  const router = useRouter();

  const fetchData = async () => {
    const token = getAdminToken();
    if (!token) { router.push('/admin/login'); return; }
    try {
      const res = await apiCall('/contact', 'GET', null, token);
      if (res.status === 200 && Array.isArray(res.data)) setContacts(res.data);
    } catch {
      clearAdminAuth();
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [router]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this inquiry?')) return;
    const token = getAdminToken();
    const { status } = await apiCall(`/contact/${id}`, 'DELETE', null, token);
    if (status === 200) {
      setContacts(prev => prev.filter(c => c.id !== id));
      setSuccessMsg('Inquiry Deleted');
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
        <h2 className="text-2xl md:text-4xl font-black tracking-tight uppercase bg-gradient-to-r from-[#4169E1] to-[#8B5CF6] bg-clip-text text-transparent">Contact Inquiries</h2>
        <div className="h-0.5 w-8 bg-[#4169E1] mt-3 rounded-full" />
        <p className="text-[#0D0D0D]/70 text-[11px] md:text-sm mt-3 font-light max-w-md leading-relaxed">
          Incoming inquiries from the contact page.
        </p>
      </header>

      <div className="space-y-4">
        {contacts.length === 0 ? (
          <div className="bg-white border border-[#0D0D0D]/20 border-dashed rounded-[2rem] md:rounded-[3rem] p-16 md:p-32 text-center">
            <FiMessageSquare className="text-3xl md:text-4xl text-[#0D0D0D]/40 mx-auto mb-4" />
            <p className="text-[#0D0D0D]/50 text-[9px] font-bold tracking-[0.4em] uppercase">No Inquiries Yet</p>
          </div>
        ) : (
          contacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white border border-[#0D0D0D]/20 p-5 md:p-6 rounded-[1rem] md:rounded-[1.5rem] hover:border-[#0D0D0D]/20 transition-all duration-700 group"
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-[#0D0D0D]/10 rounded-xl flex items-center justify-center text-lg md:text-xl text-[#4169E1]">
                      <FiMessageSquare />
                    </div>
                    <div className="flex-1 min-w-0 group-hover:pl-1 transition-all duration-700">
                      <h4 className="text-base md:text-xl font-black tracking-tight text-[#0D0D0D] mb-1 truncate">{contact.user_name}</h4>
                      <div className="flex flex-wrap gap-2 md:gap-3 text-[7px] md:text-[8px] text-[#0D0D0D]/70 font-bold uppercase tracking-[0.2em]">
                        <span className="flex items-center gap-1.5 truncate max-w-full group-hover:text-[#4169E1] transition-colors"><FiMail className="shrink-0" /> {contact.user_email}</span>
                        {contact.user_phone && <span className="flex items-center gap-1.5"><FiPhone className="shrink-0" /> {contact.user_phone}</span>}
                        {contact.user_company && <span className="flex items-center gap-1.5"><FiBriefcase className="shrink-0" /> {contact.user_company}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-auto sm:ml-0">
                    <span className="px-2.5 md:px-3 py-1 md:py-1.5 bg-[#0D0D0D]/10 border border-[#0D0D0D]/20 rounded-full text-[7px] md:text-[8px] font-bold uppercase tracking-widest text-[#0D0D0D]/70 whitespace-nowrap">
                      {contact.interest}
                    </span>
                    <button
                      onClick={() => handleDelete(contact.id)}
                      className="p-2.5 md:p-3 bg-red-500/5 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                    >
                      <FiTrash2 className="text-sm md:text-base" />
                    </button>
                  </div>
                </div>

                <div className="bg-[#0D0D0D]/10 border border-[#0D0D0D]/20 p-4 md:p-6 rounded-[0.75rem] md:rounded-[1rem] group-hover:bg-[#0D0D0D]/[0.07] transition-colors duration-700">
                  <p className="text-[#0D0D0D]/80 text-xs md:text-sm leading-relaxed font-light">{contact.message}</p>
                </div>

                <div className="flex flex-col sm:justify-between sm:flex-row sm:items-center gap-2 text-[8px] text-[#0D0D0D]/80 font-bold uppercase tracking-[0.3em]">
                  <span className="flex items-center gap-2"><FiGlobe /> Source: {contact.user_source || 'Direct'}</span>
                  <span>Received: {new Date(contact.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default InquiriesPage;
