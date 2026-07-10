"use client";
import { motion } from "framer-motion";
import { ProjectImage } from "@/app/components/ProjectImage";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.0, 0.0, 0.2, 1],
    },
  }),
};

export default function FounderStory() {
  return (
    <section
      id="founder"
      aria-labelledby="founder-heading"
      className="bg-[var(--color-surface)] py-[var(--space-section)]"
    >
      <div className="mx-auto w-full max-w-[var(--layout-max-width)] px-[var(--space-xl)]">
        {/* Hairline rule */}
        <div
          className="mb-[var(--space-xxl)] h-px w-full bg-[var(--color-border)]"
          role="presentation"
        />

        {/* Two-column grid: 55fr text / 45fr image on desktop; single column on mobile */}
        <div className="grid grid-cols-1 gap-[var(--space-xxl)] md:grid-cols-[55fr_45fr] md:gap-[var(--space-huge)]">
          {/* IMAGE COLUMN — above text on mobile, right on desktop */}
          <motion.div
            className="order-first md:order-last"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            custom={0.1}
          >
            <ProjectImage
              id="founder"
              alt="James Alderton in his studio, working at a cutting table"
              className="h-full w-full rounded-[var(--card-radius)] object-cover"
              style={{ aspectRatio: "4/5" }}
            />
          </motion.div>

          {/* TEXT COLUMN */}
          <motion.div
            className="order-last flex flex-col justify-center md:order-first"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            custom={0}
          >
            {/* Spec label */}
            <p
              className="mb-[var(--space-lg)] font-[family-name:var(--font-body)] text-[length:var(--text-spec)] font-normal uppercase tracking-[0.06em] text-[var(--color-text-muted)]"
            >
              The maker
            </p>

            {/* h2 */}
            <h2
              id="founder-heading"
              className="mb-[var(--space-lg)] font-[family-name:var(--font-display)] text-[length:var(--text-h2-mobile)] font-normal leading-[var(--text-h2-lh-mobile)] tracking-[-0.01em] text-[var(--color-text)] md:text-[length:var(--text-h2)] md:leading-[var(--text-h2-lh)]"
            >
              Ten years of getting it wrong.
            </h2>

            {/* Pull quote */}
            <blockquote
              className="my-[var(--space-xl)] border-l-[3px] border-[var(--color-accent)] pl-[var(--space-lg)] font-[family-name:var(--font-display)] text-[length:var(--text-h3)] italic leading-[var(--text-h3-lh)] text-[var(--color-text)]"
            >
              I spent a decade making things I was not proud of. Then I stopped trying to make them faster.
            </blockquote>

            {/* Body paragraph */}
            <p
              className="max-w-[55ch] font-[family-name:var(--font-body)] text-[length:var(--text-body)] font-light leading-[var(--text-body-lh)] text-[var(--color-text-muted)]"
            >
              My name is James. I learned to stitch in a saddlery in Córdoba, spent three years making mistakes on other people’s leather, and came home to build something slower. Alder is one person, one room, and a waiting list.
            </p>

            {/* Attribution */}
            <p
              className="mt-[var(--space-xl)] font-[family-name:var(--font-body)] text-[length:var(--text-spec)] font-normal uppercase tracking-[0.06em] text-[var(--color-text-muted)]"
            >
              — James Alderton, maker
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
