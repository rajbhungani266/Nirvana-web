"use client";

import Link from "next/link";

/*
  Sell is an action, not a category to browse — so unlike Buy/Rent/Investment/
  Gift City this menu is "how do I start" (category to sell, who I am, deal
  type) rather than "what can I browse". All links point at /post-property
  with query params PostPropertyForm can read to pre-fill its dropdowns.
*/

export const SELL_CATEGORY_LINKS = [
  { label: "Residential Property", href: "/post-property?property_category=residential" },
  { label: "Commercial Property", href: "/post-property?property_category=commercial" },
  { label: "Plot / Land", href: "/post-property?property_category=plot_weekend_villa" },
  { label: "Investment Property", href: "/post-property?property_category=investment" },
  { label: "Gift City Property", href: "/post-property?property_category=gift_city" },
];

export const SELL_USER_TYPE_LINKS = [
  { label: "Owner", href: "/post-property?user_type=owner" },
  { label: "Builder / Developer", href: "/post-property?user_type=builder" },
];

export const SELL_DEAL_TYPE_LINKS = [
  { label: "Sale", href: "/post-property?deal_type=sale" },
  { label: "Rental", href: "/post-property?deal_type=rental" },
  { label: "Resale", href: "/post-property?deal_type=resale" },
];

const WHY_SELL_ITEMS = [
  { icon: "🏷️", title: "Zero Brokerage", note: "No Hidden Charges" },
  { icon: "✅", title: "Verified Buyers Only", note: "No Time-Wasters" },
  { icon: "⚡", title: "Fast Closure", note: "Avg. 21 Days to Sell" },
  { icon: "📢", title: "Wide Reach", note: "10,000+ Active Buyers" },
];

const STATS_ITEMS = [
  { icon: "🏢", title: "5,000+", note: "Properties Listed" },
  { icon: "⚡", title: "21 Days", note: "Avg. Time to Sell" },
  { icon: "🤝", title: "10,000+", note: "Verified Buyers" },
  { icon: "⭐", title: "4.8/5", note: "Customer Rating" },
  { icon: "📞", title: "Quick Assistance", note: "Call us: 1800 41 99099" },
];

function ColumnHeading({ icon, children }) {
  return (
    <div className="group flex items-center gap-2 text-[15px] font-bold text-slate-900 cursor-default">
      <span className="text-[#a98440] transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6">
        {icon}
      </span>
      <span>{children}</span>
    </div>
  );
}

function MenuLink({ item, onClose }) {
  return (
    <Link
      href={item.href}
      onClick={onClose}
      className="group flex items-center justify-between text-[13px] text-slate-600 transition-all duration-200 hover:text-[#a98440] hover:translate-x-1.5 py-0.5"
    >
      <span className="transition-colors duration-200 group-hover:font-medium">
        {item.label}
      </span>
      <span className="opacity-0 -translate-x-2 text-xs font-bold text-[#a98440] transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0">
        →
      </span>
    </Link>
  );
}

export default function SellMegaMenu({ onClose = () => {} }) {
  return (
    <div className="rounded-3xl border border-slate-100/90 bg-white/98 backdrop-blur-xl p-7 shadow-[0_28px_70px_rgba(15,23,42,0.18)] ring-1 ring-black/[0.04] transition-all">
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr_1fr_320px] panel-content-stagger">
        {/* I want to sell my... */}
        <div>
          <ColumnHeading icon="🏠">I want to sell my...</ColumnHeading>
          <div className="mt-4 space-y-2.5">
            {SELL_CATEGORY_LINKS.map((item) => (
              <MenuLink key={item.label} item={item} onClose={onClose} />
            ))}
          </div>
        </div>

        {/* I am a... */}
        <div>
          <ColumnHeading icon="👤">I am a...</ColumnHeading>
          <div className="mt-4 space-y-2.5">
            {SELL_USER_TYPE_LINKS.map((item) => (
              <MenuLink key={item.label} item={item} onClose={onClose} />
            ))}
          </div>

          <div className="mt-6 border-t border-slate-100 pt-4">
            <ColumnHeading icon="🤝">Deal Type</ColumnHeading>
            <div className="mt-4 space-y-2.5">
              {SELL_DEAL_TYPE_LINKS.map((item) => (
                <MenuLink key={item.label} item={item} onClose={onClose} />
              ))}
            </div>
          </div>
        </div>

        {/* Why Sell With Us */}
        <div>
          <ColumnHeading icon="✨">Why Sell With Us</ColumnHeading>
          <div className="mt-4 space-y-3">
            {WHY_SELL_ITEMS.map((item) => (
              <div
                key={item.title}
                className="group flex items-start gap-3 rounded-xl p-2 -mx-2 transition-all duration-200 hover:bg-[#fbf7ee] cursor-pointer"
              >
                <span className="text-lg leading-none transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6">
                  {item.icon}
                </span>
                <div>
                  <p className="text-[13px] font-semibold text-slate-900 group-hover:text-[#a98440] transition-colors">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-slate-500">{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured CTA card */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#fbf7ee] to-white p-4.5 ring-1 ring-[#e2d1b3]/70 shadow-sm transition-all duration-300 hover:shadow-xl hover:ring-[#a98440]/60 hover:-translate-y-1">
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-bold text-[#a98440] transition-transform duration-200 group-hover:scale-105">
            💰 Free Tool
          </span>

          <h4 className="mt-3 text-lg font-bold text-slate-900 group-hover:text-[#a98440] transition-colors">
            Get Free Property Valuation
          </h4>
          <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
            Find out what your property is really worth — our experts
            analyze location, market trends and recent sales to give you an
            accurate estimate, free of cost.
          </p>

          <div className="mt-4 overflow-hidden rounded-xl">
            <img
              src="/images/ninth.png"
              alt="Property valuation"
              className="h-32 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            />
          </div>

          <Link
            href="/post-property"
            onClick={onClose}
            className="mt-4 block rounded-xl bg-[#a98440] hover:bg-[#977232] py-2.5 text-center text-[13px] font-bold text-white shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            Post Your Property →
          </Link>
        </div>
      </div>

      {/* Stats bar */}
      <div className="mt-6 grid gap-3 border-t border-slate-100 pt-5 sm:grid-cols-3 lg:grid-cols-5">
        {STATS_ITEMS.map((item) => (
          <div
            key={item.title}
            className="group flex items-center gap-3 rounded-xl p-2 -m-1 transition-all duration-200 hover:bg-slate-50 hover:scale-[1.03] cursor-pointer"
          >
            <span className="text-lg transition-transform duration-200 group-hover:scale-125">{item.icon}</span>
            <div>
              <p className="text-[12px] font-bold text-slate-900 group-hover:text-[#a98440] transition-colors">
                {item.title}
              </p>
              <p className="text-[11px] text-slate-500">{item.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
