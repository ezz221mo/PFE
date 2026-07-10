import { useEffect, useRef } from "react";
import gsap from "gsap";
import { techStack } from "@/data/portfolio";

export function TechStackSection() {
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  const allTech = [
    ...techStack.frontend,
    ...techStack.styling,
    ...techStack.animation,
    ...techStack.runtime,
    ...techStack.state,
  ];
  const displayTech = [...allTech, ...allTech];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (track1Ref.current) {
        const width = track1Ref.current.scrollWidth / 2;
        gsap.to(track1Ref.current, {
          x: `-=${width}`,
          ease: "none",
          duration: 24,
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize((x) => parseFloat(x) % width),
          },
        });
      }
      if (track2Ref.current) {
        const width = track2Ref.current.scrollWidth / 2;
        gsap.fromTo(
          track2Ref.current,
          { x: `-${width / 2}px` },
          {
            x: 0,
            ease: "none",
            duration: 30,
            repeat: -1,
            modifiers: {
              x: gsap.utils.unitize((x) => parseFloat(x) % width),
            },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 overflow-hidden border-t border-b border-border/30 bg-background" id="stack">
      <div className="mb-14 px-6 max-w-7xl mx-auto flex items-center gap-4">
        <div className="w-6 h-px bg-primary" />
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">Toolkit</span>
      </div>

      <div className="space-y-6">
        <div className="relative w-full overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
          <div ref={track1Ref} className="flex whitespace-nowrap will-change-transform">
            {displayTech.map((tech, i) => (
              <span key={`t1-${i}`} className="font-serif text-4xl md:text-6xl italic text-foreground/60 whitespace-nowrap px-8 md:px-12">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
          <div ref={track2Ref} className="flex whitespace-nowrap will-change-transform">
            {[...displayTech].reverse().map((tech, i) => (
              <span key={`t2-${i}`} className="font-serif text-4xl md:text-6xl italic text-foreground/20 whitespace-nowrap px-8 md:px-12">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
