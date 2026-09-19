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
import brandsImg10 from '@/assets/ElipseImages/logos/logo10.webp';
import brandsImgStudentLife from '@/assets/ElipseImages/logos/SL.webp';
import brandsImgCarbon from '@/assets/ElipseImages/logos/carbon.webp';

const brandsImages = [
  { img: brandsImg1, name: 'Tapal Tea', className: 'h-10 sm:h-14 md:h-16 max-w-[160px] sm:max-w-[220px]' },
  { img: brandsImg2, name: 'Rooh Afza', className: 'h-10 sm:h-14 md:h-16 max-w-[170px] sm:max-w-[240px]' },
  { img: brandsImg3, name: 'Searle Pharmaceuticals', className: 'h-9 sm:h-13 md:h-15 max-w-[170px] sm:max-w-[240px]' },
  { img: brandsImg4, name: 'Khoj Resorts', className: 'h-12 sm:h-16 md:h-20 max-w-[160px] sm:max-w-[220px]' },
  { img: brandsImg9, name: 'Amber Developments', className: 'h-12 sm:h-16 md:h-20 brightness-0 invert max-w-[200px] sm:max-w-[280px]' },
  { img: brandsImg6, name: 'Omoré', className: 'h-11 sm:h-15 md:h-18 max-w-[160px] sm:max-w-[220px]' },
  { img: brandsImg7, name: 'ARY Laguna', className: 'h-11 sm:h-15 md:h-18 max-w-[170px] sm:max-w-[240px]' },
  { img: brandsImg8, name: 'Ahmed Foods', className: 'h-12 sm:h-16 md:h-20 max-w-[170px] sm:max-w-[230px]' },
  { img: brandsImg10, name: 'Hamdard Laboratories', className: 'h-13 sm:h-18 md:h-22 brightness-0 invert max-w-[180px] sm:max-w-[250px]' },
  { img: brandsImgStudentLife, name: 'Student Life', className: 'h-14 sm:h-20 md:h-24 brightness-0 invert max-w-[200px] sm:max-w-[280px]' },
  { img: brandsImgCarbon, name: 'Carbon Powered', className: 'h-14 sm:h-20 md:h-24 max-w-[200px] sm:max-w-[280px]' },
];

const BrandsMarquee = () => {
  return (
    <section className="w-full bg-black py-10 md:py-16 overflow-hidden relative z-10">
      <div className="w-full overflow-hidden">
        <div className="animate-marquee-custom flex items-center">
          {[...brandsImages, ...brandsImages, ...brandsImages, ...brandsImages].map((brand, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center justify-center px-8 sm:px-12 md:px-16"
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
