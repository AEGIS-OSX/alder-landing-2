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
    transition: { duration: 0.6, ease: [0.0, 0.0, 0.2, 1] as number[] },
  },
};

const itemVariantsReduced = {
  hidden: { opacity: 0, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.01 },
  },
};

export default function Hero() {
  const prefersReduced = useReducedMotion();
  const activeItemVariants = prefersReduced ? itemVariantsReduced : itemVariants;

  return (
    <section
      id="hero"
      className="bg-[var(--color-bg)] overflow-hidden pt-[var(--space-hero-top)] pb-[var(--space-hero-bottom)]"
    >
      <motion.div
        className="grid grid-cols-1 md:grid-cols-[55fr_45fr] items-center ml-auto mr-0"
        style={{ maxWidth: "calc(var(--max-width) + 45vw)" }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="order-last md:order-none px-[var(--space-md)] md:pl-[var(--space-xl)] md:pr-[var(--space-xxl)]"
        >
          <motion.h1
            variants={activeItemVariants}
            className="font-[family-name:var(--font-display)] text-[length:var(--text-display-mobile)] leading-[var(--text-display-lh-mobile)] md:text-[length:var(--text-display)] md:leading-[var(--text-display-lh)] font-semibold tracking-[-0.03em] text-[var(--color-text)] mb-[var(--space-lg)] [overflow-wrap:anywhere] min-w-0"
          >
            Leather goods, made slowly.
          </motion.h1>
          <motion.p
            variants={activeItemVariants}
            className="font-[family-name:var(--font-body)] text-[length:var(--text-body-mobile)] leading-[var(--text-body-lh-mobile)] md:text-[length:var(--text-body)] md:leading-[var(--text-body-lh)] font-light text-[var(--color-text-muted)] max-w-[42ch] mb-[var(--space-xl)]"
          >
            Small-batch bags and carry goods, cut and stitched by hand in a one-room studio. First release coming soon.
          </motion.p>
          <motion.div variants={activeItemVariants}>
            <a
              href="#waitlist"
              className="btn-primary"
            >
              Join the Waitlist
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative h-full min-h-[30rem] order-first md:order-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: prefersReduced ? 0 : 0.8,
            delay: prefersReduced ? 0 : 0.2,
            ease: [0.0, 0.0, 0.2, 1],
          }}
        >
          <ProjectImage
            id="hero"
            className="w-full h-full object-cover object-center block"
            fetchpriority="high"
            alt="A saddle-tan leather tote on a warm oat background, showing hand-stitched detail"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
