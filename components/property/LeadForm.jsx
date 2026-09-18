"use client";

import { useState } from "react";
import { submitLead } from "@/lib/api";

export default function LeadForm({ propertyCategory = "", propertyId = null }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setStatus("Submitting...");

      await submitLead({
        property_category: propertyCategory,
        property_id: propertyId,
        ...form,
      });

      setStatus("Your enquiry has been submitted successfully.");
      setForm({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch (error) {
      setStatus("Something went wrong. Please try again.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border bg-white p-5 shadow-sm"
    >
      <div className="rounded-xl bg-[#a98440] p-4 text-white">
        <h3 className="font-bold">Schedule Your Free Site Visit</h3>
        <p className="mt-1 text-xs text-white/80">
          Share your details and our advisor will connect with you.
        </p>
      </div>

      <div className="mt-5 space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="input-clean"
          placeholder="Name"
          required
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="input-clean"
          placeholder="Mobile number"
          required
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="input-clean"
          placeholder="Email Address"
        />

        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          className="input-clean min-h-24"
          placeholder="Message"
        />

        <button className="w-full rounded-xl bg-[#a98440] hover:bg-[#977232] py-3 text-sm font-bold text-white shadow-xs transition active:scale-95 cursor-pointer">
          Submit
        </button>

        {status && <p className="text-sm text-slate-600">{status}</p>}
      </div>
    </form>
  );
}