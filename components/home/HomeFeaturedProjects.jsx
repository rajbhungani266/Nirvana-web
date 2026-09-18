"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { fetchHomeFeaturedProperties } from "@/lib/api";
import { formatPrice, getImageUrl, getTypeLabel } from "@/lib/format";
import EnquireModal from "@/components/property/EnquireModal";

const fallbackProjects = [
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
    badge: "Limited Edition",
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
    badge: "Golf Township",
  },
  {
    id: 3,
    title: "GIFT One Corporate Tower",
    city: "Gandhinagar",
    area: "GIFT City SEZ",
    price: "18500000",
    area_sqft: "1950",
    slug: "gift-one-hub",
    frontend_category: "commercial",
    main_image: "/images/hero-gift-tower.jpg",
    property_type: "Grade A Pre-leased Office",
    builder: "GIFT Development Corp",
    badge: "8.5% Net Yield",
  },
  {
    id: 4,
    title: "Bavlu Serene Farm Villas",
    city: "Ahmedabad",
    area: "Sanand - Nalsarovar Road",
    price: "14500000",
    area_sqft: "6500",
    slug: "bavlu-farmland",
    frontend_category: "plot-weekend-villa",
    main_image: "/images/hero-water-mansion.jpg",
    property_type: "Luxury Weekend Farmland",
    builder: "Nirvana Escapes",
    badge: "100% Clear Title",
  },
];

export default function HomeFeaturedProjects() {
  const [projects, setProjects] = useState(fallbackProjects);
  const [enquiryProject, setEnquiryProject] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await fetchHomeFeaturedProperties();
        if (data && data.length > 0) {
          setProjects(data);
        }
      } catch (error) {
        // Keeps polished fallback inventory
      }
    }
    loadProjects();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-white py-20">
      <div className="container-box">
        {/* Section Header with Carousel Navigation */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#a98440]">
              Elite Collection
            </span>
            <h2 className="heading-display mt-3 text-[2.4rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-slate-900 sm:text-[3.2rem]">
              Featured
              <br />
              Opportunities
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-500">
              Discover flagship developments chosen for strategic location dominance, developer credibility, superior capital appreciation, and immediate lifestyle upgrades.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-[#a98440] hover:text-[#a98440] active:scale-95 cursor-pointer"
              aria-label="Previous Featured"
            >
              ←
            </button>
            <button
              onClick={() => scroll("right")}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-[#a98440] hover:text-[#a98440] active:scale-95 cursor-pointer"
              aria-label="Next Featured"
            >
              →
            </button>
          </div>
        </div>

        {/* Horizontal Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide scroll-smooth"
        >
          {projects.map((project) => {
            const category = project.frontend_category || "residential";

            return (
              <article
                key={`${category}-${project.id}`}
                className="group flex-none w-[300px] sm:w-[330px] md:w-[360px] overflow-hidden rounded-[26px] border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-[#a98440]/40"
              >
                {/* Card Image */}
                <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                  <img
                    src={getImageUrl(project.main_image)}
                    alt={project.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60" />

                  <div className="absolute left-4 top-4 flex gap-2">
                    <span className="rounded-full bg-slate-900/80 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white">
                      RERA Verified
                    </span>
                    <span className="rounded-full bg-[#a98440] px-3 py-1 text-xs font-semibold text-white">
                      {project.badge || "High ROI"}
                    </span>
                  </div>

                  {project.builder && (
                    <div className="absolute bottom-3 left-4 text-xs font-semibold text-white drop-shadow-md">
                      By {project.builder}
                    </div>
                  )}
                </div>

                {/* Card Details */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="heading-display text-lg font-bold text-slate-900 group-hover:text-[#a98440] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                        <span>📍</span>
                        <span>{project.area}, {project.city}</span>
                      </p>
                    </div>

                    <p className="text-[#a98440] font-extrabold text-lg">
                      {formatPrice(project.price)}
                    </p>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-2.5 rounded-2xl bg-slate-50 p-3.5 text-xs text-slate-700">
                    <div>📋 {getTypeLabel(project)}</div>
                    <div>📐 {project.area_sqft || "3,250"} Sq. Ft.</div>
                    <div>📅 Ready / Q4 2025</div>
                    <div>🛡️ 100% Clear Title</div>
                  </div>

                  {/* Actions matching Image 1: Brochure (white) & Enquire Now (golden) */}
                  <div className="mt-6 flex gap-2.5">
                    <Link
                      href={`/property/${category}/${project.slug || project.id}`}
                      className="flex-1 rounded-xl border border-slate-300 bg-white py-2.5 text-center text-xs font-bold text-slate-900 transition hover:bg-slate-50 shadow-xs"
                    >
                      Brochure
                    </Link>
                    <button
                      type="button"
                      onClick={() => setEnquiryProject({ ...project, category })}
                      className="flex-1 rounded-xl bg-[#a98440] hover:bg-[#977232] py-2.5 text-center text-xs font-bold text-white shadow-xs transition active:scale-95 cursor-pointer"
                    >
                      Enquire Now
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA Link matching Image 2: View All Properties */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/residential"
            className="rounded-xl bg-[#a98440] hover:bg-[#977232] px-8 py-3.5 text-sm font-semibold text-white shadow-md transition active:scale-95"
          >
            View All Properties
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