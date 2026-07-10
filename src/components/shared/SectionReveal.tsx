import React from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp } from "@/animations/variants";

export function SectionReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}