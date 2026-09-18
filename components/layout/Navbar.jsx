"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BuyMegaMenu from "./BuyMegaMenu";
import SellMegaMenu from "./SellMegaMenu";
import RentMegaMenu from "./RentMegaMenu";
import InvestmentMegaMenu from "./InvestmentMegaMenu";
import PlotsMegaMenu from "./PlotsMegaMenu";
import GiftCityMegaMenu from "./GiftCityMegaMenu";
import VastuCalculatorModal from "../tools/VastuCalculatorModal";
import AISearchModal from "../tools/AISearchModal";
import MobileBottomNav from "./MobileBottomNav";

// Matches Image 1: Buy, Sell, Rent, Investment, Plots, Gift City (Logo acts as Home)
const TOP_NAV_LINKS = [
  { label: "Buy", href: "/residential" },
  { label: "Sell", href: "/post-property" },
  { label: "Rent", href: "/rent" },
  { label: "Investment", href: "/investment" },
  { label: "Plots", href: "/plot-weekend-villa" },
  { label: "Gift City", href: "/gift-city" },
];

const MEGA_MENUS = {
  Buy: BuyMegaMenu,
  Sell: SellMegaMenu,
  Rent: RentMegaMenu,
  Investment: InvestmentMegaMenu,
  Plots: PlotsMegaMenu,
  "Gift City": GiftCityMegaMenu,
};

