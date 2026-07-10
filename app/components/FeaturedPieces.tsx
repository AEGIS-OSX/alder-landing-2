"use client";
import { motion, useReducedMotion } from "framer-motion";
import { ProjectImage } from "@/app/components/ProjectImage";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

interface PieceCard {
  imageId: "feature_1" | "feature_2" | "feature_3";
  alt: string;
  name: string;
  description: string;
  spec: string;
  offsetDesktop: boolean;
}

const pieces: PieceCard[] = [
  {
    imageId: "feature_1",
    alt: "The Alder Tote — vegetable-tanned walnut leather carryall",
    name: "The Alder Tote",
    description:
      "An unlined carryall designed for daily utility. The open-top construction highlights the raw texture of the walnut leather, while the reinforced base handles the weight of a life in motion.",
    spec: `VEGETABLE-TANNED WALNUT LEATHER / SOLID BRASS RIVETS / 14" X 16" X 6"`,
    offsetDesktop: false,
  },
  {
    imageId: "feature_2",
    alt: "The Field Wallet — full-grain saddle-tan bifold",
    name: "The Field Wallet",
    description:
      "A four-card bifold that disappears in a pocket. Built from a single piece of saddle-tan hide, it is designed to stretch and mold to your carry over the first month of use.",
    spec: `FULL-GRAIN SADDLE-TAN LEATHER / WAXED LINEN THREAD / 3" X 4"`,
    offsetDesktop: true,
  },
  {
    imageId: "feature_3",
    alt: "The Maker\u2019s Roll — olive waxed canvas tool wrap",
    name: "The Maker\u2019s Roll",
    description:
      "A protective wrap for the tools of your trade. Combining olive waxed canvas with leather accents, it provides a weather-resistant home for pens, knives, or brushes.",
    spec: `18OZ WAXED CANVAS / WALNUT LEATHER STRAPS / 12" X 10" UNROLLED`,
    offsetDesktop: false,
  },
];

export default function FeaturedPieces() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <section
        aria-labelledby="pieces-heading"
        className="w-full bg-[var(--color-surface)] py-24"
      >
        <div className="alder-container">
          <div className="text-center mb-12">
            <p className="spec-text mb-3">First release</p>
            <h2
              id="pieces-heading"
              className="font-[family-name:var(--font-display)] text-[26px] leading-[32px] md:text-[36px] md:leading-[42px] tracking-[-0.01em] font-normal text-[var(--color-text)]"
            >
              The first release.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pieces.map((piece) => (
              <article
                key={piece.imageId}
                className={[
                  "border border-[var(--color-border)] rounded-[4px] bg-[var(--color-bg)] overflow-hidden",
                  piece.offsetDesktop ? "md:mt-[48px]" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div className="aspect-[4/5] w-full overflow-hidden">
                  <ProjectImage
                    id={piece.imageId}
                    alt={piece.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3
                    className="font-[family-name:var(--font-display)] text-[19px] leading-[25px] md:text-[22px] md:leading-[28px] font-normal text-[var(--color-text)] mb-3"
                  >
                    {piece.name}
                  </h3>
                  <p
                    className="font-[family-name:var(--font-body)] text-[17px] leading-[28px] font-light text-[var(--color-text-muted)] mb-4"
                  >
                    {piece.description}
                  </p>
                  <hr className="hairline my-4" />
                  <p className="spec-text">{piece.spec}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="pieces-heading"
      className="w-full bg-[var(--color-surface)] py-24"
    >
      <div className="alder-container">
        <div className="text-center mb-12">
          <p className="spec-text mb-3">First release</p>
          <h2
            id="pieces-heading"
            className="font-[family-name:var(--font-display)] text-[26px] leading-[32px] md:text-[36px] md:leading-[42px] tracking-[-0.01em] font-normal text-[var(--color-text)]"
          >
            The first release.
          </h2>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pieces.map((piece) => (
              <motion.article
                key={piece.imageId}
                variants={cardVariants}
                className={[
                  "border border-[var(--color-border)] rounded-[4px] bg-[var(--color-bg)] overflow-hidden",
                  piece.offsetDesktop ? "md:mt-[48px]" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div className="aspect-[4/5] w-full overflow-hidden">
                  <ProjectImage
                    id={piece.imageId}
                    alt={piece.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3
                    className="font-[family-name:var(--font-display)] text-[19px] leading-[25px] md:text-[22px] md:leading-[28px] font-normal text-[var(--color-text)] mb-3"
                  >
                    {piece.name}
                  </h3>
                  <p
                    className="font-[family-name:var(--font-body)] text-[17px] leading-[28px] font-light text-[var(--color-text-muted)] mb-4"
                  >
                    {piece.description}
                  </p>
                  <hr className="hairline my-4" />
                  <p className="spec-text">{piece.spec}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
