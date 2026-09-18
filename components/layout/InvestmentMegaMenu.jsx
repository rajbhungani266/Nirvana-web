"use client";

import Link from "next/link";

// Query params match the backend's InvestmentProperty filterset_fields
// exactly (see backcode views.py). Labels with no real matching choice
// fall back to `search=` rather than a param the backend would ignore.
export const INVESTMENT_TYPE_LINKS = [
  { label: "High ROI Projects", href: "/investment?investment_type=high_return", tag: "Hot" },
  { label: "Rental Income Properties", href: "/investment?investment_type=rental_income" },
  { label: "Pre-Leased Properties", href: "/investment?investment_type=preleased" },
  { label: "Commercial Investment", href: "/investment?search=Commercial" },
  { label: "Under Construction", href: "/investment?investment_type=future_growth" },
  { label: "Fractional Ownership", href: "/investment?search=Fractional Ownership" },
];

// No calculator pages exist yet — honest placeholders that browse Investment
// rather than pretending a ?tool= param does something.
export const INVESTMENT_TOOL_LINKS = [
  { label: "ROI Calculator", href: "/investment" },
  { label: "EMI Calculator", href: "/investment" },
  { label: "Affordability Calculator", href: "/investment" },
];

export const INVESTMENT_BUDGET_LINKS = [
  { label: "Under ₹50 Lac", href: "/investment?price__lte=5000000" },
  { label: "₹50 Lac - ₹1 Cr", href: "/investment?price__gte=5000000&price__lte=10000000" },
  { label: "₹1 Cr - ₹2 Cr", href: "/investment?price__gte=10000000&price__lte=20000000" },
  { label: "Above ₹2 Cr", href: "/investment?price__gte=20000000" },
];

export const INVESTMENT_LOCATION_LINKS = [
  { label: "SG Highway", href: "/investment?area__iexact=SG Highway" },
  { label: "Sindhi Bhavan Road", href: "/investment?area__iexact=Sindhi Bhavan Road" },
  { label: "GIFT City", href: "/gift-city" },
  { label: "Bopal", href: "/investment?area__iexact=Bopal" },
  { label: "Science City", href: "/investment?area__iexact=Science City" },
  { label: "Prahlad Nagar", href: "/investment?area__iexact=Prahlad Nagar" },
];

const TRUST_ITEMS = [
  { icon: "📊", title: "Verified ROI Data", note: "Backed by Market Research" },
  { icon: "🏷️", title: "Zero Brokerage", note: "Direct from Builders" },
  { icon: "🤝", title: "Expert Guidance", note: "From Investment Advisors" },
  { icon: "🔒", title: "Secure & Transparent", note: "Trusted by 10,000+ Investors" },
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
      <span className="flex items-center gap-2 transition-colors duration-200 group-hover:font-medium">
        <span>{item.label}</span>
        {item.tag && (
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase text-[#a98440] transition-transform duration-200 group-hover:scale-105">
            {item.tag}
          </span>
        )}
      </span>
      <span className="opacity-0 -translate-x-2 text-xs font-bold text-[#a98440] transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0">
        →
      </span>
    </Link>
  );
}

