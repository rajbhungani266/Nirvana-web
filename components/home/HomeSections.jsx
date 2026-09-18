import Link from "next/link";

const CATEGORIES = [
  {
    title: "High-Yield Investment",
    badge: "12% - 16% Potential ROI",
    desc: "Curated pre-leased commercial assets, retail spaces, and early-stage residential growth corridors with strong rental yields.",
    href: "/investment",
    linkText: "Explore Investments",
    icon: (
      <svg className="h-8 w-8 text-[#a98440]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    bgGradient: "from-[#fbf7ee] to-white",
    borderColor: "border-[#e2d1b3]/60",
  },
  {
    title: "Weekend Homes & Villas",
    badge: "Peaceful Living",
    desc: "Exclusive second-home sanctuaries, golf villas, and scenic farmland retreats near Sanand, Thol, and Kensville for tranquil escapes.",
    href: "/plot-weekend-villa",
    linkText: "Explore Villas",
    icon: (
      <svg className="h-8 w-8 text-[#a98440]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    bgGradient: "from-amber-50/40 to-white",
    borderColor: "border-amber-100",
  },
  {
    title: "Commercial & Tech Hubs",
    badge: "Corporate Grade A",
    desc: "Premium corporate offices, flagship retail showrooms, and SEZ spaces in GIFT City and Sindhubhavan Road with modern infrastructure.",
    href: "/commercial",
    linkText: "Explore Commercial",
    icon: (
      <svg className="h-8 w-8 text-[#a98440]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    bgGradient: "from-slate-50 to-white",
    borderColor: "border-slate-200",
  },
];

export default function HomeSections() {
  return (
    <section className="bg-white py-20">
      <div className="container-box">
        <div className="mb-14 grid gap-8 xl:grid-cols-[1.5fr_1fr] items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#a98440]">
              Tailored Discovery
            </span>
            <h2 className="heading-display mt-3 text-[2.4rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-slate-900 sm:text-[3.2rem]">
              Choose What You&apos;re
              <br />
              Looking For
            </h2>
          </div>

          <div>
            <p className="text-sm leading-relaxed text-slate-500 sm:text-base">
              Browse hand-picked categories tailored to distinct lifestyles, high-return investment goals, and family living across Ahmedabad&apos;s fastest-growing sectors.
            </p>
          </div>
        </div>

        {/* 3-Column Grid */}
        <div className="grid gap-7 md:grid-cols-3">
          {CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className={`group flex flex-col justify-between rounded-[28px] border ${cat.borderColor} bg-gradient-to-b ${cat.bgGradient} p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-[#a98440]/40`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                    {cat.icon}
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm border border-slate-100">
                    {cat.badge}
                  </span>
                </div>

                <h3 className="heading-display mt-6 text-xl font-bold text-slate-900 group-hover:text-[#a98440] transition-colors">
                  {cat.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {cat.desc}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100/80">
                <Link
                  href={cat.href}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#a98440] group-hover:gap-3 transition-all"
                >
                  <span>{cat.linkText}</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}