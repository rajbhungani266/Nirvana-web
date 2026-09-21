"use client";

import Link from "next/link";
import {
  Trees,
  Ruler,
  Boxes,
  MapPin,
  FileEdit,
  Sparkles,
  ArrowRight,
  FileCheck,
  Tag,
  Users,
  Lock,
  PhoneCall,
} from "lucide-react";

// Query params match PlotWeekendVillaProperty's filterset_fields exactly
// (see backcode views.py).
export const PLOT_TYPE_LINKS = [
  { label: "Plot", href: "/plot-weekend-villa?property_type=plot" },
  { label: "Weekend Villa", href: "/plot-weekend-villa?property_type=weekend_villa" },
  { label: "Farm House", href: "/plot-weekend-villa?property_type=farm_house" },
];

export const PLOT_SIZE_LINKS = [
  { label: "Under 1000 Sq.Yd", href: "/plot-weekend-villa?plot_area__lte=1000" },
  { label: "1000 - 2000 Sq.Yd", href: "/plot-weekend-villa?plot_area__gte=1000&plot_area__lte=2000" },
  { label: "2000 - 5000 Sq.Yd", href: "/plot-weekend-villa?plot_area__gte=2000&plot_area__lte=5000" },
  { label: "Above 5000 Sq.Yd", href: "/plot-weekend-villa?plot_area__gte=5000" },
];

export const PLOT_FEATURE_LINKS = [
  { label: "Boundary Wall", href: "/plot-weekend-villa?boundary_wall=true" },
  { label: "Water Connection", href: "/plot-weekend-villa?water_connection=true" },
  { label: "Electricity", href: "/plot-weekend-villa?electricity=true" },
  { label: "Construction Allowed", href: "/plot-weekend-villa?construction_allowed=true" },
];

export const PLOTS_LOCATION_LINKS = [
  { label: "Shela", href: "/plot-weekend-villa?area__iexact=Shela" },
  { label: "Bavla", href: "/plot-weekend-villa?area__iexact=Bavla" },
  { label: "Sanand", href: "/plot-weekend-villa?area__iexact=Sanand" },
  { label: "Kalol", href: "/plot-weekend-villa?area__iexact=Kalol" },
  { label: "Dholera", href: "/plot-weekend-villa?area__iexact=Dholera" },
  { label: "SG Highway", href: "/plot-weekend-villa?area__iexact=SG Highway" },
];

const TRUST_ITEMS = [
  { icon: FileCheck, title: "Clear Title Verified", note: "100% Legal Due Diligence" },
  { icon: Tag, title: "Zero Brokerage", note: "Direct from Owners" },
  { icon: Users, title: "Expert Guidance", note: "From Land Specialists" },
  { icon: Lock, title: "Secure & Transparent", note: "Trusted by 10,000+ Customers" },
  { icon: PhoneCall, title: "Quick Assistance", note: "Call us: 1800 41 99099" },
];

