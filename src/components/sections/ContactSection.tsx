import { useState, useRef, FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import { personalInfo } from "@/data/portfolio";

import { Github, Facebook, Linkedin, ArrowUpRight, Send } from "lucide-react";
import { staggerContainer, fadeUp } from "@/animations/variants";

const socials = [
  { label: "GitHub", href: personalInfo.github, Icon: Github },
  { label: "LinkedIn", href: personalInfo.linkedin, Icon: Linkedin },
  { label: "Facebook", href: personalInfo.facebook, Icon: Facebook },
];

const WHATSAPP_NUMBER = "201044960460";

interface Fields {
  name: string;
  projectDescription: string;
  websiteType: string;
  country: string;
}

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

  const [fields, setFields] = useState<Fields>({
    name: "",
    projectDescription: "",
    websiteType: "",
    country: "",
  });
  const [errors, setErrors] = useState<Partial<Fields>>({});

  const whatsappMessage = (f: Fields) =>
    [
      "🚀 New Project Inquiry",
      "",
      `👤 Name:\n${f.name}`,
      `🌍 Country:\n${f.country}`,
      `💻 Website Type:\n${f.websiteType}`,
      `📝 Project Description:\n${f.projectDescription}`,
      "",
      "----------------------------",
      "",
      "Sent from your Portfolio Website.",
    ].join("\n");

  const validate = () => {
    const e: Partial<Fields> = {};
    if (!fields.name.trim()) e.name = "Full Name is required";
    if (!fields.projectDescription.trim()) e.projectDescription = "Project Description is required";
    if (!fields.websiteType.trim()) e.websiteType = "Website Type is required";
    if (!fields.country.trim()) e.country = "Country is required";
    return e;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    const text = encodeURIComponent(whatsappMessage(fields));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
  };

  const handleChange = (key: keyof Fields, value: string) => {
    setFields(f => ({ ...f, [key]: value }));
    if (errors[key]) setErrors(e => ({ ...e, [key]: undefined }));
  };

  return (
    <section
      className="py-40 px-6 bg-background relative border-t border-border/30 overflow-hidden"
      id="contact"
      ref={ref}
    >
      {/* Background watermark */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-[0.025]">
        <div className="font-serif text-[30vw] font-bold leading-none text-foreground whitespace-nowrap absolute -bottom-8 -left-8">
          Hello.
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* ── Header ── */}
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-10">
            <div className="w-6 h-px bg-primary" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">Next Chapter</span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-serif text-5xl md:text-7xl lg:text-8xl xl:text-[9rem] mb-20 tracking-tighter leading-none"
          >
            Let's Build<br />
            <span className="italic text-muted-foreground">Something</span><br />
            Extraordinary.
          </motion.h2>

          {/* ── Email + socials ── */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-t border-border/40 pt-16 mb-24"
          >
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-4">
                Reach out directly
              </p>
              <a
                href={`mailto:${personalInfo.email}`}
                className="group inline-flex items-center gap-3 font-serif text-2xl md:text-4xl hover:text-primary transition-colors duration-300"
                data-testid="contact-email"
              >
                {personalInfo.email}
                <ArrowUpRight
                  size={28}
                  className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                />
              </a>
            </div>

            <div className="flex flex-col gap-5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Find me on
              </p>
              <div className="flex items-center gap-8">
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-300"
                    data-testid={`social-${label.toLowerCase()}`}
                  >
                    <Icon size={16} className="group-hover:text-primary transition-colors duration-300" />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Contact Form ── */}
          <motion.div variants={fadeUp} className="border-t border-border/40 pt-16">
            <div className="flex flex-col lg:flex-row lg:gap-24 xl:gap-40">

              {/* Left label */}
              <div className="lg:w-72 xl:w-80 shrink-0 mb-12 lg:mb-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-4">
                  Or send a message
                </p>
                <p className="font-sans text-lg text-muted-foreground font-light leading-relaxed">
                  Have a project in mind? Fill out the form and I'll get back to you as soon as possible.
                </p>
              </div>

              {/* Form */}
              <div className="flex-1">
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="flex flex-col gap-8"
                  data-testid="contact-form"
                >
                  {/* Full Name + Country row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <FormField
                      label="Full Name"
                      id="contact-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={fields.name}
                      error={errors.name}
                      onChange={v => handleChange("name", v)}
                    />
                    <FormField
                      label="Country"
                      id="contact-country"
                      type="text"
                      placeholder="Your country"
                      value={fields.country}
                      error={errors.country}
                      onChange={v => handleChange("country", v)}
                    />
                  </div>

                  {/* Website Type */}
                  <FormField
                    label="Website Type"
                    id="contact-website-type"
                    type="text"
                    placeholder="Landing Page, Portfolio, E-commerce, Dashboard, SaaS..."
                    value={fields.websiteType}
                    error={errors.websiteType}
                    onChange={v => handleChange("websiteType", v)}
                  />

                  {/* Project Description */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="contact-project-description"
                      className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground"
                    >
                      Project Description
                    </label>
                    <textarea
                      id="contact-project-description"
                      rows={5}
                      placeholder="Describe your project..."
                      value={fields.projectDescription}
                      onChange={e => handleChange("projectDescription", e.target.value)}
                      data-testid="input-project-description"
                      className={`bg-transparent border-b resize-none font-sans text-base text-foreground placeholder:text-muted-foreground/30 focus:outline-none py-3 transition-colors duration-300 ${
                        errors.projectDescription
                          ? "border-destructive focus:border-destructive"
                          : "border-border/50 focus:border-primary"
                      }`}
                    />
                    {errors.projectDescription && (
                      <span className="font-mono text-[9px] text-destructive tracking-widest">
                        {errors.projectDescription}
                      </span>
                    )}
                  </div>

                  {/* Submit */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/30">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/40">
                      All fields required
                    </span>
                    <button
                      type="submit"
                      data-testid="button-submit"
                      className="group relative flex items-center gap-4 px-8 py-4 bg-foreground text-background font-mono text-[10px] uppercase tracking-[0.2em] hover:bg-primary hover:text-primary-foreground transition-all duration-300 overflow-hidden"
                    >
                      <span className="flex items-center gap-3">
                        Send Message
                        <Send
                          size={13}
                          className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                        />
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Reusable field component ── */
interface FormFieldProps {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
}

function FormField({ label, id, type, placeholder, value, error, onChange }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        data-testid={`input-${label.toLowerCase().replace(/\s+/g, "-")}`}
        className={`bg-transparent border-b font-sans text-base text-foreground placeholder:text-muted-foreground/30 focus:outline-none py-3 transition-colors duration-300 ${
          error
            ? "border-destructive focus:border-destructive"
            : "border-border/50 focus:border-primary"
        }`}
      />
      {error && (
        <span className="font-mono text-[9px] text-destructive tracking-widest">{error}</span>
      )}
    </div>
  );
}
