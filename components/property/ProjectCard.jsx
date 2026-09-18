"use client";

import { useState } from "react";
import Link from "next/link";
import { formatPrice, getImageUrl, getTypeLabel } from "@/lib/format";
import EnquireModal from "./EnquireModal";

/*
  Project card for the listing page (screenshot 2 layout):
  image on the left with badges, details on the right with ROI / rental-yield /
  possession stats, builder row, and the two CTAs matching Image 1 & 2.
*/
export default function ProjectCard({ property, category }) {
  const [showEnquiry, setShowEnquiry] = useState(false);

  return (
    <article className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md md:grid-cols-[300px_1fr]">
      <div className="relative h-56 md:h-auto">
        <img
          src={getImageUrl(property.main_image)}
          alt={property.title}
          className="h-full w-full object-cover"
        />

        <span className="absolute left-3 top-3 rounded-md bg-white/95 px-2.5 py-1 text-[11px] font-bold text-[#a98440] shadow-xs">
          RERA Verified
        </span>

        <span className="absolute bottom-3 right-3 rounded-md bg-black/70 px-2.5 py-1 text-[11px] font-semibold text-white">
          4+
        </span>
      </div>

      <div className="flex flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {property.title || "Project name"}
            </h3>
            <p className="mt-1 text-[13px] text-slate-500">
              {getTypeLabel(property)}
            </p>
            <p className="mt-1 text-[13px] text-slate-500">
              📍 {property.area}, {property.city}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xl font-bold text-slate-900">
              {formatPrice(property.price)}
            </p>
            <p className="text-[11px] text-slate-500">
              ₹{property.price_per_sqft || "6,950"}/sq.ft.
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 border-y border-slate-100 py-4 text-[13px] sm:grid-cols-3">
          <div>
            <p className="font-bold text-green-600">
              {property.roi_potential || "16%"}*
            </p>
            <p className="text-[11px] text-slate-500">ROI Potential</p>
          </div>
          <div>
            <p className="font-bold text-[#a98440]">
              {property.rental_yield || "5.8%"}*
            </p>
            <p className="text-[11px] text-slate-500">Rental Yield</p>
          </div>
          <div>
            <p className="font-bold text-slate-900">
              {property.possession || "April 2029"}
            </p>
            <p className="text-[11px] text-slate-500">Possession</p>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-md bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600">
            🏷️ Zero Brokerage
          </span>
          <span className="rounded-md bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600">
            🛡️ RERA Verified
          </span>
          <span className="rounded-md bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600">
            ✨ Exclusive Residential
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <div>
            <p className="text-[11px] text-slate-500">Builder</p>
            <p className="text-[13px] font-bold text-slate-900">
              {property.builder || "Sahjanand Group"}
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              href={`/property/${category}/${property.slug}`}
              className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-[13px] font-bold text-slate-900 transition hover:bg-slate-50 shadow-xs"
            >
              Brochure
            </Link>
            <button
              type="button"
              onClick={() => setShowEnquiry(true)}
              className="rounded-xl bg-[#a98440] hover:bg-[#977232] px-5 py-2.5 text-[13px] font-bold text-white shadow-xs transition active:scale-95 cursor-pointer"
            >
              Enquire Now
            </button>
          </div>
        </div>
      </div>

      {showEnquiry && (
        <EnquireModal
          property={property}
          category={category}
          onClose={() => setShowEnquiry(false)}
        />
      )}
    </article>
  );
}
