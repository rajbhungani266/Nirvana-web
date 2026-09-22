"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const DEAL_MODES = [
  { value: "buy", label: "Buy" },
  { value: "rent", label: "Rent" },
  { value: "invest", label: "Invest" },
];

const CATEGORY_TABS_BY_MODE = {
  buy: [
    { value: "residential", label: "Residential" },
    { value: "new-launch", label: "New Launch" },
    { value: "commercial", label: "Commercial" },
    { value: "plots", label: "Plots/Land" },
  ],
  rent: [
    { value: "residential", label: "Residential" },
    { value: "commercial", label: "Commercial" },
    { value: "villa", label: "Luxury Villas" },
    { value: "furnished", label: "Furnished" },
  ],
  invest: [
    { value: "preleased", label: "Pre-Leased Commercial" },
    { value: "gift-city", label: "GIFT City IFSC" },
    { value: "retail", label: "High-ROI Retail" },
    { value: "land", label: "Growth Corridors" },
  ],
};

const PROPERTY_TYPE_BY_MODE = {
  buy: [
    { value: "", label: "All Residential" },
    { value: "flat", label: "Apartment / Flat" },
    { value: "villa", label: "Luxury Villa" },
    { value: "bungalow", label: "Bungalow" },
    { value: "penthouse", label: "Penthouse" },
  ],
  rent: [
    { value: "", label: "All Rentals" },
    { value: "flat", label: "Apartment / Flat" },
    { value: "villa", label: "Villa / Bungalow" },
    { value: "office", label: "Commercial Office" },
    { value: "penthouse", label: "Penthouse" },
  ],
  invest: [
    { value: "", label: "All Assets" },
    { value: "preleased", label: "Pre-Leased Office" },
    { value: "retail", label: "Retail Showroom" },
    { value: "gift", label: "GIFT City Tower" },
    { value: "plot", label: "Commercial Plot" },
  ],
};


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
    if (categoryTab === "commercial") path = "/commercial";
    else if (categoryTab === "villa") path = "/plot-weekend-villa";
    if (propertyType) params.set("property_type", propertyType);
  } else if (dealMode === "invest") {
    path = "/investment";
    if (categoryTab === "gift-city") path = "/gift-city";
    else if (categoryTab === "land") path = "/plot-weekend-villa";
    else if (categoryTab === "retail") path = "/commercial";
    if (propertyType) params.set("property_type", propertyType);
  } else {
    path = "/residential";
    if (categoryTab === "commercial") path = "/commercial";
    else if (categoryTab === "plots") path = "/plot-weekend-villa";
    else if (categoryTab === "new-launch") params.set("is_featured", "true");
    if (propertyType) params.set("property_type", propertyType);
  }

  const qs = params.toString();
  return qs ? `${path}?${qs}` : path;
}

