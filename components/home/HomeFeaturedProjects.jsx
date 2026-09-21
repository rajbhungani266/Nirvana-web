"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { fetchHomeFeaturedProperties } from "@/lib/api";
import { formatPrice, getImageUrl, getTypeLabel } from "@/lib/format";
import EnquireModal from "@/components/property/EnquireModal";

const fallbackProjects = [
  {
    id: 11,
    title: "Sahjanand Skyview",
    city: "Ahmedabad",
    area: "Iscon Ambli Road",
    price: "9152000",
    area_sqft: "2150",
    slug: "sahjanand-heights",
    frontend_category: "residential",
    main_image: "/images/first.jpg",
    property_type: "4 BHK Luxury Apartment",
    builder: "Sahjanand Group",
    badge: "High ROI",
  },
  {
    id: 12,
    title: "Skyline Residences",
    city: "Ahmedabad",
    area: "Sindhubhavan Road",
    price: "12800000",
    area_sqft: "2450",
    slug: "skyline-residences",
    frontend_category: "residential",
    main_image: "/images/second.jpg",
    property_type: "4 BHK Luxury Apartments",
    builder: "Shilp Group",
    badge: "High ROI",
  },
  {
    id: 1,
    title: "The Sky Residences",
    city: "Ahmedabad",
    area: "Iscon Ambli Road",
    price: "42000000",
    area_sqft: "4250",
    slug: "the-sky-residences",
    frontend_category: "residential",
    main_image: "/images/ninth.png",
    property_type: "4 BHK Ultra-Lux Sky Villa",
    builder: "Skyline Living",
    badge: "High ROI",
  },
  {
    id: 2,
    title: "Adani Shantigram Aster",
    city: "Ahmedabad",
    area: "SG Highway",
    price: "23500000",
    area_sqft: "2850",
    slug: "shantigram-aster",
    frontend_category: "residential",
    main_image: "/images/seven.png",
    property_type: "3 & 4 BHK Golf Condos",
    builder: "Adani Realty",
    badge: "High ROI",
  },
  {
    id: 5,
    title: "Shubham Anthem",
    city: "Ahmedabad",
    area: "Club O7 Road, Shela",
    price: "14400000",
    area_sqft: "2100",
    slug: "shubham-anthem",
    frontend_category: "residential",
    main_image: "/images/third.png",
    property_type: "3 & 4 BHK Luxury Apartments",
    builder: "Shubham Group",
    badge: "High ROI",
  },
];

