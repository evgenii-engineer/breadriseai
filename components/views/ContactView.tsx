"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/site";

const ACCENT = "#0645AD";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
});

export function ContactView() {
  return (
    <div className="absolute inset-0 grid place-items-center bg-white">
      <ul className="flex flex-col items-center gap-5">
        {site.social.map((s, i) => (
          <motion.li key={s.label} {...fade(0.05 * i)}>
            <a
              href={s.href}
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: 14, color: ACCENT, lineHeight: 1 }}
              className="block px-1 lowercase"
            >
              {s.label.toLowerCase()}
            </a>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
