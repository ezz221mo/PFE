import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { slideFromRight, fadeUp, staggerContainer } from "@/animations/variants";
import { personalInfo } from "@/data/portfolio";

/* ── Animated counter ── */
function AnimatedCounter({
  target,
  suffix = "",
  duration = 1600,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px 0px" });

  useEffect(() => {
    if (!isInView || target === 0) return;
    let raf: number;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = Math.min(now - start, duration);
      const p = elapsed / duration;
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <section className="py-40 px-6 bg-background relative" id="about" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-3xl"
        >
          <motion.div variants={fadeUp} className="mb-6 flex items-center gap-4">
            <div className="w-6 h-px bg-primary" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">About</span>
          </motion.div>

          <motion.h2
            variants={slideFromRight}
            className="font-serif text-4xl md:text-5xl lg:text-6xl mb-10 leading-tight"
          >
            A new voice,<br />
            <span className="italic text-muted-foreground">building in public.</span>
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="space-y-6 font-sans text-lg md:text-xl text-muted-foreground leading-relaxed font-light"
          >
            <p>
              I'm Ezzaldin — a self-taught frontend developer from Qena, Egypt.
              My journey began in 2024, armed with nothing but YouTube, free resources,
              and an obsessive refusal to build anything ordinary.
            </p>
            <p>
              Being self-taught is a superpower. It demands discipline, obsession, and the courage
              to figure things out when no one hands you the answers. I founded{" "}
              <span className="text-foreground font-normal">Zodex</span> — a creative team
              built on the same principle: craft digital experiences that refuse to be forgettable.
            </p>
            <p>
              I don't just write code. I design systems. I think in motion. I engineer
              interfaces that feel alive.
            </p>
          </motion.div>

          {/* Stats with animated counters */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 sm:grid-cols-3 gap-8 mt-16 pt-12 border-t border-border/40"
          >
            <motion.div variants={fadeUp}>
              <p className="font-serif text-6xl text-primary leading-none mb-2">
                <AnimatedCounter target={2} suffix="+" />
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Years of obsession
              </p>
            </motion.div>

            <motion.div variants={fadeUp}>
              <p className="font-serif text-6xl text-primary leading-none mb-2">
                <AnimatedCounter target={3} />
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Projects shipped
              </p>
            </motion.div>

            <motion.div variants={fadeUp}>
              <p className="font-serif text-6xl text-primary leading-none mb-2">
                <AnimatedCounter target={0} />
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Happy clients
              </p>
              <p className="font-mono text-[9px] mt-2 text-muted-foreground/40">
                (Be the first one)
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
