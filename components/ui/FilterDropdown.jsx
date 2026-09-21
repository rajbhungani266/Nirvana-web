"use client";

import React from "react";

export default function FilterDropdown({ value, onChange, options, defaultLabel }) {
  return (
    <div className="relative flex h-9 shrink-0 items-center rounded-full border border-slate-200/90 bg-white shadow-xs hover:border-slate-300 transition-colors">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-full appearance-none bg-transparent pl-3 pr-6 text-xs font-normal text-slate-700 outline-none cursor-pointer"
      >
        {defaultLabel && <option value="">{defaultLabel}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}
