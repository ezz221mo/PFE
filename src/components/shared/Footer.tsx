import { personalInfo } from "@/data/portfolio";
import { Github, Facebook, Linkedin } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { label: "GitHub", href: personalInfo.github, Icon: Github },
    { label: "LinkedIn", href: personalInfo.linkedin, Icon: Linkedin },
    { label: "Facebook", href: personalInfo.facebook, Icon: Facebook },
  ];

  return (
    <footer className="w-full py-12 px-6 md:px-12 border-t border-border/40 bg-background">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <p className="font-serif text-xl italic text-foreground">{personalInfo.name}</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">
            {personalInfo.tagline}
          </p>
        </div>

        <div className="flex items-center gap-8">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
              data-testid={`footer-social-${label.toLowerCase()}`}
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center gap-2">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">
          &copy; {year} Ezzaldin Elsadat. All rights reserved.
        </p>
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/40">
          Built with obsession &mdash; {personalInfo.team}
        </p>
      </div>
    </footer>
  );
}
