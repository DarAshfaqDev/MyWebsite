import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Websites } from "@/components/sections/websites";
import { Socials } from "@/components/sections/socials";
import { Projects } from "@/components/sections/projects";
import { DigitalWorld } from "@/components/sections/digital-world";
import { Books } from "@/components/sections/books";
import { Articles } from "@/components/sections/articles";
import { PublicationsSection } from "@/components/sections/publications";
import { Career } from "@/components/sections/career";
import { Freelancing } from "@/components/sections/freelancing";
import { Services } from "@/components/sections/services";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Websites />
      <Socials />
      <Projects />
      <DigitalWorld />
      <Books />
      <Articles />
      <PublicationsSection />
      <Career />
      <Freelancing />
      <Services />
      <Contact />
    </>
  );
}
