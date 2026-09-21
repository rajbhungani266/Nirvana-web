"use client";

import Link from "next/link";
import {
  Home,
  BarChart3,
  Building2,
  Briefcase,
  TrendingUp,
  Calculator,
  MapPin,
  ShieldCheck,
  Tag,
  Users,
  Lock,
  PhoneCall,
  Sparkles,
  Star,
  FileEdit,
  ArrowRight,
} from "lucide-react";

/*
  Buy mega-menu.
  Data-driven so the layout stays clean and easy to edit — each column is
  just an array of { label, href }. Query params match the backend's actual
  filterset_fields exactly (see backcode/apps/properties/views.py) — where a
  label has no real matching choice/field, it falls back to `search=` (a
  genuine full-text match) rather than a param the backend silently ignores.
*/

export const RESIDENTIAL_LINKS = [
  { label: "Apartments", href: "/residential?property_type=flat" },
  { label: "Villas", href: "/residential?property_type=villa" },
  { label: "Penthouses", href: "/residential?search=Penthouse" },
  { label: "Plots", href: "/plot-weekend-villa" },
  { label: "Luxury Homes", href: "/residential?is_featured=true" },
  { label: "Farmhouses", href: "/plot-weekend-villa?property_type=farm_house" },
  { label: "Independent Houses", href: "/residential?property_type=bungalow" },
];

const BHK_LINKS = [
  { label: "1 BHK", href: "/residential?bedrooms=1" },
  { label: "2 BHK", href: "/residential?bedrooms=2" },
  { label: "3 BHK", href: "/residential?bedrooms=3" },
  { label: "4 BHK", href: "/residential?bedrooms=4" },
  { label: "5+ BHK", href: "/residential?bedrooms__gte=5" },
];

export const COMMERCIAL_LINKS = [
  { label: "Office Spaces", href: "/commercial?commercial_type=office" },
  { label: "Retail Shops", href: "/commercial?commercial_type=shop" },
  { label: "Showrooms", href: "/commercial?commercial_type=showroom" },
  { label: "Warehouses", href: "/commercial?commercial_type=warehouse" },
  { label: "Industrial Properties", href: "/commercial?commercial_type=factory" },
  { label: "Business Centers", href: "/commercial?search=Business Center" },
  { label: "Co-working Spaces", href: "/commercial?search=Co-working" },
];

const COMMERCIAL_USE_LINKS = [
  { label: "Office", href: "/commercial?commercial_type=office" },
  { label: "Retail", href: "/commercial?commercial_type=shop" },
  { label: "Industrial", href: "/commercial?commercial_type=factory" },
  { label: "Logistics", href: "/commercial?commercial_type=warehouse" },
];

export const INVESTMENT_LINKS = [
  { label: "High ROI Projects", href: "/investment?investment_type=high_return", tag: "Hot" },
  { label: "Rental Income Properties", href: "/investment?investment_type=rental_income" },
  { label: "Pre-Leased Properties", href: "/investment?investment_type=preleased" },
  { label: "Commercial Investment", href: "/investment?search=Commercial" },
  { label: "Under Construction", href: "/investment?investment_type=future_growth" },
  { label: "Fractional Ownership", href: "/investment?search=Fractional Ownership" },
];

// No calculator pages exist yet — these are honest placeholders that just
// browse Investment rather than pretending a ?tool= param does something.
const INVESTMENT_TOOLS = [
  { label: "ROI Calculator", href: "/investment" },
  { label: "EMI Calculator", href: "/investment" },
  { label: "Affordability Calculator", href: "/investment" },
];

export const LOCATION_LINKS = [
  { label: "SG Highway", href: "/residential?area__iexact=SG Highway" },
  { label: "Sindhi Bhavan Road", href: "/residential?area__iexact=Sindhi Bhavan Road" },
  { label: "GIFT City", href: "/gift-city" },
  { label: "Ambli", href: "/residential?area__iexact=Ambli" },
  { label: "Bopal", href: "/residential?area__iexact=Bopal" },
  { label: "South Bopal", href: "/residential?area__iexact=South Bopal" },
  { label: "Science City", href: "/residential?area__iexact=Science City" },
  { label: "Prahlad Nagar", href: "/residential?area__iexact=Prahlad Nagar" },
];

const TRUST_ITEMS = [
  { icon: ShieldCheck, title: "RERA Verified", note: "100% Compliant Projects" },
  { icon: Tag, title: "Zero Brokerage", note: "Direct from Builders" },
  { icon: Users, title: "Expert Guidance", note: "From Industry Experts" },
  { icon: Lock, title: "Secure & Transparent", note: "Trusted by 10,000+ Customers" },
  { icon: PhoneCall, title: "Quick Assistance", note: "Call us: 1800 41 99099" },
];

function ColumnHeading({ icon: Icon, children }) {
  return (
    <div className="group flex items-center gap-2.5 text-[15px] font-bold text-slate-900 cursor-default">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#a98440]/10 text-[#a98440] transition-transform duration-300 group-hover:scale-110">
        <Icon className="h-4 w-4" />
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
      <ArrowRight className="opacity-0 -translate-x-2 h-3.5 w-3.5 text-[#a98440] transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
    </Link>
  );
}

