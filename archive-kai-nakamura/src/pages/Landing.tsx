import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import Projects from "../components/Projects";
import About from "../components/About";
import Experience from "../components/Experience";
import Skills from "../components/Skills";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Landing() {
  return (
    <div className="font-sans bg-surface dark:bg-slate-950 text-slate-800 dark:text-slate-200 min-h-screen">
      <Navbar />
      <Hero />
      <Marquee />
      <Projects />
      <About />
      <Experience />
      <Skills />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
