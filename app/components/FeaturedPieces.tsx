"use client";
import { motion } from "framer-motion";
import { ProjectImage } from "@/app/components/ProjectImage";

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;

interface PieceCard {
  imageId: "feature_1" | "feature_2" | "feature_3";
  title: string;
  spec: string;
  description: string;
  aspectRatio: string;
}

const PIECES: PieceCard[] = [
  {
    imageId: "feature_1",
    title: "The Tote",
    spec: "Full-grain vegetable-tanned leather — natural",
    description: "A structured carry bag with a single interior compartment, brass rivets, and a hand-stitched shoulder strap. Built to last decades.",
    aspectRatio: "3 / 4",
  },
  {
    imageId: "feature_2",
    title: "The Folio",
    spec: "Full-grain vegetable-tanned leather — dark tan",
    description: "A slim document folio that holds a legal pad, passport, and pen. No zippers. Closes with a single leather wrap-tie.",
    aspectRatio: "1 / 1",
  },
  {
    imageId: "feature_3",
    title: "The Card Sleeve",
    spec: "Full-grain vegetable-tanned leather — cognac",
    description: "A minimal card sleeve that holds four cards and folds flat. The simplest thing we make. The hardest to get right.",
    aspectRatio: "4 / 5",
  },
];

export default function FeaturedPieces() {
  return (
    <motion.section
      className="pieces"
      id="pieces"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4 }}
    >
      <div className="container">
        <h2 className="pieces-headline">First pieces.</h2>
        <div className="pieces-grid">
          {PIECES.map((piece, index) => (
            <motion.article
              key={piece.title}
              className="piece-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: EASE_OUT,
              }}
            >
              <div
                className="piece-card-image-wrapper"
                style={{ aspectRatio: piece.aspectRatio }}
              >
                <ProjectImage
                  id={piece.imageId}
                  className="piece-card-image"
                  alt={piece.title}
                />
              </div>
              <div className="piece-card-body">
                <h3 className="piece-card-title">{piece.title}</h3>
                <p className="piece-card-spec">{piece.spec}</p>
                <p className="piece-card-desc">{piece.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