export default function Navbar() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVastuOpen, setIsVastuOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const navRef = useRef(null);

  const closeMenu = () => setOpenMenu(null);
  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setOpenMenu(null);
  }

  // Handle scroll effect: transforms from white state (Image 1) to dark glassmorphic state on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close on outside click + Escape key
  useEffect(() => {
    if (!openMenu) return;

    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        closeMenu();
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") closeMenu();
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [openMenu]);

  const ActiveMegaMenu = openMenu ? MEGA_MENUS[openMenu] : null;

  // Render navigation item based on current scroll state
  function renderNavItem(link, { compact = false } = {}) {
    // If any menu is open, ONLY the currently opened menu is active.
    // When no menu is open, default active is "Buy" on homepage "/" or the matching route.
    const isDefaultActive =
      (pathname === "/" && link.label === "Buy") ||
      (pathname !== "/" && pathname.startsWith(link.href));

    const isCurrentActive = openMenu ? openMenu === link.label : isDefaultActive;
    const isMegaMenu = Boolean(MEGA_MENUS[link.label]);
    const isOpen = openMenu === link.label;

    let activeClass = "";

    if (!isScrolled) {
      // Top State: Gold pill for active, clean slate text for others
      if (isCurrentActive) {
        activeClass = compact
          ? "rounded-full bg-[#a98440] px-4 py-1.5 font-semibold text-white shadow-sm"
          : "rounded-full bg-[#a98440] px-6 py-2 font-semibold text-white shadow-sm";
      } else {
        activeClass = compact
          ? "rounded-full bg-slate-100 border border-slate-200 px-3.5 py-1.5 font-medium text-slate-800 hover:bg-slate-200 transition"
          : "px-4 py-2 font-medium text-slate-700 hover:text-slate-950 transition";
      }
    } else {
      // Scrolled State: White pill for active, white text for others
      if (isCurrentActive) {
        activeClass = compact
          ? "rounded-full bg-white px-4 py-1.5 font-semibold text-slate-900 shadow-sm"
          : "rounded-full bg-white px-5 py-2 font-semibold text-slate-900 shadow-sm";
      } else {
        activeClass = compact
          ? "rounded-full bg-white/15 px-4 py-1.5 text-white font-medium hover:bg-white/25 transition"
          : "px-5 py-2 text-white/90 hover:text-white font-medium transition";
      }
    }

    // Mega menu trigger
    if (isMegaMenu) {
      return (
        <button
          key={link.href}
          type="button"
          onClick={() =>
            setOpenMenu((current) => (current === link.label ? null : link.label))
          }
          aria-expanded={isOpen}
          className={`${activeClass} flex shrink-0 items-center whitespace-nowrap text-sm cursor-pointer outline-none focus:outline-none focus:ring-0`}
        >
          {link.label}
        </button>
      );
    }

    return (
      <Link
        key={link.href}
        href={link.href}
        className={`${activeClass} shrink-0 whitespace-nowrap text-sm`}
      >
        {link.label}
      </Link>
    );
  }

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ease-in-out ${
          isScrolled
            ? "glass-nav-scrolled py-2 shadow-xl"
            : "bg-white border-b border-slate-200/80 py-3 shadow-sm"
        }`}
        ref={navRef}
      >
        {/* Full-width container: Logo on far left, links in center, buttons on far right */}
        <div className="flex h-[72px] sm:h-[82px] w-full items-center justify-between px-6 sm:px-10 lg:px-14">
          {/* 1. Left: Official Brand Logo */}
          <div className="flex items-center shrink-0">
            <Link href="/" className="flex items-center group py-1">
              <img
                src={isScrolled ? "/images/logo-dark.png" : "/images/logo-transparent.png"}
                alt="Nirvana Space - Built on Trust. Driven by Loyalty."
                className="h-14 sm:h-16 md:h-[68px] lg:h-[74px] w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
              />
            </Link>
          </div>

          {/* 2. Center: Desktop Navigation Links */}
          <nav
            className={`hidden items-center text-sm transition-all duration-300 lg:flex ${
              isScrolled ? "rounded-full p-1 text-white glass-nav gap-1" : "gap-3"
            }`}
          >
            {TOP_NAV_LINKS.map((link) => renderNavItem(link))}
          </nav>

          {/* 3. Right: Action Buttons (No emojis, matching Image 1) */}
          <div className="hidden items-center gap-3 sm:flex shrink-0">
            {/* Vastu Calculator Button */}
            <button
              onClick={() => setIsVastuOpen(true)}
              className={`transition-all duration-300 cursor-pointer ${
                isScrolled
                  ? "pill-btn px-5 py-2 text-xs font-semibold text-slate-800 hover:text-[#a98440]"
                  : "rounded-full bg-[#0d1520] px-6 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-slate-900 active:scale-95"
              }`}
            >
              Vastu Calculator
            </button>

            {/* AI Search Button */}
            <button
              onClick={() => setIsAIOpen(true)}
              className={`transition-all duration-300 cursor-pointer ${
                isScrolled
                  ? "rounded-full bg-[#a98440] hover:bg-[#977232] px-5 py-2 text-xs font-bold text-white shadow-md active:scale-95"
                  : "rounded-full bg-[#a98440] hover:bg-[#977232] px-6 py-2.5 text-xs font-semibold text-white shadow-sm active:scale-95"
              }`}
            >
              AI Search
            </button>
          </div>
        </div>

        {/* Mobile Category Scrollable Pills */}
        <div className="overflow-x-auto px-[4%] pt-2 pb-1 scrollbar-hide lg:hidden">
          <div className="flex w-max gap-1.5">
            {TOP_NAV_LINKS.map((link) => renderNavItem(link, { compact: true }))}
          </div>
        </div>

        {/* Mega-menu Dimmed Backdrop Overlay */}
        {ActiveMegaMenu && (
          <div
            className="fixed inset-0 top-[72px] sm:top-[82px] z-40 bg-slate-950/20 backdrop-blur-[2px] animate-mega-backdrop cursor-pointer"
            onClick={closeMenu}
          />
        )}

        {/* Mega-menu Floating Animated Panel */}
        {ActiveMegaMenu && (
          <div
            key={openMenu}
            className="panel-drop-animation absolute left-0 top-full z-50 w-full px-[4%] pt-2.5 pointer-events-auto"
          >
            <div className="mx-auto max-w-[1240px]">
              <ActiveMegaMenu onClose={closeMenu} />
            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        onOpenAISearch={() => setIsAIOpen(true)}
        onOpenVastu={() => setIsVastuOpen(true)}
      />

      {/* Interactive Modals */}
      <VastuCalculatorModal
        isOpen={isVastuOpen}
        onClose={() => setIsVastuOpen(false)}
      />
      <AISearchModal
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
      />
    </>
  );
}
