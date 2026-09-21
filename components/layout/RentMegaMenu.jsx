"use client";

import Link from "next/link";
import {
  Home,
  BarChart3,
  Armchair,
  Coins,
  MapPin,
  ArrowRight,
  Tag,
  FileCheck,
  Users,
  Lock,
  PhoneCall,
} from "lucide-react";

/*
  Rent mega-menu — same shape as BuyMegaMenu but themed around renting:
  property type, furnishing, budget bands and rental locations instead of
  ownership categories. Kept as its own self-contained data set (not shared
  with Buy) since rent filters (furnishing, monthly budget) don't apply to
  purchase listings.
*/

// Query params match the backend's actual filterset_fields for
// ResidentialProperty (rent reuses that endpoint) — see backcode views.py.
// Labels with no real matching choice fall back to `search=`.
export const PROPERTY_TYPE_LINKS = [
  { label: "Flats & Apartments", href: "/rent?property_type=flat" },
  { label: "Villas & Bungalows", href: "/rent?property_type=villa" },
  { label: "PG / Co-living", href: "/rent?search=PG Co-living" },
  { label: "Independent House", href: "/rent?property_type=bungalow" },
  { label: "Studio Apartment", href: "/rent?search=Studio Apartment" },
  { label: "Serviced Apartment", href: "/rent?search=Serviced Apartment" },
];

export const FURNISHING_LINKS = [
  { label: "Fully Furnished", href: "/rent?furnishing__iexact=Furnished" },
  { label: "Semi Furnished", href: "/rent?furnishing__iexact=Semi-Furnished" },
  { label: "Unfurnished", href: "/rent?furnishing__iexact=Unfurnished" },
];

export const RENT_BHK_LINKS = [
  { label: "1 BHK", href: "/rent?bedrooms=1" },
  { label: "2 BHK", href: "/rent?bedrooms=2" },
  { label: "3 BHK", href: "/rent?bedrooms=3" },
  { label: "4+ BHK", href: "/rent?bedrooms__gte=4" },
];

// price on ResidentialProperty doubles as the monthly rent for deal_type=rental.
export const BUDGET_LINKS = [
  { label: "Under ₹15,000", href: "/rent?price__lte=15000" },
  { label: "₹15,000 - ₹30,000", href: "/rent?price__gte=15000&price__lte=30000" },
  { label: "₹30,000 - ₹50,000", href: "/rent?price__gte=30000&price__lte=50000" },
  { label: "₹50,000 - ₹1,00,000", href: "/rent?price__gte=50000&price__lte=100000" },
  { label: "Above ₹1,00,000", href: "/rent?price__gte=100000" },
];

export const RENT_LOCATION_LINKS = [
  { label: "SG Highway", href: "/rent?area__iexact=SG Highway" },
  { label: "Sindhi Bhavan Road", href: "/rent?area__iexact=Sindhi Bhavan Road" },
  { label: "Bopal", href: "/rent?area__iexact=Bopal" },
  { label: "South Bopal", href: "/rent?area__iexact=South Bopal" },
  { label: "Thaltej", href: "/rent?area__iexact=Thaltej" },
  { label: "Prahlad Nagar", href: "/rent?area__iexact=Prahlad Nagar" },
  { label: "Science City", href: "/rent?area__iexact=Science City" },
];

const TRUST_ITEMS = [
  { icon: Tag, title: "Zero Brokerage", note: "No Hidden Charges" },
  { icon: FileCheck, title: "Verified Listings", note: "100% Genuine Owners" },
  { icon: Users, title: "Expert Guidance", note: "From Rental Advisors" },
  { icon: Lock, title: "Secure & Transparent", note: "Trusted by 10,000+ Tenants" },
  { icon: PhoneCall, title: "Quick Assistance", note: "Call us: 1800 41 99099" },
];

