"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const RECOMMENDED = [
  {
    name: "Shubham Anthem",
    type: "3, 4 BHK Luxury",
    location: "Club O7 Road, Shela",
    price: "₹ 1.14 - 1.44 Cr",
    img: "/images/seven.png",
    builder: "Shubham Group",
    builderInitials: "SG",
    badge: "Under Construction",
    slug: "residential/shubham-anthem",
    sqft: "2,100 Sq. Ft.",
    possession: "Dec 2026",
  },
  {
    name: "Shruti Residency",
    type: "3 BHK Premium",
    location: "Drive-In Road, Memnagar",
    price: "₹ 1.25 - 1.60 Cr",
    img: "/images/eight.png",
    builder: "Shruti Infra",
    builderInitials: "SI",
    badge: "Ready Possession",
    slug: "residential/shruti-apartment",
    sqft: "1,850 Sq. Ft.",
    possession: "Ready to Move",
  },
  {
    name: "The Sky Residences",
    type: "4 BHK Ultra-Lux",
    location: "Iscon Ambli Road",
    price: "₹4.2 Cr +",
    img: "/images/ninth.png",
    builder: "Skyline Living",
    builderInitials: "SL",
    badge: "Limited Edition",
    slug: "residential/the-sky-residences",
    sqft: "4,250 Sq. Ft.",
    possession: "Dec 2025",
  },
  {
    name: "The Grandeur Heights",
    type: "3 & 4 BHK High-Rise",
    location: "Science City Road, Sola",
    price: "₹ 1.65 - 2.20 Cr",
    img: "/images/first.jpg",
    builder: "Grandeur Spaces",
    builderInitials: "GS",
    badge: "RERA Verified",
    slug: "residential/the-grandeur",
    sqft: "2,400 Sq. Ft.",
    possession: "Mid 2026",
  },
];

