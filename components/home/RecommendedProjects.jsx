"use client";

import { useRef } from "react";
import Link from "next/link";

const RECOMMENDED = [
  {
    name: "Shubham Anthem",
    type: "3, 4 BHK Luxury Apartments",
    location: "Club O7 Road, Shela",
    price: "₹ 1.14 - 1.44 Cr",
    img: "/images/seven.png",
    builder: "Shubham Group",
    builderInitials: "SG",
    badge: "Under Construction",
    slug: "residential/shubham-anthem",
  },
  {
    name: "Shruti Residency",
    type: "3 BHK Premium Residences",
    location: "Drive-In Road, Memnagar",
    price: "₹ 1.25 - 1.60 Cr",
    img: "/images/eight.png",
    builder: "Shruti Infra",
    builderInitials: "SI",
    badge: "Ready Possession",
    slug: "residential/shruti-apartment",
  },
  {
    name: "The Sky Residences",
    type: "4 BHK Ultra-Lux Sky Villas",
    location: "Iscon Ambli Road",
    price: "₹ 3.80 - 4.50 Cr",
    img: "/images/ninth.png",
    builder: "Skyline Living",
    builderInitials: "SL",
    badge: "Limited Edition",
    slug: "residential/the-sky-residences",
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
  },
];

export default function RecommendedProjects() {
  const scrollRef = useRef(null);

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
        {/* Header with Carousel Controls */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#a98440]">
              Curated Opportunities
            </span>
            <h2 className="heading-display mt-3 text-[2.4rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-slate-900 sm:text-[3.2rem]">
              Recommended
              <br />
              Projects
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-500">
              Explore some of the most sought-after, high-growth projects across Ahmedabad. Compare locations, pricing insights, and verified project highlights.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-[#a98440] hover:text-[#a98440] active:scale-95 cursor-pointer"
              aria-label="Previous Projects"
            >
              ←
            </button>
            <button
              onClick={() => scroll("right")}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-[#a98440] hover:text-[#a98440] active:scale-95 cursor-pointer"
              aria-label="Next Projects"
            >
              →
            </button>
          </div>
        </div>

        {/* Projects Scroll Container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide scroll-smooth"
        >
          {RECOMMENDED.map((project, idx) => (
            <div
              key={idx}
              className="group flex-none w-[290px] sm:w-[320px] md:w-[340px] rounded-[26px] border border-slate-200/90 bg-white overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-[#a98440]/40"
            >
              {/* Image Container */}
              <div className="relative h-60 w-full overflow-hidden bg-slate-100">
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
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg border border-slate-100 text-xs font-extrabold text-[#a98440]">
                    {project.builderInitials}
                  </div>
                  <span className="text-xs font-semibold text-white drop-shadow-md">
                    {project.builder}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <h3 className="heading-display text-lg font-bold text-slate-900 group-hover:text-[#a98440] transition-colors">
                  {project.name}
                </h3>
                <p className="mt-1 text-xs text-slate-500 font-medium">
                  {project.type}
                </p>
                <p className="mt-1 text-xs text-slate-600 flex items-center gap-1">
                  <span>📍</span>
                  <span>{project.location}</span>
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                      Starting Price
                    </span>
                    <p className="text-base font-extrabold text-[#a98440]">
                      {project.price}
                    </p>
                  </div>

                  <Link
                    href={`/property/${project.slug}`}
                    className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-900 transition hover:bg-slate-50 shadow-xs"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA matching Image 2: View All Properties */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/residential"
            className="rounded-xl bg-[#a98440] hover:bg-[#977232] px-8 py-3.5 text-sm font-semibold text-white shadow-md transition active:scale-95"
          >
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  );
}
