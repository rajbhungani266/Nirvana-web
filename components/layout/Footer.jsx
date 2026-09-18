import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#090d16] pb-24 pt-16 text-white md:pb-16 border-t border-white/10">
      <div className="container-box">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block group">
              <img
                src="/images/logo-dark.png"
                alt="Nirvana Space - Built on Trust. Driven by Loyalty."
                className="h-18 sm:h-22 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow"
              />
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              Nirvana Space is Ahmedabad&apos;s premier real estate advisory platform, bridging discerning homebuyers, NRI investors, and high-growth commercial developments with total transparency.
            </p>

            <div className="mt-6 space-y-2 text-xs text-white/70">
              <p className="flex items-center gap-2">
                <span>📞</span>
                <span>Advisory Desk: +91 79844 30082</span>
              </p>
              <p className="flex items-center gap-2">
                <span>✉</span>
                <span>feedback@nirvanaspace.com</span>
              </p>
              <p className="flex items-center gap-2">
                <span>📍</span>
                <span>Sindhubhavan Road & Iscon Ambli Road, Ahmedabad</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#e6c278]">
              Navigation
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/65">
              <li>
                <Link href="/" className="hover:text-white transition">Home</Link>
              </li>
              <li>
                <Link href="/residential" className="hover:text-white transition">Residential Properties</Link>
              </li>
              <li>
                <Link href="/commercial" className="hover:text-white transition">Commercial Spaces</Link>
              </li>
              <li>
                <Link href="/investment" className="hover:text-white transition">High-Yield Investment</Link>
              </li>
              <li>
                <Link href="/gift-city" className="hover:text-white transition">GIFT City SEZ Hub</Link>
              </li>
              <li>
                <Link href="/plot-weekend-villa" className="hover:text-white transition">Plots & Weekend Villas</Link>
              </li>
            </ul>
          </div>

          {/* Popular Search Localities */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#e6c278]">
              Top Localities
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/65">
              <li>
                <Link href="/residential?search=Shela" className="hover:text-white transition">Shela & South Bopal</Link>
              </li>
              <li>
                <Link href="/residential?search=Iscon+Ambli" className="hover:text-white transition">Iscon Ambli Road</Link>
              </li>
              <li>
                <Link href="/commercial?search=Sindhubhavan" className="hover:text-white transition">Sindhu Bhavan Road</Link>
              </li>
              <li>
                <Link href="/gift-city" className="hover:text-white transition">GIFT City IFSC</Link>
              </li>
              <li>
                <Link href="/residential?search=Science+City" className="hover:text-white transition">Science City & Sola</Link>
              </li>
              <li>
                <Link href="/residential?search=Bodakdev" className="hover:text-white transition">Bodakdev & Judges</Link>
              </li>
            </ul>
          </div>

          {/* Services & Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#e6c278]">
              Services & Tools
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/65">
              <li>
                <Link href="/post-property" className="hover:text-white transition">List Your Property</Link>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition">Vastu Consultation</span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition">NRI Real Estate Desk</span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition">Home Loan & EMI Advisory</span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition">Legal Title Verification</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 md:flex-row">
          <p>© {new Date().getFullYear()} Nirvana Space (NS). All rights reserved. RERA Certified Advisory Partner.</p>
          <div className="flex gap-6">
            <span className="hover:text-white transition cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition cursor-pointer">Terms of Service</span>
            <span className="hover:text-white transition cursor-pointer">RERA Disclaimer</span>
            <span className="hover:text-white transition cursor-pointer">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
}