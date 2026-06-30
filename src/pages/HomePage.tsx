import { HeroSection } from '../components/HeroSection';
import { ProjectsSection } from '../components/ProjectsSection';
import { AboutSection } from '../components/AboutSection';
import { DesignProcessSection } from '../components/DesignProcessSection';
import { SkillsSection } from '../components/SkillsSection';
import { BeyondDesignSection } from '../components/BeyondDesignSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { ContactSection } from '../components/ContactSection';

export const HomePage = () => {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <AboutSection />
      <DesignProcessSection />
      <SkillsSection />
      <BeyondDesignSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
};
