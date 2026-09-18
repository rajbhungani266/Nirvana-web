"use client";

import { useState } from "react";
import { getImageUrl } from "@/lib/format";

export default function PropertyGallery({ mainImage, title }) {
  const defaultImages = [
    getImageUrl(mainImage),
    "/images/fourth.png",
    "/images/fifth.png",
    "/images/six.png",
    "/images/seven.png",
  ];

  const [activeImage, setActiveImage] = useState(defaultImages[0]);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div className="space-y-3">
      {/* Featured Big Image */}
      <div className="relative h-[340px] sm:h-[460px] w-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 group">
        <img
          src={activeImage}
          alt={title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent opacity-60" />

        <button
          onClick={() => setLightboxOpen(true)}
          className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-slate-950/80 backdrop-blur-md px-4 py-2 text-xs font-semibold text-white shadow-lg transition hover:bg-slate-900 cursor-pointer"
        >
          <span>🔍</span>
          <span>View All Photos ({defaultImages.length})</span>
        </button>

        <span className="absolute top-4 left-4 rounded-full bg-emerald-600/90 backdrop-blur-md px-3.5 py-1 text-xs font-bold text-white shadow-md">
          ✓ Verified Photos
        </span>
      </div>

      {/* Thumbnails Row */}
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {defaultImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImage(img)}
            className={`relative h-18 sm:h-24 overflow-hidden rounded-2xl border-2 transition cursor-pointer ${
              activeImage === img
                ? "border-[#a98440] ring-2 ring-[#a98440]/20 scale-102"
                : "border-slate-200 opacity-75 hover:opacity-100"
            }`}
          >
            <img src={img} alt={`${title} preview ${idx + 1}`} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-lg">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 text-lg cursor-pointer"
          >
            ✕
          </button>
          <div className="max-h-[85vh] max-w-4xl overflow-hidden rounded-3xl">
            <img src={activeImage} alt={title} className="max-h-[80vh] w-auto rounded-3xl object-contain shadow-2xl" />
          </div>
        </div>
      )}
    </div>
  );
}
