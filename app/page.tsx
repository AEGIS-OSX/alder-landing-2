"use client";

import Nav from "@/app/components/Nav";
import Hero from "@/app/components/Hero";
import CraftPhilosophy from "@/app/components/CraftPhilosophy";
import MakingProcess from "@/app/components/MakingProcess";
import FeaturedPieces from "@/app/components/FeaturedPieces";
import FounderStory from "@/app/components/FounderStory";
import WaitlistCTA from "@/app/components/WaitlistCTA";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <CraftPhilosophy />
        <MakingProcess />
        <FeaturedPieces />
        <FounderStory />
        <WaitlistCTA />
      </main>
    </>
  );
}
