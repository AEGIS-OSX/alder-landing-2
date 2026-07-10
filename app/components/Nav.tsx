import { ProjectImage } from "@/app/components/ProjectImage";

export default function Nav() {
  return (
    <nav aria-label="Main navigation" className="nav">
      <div className="nav-inner">
        <a href="/" className="nav-wordmark">
          <ProjectImage
            id="logo"
            className="nav-logo"
            alt="Alder logo"
          />
          <span className="nav-wordmark-text">ALDER</span>
        </a>
        <a href="#waitlist" className="btn-primary nav-cta">
          Join the Waitlist
        </a>
      </div>
    </nav>
  );
}
