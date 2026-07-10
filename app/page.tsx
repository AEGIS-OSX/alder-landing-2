"use client";

import Nav from "@/app/components/Nav";
import Hero from "@/app/components/Hero";
import CraftPhilosophy from "@/app/components/CraftPhilosophy";
import MakingProcess from "@/app/components/MakingProcess";
import FeaturedPieces from "@/app/components/FeaturedPieces";
import FounderStory from "@/app/components/FounderStory";

export default function Home() {
  return (
    <main id="top">
      <Nav />
      <Hero />
      <CraftPhilosophy />
      <MakingProcess />
      <FeaturedPieces />
      <FounderStory />
    </main>
  );
}
