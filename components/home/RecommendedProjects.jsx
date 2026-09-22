"use client";

import { useState } from "react";
import Link from "next/link";
import EnquireModal from "@/components/property/EnquireModal";

const RECOMMENDED = [
  {
    id: 1,
    title: "Shubham Anthem",
    city: "Ahmedabad",
    area: "Club O7 Road, Shela",
    price: "₹ 1.14 - 1.44 Cr",
    area_sqft: "2,100 Sq. Ft.",
    slug: "shubham-anthem",
    frontend_category: "residential",
    main_image: "/images/seven.png",
    property_type: "3, 4 BHK Luxury",
    builder: "Shubham Group",
    badge: "High ROI",
    possession: "Dec 2026",
  },
  {
    id: 2,
    title: "Shruti Residency",
    city: "Ahmedabad",
    area: "Drive-In Road, Memnagar",
    price: "₹ 1.25 - 1.60 Cr",
    area_sqft: "1,850 Sq. Ft.",
    slug: "shruti-apartment",
    frontend_category: "residential",
    main_image: "/images/eight.png",
    property_type: "3 BHK Premium",
    builder: "Shruti Infra",
    badge: "High ROI",
    possession: "Ready to Move",
  },
  {
    id: 3,
    title: "The Sky Residences",
    city: "Ahmedabad",
    area: "Iscon Ambli Road",
    price: "₹4.2 Cr +",
    area_sqft: "4,250 Sq. Ft.",
    slug: "the-sky-residences",
    frontend_category: "residential",
    main_image: "/images/ninth.png",
    property_type: "4 BHK Ultra-Lux",
    builder: "Skyline Living",
    badge: "High ROI",
    possession: "Dec 2025",
  },
  {
    id: 4,
    title: "The Grandeur Heights",
    city: "Ahmedabad",
    area: "Science City Road, Sola",
    price: "₹ 1.65 - 2.20 Cr",
    area_sqft: "2,400 Sq. Ft.",
    slug: "the-grandeur",
    frontend_category: "residential",
    main_image: "/images/first.jpg",
    property_type: "3 & 4 BHK High-Rise",
    builder: "Grandeur Spaces",
    badge: "High ROI",
    possession: "Mid 2026",
  },
];

export default function RecommendedProjects() {
  const [enquiryProject, setEnquiryProject] = useState(null);

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="container-box max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#a98440]">
              Curated Opportunities
            </span>
            <h2 className="text-3xl sm:text-[2.6rem] font-bold text-[#1c2331] tracking-tight mt-1.5">
              Recommended Projects
            </h2>
          </div>
          <p className="max-w-2xl text-[14px] leading-relaxed text-[#5c687d]">
            Explore some of the most searched and carefully selected projects across Ahmedabad. Compare locations, property types, pricing insights, and project highlights to discover opportunities that align with your goals.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {RECOMMENDED.map((project, idx) => (
            <article
              key={idx}
              className="group overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[#a98440]/50 flex flex-col justify-between h-full"
            >
              {/* Card Image */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
                <img
                  src={project.main_image}
                  alt={project.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />

                {/* Badges */}
                <div className="absolute left-3 top-3 flex items-center gap-2">
                  <span className="rounded-full bg-[#182230] px-3 py-1 text-[11px] font-semibold text-white shadow-sm">
                    RERA Verified
                  </span>
                  <span className="rounded-full bg-[#b88c3a] px-3 py-1 text-[11px] font-semibold text-white shadow-sm">
                    {project.badge || "High ROI"}
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Title & Price */}
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="heading-display text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#a98440] transition-colors truncate">
                      {project.title}
                    </h3>
                    <p className="text-[#b88c3a] font-bold text-base sm:text-lg whitespace-nowrap shrink-0">
                      {project.price}
                    </p>
                  </div>

                  {/* Location */}
                  <p className="mt-1 text-xs sm:text-[13px] text-slate-500 flex items-center gap-1.5 truncate">
                    <svg className="h-4 w-4 text-slate-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="truncate">{project.area}, {project.city}</span>
                  </p>

                  {/* 4 Feature Items */}
                  <div className="mt-5 grid grid-cols-2 gap-y-3.5 gap-x-4 text-xs sm:text-[13px] font-medium text-slate-800">
                    {/* Bed / Type */}
                    <div className="flex items-center gap-2 truncate">
                      <svg className="h-4 w-4 text-[#b88c3a] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v11m0-4h18m0-7v11m-18-4h18M7 10h3a1 1 0 001-1V7a1 1 0 00-1-1H7a1 1 0 00-1 1v2a1 1 0 001 1zm7 0h3a1 1 0 001-1V7a1 1 0 00-1-1h-3a1 1 0 00-1 1v2a1 1 0 001 1z" />
                      </svg>
                      <span className="truncate">{project.property_type}</span>
                    </div>

                    {/* Sq. Ft. */}
                    <div className="flex items-center gap-2 truncate">
                      <svg className="h-4 w-4 text-[#b88c3a] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v16h16L4 4zm4 12h2m-2-3h4m-4-3h2" />
                      </svg>
                      <span className="truncate">{project.area_sqft}</span>
                    </div>

                    {/* Possession */}
                    <div className="flex items-center gap-2 truncate">
                      <svg className="h-4 w-4 text-[#b88c3a] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <span className="truncate">{project.possession}</span>
                    </div>

                    {/* Grade A Builder */}
                    <div className="flex items-center gap-2 truncate">
                      <svg className="h-4 w-4 text-[#b88c3a] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                      <span className="truncate">Grade A Builder</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons: Brochure & Enquire Now */}
                <div className="mt-6 flex items-center gap-3">
                  <Link
                    href={`/property/residential/${project.slug}`}
                    className="flex-1 rounded-xl border border-slate-300 bg-white py-2.5 text-center text-xs sm:text-sm font-bold text-slate-800 transition hover:bg-slate-50 shadow-2xs"
                  >
                    Brochure
                  </Link>
                  <button
                    type="button"
                    onClick={() => setEnquiryProject(project)}
                    className="flex-1 rounded-xl bg-[#b88c3a] hover:bg-[#a2782c] py-2.5 text-center text-xs sm:text-sm font-bold text-white shadow-xs transition active:scale-95 cursor-pointer"
                  >
                    Enquire Now
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/residential"
            className="rounded-xl bg-[#b88c3a] hover:bg-[#a2782c] px-8 py-3.5 text-sm font-semibold text-white shadow-md transition active:scale-95"
          >
            View All Properties
          </Link>
        </div>

      </div>

      {enquiryProject && (
        <EnquireModal
          property={enquiryProject}
          category="residential"
          onClose={() => setEnquiryProject(null)}
        />
      )}
    </section>
  );
}