export default function HomeFeaturedProjects() {
  const [projects, setProjects] = useState(fallbackProjects);
  const [enquiryProject, setEnquiryProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [animDirection, setAnimDirection] = useState(null);
  const scrollRef = useRef(null);

  const [mobileIndex, setMobileIndex] = useState(0);

  useEffect(() => {
    // Only applies to mobile layout effectively
    const interval = setInterval(() => {
      setMobileIndex((prev) => (prev + 1) % projects.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [projects.length]);


  const totalPages = Math.max(projects.length, 5);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await fetchHomeFeaturedProperties();
        if (data && data.length >= 4) {
          setProjects(data);
        }
      } catch {
        // Keeps polished fallback inventory
      }
    }
    loadProjects();
  }, []);

  
  // Auto-play automation every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      scroll("right");
    }, 4000);
    return () => clearInterval(interval);
  }, [totalPages]); // Dependencies ensure it can access the latest state if needed

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

    const firstCard = scrollRef.current.querySelector("article");
    const step = firstCard ? firstCard.offsetWidth + 18 : clientWidth * 0.5;

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
    <section className="bg-white pt-2 pb-6 sm:pt-3 sm:pb-8">
      <div className="container-box">
        {/* Section Header (old arrows removed as requested) */}
        <div className="mb-6 sm:mb-8">
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#a98440]">
            Elite Collection
          </span>
          <h2 className="heading-display mt-1.5 text-2xl sm:text-3xl lg:text-[2.2rem] font-extrabold leading-tight tracking-tight text-slate-900">
            Featured Opportunities
          </h2>
          <p className="mt-1.5 max-w-xl text-xs sm:text-sm leading-relaxed text-slate-500">
            Flagship developments chosen for strategic location dominance, developer credibility, and superior capital appreciation.
          </p>
        </div>

        {/* 4-Box Responsive Carousel/Row with Page Change Animation */}
        <div
          ref={scrollRef}
          onScroll={handleScrollUpdate}
          className={`flex gap-3.5 sm:gap-4 lg:gap-4.5 overflow-x-auto pb-3 scrollbar-hide scroll-smooth snap-x snap-mandatory ${
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
            {projects.map((project, idx) => {
              const category = project.frontend_category || "residential";
              return (
                <div key={`mob-${category}-${project.id}`} className="w-full flex-shrink-0 px-2">
                  <article className="group overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[#a98440]/50 flex flex-col justify-between h-full">
                    {/* Card Image */}
                    <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-900">
                      <img
                        src={getImageUrl(project.main_image)}
                        alt={project.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60" />

                      <div className="absolute left-3 top-3 flex gap-1.5">
                        <span className="rounded-full bg-slate-900/80 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-semibold text-white">
                          RERA Verified
                        </span>
                        <span className="rounded-full bg-[#a98440] px-2.5 py-0.5 text-[10px] font-semibold text-white">
                          {project.badge || "High ROI"}
                        </span>
                      </div>

                      {project.builder && (
                        <div className="absolute bottom-2.5 left-3 text-[11px] font-semibold text-white drop-shadow-md">
                          By {project.builder}
                        </div>
                      )}
                    </div>

                    {/* Card Details */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <h3 className="heading-display text-sm font-bold text-slate-900 truncate">
                              {project.title}
                            </h3>
                            <p className="mt-1 text-[11px] text-slate-500 truncate flex items-center gap-1">
                              <svg className="h-3 w-3 text-rose-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/></svg>
                              {project.area}, {project.city}
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-sm font-extrabold text-[#a98440]">
                              {formatPrice(project.price)}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 grid grid-cols-2 gap-2 rounded-xl bg-slate-50 p-2 border border-slate-100">
                          <div className="flex flex-col gap-0.5">
                            <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-600">
                              <svg className="h-3 w-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                              {project.property_type.split(" ")[0]} BHK Luxury
                            </span>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-600">
                              <svg className="h-3 w-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
                              {project.area_sqft} Sq. Ft.
                            </span>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-600">
                              <svg className="h-3 w-3 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 002 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z"/></svg>
                              Ready / Q4 2025
                            </span>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-600">
                              <svg className="h-3 w-3 text-sky-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
                              100% Clear Title
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex gap-2">
                        <button className="flex-1 rounded-xl border border-slate-200 bg-white py-2 text-[11px] font-bold text-slate-700 transition hover:bg-slate-50 shadow-xs">
                          Brochure
                        </button>
                        <button
                          onClick={() => setEnquiryProject(project)}
                          className="flex-1 rounded-xl bg-[#a98440] py-2 text-[11px] font-bold text-white transition hover:bg-[#977232] shadow-sm"
                        >
                          Enquire Now
                        </button>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
          
          {/* Mobile Carousel Navigation Capsule */}
          <div className="mt-5 flex sm:hidden justify-center items-center">
            <div className="inline-flex items-center gap-3 rounded-full bg-[#525252] p-1 shadow-[0_4px_16px_rgba(0,0,0,0.18)] border border-[#666]/30">
              <button
                type="button"
                onClick={() => setMobileIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1))}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-900 shadow-sm transition-transform active:scale-90"
              >
                <svg className="h-4 w-4 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="w-16 text-center text-sm font-bold tracking-widest text-white">
                {String(mobileIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </div>
              
              <button
                type="button"
                onClick={() => setMobileIndex((prev) => (prev + 1) % projects.length)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-900 shadow-sm transition-transform active:scale-90"
              >
                <svg className="h-4 w-4 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        

{projects.map((project) => {
            const category = project.frontend_category || "residential";

            return (
              <article
                key={`${category}-${project.id}`}
                className="group snap-center flex-none w-full sm:w-[calc(50%-10px)] hidden sm:flex lg:w-[calc(25%-14px)] overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[#a98440]/50 flex flex-col justify-between"
              >
                {/* Card Image */}
                <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-900">
                  <img
                    src={getImageUrl(project.main_image)}
                    alt={project.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60" />

                  <div className="absolute left-3 top-3 flex gap-1.5">
                    <span className="rounded-full bg-slate-900/80 backdrop-blur-md px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold text-white">
                      RERA Verified
                    </span>
                    <span className="rounded-full bg-[#a98440] px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold text-white">
                      {project.badge || "High ROI"}
                    </span>
                  </div>

                  {project.builder && (
                    <div className="absolute bottom-2.5 left-3 text-[11px] font-semibold text-white drop-shadow-md">
                      By {project.builder}
                    </div>
                  )}
                </div>

                {/* Card Details */}
                <div className="p-4 sm:p-4.5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="heading-display text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#a98440] transition-colors truncate">
                          {project.title}
                        </h3>
                        <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1 truncate">
                          <span>📍</span>
                          <span className="truncate">{project.area}, {project.city}</span>
                        </p>
                      </div>

                      <p className="text-[#a98440] font-extrabold text-sm sm:text-base whitespace-nowrap">
                        {formatPrice(project.price)}
                      </p>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-x-2 gap-y-1 rounded-xl bg-slate-50 p-2.5 text-[10.5px] sm:text-[11px] text-slate-700 font-medium">
                      <div className="truncate">📋 {getTypeLabel(project)}</div>
                      <div className="truncate">📐 {project.area_sqft || "2,150"} Sq. Ft.</div>
                      <div className="truncate">📅 Ready / Q4 2025</div>
                      <div className="truncate">🛡️ 100% Clear Title</div>
                    </div>
                  </div>

                  {/* Actions: Brochure & Enquire Now */}
                  <div className="mt-3.5 flex gap-2">
                    <Link
                      href={`/property/${category}/${project.slug || project.id}`}
                      className="flex-1 rounded-xl border border-slate-300 bg-white py-2 text-center text-xs font-bold text-slate-800 transition hover:bg-slate-50 shadow-2xs"
                    >
                      Brochure
                    </Link>
                    <button
                      type="button"
                      onClick={() => setEnquiryProject({ ...project, category })}
                      className="flex-1 rounded-xl bg-[#a98440] hover:bg-[#977232] py-2 text-center text-xs font-bold text-white shadow-xs transition active:scale-95 cursor-pointer"
                    >
                      Enquire Now
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Center Carousel Navigation Capsule (Matching Reference Image 2) */}
        <div className="mt-5 sm:mt-6 hidden md:flex justify-center items-center">
          <div className="inline-flex items-center gap-2.5 sm:gap-3 rounded-full bg-[#525252] p-1 sm:p-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.18)] border border-[#666]/30">
            {/* Left Button */}
            <button
              type="button"
              onClick={() => scroll("left")}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-900 shadow-sm transition-all duration-200 hover:scale-110 active:scale-75 hover:bg-[#a98440] hover:text-white cursor-pointer"
              aria-label="Previous property"
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
              aria-label="Next property"
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

      {enquiryProject && (
        <EnquireModal
          property={enquiryProject}
          category={enquiryProject.category}
          onClose={() => setEnquiryProject(null)}
        />
      )}
    </section>
  );
}