"use client";

import { site } from "@/lib/site";

const ACCENT = "#0645AD";

export function ContactView() {
  return (
    <div className="absolute inset-0 grid place-items-center bg-white">
      <ul className="flex flex-col items-center gap-5">
        {site.social.map((s, i) => (
          <li
            key={s.label}
            className="animate-rise-in"
            style={{ animationDelay: `${50 * i}ms` }}
          >
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 14, color: ACCENT, lineHeight: 1 }}
              className="block px-1 lowercase focus-visible:outline-none focus-visible:underline"
            >
              {s.label.toLowerCase()}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
