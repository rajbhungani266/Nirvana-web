"use client";

import { useState, useEffect, useRef } from "react";

const TESTIMONIAL_SLIDES = [
  [
    {
      title: "Awesome Design & Quality",
      text: "Amazing design, easy to customize and a design quality superlative experience. Found our luxury high-rise apartment on SBR with complete peace of mind.",
      author: "Ali Tufan",
      role: "Product Manager",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      rating: 5,
    },
    {
      title: "Seamless High-Yield Investment",
      text: "Found a pre-leased Grade-A corporate office in GIFT City with 8.5% net rental yield in under 3 weeks. Nirvana's documentation verification and title clearance were exemplary.",
      author: "Rajesh Shah",
      role: "Commercial Investor, Mumbai",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      rating: 5,
    },
    {
      title: "Found Our Dream Vastu Home",
      text: "We spent months touring Shela and Bopal. Nirvana's team filtered out unverified projects and guided us straight to a 100% Vastu-aligned 3 BHK with optimal sunlight and zero brokerage.",
      author: "Meera & Kunal Desai",
      role: "Homebuyers, Shela",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      rating: 5,
    },
  ],
  [
    {
      title: "Exceptional NRI Advisory",
      text: "Operating from Dubai, I needed complete transparency, legal verification, and detailed video walk-throughs for my weekend villa investment near Thol. They handled everything flawlessly.",
      author: "Vikram Singhania",
      role: "NRI Investor, UAE",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      rating: 5,
    },
    {
      title: "Ultra-Luxury Portfolio",
      text: "The curated luxury collection on Iscon Ambli Road is second to none. Truly a private banking level advisory experience for prime luxury properties.",
      author: "Kavita Singhal",
      role: "Private Equity Partner",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
      rating: 5,
    },
    {
      title: "Unmatched Due Diligence",
      text: "Every RERA detail, land title history, and master plan was verified before they even showed us the property. Complete confidence and zero broker hassle throughout.",
      author: "Sanjay Mehta",
      role: "Senior Advocate, Ahmedabad",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
      rating: 5,
    },
  ],
  [
    {
      title: "Top-Tier Commercial Guidance",
      text: "From retail showroom scouting on Sindhubhavan Road to leasing agreements, Nirvana delivered high ROI options backed by solid market data.",
      author: "Pooja Sharma",
      role: "Retail Brand Director",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
      rating: 5,
    },
    {
      title: "Best Advisory in Ahmedabad",
      text: "Honest feedback, no spam calls, and genuine developer relationships. We closed on our dream villa in Shantigram effortlessly and comfortably.",
      author: "Anand Verma",
      role: "Chartered Accountant",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
      rating: 5,
    },
    {
      title: "Flawless Resale Transaction",
      text: "Selling our luxury apartment on SG Highway was handled with absolute discretion. Verified buyers only, transparent valuation, and prompt settlement.",
      author: "Deepak Chawla",
      role: "Industrialist, Ahmedabad",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
      rating: 5,
    },
  ],
  [
    {
      title: "Transparent End-to-End Closing",
      text: "Finding a vastu-compliant 4 BHK penthouse on Iscon Ambli Road seemed daunting until we connected with Nirvana. Their legal scrutiny and loan assistance were top-notch.",
      author: "Aditya & Ritu Khurana",
      role: "Entrepreneurs, Ahmedabad",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
      rating: 5,
    },
    {
      title: "High-Yield Preleased Clinic Space",
      text: "Acquired a prime commercial unit on Science City Road with guaranteed rental yield. Their market intelligence and developer track record analysis were spot on.",
      author: "Dr. Harshvardhan Joshi",
      role: "Healthcare Director & Investor",
      avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80",
      rating: 5,
    },
    {
      title: "Seamless Weekend Villa Purchase",
      text: "Investing from London in a golf villa near Sanand was completely stress-free. Nirvana sent weekly drone footage, contract breakdowns, and managed our registry flawlessly.",
      author: "Elena & Rohan Merchant",
      role: "Fintech VP, London",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80",
      rating: 5,
    },
  ],
];

