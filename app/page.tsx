import { Hero } from "@/sections/Hero";
import { Index } from "@/sections/Index";
import { Work } from "@/sections/Work";
import { Studio } from "@/sections/Studio";
import { Manifesto } from "@/sections/Manifesto";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Index />
      <Work />
      <Studio />
      <Manifesto />
      <Contact />
      <Footer />
    </>
  );
}
