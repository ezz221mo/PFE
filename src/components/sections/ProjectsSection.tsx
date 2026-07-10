import { useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { staggerContainer, fadeUp } from "@/animations/variants";
import { projects } from "@/data/portfolio";
import { ArrowRight, ExternalLink, Github } from "lucide-react";

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="py-40 px-6 bg-background relative" id="projects" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-32">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-6 h-px bg-primary" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">Work</span>
              </div>
              <h2 className="font-serif text-5xl md:text-7xl tracking-tighter">Selected Works</h2>
            </div>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors duration-300"
              data-testid="view-all-projects"
            >
              View All Projects
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>

          <div className="space-y-40">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={fadeUp}
                className={`group flex flex-col md:flex-row gap-12 md:gap-20 items-center ${
                  index % 2 !== 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Project image */}
                <div className="w-full md:w-1/2">
                  <div className="aspect-[4/3] relative border border-border/40 overflow-hidden">
                    <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-primary/40 z-10 transition-all duration-500 group-hover:w-6 group-hover:h-6 group-hover:border-primary/80" />
                    <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-primary/40 z-10 transition-all duration-500 group-hover:w-6 group-hover:h-6 group-hover:border-primary/80" />
                    <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-primary/40 z-10 transition-all duration-500 group-hover:w-6 group-hover:h-6 group-hover:border-primary/80" />
                    <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-primary/40 z-10 transition-all duration-500 group-hover:w-6 group-hover:h-6 group-hover:border-primary/80" />
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
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>

                {/* Project info */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4">
                    {project.category}&nbsp;&nbsp;//&nbsp;&nbsp;{project.year}
                  </div>
                  <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tighter group-hover:text-primary transition-colors duration-500">
                    {project.title}
                  </h3>
                  <p className="font-sans text-lg text-muted-foreground font-light mb-10 max-w-md leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-12">
                    {project.tech.map((t) => (
                      <span key={t} className="font-mono text-[9px] uppercase tracking-widest border border-border/50 px-3 py-1 text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="group/btn inline-flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.2em] border border-foreground/70 px-8 py-4 hover:border-primary hover:text-primary transition-all duration-300"
                        data-testid={`project-live-${project.id}`}
                      >
                        Live Demo
                        <ExternalLink size={12} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="group/btn inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] border border-border/50 px-8 py-4 hover:border-primary hover:text-primary transition-all duration-300"
                        data-testid={`project-github-${project.id}`}
                      >
                        GitHub
                        <Github size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
