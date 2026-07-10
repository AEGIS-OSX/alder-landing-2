"use client";
import { motion } from "framer-motion";
import { ProjectImage } from "@/app/components/ProjectImage";

const heroVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.0, 0.0, 0.2, 1] as [number, number, number, number],
    },
  },
};

export default function Hero() {
  return (
    <motion.section className="hero" id="hero">
      <div className="hero-inner">
        <motion.div
          className="hero-left"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p className="hero-eyebrow" variants={itemVariants}>
            Small-batch leather goods
          </motion.p>
          <motion.h1 className="hero-headline" variants={itemVariants}>
            Leather goods, made slowly.
          </motion.h1>
          <motion.p className="hero-subhead" variants={itemVariants}>
            Small-batch bags and carry goods, cut and stitched by hand in a
            one-room studio. First release coming soon.
          </motion.p>
          <motion.a
            href="#waitlist"
            className="btn-primary hero-cta"
            variants={itemVariants}
          >
            Join the Waitlist
          </motion.a>
        </motion.div>

        <motion.div
          className="hero-image-wrapper"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.3,
            ease: [0.0, 0.0, 0.2, 1] as [number, number, number, number],
          }}
        >
          <ProjectImage
            id="hero"
            className="hero-image"
            fetchpriority="high"
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
