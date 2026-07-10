import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "wouter";
import { staggerContainer, fadeUp } from "@/animations/variants";
import { personalInfo } from "@/data/portfolio";
import { ArrowDown, Download } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  /* ── Mouse parallax ── */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springCfg = { stiffness: 40, damping: 18, mass: 1 };
  const springX = useSpring(rawX, springCfg);
  const springY = useSpring(rawY, springCfg);

  const line1X = useTransform(springX, v => v * -0.55);
  const line1Y = useTransform(springY, v => v * -0.3);
  const line2X = useTransform(springX, v => v * 0.4);
  const line2Y = useTransform(springY, v => v * 0.25);
  const labelX = useTransform(springX, v => v * 0.7);
  const labelY = useTransform(springY, v => v * 0.4);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    rawX.set(x * 28);
    rawY.set(y * 18);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden px-6 pt-24 pb-16"
      id="hero"
    >
      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundSize: "200px 200px",
        }}
      />

      {/* Ambient glow that follows the parallax slightly */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-[120px] pointer-events-none"
        style={{ x: useTransform(springX, v => v * 1.2), y: useTransform(springY, v => v * 0.8) }}
      />

      <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col justify-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start"
        >
          {/* Label */}
          <motion.div
            variants={fadeUp}
            className="mb-8 flex items-center gap-4"
            style={{ x: labelX, y: labelY }}
          >
            <div className="w-8 h-px bg-primary" />
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-primary">
              {personalInfo.title}
            </span>
          </motion.div>

          {/* Name line 1 */}
          <div className="overflow-hidden w-full">
            <motion.h1
              variants={fadeUp}
              style={{ x: line1X, y: line1Y }}
              className="font-serif text-[16vw] md:text-[13vw] lg:text-[11vw] xl:text-[10vw] leading-[0.88] tracking-tighter"
            >
              Ezzaldin
            </motion.h1>
          </div>

          {/* Name line 2 */}
          <div className="overflow-hidden w-full">
            <motion.h1
              variants={fadeUp}
              style={{ x: line2X, y: line2Y }}
              className="font-serif text-[16vw] md:text-[13vw] lg:text-[11vw] xl:text-[10vw] leading-[0.88] tracking-tighter italic font-light text-muted-foreground pl-[5vw]"
            >
              Elsadat
            </motion.h1>
          </div>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 mt-12 lg:mt-14"
          >
            <MagneticButton>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="block px-7 py-3.5 bg-foreground text-background font-mono text-[10px] uppercase tracking-[0.2em] hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                data-testid="hero-cta-contact"
              >
                Get in Touch
              </a>
            </MagneticButton>
            <MagneticButton>
              <Link
                href="/projects"
                className="block px-7 py-3.5 border border-border font-mono text-[10px] uppercase tracking-[0.2em] hover:border-primary hover:text-primary transition-all duration-300"
                data-testid="hero-cta-projects"
              >
                View Projects
              </Link>
            </MagneticButton>
            <a
              href="/cv.pdf"
              download="Ezzaldin_Elsadat_CV.pdf"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-border/50 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:border-primary hover:text-primary transition-all duration-300"
              data-testid="hero-cta-cv"
            >
              <Download size={12} />
              Download CV
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[8px] uppercase tracking-[0.35em] text-muted-foreground/40">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown size={13} className="text-muted-foreground/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ── Magnetic button wrapper ── */
function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18 });
  const springY = useSpring(y, { stiffness: 200, damping: 18 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = e.clientX - rect.left - rect.width / 2;
    const cy = e.clientY - rect.top - rect.height / 2;
    x.set(cx * 0.35);
    y.set(cy * 0.35);
  };

  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
}