export default function RecommendedProjects() {
  const scrollRef = useRef(null);

  const [mobileIndex, setMobileIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMobileIndex((prev) => (prev + 1) % RECOMMENDED.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [animDirection, setAnimDirection] = useState(null);
  const totalPages = RECOMMENDED.length;

  
  // Auto-play automation every 4.5 seconds (slightly offset from Featured)
  useEffect(() => {
    const interval = setInterval(() => {
      scroll("right");
    }, 4500);
    return () => clearInterval(interval);
  }, [totalPages]);

  const handleScrollUpdate = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) {
      setCurrentPage(1);
      return;
    }
    const progress = Math.min(Math.max(scrollLeft / maxScroll, 0), 1);
    const pageIndex = Math.round(progress * (totalPages - 1)) + 1;
    setCurrentPage(pageIndex);
  };

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;

    setAnimDirection(direction);
    setTimeout(() => setAnimDirection(null), 400);

    if (maxScroll <= 5) {
      setCurrentPage((prev) => {
        if (direction === "left") {
          return prev > 1 ? prev - 1 : totalPages;
        } else {
          return prev < totalPages ? prev + 1 : 1;
        }
      });
      return;
    }

    const firstCard = scrollRef.current.querySelector("div.group");
    const step = firstCard ? firstCard.offsetWidth + 24 : clientWidth * 0.75;

    let targetLeft = direction === "left" ? scrollLeft - step : scrollLeft + step;

    if (direction === "right" && scrollLeft >= maxScroll - 15) {
      targetLeft = 0;
    } else if (direction === "left" && scrollLeft <= 15) {
      targetLeft = maxScroll;
    }

    scrollRef.current.scrollTo({
      left: targetLeft,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-white pt-4 pb-12 sm:pt-6 sm:pb-16">
      <div className="container-box">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#a98440]">
            Curated Opportunities
          </span>
          <h2 className="heading-display mt-2 text-[2.2rem] sm:text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-slate-900">
            Recommended Projects
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-500">
            Explore some of the most sought-after, high-growth projects across Ahmedabad. Compare locations, pricing insights, and verified project highlights.
          </p>
        </div>

        {/* Projects Scroll Container with Animation */}
        <div
          ref={scrollRef}
          onScroll={handleScrollUpdate}
          className={`flex gap-5 sm:gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth snap-x snap-mandatory ${
            animDirection === "right"
              ? "animate-carousel-right"
              : animDirection === "left"
              ? "animate-carousel-left"
              : ""
          }`}
        >
          
        {/* Mobile Animated Carousel */}
        <div className="sm:hidden relative w-full overflow-hidden px-1">
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${mobileIndex * 100}%)` }}
          >
            {RECOMMENDED.map((project, idx) => (
              <div key={`mob-${idx}`} className="w-full flex-shrink-0 px-2">
                <div className="group overflow-hidden rounded-[24px] border border-slate-200/90 bg-white shadow-sm transition-all duration-300 flex flex-col justify-between h-full">
                  <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                    <img
                      src={project.img}
                      alt={project.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60" />
                    <span className="absolute top-3 right-3 rounded-full bg-slate-900/80 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-white">
                      {project.badge}
                    </span>
                    <div className="absolute bottom-3 left-4 flex items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg border border-slate-100 text-xs font-extrabold text-[#a98440]">
                        {project.builderInitials}
                      </div>
                      <span className="text-xs font-semibold text-white drop-shadow-md">
                        {project.builder}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="heading-display text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#a98440] transition-colors truncate">
                          {project.name}
                        </h3>
                        <p className="mt-1 text-xs text-slate-500 flex items-center gap-1 truncate">
                          <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="truncate">{project.location}, Ahmedabad</span>
                        </p>
                      </div>
                      <p className="text-sm sm:text-base font-extrabold text-[#a98440] whitespace-nowrap shrink-0">
                        {project.price}
                      </p>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-y-3 gap-x-2 text-[11px] sm:text-xs font-semibold text-slate-700">
                      <div className="flex items-center gap-1.5 truncate">
                        <svg className="h-4 w-4 text-[#a98440] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                        <span className="truncate">{project.type}</span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <svg className="h-4 w-4 text-[#a98440] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
                        <span className="truncate">{project.sqft}</span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <svg className="h-4 w-4 text-[#a98440] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                        <span className="truncate">{project.possession}</span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <svg className="h-4 w-4 text-[#a98440] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                        <span className="truncate">Grade A Builder</span>
                      </div>
                    </div>

                    <div className="mt-auto pt-5 flex gap-3">
                      <Link
                        href={`/property/${project.slug}`}
                        className="flex-1 inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white py-2.5 text-[12px] sm:text-[13px] font-bold text-slate-800 transition hover:bg-slate-50 shadow-sm"
                      >
                        Brochure
                      </Link>
                      <Link
                        href={`/property/${project.slug}#enquire`}
                        className="flex-1 inline-flex items-center justify-center rounded-xl bg-[#a98440] hover:bg-[#977232] py-2.5 text-[12px] sm:text-[13px] font-bold text-white transition shadow-sm"
                      >
                        Enquire Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile Carousel Navigation Capsule */}
          <div className="mt-5 flex sm:hidden justify-center items-center">
            <div className="inline-flex items-center gap-3 rounded-full bg-[#525252] p-1 shadow-[0_4px_16px_rgba(0,0,0,0.18)] border border-[#666]/30">
              <button
                type="button"
                onClick={() => setMobileIndex((prev) => (prev === 0 ? RECOMMENDED.length - 1 : prev - 1))}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-900 shadow-sm transition-transform active:scale-90"
              >
                <svg className="h-4 w-4 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="w-16 text-center text-sm font-bold tracking-widest text-white">
                {String(mobileIndex + 1).padStart(2, "0")} / {String(RECOMMENDED.length).padStart(2, "0")}
              </div>
              
              <button
                type="button"
                onClick={() => setMobileIndex((prev) => (prev + 1) % RECOMMENDED.length)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-900 shadow-sm transition-transform active:scale-90"
              >
                <svg className="h-4 w-4 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

{RECOMMENDED.map((project, idx) => (
            <div
              key={idx}
              className="group hidden sm:flex flex-col justify-between flex-none sm:w-[310px] md:w-[330px] lg:w-[calc(25%-18px)] rounded-[24px] border border-slate-200/90 bg-white overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-[#a98440]/40 snap-center sm:snap-start h-full"
            >
              {/* Image Container */}
              <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-slate-100 shrink-0">
                <img
                  src={project.img}
                  alt={project.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60" />

                {/* Status Badge */}
                <span className="absolute top-3 right-3 rounded-full bg-slate-900/80 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-white">
                  {project.badge}
                </span>

                {/* Builder Monogram Logo Badge */}
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg border border-slate-100 text-xs font-extrabold text-[#a98440]">
                    {project.builderInitials}
                  </div>
                  <span className="text-xs font-semibold text-white drop-shadow-md">
                    {project.builder}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="heading-display text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#a98440] transition-colors truncate">
                      {project.name}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500 flex items-center gap-1 truncate">
                      <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="truncate">{project.location}, Ahmedabad</span>
                    </p>
                  </div>
                  <p className="text-sm sm:text-base font-extrabold text-[#a98440] whitespace-nowrap shrink-0">
                    {project.price}
                  </p>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-y-3 gap-x-2 text-[11px] sm:text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-1.5 truncate">
                    <svg className="h-4 w-4 text-[#a98440] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                    <span className="truncate">{project.type}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <svg className="h-4 w-4 text-[#a98440] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
                    <span className="truncate">{project.sqft}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <svg className="h-4 w-4 text-[#a98440] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    <span className="truncate">{project.possession}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <svg className="h-4 w-4 text-[#a98440] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                    <span className="truncate">Grade A Builder</span>
                  </div>
                </div>

                <div className="mt-auto pt-5 flex gap-3">
                  <Link
                    href={`/property/${project.slug}`}
                    className="flex-1 inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white py-2.5 text-[12px] sm:text-[13px] font-bold text-slate-800 transition hover:bg-slate-50 shadow-sm"
                  >
                    Brochure
                  </Link>
                  <Link
                    href={`/property/${project.slug}#enquire`}
                    className="flex-1 inline-flex items-center justify-center rounded-xl bg-[#a98440] hover:bg-[#977232] py-2.5 text-[12px] sm:text-[13px] font-bold text-white transition shadow-sm"
                  >
                    Enquire Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Center Carousel Navigation Capsule (Matching Reference Image 2) */}
        <div className="mt-5 sm:mt-6 hidden md:flex justify-center items-center">
          <div className="inline-flex items-center gap-2.5 sm:gap-3 rounded-full bg-[#525252] p-1 sm:p-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.18)] border border-[#666]/30">
            {/* Left Button */}
            <button
              type="button"
              onClick={() => scroll("left")}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-900 shadow-sm transition-all duration-200 hover:scale-110 active:scale-75 hover:bg-[#a98440] hover:text-white cursor-pointer"
              aria-label="Previous project"
            >
              <svg
                className="h-4 w-4 stroke-[3] currentColor"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Counter with animated pop transition */}
            <span
              key={currentPage}
              className="inline-block animate-page-number-pop text-white font-semibold text-xs sm:text-sm tracking-wider px-2 sm:px-3 select-none"
            >
              {String(currentPage).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}
            </span>

            {/* Right Button */}
            <button
              type="button"
              onClick={() => scroll("right")}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-900 shadow-sm transition-all duration-200 hover:scale-110 active:scale-75 hover:bg-[#a98440] hover:text-white cursor-pointer"
              aria-label="Next project"
            >
              <svg
                className="h-4 w-4 stroke-[3] currentColor"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Bottom CTA Link: View All Properties */}
        <div className="mt-6 sm:mt-8 flex justify-center px-4 sm:px-0">
          <Link
            href="/residential"
            className="group relative flex w-full sm:w-auto items-center justify-center overflow-hidden rounded-xl bg-[#a98440] px-2 py-2 pr-6 text-sm font-bold text-white shadow-md transition-all hover:bg-[#977232] active:scale-95"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1a1a1a] shadow-inner mr-3 transition-transform group-hover:scale-110">
              <span className="font-serif text-sm font-light text-white tracking-widest">N</span>
            </div>
            <span className="flex-1 text-center sm:text-left sm:pr-8">View All Properties</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
