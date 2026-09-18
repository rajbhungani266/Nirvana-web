import Navbar from "@/components/layout/Navbar";
import HeroSearch from "@/components/home/HeroSearch";
import SlidingImageStrip from "@/components/home/SlidingImageStrip";
import HomeFeaturedProjects from "@/components/home/HomeFeaturedProjects";
import RecommendedProjects from "@/components/home/RecommendedProjects";
import HomeSections from "@/components/home/HomeSections";
import Footer from "@/components/layout/Footer";
import BrowsePropertyTypes from "@/components/home/BrowsePropertyTypes";
import LandingFeatureSections from "@/components/home/LandingFeatureSections";
import RequestPropertyAssistance from "@/components/home/RequestPropertyAssistance";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSearch />

      {/* Live Continuous Property Stream - Sliding Left to Right */}
      <SlidingImageStrip />

      {/* Featured opportunities - Luxury developments */}
      <HomeFeaturedProjects />

      {/* Tailored Discovery - 3 Category Cards */}
      <HomeSections />

      {/* Recommended projects (from Figma) */}
      <RecommendedProjects />

      {/* High Impact Conversion CTA Section */}
      <section className="relative overflow-hidden bg-slate-950 py-24 text-center text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{
            backgroundImage: "url('/images/tenth.png')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(169,132,64,0.3),transparent_70%)]" />

        {/* Content */}
        <div className="container-box relative z-10">
          <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#e2b764] backdrop-blur-md">
            Direct Owner & Buyer Desk
          </span>

          <h2 className="heading-display mx-auto mt-5 max-w-3xl text-3xl font-extrabold leading-tight text-white md:text-5xl">
            Whether you&apos;re searching for the right home or planning to list, our team is with you.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
            Join over 1,200 satisfied property owners, developers, and NRI investors making secure, transparent real estate decisions in Ahmedabad.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link
              href="/post-property"
              className="rounded-xl bg-[#a98440] hover:bg-[#977232] px-8 py-3.5 text-sm font-bold text-white shadow-lg transition active:scale-95"
            >
              Post Your Property Free
            </Link>

            <Link
              href="/residential"
              className="rounded-xl border border-slate-300 bg-white px-8 py-3.5 text-sm font-bold text-slate-950 shadow-md transition hover:bg-slate-100 active:scale-95"
            >
              Browse All Properties
            </Link>
          </div>
        </div>
      </section>

      {/* Browse Property Types */}
      <BrowsePropertyTypes />

      {/* Feature & Social Proof Sections */}
      <LandingFeatureSections />

      {/* Request Property Assistance & Sell Property */}
      <RequestPropertyAssistance />

      <Footer />
    </main>
  );
}