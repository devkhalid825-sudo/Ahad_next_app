'use client';

import { useState, useEffect } from 'react';
import { apiCall } from '../utils/api';
import { getAdminToken } from '../utils/auth';
import { FiPlus, FiTrash2, FiX, FiSave, FiMove, FiEdit2 } from 'react-icons/fi';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableItem = ({ item, onEdit, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };
  return (
    <div ref={setNodeRef} style={style} className="bg-white border border-[#0D0D0D]/20 p-3 md:p-5 rounded-[1rem] md:rounded-[1.5rem] hover:border-[#0D0D0D]/30 transition-all flex items-center gap-2 md:gap-4 group">
      <button {...attributes} {...listeners} className="cursor-grab p-1 md:p-1.5 text-[#0D0D0D]/40 hover:text-[#4169E1] transition-colors shrink-0">
        <FiMove className="text-sm md:text-lg" />
      </button>
      <div className="flex-1 min-w-0">
        <h4 className="text-xs md:text-base font-black tracking-tight text-[#0D0D0D] truncate">{item.projectName || 'Untitled'}</h4>
        <div className="text-[6px] md:text-[8px] text-[#0D0D0D]/60 font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] mt-0.5 md:mt-1 truncate">
          {item.videoUrl || '—'}
        </div>
      </div>
      <button onClick={() => onEdit(item)} className="p-1.5 md:p-2.5 bg-[#0D0D0D]/10 text-[#0D0D0D]/40 hover:text-[#4169E1] hover:bg-[#0D0D0D]/10 rounded-lg md:rounded-xl transition-all">
        <FiEdit2 className="text-[10px] md:text-xs" />
      </button>
      <button onClick={() => onDelete(item.id)} className="p-1.5 md:p-2.5 bg-red-500/10 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 rounded-lg md:rounded-xl transition-all">
        <FiTrash2 className="text-[10px] md:text-xs" />
      </button>
    </div>
  );
};

const SocialMediaDashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ videoUrl: '', projectName: '', projectLink: '' });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const token = getAdminToken();

  const fetchItems = async () => {
    setLoading(true);
    const { data, status } = await apiCall('/social-media', 'GET');
    if (status === 200) setItems(data);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const showMsg = (text) => { setMsg(text); setTimeout(() => setMsg(''), 3000); };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.videoUrl) {
      showMsg('Video URL is required');
      return;
    }
    setSaving(true);
    try {
      if (editing) {
        const { status } = await apiCall(`/social-media/${editing.id}`, 'PUT', form, token);
        if (status === 200) showMsg('Updated successfully');
        else showMsg('Failed to update');
      } else {
        const { status } = await apiCall('/social-media', 'POST', form, token);
        if (status === 201) showMsg('Created successfully');
        else showMsg('Failed to create');
      }
      fetchItems();
      setShowForm(false);
      setEditing(null);
      setForm({ videoUrl: '', projectName: '', projectLink: '' });
    } catch { showMsg('Error saving'); }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this social media item?')) return;
    const { status } = await apiCall(`/social-media/${id}`, 'DELETE', null, token);
    if (status === 200) { showMsg('Deleted'); fetchItems(); }
    else showMsg('Failed to delete');
  };

  const handleEdit = (item) => {
    setEditing(item);
    setForm({ videoUrl: item.videoUrl || '', projectName: item.projectName || '', projectLink: item.projectLink || '' });
    setShowForm(true);
  };

  const openNewForm = () => {
    setEditing(null);
    setForm({ videoUrl: '', projectName: '', projectLink: '' });
    setShowForm(true);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex(r => r.id === active.id);
    const newIndex = items.findIndex(r => r.id === over.id);
    const reordered = [...items];
    const [moved] = reordered.splice(oldIndex, 1);
    reordered.splice(newIndex, 0, moved);
    const orderedItems = reordered.map((r, i) => ({ id: r.id, position: i }));
    setItems(reordered);
    await apiCall('/social-media/reorder', 'PUT', { items: orderedItems }, token);
  };

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  return (
    <div>
      {msg && (
        <div className="fixed top-24 right-6 left-6 md:left-auto md:top-8 md:right-8 z-[60] bg-[#4169E1] text-white px-6 py-4 rounded-2xl shadow-lg font-bold flex items-center gap-3 animate-in fade-in text-[10px] uppercase tracking-widest">
          {msg}
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 md:mb-8">
        <h3 className="text-[#0D0D0D] text-xl font-black tracking-tight uppercase">Social Media</h3>
        <button onClick={openNewForm} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#4169E1] text-white font-black px-5 py-3 rounded-xl hover:bg-[#0D0D0D] transition-all text-[8px] uppercase tracking-[0.2em]">
          <FiPlus /> Add Video
        </button>
      </div>

      {loading ? (
        <div className="text-[#0D0D0D]/40 text-center py-12">Loading...</div>
      ) : items.length === 0 ? (
        <div className="bg-white border border-[#0D0D0D]/20 border-dashed rounded-[2rem] p-16 md:p-32 text-center">
          <p className="text-[#0D0D0D]/50 text-[8px] uppercase tracking-[0.3em] font-bold">No social media videos yet. Click "Add Video" to create one.</p>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={items.map(r => r.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2 md:space-y-3">
              {items.map(item => (
                <SortableItem key={item.id} item={item} onEdit={handleEdit} onDelete={handleDelete} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-[#0D0D0D]/60 flex items-center justify-center z-50 p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white border border-[#0D0D0D]/20 rounded-xl md:rounded-[2rem] w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-[#0D0D0D]/20">
              <h3 className="text-[#0D0D0D] text-base md:text-lg font-black tracking-tight uppercase">{editing ? 'Edit Social Media' : 'Add Social Media'}</h3>
              <button onClick={() => setShowForm(false)} className="text-[#0D0D0D]/40 hover:text-[#0D0D0D] p-1"><FiX /></button>
            </div>
            <form onSubmit={handleSave} className="p-4 md:p-6 space-y-4">
              <div>
                <label className="block text-[#0D0D0D]/60 text-[8px] uppercase tracking-widest mb-2 font-bold">Video URL *</label>
                <input type="text" value={form.videoUrl} onChange={e => setForm({ ...form, videoUrl: e.target.value })} className="w-full bg-[#0D0D0D]/10 text-[#0D0D0D] px-4 py-3 rounded-xl border border-[#0D0D0D]/20 focus:outline-none focus:border-[#4169E1] transition-all text-sm" placeholder="Paste video URL (mp4, YouTube, Instagram Reel)" />
                <p className="text-[#0D0D0D]/40 text-[7px] uppercase tracking-widest mt-1.5 font-bold">Supports YouTube (watch, shorts), Instagram (reel, post), and direct video uploads</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#0D0D0D]/60 text-[8px] uppercase tracking-widest mb-2 font-bold">Project Name</label>
                  <input type="text" value={form.projectName} onChange={e => setForm({ ...form, projectName: e.target.value })} className="w-full bg-[#0D0D0D]/10 text-[#0D0D0D] px-4 py-3 rounded-xl border border-[#0D0D0D]/20 focus:outline-none focus:border-[#4169E1] transition-all text-sm" placeholder="e.g. Ahmed Food Case Study" />
                </div>
                <div>
                  <label className="block text-[#0D0D0D]/60 text-[8px] uppercase tracking-widest mb-2 font-bold">Project Link</label>
                  <input type="text" value={form.projectLink} onChange={e => setForm({ ...form, projectLink: e.target.value })} className="w-full bg-[#0D0D0D]/10 text-[#0D0D0D] px-4 py-3 rounded-xl border border-[#0D0D0D]/20 focus:outline-none focus:border-[#4169E1] transition-all text-sm" placeholder="e.g. /project/ahmed-food" />
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

export default SocialMediaDashboard;
