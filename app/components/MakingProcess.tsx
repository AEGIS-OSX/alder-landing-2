"use client";
import { motion, useReducedMotion } from "framer-motion";
import { ProjectImage } from "@/app/components/ProjectImage";

interface Step {
  number: string;
  title: string;
  body: string;
  imageId: string;
  imageAlt: string;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Selection",
    body: "We source full-grain hides from tanneries that still use vegetable extracts. These skins are not corrected for imperfections; they carry the life of the animal and will darken with yours.",
    imageId: "feature_1",
    imageAlt: "A hand-stitched leather seam showing material grain and craft precision.",
  },
  {
    number: "02",
    title: "Cutting",
    body: "Every panel is cut by hand using a traditional round knife. It is slower than a die press, but it allows us to work around the natural grain and ensure every piece of the hide is used where it is strongest.",
    imageId: "feature_2",
    imageAlt: "The saddle-stitching process, showing walnut leather and precision hand-stitched thread.",
  },
  {
    number: "03",
    title: "Stitching",
    body: "We use a traditional saddle stitch with two needles and waxed linen thread. Unlike a machine lockstitch, a saddle stitch will not unravel if a single loop breaks. It is the strongest seam known to craft.",
    imageId: "feature_3",
    imageAlt: "The Maker's Roll, showing the tactile intersection of waxed canvas and saddle-tan leather.",
  },
  {
    number: "04",
    title: "Finishing",
    body: "Edges are sanded, painted, and burnished with natural beeswax until they are smooth to the touch. This seal protects the leather from moisture and prevents the fibers from fraying over years of use.",
    imageId: "social_proof",
    imageAlt: "Macro shot of the saddle-stitching process, emphasizing tactile quality of walnut leather and saddle-tan thread.",
  },
];

export default function MakingProcess() {
  const prefersReducedMotion = useReducedMotion();

  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 0.5, ease: "easeOut" },
      };

  return (
    <section
      aria-labelledby="process-heading"
      className="w-full bg-[var(--color-bg)] py-[96px]"
    >
      <div className="alder-container">
        {/* Section header */}
        <div className="mb-[48px]">
          <p className="spec-text text-[var(--color-accent)] mb-[8px]">Craft</p>
          <h2
            id="process-heading"
            className="font-[family-name:var(--font-display)] text-[26px] leading-[32px] md:text-[36px] md:leading-[42px] tracking-[-0.01em] font-normal text-[var(--color-text)]"
          >
            How a piece gets made.
          </h2>
        </div>

        {/* Steps list */}
        <ol className="list-none m-0 p-0">
          {steps.map((step, index) => {
            const isOdd = (index + 1) % 2 !== 0;

            return (
              <li key={step.number}>
                <hr className="hairline" />
                <motion.div
                  {...motionProps}
                  className="relative py-[48px]"
                >
                  {/* Decorative large numeral — top: 0 per spec */}
                  <span
                    aria-hidden="true"
                    className="absolute top-0 left-[-16px] font-[family-name:var(--font-display)] text-[80px] leading-none font-normal text-[var(--color-text)] opacity-[0.12] select-none pointer-events-none"
                  >
                    {step.number}
                  </span>

                  {/* Two-column grid: odd = text left / image right; even = image left / text right */}
                  <div
                    className={`flex flex-col gap-[32px] md:grid md:gap-[48px] md:items-start ${
                      isOdd
                        ? "md:grid-cols-[55fr_45fr]"
                        : "md:grid-cols-[45fr_55fr]"
                    }`}
                  >
                    {/* Text column — always first in DOM; CSS order swaps on desktop for even steps */}
                    <div
                      className={`relative z-10 ${
                        isOdd ? "" : "md:order-2"
                      }`}
                    >
                      <p className="font-[family-name:var(--font-body)] text-[13px] leading-[20px] font-normal tracking-[0.06em] uppercase text-[var(--color-accent)] mb-[8px]">
                        {step.number}
                      </p>
                      <h3 className="font-[family-name:var(--font-display)] text-[19px] leading-[25px] md:text-[22px] md:leading-[28px] font-normal text-[var(--color-text)] mb-[16px]">
                        {step.title}
                      </h3>
                      <p className="font-[family-name:var(--font-body)] text-[16px] leading-[26px] md:text-[17px] md:leading-[28px] font-light text-[var(--color-text-muted)] max-w-[52ch]">
                        {step.body}
                      </p>
                    </div>

                    {/* Image column */}
                    <div
                      className={`w-full ${
                        isOdd ? "" : "md:order-1"
                      }`}
                    >
                      <div className="w-full aspect-[4/3] overflow-hidden">
                        <ProjectImage
                          id={step.imageId}
                          className="w-full h-full object-cover"
                          alt={step.imageAlt}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </li>
            );
          })}
          {/* Closing hairline after last step */}
          <li aria-hidden="true">
            <hr className="hairline" />
          </li>
        </ol>
      </div>
    </section>
  );
}