function ColumnHeading({ icon: Icon, children }) {
  const isComponent = typeof Icon === "function" || (typeof Icon === "object" && Icon !== null);
  return (
    <div className="group flex items-center gap-2 text-[15px] font-bold text-slate-900 cursor-default">
      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-50 text-[#a98440] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
        {isComponent ? <Icon className="h-4 w-4" /> : <span>{Icon}</span>}
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
      <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 text-[#a98440] transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
    </Link>
  );
}

export default function RentMegaMenu({ onClose = () => {} }) {
  return (
    <div className="rounded-3xl border border-slate-100/90 bg-white/98 backdrop-blur-xl p-7 shadow-[0_28px_70px_rgba(15,23,42,0.18)] ring-1 ring-black/[0.04] transition-all">
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr_1fr_1fr_320px] panel-content-stagger">
        {/* Property Type */}
        <div>
          <ColumnHeading icon={Home}>Property Type</ColumnHeading>
          <div className="mt-4 space-y-2.5">
            {PROPERTY_TYPE_LINKS.map((item) => (
              <MenuLink key={item.label} item={item} onClose={onClose} />
            ))}
          </div>

          <div className="mt-6 border-t border-slate-100 pt-4">
            <ColumnHeading icon={BarChart3}>By BHK</ColumnHeading>
            <div className="mt-4 space-y-2.5">
              {RENT_BHK_LINKS.map((item) => (
                <MenuLink key={item.label} item={item} onClose={onClose} />
              ))}
            </div>
          </div>
        </div>

        {/* Furnishing */}
        <div>
          <ColumnHeading icon={Armchair}>Furnishing</ColumnHeading>
          <div className="mt-4 space-y-2.5">
            {FURNISHING_LINKS.map((item) => (
              <MenuLink key={item.label} item={item} onClose={onClose} />
            ))}
          </div>

          <Link
            href="/rent"
            onClick={onClose}
            className="group mt-6 inline-flex items-center gap-1.5 text-[13px] font-bold text-[#a98440] transition-all duration-200 hover:text-[#977232] hover:translate-x-1"
          >
            <span>View all Rentals</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Budget */}
        <div>
          <ColumnHeading icon={Coins}>Monthly Budget</ColumnHeading>
          <div className="mt-4 space-y-2.5">
            {BUDGET_LINKS.map((item) => (
              <MenuLink key={item.label} item={item} onClose={onClose} />
            ))}
          </div>
        </div>

        {/* Top Locations */}
        <div>
          <ColumnHeading icon={MapPin}>Top Locations</ColumnHeading>
          <div className="mt-4 space-y-2.5">
            {RENT_LOCATION_LINKS.map((item) => (
              <MenuLink key={item.label} item={item} onClose={onClose} />
            ))}
          </div>

          <div className="group mt-5 rounded-2xl bg-slate-50 p-4 transition-all duration-200 hover:bg-[#fbf7ee]/70 border border-slate-100">
            <p className="text-[13px] font-semibold text-slate-900 group-hover:text-[#a98440] transition-colors">
              Can&apos;t find the right rental?
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

        {/* Featured Rental card */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#fbf7ee] to-white p-4.5 ring-1 ring-[#e2d1b3]/70 shadow-sm transition-all duration-300 hover:shadow-xl hover:ring-[#a98440]/60 hover:-translate-y-1">
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-bold text-[#a98440] transition-transform duration-200 group-hover:scale-105">
            ⭐ Featured Rental
          </span>

          <h4 className="mt-3 text-lg font-bold text-slate-900 group-hover:text-[#a98440] transition-colors">
            Fully Furnished 3BHK
          </h4>
          <p className="text-[12px] text-slate-500">
            Sindhu Bhavan Road, Ahmedabad
          </p>

          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-[#a98440]">
              Furnished
            </span>
            <span className="rounded-md bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-600">
              Zero Brokerage
            </span>
            <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-600">
              Immediate
            </span>
          </div>

          <div className="mt-3 overflow-hidden rounded-xl">
            <img
              src="/images/ninth.png"
              alt="Fully Furnished 3BHK"
              className="h-32 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            />
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 text-center">
            <div>
              <p className="text-sm font-bold text-[#a98440]">2 Months</p>
              <p className="text-[10px] text-slate-500">Security Deposit</p>
            </div>
            <div>
              <p className="text-sm font-bold text-green-600">Immediate</p>
              <p className="text-[10px] text-slate-500">Available From</p>
            </div>
          </div>

          <div className="mt-3 border-t border-slate-100 pt-3">
            <p className="text-[11px] text-slate-500">Monthly Rent</p>
            <p className="text-lg font-bold text-[#a98440]">₹45,000/month</p>
          </div>

          <Link
            href="/rent"
            onClick={onClose}
            className="mt-3 block rounded-xl bg-[#a98440] hover:bg-[#977232] py-2.5 text-center text-[13px] font-bold text-white shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            View Rental Details →
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
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-[#a98440] transition-transform duration-200 group-hover:scale-115">
              <item.icon className="h-4 w-4" />
            </span>
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
