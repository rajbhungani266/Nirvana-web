"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Sparkles, Navigation, PlusCircle } from "lucide-react";

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
          <Home className="h-5 w-5" strokeWidth={isHome ? 2.5 : 1.8} />
          <span>Home</span>
        </Link>

        <Link
          href="/residential"
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            isBrowse ? "font-bold text-[#a98440]" : "hover:text-slate-900"
          }`}
        >
          <Compass className="h-5 w-5" strokeWidth={isBrowse ? 2.5 : 1.8} />
          <span>Explore</span>
        </Link>

        {/* AI Search Pill Button */}
        <button
          onClick={onOpenAISearch}
          className="flex flex-col items-center justify-center gap-1 -mt-4 transition-transform active:scale-95 cursor-pointer"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-[#a98440] to-[#c79c52] text-white shadow-lg shadow-[#a98440]/30 transition-transform hover:scale-105">
            <Sparkles className="h-5 w-5 animate-pulse" />
          </div>
          <span className="text-[10px] font-bold text-[#a98440]">AI Search</span>
        </button>

        {/* Vastu Calculator */}
        <button
          onClick={onOpenVastu}
          className="flex flex-col items-center justify-center gap-1 hover:text-slate-900 transition-colors cursor-pointer text-slate-500"
        >
          <Navigation className="h-5 w-5" strokeWidth={1.8} />
          <span>Vastu</span>
        </button>

        <Link
          href="/post-property"
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            isPost ? "font-bold text-[#a98440]" : "hover:text-slate-900"
          }`}
        >
          <PlusCircle className="h-5 w-5" strokeWidth={isPost ? 2.5 : 1.8} />
          <span>Post</span>
        </Link>
      </div>
    </aside>
  );
}
