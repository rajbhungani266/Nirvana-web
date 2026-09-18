"use client";

import Link from "next/link";

// Query params match GiftCityProperty's filterset_fields exactly
// (see backcode views.py).
export const GIFT_PROPERTY_TYPE_LINKS = [
  { label: "Office Spaces", href: "/gift-city?gift_property_type=office" },
  { label: "Residential Units", href: "/gift-city?gift_property_type=residential" },
  { label: "Commercial Spaces", href: "/gift-city?gift_property_type=commercial" },
  { label: "Investment Opportunities", href: "/gift-city?gift_property_type=investment" },
];

export const GIFT_ZONE_LINKS = [
  { label: "SEZ (Special Economic Zone)", href: "/gift-city?zone=sez" },
  { label: "DTA (Domestic Tariff Area)", href: "/gift-city?zone=dta" },
];

export const GIFT_DEAL_TYPE_LINKS = [
  { label: "For Sale", href: "/gift-city?deal_type=sale" },
  { label: "For Rent", href: "/gift-city?deal_type=rental" },
];

// Marketing highlights, not filters — no anchored sections exist on the page
// yet, so these just browse GIFT City rather than link to a #fragment that
// goes nowhere.
export const GIFT_HIGHLIGHT_LINKS = [
  { label: "Tax Benefits", href: "/gift-city" },
  { label: "IFSC Status", href: "/gift-city" },
  { label: "World-Class Infrastructure", href: "/gift-city" },
  { label: "International Business Hub", href: "/gift-city" },
];

const TRUST_ITEMS = [
  { icon: "🛡️", title: "SEZ / RERA Compliant", note: "100% Verified Towers" },
  { icon: "🏷️", title: "Zero Brokerage", note: "Direct from Builders" },
  { icon: "🤝", title: "Expert Guidance", note: "From GIFT City Specialists" },
  { icon: "🔒", title: "Secure & Transparent", note: "Trusted by 10,000+ Customers" },
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

export default function GiftCityMegaMenu({ onClose = () => {} }) {
  return (
    <div className="rounded-3xl border border-slate-100/90 bg-white/98 backdrop-blur-xl p-7 shadow-[0_28px_70px_rgba(15,23,42,0.18)] ring-1 ring-black/[0.04] transition-all">
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr_1fr_1fr_320px] panel-content-stagger">
        {/* Property Type */}
        <div>
          <ColumnHeading icon="🏙️">Property Type</ColumnHeading>
          <div className="mt-4 space-y-2.5">
            {GIFT_PROPERTY_TYPE_LINKS.map((item) => (
              <MenuLink key={item.label} item={item} onClose={onClose} />
            ))}
          </div>

          <Link
            href="/gift-city"
            onClick={onClose}
            className="group mt-5 inline-flex items-center gap-1.5 text-[13px] font-bold text-[#a98440] transition-all duration-200 hover:text-[#977232] hover:translate-x-1"
          >
            <span>View all GIFT City</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Zone */}
        <div>
          <ColumnHeading icon="🗂️">Zone</ColumnHeading>
          <div className="mt-4 space-y-2.5">
            {GIFT_ZONE_LINKS.map((item) => (
              <MenuLink key={item.label} item={item} onClose={onClose} />
            ))}
          </div>

          <div className="mt-6 border-t border-slate-100 pt-4">
            <ColumnHeading icon="🤝">Deal Type</ColumnHeading>
            <div className="mt-4 space-y-2.5">
              {GIFT_DEAL_TYPE_LINKS.map((item) => (
                <MenuLink key={item.label} item={item} onClose={onClose} />
              ))}
            </div>
          </div>
        </div>

        {/* Why GIFT City */}
        <div>
          <ColumnHeading icon="✨">Why GIFT City</ColumnHeading>
          <div className="mt-4 space-y-2.5">
            {GIFT_HIGHLIGHT_LINKS.map((item) => (
              <MenuLink key={item.label} item={item} onClose={onClose} />
            ))}
          </div>
        </div>

        {/* Quick enquiry */}
        <div>
          <ColumnHeading icon="📍">GIFT City, Gandhinagar</ColumnHeading>
          <p className="mt-3 text-[13px] leading-relaxed text-slate-600">
            India&apos;s first operational smart city and international
            financial services hub — premium office, residential and
            investment options.
          </p>

          <div className="group mt-5 rounded-2xl bg-slate-50 p-4 transition-all duration-200 hover:bg-[#fbf7ee]/70 border border-slate-100">
            <p className="text-[13px] font-semibold text-slate-900 group-hover:text-[#a98440] transition-colors">
              Looking for something specific?
            </p>
            <p className="mt-1 text-[12px] text-slate-500">
              Post your requirement and we&apos;ll help you find the best.
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

        {/* Featured Tower card */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#fbf7ee] to-white p-4.5 ring-1 ring-[#e2d1b3]/70 shadow-sm transition-all duration-300 hover:shadow-xl hover:ring-[#a98440]/60 hover:-translate-y-1">
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-bold text-[#a98440] transition-transform duration-200 group-hover:scale-105">
            ⭐ Featured Tower
          </span>

          <h4 className="mt-3 text-lg font-bold text-slate-900 group-hover:text-[#a98440] transition-colors">
            GIFT One — Premium Office
          </h4>
          <p className="text-[12px] text-slate-500">
            GIFT City, Gandhinagar
          </p>

          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-[#a98440]">
              SEZ
            </span>
            <span className="rounded-md bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-600">
              Tax Benefits
            </span>
            <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-600">
              IFSC
            </span>
          </div>

          <div className="mt-3 overflow-hidden rounded-xl">
            <img
              src="/images/ninth.png"
              alt="GIFT One Tower"
              className="h-32 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            />
          </div>

          <div className="mt-3 border-t border-slate-100 pt-3">
            <p className="text-[11px] text-slate-500">Starts from</p>
            <p className="text-lg font-bold text-[#a98440]">₹85.00 Lac.</p>
          </div>

          <Link
            href="/gift-city"
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