function HeroPropertyTypeDropdown({ value, onChange, options = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  const activeOption = options.find((opt) => opt.value === value);
  const displayLabel = activeOption?.label || options[0]?.label || "All Residential";

  return (
    <div ref={ref} className="relative flex items-center shrink-0">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 py-2 pl-2 pr-3 text-xs sm:text-sm font-semibold text-slate-800 hover:text-[#a98440] transition-colors cursor-pointer outline-none select-none"
      >
        <span className="whitespace-nowrap">{displayLabel}</span>
        <svg
          className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180 text-[#a98440]" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="panel-drop-animation absolute left-0 top-[calc(100%+8px)] z-50 min-w-[190px] rounded-2xl border border-slate-200/90 bg-white p-1.5 shadow-[0_16px_36px_rgba(15,23,42,0.12)]">
          <div className="space-y-0.5">
            {options.map((opt) => {
              const active = opt.value === value;
              return (
                <button
                  key={opt.value || "all"}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition-colors cursor-pointer ${
                    active
                      ? "bg-[#a98440]/10 font-bold text-[#a98440]"
                      : "text-slate-700 hover:bg-slate-100/80 hover:text-slate-950 font-medium"
                  }`}
                >
                  <span>{opt.label}</span>
                  {active && (
                    <svg className="h-3.5 w-3.5 text-[#a98440] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
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

  return (
    <section className="relative overflow-hidden bg-slate-950 pb-16 pt-20 md:pt-24 min-h-[580px] sm:min-h-[620px] flex flex-col justify-center">
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
          <h1 className="hero-title mx-auto max-w-[900px] text-[28px] leading-[1.1] text-white sm:text-[40px] md:text-[50px] lg:text-[58px] drop-shadow-lg">
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

          <p className="mt-2.5 sm:mt-3 mx-auto max-w-[680px] text-xs leading-relaxed text-white/85 sm:text-sm md:text-base drop-shadow">
            Explore curated luxury residences, flagship corporate offices, and emerging high-growth corridors with complete transparency.
          </p>

          {/* Search Box Container with Ambient Pulse Glow */}
          <div className="relative mt-5 sm:mt-6 mx-auto w-full max-w-[980px] text-left">
            {/* Ambient Background Aura */}
            <div className="animate-pulse-ambient absolute -inset-3 -z-10 rounded-[36px] bg-gradient-to-r from-[#a98440]/25 via-[#fbbf24]/20 to-[#a98440]/25 blur-2xl" />

            {/* Deal mode tabs (Buy / Rent / Invest) - Centered directly above the card */}
            <div className="flex items-end justify-center gap-1.5">
              {DEAL_MODES.map((mode) => (
                <button
                  key={mode.value}
                  type="button"
                  onClick={() => {
                    setDealMode(mode.value);
                    const defaultTab = CATEGORY_TABS_BY_MODE[mode.value]?.[0]?.value || "residential";
                    setCategoryTab(defaultTab);
                    setPropertyType("");
                  }}
                  className={`rounded-t-xl px-5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer ${
                    dealMode === mode.value
                      ? "bg-[#a98440] text-white shadow-sm"
                      : "glass-search-tab text-slate-900 hover:bg-white/95"
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>

            {/* Unified Glassmorphic Search Card with Backdrop Blur */}
            <div className="glass-search-card relative overflow-hidden rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-[0_24px_70px_rgba(2,6,23,0.35)]">
              {/* Category subtabs row - Always rendered so the card height remains 100% constant across Buy / Rent / Invest */}
              <div className="mb-3 flex items-center gap-6 sm:gap-8 border-b border-slate-100 pb-2.5 text-xs sm:text-sm font-semibold overflow-x-auto scrollbar-hide">
                {(CATEGORY_TABS_BY_MODE[dealMode] || CATEGORY_TABS_BY_MODE.buy).map((tabItem) => (
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

              {/* Main Search Input Line (Matches Image 3) */}
              <div className="flex flex-col gap-2.5 md:flex-row md:items-center">
                {/* Left Dropdown: Dynamic options per deal mode */}
                <HeroPropertyTypeDropdown
                  value={propertyType}
                  onChange={setPropertyType}
                  options={PROPERTY_TYPE_BY_MODE[dealMode] || PROPERTY_TYPE_BY_MODE.buy}
                />

                {/* Divider Line */}
                <div className="hidden md:block h-7 w-[1px] bg-slate-200 shrink-0" />

                {/* Main Search Input */}
                <div className="relative flex-1">
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="w-full bg-transparent px-3 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none"
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
                <div className="flex items-center gap-2 justify-end">
                  {/* Mic Voice Search */}
                  <button
                    type="button"
                    onClick={() => handleSearch()}
                    className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-blue-50/90 text-[#0284c7] hover:bg-blue-100 transition cursor-pointer shadow-xs"
                    title="Voice Search"
                  >
                    <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
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
                    className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-blue-50/90 text-[#0284c7] hover:bg-blue-100 transition cursor-pointer shadow-xs"
                    title="Near Me"
                  >
                    <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
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
                    className="rounded-xl bg-[#a98440] hover:bg-[#977232] px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white shadow-sm transition active:scale-95 cursor-pointer whitespace-nowrap"
                  >
                    Search Properties
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
