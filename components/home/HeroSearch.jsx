"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const DEAL_MODES = [
  { value: "buy", label: "Buy" },
  { value: "rent", label: "Rent" },
  { value: "invest", label: "Invest" },
];

const CATEGORY_TABS = [
  { value: "residential", label: "Residential" },
  { value: "new-launch", label: "New Launch" },
  { value: "commercial", label: "Commercial" },
  { value: "plots", label: "Plots/Land" },
];

const PROPERTY_TYPE_OPTIONS = [
  { value: "", label: "All Residential" },
  { value: "flat", label: "Apartment / Flat" },
  { value: "villa", label: "Luxury Villa" },
  { value: "bungalow", label: "Bungalow" },
  { value: "penthouse", label: "Penthouse" },
];

const POPULAR_LOCALITIES = [
  "Iscon Ambli",
  "Shela",
  "Sindhubhavan",
  "GIFT City",
  "Bodakdev",
  "Science City",
  "Thaltej",
];

const DYNAMIC_WORDS = [
  "High-Potential",
  "Ultra-Luxury",
  "High-Yield",
  "Vastu-Aligned",
];

const HERO_SLIDES = [
  {
    id: 1,
    image: "/images/hero-luxury.jpg",
    title: "The Palm Sanctuary Villa",
    location: "Iscon Ambli Road, Ahmedabad",
    tag: "Ultra-Luxury Villa",
  },
  {
    id: 2,
    image: "/images/hero-water-mansion.jpg",
    title: "Cascading Water Mansion",
    location: "Sindhubhavan Road, Ahmedabad",
    tag: "Signature Residence",
  },
  {
    id: 3,
    image: "/images/hero-gift-tower.jpg",
    title: "GIFT Diamond Corporate Tower",
    location: "GIFT City IFSC, Gandhinagar",
    tag: "Grade-A Commercial",
  },
  {
    id: 4,
    image: "/images/main.jpg",
    title: "The Grand Courtyard Estate",
    location: "SG Highway, Bodakdev",
    tag: "Luxury Bungalow",
  },
  {
    id: 5,
    image: "/images/ninth.png",
    title: "Skyline Glass Penthouse",
    location: "Science City Road, Ahmedabad",
    tag: "Sky Condominium",
  },
];

function resolveDestination({ dealMode, categoryTab, propertyType, search }) {
  const params = new URLSearchParams();
  if (search) params.set("search", search);

  let path = "/residential";

  if (dealMode === "rent") {
    path = "/rent";
  } else if (dealMode === "invest") {
    path = "/investment";
  } else if (categoryTab === "commercial") {
    path = "/commercial";
  } else if (categoryTab === "plots") {
    path = "/plot-weekend-villa";
  } else {
    path = "/residential";
    if (categoryTab === "new-launch") params.set("is_featured", "true");
    if (propertyType) params.set("property_type", propertyType);
  }

  const qs = params.toString();
  return qs ? `${path}?${qs}` : path;
}

