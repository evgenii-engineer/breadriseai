"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

const EASE = "expo.out";

/**
 * Splits text into words wrapped in an inner span, without dependencies.
 * Returns the inner spans for animation.
 */
export function splitWords(el: HTMLElement): HTMLElement[] {
  if (el.dataset.split === "true") {
    return Array.from(el.querySelectorAll<HTMLElement>("[data-split-word]"));
  }
  const text = el.textContent ?? "";
  el.textContent = "";
  const fragment = document.createDocumentFragment();
  const spans: HTMLElement[] = [];
  text.split(/(\s+)/).forEach((token) => {
    if (/^\s+$/.test(token)) {
      fragment.appendChild(document.createTextNode(token));
      return;
    }
    if (!token) return;
    const wrap = document.createElement("span");
    wrap.className = "inline-block overflow-hidden align-baseline";
    const inner = document.createElement("span");
    inner.className = "inline-block will-change-transform";
    inner.dataset.splitWord = "true";
    inner.textContent = token;
    wrap.appendChild(inner);
    fragment.appendChild(wrap);
    spans.push(inner);
  });
  el.appendChild(fragment);
  el.dataset.split = "true";
  return spans;
}

export function useRevealText(
  ref: RefObject<HTMLElement | null>,
  opts: { delay?: number; stagger?: number; once?: boolean } = {},
) {
  const { delay = 0, stagger = 0.05, once = true } = opts;
  useEffect(() => {
    if (!ref.current) return;
    registerGsap();
    if (prefersReducedMotion()) {
      gsap.set(ref.current, { autoAlpha: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      const el = ref.current!;
      const words = splitWords(el);
      gsap.set(words, { yPercent: 110 });
      gsap.set(el, { autoAlpha: 1 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once,
        onEnter: () => {
          gsap.to(words, {
            yPercent: 0,
            duration: 1.1,
            ease: EASE,
            stagger,
            delay,
          });
        },
      });
    }, ref);
    return () => ctx.revert();
  }, [ref, delay, stagger, once]);
}

/**
 * Vertical parallax on an element as it travels through the viewport.
 */
export function useParallax(
  ref: RefObject<HTMLElement | null>,
  amount = 80,
) {
  useEffect(() => {
    if (!ref.current) return;
    registerGsap();
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current!,
        { y: -amount },
        {
          y: amount,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current!,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, [ref, amount]);
}

/**
 * Plays a stagger reveal on direct children of the ref.
 */
export function useStaggerChildren(
  ref: RefObject<HTMLElement | null>,
  opts: { y?: number; stagger?: number; duration?: number } = {},
) {
  const { y = 28, stagger = 0.08, duration = 1.0 } = opts;
  useEffect(() => {
    if (!ref.current) return;
    registerGsap();
    if (prefersReducedMotion()) {
      gsap.set(ref.current.children, { autoAlpha: 1, y: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      const children = ref.current!.children;
      gsap.set(children, { autoAlpha: 0, y });
      ScrollTrigger.create({
        trigger: ref.current!,
        start: "top 85%",
        once: true,
        onEnter: () =>
          gsap.to(children, {
            autoAlpha: 1,
            y: 0,
            duration,
            ease: EASE,
            stagger,
          }),
      });
    }, ref);
    return () => ctx.revert();
  }, [ref, y, stagger, duration]);
}

/**
 * Magnetic hover effect — element drifts toward cursor with damping.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let raf = 0;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      target.x = (e.clientX - cx) * strength;
      target.y = (e.clientY - cy) * strength;
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
    };
    const tick = () => {
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;
      el.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [strength]);
  return ref;
}
