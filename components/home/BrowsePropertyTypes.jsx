"use client";

import Link from "next/link";

const PROPERTY_TYPES = [
  {
    title: "Luxury Apartments",
    subtitle: "8,400+ Properties",
    desc: "2, 3 & 4 BHK high-rises in prime city hubs",
    img: "/images/first.jpg",
    bg: "bg-[#fff7eb]",
    badgeBg: "bg-amber-100 text-amber-900",
    href: "/residential",
  },
  {
    title: "Independent Villas",
    subtitle: "1,800+ Properties",
    desc: "Private gated communities & luxury bungalows",
    img: "/images/second.jpg",
    bg: "bg-[#fbf7ee]",
    badgeBg: "bg-[#a98440]/15 text-[#a98440]",
    href: "/residential?property_type=villa",
  },
  {
    title: "Residential Plots",
    subtitle: "1,100+ Properties",
    desc: "Clear-title land in emerging growth corridors",
    img: "/images/hero-water-mansion.jpg",
    bg: "bg-[#eef9f1]",
    badgeBg: "bg-emerald-100 text-emerald-900",
    href: "/plot-weekend-villa",
  },
  {
    title: "Commercial & Retail",
    subtitle: "2,400+ Properties",
    desc: "Grade-A office towers & high-footfall shops",
    img: "/images/hero-gift-tower.jpg",
    bg: "bg-[#f5f3ff]",
    badgeBg: "bg-purple-100 text-purple-900",
    href: "/commercial",
  },
  {
    title: "Penthouses & Estates",
    subtitle: "650+ Properties",
    desc: "Sky mansions & weekend farmland retreats",
    img: "/images/ninth.png",
    bg: "bg-[#fff1f2]",
    badgeBg: "bg-rose-100 text-rose-900",
    href: "/plot-weekend-villa",
  },
];

export default function BrowsePropertyTypes() {
  return (
    <section className="bg-[#f8fafc] py-24 text-slate-950">
      <div className="container-box">
        {/* Section Heading */}
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#a98440]">
              Diverse Portfolio
            </span>
            <h2 className="heading-display mt-3 text-[2.4rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-slate-950 sm:text-[3.2rem]">
              Browse Property Types
              <br />
              in Ahmedabad
            </h2>
          </div>

          <div>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              Discover a wide spectrum of lifestyle, commercial, and investment-focused real estate assets. Filter by configuration, locality, and budget parameters to find your exact match.
            </p>
          </div>
        </div>

        {/* 5-Column Responsive Cards Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {PROPERTY_TYPES.map((card, idx) => (
            <Link
              key={idx}
              href={card.href}
              className={`group flex flex-col justify-between overflow-hidden rounded-[26px] border border-slate-200/80 ${card.bg} p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-[#a98440]/40`}
            >
              <div>
                <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${card.badgeBg}`}>
                  {card.subtitle}
                </span>

                <h3 className="heading-display mt-5 text-xl font-bold text-slate-900 group-hover:text-[#a98440] transition-colors">
                  {card.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  {card.desc}
                </p>
              </div>

              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-inner">
                <img
                  src={card.img}
                  alt={card.title}
                  className="h-36 w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="mt-4 flex items-center justify-between text-xs font-bold text-[#a98440]">
                <span>Browse Listings</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
