import { ProjectImage } from "@/app/components/ProjectImage";

export default function Nav() {
  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]"
      style={{ backdropFilter: "blur(8px)" }}
    >
      <div
        className="mx-auto flex h-14 w-full max-w-[var(--max-width)] items-center justify-between px-[var(--space-md)] md:px-[var(--space-xl)]"
      >
        <a href="/" aria-label="Alder home">
          <ProjectImage id="logo" className="h-8 w-auto" />
        </a>
        <a href="#waitlist" className="btn-primary">
          Join the Waitlist
        </a>
      </div>
    </nav>
  );
}