function ColumnHeading({ icon: Icon, children }) {
  return (
    <div className="group flex items-center gap-2 text-[15px] font-bold text-slate-900 cursor-default">
      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-50 text-[#a98440] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
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
      <span className="transition-colors duration-200 group-hover:font-medium">
        {item.label}
      </span>
      <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 text-[#a98440] transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
    </Link>
  );
}

export default function PlotsMegaMenu({ onClose = () => {} }) {
  return (
    <div className="rounded-3xl border border-slate-100/90 bg-white/98 backdrop-blur-xl p-7 shadow-[0_28px_70px_rgba(15,23,42,0.18)] ring-1 ring-black/[0.04] transition-all">
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr_1fr_1fr_320px] panel-content-stagger">
        {/* Property Type */}
        <div>
          <ColumnHeading icon={Trees}>Property Type</ColumnHeading>
          <div className="mt-4 space-y-2.5">
            {PLOT_TYPE_LINKS.map((item) => (
              <MenuLink key={item.label} item={item} onClose={onClose} />
            ))}
          </div>

          <Link
            href="/plot-weekend-villa"
            onClick={onClose}
            className="group mt-6 inline-flex items-center gap-1.5 text-[13px] font-bold text-[#a98440] transition-all duration-200 hover:text-[#977232] hover:translate-x-1"
          >
            <span>View all Plots</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Plot Size */}
        <div>
          <ColumnHeading icon={Ruler}>Plot Size</ColumnHeading>
          <div className="mt-4 space-y-2.5">
            {PLOT_SIZE_LINKS.map((item) => (
              <MenuLink key={item.label} item={item} onClose={onClose} />
            ))}
          </div>
        </div>

        {/* Features */}
        <div>
          <ColumnHeading icon={Boxes}>Features</ColumnHeading>
          <div className="mt-4 space-y-2.5">
            {PLOT_FEATURE_LINKS.map((item) => (
              <MenuLink key={item.label} item={item} onClose={onClose} />
            ))}
          </div>
        </div>

        {/* Top Locations */}
        <div>
          <ColumnHeading icon={MapPin}>Top Locations</ColumnHeading>
          <div className="mt-4 space-y-2.5">
            {PLOTS_LOCATION_LINKS.map((item) => (
              <MenuLink key={item.label} item={item} onClose={onClose} />
            ))}
          </div>

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
              <FileEdit className="h-3.5 w-3.5" />
              <span>Post Requirement</span>
            </Link>
          </div>
        </div>

        {/* Featured card */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#fbf7ee] to-white p-4.5 ring-1 ring-[#e2d1b3]/70 shadow-sm transition-all duration-300 hover:shadow-xl hover:ring-[#a98440]/60 hover:-translate-y-1">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-bold text-[#a98440] transition-transform duration-200 group-hover:scale-105">
            <Sparkles className="h-3.5 w-3.5 text-[#a98440]" />
            <span>Featured Plot</span>
          </span>

          <h4 className="mt-3 text-lg font-bold text-slate-900 group-hover:text-[#a98440] transition-colors">
            Premium Farm House Plot
          </h4>
          <p className="text-[12px] text-slate-500">Shela, Ahmedabad</p>

          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-[#a98440]">
              Clear Title
            </span>
            <span className="rounded-md bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-600">
              Boundary Wall
            </span>
            <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-600">
              Water & Electricity
            </span>
          </div>

          <div className="mt-3 overflow-hidden rounded-xl">
            <img
              src="/images/ninth.png"
              alt="Premium Farm House Plot"
              className="h-32 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            />
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 text-center">
            <div>
              <p className="text-sm font-bold text-[#a98440]">2,400 Sq.Yd</p>
              <p className="text-[10px] text-slate-500">Plot Size</p>
            </div>
            <div>
              <p className="text-sm font-bold text-green-600">Ready</p>
              <p className="text-[10px] text-slate-500">Construction</p>
            </div>
          </div>

          <div className="mt-3 border-t border-slate-100 pt-3">
            <p className="text-[11px] text-slate-500">Starts from</p>
            <p className="text-lg font-bold text-[#a98440]">₹65.00 Lac.</p>
          </div>

          <Link
            href="/plot-weekend-villa"
            onClick={onClose}
            className="mt-3 flex items-center justify-center gap-1.5 rounded-xl bg-[#a98440] hover:bg-[#977232] py-2.5 text-center text-[13px] font-bold text-white shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            <span>View Project Details</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Trust bar */}
      <div className="mt-6 grid gap-3 border-t border-slate-100 pt-5 sm:grid-cols-3 lg:grid-cols-5">
        {TRUST_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="group flex items-center gap-3 rounded-xl p-2 -m-1 transition-all duration-200 hover:bg-slate-50 hover:scale-[1.03] cursor-pointer"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-[#a98440] transition-transform duration-200 group-hover:scale-110">
                <Icon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[12px] font-bold text-slate-900 group-hover:text-[#a98440] transition-colors">
                  {item.title}
                </p>
                <p className="text-[11px] text-slate-500">{item.note}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