export default function BuyMegaMenu({ onClose = () => {} }) {
  return (
    <div className="rounded-3xl border border-slate-100/90 bg-white/98 backdrop-blur-xl p-7 shadow-[0_28px_70px_rgba(15,23,42,0.18)] ring-1 ring-black/[0.04] transition-all">
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr_1fr_1fr_320px] panel-content-stagger">
        {/* Residential */}
        <div>
          <ColumnHeading icon={Home}>Residential</ColumnHeading>
          <div className="mt-4 space-y-3">
            {RESIDENTIAL_LINKS.map((item) => (
              <MenuLink key={item.label} item={item} onClose={onClose} />
            ))}
          </div>

          <div className="mt-6 border-t border-slate-100 pt-4">
            <ColumnHeading icon={BarChart3}>By BHK</ColumnHeading>
            <div className="mt-4 space-y-3">
              {BHK_LINKS.map((item) => (
                <MenuLink key={item.label} item={item} onClose={onClose} />
              ))}
            </div>
          </div>

          <Link
            href="/residential"
            onClick={onClose}
            className="group mt-5 inline-flex items-center gap-1.5 text-[13px] font-bold text-[#a98440] transition-all duration-200 hover:text-[#977232] hover:translate-x-1"
          >
            <span>View all Residential</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Commercial */}
        <div>
          <ColumnHeading icon={Building2}>Commercial</ColumnHeading>
          <div className="mt-4 space-y-2.5">
            {COMMERCIAL_LINKS.map((item) => (
              <MenuLink key={item.label} item={item} onClose={onClose} />
            ))}
          </div>

          <div className="mt-6 border-t border-slate-100 pt-4">
            <ColumnHeading icon={Briefcase}>By Use</ColumnHeading>
            <div className="mt-4 space-y-2.5">
              {COMMERCIAL_USE_LINKS.map((item) => (
                <MenuLink key={item.label} item={item} onClose={onClose} />
              ))}
            </div>
          </div>

          <Link
            href="/commercial"
            onClick={onClose}
            className="group mt-5 inline-flex items-center gap-1.5 text-[13px] font-bold text-[#a98440] transition-all duration-200 hover:text-[#977232] hover:translate-x-1"
          >
            <span>View all Commercial</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Investment */}
        <div>
          <ColumnHeading icon={TrendingUp}>Investment</ColumnHeading>
          <div className="mt-4 space-y-2.5">
            {INVESTMENT_LINKS.map((item) => (
              <MenuLink key={item.label} item={item} onClose={onClose} />
            ))}
          </div>

          <div className="mt-6 border-t border-slate-100 pt-4">
            <ColumnHeading icon={Calculator}>Investment Tools</ColumnHeading>
            <div className="mt-4 space-y-2.5">
              {INVESTMENT_TOOLS.map((item) => (
                <MenuLink key={item.label} item={item} onClose={onClose} />
              ))}
            </div>
          </div>

          <Link
            href="/investment"
            onClick={onClose}
            className="group mt-5 inline-flex items-center gap-1.5 text-[13px] font-bold text-[#a98440] transition-all duration-200 hover:text-[#977232] hover:translate-x-1"
          >
            <span>Explore Investment</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Top Locations */}
        <div>
          <ColumnHeading icon={MapPin}>Top Locations</ColumnHeading>
          <div className="mt-4 space-y-2.5">
            {LOCATION_LINKS.map((item) => (
              <MenuLink key={item.label} item={item} onClose={onClose} />
            ))}
          </div>

          <Link
            href="/residential"
            onClick={onClose}
            className="group mt-4 inline-flex items-center gap-1.5 text-[13px] font-bold text-[#a98440] transition-all duration-200 hover:text-[#977232] hover:translate-x-1"
          >
            <span>View all Locations</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>

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
              className="mt-3 inline-flex items-center gap-1.5 rounded-xl border border-[#a98440] px-3.5 py-2 text-[12px] font-bold text-[#a98440] transition-all duration-200 hover:bg-[#a98440] hover:text-white hover:scale-105 active:scale-95 shadow-xs"
            >
              <FileEdit className="h-3.5 w-3.5" />
              <span>Post Requirement</span>
            </Link>
          </div>
        </div>

        {/* Featured Opportunity card */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#fbf7ee] to-white p-4.5 ring-1 ring-[#e2d1b3]/70 shadow-sm transition-all duration-300 hover:shadow-xl hover:ring-[#a98440]/60 hover:-translate-y-1">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-bold text-[#a98440] transition-transform duration-200 group-hover:scale-105">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Featured Opportunity</span>
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
              <p className="text-sm font-bold text-amber-500 flex items-center justify-center gap-1">
                <Star className="h-3 w-3 fill-amber-400" />
                <span>9.6/10</span>
              </p>
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
            className="mt-3 flex items-center justify-center gap-1.5 rounded-xl bg-[#a98440] hover:bg-[#977232] py-2.5 text-center text-[13px] font-bold text-white shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            <span>View Project Details</span>
            <ArrowRight className="h-3.5 w-3.5" />
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
