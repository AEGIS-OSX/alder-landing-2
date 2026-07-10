"use client";
import { motion } from "framer-motion";
import { ProjectImage } from "@/app/components/ProjectImage";

type Step = {
  numeral: string;
  label: string;
  body: string;
  imageId: "feature_1" | "feature_2" | "social_proof" | "feature_3";
  imageAlt: string;
};

const steps: Step[] = [
  {
    numeral: "01",
    label: "Selection",
    body: `We source full-grain vegetable-tanned hides from a single tannery in León. Each hide is inspected by hand for grain consistency and temper.`,
    imageId: "feature_1",
    imageAlt: "Close-up of full-grain vegetable-tanned leather hide showing natural grain texture and temper",
  },
  {
    numeral: "02",
    label: "Pattern",
    body: `Every pattern is drafted on paper first, then cut from card stock. No digital files. The template lives on the wall of the studio.`,
    imageId: "feature_2",
    imageAlt: "Hand-drafted leather pattern on card stock pinned to the studio wall",
  },
  {
    numeral: "03",
    label: "Cutting",
    body: `A single-bevel knife, a steel rule, and a cutting mat. Each piece is cut individually — no dies, no presses.`,
    imageId: "social_proof",
    imageAlt: "Craftsman cutting leather with a single-bevel knife against a steel rule on a cutting mat",
  },
  {
    numeral: "04",
    label: "Stitching",
    body: `Saddle-stitched by hand with waxed linen thread. Two needles, one hole at a time. A machine stitch breaks at one point; a hand stitch holds even when a thread snaps.`,
    imageId: "feature_3",
    imageAlt: "Close-up of saddle-stitching by hand with waxed linen thread through leather",
  },
];

const rowVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.0, 0.0, 0.2, 1] as number[],
    },
  },
};

export default function MakingProcess() {
  return (
    <section
      id="process"
      aria-label="Making process"
      className="bg-[var(--color-surface)] py-[var(--space-section)]"
    >
      <div className="mx-auto w-full max-w-[var(--layout-max-width)] px-[var(--space-xl)]">
        {/* Hairline rule */}
        <div
          className="border-t border-[var(--color-border)] mb-[var(--space-xxl)]"
          role="presentation"
        />

        {/* Section heading */}
        <h2
          className="font-[family-name:var(--font-display)] text-[var(--text-h2)] leading-[var(--text-h2-lh)] font-normal tracking-[-0.01em] text-[var(--color-text)] mb-[var(--space-xxl)]"
        >
          How a piece gets made.
        </h2>

        {/* Steps */}
        <ol className="list-none m-0 p-0">
          {steps.map((step, index) => {
            const isEven = index % 2 === 1;
            return (
              <li key={step.numeral}>
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-xxl)] items-center mb-[var(--space-huge)]"
                  variants={rowVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                >
                  {/* Text column */}
                  <motion.div
                    className="flex flex-col"
                    variants={childVariants}
                  >
                    <span
                      aria-hidden="true"
                      className="font-[family-name:var(--font-display)] text-[80px] leading-none text-[var(--color-border)] mb-[var(--space-sm)] select-none"
                    >
                      {step.numeral}
                    </span>
                    <span className="spec-text mb-[var(--space-sm)]">
                      {step.label}
                    </span>
                    <h3
                      className="font-[family-name:var(--font-display)] text-[var(--text-h3)] leading-[var(--text-h3-lh)] md:text-[var(--text-h3)] md:leading-[var(--text-h3-lh)] font-normal text-[var(--color-text)] mb-[var(--space-md)]"
                    >
                      {step.label}
                    </h3>
                    <p
                      className="font-[family-name:var(--font-body)] text-[var(--text-body)] leading-[var(--text-body-lh)] font-light text-[var(--color-text-muted)]"
                    >
                      {step.body}
                    </p>
                  </motion.div>

                  {/* Image column */}
                  <motion.div
                    className={[
                      "w-full",
                      "order-[-1]",
                      isEven ? "md:order-[-1]" : "md:order-[0]",
                    ].join(" ")}
                    variants={childVariants}
                  >
                    <ProjectImage
                      id={step.imageId}
                      alt={step.imageAlt}
                      className="w-full aspect-[4/3] object-cover rounded-[var(--card-radius)]"
                    />
                  </motion.div>
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
