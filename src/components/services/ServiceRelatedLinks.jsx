﻿'use client';

import { Link } from "react-router-dom";

/**
 * ServiceRelatedLinks — internal linking section for service pages.
 * Shows related services + related blog articles to help Google discover
 * more pages and distribute link equity.
 *
 * Usage:
 *   <ServiceRelatedLinks
 *     relatedServices={[
 *       { label: "3D Animation", to: "/services/3d-animation" },
 *       { label: "VR Development", to: "/services/vr-development" },
 *     ]}
 *     relatedArticles={[
 *       { label: "How 3D Configurators Boost Sales", to: "/blog/web-based-configurator" },
 *     ]}
 *   />
 */
const ServiceRelatedLinks = ({ relatedServices = [], relatedArticles = [] }) => {
  if (!relatedServices.length && !relatedArticles.length) return null;

  return (
    <section
      className="px-5 md:px-8 py-10 md:py-[5rem] bg-[#080808] border-t border-[#1A1A1A]"
      aria-label="Related Services and Articles"
    >
      <div className=" mx-auto">
        <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-[#4169E1] mb-[0.75rem]">
          Explore More
        </p>
        <h2 className="text-xl md:text-3xl font-medium tracking-tight text-[#F2F0EB] mb-8 md:mb-12">
          Related Services &amp; Resources
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Related Services */}
          {relatedServices.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-white/30 mb-4">
                Related Services
              </h3>
              <ul className="space-y-0">
                {relatedServices.map((svc, i) => (
                  <li key={i} className="border-b border-[#1A1A1A] last:border-0">
                    <Link
                      to={svc.to}
                      className="flex items-center justify-between py-4 md:py-5 text-[#F2F0EB] hover:text-[#4169E1] transition-colors duration-200 group"
                    >
                      <span className="text-sm md:text-base font-light">{svc.label}</span>
                      <span className="text-[#4169E1] opacity-0 group-hover:opacity-100 transition-opacity text-lg">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-white/30 mb-4">
                Related Articles
              </h3>
              <ul className="space-y-0">
                {relatedArticles.map((art, i) => (
                  <li key={i} className="border-b border-[#1A1A1A] last:border-0">
                    <Link
                      to={art.to}
                      className="flex items-center justify-between py-4 md:py-5 text-[#F2F0EB] hover:text-[#4169E1] transition-colors duration-200 group"
                    >
                      <span className="text-sm md:text-base font-light">{art.label}</span>
                      <span className="text-[#4169E1] opacity-0 group-hover:opacity-100 transition-opacity text-lg">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServiceRelatedLinks;
