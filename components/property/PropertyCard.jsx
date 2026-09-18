"use client";

import { useState } from "react";
import Link from "next/link";
import { formatPrice, getImageUrl, getTypeLabel } from "@/lib/format";
import EnquireModal from "./EnquireModal";

export default function PropertyCard({ property, category, variant = "list" }) {
  const [showEnquiry, setShowEnquiry] = useState(false);

  if (variant === "compact") {
    return (
      <Link
        href={`/property/${category}/${property.slug}`}
        className="block rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition"
      >
        <img
          src={getImageUrl(property.main_image)}
          alt={property.title}
          className="h-40 w-full rounded-xl object-cover"
        />
        <h3 className="mt-3 font-bold text-slate-900">{property.title}</h3>
        <p className="mt-1 text-sm text-slate-500">
          {property.area}, {property.city}
        </p>
        <p className="mt-2 font-bold text-[#a98440]">
          {formatPrice(property.price)}
        </p>
      </Link>
    );
  }

  return (
    <article className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:grid-cols-[360px_1fr]">
      <div className="relative h-[300px] md:h-auto">
        <img
          src={getImageUrl(property.main_image)}
          alt={property.title}
          className="h-full w-full object-cover"
        />

        <span className="absolute left-4 top-4 rounded-lg bg-white/95 px-3 py-1.5 text-xs font-bold text-[#a98440] shadow-xs">
          NEW LAUNCH
        </span>

        <span className="absolute bottom-4 left-4 rounded-md bg-black/70 px-3 py-1.5 text-xs font-semibold text-white">
          18 Photos
        </span>
      </div>

      <div className="p-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row">
          <div>
            <h3 className="text-2xl font-bold text-slate-900">
              {property.title}
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              📍 {property.area}, {property.city}
            </p>
          </div>

          <div className="text-left md:text-right">
            <p className="text-xs text-slate-500">Starts from</p>
            <p className="text-xl font-bold text-slate-900">
              {formatPrice(property.price)}
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 border-b border-slate-100 pb-5 text-sm text-slate-700 md:grid-cols-4">
          <div>
            <p className="font-bold text-[#a98440]">🏢 {getTypeLabel(property)}</p>
            <p className="text-xs text-slate-500">Property Type</p>
          </div>

          <div>
            <p className="font-bold text-[#a98440]">
              📐 {property.area_sqft || "-"} Sq.Ft
            </p>
            <p className="text-xs text-slate-500">Area</p>
          </div>

          <div>
            <p className="font-bold text-[#a98440]">
              🛏 {property.bedrooms || "-"}
            </p>
            <p className="text-xs text-slate-500">Bedrooms</p>
          </div>

          <div>
            <p className="font-bold text-[#a98440]">
              🛁 {property.bathrooms || "-"}
            </p>
            <p className="text-xs text-slate-500">Bathrooms</p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs text-slate-500">Builder</p>
            <p className="text-sm font-bold">Nirvana Space</p>
          </div>

          <div className="flex gap-3">
            <Link
              href={`/property/${category}/${property.slug}`}
              className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-900 transition hover:bg-slate-50 shadow-xs"
            >
              View Details
            </Link>

            <button
              type="button"
              onClick={() => setShowEnquiry(true)}
              className="rounded-xl bg-[#a98440] hover:bg-[#977232] px-5 py-2.5 text-sm font-bold text-white shadow-xs transition active:scale-95 cursor-pointer"
            >
              Book Site Visit
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