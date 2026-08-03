'use client';

import React from 'react';

const CarouselIndicators = ({ activeIndex, total, onSelect }) => {
    return (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-1.5 md:space-x-2 z-20">
            {[...Array(total)].map((_, index) => (
                <div
                    role="button"
                    aria-label={`Slide ${index + 1}`}
                    key={index}
                    onClick={() => onSelect && onSelect(index)}
                    className={`h-[4px] rounded-full transition-all duration-300 cursor-pointer 
                    ${index === activeIndex
                            ? 'w-8 md:w-12 lg:w-16 bg-white'
                            : 'w-4 md:w-6 lg:w-8 bg-white/20'
                        }`}
                />
            ))}
        </div>
    );
};

export default CarouselIndicators;
