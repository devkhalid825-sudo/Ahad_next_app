'use client';

import { useState, useEffect } from 'react';
import { apiCall, API_BASE_URL } from '../utils/api';
import { getAdminToken } from '../utils/auth';
import { FiPlus, FiTrash2, FiX, FiSave, FiMove, FiEdit2 } from 'react-icons/fi';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableReviewItem = ({ review, onEdit, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: review.id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };
  return (
    <div ref={setNodeRef} style={style} className="bg-white border border-[#0D0D0D]/20 p-3 md:p-5 rounded-[1rem] md:rounded-[1.5rem] hover:border-[#0D0D0D]/30 transition-all flex items-center gap-2 md:gap-4 group">
      <button {...attributes} {...listeners} className="cursor-grab p-1 md:p-1.5 text-[#0D0D0D]/40 hover:text-[#4169E1] transition-colors shrink-0">
        <FiMove className="text-sm md:text-lg" />
      </button>
      <div className="flex-1 min-w-0">
        <h4 className="text-xs md:text-base font-black tracking-tight text-[#0D0D0D] truncate">{review.clientName}</h4>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[6px] md:text-[8px] text-[#0D0D0D]/60 font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] mt-0.5 md:mt-1">
          <span>{review.company || '—'}</span>
          {review.projectName && (
            <>
              <span className="w-1 h-1 rounded-full bg-[#4169E1]/40 shrink-0"></span>
              <span className="truncate max-w-[60px] md:max-w-none">{review.projectName}</span>
            </>
          )}
        </div>
      </div>
      <button onClick={() => onEdit(review)} className="p-1.5 md:p-2.5 bg-[#0D0D0D]/10 text-[#0D0D0D]/40 hover:text-[#4169E1] hover:bg-[#0D0D0D]/10 rounded-lg md:rounded-xl transition-all">
        <FiEdit2 className="text-[10px] md:text-xs" />
      </button>
      <button onClick={() => onDelete(review.id)} className="p-1.5 md:p-2.5 bg-red-500/10 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 rounded-lg md:rounded-xl transition-all">
        <FiTrash2 className="text-[10px] md:text-xs" />
      </button>
    </div>
  );
};

const ReviewDashboard = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ clientName: '', company: '', projectName: '', projectLink: '', video: '' });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const token = getAdminToken();
  const importedKey = 'reviews_imported';

  const fetchReviews = async () => {
    setLoading(true);
    const { data, status } = await apiCall('/reviews', 'GET');
    if (status === 200) setReviews(data);
    setLoading(false);
    return { data, status };
  };

  const importStaticReviews = async () => {
    setSeeding(true);
    const { status } = await apiCall('/seed/static', 'POST', null, token);
    if (status === 200) {
      localStorage.setItem(importedKey, '1');
      showMsg('Static reviews imported!');
      fetchReviews();
    } else {
      showMsg('Failed to import');
    }
    setSeeding(false);
  };

  // Standard fetch-on-mount: fetchReviews's setState calls only run after
  // its awaited request settles, not synchronously within this effect.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchReviews(); }, []);

  const showMsg = (text) => { setMsg(text); setTimeout(() => setMsg(''), 3000); };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.clientName || !form.video) {
      showMsg('Client Name and Video URL are required');
      return;
    }
    setSaving(true);
    try {
      if (editing) {
        const { status } = await apiCall(`/reviews/${editing.id}`, 'PUT', form, token);
        if (status === 200) showMsg('Review updated successfully');
        else showMsg('Failed to update review');
      } else {
        const { status } = await apiCall('/reviews', 'POST', form, token);
        if (status === 201) showMsg('Review created successfully');
        else showMsg('Failed to create review');
      }
      fetchReviews();
      setShowForm(false);
      setEditing(null);
      setForm({ clientName: '', company: '', projectName: '', projectLink: '', video: '' });
    } catch { showMsg('Error saving review'); }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this review?')) return;
    const { status } = await apiCall(`/reviews/${id}`, 'DELETE', null, token);
    if (status === 200) { showMsg('Review deleted'); fetchReviews(); }
    else showMsg('Failed to delete');
  };

  const handleEdit = (review) => {
    setEditing(review);
    setForm({ clientName: review.clientName, company: review.company || '', projectName: review.projectName || '', projectLink: review.projectLink || '', video: review.video || '' });
    setShowForm(true);
  };

  const openNewForm = () => {
    setEditing(null);
    setForm({ clientName: '', company: '', projectName: '', projectLink: '', video: '' });
    setShowForm(true);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = reviews.findIndex(r => r.id === active.id);
    const newIndex = reviews.findIndex(r => r.id === over.id);
    const reordered = [...reviews];
    const [moved] = reordered.splice(oldIndex, 1);
    reordered.splice(newIndex, 0, moved);
    const items = reordered.map((r, i) => ({ id: r.id, position: i }));
    setReviews(reordered);
    await apiCall('/reviews/reorder', 'PUT', { items }, token);
  };

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('image', file);
    try {
      const res = await fetch(`${API_BASE_URL}/upload?type=reviews`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const data = await res.json();
      if (data.url) setForm(prev => ({ ...prev, video: data.url }));
    } catch { showMsg('Upload failed'); }
  };

  return (
    <div>
      {msg && (
        <div className="fixed top-24 right-6 left-6 md:left-auto md:top-8 md:right-8 z-[60] bg-[#4169E1] text-white px-6 py-4 rounded-2xl shadow-lg font-bold flex items-center gap-3 animate-in fade-in text-[10px] uppercase tracking-widest">
          {msg}
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 md:mb-8">
        <h3 className="text-[#0D0D0D] text-xl font-black tracking-tight uppercase">Client Reviews</h3>
        <button onClick={openNewForm} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#4169E1] text-white font-black px-5 py-3 rounded-xl hover:bg-[#0D0D0D] transition-all text-[8px] uppercase tracking-[0.2em]">
          <FiPlus /> Add Review
        </button>
      </div>

      {loading ? (
        <div className="text-[#0D0D0D]/40 text-center py-12">Loading...</div>
      ) : reviews.length === 0 ? (
        <div className="bg-white border border-[#0D0D0D]/20 border-dashed rounded-[2rem] p-10 md:p-20 text-center">
          <p className="text-[#0D0D0D]/50 text-[8px] uppercase tracking-[0.3em] font-bold mb-4">No reviews yet.</p>
          {localStorage.getItem(importedKey) ? (
            <p className="text-[#0D0D0D]/40 text-[7px] uppercase tracking-[0.3em]">Already imported. Click Add Review to create new ones.</p>
          ) : (
            <button onClick={importStaticReviews} disabled={seeding} className="inline-flex items-center gap-2 bg-[#4169E1] text-white font-black px-6 py-3 rounded-xl hover:bg-[#0D0D0D] transition-all text-[8px] uppercase tracking-[0.2em] disabled:opacity-50">
              {seeding ? 'Importing...' : 'Import Existing Reviews'}
            </button>
          )}
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={reviews.map(r => r.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2 md:space-y-3">
              {reviews.map(review => (
                <SortableReviewItem key={review.id} review={review} onEdit={handleEdit} onDelete={handleDelete} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-[#0D0D0D]/60 flex items-center justify-center z-50 p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white border border-[#0D0D0D]/20 rounded-xl md:rounded-[2rem] w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-[#0D0D0D]/20">
              <h3 className="text-[#0D0D0D] text-base md:text-lg font-black tracking-tight uppercase">{editing ? 'Edit Review' : 'Add Review'}</h3>
              <button onClick={() => setShowForm(false)} className="text-[#0D0D0D]/40 hover:text-[#0D0D0D] p-1"><FiX /></button>
            </div>
            <form onSubmit={handleSave} className="p-4 md:p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#0D0D0D]/60 text-[8px] uppercase tracking-widest mb-2 font-bold">Client Name *</label>
                  <input type="text" value={form.clientName} onChange={e => setForm({ ...form, clientName: e.target.value })} className="w-full bg-[#0D0D0D]/10 text-[#0D0D0D] px-4 py-3 rounded-xl border border-[#0D0D0D]/20 focus:outline-none focus:border-[#4169E1] transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-[#0D0D0D]/60 text-[8px] uppercase tracking-widest mb-2 font-bold">Company</label>
                  <input type="text" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} className="w-full bg-[#0D0D0D]/10 text-[#0D0D0D] px-4 py-3 rounded-xl border border-[#0D0D0D]/20 focus:outline-none focus:border-[#4169E1] transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-[#0D0D0D]/60 text-[8px] uppercase tracking-widest mb-2 font-bold">Project Name</label>
                  <input type="text" value={form.projectName} onChange={e => setForm({ ...form, projectName: e.target.value })} className="w-full bg-[#0D0D0D]/10 text-[#0D0D0D] px-4 py-3 rounded-xl border border-[#0D0D0D]/20 focus:outline-none focus:border-[#4169E1] transition-all text-sm" placeholder="e.g. Ahmed Food Case Study" />
                </div>
                <div>
                  <label className="block text-[#0D0D0D]/60 text-[8px] uppercase tracking-widest mb-2 font-bold">Project Link</label>
                  <input type="text" value={form.projectLink} onChange={e => setForm({ ...form, projectLink: e.target.value })} className="w-full bg-[#0D0D0D]/10 text-[#0D0D0D] px-4 py-3 rounded-xl border border-[#0D0D0D]/20 focus:outline-none focus:border-[#4169E1] transition-all text-sm" placeholder="e.g. /project/ahmed-food" />
                </div>
              </div>
              <div>
                <label className="block text-[#0D0D0D]/60 text-[8px] uppercase tracking-widest mb-2 font-bold">Video URL *</label>
                <input type="text" value={form.video} onChange={e => setForm({ ...form, video: e.target.value })} className="w-full bg-[#0D0D0D]/10 text-[#0D0D0D] px-4 py-3 rounded-xl border border-[#0D0D0D]/20 focus:outline-none focus:border-[#4169E1] transition-all text-sm" placeholder="Paste YouTube link or upload" />
                <p className="text-[#0D0D0D]/40 text-[7px] uppercase tracking-widest mt-1.5 font-bold">Supports YouTube (watch, shorts, unlisted) and video uploads</p>
                <div className="mt-2 flex items-center gap-3">
                  <label className="cursor-pointer inline-flex items-center gap-2 bg-[#0D0D0D]/10 hover:bg-[#0D0D0D]/20 text-[#0D0D0D]/60 text-[11px] px-4 py-2 rounded-xl transition font-bold uppercase tracking-wider">
                    Upload Video
                    <input type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" />
                  </label>
                  {form.video && (
                    <span className="text-green-600 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                      Video attached
                      <button type="button" onClick={() => setForm({ ...form, video: '' })} className="text-red-500 hover:text-red-700 ml-1">Remove</button>
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-3 pt-4 border-t border-[#0D0D0D]/20">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 border border-[#0D0D0D]/20 text-[#0D0D0D]/40 font-black py-3.5 rounded-xl hover:bg-[#0D0D0D]/10 transition-all text-[8px] uppercase tracking-[0.2em]">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 bg-[#4169E1] text-white font-black py-3.5 rounded-xl hover:bg-[#0D0D0D] transition-all disabled:opacity-50 text-[8px] uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                  <FiSave /> {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewDashboard;
