'use client';


import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

// Images imports
import _vr from "../assets/ElipseImages/projects/VR1.webp";
import _recada from "../assets/ElipseImages/projects/image 4.webp";
import _costa from "../assets/ElipseImages/projects/image 7.webp";
import _motion from "../assets/ElipseImages/projects/motion-graphics.webp";
import _forrels from "../assets/ElipseImages/projects/2D.webp";
import _render from "../assets/ElipseImages/projects/3D-rendering.webp";
import { getImgSrc } from "../utils/api";
const vr = getImgSrc(_vr);
const recada = getImgSrc(_recada);
const costa = getImgSrc(_costa);
const motion = getImgSrc(_motion);
const forrels = getImgSrc(_forrels);
const render = getImgSrc(_render);

const slides = [
  { title: ["Engaging", "2D Animation"], image: forrels, from: "from-[#141416]", to: "to-[#0a0a0b]", textColor: "text-white", fade: "black" },
  { title: ["Sales-Driven", "Commercials"], image: recada, from: "from-[#141416]", to: "to-[#0a0a0b]", textColor: "text-white", fade: "black" },
  { title: ["Interactive", "Configurators"], image: costa, from: "from-[#141416]", to: "to-[#0a0a0b]", textColor: "text-white", fade: "black" },
  { title: ["Photoreal", "3D Rendering"], image: render, from: "from-[#141416]", to: "to-[#0a0a0b]", textColor: "text-white", fade: "black" },
  { title: ["Immersive", "VR Experiences"], image: vr, from: "from-[#141416]", to: "to-[#0a0a0b]", textColor: "text-white", fade: "black" },
  { title: ["Dynamic", "Motion Graphics"], image: motion, from: "from-[#141416]", to: "to-[#0a0a0b]", textColor: "text-white", fade: "black" },
  // Duplicated items for seamless loop
  { title: ["Engaging", "2D Animation"], image: forrels, from: "from-[#141416]", to: "to-[#0a0a0b]", textColor: "text-white", fade: "black" },
  { title: ["Sales-Driven", "Commercials"], image: recada, from: "from-[#141416]", to: "to-[#0a0a0b]", textColor: "text-white", fade: "black" },
  { title: ["Interactive", "Configurators"], image: costa, from: "from-[#141416]", to: "to-[#0a0a0b]", textColor: "text-white", fade: "black" },
  { title: ["Photoreal", "3D Rendering"], image: render, from: "from-[#141416]", to: "to-[#0a0a0b]", textColor: "text-white", fade: "black" },
  { title: ["Immersive", "VR Experiences"], image: vr, from: "from-[#141416]", to: "to-[#0a0a0b]", textColor: "text-white", fade: "black" },
  { title: ["Dynamic", "Motion Graphics"], image: motion, from: "from-[#141416]", to: "to-[#0a0a0b]", textColor: "text-white", fade: "black" },
];

const SolutionsSection = () => {

  return (
    <section id="solutions" className="bg-gradient-to-b from-[#0c0c0d] to-[#010101] text-white overflow-hidden font-sans border-t border-white/5 w-full py-8 md:py-14 relative">

      <div className="w-full relative px-[15px] md:px-[40px]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-10 text-center sm:text-left">
          <h2 className="text-2xl md:text-4xl lg:text-[44px] font-medium tracking-tight leading-[1.1] text-white">
            Solutions That Drive Results
          </h2>
          <Link
            to="/contact"
            className="inline-block bg-[#4169E1] hover:bg-[#3558c8] text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full text-xs md:text-base font-medium transition-all shadow-lg shadow-[#4169E1]/20 hover:shadow-[#4169E1]/40 sm:mt-0 mt-2 self-center sm:self-auto"
          >
            Start Your Project
          </Link>
        </div>

        <div className="relative group w-full">
          <Swiper
            modules={[Autoplay, Pagination, FreeMode]}
            loop={true}
            speed={8000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            navigation={false}
            slidesPerView="auto"
            spaceBetween={10}
            slidesOffsetBefore={24}
            freeMode={{
              enabled: true,
              momentum: false,
            }}
            grabCursor={true}
            allowTouchMove={true}
            className="!overflow-visible px-0 marquee-swiper"
            breakpoints={{
              768: {
                spaceBetween: 10,
                slidesOffsetBefore: 48
              },
              1024: {
                spaceBetween: 10,
                slidesOffsetBefore: 48
              }
            }}
          >
            {slides.map((item, i) => (
              <SwiperSlide key={i} className="!w-[180px] md:!w-[540px] py-2 md:py-4">
                <div
                  className={`
                    relative 
                    w-full h-[200px] md:h-[580px]
                    rounded-[10px] md:rounded-[48px]
                    flex flex-col transition-all duration-500 overflow-hidden
                    bg-gradient-to-b ${item.from} ${item.to} ${item.textColor}
                    border border-zinc-800/60 hover:border-zinc-700/80
                    shadow-[inset_0_20px_35px_-10px_rgba(0,0,0,0.25),_0_15px_30px_rgba(0,0,0,0.3)]
                    hover:scale-[1.01] transition-transform duration-300 will-change-transform
                  `}
                >
                  {/* Image Section */}
                  <div className="flex-[2.2] p-2.5 md:p-6 pb-0">
                    <div className="w-full h-full rounded-[8px] md:rounded-[38px] overflow-hidden relative bg-black/5">
                      <div className="absolute inset-0 shadow-[inset_0_5px_15px_rgba(0,0,0,0.1)] pointer-events-none z-10"></div>
                      <img
                        src={item.image}
                        alt={Array.isArray(item.title) ? item.title.join(" ") : item.title}
                        loading={i === 0 ? "eager" : "lazy"}
                        width={540}
                        height={425}
                        className="w-full h-full object-cover rounded-[8px] md:rounded-[32px]"
                      />
                    </div>
                  </div>

                  {/* Title Section */}
                  <div className="flex-[0.8] flex items-center justify-center px-4 md:px-12 pt-2 md:pt-4 pb-4 md:pb-12 relative text-center">
                    <div
                      className={`pointer-events-none absolute bottom-0 left-0 w-full h-1/2
                      bg-gradient-to-t ${item.fade === "black" ? "from-black/20 via-black/5" : "from-white/30 via-white/10"} to-transparent`}
                    ></div>
                    <h3 className="relative z-10 text-[13px] md:text-[28px] lg:text-[34px] font-semibold tracking-tight leading-tight md:leading-[1.1]">
                      {Array.isArray(item.title)
                        ? item.title.map((line, idx) => (
                          <React.Fragment key={idx}>
                            {line}
                            {idx < item.title.length - 1 && <br />}
                          </React.Fragment>
                        ))
                        : item.title}
                    </h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;

