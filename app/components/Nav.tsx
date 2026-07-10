"use client";
import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ProjectImage } from "@/app/components/ProjectImage";

export default function Nav() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const motionProps = prefersReduced
    ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
      };

  return (
    <motion.header
      role="banner"
      {...motionProps}
      className={[
        "fixed top-0 left-0 right-0 z-50",
        "transition-[background-color,border-color] duration-300",
        scrolled
          ? "bg-[var(--color-bg)] border-b border-[var(--color-border)]"
          : "bg-transparent border-b border-transparent",
      ].join(" ")}
      style={{
        transitionTimingFunction: "var(--ease-out)",
      }}
    >
      <nav
        aria-label="Main navigation"
        className="alder-container flex flex-row items-center justify-between"
        style={{ height: "56px" }}
      >
        {/* LEFT: Logo / Wordmark */}
        <a
          href="/"
          aria-label="Alder home"
          className="flex items-center focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-2"
        >
          <ProjectImage
            id="logo"
            className="h-8 w-auto"
            alt="Alder"
            fallback={
              <span
                className="text-[var(--color-text)] font-[family-name:var(--font-display)] uppercase tracking-[0.08em]"
                style={{ fontSize: "18px", fontWeight: 600 }}
              >
                ALDER
              </span>
            }
          />
        </a>

        {/* RIGHT: CTA */}
        <a
          href="#waitlist"
          className={[
            "inline-flex items-center justify-center whitespace-nowrap",
            "bg-[var(--color-accent)] text-[var(--color-text)]",
            "font-[family-name:var(--font-body)] uppercase tracking-[0.06em]",
            "px-6 h-10 min-h-[44px] sm:min-h-[40px]",
            "rounded-none",
            "hover:bg-[var(--color-accent-hover)]",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-2",
            "active:opacity-85",
            "transition-colors duration-200",
          ].join(" ")}
          style={{ fontSize: "13px", fontWeight: 400 }}
        >
          Join the Waitlist
        </a>
      </nav>
    </motion.header>
  );
}
