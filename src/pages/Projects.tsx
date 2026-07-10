import { motion, AnimatePresence } from "framer-motion";
import { pageTransition, staggerContainer, fadeUp } from "@/animations/variants";
import { projects } from "@/data/portfolio";
import { Link } from "wouter";
import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Projects() {
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const filteredProjects = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-background pt-36 pb-32 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="mb-24">
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
            <div className="w-6 h-px bg-primary" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">Archive</span>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="font-serif text-6xl md:text-8xl lg:text-[9rem] tracking-tighter leading-none mb-6"
          >
            All Works
          </motion.h1>
          <motion.p variants={fadeUp} className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            A collection of digital experiences
          </motion.p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-20">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`font-mono text-[10px] uppercase tracking-[0.2em] px-6 py-2.5 border transition-all duration-300 ${
                filter === cat
                  ? "border-primary text-primary bg-primary/5"
                  : "border-border/50 text-muted-foreground hover:border-foreground/50 hover:text-foreground"
              }`}
              data-testid={`filter-${cat.toLowerCase().replace(" ", "-")}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.7, ease: EASE }}
                className="group"
                data-testid={`project-item-${project.id}`}
              >
                {/* Image card */}
                <div className="aspect-[4/3] relative border border-border/40 mb-8 overflow-hidden">
                  <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-primary/30 z-10 transition-all duration-500 group-hover:w-6 group-hover:h-6 group-hover:border-primary/70" />
                  <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-primary/30 z-10 transition-all duration-500 group-hover:w-6 group-hover:h-6 group-hover:border-primary/70" />
                  <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-primary/30 z-10 transition-all duration-500 group-hover:w-6 group-hover:h-6 group-hover:border-primary/70" />
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-primary/30 z-10 transition-all duration-500 group-hover:w-6 group-hover:h-6 group-hover:border-primary/70" />
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-secondary/30 flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground/50">
                        [ {project.title} ]
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-background/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Info */}
                <div className="flex justify-between items-start mb-5">
                  <div>
                    <h3 className="font-serif text-3xl tracking-tighter group-hover:text-primary transition-colors duration-300 mb-2">
                      {project.title}
                    </h3>
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                      {project.category}
                    </p>
                  </div>
                  <span className="font-serif text-xl italic text-muted-foreground/60">{project.year}</span>
                </div>

                <p className="font-sans text-base text-muted-foreground font-light leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span key={t} className="font-mono text-[8px] uppercase tracking-widest border border-border/40 px-2.5 py-1 text-muted-foreground/70">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] border border-border/60 px-5 py-2.5 text-muted-foreground hover:border-primary hover:text-primary transition-all duration-300"
                      data-testid={`project-live-${project.id}`}
                    >
                      Live Demo <ExternalLink size={10} />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] border border-border/60 px-5 py-2.5 text-muted-foreground hover:border-primary hover:text-primary transition-all duration-300"
                      data-testid={`project-github-${project.id}`}
                    >
                      GitHub <Github size={10} />
                    </a>
                  )}
                  <Link
                    href={`/projects/${project.id}`}
                    className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/50 hover:text-muted-foreground transition-colors duration-300 border-b border-transparent hover:border-border pb-0.5"
                    data-testid={`project-detail-${project.id}`}
                  >
                    Details →
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
