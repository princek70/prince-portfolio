import About from "@/components/About";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
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
      <Navbar />
      <ThemeToggle />

      <main className="flex-1">
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
