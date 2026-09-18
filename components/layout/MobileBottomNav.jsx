"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileBottomNav({ onOpenAISearch, onOpenVastu }) {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isBrowse = pathname === "/residential" || pathname === "/commercial" || pathname === "/gift-city";
  const isPost = pathname === "/post-property";

  return (
    <aside aria-label="Mobile Navigation Bar" className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200/80 bg-white/95 backdrop-blur-md md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div className="grid h-16 grid-cols-5 items-center px-2 text-[11px] font-medium text-slate-500">
        <Link
          href="/"
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            isHome ? "font-bold text-[#a98440]" : "hover:text-slate-900"
          }`}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isHome ? 2.5 : 2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Home</span>
        </Link>

        <Link
          href="/residential"
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            isBrowse ? "font-bold text-[#a98440]" : "hover:text-slate-900"
          }`}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isBrowse ? 2.5 : 2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <span>Explore</span>
        </Link>

        {/* AI Search Pill Button */}
        <button
          onClick={onOpenAISearch}
          className="flex flex-col items-center justify-center gap-1 -mt-4 transition-transform active:scale-95 cursor-pointer"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#a98440] text-white shadow-lg shadow-[#a98440]/30">
            <span className="text-xl">✨</span>
          </div>
          <span className="text-[10px] font-bold text-[#a98440]">AI Search</span>
        </button>

        {/* Vastu Calculator */}
        <button
          onClick={onOpenVastu}
          className="flex flex-col items-center justify-center gap-1 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <svg className="h-5 w-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <polygon points="12,6 14,12 12,18 10,12" fill="currentColor" opacity="0.4" />
          </svg>
          <span>Vastu</span>
        </button>

        <Link
          href="/post-property"
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            isPost ? "font-bold text-[#a98440]" : "hover:text-slate-900"
          }`}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isPost ? 2.5 : 2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Post</span>
        </Link>
      </div>
    </aside>
  );
}