export default function LandingFeatureSections() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // Auto-play sliding animation every 5.5 seconds (pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % TESTIMONIAL_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused]);

  function handleTouchStart(e) {
    touchStartX.current = e.targetTouches[0].clientX;
  }

  function handleTouchMove(e) {
    touchEndX.current = e.targetTouches[0].clientX;
  }

  function handleTouchEnd() {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      setActiveSlide((prev) => (prev + 1) % TESTIMONIAL_SLIDES.length);
    } else if (diff < -50) {
      setActiveSlide((prev) => (prev - 1 + TESTIMONIAL_SLIDES.length) % TESTIMONIAL_SLIDES.length);
    }
    touchStartX.current = null;
    touchEndX.current = null;
  }
  return (
    <section className="bg-[#f8fafc] text-slate-950">
      {/* 1. Explore Spaces Bento */}
      <div className="container-box py-20 sm:py-24">
        <div className="grid gap-10 md:gap-14 lg:grid-cols-2 items-start max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto">
          {/* Left Column */}
          <div className="flex flex-col gap-10 lg:gap-14">
            <div className="max-w-lg lg:pt-4">
              <h2 className="heading-display text-3xl md:text-[38px] font-semibold text-slate-900 leading-[1.2] tracking-tight">
                Explore Spaces Designed<br />for Better Living
              </h2>
              <p className="mt-5 text-[13px] md:text-[14px] leading-relaxed text-slate-500">
                Discover thoughtfully selected homes, premium communities, and future-ready developments that combine lifestyle, convenience, and long-term value for modern buyers and investors.
              </p>
            </div>
            
            <div className="w-full rounded-[20px] overflow-hidden bg-slate-100 shadow-sm border border-slate-100">
              <img
                src="/images/fourth.png"
                alt="Modern interior detail"
                className="w-full aspect-[4/5] object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6 md:gap-8 w-full">
            <div className="rounded-[20px] overflow-hidden bg-slate-100 shadow-sm border border-slate-100">
              <img
                src="/images/main.jpg"
                alt="Living room architecture"
                className="w-full aspect-[4/5] object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            
            <div className="rounded-[20px] overflow-hidden bg-slate-100 shadow-sm border border-slate-100">
              <img
                src="/images/fifth.png"
                alt="Contemporary living"
                className="w-full aspect-[16/9] object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Why Buyers Choose Nirvana Space */}
      <div className="container-box py-20 border-t border-slate-200/80">
        <div className="grid gap-12 xl:grid-cols-[0.95fr_1.05fr] items-start">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#a98440]">
              The Nirvana Advantage
            </span>
            <h2 className="heading-display mt-4 text-3xl font-extrabold tracking-[-0.03em] text-slate-950 sm:text-4xl">
              Why Buyers & Investors
              <br />
              Trust Nirvana Space
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-slate-600 sm:text-base">
              We eliminate ambiguity in real estate through rigorous due diligence, developer track-record vetting, transparent pricing matrices, and dedicated client advocates from inspection to registry.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { img: "/images/six.png", title: "Smart Architecture", tag: "Design" },
              { img: "/images/seven.png", title: "Prime Corridors", tag: "Location" },
              { img: "/images/eight.png", title: "Verified Clear Title", tag: "Trust" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-md"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-[240px] w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#e2b764]">
                    {item.tag}
                  </span>
                  <p className="text-sm font-bold text-white drop-shadow">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Social Proof & Testimonials - Exactly Matching Image 2 */}
      <div className="container-box pb-24 pt-12 md:pt-16">
        {/* Header & Stats Row */}
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start justify-between">
          <div>
            <h2 className="heading-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
              Trusted by Buyers and
              <br />
              Investors
            </h2>

            {/* 3 Metrics Row directly under heading */}
            <div className="mt-8 flex flex-wrap items-center gap-10 sm:gap-14">
              <div>
                <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">85%</p>
                <p className="mt-1.5 text-xs sm:text-sm font-medium text-slate-500">Completed Property</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">99%</p>
                <p className="mt-1.5 text-xs sm:text-sm font-medium text-slate-500">Satisfied Customers</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">95%</p>
                <p className="mt-1.5 text-xs sm:text-sm font-medium text-slate-500">Home ownership</p>
              </div>
            </div>
          </div>

          {/* Right Side Paragraph */}
          <div className="lg:pt-2 lg:pl-8 max-w-lg">
            <p className="text-sm sm:text-base leading-relaxed text-slate-500">
              People choose Nirvana Space for reliable guidance, curated opportunities, and a smoother experience while exploring properties across Ahmedabad and surrounding growth locations.
            </p>
          </div>
        </div>

        {/* Sliding Testimonials Track with Smooth Transitions */}
        <div
          className="mt-12 overflow-hidden w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{
              transform: `translateX(-${activeSlide * 100}%)`,
            }}
          >
            {TESTIMONIAL_SLIDES.map((slide, slideIndex) => (
              <div
                key={slideIndex}
                className="w-full shrink-0 min-w-full grid gap-6 md:grid-cols-3 px-0.5 py-1"
              >
                {slide.map((item, index) => (
                  <div
                    key={index}
                    className="relative flex flex-col justify-between rounded-[24px] border border-slate-200/80 bg-[#f9fafb] p-7 sm:p-8 transition-all duration-300 hover:shadow-md hover:border-slate-300"
                  >
                    {/* Subtle Double Quotation Mark Watermark */}
                    <div className="absolute top-6 right-7 text-4xl sm:text-5xl font-serif text-slate-200/80 select-none pointer-events-none leading-none">
                      “
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 pr-8">
                        {item.title}
                      </h3>
                      <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-600">
                        &ldquo;{item.text}&rdquo;
                      </p>
                      <div className="mt-5 flex text-amber-400 text-sm tracking-wide">
                        {"★".repeat(item.rating)}
                      </div>
                    </div>

                    <div className="mt-6 flex items-center gap-3.5 pt-2">
                      <img
                        src={item.avatar}
                        alt={item.author}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src =
                            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";
                        }}
                        className="h-11 w-11 rounded-full object-cover shadow-xs border border-slate-200 shrink-0"
                      />
                      <div>
                        <p className="text-sm font-bold text-slate-900">{item.author}</p>
                        <p className="text-xs text-slate-500">{item.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Pagination Dots matching Image 2 */}
        <div className="mt-10 flex items-center justify-center gap-2">
          {TESTIMONIAL_SLIDES.map((_, dotIndex) => (
            <button
              key={dotIndex}
              type="button"
              onClick={() => setActiveSlide(dotIndex)}
              aria-label={`Go to slide ${dotIndex + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeSlide === dotIndex
                  ? "w-6 bg-slate-900"
                  : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
