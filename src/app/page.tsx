import About from "@/components/About";
import AmbientBackground from "@/components/AmbientBackground";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import ScrollToTop from "@/components/ScrollToTop";
import Skills from "@/components/Skills";
import ThemeToggle from "@/components/ThemeToggle";
import { SITE_URL, profile, socialLinks } from "@/data/site";

/** Minimal, strictly factual structured data for search engines. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: SITE_URL,
  email: `mailto:${profile.email}`,
  description:
    "B.Tech Computer Science (AI) student and software developer focused on full-stack development and applied AI.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Greater Noida",
    addressRegion: "Uttar Pradesh",
    addressCountry: "IN",
  },
  sameAs: socialLinks
    .filter((link) => link.icon !== "mail")
    .map((link) => link.href),
};

export default function Home() {
  return (
    <>
      {/* Decorative wash. Sits at z-0; everything readable is raised above it
          so the translucent panels have colour to refract. */}
      <AmbientBackground />

      <Navbar />
      <ThemeToggle />
      <ScrollToTop />

      <main className="relative z-10 flex-1">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>

      <Footer />

      {/* Structured data. A non-executable script type, so React does not warn
          about rendering a <script> tag the way it does for executable ones. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </>
  );
}
