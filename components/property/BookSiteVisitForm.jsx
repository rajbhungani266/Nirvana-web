"use client";

import { useState } from "react";
import { submitLead } from "@/lib/api";

/*
  Default sidebar form used by ProjectListingPage (Residential, Commercial,
  Plots). Investment and Gift City use their own tailored enquiry forms
  instead — see InvestmentEnquiryForm / GiftCityEnquiryForm.
*/
export default function BookSiteVisitForm({ category }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [status, setStatus] = useState("");

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setStatus("Submitting...");
      await submitLead({
        property_category: category?.replace("-", "_") || "",
        ...form,
      });
      setStatus("Booked! Our advisor will call you shortly.");
      setForm({ name: "", phone: "", email: "" });
    } catch (error) {
      setStatus("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-base font-bold text-slate-900">
        Book Your Free Property Visit
      </h3>
      <p className="mt-1 text-[12px] text-slate-500">
        Meet a certified advisor at your preferred time.
      </p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="input-clean"
          placeholder="Full Name"
          required
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="input-clean"
          placeholder="Mobile Number"
          required
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="input-clean"
          placeholder="Email (Optional)"
        />

        <button className="w-full rounded-xl bg-[#a98440] hover:bg-[#977232] py-3 text-sm font-bold text-white shadow-xs transition active:scale-95 cursor-pointer">
          📅 Book Site Visit
        </button>

        {status && <p className="text-[12px] text-slate-600">{status}</p>}
        <p className="text-center text-[11px] text-slate-400">
          🔒 Your information is secure.
        </p>
      </form>
    </div>
  );
}
