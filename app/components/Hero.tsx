"use client";
import { motion, useReducedMotion } from "framer-motion";
import { ProjectImage } from "@/app/components/ProjectImage";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const textColProps = prefersReducedMotion
    ? {}
    : { variants: containerVariants, initial: "hidden", animate: "visible" };

  const itemProps = prefersReducedMotion ? {} : { variants: itemVariants };

  const imageMotionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.6, delay: 0.2, ease: "easeOut" },
      };

  return (
    <section
      aria-label="Hero"
      className="w-full bg-[var(--color-bg)] pt-[128px] pb-[160px]"
    >
      <div className="alder-container">
        <div className="grid grid-cols-1 md:grid-cols-[58fr_42fr] gap-[48px] items-center">
          {/* Left column: text */}
          <motion.div className="flex flex-col" {...textColProps}>
            {/* Eyebrow */}
            <motion.p
              className="font-[family-name:var(--font-body)] text-[13px] font-normal tracking-[0.06em] uppercase text-[var(--color-text-muted)] mb-[16px]"
              {...itemProps}
            >
              New studio. First release.
            </motion.p>

            {/* H1 */}
            <motion.h1
              className="font-[family-name:var(--font-display)] text-[40px] leading-[46px] md:text-[64px] md:leading-[68px] tracking-[-0.03em] font-semibold text-[var(--color-text)] [overflow-wrap:anywhere] min-w-0"
              {...itemProps}
            >
              Leather goods, made slowly.
            </motion.h1>

            {/* Subhead */}
            <motion.p
              className="font-[family-name:var(--font-body)] text-[17px] leading-[28px] font-light text-[var(--color-text-muted)] max-w-[480px] mt-[24px]"
              {...itemProps}
            >
              Small-batch bags and carry goods, cut and stitched by hand in a
              one-room studio. First release coming soon.
            </motion.p>

            {/* CTA */}
            <motion.div className="mt-[32px]" {...itemProps}>
              <a
                href="#waitlist"
                className="inline-flex items-center bg-[var(--color-accent)] text-[var(--color-text)] font-[family-name:var(--font-body)] text-[13px] font-normal tracking-[0.06em] uppercase px-[24px] h-[40px] rounded-none whitespace-nowrap transition-colors duration-200 hover:bg-[var(--color-accent-hover)] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-2"
              >
                Join the Waitlist
              </a>
            </motion.div>
          </motion.div>

          {/* Right column: image */}
          <motion.div
            className="w-full aspect-[3/2] md:aspect-[4/5] overflow-hidden"
            {...imageMotionProps}
          >
            <ProjectImage
              id="hero"
              className="w-full h-full object-cover"
              alt="A saddle-tan leather tote on a warm oat background, hand-stitched details visible in soft side-lighting."
              fetchpriority="high"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
