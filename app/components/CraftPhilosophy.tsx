"use client";

import { motion } from "framer-motion";

export default function CraftPhilosophy() {
  return (
    <motion.section
      id="philosophy"
      className="bg-[var(--color-bg)] py-[var(--space-section)]"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.0, 0.0, 0.2, 1] }}
    >
      <div className="section-inner">
        <hr className="hairline mb-[var(--space-xxl)]" />
        <div className="philosophy-content max-w-[65ch]">
          <h2
            className="font-[family-name:var(--font-display)] text-[var(--color-text)] font-normal tracking-[-0.01em] mb-[var(--space-lg)]"
            style={{
              fontSize: "var(--text-h2)",
              lineHeight: "var(--text-h2-lh)",
            }}
          >
            The studio journal.
          </h2>
          <p
            className="font-[family-name:var(--font-body)] text-[var(--color-text-muted)] font-light"
            style={{
              fontSize: "var(--text-body)",
              lineHeight: "var(--text-body-lh)",
            }}
          >
            We do not believe in seasons or scale. We believe in the weight of a full-grain hide and the permanence of a hand-set stitch. Every piece is a study in patience, built to outlast the person who made it.
          </p>
        </div>
      </div>
    </motion.section>
  );
}
