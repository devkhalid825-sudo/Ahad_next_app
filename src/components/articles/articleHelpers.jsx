﻿'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { IoChevronDown } from 'react-icons/io5';
import { FaPlus, FaArrowRight } from 'react-icons/fa';

export const ArticleProgress = ({ fromColor = '#0D0D0D' }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1.5 z-[120] origin-left"
      style={{ scaleX, background: `linear-gradient(to right, ${fromColor}, #4169E1)` }}
    />
  );
};

export const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 rounded-[24px] bg-gray-50 border border-gray-100 flex items-center justify-between hover:bg-white hover:shadow-md transition-all duration-300 group"
      >
        <span className="text-left font-medium text-gray-800 group-hover:text-black">{question}</span>
        <IoChevronDown className={`text-[#4169E1] transition-transform duration-500 shrink-0 ml-4 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 text-gray-600 leading-relaxed bg-white border-x border-b border-gray-100 rounded-b-[24px] -mt-2">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const ImagePlaceholder = ({ height = "h-[400px]", text = "Asset", className = "", src = "", video = "", link = "", linkText = "", contain = false }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={`relative w-full rounded-[30px] md:rounded-[40px] overflow-hidden border-2 border-black ${contain ? 'bg-white' : 'bg-gray-50'} group shadow-xl ${className} ${height}`}
    >
      {video ? (
        <video src={video} autoPlay loop muted playsInline className="w-full h-full object-cover" />
      ) : src ? (
        <img src={src} alt={text} className={`w-full h-full ${contain ? 'object-contain p-8' : 'object-cover'}`} />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-black/10 p-6 text-center">
          <div className="w-16 h-16 mb-4 border-2 border-dashed border-black/5 rounded-full flex items-center justify-center">
            <FaPlus className="text-base md:text-lg" />
          </div>
          <p className="text-sm font-semibold tracking-widest uppercase mb-1">{text}</p>
        </div>
      )}

      {link && (
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <a href={link} target="_blank" rel="noopener noreferrer" className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <div className="bg-[#4169E1] text-white px-8 py-3 rounded-full text-sm font-medium shadow-2xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all">
              <span>{linkText || 'Learn More'}</span>
              <FaArrowRight className="text-[10px]" />
            </div>
          </a>
        </div>
      )}
    </motion.div>
  );
};

export const StatCard = ({ number, label, suffix = "", delay = 0 }) => {
  const [count, setCount] = useState(0);
  const target = parseInt(number);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      className="p-8 rounded-[40px] bg-white border border-gray-100 shadow-sm text-center hover:border-[#4169E1]/30 transition-all duration-500 group"
    >
      <h3 className="text-base md:text-lg font-normal text-[#0D0D0D] mb-2 tracking-tighter">
        {count}{suffix}
      </h3>
      <p className="text-gray-500 text-sm uppercase tracking-widest font-semibold group-hover:text-[#4169E1] transition-colors duration-300">
        {label}
      </p>
    </motion.div>
  );
};

export const TextCarousel = ({ paragraphs, delay = 5000 }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % paragraphs.length);
    }, delay);
    return () => clearInterval(timer);
  }, [paragraphs.length, delay]);

  return (
    <div className="relative min-h-[220px] md:min-h-[180px] flex flex-col justify-center bg-gray-50/50 rounded-[30px] p-6 md:p-10 border border-gray-100 shadow-sm overflow-hidden">
      <div className="absolute top-4 left-6 text-[#4169E1]/10 text-base md:text-lg font-serif select-none">{"\u201C"}</div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10"
        >
          <p className="text-base md:text-lg text-gray-800 leading-[1.4] font-normal tracking-tight">
            {paragraphs[index]}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-4 left-10 flex gap-2 z-20">
        {paragraphs.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1 rounded-full transition-all duration-500 ${i === index ? 'bg-[#4169E1] w-10' : 'bg-gray-200 w-2 hover:bg-gray-300'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export const FeatureCarousel = ({ features, delay = 6000, variant = "white" }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % features.length);
    }, delay);
    return () => clearInterval(timer);
  }, [features.length, delay]);

  const isDark = variant === "dark";

  return (
    <div className={`relative min-h-[300px] md:min-h-[260px] flex flex-col justify-center ${isDark ? 'bg-gray-900' : 'bg-white'} rounded-[30px] p-6 md:p-10 border ${isDark ? 'border-gray-800' : 'border-gray-100'} shadow-sm overflow-hidden`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-[#4169E1]' : 'text-[#4169E1]'}`}>
              {String(features[index].number || index + 1).padStart(2, '0')}
            </span>
          </div>
          <h3 className={`text-xl md:text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-[#0D0D0D]'}`}>
            {features[index].title}
          </h3>
          <p className={`text-sm md:text-base leading-relaxed max-w-2xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {features[index].desc || features[index].description}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className={`absolute bottom-4 left-10 flex gap-2 z-20`}>
        {features.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1 rounded-full transition-all duration-500 ${i === index ? 'bg-[#4169E1] w-10' : `${isDark ? 'bg-gray-600' : 'bg-gray-200'} w-2 hover:bg-gray-300`}`}
            aria-label={`Go to feature ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
