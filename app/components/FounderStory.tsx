"use client";
import { motion, useReducedMotion } from "framer-motion";
import { ProjectImage } from "@/app/components/ProjectImage";

export default function FounderStory() {
  const reduced = useReducedMotion();

  return (
    <section
      aria-labelledby="founder-heading"
      className="w-full bg-[var(--color-bg)] py-[96px]"
    >
      <div className="alder-container">
        <div className="flex flex-col md:flex-row md:gap-[64px] gap-[48px] items-start">
          {/* Left column — portrait image, 42% on desktop */}
          <motion.div
            className="w-full md:w-[42%] flex-shrink-0"
            {...(reduced
              ? {}
              : {
                  initial: { opacity: 0, x: -24 },
                  whileInView: { opacity: 1, x: 0 },
                  viewport: { once: true, margin: "-80px" },
                  transition: { duration: 0.6, ease: "easeOut" },
                })}
          >
            <div className="relative" style={{ aspectRatio: "3/4" }}>
              <ProjectImage
                id="social_proof"
                className="w-full h-auto object-cover"
                alt="The maker at work in her one-room studio, saddle-stitching a leather piece."
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  backgroundColor: "var(--color-text)",
                  opacity: 0.06,
                }}
              />
            </div>
          </motion.div>

          {/* Right column — text, 58% on desktop */}
          <motion.div
            className="w-full md:w-[58%] flex flex-col justify-center"
            {...(reduced
              ? {}
              : {
                  initial: { opacity: 0, x: 24 },
                  whileInView: { opacity: 1, x: 0 },
                  viewport: { once: true, margin: "-80px" },
                  transition: { duration: 0.6, delay: 0.1, ease: "easeOut" },
                })}
          >
            {/* Eyebrow */}
            <p
              id="founder-heading"
              className="text-[var(--color-text-muted)] uppercase tracking-[0.06em] text-[13px] leading-[20px] mb-[24px]"
            >
              The maker
            </p>

            {/* Accent rule */}
            <span
              aria-hidden="true"
              className="accent-rule mb-[16px]"
            />

            {/* Pull quote */}
            <blockquote
              className="font-[family-name:var(--font-display)] text-[22px] leading-[28px] font-normal italic text-[var(--color-text)] mb-[32px]"
              style={{ fontStyle: "italic" }}
            >
              &#8220;The work is finished when there is nothing left to take away.&#8221;
            </blockquote>

            {/* Body paragraphs */}
            <p className="font-[family-name:var(--font-body)] text-[17px] leading-[28px] font-light text-[var(--color-text)] mb-[24px]">
              I spent a decade as a furniture upholsterer, working with fabrics that were meant to be replaced. I wanted to work with something that stayed. I spent four years learning the saddle stitch at night, practicing on scraps until the tension was exact.
            </p>

            <p className="font-[family-name:var(--font-body)] text-[17px] leading-[28px] font-light text-[var(--color-text)] mb-[24px]">
              Now, I work alone in a one-room studio. I cut every hide, punch every hole, and pull every stitch myself. There is no assembly line here. There is only the hide, the knife, and the time it takes to do the job correctly.
            </p>

            <p className="font-[family-name:var(--font-body)] text-[17px] leading-[28px] font-light text-[var(--color-text)]">
              When you buy a piece from Alder, you are buying a decade of mistakes and the four years it took to stop making them.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