export default function HeroSearch() {
  const router = useRouter();
  const [dealMode, setDealMode] = useState("buy");
  const [categoryTab, setCategoryTab] = useState("residential");
  const [propertyType, setPropertyType] = useState("");
  const [search, setSearch] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [fadeWord, setFadeWord] = useState(true);

  // Background Slider State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance slide every 5.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  // Dynamic word cycle animation every 2.8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeWord(false);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % DYNAMIC_WORDS.length);
        setFadeWord(true);
      }, 300);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  function handleSearch(customSearch) {
    const s = typeof customSearch === "string" ? customSearch : search;
    router.push(resolveDestination({ dealMode, categoryTab, propertyType, search: s }));
  }

  const showCategoryTabs = dealMode === "buy";

  return (
    <section className="relative overflow-hidden bg-slate-950 pb-24 pt-32 md:pt-40">
      {/* 1. Ultra-Luxury Architectural Background with Smooth Slide Transitions */}
      <div
        className="absolute inset-0 z-0 overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Sliding Image Track */}
        <div
          className="flex h-full w-full transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {HERO_SLIDES.map((slide) => (
            <div
              key={slide.id}
              className="relative h-full w-full min-w-full shrink-0 overflow-hidden"
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="h-full w-full object-cover object-center opacity-95 brightness-[0.98] contrast-[1.05]"
              />
            </div>
          ))}
        </div>

        {/* Ambient lighting overlays: Crystal-clear visibility with delicate text contrast vignette */}
        <div className="pointer-events-none absolute inset-0 bg-slate-950/20" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-slate-950/80 via-slate-950/30 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/50 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.12),transparent_70%)]" />
      </div>

      {/* 2. Top-Level Slide Navigation Controls (Left & Right Arrows) - z-30 Layer */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 z-30 flex -translate-y-1/2 items-center justify-between px-3 sm:px-8">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            prevSlide();
          }}
          aria-label="Previous Slide"
          className="pointer-events-auto flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border-2 border-white/50 bg-slate-950/75 text-white shadow-2xl backdrop-blur-lg transition-all hover:scale-115 hover:bg-[#a98440] hover:border-white active:scale-90 cursor-pointer"
        >
          <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            nextSlide();
          }}
          aria-label="Next Slide"
          className="pointer-events-auto flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border-2 border-white/50 bg-slate-950/75 text-white shadow-2xl backdrop-blur-lg transition-all hover:scale-115 hover:bg-[#a98440] hover:border-white active:scale-90 cursor-pointer"
        >
          <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* 3. Bottom Slide Info Badge - z-30 Layer */}
      <div className="pointer-events-none absolute bottom-5 left-6 z-30 hidden sm:flex items-center gap-2 rounded-full border border-white/30 bg-slate-950/80 px-4 py-2 backdrop-blur-md text-xs text-white shadow-xl">
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-bold text-amber-300">{HERO_SLIDES[currentSlide].tag}:</span>
        <span className="font-semibold text-white">{HERO_SLIDES[currentSlide].title}</span>
        <span className="text-white/50">•</span>
        <span className="text-white/80">{HERO_SLIDES[currentSlide].location}</span>
      </div>

      {/* 3. Hero Content */}
      <div className="relative z-20">
        <div className="container-box text-center">
          {/* Main Animated Headline */}
          <h1 className="hero-title mx-auto max-w-[1000px] text-[36px] leading-[1.08] text-white sm:text-[54px] md:text-[68px] lg:text-[80px] drop-shadow-lg">
            Find{" "}
            <span
              className={`animate-shimmer inline-block bg-gradient-to-r from-[#e6c278] via-[#fce6a8] to-[#a98440] bg-clip-text text-transparent transition-all duration-300 ${
                fadeWord ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-2 scale-95"
              }`}
            >
              {DYNAMIC_WORDS[wordIndex]}
            </span>
            <br />
            Real Estate Opportunities
          </h1>

          <p className="mt-4 mx-auto max-w-[740px] text-sm leading-relaxed text-white/85 sm:text-base md:text-lg drop-shadow">
            Explore curated luxury residences, flagship corporate offices, and emerging high-growth corridors with complete transparency.
          </p>

          {/* Search Box Container with Ambient Pulse Glow */}
          <div className="relative mt-10 mx-auto w-full max-w-[1020px] text-left">
            {/* Ambient Background Aura */}
            <div className="animate-pulse-ambient absolute -inset-3 -z-10 rounded-[36px] bg-gradient-to-r from-[#a98440]/25 via-[#fbbf24]/20 to-[#a98440]/25 blur-2xl" />

            {/* Deal mode tabs (Buy / Rent / Invest) - Centered directly above the card */}
            <div className="flex items-end justify-center gap-1.5">
              {DEAL_MODES.map((mode) => (
                <button
                  key={mode.value}
                  type="button"
                  onClick={() => setDealMode(mode.value)}
                  className={`rounded-t-xl px-7 py-3 text-sm font-bold transition-all duration-150 cursor-pointer ${
                    dealMode === mode.value
                      ? "bg-[#a98440] text-white shadow-sm"
                      : "bg-white text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>

            {/* Unified White Search Card (Exact Figma match from Image 3) */}
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-6 shadow-[0_30px_90px_rgba(2,6,23,0.35)] border border-white">
              {/* Category subtabs row */}
              {showCategoryTabs && (
                <div className="mb-4 flex items-center gap-7 sm:gap-9 border-b border-slate-100 pb-3 text-sm font-semibold overflow-x-auto scrollbar-hide">
                  {CATEGORY_TABS.map((tabItem) => (
                    <button
                      key={tabItem.value}
                      type="button"
                      onClick={() => setCategoryTab(tabItem.value)}
                      className={`relative pb-2 transition cursor-pointer shrink-0 ${
                        categoryTab === tabItem.value
                          ? "border-b-2 border-[#a98440] text-slate-900 font-bold"
                          : "text-slate-600 hover:text-slate-900 font-medium"
                      }`}
                    >
                      {tabItem.label}
                      {tabItem.value === "new-launch" && (
                        <span className="inline-block h-2 w-2 rounded-full bg-red-600 ml-1 mb-2.5 align-middle" />
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Main Search Input Line (Matches Image 3) */}
              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                {/* Left Dropdown: All Residential ⌵ */}
                <div className="flex items-center gap-1 shrink-0">
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="bg-transparent py-2.5 pl-2 pr-4 text-sm font-semibold text-slate-800 outline-none cursor-pointer"
                  >
                    {PROPERTY_TYPE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Divider Line */}
                <div className="hidden md:block h-8 w-[1px] bg-slate-200 shrink-0" />

                {/* Main Search Input */}
                <div className="relative flex-1">
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="w-full bg-transparent px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none"
                    placeholder="Search city, locality, project, builder, or landmark"
                  />
                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-xs text-slate-600 hover:bg-slate-300"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Action Icons & Primary Golden Search Button */}
                <div className="flex items-center gap-2.5 justify-end">
                  {/* Mic Voice Search */}
                  <button
                    type="button"
                    onClick={() => handleSearch()}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50/90 text-[#0284c7] hover:bg-blue-100 transition cursor-pointer shadow-xs"
                    title="Voice Search"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
                    </svg>
                  </button>

                  {/* Crosshair Location */}
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("Ahmedabad");
                      handleSearch("Ahmedabad");
                    }}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50/90 text-[#0284c7] hover:bg-blue-100 transition cursor-pointer shadow-xs"
                    title="Near Me"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <circle cx="12" cy="12" r="7"/>
                      <line x1="12" y1="2" x2="12" y2="5"/>
                      <line x1="12" y1="19" x2="12" y2="22"/>
                      <line x1="2" y1="12" x2="5" y2="12"/>
                      <line x1="19" y1="12" x2="22" y2="12"/>
                    </svg>
                  </button>

                  {/* Golden Search Button matching Image 3 */}
                  <button
                    type="button"
                    onClick={() => handleSearch()}
                    className="rounded-xl bg-[#a98440] hover:bg-[#977232] px-7 py-3 text-sm font-semibold text-white shadow-sm transition active:scale-95 cursor-pointer whitespace-nowrap"
                  >
                    Search Properties
                  </button>
                </div>
              </div>

              {/* Popular Localities Quick Chips */}
              <div className="mt-5 flex flex-wrap items-center gap-2 pt-3.5 border-t border-slate-100 text-xs">
                <span className="font-bold text-slate-400 flex items-center gap-1">
                  <span>⚡</span> Popular Localities:
                </span>
                {POPULAR_LOCALITIES.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => {
                      setSearch(loc);
                      handleSearch(loc);
                    }}
                    className="rounded-xl border border-slate-200/80 bg-slate-50 px-3 py-1.5 font-semibold text-slate-700 transition hover:border-[#a98440] hover:bg-[#a98440]/10 hover:text-[#a98440] hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
