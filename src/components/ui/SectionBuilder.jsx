'use client';

import { FiUpload, FiX, FiChevronUp, FiChevronDown, FiVideo } from 'react-icons/fi';
import { BACKEND_ORIGIN } from '../../utils/api';

const SectionBuilder = ({ sections = [], onChange, onImageUpload, uploading }) => {
  const handleContentChange = (index, val) => {
    const updated = [...sections];
    if (!updated[index]) updated[index] = { content: '', image: '', video: '' };
    updated[index] = { ...updated[index], content: val };
    onChange(updated);
  };

  const handleVideoChange = (index, val) => {
    const updated = [...sections];
    if (!updated[index]) updated[index] = { content: '', image: '', video: '' };
    updated[index] = { ...updated[index], video: val };
    onChange(updated);
  };

  const getEmbedUrl = (url) => {
    if (!url) return '';
    const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  const handleImageChange = (index, file) => {
    if (onImageUpload) onImageUpload(index, file);
  };

  const removeImage = (index) => {
    const updated = [...sections];
    if (updated[index]) {
      updated[index] = { ...updated[index], image: '' };
      onChange(updated);
    }
  };

  const moveSection = (index, dir) => {
    const newIndex = index + dir;
    if (newIndex < 0 || newIndex >= sections.length) return;
    const updated = [...sections];
    const temp = updated[index];
    updated[index] = updated[newIndex];
    updated[newIndex] = temp;
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {sections.map((sec, i) => (
        <div key={i} className="border border-[#333] rounded-xl overflow-hidden bg-[#111]">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#333] bg-[#1A1A1A]">
            <span className="text-[#888] text-[8px] uppercase tracking-widest font-bold">
              Section {i + 1}
            </span>
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => moveSection(i, -1)} disabled={i === 0} className="p-1 text-[#555] hover:text-[#4169E1] disabled:opacity-20 transition-all">
                <FiChevronUp size={14} />
              </button>
              <button type="button" onClick={() => moveSection(i, 1)} disabled={i === sections.length - 1} className="p-1 text-[#555] hover:text-[#4169E1] disabled:opacity-20 transition-all">
                <FiChevronDown size={14} />
              </button>
            </div>
          </div>
          <div className="p-4 space-y-3">
            <div>
              <label className="block text-[#888] text-[7px] uppercase tracking-widest mb-1.5 font-bold">Description</label>
              <textarea
                value={sec.content || ''}
                onChange={(e) => handleContentChange(i, e.target.value)}
                rows={3}
                className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs resize-none placeholder:text-[#444]"
                placeholder="Section description..."
              />
            </div>
            <div>
              <label className="block text-[#888] text-[7px] uppercase tracking-widest mb-1.5 font-bold">
                Section Image
              </label>
              <div className="flex items-center gap-3">
                {sec.image && (
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-[#333] shrink-0 group">
                    <img src={sec.image.startsWith('http') ? sec.image : `${BACKEND_ORIGIN}${sec.image}`} alt="" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => removeImage(i)} className="absolute inset-0 bg-[#0D0D0D]/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                      <FiX className="text-white text-xs" />
                    </button>
                  </div>
                )}
                <label className={`flex items-center justify-center gap-2 border border-dashed border-[#333] rounded-xl px-4 py-2.5 cursor-pointer hover:border-[#4169E1]/50 transition-all ${uploading ? 'opacity-50 pointer-events-none' : ''} flex-1`}>
                  <FiUpload className={`${uploading ? 'animate-bounce text-[#4169E1]' : 'text-[#555]'} text-[10px]`} />
                  <span className="text-[#555] text-[8px] font-bold uppercase tracking-widest">
                    {uploading ? 'Uploading...' : 'Choose Image'}
                  </span>
                  <input type="file" accept="image/*" onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) handleImageChange(i, file);
                  }} className="hidden" disabled={uploading} />
                </label>
              </div>
            </div>
            <div>
              <label className="block text-[#888] text-[7px] uppercase tracking-widest mb-1.5 font-bold">
                <FiVideo className="inline mr-1 text-[8px]" /> YouTube Video URL
              </label>
              <div className="flex items-center gap-3">
                <input
                  value={sec.video || ''}
                  onChange={(e) => handleVideoChange(i, e.target.value)}
                  className="flex-1 bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-2.5 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#444]"
                  placeholder="https://youtube.com/watch?v=... or embed code"
                />
                {sec.video && (
                  <button type="button" onClick={() => handleVideoChange(i, '')} className="text-[#555] hover:text-red-400 transition-all">
                    <FiX size={14} />
                  </button>
                )}
              </div>
              {sec.video && (
                <div className="mt-2 w-full h-0 pb-[56.25%] relative rounded-lg overflow-hidden border border-[#333] bg-[#0D0D0D]">
                  <iframe src={getEmbedUrl(sec.video)} className="absolute top-0 left-0 w-full h-full" allowFullScreen title="YouTube preview" />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SectionBuilder;
