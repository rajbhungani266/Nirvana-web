"use client";

import { useState } from "react";

export default function RequestPropertyAssistance() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    propertyType: "Apartment",
    budget: "₹ 1 Cr - ₹ 2 Cr",
    location: "Shela / Ambli Road",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Quick callback state
  const [callbackPhone, setCallbackPhone] = useState("");
  const [callbackDone, setCallbackDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleCallback = (e) => {
    e.preventDefault();
    if (!callbackPhone) return;
    setCallbackDone(true);
    setTimeout(() => {
      setCallbackPhone("");
    }, 4000);
  };

  return (
    <>
      {/* 1. Sell Property With Confidence Banner */}
      <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(11,118,209,0.18),transparent_50%)]" />
        <div className="container-box relative z-10">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.28em] text-[#3ba2f8]">
                Owner & Developer Services
              </span>
              <h2 className="heading-display mt-4 text-4xl font-extrabold leading-tight tracking-[-0.03em] text-white sm:text-5xl">
                Sell or Monetize Your Property
                <br />
                With Absolute Confidence
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300">
                Receive certified market valuations, curated high-net-worth investor exposure, and end-to-end legal title coordination across Ahmedabad.
              </p>

              {callbackDone ? (
                <div className="mt-8 inline-block rounded-2xl bg-emerald-500/20 border border-emerald-400/30 px-6 py-3 text-sm font-semibold text-emerald-300">
                  ✓ Callback request received! Our valuation manager will connect within 30 minutes.
                </div>
              ) : (
                <form onSubmit={handleCallback} className="mt-8 flex flex-col gap-3 sm:flex-row max-w-md">
                  <input
                    type="tel"
                    placeholder="Enter phone for free appraisal"
                    value={callbackPhone}
                    onChange={(e) => setCallbackPhone(e.target.value)}
                    required
                    className="flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm text-white placeholder-white/50 outline-none backdrop-blur-md focus:border-[#a98440]"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-[#a98440] hover:bg-[#977232] px-7 py-3 text-sm font-bold text-white shadow-md transition active:scale-95 cursor-pointer"
                  >
                    Request Callback
                  </button>
                </form>
              )}
            </div>

            <div className="overflow-hidden rounded-[32px] border border-white/10 shadow-[0_30px_80px_rgba(15,23,42,0.4)] group">
              <img
                src="/images/ninth.png"
                alt="Luxury Architecture Presentation"
                className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Structured Lead Assistance Form */}
      <section className="bg-white py-24">
        <div className="container-box">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] items-center">
            <div className="overflow-hidden rounded-[32px] border border-slate-200 shadow-xl group">
              <img
                src="/images/first.jpg"
                alt="Personalized Property Shortlist"
                className="h-[560px] w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white p-8 sm:p-12 shadow-xl">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#a98440]">
                Bespoke Advisory
              </span>
              <h3 className="heading-display mt-3 text-3xl font-extrabold tracking-[-0.02em] text-slate-950 sm:text-4xl">
                Request Property Assistance
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Share your target parameters. Our Ahmedabad realty desk will filter verified on-market & off-market listings for you.
              </p>

              {isSubmitted ? (
                <div className="mt-8 rounded-2xl bg-emerald-50 border border-emerald-200 p-6 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-600 mb-3">
                    ✓
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">Request Confirmed!</h4>
                  <p className="mt-2 text-sm text-slate-600">
                    Thank you, {formData.name}. We have matched 12 verified projects in {formData.location}. An advisor will share the shortlist via WhatsApp at {formData.phone}.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-5 text-xs font-bold text-[#a98440] underline"
                  >
                    Submit another requirement
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-700">
                      Full Name *
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        className="input-clean"
                      />
                    </label>
                    <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-700">
                      WhatsApp Mobile Number *
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="10-digit number"
                        className="input-clean"
                      />
                    </label>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-700">
                      Email Address
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="nirav@example.com"
                        className="input-clean"
                      />
                    </label>
                    <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-700">
                      Property Category
                      <select
                        value={formData.propertyType}
                        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                        className="input-clean bg-white"
                      >
                        <option value="Apartment">Luxury Apartment (2-4 BHK)</option>
                        <option value="Villa">Independent Bungalow / Villa</option>
                        <option value="Commercial">Commercial Office / Showroom</option>
                        <option value="Land">Residential Plot / Weekend Farmland</option>
                        <option value="Gift City">GIFT City Pre-Leased SEZ</option>
                      </select>
                    </label>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-700">
                      Budget Range
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="input-clean bg-white"
                      >
                        <option value="Under ₹ 75 L">Under ₹ 75 Lac</option>
                        <option value="₹ 75 L - ₹ 1.5 Cr">₹ 75 Lac - ₹ 1.5 Cr</option>
                        <option value="₹ 1.5 Cr - ₹ 3 Cr">₹ 1.5 Cr - ₹ 3 Cr</option>
                        <option value="₹ 3 Cr - ₹ 6 Cr">₹ 3 Cr - ₹ 6 Cr</option>
                        <option value="₹ 6 Cr+">₹ 6 Cr+ (Ultra Luxury)</option>
                      </select>
                    </label>
                    <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-700">
                      Preferred Locality
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. Shela, Ambli, Sindhubhavan, Bodakdev"
                        className="input-clean"
                      />
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-4 h-13 rounded-xl bg-[#a98440] hover:bg-[#977232] px-8 text-sm font-bold text-white shadow-md transition active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? "Matching Properties..." : "Get Tailored Property Shortlist"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
