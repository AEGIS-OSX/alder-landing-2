"use client";

import Nav from "@/app/components/Nav";
import Hero from "@/app/components/Hero";
import CraftPhilosophy from "@/app/components/CraftPhilosophy";
import CraftProcess from "@/app/components/CraftProcess";
import FeaturedPieces from "@/app/components/FeaturedPieces";
import FounderStory from "@/app/components/FounderStory";
import WaitlistCTA from "@/app/components/WaitlistCTA";

export default function Home() {
  return (
    <main id="top">
      <Nav />
      <Hero />
      <CraftPhilosophy />
      <CraftProcess />
      <FeaturedPieces />
      <FounderStory />
      <WaitlistCTA />
    </main>
  );
}
