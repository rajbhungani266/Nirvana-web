"use client";

import { Suspense, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { fetchProperties } from "@/lib/api";
import ProjectCard from "./ProjectCard";
import BookSiteVisitForm from "./BookSiteVisitForm";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/*
  Listing page matching screenshot 2:
  - sticky-feeling filter bar (New Projects / Owner toggle + dropdowns)
  - grid of ProjectCard
  - sidebar form (defaults to site-visit booking; pass `sidebarForm` to swap
    in a category-tailored enquiry form, e.g. InvestmentEnquiryForm) + advisor
    + expert cards

  Filters map to the backend's filterset_fields (see backcode views.py) —
  the property-type field name and choices differ per category, so both are
  looked up from FILTER_CONFIG by the `category` prop.
*/

const FILTER_CONFIG = {
  residential: {
    typeField: "property_type",
    typeOptions: [
      { value: "flat", label: "Flat" },
      { value: "bungalow", label: "Bungalow" },
      { value: "villa", label: "Villa" },
      { value: "tenament", label: "Tenament" },
    ],
    showBhk: true,
  },
  commercial: {
    typeField: "commercial_type",
    typeOptions: [
      { value: "office", label: "Office" },
      { value: "showroom", label: "Showroom" },
      { value: "shop", label: "Shop" },
      { value: "warehouse", label: "Warehouse" },
      { value: "factory", label: "Factory" },
    ],
    showBhk: false,
  },
  "plot-weekend-villa": {
    typeField: "property_type",
    typeOptions: [
      { value: "plot", label: "Plot" },
      { value: "weekend_villa", label: "Weekend Villa" },
      { value: "farm_house", label: "Farm House" },
    ],
    showBhk: false,
  },
  investment: {
    typeField: "investment_type",
    typeOptions: [
      { value: "preleased", label: "Preleased" },
      { value: "rental_income", label: "Rental Income" },
      { value: "high_return", label: "High Return" },
      { value: "future_growth", label: "Future Growth" },
    ],
    showBhk: false,
  },
  "gift-city": {
    typeField: "gift_property_type",
    typeOptions: [
      { value: "office", label: "Office" },
      { value: "residential", label: "Residential" },
      { value: "investment", label: "Investment" },
      { value: "commercial", label: "Commercial" },
    ],
    showBhk: false,
  },
};

const BUDGET_OPTIONS = [
  { value: "", label: "Budget" },
  { value: "under-50l", label: "Under ₹50 Lac" },
  { value: "50l-1cr", label: "₹50 Lac - ₹1 Cr" },
  { value: "above-1cr", label: "Above ₹1 Cr" },
];

function budgetToRange(value) {
  switch (value) {
    case "under-50l":
      return { lte: 5000000 };
    case "50l-1cr":
      return { gte: 5000000, lte: 10000000 };
    case "above-1cr":
      return { gte: 10000000 };
    default:
      return {};
  }
}

const SORT_OPTIONS = [
  { value: "", label: "Sort by: Relevance" },
  { value: "price", label: "Price: Low to High" },
  { value: "-price", label: "Price: High to Low" },
  { value: "-created_at", label: "Newest First" },
];

/**
 * @param {{
 *   title?: string,
 *   endpoint: string,
 *   category: string,
 *   defaultQuery?: string,
 *   sidebarForm?: import("react").ReactNode,
 * }} props
 */
export default function ProjectListingPage(props) {
  // useSearchParams() requires a Suspense boundary during static generation —
  // isolated here so every page using this component gets it for free.
  return (
    <Suspense fallback={<ListingPageFallback title={props.title} />}>
      <ProjectListingPageInner {...props} />
    </Suspense>
  );
}

function ListingPageFallback({ title }) {
  return (
    <main className="min-h-screen bg-[#f7f9fc]">
      <section className="bg-soft-blue pb-8 pt-24">
        <Navbar />
        <div className="container-box pt-12">
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">{title}</h1>
          <div className="mt-8 rounded-2xl bg-white p-8 text-center text-slate-500">
            Loading...
          </div>
        </div>
      </section>
    </main>
  );
}

function ProjectListingPageInner({
  title = "Sindhubhavan Road, Ahmedabad",
  endpoint,
  category,
  defaultQuery = "",
  sidebarForm = null,
}) {
  const config = FILTER_CONFIG[category] ?? FILTER_CONFIG.residential;

  // Links from the mega-menus / hero search land here with query params
  // already set (e.g. ?property_type=flat&bedrooms=2). Dropdowns that have
  // a matching preset are seeded from these on mount; anything else (like a
  // raw price__gte from a Budget link) is carried through untouched via
  // extraParams below, so a link's filter still applies even without a
  // matching dropdown to display it in.
  const urlParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const OWNED_KEYS = ["search", "city", "bedrooms", config.typeField, "price__gte", "price__lte", "ordering"];

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("new"); // "new" | "owner"
  const [showAdvisorPhone, setShowAdvisorPhone] = useState(false);

  const [search, setSearch] = useState(urlParams.get("search") ?? "");
  const [city, setCity] = useState(urlParams.get("city") ?? "");
  const [bhk, setBhk] = useState(urlParams.get("bedrooms") ?? "");
  const [budget, setBudget] = useState("");
  const [propertyType, setPropertyType] = useState(urlParams.get(config.typeField) ?? "");
  const [sortBy, setSortBy] = useState(urlParams.get("ordering") ?? "");

  const [priceRangeFromUrl] = useState({
    gte: urlParams.get("price__gte") ?? "",
    lte: urlParams.get("price__lte") ?? "",
  });
  const [extraParams] = useState(() => {
    const extras = {};
    for (const [key, value] of urlParams.entries()) {
      if (!OWNED_KEYS.includes(key)) extras[key] = value;
    }
    return extras;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  function buildQueryString() {
    const params = new URLSearchParams(defaultQuery.replace(/^\?/, ""));

    Object.entries(extraParams).forEach(([key, value]) => params.set(key, value));

    if (search) params.set("search", search);
    if (city) params.set("city", city);
    if (bhk) params.set("bedrooms", bhk);
    if (propertyType) params.set(config.typeField, propertyType);

    const range = budgetToRange(budget);
    const gte = range.gte ?? priceRangeFromUrl.gte;
    const lte = range.lte ?? priceRangeFromUrl.lte;
    if (gte) params.set("price__gte", String(gte));
    if (lte) params.set("price__lte", String(lte));

    if (sortBy) params.set("ordering", sortBy);

    params.set("listing_type", tab === "owner" ? "owner" : "builder");

    const qs = params.toString();
    return qs ? `?${qs}` : "";
  }

  async function loadProperties() {
    const qs = buildQueryString();

    // Keep the URL in sync with the applied filters so a refresh, back-button,
    // or shared link reloads with the same search instead of resetting it.
    router.replace(`${pathname}${qs}`, { scroll: false });

    try {
      setLoading(true);
      const data = await fetchProperties(`${endpoint}${qs}`);
      setProperties(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Showing empty listing.", error);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  }

  // Fires on mount, and again whenever Sort or the New/Owner tab change —
  // both should apply immediately without needing a separate Search click.
  useEffect(() => {
    let isMounted = true;
    const qs = buildQueryString();
    router.replace(`${pathname}${qs}`, { scroll: false });

    async function executeLoad() {
      try {
        const data = await fetchProperties(`${endpoint}${qs}`);
        if (isMounted) {
          setProperties(Array.isArray(data) ? data : []);
          setLoading(false);
        }
      } catch (error) {
        console.log("Showing empty listing.", error);
        if (isMounted) {
          setProperties([]);
          setLoading(false);
        }
      }
    }

    executeLoad();
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, tab]);

  function handleSearch(event) {
    event.preventDefault();
    loadProperties();
  }

  const count = properties.length;

  return (
    <main className="min-h-screen bg-[#f7f9fc]">
      <section className="bg-soft-blue pb-8 pt-24">
        <Navbar />

        <div className="container-box pt-12">
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
            {title}{" "}
            <span className="text-base font-medium text-slate-500">
              ({count} Projects)
            </span>
          </h1>

          {/* New Projects / Owner Properties toggle */}
          <div className="mt-6 flex w-fit rounded-full bg-white p-1 shadow-sm">
            <button
              onClick={() => setTab("new")}
              className={
                tab === "new"
                  ? "rounded-full bg-[#a98440] px-5 py-2 text-sm font-semibold text-white shadow-xs"
                  : "rounded-full px-5 py-2 text-sm font-medium text-slate-600"
              }
            >
              New Projects
            </button>
            <button
              onClick={() => setTab("owner")}
              className={
                tab === "owner"
                  ? "rounded-full bg-[#a98440] px-5 py-2 text-sm font-semibold text-white shadow-xs"
                  : "rounded-full px-5 py-2 text-sm font-medium text-slate-600"
              }
            >
              Owner Properties
            </button>
          </div>

          {/* Filter bar */}
          <form
            onSubmit={handleSearch}
            className="mt-4 flex flex-wrap items-center gap-2 rounded-2xl bg-white p-3 shadow-sm"
          >
            <select
              value={city}
              onChange={(event) => setCity(event.target.value)}
              className="input-clean w-auto min-w-[130px] flex-1"
            >
              <option value="">All Cities</option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Gandhinagar">GIFT City</option>
              <option value="Dholera">Dholera</option>
            </select>

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="input-clean min-w-[180px] flex-[2]"
              placeholder="Search Location, Builder..."
            />

            {config.showBhk && (
              <select
                value={bhk}
                onChange={(event) => setBhk(event.target.value)}
                className="input-clean w-auto min-w-[90px]"
              >
                <option value="">BHK</option>
                <option value="1">1 BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4">4+ BHK</option>
              </select>
            )}

            <select
              value={budget}
              onChange={(event) => setBudget(event.target.value)}
              className="input-clean w-auto min-w-[100px]"
            >
              {BUDGET_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              value={propertyType}
              onChange={(event) => setPropertyType(event.target.value)}
              className="input-clean w-auto min-w-[130px]"
            >
              <option value="">Property Type</option>
              {config.typeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <button className="rounded-xl bg-[#a98440] hover:bg-[#977232] px-6 py-3 text-sm font-bold text-white shadow-xs transition active:scale-95 cursor-pointer">
              Search
            </button>
          </form>
        </div>
      </section>

      <section className="container-box grid gap-6 py-8 lg:grid-cols-[1fr_320px]">
        {/* Listings */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Showing {count} {tab === "new" ? "new projects" : "owner properties"}
            </p>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="input-clean w-auto text-sm"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {loading && (
            <div className="rounded-2xl bg-white p-8 text-center text-slate-500">
              Loading properties...
            </div>
          )}

          {!loading && count === 0 && (
            <div className="rounded-2xl bg-white p-8 text-center text-slate-500">
              No properties found. Try adjusting your filters.
            </div>
          )}

          {!loading &&
            properties.map((property) => (
              <ProjectCard
                key={property.id}
                property={property}
                category={category}
              />
            ))}
        </div>

        {/* Sidebar */}
        <aside className="space-y-5 lg:sticky lg:top-6 lg:h-fit">
          {sidebarForm ?? <BookSiteVisitForm category={category} />}

          {/* Advisor */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#a98440] font-bold text-white shadow-xs">
                RP
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Raj Patel</p>
                <p className="text-[12px] text-slate-500">
                  Senior Property Advisor
                </p>
              </div>
              {showAdvisorPhone ? (
                <a
                  href="tel:+919574491891"
                  className="ml-auto rounded-lg bg-green-500 px-3 py-2 text-[12px] font-semibold text-white"
                >
                  📞 +91 95744 91891
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowAdvisorPhone(true)}
                  className="ml-auto rounded-lg bg-green-500 px-3 py-2 text-[12px] font-semibold text-white"
                >
                  📞 Call
                </button>
              )}
            </div>
          </div>

          {/* Need Expert Advice */}
          <div className="rounded-2xl bg-[#fbf7ee] p-5 ring-1 ring-[#e2d1b3]/60">
            <p className="text-sm font-bold text-slate-900">
              Need Expert Advice?
            </p>
            <p className="mt-1 text-[12px] text-slate-500">
              Our property advisors will help you find the best investment.
            </p>
            <button className="mt-3 w-full rounded-xl bg-[#111827] py-2.5 text-[13px] font-semibold text-white hover:bg-slate-800 transition active:scale-95 cursor-pointer">
              💬 Talk to an Advisor
            </button>
          </div>
        </aside>
      </section>

      <Footer />
    </main>
  );
}
