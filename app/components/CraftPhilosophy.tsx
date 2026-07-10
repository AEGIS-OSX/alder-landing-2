"use client";
import { motion, useReducedMotion } from "framer-motion";

export default function CraftPhilosophy() {
  const prefersReduced = useReducedMotion();

  const motionProps = prefersReduced
    ? {}
    : {
        initial: { opacity: 0, y: 32 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.6, ease: "easeOut" },
      };

  return (
    <motion.section
      aria-labelledby="philosophy-heading"
      className="w-full bg-[var(--color-surface)] py-[96px]"
      {...motionProps}
    >
      <div
        className="alder-container"
        style={{ maxWidth: "640px" }}
      >
        <p
          className="font-[family-name:var(--font-body)] text-[13px] leading-[20px] font-normal tracking-[0.06em] uppercase text-[var(--color-text-muted)] mb-[24px]"
        >
          The studio.
        </p>

        <h2
          id="philosophy-heading"
          className="font-[family-name:var(--font-display)] text-[26px] leading-[32px] md:text-[36px] md:leading-[42px] tracking-[-0.01em] font-normal text-[var(--color-text)] mb-[32px]"
        >
          The studio journal.
        </h2>

        <span className="accent-rule mb-[32px]" aria-hidden="true" />

        <p
          className="font-[family-name:var(--font-body)] text-[16px] leading-[26px] md:text-[17px] md:leading-[28px] font-light text-[var(--color-text)] max-w-[60ch] mt-[32px]"
        >
          We do not believe in seasons or scale. We believe in the weight of a full-grain hide and the permanence of a hand-set stitch. Every piece is a study in patience, built to outlast the person who made it.
        </p>
      </div>
    </motion.section>
  );
}