export default function InvestmentMegaMenu({ onClose = () => {} }) {
  return (
    <div className="rounded-3xl border border-slate-100/90 bg-white/98 backdrop-blur-xl p-7 shadow-[0_28px_70px_rgba(15,23,42,0.18)] ring-1 ring-black/[0.04] transition-all">
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr_1fr_1fr_320px] panel-content-stagger">
        {/* Investment Type */}
        <div>
          <ColumnHeading icon="📈">Investment Type</ColumnHeading>
          <div className="mt-4 space-y-2.5">
            {INVESTMENT_TYPE_LINKS.map((item) => (
              <MenuLink key={item.label} item={item} onClose={onClose} />
            ))}
          </div>

          <Link
            href="/investment"
            onClick={onClose}
            className="group mt-5 inline-flex items-center gap-1.5 text-[13px] font-bold text-[#a98440] transition-all duration-200 hover:text-[#977232] hover:translate-x-1"
          >
            <span>View all Investments</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Investment Tools */}
        <div>
          <ColumnHeading icon="🧮">Investment Tools</ColumnHeading>
          <div className="mt-4 space-y-2.5">
            {INVESTMENT_TOOL_LINKS.map((item) => (
              <MenuLink key={item.label} item={item} onClose={onClose} />
            ))}
          </div>
        </div>

        {/* Budget */}
        <div>
          <ColumnHeading icon="💰">Budget</ColumnHeading>
          <div className="mt-4 space-y-2.5">
            {INVESTMENT_BUDGET_LINKS.map((item) => (
              <MenuLink key={item.label} item={item} onClose={onClose} />
            ))}
          </div>
        </div>

        {/* Top Locations */}
        <div>
          <ColumnHeading icon="📍">Top Locations</ColumnHeading>
          <div className="mt-4 space-y-2.5">
            {INVESTMENT_LOCATION_LINKS.map((item) => (
              <MenuLink key={item.label} item={item} onClose={onClose} />
            ))}
          </div>

          <div className="group mt-5 rounded-2xl bg-slate-50 p-4 transition-all duration-200 hover:bg-[#fbf7ee]/70 border border-slate-100">
            <p className="text-[13px] font-semibold text-slate-900 group-hover:text-[#a98440] transition-colors">
              Not sure where to invest?
            </p>
            <p className="mt-1 text-[12px] text-slate-500">
              Talk to our advisors and get a curated shortlist.
            </p>
            <Link
              href="/post-property"
              onClick={onClose}
              className="mt-3 inline-flex items-center gap-2 rounded-xl border border-[#a98440] px-3.5 py-2 text-[12px] font-bold text-[#a98440] transition-all duration-200 hover:bg-[#a98440] hover:text-white hover:scale-105 active:scale-95 shadow-xs"
            >
              📝 Post Requirement
            </Link>
          </div>
        </div>

        {/* Featured Opportunity card */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#fbf7ee] to-white p-4.5 ring-1 ring-[#e2d1b3]/70 shadow-sm transition-all duration-300 hover:shadow-xl hover:ring-[#a98440]/60 hover:-translate-y-1">
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-bold text-[#a98440] transition-transform duration-200 group-hover:scale-105">
            ⭐ Featured Opportunity
          </span>

          <h4 className="mt-3 text-lg font-bold text-slate-900 group-hover:text-[#a98440] transition-colors">
            Premium Office Tower
          </h4>
          <p className="text-[12px] text-slate-500">
            Iscon Ambli Road, Ahmedabad
          </p>

          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-[#a98440]">
              Grade A
            </span>
            <span className="rounded-md bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-600">
              Pre-Leased
            </span>
            <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-600">
              High ROI
            </span>
          </div>

          <div className="mt-3 overflow-hidden rounded-xl">
            <img
              src="/images/ninth.png"
              alt="Premium Office Tower"
              className="h-32 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            />
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-sm font-bold text-green-600">8.2%*</p>
              <p className="text-[10px] text-slate-500">Rental Yield</p>
            </div>
            <div>
              <p className="text-sm font-bold text-[#a98440]">14%*</p>
              <p className="text-[10px] text-slate-500">ROI Potential</p>
            </div>
            <div>
              <p className="text-sm font-bold text-amber-500">★ 9.6/10</p>
              <p className="text-[10px] text-slate-500">Score</p>
            </div>
          </div>

          <div className="mt-3 border-t border-slate-100 pt-3">
            <p className="text-[11px] text-slate-500">Starts from</p>
            <p className="text-lg font-bold text-[#a98440]">₹91.52 Lac.</p>
          </div>

          <Link
            href="/investment"
            onClick={onClose}
            className="mt-3 block rounded-xl bg-[#a98440] hover:bg-[#977232] py-2.5 text-center text-[13px] font-bold text-white shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            View Project Details →
          </Link>
        </div>
      </div>

      {/* Trust bar */}
      <div className="mt-6 grid gap-3 border-t border-slate-100 pt-5 sm:grid-cols-3 lg:grid-cols-5">
        {TRUST_ITEMS.map((item) => (
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
