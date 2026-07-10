"use client";
import { motion } from "framer-motion";
import { ProjectImage } from "@/app/components/ProjectImage";

interface Piece {
  imageId: "piece-1" | "piece-2" | "piece-3";
  imageAlt: string;
  material: string;
  name: string;
  detail: string;
}

const pieces: Piece[] = [
  {
    imageId: "piece-1",
    imageAlt: "The Alder Market Tote — full-grain vegetable-tanned leather in natural, with solid brass rivets and linen lining",
    material: "Full-grain veg-tan, natural",
    name: "No. 1 — The Market Tote",
    detail: "Brass rivets, linen lining",
  },
  {
    imageId: "piece-2",
    imageAlt: "The Alder Slim Folio — Horween Chromexcel leather in dark brown, saddle-stitched spine with card slots",
    material: "Horween Chromexcel, dark brown",
    name: "No. 2 — The Slim Folio",
    detail: "Saddle-stitched spine, card slots",
  },
  {
    imageId: "piece-3",
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
      style={{ backgroundColor: "var(--color-bg)", paddingBlock: "var(--space-section)" }}
    >
      <div className="section-inner">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
        >
          {/* Section hairline */}
          <hr
            aria-hidden="true"
            className="hairline"
            style={{ marginBottom: "var(--space-xxl)" }}
          />

          {/* Section heading */}
          <h2
            id="featured-pieces-heading"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-h2)",
              lineHeight: "var(--text-h2-lh)",
              fontWeight: 400,
              letterSpacing: "-0.01em",
              color: "var(--color-text)",
              marginBottom: "var(--space-xxl)",
            }}
          >
            The first pieces.
          </h2>

          {/* Pieces grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "var(--space-xl)",
            }}
            className="pieces-grid"
          >
            {pieces.map((piece) => (
              <motion.article
                key={piece.name}
                variants={cardVariants}
                aria-label={piece.name}
              >
                {/* Image — aspect-ratio 3/4 */}
                <div
                  style={{
                    width: "100%",
                    overflow: "hidden",
                    aspectRatio: "3 / 4",
                    marginBottom: "var(--space-lg)",
                  }}
                >
                  <ProjectImage
                    id={piece.imageId}
                    alt={piece.imageAlt}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "var(--card-radius)",
                    }}
                  />
                </div>

                {/* Material spec */}
                <p className="spec-text" style={{ marginBottom: "var(--space-sm)" }}>
                  {piece.material}
                </p>

                {/* Piece name */}
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-h3)",
                    lineHeight: "var(--text-h3-lh)",
                    fontWeight: 400,
                    color: "var(--color-text)",
                    marginBottom: "var(--space-sm)",
                  }}
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

      {/* Mobile grid override */}
      <style>{`
        @media (max-width: 375px) {
          .pieces-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
