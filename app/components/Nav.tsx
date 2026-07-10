import { ProjectImage } from "@/app/components/ProjectImage";

export default function Nav() {
  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className="sticky top-0 z-50"
      style={{
        backgroundColor: "var(--color-bg)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <style>{`
        .nav-inner { padding-inline: var(--space-xl); }
        @media (max-width: 375px) { .nav-inner { padding-inline: var(--space-md); } }
      `}</style>
      <div
        className="nav-inner mx-auto flex h-14 w-full items-center justify-between"
        style={{ maxWidth: "var(--max-width)" }}
      >
        <a href="/" aria-label="Alder home">
          <ProjectImage id="logo" className="h-8 w-auto" alt="Alder" />
        </a>
        <a href="#waitlist" className="btn-primary">
          Join the Waitlist
        </a>
      </div>
    </nav>
  );
}
