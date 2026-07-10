import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, fadeUp, slideFromLeft } from "@/animations/variants";
import { services } from "@/data/portfolio";
import { Code2, Layers } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number | string; className?: string }>> = {
  Code2,
  Layers,
};

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <section className="py-40 px-6 relative overflow-hidden" id="services" ref={ref}>
      <div className="absolute inset-0 bg-secondary/20 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={slideFromLeft} className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-6 h-px bg-primary" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">Services</span>
              </div>
              <h2 className="font-serif text-5xl md:text-7xl tracking-tighter">Expertise</h2>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground max-w-xs leading-relaxed">
              Disciplines mastered through<br />obsessive iteration.
            </p>
          </motion.div>

          <div className="border-t border-border/40">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] ?? Code2;
              return (
                <motion.div
                  key={service.id}
                  variants={fadeUp}
                  className="py-12 md:py-16 border-b border-border/40 flex flex-col md:flex-row gap-8 md:gap-20 group relative"
                >
                  <div className="absolute inset-0 bg-primary/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  <div className="flex items-start gap-6 md:w-1/6 shrink-0">
                    <span className="font-mono text-xs text-primary/60 tracking-widest pt-1">
                      0{index + 1}
                    </span>
                    <Icon
                      size={20}
                      className="text-primary/70 group-hover:text-primary transition-colors duration-500 mt-0.5 shrink-0"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-6 group-hover:text-primary transition-colors duration-500 tracking-tight">
                      {service.title}
                    </h3>
                    <p className="font-sans text-lg text-muted-foreground font-light max-w-2xl leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="hidden md:flex items-center md:w-16 shrink-0 justify-end">
                    <div className="w-6 h-px bg-border group-hover:w-12 group-hover:bg-primary transition-all duration-500" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
