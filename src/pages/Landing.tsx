import { MotionConfig } from "framer-motion";
import { About } from "@/components/site/about";
import { SiteBackground } from "@/components/site/background";
import { Contact } from "@/components/site/contact";
import { Experience } from "@/components/site/experience";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/site/hero";
import { Navbar } from "@/components/site/navbar";
import { Projects } from "@/components/site/projects";
import { Skills } from "@/components/site/skills";
import { TechMarquee } from "@/components/site/tech-marquee";
import { WhatsAppCta } from "@/components/site/whatsapp-cta";
import { I18nProvider } from "@/context/i18n";

export default function Landing() {
  return (
    <I18nProvider>
      <MotionConfig reducedMotion="user">
        <div className="isolate min-h-screen text-foreground antialiased">
          <SiteBackground />
          <Navbar />
          <main>
            <Hero />
            <TechMarquee />
            <Projects />
            <About />
            <Experience />
            <Skills />
            <Contact />
          </main>
          <Footer />
          <WhatsAppCta />
        </div>
      </MotionConfig>
    </I18nProvider>
  );
}