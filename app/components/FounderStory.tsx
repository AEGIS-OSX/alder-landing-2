"use client";
import { motion } from "framer-motion";
import { ProjectImage } from "@/app/components/ProjectImage";

export default function FounderStory() {
  return (
    <motion.section
      className="founder"
      id="founder"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="founder-inner">
        <div className="founder-image-col">
          <ProjectImage
            id="social_proof"
            className="founder-image"
            alt="The maker at work in the studio, hand-stitching a piece of walnut leather with waxed linen thread."
          />
        </div>
        <motion.div
          className="founder-text-col"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.0, 0.0, 0.2, 1] }}
        >
          <hr className="hairline" />
          <p className="founder-eyebrow">The maker</p>
          <h2 className="founder-headline">Built by one person, on purpose.</h2>
          <p className="founder-body">
            {`My name is not important. What matters is that I have been cutting leather in this studio for eleven years, and I have never hired anyone to help me. Not because I cannot, but because the moment a second pair of hands touches the work, it becomes something else. These pieces are made by one person, start to finish. That is the only guarantee I can make.`}
          </p>
          <p className="founder-body founder-body--second">
            {`The waitlist is not a marketing device. It is a queue. When a piece is finished, the next person on the list gets a message. That is the entire system.`}
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
