import { motion } from "framer-motion";
import { pageTransition } from "@/animations/variants";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-background"
    >
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TechStackSection />
      <ProjectsSection />
      <ContactSection />
    </motion.div>
  );
}