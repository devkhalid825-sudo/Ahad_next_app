'use client';

import React from 'react';
import brandsImg1 from '@/assets/images/brandslogo01.webp';
import brandsImg2 from '@/assets/images/brandslogo02.webp';
import brandsImg3 from '@/assets/images/brandslogo03.webp';
import brandsImg4 from '@/assets/images/brandslogo04.webp';
import brandsImg6 from '@/assets/ElipseImages/logos/logo6.webp';
import brandsImg7 from '@/assets/ElipseImages/logos/logo7.webp';
import brandsImg8 from '@/assets/ElipseImages/logos/logo8.webp';
import brandsImg9 from '@/assets/ElipseImages/logos/logo9.webp';
import brandsImgStudentLife from '@/assets/ElipseImages/logos/SL.webp';


const brandsImages = [
  { img: brandsImg1, name: 'Tapal Tea', className: 'h-8 xs:h-9 sm:h-13 md:h-16 max-w-[130px] sm:max-w-[220px]' },
  { img: brandsImg2, name: 'Rooh Afza', className: 'h-8 xs:h-9 sm:h-13 md:h-16 max-w-[130px] sm:max-w-[240px]' },
  { img: brandsImg3, name: 'Searle Pharmaceuticals', className: 'h-7 xs:h-8 sm:h-12 md:h-15 max-w-[140px] sm:max-w-[240px]' },
  { img: brandsImg4, name: 'Khoj Resorts', className: 'h-9 xs:h-10 sm:h-14 md:h-18 max-w-[130px] sm:max-w-[220px] brand-logo-white' },
  { img: brandsImg9, name: 'Amber Developments', className: 'h-9 xs:h-10 sm:h-14 md:h-18 brightness-0 invert max-w-[140px] sm:max-w-[260px] brand-logo-white' },
  { img: brandsImg6, name: 'Omoré', className: 'h-9 xs:h-10 sm:h-13 md:h-16 max-w-[130px] sm:max-w-[220px]' },
  { img: brandsImg7, name: 'ARY Laguna', className: 'h-9 xs:h-10 sm:h-13 md:h-16 max-w-[140px] sm:max-w-[240px]' },
  { img: brandsImg8, name: 'Ahmed Foods', className: 'h-11 xs:h-12 sm:h-16 md:h-20 max-w-[145px] sm:max-w-[230px] brand-logo-ahmed' },
  { img: brandsImgStudentLife, name: 'Student Life', className: 'h-10 xs:h-12 sm:h-16 md:h-20 brightness-0 invert max-w-[140px] sm:max-w-[250px] brand-logo-white' },
];

const BrandsMarquee = () => {
  return (
    <section className="brands-marquee-section w-full bg-black py-8 sm:py-10 md:py-16 overflow-hidden relative z-10 transition-colors duration-300">
      <style dangerouslySetInnerHTML={{ __html: `
        .brands-marquee-section img {
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        html.light .brands-marquee-section img {
          filter: contrast(1.15) saturate(1.05);
        }
        html.light .brands-marquee-section .brand-logo-ahmed {
          mix-blend-mode: multiply !important;
          filter: contrast(1.35) brightness(1.02) saturate(1.2) drop-shadow(0 0 0.5px rgba(0,0,0,0.25)) !important;
        }
      `}} />
      <div className="w-full overflow-hidden">
        <div className="animate-marquee-custom flex items-center" style={{ animationDuration: '65s' }}>
          {[...brandsImages, ...brandsImages, ...brandsImages, ...brandsImages].map((brand, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center justify-center px-3.5 xs:px-4 sm:px-8 md:px-12"
            >
              <img
                src={typeof brand.img === 'string' ? brand.img : brand.img?.src}
                alt={`${brand.name} Logo`}
                loading="lazy"
                className={`w-auto object-contain transition-all duration-300 ${brand.className}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsMarquee;
