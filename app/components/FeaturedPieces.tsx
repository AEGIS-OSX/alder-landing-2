"use client";
import { motion } from "framer-motion";
import { ProjectImage } from "@/app/components/ProjectImage";

interface Piece {
  imageId: "feature_1" | "feature_2" | "feature_3";
  imageAlt: string;
  material: string;
  name: string;
  detail: string;
}

const pieces: Piece[] = [
  {
    imageId: "feature_1",
    imageAlt: "The Alder Market Tote — full-grain vegetable-tanned leather in natural, with solid brass rivets and linen lining",
    material: "Full-grain veg-tan, natural",
    name: "No. 1 — The Market Tote",
    detail: "Brass rivets, linen lining",
  },
  {
    imageId: "feature_2",
    imageAlt: "The Alder Slim Folio — Horween Chromexcel leather in dark brown, saddle-stitched spine with card slots",
    material: "Horween Chromexcel, dark brown",
    name: "No. 2 — The Slim Folio",
    detail: "Saddle-stitched spine, card slots",
  },
  {
    imageId: "feature_3",
    imageAlt: "The Alder Field Wallet — vegetable-tanned shoulder leather in cognac, single pocket with coin fold",
    material: "Veg-tan shoulder, cognac",
    name: "No. 3 — The Field Wallet",
    detail: "Single pocket, coin fold",
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.0, 0.0, 0.2, 1] as [number, number, number, number],
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.0, 0.0, 0.2, 1] as [number, number, number, number],
    },
  },
};

export default function FeaturedPieces() {
  return (
    <section
      id="pieces"
      aria-labelledby="featured-pieces-heading"
      className="bg-[var(--color-bg)] py-[var(--space-section)]"
    >
      <div className="mx-auto w-full max-w-[var(--layout-max-width)] px-[var(--space-xl)]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
        >
          {/* Section hairline */}
          <hr
            aria-hidden="true"
            className="border-t border-[var(--color-border)] mb-[var(--space-xxl)]"
          />

          {/* Section heading */}
          <h2
            id="featured-pieces-heading"
            className="font-[family-name:var(--font-display)] text-[length:var(--text-h2)] font-normal tracking-[-0.01em] text-[var(--color-text)] mb-[var(--space-xxl)] leading-[var(--leading-h2)]"
          >
            The first pieces.
          </h2>

          {/* Pieces grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--space-xl)]">
            {pieces.map((piece) => (
              <motion.article
                key={piece.name}
                variants={cardVariants}
                aria-label={piece.name}
              >
                {/* Image — aspect-ratio 3/4 */}
                <div
                  className="w-full overflow-hidden mb-[var(--space-lg)]"
                  style={{ aspectRatio: "3 / 4" }}
                >
                  <ProjectImage
                    id={piece.imageId}
                    alt={piece.imageAlt}
                    className="w-full h-full object-cover rounded-[var(--card-radius)]"
                  />
                </div>

                {/* Material spec */}
                <p className="spec-text mb-[var(--space-sm)]">
                  {piece.material}
                </p>

                {/* Piece name */}
                <h3
                  className="font-[family-name:var(--font-display)] text-[length:var(--text-h3)] font-normal text-[var(--color-text)] mb-[var(--space-sm)] leading-[var(--leading-h3)]"
                >
                  {piece.name}
                </h3>

                {/* Detail spec */}
                <p className="spec-text">
                  {piece.detail}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
