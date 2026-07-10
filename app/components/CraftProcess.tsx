"use client";
import { motion } from "framer-motion";
import { ProjectImage } from "@/app/components/ProjectImage";

const steps = [
  {
    numeral: "01",
    title: "Selection",
    body: "We source full-grain hides from tanneries that still use vegetable extracts. These skins are not corrected for imperfections; they carry the life of the animal and will darken with yours.",
    imageId: "feature_1" as const,
  },
  {
    numeral: "02",
    title: "Cutting",
    body: "Every panel is cut by hand using a traditional round knife. It is slower than a die press, but it allows us to work around the natural grain and ensure every piece of the hide is used where it is strongest.",
    imageId: "feature_2" as const,
  },
  {
    numeral: "03",
    title: "Stitching",
    body: "We use a traditional saddle stitch with two needles and waxed linen thread. Unlike a machine lockstitch, a saddle stitch will not unravel if a single loop breaks. It is the strongest seam known to craft.",
    imageId: "feature_3" as const,
  },
  {
    numeral: "04",
    title: "Finishing",
    body: "Edges are sanded, painted, and burnished with natural beeswax until they are smooth to the touch. This seal protects the leather from moisture and prevents the fibers from fraying over years of use.",
    imageId: "social_proof" as const,
  },
];

const stepVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

export default function CraftProcess() {
  return (
    <motion.section className="process" id="process">
      <div className="container">
        <h2 className="process-headline">How a piece gets made.</h2>
        {steps.map((step, index) => (
          <motion.div
            key={step.numeral}
            className="process-step"
            variants={stepVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.0, 0.0, 0.2, 1] }}
          >
            <div className="process-step-text">
              <div className="process-step-title-wrapper">
                <span className="process-step-numeral" aria-hidden="true">
                  {step.numeral}
                </span>
                <h3 className="process-step-title">{step.title}</h3>
              </div>
              <p className="process-step-body">{step.body}</p>
            </div>
            <div className="process-step-image-wrapper">
              <ProjectImage
                id={step.imageId}
                className="process-step-image"
                alt=""
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
