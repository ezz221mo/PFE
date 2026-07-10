import { motion } from "framer-motion";
import { pageTransition, fadeUp, staggerContainer } from "@/animations/variants";
import { projects } from "@/data/portfolio";
import { useRoute, Link } from "wouter";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

const extraDescriptions: Record<string, string> = {
  "smile-dashboard":
    "The system provides an integrated clinic workflow covering appointment scheduling, patient records, doctor assignments, and status tracking — all within a responsive, component-driven React architecture built for scalability and long-term maintainability.",
  "ecommerce-store":
    "Built with a focus on real-world usability: users can browse and filter products, manage their cart, edit quantities, remove items, and complete purchases — all with a clean, performant interface engineered in pure React and JavaScript.",
  "nabd":
    "Built with React, TypeScript, and Tailwind CSS, Nabd delivers a polished real estate browsing experience with responsive layouts, smooth page transitions, and an intuitive filtering system. Every component was crafted for performance and visual consistency across all device sizes.",
};

export default function ProjectDetail() {
  const [, params] = useRoute("/projects/:id");
  const project = projects.find((p) => p.id === params?.id);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <p className="font-mono text-sm uppercase tracking-widest text-muted-foreground">Project not found</p>
        <Link href="/projects" className="font-mono text-xs uppercase tracking-widest hover:text-primary transition-colors border-b border-border pb-1">
          Back to Archive
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-background pt-36 pb-32 px-6"
    >
      <div className="max-w-5xl mx-auto">
        <Link
          href="/projects"
          className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors mb-20"
          data-testid="back-to-projects"
        >
          <ArrowLeft size={14} /> Back to Archive
        </Link>

        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.div variants={fadeUp} className="mb-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
              {project.category}&nbsp;&nbsp;//&nbsp;&nbsp;{project.year}
            </span>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-none">
              {project.title}
            </h1>
          </motion.div>

          {/* Meta row */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-start gap-12 mb-16 border-t border-border/40 pt-10">
            <div>
              <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-3">
                Category
              </h4>
              <p className="font-sans text-lg">{project.category}</p>
            </div>
            <div>
              <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-3">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="font-mono text-[9px] uppercase tracking-widest bg-secondary/60 border border-border/50 px-3 py-1.5">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-6 items-start">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] hover:text-primary transition-colors border-b border-border pb-1 hover:border-primary"
                  data-testid="project-live-url"
                >
                  Live Demo <ExternalLink size={12} />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] hover:text-primary transition-colors border-b border-border pb-1 hover:border-primary"
                  data-testid="project-github-url"
                >
                  GitHub <Github size={12} />
                </a>
              )}
            </div>
          </motion.div>

          {/* Hero image */}
          <motion.div variants={fadeUp} className="w-full aspect-video border border-border/40 mb-28 relative group overflow-hidden">
            <div className="absolute top-4 left-4 w-5 h-5 border-t border-l border-primary/30 z-10 transition-all duration-500 group-hover:border-primary/70" />
            <div className="absolute top-4 right-4 w-5 h-5 border-t border-r border-primary/30 z-10 transition-all duration-500 group-hover:border-primary/70" />
            <div className="absolute bottom-4 left-4 w-5 h-5 border-b border-l border-primary/30 z-10 transition-all duration-500 group-hover:border-primary/70" />
            <div className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-primary/30 z-10 transition-all duration-500 group-hover:border-primary/70" />
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
            ) : (
              <div className="w-full h-full bg-secondary/20 flex flex-col items-center justify-center gap-3">
                <div className="w-px h-10 bg-gradient-to-b from-transparent via-muted-foreground/30 to-transparent" />
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground/50">
                  Hero Visual
                </span>
                <div className="w-px h-10 bg-gradient-to-b from-transparent via-muted-foreground/30 to-transparent" />
              </div>
            )}
          </motion.div>

          {/* Overview */}
          <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-28">
            <div className="md:col-span-3">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-primary">Overview</span>
            </div>
            <div className="md:col-span-9 font-sans text-xl md:text-2xl font-light text-muted-foreground leading-relaxed">
              <p className="mb-6">{project.description}</p>
              {extraDescriptions[project.id] && (
                <p>{extraDescriptions[project.id]}</p>
              )}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-12 border-t border-border/40">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background font-mono text-[10px] uppercase tracking-[0.2em] hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                View Live Demo <ExternalLink size={12} />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 border border-border font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:border-primary hover:text-primary transition-all duration-300"
              >
                View on GitHub <Github size={12} />
              </a>
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
